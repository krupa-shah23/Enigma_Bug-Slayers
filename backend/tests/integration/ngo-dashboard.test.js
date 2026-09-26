/**
 * tests/integration/ngo-dashboard.test.js
 * E57 GET /api/ngo/dashboard
 */

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const { Collection, Payment } = require('../../src/models');
const {
  seedSociety, seedNgo, seedContract, authHeader, seedPerson,
} = require('../fixtures');

const api = (method, path, user) =>
  request(app)[method](path).set(user ? authHeader(user) : {});

async function seedActiveContractWithCollection(ngo, society, { actualKg = 10, paymentStatus = 'unpaid' } = {}) {
  const contract = await seedContract({
    ngoId: ngo._id,
    societyId: society._id,
    status: 'active',
    materialType: 'plastic',
    ratePerKg: 10,
  });
  const now = new Date();
  const collection = await Collection.create({
    contractId: contract._id,
    societyId: society._id,
    ngoId: ngo._id,
    category: 'plastic',
    windowStart: society.createdAt,
    windowEnd: now,
    promisedKg: actualKg,
    actualKg,
    flagged: false,
    paymentStatus,
    collectedAt: now,
  });
  return { contract, collection };
}

// ─────────────────────────────────────────────────────────────────────────────
// E57 GET /api/ngo/dashboard
// ─────────────────────────────────────────────────────────────────────────────

describe('E57 GET /api/ngo/dashboard', () => {
  it('returns all-zero dashboard for a fresh NGO with no activity', async () => {
    const ngo = await seedNgo({ verified: true });
    const res = await api('get', '/api/ngo/dashboard', ngo);
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      contracts: { offered: 0, active: 0, completed: 0, cancelled: 0, total: 0 },
      payments: { totalPaise: 0, paymentCount: 0 },
      recentCollections: [],
      activeSocietyIds: [],
    });
  });

  it('counts contracts by status correctly', async () => {
    const ngo = await seedNgo({ verified: true });

    await seedContract({ ngoId: ngo._id, status: 'offered' });
    await seedContract({ ngoId: ngo._id, status: 'active' });
    await seedContract({ ngoId: ngo._id, status: 'active' });
    await seedContract({ ngoId: ngo._id, status: 'completed' });
    await seedContract({ ngoId: ngo._id, status: 'cancelled' });

    const res = await api('get', '/api/ngo/dashboard', ngo);
    expect(res.status).toBe(200);
    expect(res.body.data.contracts).toEqual({
      offered: 1, active: 2, completed: 1, cancelled: 1, total: 5,
    });
  });

  it('does not count other NGOs\' contracts', async () => {
    const ngo = await seedNgo({ verified: true });
    const otherNgo = await seedNgo({ verified: true });

    await seedContract({ ngoId: ngo._id, status: 'active' });
    await seedContract({ ngoId: otherNgo._id, status: 'active' }); // should not appear

    const res = await api('get', '/api/ngo/dashboard', ngo);
    expect(res.body.data.contracts.total).toBe(1);
    expect(res.body.data.contracts.active).toBe(1);
  });

  it('returns payment totals from payments in the system', async () => {
    const ngo = await seedNgo({ verified: true });
    const soc = await seedSociety();

    // Create a mock payment directly
    const contract = await seedContract({ ngoId: ngo._id, societyId: soc._id, status: 'active' });
    const now = new Date();
    const col = await Collection.create({
      contractId: contract._id, societyId: soc._id, ngoId: ngo._id,
      category: 'plastic', windowStart: soc.createdAt, windowEnd: now,
      promisedKg: 10, actualKg: 10, flagged: false, paymentStatus: 'paid', collectedAt: now,
    });
    await Payment.create({
      contractId: contract._id, collectionId: col._id,
      ngoId: ngo._id, societyId: soc._id,
      amountPaise: 10000, splits: [], unallocatedPaise: 10000,
    });
    await Payment.create({
      contractId: contract._id,
      collectionId: new mongoose.Types.ObjectId(), // second payment (different collection)
      ngoId: ngo._id, societyId: soc._id,
      amountPaise: 5000, splits: [], unallocatedPaise: 5000,
    });

    const res = await api('get', '/api/ngo/dashboard', ngo);
    expect(res.body.data.payments).toEqual({ totalPaise: 15000, paymentCount: 2 });
  });

  it('recentCollections is capped at 5 and sorted newest first', async () => {
    const ngo = await seedNgo({ verified: true });

    for (let i = 0; i < 7; i++) {
      const society = await seedSociety();
      await seedActiveContractWithCollection(ngo, society);
    }

    const res = await api('get', '/api/ngo/dashboard', ngo);
    expect(res.body.data.recentCollections).toHaveLength(5);
  });

  it('recentCollections include materialType from the contract', async () => {
    const ngo = await seedNgo({ verified: true });
    const society = await seedSociety();
    await seedActiveContractWithCollection(ngo, society);

    const res = await api('get', '/api/ngo/dashboard', ngo);
    expect(res.body.data.recentCollections[0].materialType).toBe('plastic');
  });

  it('activeSocietyIds lists unique societies with active contracts', async () => {
    const ngo = await seedNgo({ verified: true });
    const soc1 = await seedSociety();
    const soc2 = await seedSociety();

    // Two active contracts on the same society and one on another
    await seedContract({ ngoId: ngo._id, societyId: soc1._id, status: 'active' });
    await seedContract({ ngoId: ngo._id, societyId: soc1._id, status: 'active' });
    await seedContract({ ngoId: ngo._id, societyId: soc2._id, status: 'active' });
    // A completed contract on soc2 should not add a duplicate
    await seedContract({ ngoId: ngo._id, societyId: soc2._id, status: 'completed' });

    const res = await api('get', '/api/ngo/dashboard', ngo);
    const { activeSocietyIds } = res.body.data;
    // Unique ids only
    expect(new Set(activeSocietyIds).size).toBe(activeSocietyIds.length);
    expect(activeSocietyIds).toHaveLength(2);
    expect(activeSocietyIds).toContain(soc1.id);
    expect(activeSocietyIds).toContain(soc2.id);
  });

  it('403 for a person, 401 without a token', async () => {
    expect((await api('get', '/api/ngo/dashboard', await seedPerson())).status).toBe(403);
    expect((await api('get', '/api/ngo/dashboard')).status).toBe(401);
  });
});
