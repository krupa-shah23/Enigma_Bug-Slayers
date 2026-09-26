/**
 * tests/integration/bhangarwala-profile.test.js
 * E36 GET  /api/bhangarwala/profile
 * E37 PATCH /api/bhangarwala/profile
 */

const request = require('supertest');
const app = require('../../src/app');
const { Job } = require('../../src/models');
const { seedBhangarwala, seedPerson, seedP2PRequest, authHeader } = require('../fixtures');

const api = (method, path, user) =>
  request(app)[method](path).set(user ? authHeader(user) : {});

// ─────────────────────────────────────────────────────────────────────────────
// E36 GET /api/bhangarwala/profile
// ─────────────────────────────────────────────────────────────────────────────

describe('E36 GET /api/bhangarwala/profile', () => {
  it('returns the profile with zero earnings for a fresh account', async () => {
    const bh = await seedBhangarwala({ lat: 19.0, lng: 72.8, vehicleType: 'cycle', isOnline: true });
    const res = await api('get', '/api/bhangarwala/profile', bh);
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      id: bh.id,
      name: bh.name,
      email: bh.email,
      vehicleType: 'cycle',
      isOnline: true,
      totalEarnings: 0,
      jobCount: 0,
    });
    expect(res.body.data.location).toMatchObject({ lat: 19.0, lng: 72.8 });
  });

  it('returns accumulated earnings from completed jobs', async () => {
    const bh = await seedBhangarwala({ lat: 19.0, lng: 72.8 });
    const person = await seedPerson();
    const req1 = await seedP2PRequest({ personId: person._id });
    const req2 = await seedP2PRequest({ personId: person._id });

    // Insert two completed jobs directly
    await Job.create([
      {
        requestId: req1._id, quoteId: new (require('mongoose').Types.ObjectId)(),
        personId: person._id, bhangarwalaId: bh._id,
        price: 120, status: 'completed', completedAt: new Date(),
      },
      {
        requestId: req2._id, quoteId: new (require('mongoose').Types.ObjectId)(),
        personId: person._id, bhangarwalaId: bh._id,
        price: 80, status: 'completed', completedAt: new Date(),
      },
    ]);

    const res = await api('get', '/api/bhangarwala/profile', bh);
    expect(res.status).toBe(200);
    expect(res.body.data.totalEarnings).toBe(200);
    expect(res.body.data.jobCount).toBe(2);
  });

  it('only counts this bhangarwala\'s own jobs', async () => {
    const bh1 = await seedBhangarwala({ lat: 19.0, lng: 72.8 });
    const bh2 = await seedBhangarwala({ lat: 19.1, lng: 72.8 });
    const person = await seedPerson();
    const req1 = await seedP2PRequest({ personId: person._id });

    await Job.create({
      requestId: req1._id, quoteId: new (require('mongoose').Types.ObjectId)(),
      personId: person._id, bhangarwalaId: bh2._id,
      price: 500, status: 'completed', completedAt: new Date(),
    });

    const res = await api('get', '/api/bhangarwala/profile', bh1);
    expect(res.body.data.totalEarnings).toBe(0);
    expect(res.body.data.jobCount).toBe(0);
  });

  it('returns null location when no location has been set', async () => {
    const bh = await seedBhangarwala({ isOnline: false });
    const res = await api('get', '/api/bhangarwala/profile', bh);
    expect(res.status).toBe(200);
    expect(res.body.data.location).toBeNull();
    expect(res.body.data.isOnline).toBe(false);
  });

  it('403 for a person, 401 without a token', async () => {
    expect((await api('get', '/api/bhangarwala/profile', await seedPerson())).status).toBe(403);
    expect((await api('get', '/api/bhangarwala/profile')).status).toBe(401);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// E37 PATCH /api/bhangarwala/profile
// ─────────────────────────────────────────────────────────────────────────────

describe('E37 PATCH /api/bhangarwala/profile', () => {
  it('updates vehicleType and areaNote', async () => {
    const bh = await seedBhangarwala({ lat: 19.0, lng: 72.8, vehicleType: 'cycle' });
    const res = await api('patch', '/api/bhangarwala/profile', bh)
      .send({ vehicleType: 'auto-rickshaw', areaNote: 'Operates in Andheri only' });
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      vehicleType: 'auto-rickshaw',
      areaNote: 'Operates in Andheri only',
    });
  });

  it('can update only vehicleType (partial patch)', async () => {
    const bh = await seedBhangarwala({ lat: 19.0, lng: 72.8, vehicleType: 'cycle' });
    await api('patch', '/api/bhangarwala/profile', bh).send({ areaNote: 'South Mumbai' });
    const res = await api('patch', '/api/bhangarwala/profile', bh).send({ vehicleType: 'truck' });
    expect(res.status).toBe(200);
    // The areaNote set in the previous call should be preserved
    const profile = await api('get', '/api/bhangarwala/profile', bh);
    expect(profile.body.data.vehicleType).toBe('truck');
    expect(profile.body.data.areaNote).toBe('South Mumbai');
  });

  it('can clear areaNote with an empty string', async () => {
    const bh = await seedBhangarwala({ lat: 19.0, lng: 72.8 });
    await api('patch', '/api/bhangarwala/profile', bh).send({ areaNote: 'Some area' });
    const res = await api('patch', '/api/bhangarwala/profile', bh).send({ areaNote: '' });
    expect(res.status).toBe(200);
    expect(res.body.data.areaNote).toBe('');
  });

  it('400 for an empty body', async () => {
    const bh = await seedBhangarwala({ lat: 19.0, lng: 72.8 });
    expect((await api('patch', '/api/bhangarwala/profile', bh).send({})).status).toBe(400);
  });

  it('403 for a person, 401 without a token', async () => {
    expect((await api('patch', '/api/bhangarwala/profile', await seedPerson()).send({ vehicleType: 'x' })).status).toBe(403);
    expect((await api('patch', '/api/bhangarwala/profile').send({ vehicleType: 'x' })).status).toBe(401);
  });
});
