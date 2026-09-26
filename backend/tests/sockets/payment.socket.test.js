/**
 * tests/sockets/payment.socket.test.js
 * S10 — payment:credited fires on E45 /api/payments/trigger.
 *
 * Recipients (with sharePaise > 0) get { paymentId, contractId, yourSharePaise, totalPaise }.
 * Officers get the full summary { paymentId, contractId, totalPaise, unallocatedPaise, splitCount }.
 * Residents with no split and unrelated users get nothing.
 */

const request = require('supertest');
const app = require('../../src/app');
const { Collection, Contribution } = require('../../src/models');
const {
  seedSociety, seedOfficer, seedResident, seedNgo, seedContract, authHeader,
} = require('../fixtures');
const { startTestServer, waitFor, expectNoEvent } = require('./helpers');

const api = (method, path, user) => request(app)[method](path).set(authHeader(user));

let t;
beforeAll(async () => { t = await startTestServer(); });
afterAll(async () => { await t.close(); });

async function setup() {
  const society = await seedSociety();
  const cp = await seedOfficer({ role: 'cp', societyId: society._id });
  const treasurer = await seedOfficer({ role: 'treasurer', societyId: society._id });
  const r1 = await seedResident({ societyId: society._id });
  const r2 = await seedResident({ societyId: society._id });
  const r3 = await seedResident({ societyId: society._id }); // no contribution
  const ngo = await seedNgo({ verified: true });

  const contract = await seedContract({
    societyId: society._id,
    ngoId: ngo._id,
    status: 'active',
    materialType: 'plastic',
    ratePerKg: 12,
  });

  const now = new Date();
  await Contribution.create([
    { userId: r1._id, societyId: society._id, category: 'plastic', weightKg: 10, loggedAt: now },
    { userId: r2._id, societyId: society._id, category: 'plastic', weightKg: 20, loggedAt: now },
  ]);

  await Collection.create({
    contractId: contract._id,
    societyId: society._id,
    ngoId: ngo._id,
    category: 'plastic',
    windowStart: society.createdAt,
    windowEnd: now,
    promisedKg: 30,
    actualKg: 30,
    flagged: false,
    paymentStatus: 'unpaid',
    collectedAt: now,
  });

  return {
    society, cp, treasurer, r1, r2, r3, ngo, contract,
  };
}

describe('S10 payment:credited', () => {
  it('reaches each recipient with their share, and officers with the summary', async () => {
    const {
      cp, treasurer, r1, r2, r3, ngo, contract,
    } = await setup();

    const otherCp = await seedOfficer({ role: 'cp' });

    const [sr1, sr2, sr3, scp, str, sngo, sother] = await Promise.all(
      [r1, r2, r3, cp, treasurer, ngo, otherCp].map((u) => t.connectAs(u))
    );

    const EVENT = 'payment:credited';

    // Who should receive
    const gotR1 = waitFor(sr1, EVENT);
    const gotR2 = waitFor(sr2, EVENT);
    const gotCp = waitFor(scp, EVENT);
    const gotTr = waitFor(str, EVENT);

    // Who must NOT receive
    const noneR3 = expectNoEvent(sr3, EVENT);
    const noneNgo = expectNoEvent(sngo, EVENT);
    const noneOther = expectNoEvent(sother, EVENT);

    const res = await api('post', '/api/payments/trigger', ngo)
      .send({ contractId: contract.id })
      .expect(201);

    const paymentId = res.body.data.payment.id;

    // r1 gets their personal share (10/30 × 36000 = 12000)
    const payloadR1 = await gotR1;
    expect(payloadR1).toEqual({
      paymentId,
      contractId: contract.id,
      yourSharePaise: 12000,
      totalPaise: 36000,
    });

    // r2 gets their share (20/30 × 36000 = 24000)
    const payloadR2 = await gotR2;
    expect(payloadR2).toEqual({
      paymentId,
      contractId: contract.id,
      yourSharePaise: 24000,
      totalPaise: 36000,
    });

    // Officers get the summary (no yourSharePaise)
    for (const payload of [await gotCp, await gotTr]) {
      expect(payload).toEqual({
        paymentId,
        contractId: contract.id,
        totalPaise: 36000,
        unallocatedPaise: 0,
        splitCount: 2,
      });
    }

    // Non-recipients are silent
    await Promise.all([noneR3, noneNgo, noneOther]);
  });

  it('is not emitted when the trigger is refused (no unpaid collection)', async () => {
    const { ngo, contract, cp } = await setup();
    // Mark the collection as already paid
    await Collection.updateOne({ contractId: contract._id }, { paymentStatus: 'paid' });

    const scp = await t.connectAs(cp);
    const none = expectNoEvent(scp, 'payment:credited');

    await api('post', '/api/payments/trigger', ngo)
      .send({ contractId: contract.id })
      .expect(409);

    await none;
  });

  it('unallocated amount fires to officers but no recipient events when nobody contributed', async () => {
    const {
      cp, r1, r2, r3, ngo, contract,
    } = await setup();

    // Remove all contributions so nobody gets a share
    await Contribution.deleteMany({ societyId: contract.societyId });

    const [scp, sr1] = await Promise.all([t.connectAs(cp), t.connectAs(r1)]);
    const gotCp = waitFor(scp, 'payment:credited');
    const noneR1 = expectNoEvent(sr1, 'payment:credited');

    const res = await api('post', '/api/payments/trigger', ngo)
      .send({ contractId: contract.id })
      .expect(201);

    const payloadCp = await gotCp;
    expect(payloadCp.unallocatedPaise).toBe(36000);
    expect(payloadCp.splitCount).toBe(0);
    await noneR1;
  });
});
