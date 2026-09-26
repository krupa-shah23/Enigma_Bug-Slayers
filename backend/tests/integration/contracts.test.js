const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const { trustScore } = require('../../src/services/trust');
const {
  Society, Contribution, Contract, Collection, Flag,
} = require('../../src/models');
const {
  seedPerson, seedResident, seedSociety, seedOfficer, seedNgo, seedBhangarwala, seedContract, authHeader,
} = require('../fixtures');

const oid = () => new mongoose.Types.ObjectId();
const api = (method, path, user) => request(app)[method](path).set(user ? authHeader(user) : {});

const log = (user, society, category, weightKg, extra = {}) =>
  Contribution.create({
    userId: user._id, societyId: society._id, category, weightKg, ...extra,
  });

/** A society (CP + treasurer + resident), a verified NGO and an active plastic contract. */
async function setup({ status = 'active', promised = 30 } = {}) {
  const society = await seedSociety();
  const cp = await seedOfficer({ role: 'cp', societyId: society._id });
  const treasurer = await seedOfficer({ role: 'treasurer', societyId: society._id });
  const resident = await seedResident({ societyId: society._id });
  const ngo = await seedNgo({ verified: true });
  const contract = await seedContract({
    societyId: society._id, ngoId: ngo._id, status, materialType: 'plastic',
  });
  if (promised) await log(resident, society, 'plastic', promised);
  return {
    society, cp, treasurer, resident, ngo, contract,
  };
}

const collect = (ngo, contract, actualKg) =>
  api('post', `/api/contracts/${contract.id}/collections`, ngo).send({ actualKg });

// ── E38 ──────────────────────────────────────────────────────────────────────

describe('E38 POST /api/contracts', () => {
  const body = (society, o = {}) => ({
    societyId: society.id, materialType: 'plastic', quantityKg: 200, ratePerKg: 12.5, ...o,
  });

  it('lets a verified NGO offer a contract to a society', async () => {
    const society = await seedSociety();
    const ngo = await seedNgo({ verified: true });
    const res = await api('post', '/api/contracts', ngo).send(body(society));
    expect(res.status).toBe(201);
    expect(res.body.data.contract).toMatchObject({
      status: 'offered', ngoId: ngo.id, societyId: society.id, materialType: 'plastic', quantityKg: 200, ratePerKg: 12.5,
    });
    expect(await Contract.countDocuments({ status: 'offered' })).toBe(1);
  });

  it('403 NGO_NOT_VERIFIED for an unverified NGO; 403 for a person; 401 without a token', async () => {
    const society = await seedSociety();
    const unverified = await api('post', '/api/contracts', await seedNgo()).send(body(society));
    expect([unverified.status, unverified.body.error.code]).toEqual([403, 'NGO_NOT_VERIFIED']);
    expect((await api('post', '/api/contracts', await seedPerson()).send(body(society))).status).toBe(403);
    expect((await api('post', '/api/contracts').send(body(society))).status).toBe(401);
    expect(await Contract.countDocuments()).toBe(0);
  });

  it('404 for an unknown society; 400 for a malformed society id or bad terms', async () => {
    const ngo = await seedNgo({ verified: true });
    const society = await seedSociety();
    expect((await api('post', '/api/contracts', ngo).send(body({ id: oid().toString() }))).status).toBe(404);
    expect((await api('post', '/api/contracts', ngo).send(body({ id: 'nope' }))).status).toBe(400);
    expect((await api('post', '/api/contracts', ngo).send(body(society, { materialType: 'gold' }))).status).toBe(400);
    expect((await api('post', '/api/contracts', ngo).send(body(society, { quantityKg: 0 }))).status).toBe(400);
    expect((await api('post', '/api/contracts', ngo).send(body(society, { ratePerKg: -1 }))).status).toBe(400);
    expect((await api('post', '/api/contracts', ngo).send(body(society, { ratePerKg: undefined }))).status).toBe(400);
  });

  it('cannot spoof the owning NGO or the status', async () => {
    const society = await seedSociety();
    const ngo = await seedNgo({ verified: true });
    const res = await api('post', '/api/contracts', ngo).send(body(society, { ngoId: oid().toString(), status: 'active' }));
    expect(res.body.data.contract).toMatchObject({ ngoId: ngo.id, status: 'offered' });
  });

  it('an officer can then accept it (E19) and the NGO can log a collection', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const ngo = await seedNgo({ verified: true });
    const created = (await api('post', '/api/contracts', ngo).send(body(society))).body.data.contract;

    expect((await collect(ngo, created, 10)).status).toBe(409); // still only offered
    await api('post', `/api/societies/${society.id}/contracts/${created.id}/accept`, cp).expect(200);
    expect((await collect(ngo, created, 10)).status).toBe(201);
  });
});

// ── E39 ──────────────────────────────────────────────────────────────────────

describe('E39 GET /api/ngo/contracts', () => {
  it('lists only the NGO\'s own contracts with society name and latest collection', async () => {
    const { ngo, contract, society } = await setup();
    await seedContract({ ngoId: ngo._id, status: 'offered' });
    await seedContract({ status: 'active' }); // another NGO's
    await collect(ngo, contract, 10);
    await collect(ngo, contract, 25);

    const res = await api('get', '/api/ngo/contracts', ngo);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);

    const mine = res.body.data.find((c) => c.id === contract.id);
    expect(mine.society).toEqual({ id: society.id, name: society.name });
    expect(mine.latestCollection).toMatchObject({ actualKg: 25, paymentStatus: 'unpaid' });
    expect(res.body.data.find((c) => c.id !== contract.id).latestCollection).toBeNull();
  });

  it('filters by status and rejects an unknown one', async () => {
    const ngo = await seedNgo({ verified: true });
    await seedContract({ ngoId: ngo._id, status: 'offered' });
    const active = await seedContract({ ngoId: ngo._id, status: 'active' });
    const res = await api('get', '/api/ngo/contracts?status=active', ngo);
    expect(res.body.data.map((c) => c.id)).toEqual([active.id]);
    expect((await api('get', '/api/ngo/contracts?status=weird', ngo)).status).toBe(400);
  });

  it('is empty for an NGO with no contracts (even unverified), and blocked for a person', async () => {
    expect((await api('get', '/api/ngo/contracts', await seedNgo())).body.data).toEqual([]);
    expect((await api('get', '/api/ngo/contracts', await seedPerson())).status).toBe(403);
    expect((await api('get', '/api/ngo/contracts')).status).toBe(401);
  });
});

// ── E40 ──────────────────────────────────────────────────────────────────────

describe('E40 GET /api/contracts/:contractId', () => {
  it('is visible to the owning NGO and to both officers, with the live promised weight', async () => {
    const {
      ngo, cp, treasurer, contract, society,
    } = await setup({ promised: 30 });
    for (const viewer of [ngo, cp, treasurer]) {
      const res = await api('get', `/api/contracts/${contract.id}`, viewer);
      expect(res.status).toBe(200);
      expect(res.body.data.contract).toMatchObject({ id: contract.id, status: 'active' });
      expect(res.body.data.promisedKg).toBe(30);
      expect(res.body.data.society).toEqual({ id: society.id, name: society.name });
      expect(res.body.data.collections).toEqual({
        count: 0, flaggedCount: 0, totalActualKg: 0, latest: null,
      });
    }
  });

  it('counts only the contract\'s material, and follows new contributions', async () => {
    const { ngo, contract, society, resident } = await setup({ promised: 10 });
    await log(resident, society, 'paper', 99); // different material
    await log(resident, society, 'plastic', 5);
    expect((await api('get', `/api/contracts/${contract.id}`, ngo)).body.data.promisedKg).toBe(15);
  });

  it('summarises collections (count, flagged, total, latest)', async () => {
    const { ngo, contract } = await setup({ promised: 30 });
    await collect(ngo, contract, 20); // flagged
    await collect(ngo, contract, 5); // promised 0 -> clean
    const res = await api('get', `/api/contracts/${contract.id}`, ngo);
    expect(res.body.data.collections).toMatchObject({ count: 2, flaggedCount: 1, totalActualKg: 25 });
    expect(res.body.data.collections.latest.actualKg).toBe(5);
    expect(res.body.data.promisedKg).toBe(0);
  });

  it('403 for another NGO, a resident, an officer of another society, or a person with no society', async () => {
    const { contract, resident } = await setup();
    const otherCp = await seedOfficer({ role: 'cp' });
    const url = `/api/contracts/${contract.id}`;
    expect((await api('get', url, await seedNgo({ verified: true }))).status).toBe(403);
    expect((await api('get', url, resident)).status).toBe(403);
    expect((await api('get', url, otherCp)).status).toBe(403);
    expect((await api('get', url, await seedPerson())).status).toBe(403);
    expect((await api('get', url, await seedBhangarwala())).status).toBe(403);
    expect((await api('get', url)).status).toBe(401);
  });

  it('404 for an unknown or malformed contract id', async () => {
    const ngo = await seedNgo({ verified: true });
    expect((await api('get', `/api/contracts/${oid()}`, ngo)).status).toBe(404);
    expect((await api('get', '/api/contracts/nope', ngo)).status).toBe(404);
  });
});

// ── E41 ──────────────────────────────────────────────────────────────────────

describe('E41 PATCH /api/contracts/:contractId', () => {
  const patch = (user, contract, body) => api('patch', `/api/contracts/${contract.id}`, user).send(body);
  const codeOf = (res) => [res.status, res.body.error && res.body.error.code];

  it('edits quantity and rate while the contract is offered', async () => {
    const { ngo, contract } = await setup({ status: 'offered', promised: 0 });
    const res = await patch(ngo, contract, { quantityKg: 500, ratePerKg: 20 });
    expect(res.status).toBe(200);
    expect(res.body.data.contract).toMatchObject({ quantityKg: 500, ratePerKg: 20, status: 'offered' });
  });

  it('can edit just one term', async () => {
    const { ngo, contract } = await setup({ status: 'offered', promised: 0 });
    const res = await patch(ngo, contract, { ratePerKg: 33 });
    expect(res.body.data.contract).toMatchObject({ ratePerKg: 33, quantityKg: 100 });
  });

  it('409 CONTRACT_NOT_EDITABLE when editing the rate of an active contract', async () => {
    const { ngo, contract } = await setup({ status: 'active', promised: 0 });
    const res = await patch(ngo, contract, { ratePerKg: 99 });
    expect(codeOf(res)).toEqual([409, 'CONTRACT_NOT_EDITABLE']);
    expect((await Contract.findById(contract._id)).ratePerKg).toBe(12);
  });

  it.each(['offered', 'active'])('cancels a %s contract', async (status) => {
    const { ngo, contract } = await setup({ status, promised: 0 });
    const res = await patch(ngo, contract, { status: 'cancelled' });
    expect(res.status).toBe(200);
    expect(res.body.data.contract.status).toBe('cancelled');
  });

  it('completes an active contract', async () => {
    const { ngo, contract } = await setup({ status: 'active', promised: 0 });
    expect((await patch(ngo, contract, { status: 'completed' })).body.data.contract.status).toBe('completed');
  });

  it('409 for the disallowed status moves', async () => {
    const offered = await setup({ status: 'offered', promised: 0 });
    expect(codeOf(await patch(offered.ngo, offered.contract, { status: 'completed' }))).toEqual([409, 'CONTRACT_NOT_EDITABLE']);

    const cancelled = await setup({ status: 'cancelled', promised: 0 });
    expect((await patch(cancelled.ngo, cancelled.contract, { status: 'cancelled' })).status).toBe(409);
    expect((await patch(cancelled.ngo, cancelled.contract, { status: 'completed' })).status).toBe(409);
    expect((await patch(cancelled.ngo, cancelled.contract, { ratePerKg: 5 })).status).toBe(409);

    const completed = await setup({ status: 'completed', promised: 0 });
    expect((await patch(completed.ngo, completed.contract, { status: 'cancelled' })).status).toBe(409);
  });

  it('400 for an empty body, mixed terms + status, an unknown status or non-positive numbers', async () => {
    const { ngo, contract } = await setup({ status: 'offered', promised: 0 });
    expect((await patch(ngo, contract, {})).status).toBe(400);
    expect((await patch(ngo, contract, { status: 'cancelled', ratePerKg: 5 })).status).toBe(400);
    expect((await patch(ngo, contract, { status: 'active' })).status).toBe(400);
    expect((await patch(ngo, contract, { quantityKg: 0 })).status).toBe(400);
    expect((await patch(ngo, contract, { ratePerKg: -3 })).status).toBe(400);
  });

  it('403 for another NGO or a person, 404 for an unknown contract', async () => {
    const { ngo, contract, cp } = await setup({ status: 'offered', promised: 0 });
    expect((await patch(await seedNgo({ verified: true }), contract, { status: 'cancelled' })).status).toBe(403);
    expect((await patch(cp, contract, { status: 'cancelled' })).status).toBe(403);
    expect((await patch(ngo, { id: oid().toString() }, { status: 'cancelled' })).status).toBe(404);
    expect((await Contract.findById(contract._id)).status).toBe('offered');
  });
});

// ── E42 ──────────────────────────────────────────────────────────────────────

describe('E42 POST /api/contracts/:contractId/collections', () => {
  it.each(['offered', 'cancelled', 'completed'])('409 CONTRACT_NOT_ACTIVE on a %s contract', async (status) => {
    const { ngo, contract } = await setup({ status });
    const res = await collect(ngo, contract, 10);
    expect([res.status, res.body.error.code]).toEqual([409, 'CONTRACT_NOT_ACTIVE']);
    expect(await Collection.countDocuments()).toBe(0);
  });

  it('actual = promised: no flag, trust 100, and the snapshot is stored', async () => {
    const { ngo, contract, society } = await setup({ promised: 30 });
    const res = await collect(ngo, contract, 30);
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ flagged: false, trustScore: 100 });
    expect(res.body.data.collection).toMatchObject({
      promisedKg: 30, actualKg: 30, flagged: false, paymentStatus: 'unpaid', category: 'plastic', contractId: contract.id,
    });

    expect(await Flag.countDocuments()).toBe(0);
    const saved = await Society.findById(society._id);
    expect(saved.trustScore).toBe(100);
    expect(saved.lastCollectionDate).toBeInstanceOf(Date);
    const stored = await Collection.findOne();
    expect(stored.windowStart.getTime()).toBe(society.createdAt.getTime()); // never collected before
    expect(stored.windowEnd.getTime()).toBeGreaterThanOrEqual(stored.windowStart.getTime());
  });

  it('actual > promised is fine (not flagged)', async () => {
    const { ngo, contract } = await setup({ promised: 30 });
    expect((await collect(ngo, contract, 40)).body.data).toMatchObject({ flagged: false, trustScore: 100 });
  });

  it('nothing promised and nothing collected is not a flag', async () => {
    const { ngo, contract } = await setup({ promised: 0 });
    expect((await collect(ngo, contract, 0)).body.data).toMatchObject({ flagged: false, trustScore: 100 });
  });

  it('actual < promised: creates a flag with the shortfall and updates the trust score exactly', async () => {
    const { ngo, contract, society } = await setup({ promised: 30 });
    const res = await collect(ngo, contract, 20);
    expect(res.status).toBe(201);
    expect(res.body.data.flagged).toBe(true);

    // fulfil = 20/30, one flag out of one collection: round(100 x 0.7 x 2/3) = 47
    expect(res.body.data.trustScore).toBe(47);
    expect(res.body.data.trustScore).toBe(trustScore([{ promisedKg: 30, actualKg: 20 }]));
    expect((await Society.findById(society._id)).trustScore).toBe(47);

    const flag = await Flag.findOne();
    expect(flag).toMatchObject({ promisedKg: 30, actualKg: 20, shortfallKg: 10 });
    expect(flag.societyId.equals(society._id)).toBe(true);
    expect(flag.contractId.equals(contract._id)).toBe(true);
    expect(flag.collectionId.toString()).toBe(res.body.data.collection.id);
  });

  it('a second collection only counts contributions since the first, and the score uses both', async () => {
    const { ngo, contract, society, resident } = await setup({ promised: 30 });
    await collect(ngo, contract, 20); // flagged
    await log(resident, society, 'plastic', 10);

    const res = await collect(ngo, contract, 10);
    expect(res.body.data.collection.promisedKg).toBe(10);
    expect(res.body.data.flagged).toBe(false);

    const stored = await Collection.find().sort({ collectedAt: 1 }).lean();
    expect(stored[1].windowStart.getTime()).toBe(stored[0].collectedAt.getTime());
    // mean(2/3, 1) = 5/6, flags 1/2: round(100 x (0.7 x 5/6 + 0.3 x 1/2)) = 73
    expect(res.body.data.trustScore).toBe(73);
    expect(res.body.data.trustScore).toBe(trustScore(stored));
  });

  it('resets the promised aggregate for that material only', async () => {
    const { ngo, contract, society, resident } = await setup({ promised: 30 });
    await log(resident, society, 'paper', 10);
    await collect(ngo, contract, 30);

    const full = await api('get', `/api/societies/${society.id}/full`, resident);
    const byCat = Object.fromEntries(full.body.data.promised.map((p) => [p.category, p.totalKg]));
    expect(byCat.plastic).toBe(0);
    expect(byCat.paper).toBe(10);
  });

  it('a collection for another material does not reset this one', async () => {
    const { ngo, contract, society, resident } = await setup({ promised: 30 });
    await log(resident, society, 'paper', 8);
    const paperContract = await seedContract({
      societyId: society._id, ngoId: ngo._id, status: 'active', materialType: 'paper',
    });

    const paper = await collect(ngo, paperContract, 8);
    expect(paper.body.data.collection.promisedKg).toBe(8);
    expect((await collect(ngo, contract, 30)).body.data.collection.promisedKg).toBe(30);
    // the society's score covers every category's collections
    expect((await Society.findById(society._id)).trustScore).toBe(100);
  });

  it('the new score is visible to residents on E11 and E12', async () => {
    const { ngo, contract, society, resident } = await setup({ promised: 30 });
    await collect(ngo, contract, 20);

    const list = await api('get', '/api/societies', resident);
    expect(list.body.data.find((s) => s.id === society.id).trustScore).toBe(47);
    expect((await api('get', `/api/societies/${society.id}`, resident)).body.data.trustScore).toBe(47);
  });

  it('two simultaneous collections both succeed and the promised weight is counted once', async () => {
    const { ngo, contract, society } = await setup({ promised: 30 });
    const [a, b] = await Promise.all([collect(ngo, contract, 30), collect(ngo, contract, 0)]);
    expect([a.status, b.status]).toEqual([201, 201]);

    const promised = [a, b].map((r) => r.body.data.collection.promisedKg).sort((x, y) => x - y);
    expect(promised).toEqual([0, 30]);
    expect(await Collection.countDocuments()).toBe(2);
    const stored = await Collection.find().sort({ collectedAt: 1 }).lean();
    expect((await Society.findById(society._id)).trustScore).toBe(trustScore(stored));
  });

  it('400 for a missing or negative actualKg', async () => {
    const { ngo, contract } = await setup();
    expect((await api('post', `/api/contracts/${contract.id}/collections`, ngo).send({})).status).toBe(400);
    expect((await collect(ngo, contract, -1)).status).toBe(400);
    expect((await api('post', `/api/contracts/${contract.id}/collections`, ngo).send({ actualKg: 'lots' })).status).toBe(400);
  });

  it('403 for another NGO, an officer or a person; 404 for an unknown contract; 401 without a token', async () => {
    const { contract, cp } = await setup();
    expect((await collect(await seedNgo({ verified: true }), contract, 5)).status).toBe(403);
    expect((await collect(cp, contract, 5)).status).toBe(403);
    expect((await collect(await seedPerson(), contract, 5)).status).toBe(403);
    expect((await api('post', `/api/contracts/${oid()}/collections`, await seedNgo()).send({ actualKg: 1 })).status).toBe(404);
    expect((await api('post', `/api/contracts/${contract.id}/collections`).send({ actualKg: 1 })).status).toBe(401);
    expect(await Collection.countDocuments()).toBe(0);
  });
});

// ── E43 ──────────────────────────────────────────────────────────────────────

describe('E43 GET /api/contracts/:contractId/collections', () => {
  it('returns the history newest first with shortfall, for the NGO and both officers', async () => {
    const {
      ngo, cp, treasurer, contract, society, resident,
    } = await setup({ promised: 30 });
    await collect(ngo, contract, 20);
    await log(resident, society, 'plastic', 10);
    await collect(ngo, contract, 10);

    for (const viewer of [ngo, cp, treasurer]) {
      const res = await api('get', `/api/contracts/${contract.id}/collections`, viewer);
      expect(res.status).toBe(200);
      expect(res.body.data.map((c) => c.actualKg)).toEqual([10, 20]);
      expect(res.body.data[1]).toMatchObject({
        promisedKg: 30, shortfallKg: 10, flagged: true, category: 'plastic', contractId: contract.id, paymentStatus: 'unpaid',
      });
      expect(res.body.data[0]).toMatchObject({ shortfallKg: 0, flagged: false });
      expect(res.body.data[0].windowStart).toBeDefined();
    }
  });

  it('is empty before any collection', async () => {
    const { ngo, contract } = await setup();
    expect((await api('get', `/api/contracts/${contract.id}/collections`, ngo)).body.data).toEqual([]);
  });

  it('403 for other NGOs, residents and other societies\' officers; 404 for unknown ids', async () => {
    const { contract, resident } = await setup();
    const url = `/api/contracts/${contract.id}/collections`;
    expect((await api('get', url, await seedNgo({ verified: true }))).status).toBe(403);
    expect((await api('get', url, resident)).status).toBe(403);
    expect((await api('get', url, await seedOfficer({ role: 'cp' }))).status).toBe(403);
    expect((await api('get', `/api/contracts/${oid()}/collections`, await seedNgo())).status).toBe(404);
    expect((await api('get', '/api/contracts/nope/collections', await seedNgo())).status).toBe(404);
  });
});
