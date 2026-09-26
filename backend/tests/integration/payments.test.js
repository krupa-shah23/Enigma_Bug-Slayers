/**
 * tests/integration/payments.test.js
 * E44 GET  /api/ngo/payments
 * E45 POST /api/payments/trigger
 * E46 GET  /api/payments/:paymentId
 */

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const {
  User, Society, Contract, Collection, Contribution, Payment,
} = require('../../src/models');
const {
  seedPerson, seedResident, seedSociety, seedOfficer, seedNgo,
  seedContract, seedBhangarwala, authHeader,
} = require('../fixtures');

const api = (method, path, user) =>
  request(app)[method](path).set(user ? authHeader(user) : {});

const oid = () => new mongoose.Types.ObjectId().toString();

// ── shared setup ──────────────────────────────────────────────────────────────

/**
 * Creates: society (cp + treasurer + 3 residents), verified NGO,
 * active plastic contract, contributions and an unpaid collection.
 *
 *  residents[0] → 10 kg
 *  residents[1] → 20 kg
 *  residents[2] →  0 kg (no log)
 *  collection: actual 30 kg @ ₹12/kg → 36000 paise
 */
async function fullSetup() {
  const society = await seedSociety();
  const cp = await seedOfficer({ role: 'cp', societyId: society._id });
  const treasurer = await seedOfficer({ role: 'treasurer', societyId: society._id });
  const r1 = await seedResident({ societyId: society._id });
  const r2 = await seedResident({ societyId: society._id });
  const r3 = await seedResident({ societyId: society._id }); // logs nothing
  const ngo = await seedNgo({ verified: true });

  const contract = await seedContract({
    societyId: society._id,
    ngoId: ngo._id,
    status: 'active',
    materialType: 'plastic',
    ratePerKg: 12,
  });

  const windowStart = society.createdAt;
  // Log contributions BEFORE the collection (inside the window)
  const now = new Date();
  await Contribution.create([
    { userId: r1._id, societyId: society._id, category: 'plastic', weightKg: 10, loggedAt: now },
    { userId: r2._id, societyId: society._id, category: 'plastic', weightKg: 20, loggedAt: now },
  ]);

  // Create an unpaid collection document directly (simulates the NGO having
  // already logged it via E42 in a previous step).
  const collection = await Collection.create({
    contractId: contract._id,
    societyId: society._id,
    ngoId: ngo._id,
    category: 'plastic',
    windowStart,
    windowEnd: now,
    promisedKg: 30,
    actualKg: 30,
    flagged: false,
    paymentStatus: 'unpaid',
    collectedAt: now,
  });

  return {
    society, cp, treasurer, r1, r2, r3, ngo, contract, collection,
  };
}

const trigger = (ngo, contractId) =>
  api('post', '/api/payments/trigger', ngo).send({ contractId });

// ─────────────────────────────────────────────────────────────────────────────
// E45 POST /api/payments/trigger
// ─────────────────────────────────────────────────────────────────────────────

describe('E45 POST /api/payments/trigger', () => {
  it('splits 36 000 paise across r1(10 kg) and r2(20 kg), nothing for r3', async () => {
    const {
      ngo, contract, r1, r2, r3, society,
    } = await fullSetup();

    const res = await trigger(ngo, contract.id);
    expect(res.status).toBe(201);

    const { payment } = res.body.data;
    expect(payment.amountPaise).toBe(36000);
    expect(payment.unallocatedPaise).toBe(0);
    expect(payment.splits).toHaveLength(2);

    const byUser = Object.fromEntries(
      payment.splits.map((s) => [s.userId, s.sharePaise])
    );
    expect(byUser[r1.id]).toBe(12000); // 10/30 × 36000
    expect(byUser[r2.id]).toBe(24000); // 20/30 × 36000
    expect(byUser[r3.id]).toBeUndefined();
    // sum equals total
    expect(payment.splits.reduce((s, x) => s + x.sharePaise, 0)).toBe(36000);

    // collection is now paid
    const stored = await Collection.findById(payment.collectionId);
    expect(stored.paymentStatus).toBe('paid');
    expect(stored.paymentId.toString()).toBe(payment.id);

    // user fee credits updated
    const [u1, u2, u3] = await Promise.all([
      User.findById(r1._id), User.findById(r2._id), User.findById(r3._id),
    ]);
    expect(u1.feeCreditPaise).toBe(12000);
    expect(u2.feeCreditPaise).toBe(24000);
    expect(u3.feeCreditPaise).toBe(0);

    // society aggregates updated
    const soc = await Society.findById(society._id);
    expect(soc.feeReductionTotalPaise).toBe(36000);
    expect(soc.unallocatedPaise).toBe(0);
  });

  it('a flagged collection (actual < promised) still pays actual × rate', async () => {
    const { ngo, contract, r1, r2, society } = await fullSetup();
    // Manually override the collection to be flagged with actual 20 (not 30)
    await Collection.updateOne(
      { contractId: contract._id },
      { actualKg: 20, flagged: true }
    );
    const res = await trigger(ngo, contract.id);
    expect(res.status).toBe(201);
    // 20 kg × ₹12 × 100 = 24000 paise
    expect(res.body.data.payment.amountPaise).toBe(24000);
    // proportional split: r1 → 8000, r2 → 16000
    const byUser = Object.fromEntries(
      res.body.data.payment.splits.map((s) => [s.userId, s.sharePaise])
    );
    expect(byUser[r1.id]).toBe(8000);
    expect(byUser[r2.id]).toBe(16000);
    expect(byUser[r1.id] + byUser[r2.id]).toBe(24000);
  });

  it('nobody logged anything → whole amount unallocated, no crash', async () => {
    const { ngo, contract, collection } = await fullSetup();
    // Remove the contributions for this window
    await Contribution.deleteMany({ societyId: contract.societyId });

    const res = await trigger(ngo, contract.id);
    expect(res.status).toBe(201);
    expect(res.body.data.payment.splits).toHaveLength(0);
    expect(res.body.data.payment.unallocatedPaise).toBe(36000);

    const soc = await Society.findById(contract.societyId);
    expect(soc.feeReductionTotalPaise).toBe(0);
    expect(soc.unallocatedPaise).toBe(36000);
  });

  it('409 CONTRACT_NOT_FULFILLED when there is no unpaid collection', async () => {
    const { ngo, contract } = await fullSetup();
    // Mark the collection paid first
    await Collection.updateOne({ contractId: contract._id }, { paymentStatus: 'paid' });

    const res = await trigger(ngo, contract.id);
    expect([res.status, res.body.error.code]).toEqual([409, 'CONTRACT_NOT_FULFILLED']);
  });

  it('409 on double trigger — the second call is rejected', async () => {
    const { ngo, contract } = await fullSetup();
    const [a, b] = await Promise.all([
      trigger(ngo, contract.id),
      trigger(ngo, contract.id),
    ]);
    const statuses = [a.status, b.status].sort();
    expect(statuses).toEqual([201, 409]);
    // Exactly one Payment document was created
    expect(await Payment.countDocuments()).toBe(1);
  });

  it('403 FORBIDDEN for another NGO, an officer, or a person', async () => {
    const { ngo, contract, cp } = await fullSetup();
    const otherNgo = await seedNgo({ verified: true });
    expect((await trigger(otherNgo, contract.id)).status).toBe(403);
    expect((await trigger(cp, contract.id)).status).toBe(403);
    expect((await trigger(await seedPerson(), contract.id)).status).toBe(403);
    expect(await Payment.countDocuments()).toBe(0);
  });

  it('403 NGO_NOT_VERIFIED for an unverified NGO', async () => {
    const { contract } = await fullSetup();
    const unverified = await seedNgo({ verified: false });
    const res = await trigger(unverified, contract.id);
    expect([res.status, res.body.error.code]).toEqual([403, 'NGO_NOT_VERIFIED']);
  });

  it('400 for a missing or malformed contractId', async () => {
    const { ngo } = await fullSetup();
    expect((await api('post', '/api/payments/trigger', ngo).send({})).status).toBe(400);
    expect((await api('post', '/api/payments/trigger', ngo).send({ contractId: 'bad' })).status).toBe(400);
  });

  it('404 for an unknown contractId', async () => {
    const { ngo } = await fullSetup();
    expect((await trigger(ngo, oid())).status).toBe(404);
  });

  it('401 without a token', async () => {
    const { contract } = await fullSetup();
    expect((await api('post', '/api/payments/trigger').send({ contractId: contract.id })).status).toBe(401);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// E44 GET /api/ngo/payments
// ─────────────────────────────────────────────────────────────────────────────

describe('E44 GET /api/ngo/payments', () => {
  it('returns the calling NGO\u2019s payments, newest first', async () => {
    const { ngo, contract } = await fullSetup();
    // Second contract / payment for the same NGO
    const society2 = await seedSociety();
    const contract2 = await seedContract({
      societyId: society2._id,
      ngoId: ngo._id,
      status: 'active',
      materialType: 'plastic',
      ratePerKg: 10,
    });
    const now = new Date();
    await Collection.create({
      contractId: contract2._id,
      societyId: society2._id,
      ngoId: ngo._id,
      category: 'plastic',
      windowStart: society2.createdAt,
      windowEnd: now,
      promisedKg: 5,
      actualKg: 5,
      flagged: false,
      paymentStatus: 'unpaid',
      collectedAt: now,
    });

    await trigger(ngo, contract.id);
    await trigger(ngo, contract2.id);

    const res = await api('get', '/api/ngo/payments', ngo);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    // newest first
    expect(new Date(res.body.data[0].createdAt) >= new Date(res.body.data[1].createdAt)).toBe(true);
    // all belong to this NGO
    res.body.data.forEach((p) => expect(p.ngoId).toBe(ngo.id));
  });

  it('returns an empty array when the NGO has no payments', async () => {
    const ngo = await seedNgo({ verified: true });
    const res = await api('get', '/api/ngo/payments', ngo);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it('does not include another NGO\u2019s payments', async () => {
    const ngo1 = await seedNgo({ verified: true });
    const ngo2 = await seedNgo({ verified: true });
    const s = await seedSociety();
    const c = await seedContract({ societyId: s._id, ngoId: ngo1._id, status: 'active', ratePerKg: 5 });
    const now = new Date();
    await Collection.create({
      contractId: c._id, societyId: s._id, ngoId: ngo1._id,
      category: 'plastic', windowStart: s.createdAt, windowEnd: now,
      promisedKg: 0, actualKg: 0, flagged: false, paymentStatus: 'unpaid', collectedAt: now,
    });
    await trigger(ngo1, c.id);

    const res = await api('get', '/api/ngo/payments', ngo2);
    expect(res.body.data).toHaveLength(0);
  });

  it('403 for a person; 401 without a token', async () => {
    expect((await api('get', '/api/ngo/payments', await seedPerson())).status).toBe(403);
    expect((await api('get', '/api/ngo/payments')).status).toBe(401);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// E46 GET /api/payments/:paymentId
// ─────────────────────────────────────────────────────────────────────────────

describe('E46 GET /api/payments/:paymentId', () => {
  it('NGO and officers see the full splits; a resident sees only their own share', async () => {
    const {
      ngo, cp, treasurer, r1, r2, r3, contract,
    } = await fullSetup();
    const trigRes = await trigger(ngo, contract.id);
    const paymentId = trigRes.body.data.payment.id;

    // NGO — full splits
    const ngoView = (await api('get', `/api/payments/${paymentId}`, ngo)).body.data;
    expect(ngoView.splits).toHaveLength(2);
    expect(ngoView.payment.amountPaise).toBe(36000);

    // Officers — full splits
    for (const officer of [cp, treasurer]) {
      const view = (await api('get', `/api/payments/${paymentId}`, officer)).body.data;
      expect(view.splits).toHaveLength(2);
    }

    // r1 — only their own share
    const r1View = (await api('get', `/api/payments/${paymentId}`, r1)).body.data;
    expect(r1View.splits).toHaveLength(1);
    expect(r1View.splits[0].userId).toBe(r1.id);
    expect(r1View.splits[0].sharePaise).toBe(12000);

    // r3 contributed nothing → not in splits → 403
    const r3Res = await api('get', `/api/payments/${paymentId}`, r3);
    expect(r3Res.status).toBe(403);
  });

  it('403 for an officer of another society', async () => {
    const { ngo, contract } = await fullSetup();
    const trigRes = await trigger(ngo, contract.id);
    const paymentId = trigRes.body.data.payment.id;

    const otherCp = await seedOfficer({ role: 'cp' });
    expect((await api('get', `/api/payments/${paymentId}`, otherCp)).status).toBe(403);
  });

  it('403 for a bhangarwala or an unrelated person', async () => {
    const { ngo, contract } = await fullSetup();
    const trigRes = await trigger(ngo, contract.id);
    const paymentId = trigRes.body.data.payment.id;

    expect((await api('get', `/api/payments/${paymentId}`, await seedBhangarwala())).status).toBe(403);
    expect((await api('get', `/api/payments/${paymentId}`, await seedPerson())).status).toBe(403);
  });

  it('404 for an unknown or malformed payment id', async () => {
    const ngo = await seedNgo({ verified: true });
    expect((await api('get', `/api/payments/${oid()}`, ngo)).status).toBe(404);
    expect((await api('get', '/api/payments/nope', ngo)).status).toBe(404);
  });

  it('401 without a token', async () => {
    expect((await api('get', '/api/payments/any')).status).toBe(401);
  });
});
