const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const env = require('../../src/config/env');
const { User, Contribution, Flag, Collection } = require('../../src/models');
const {
  seedPerson, seedResident, seedSociety, seedOfficer, seedNgo, seedBhangarwala, authHeader,
} = require('../fixtures');

const oid = () => new mongoose.Types.ObjectId();
const api = (method, path, user) => request(app)[method](path).set(user ? authHeader(user) : {});
const DOC = { documentUrl: '/uploads/3f2b1c9e-0000-4000-8000-000000000000.pdf', orgName: 'Green Earth Trust' };

// ── E54 / E55 ────────────────────────────────────────────────────────────────

describe('E54 POST /api/ngo/verification', () => {
  it('moves none -> pending and stores the document, org name and time', async () => {
    const ngo = await seedNgo();
    const res = await api('post', '/api/ngo/verification', ngo).send(DOC);
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ status: 'pending', orgName: DOC.orgName, documentUrl: DOC.documentUrl });
    expect(res.body.data.submittedAt).toEqual(expect.any(String));

    const saved = await User.findById(ngo._id);
    expect(saved.ngo).toMatchObject({ verificationStatus: 'pending', orgName: DOC.orgName, documentUrl: DOC.documentUrl });
    expect(saved.ngo.submittedAt).toBeInstanceOf(Date);
  });

  it('lets an NGO re-submit while pending, or after a rejection', async () => {
    const ngo = await seedNgo();
    await api('post', '/api/ngo/verification', ngo).send(DOC).expect(200);
    const again = await api('post', '/api/ngo/verification', ngo).send({ ...DOC, orgName: 'Renamed Trust' });
    expect(again.status).toBe(200);
    expect(again.body.data.orgName).toBe('Renamed Trust');

    await User.updateOne({ _id: ngo._id }, { 'ngo.verificationStatus': 'rejected' });
    const afterReject = await api('post', '/api/ngo/verification', ngo).send(DOC);
    expect([afterReject.status, afterReject.body.data.status]).toEqual([200, 'pending']);
  });

  it('409 INVALID_TRANSITION once already approved, and the approval is untouched', async () => {
    const ngo = await seedNgo({ verified: true });
    const res = await api('post', '/api/ngo/verification', ngo).send(DOC);
    expect([res.status, res.body.error.code]).toEqual([409, 'INVALID_TRANSITION']);
    expect((await User.findById(ngo._id)).ngo.verificationStatus).toBe('approved');
  });

  it('400 when the document or organisation name is missing', async () => {
    const ngo = await seedNgo();
    expect((await api('post', '/api/ngo/verification', ngo).send({ orgName: 'X' })).status).toBe(400);
    expect((await api('post', '/api/ngo/verification', ngo).send({ documentUrl: '/uploads/a.pdf' })).status).toBe(400);
    expect((await User.findById(ngo._id)).ngo.verificationStatus).toBe('none');
  });

  it('403 for a person or bhangarwala, 401 without a token', async () => {
    expect((await api('post', '/api/ngo/verification', await seedPerson()).send(DOC)).status).toBe(403);
    expect((await api('post', '/api/ngo/verification', await seedBhangarwala()).send(DOC)).status).toBe(403);
    expect((await api('post', '/api/ngo/verification').send(DOC)).status).toBe(401);
  });
});

describe('E55 GET /api/ngo/verification/status', () => {
  it('reports none, then pending, then approved', async () => {
    const ngo = await seedNgo();
    const none = await api('get', '/api/ngo/verification/status', ngo);
    expect(none.status).toBe(200);
    expect(none.body.data).toMatchObject({ status: 'none', submittedAt: null });

    await api('post', '/api/ngo/verification', ngo).send(DOC);
    const pending = await api('get', '/api/ngo/verification/status', ngo);
    expect(pending.body.data.status).toBe('pending');
    expect(pending.body.data.submittedAt).toEqual(expect.any(String));

    await api('post', '/api/ngo/verification/demo-approve', ngo);
    expect((await api('get', '/api/ngo/verification/status', ngo)).body.data.status).toBe('approved');
  });

  it('403 for a person, 401 without a token', async () => {
    expect((await api('get', '/api/ngo/verification/status', await seedPerson())).status).toBe(403);
    expect((await api('get', '/api/ngo/verification/status')).status).toBe(401);
  });
});

// ── E56 ──────────────────────────────────────────────────────────────────────

describe('E56 POST /api/ngo/verification/demo-approve', () => {
  const approve = (user) => api('post', '/api/ngo/verification/demo-approve', user);

  afterEach(() => { env.DEMO_MODE = true; }); // jest.env.js turns DEMO_MODE on

  it('approves a pending verification', async () => {
    const ngo = await seedNgo();
    await api('post', '/api/ngo/verification', ngo).send(DOC);
    const res = await approve(ngo);
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('approved');
    expect((await User.findById(ngo._id)).ngo.verificationStatus).toBe('approved');
  });

  it('404 DEMO_DISABLED when DEMO_MODE is off — for everyone, signed in or not', async () => {
    const ngo = await seedNgo();
    await api('post', '/api/ngo/verification', ngo).send(DOC);
    env.DEMO_MODE = false;

    for (const caller of [ngo, await seedPerson(), null]) {
      const res = await approve(caller);
      expect([res.status, res.body.error.code]).toEqual([404, 'DEMO_DISABLED']);
    }
    expect((await User.findById(ngo._id)).ngo.verificationStatus).toBe('pending');
  });

  it('409 when approving from none (nothing submitted), or twice', async () => {
    const ngo = await seedNgo();
    const fromNone = await approve(ngo);
    expect([fromNone.status, fromNone.body.error.code]).toEqual([409, 'INVALID_TRANSITION']);

    await api('post', '/api/ngo/verification', ngo).send(DOC);
    await approve(ngo).expect(200);
    expect((await approve(ngo)).status).toBe(409);
  });

  it('409 for a rejected verification', async () => {
    const ngo = await seedNgo();
    await User.updateOne({ _id: ngo._id }, { 'ngo.verificationStatus': 'rejected' });
    expect((await approve(ngo)).status).toBe(409);
  });

  it('403 for a person, 401 without a token (DEMO_MODE on)', async () => {
    expect((await approve(await seedPerson())).status).toBe(403);
    expect((await approve(null)).status).toBe(401);
  });

  it('a full onboarding: sign up -> submit -> approve -> unlocks verified-only endpoints', async () => {
    const signup = await request(app).post('/api/auth/signup').send({
      name: 'Org Admin', email: 'org@test.com', password: 'Password123!', phone: '9000000077', role: 'ngo',
    });
    const headers = { Authorization: `Bearer ${signup.body.data.accessToken}` };
    const society = await seedSociety();

    await request(app).get(`/api/ngo/societies/${society.id}`).set(headers).expect(403);
    await request(app).post('/api/ngo/verification').set(headers).send(DOC).expect(200);
    await request(app).get(`/api/ngo/societies/${society.id}`).set(headers).expect(403); // pending is not enough
    await request(app).post('/api/ngo/verification/demo-approve').set(headers).expect(200);
    await request(app).get(`/api/ngo/societies/${society.id}`).set(headers).expect(200);
  });
});

// ── E20 ──────────────────────────────────────────────────────────────────────

describe('E20 GET /api/ngo/societies/:societyId', () => {
  async function fullSociety() {
    const society = await seedSociety({ trustScore: 76 });
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const treasurer = await seedOfficer({ role: 'treasurer', societyId: society._id });
    const resident = await seedResident({ societyId: society._id });
    return { society, cp, treasurer, resident };
  }

  it('gives a verified NGO trust, both officers\' contacts and the public fields', async () => {
    const { society, cp, treasurer } = await fullSociety();
    const res = await api('get', `/api/ngo/societies/${society.id}`, await seedNgo({ verified: true }));
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      id: society.id, name: society.name, trustScore: 76, memberCount: 3, flagCount: 0, totalCollectedKg: 0,
    });

    const byRole = Object.fromEntries(res.body.data.officers.map((o) => [o.societyRole, o]));
    expect(byRole.cp).toEqual({
      id: cp.id, name: cp.name, phone: cp.phone, email: cp.email, societyRole: 'cp',
    });
    expect(byRole.treasurer).toMatchObject({ id: treasurer.id, phone: treasurer.phone, email: treasurer.email });
  });

  it('lists just the CP when there is no treasurer', async () => {
    const society = await seedSociety();
    const res = await api('get', `/api/ngo/societies/${society.id}`, await seedNgo({ verified: true }));
    expect(res.body.data.officers).toHaveLength(1);
    expect(res.body.data.officers[0].societyRole).toBe('cp');
  });

  it('returns monthly contribution history, newest month first, split by category', async () => {
    const { society, resident } = await fullSociety();
    const log = (category, weightKg, at) =>
      Contribution.create({ userId: resident._id, societyId: society._id, category, weightKg, loggedAt: new Date(at) });
    await log('plastic', 5, '2026-01-15T10:00:00Z');
    await log('paper', 3, '2026-01-20T10:00:00Z');
    await log('plastic', 2, '2026-02-10T10:00:00Z');
    // another society's contribution must not leak in
    const other = await seedResident();
    await Contribution.create({ userId: other._id, societyId: other.societyId, category: 'glass', weightKg: 99 });

    const res = await api('get', `/api/ngo/societies/${society.id}`, await seedNgo({ verified: true }));
    expect(res.body.data.contributionHistory).toEqual([
      { month: '2026-02', totalKg: 2, byCategory: { plastic: 2 } },
      { month: '2026-01', totalKg: 8, byCategory: { plastic: 5, paper: 3 } },
    ]);
  });

  it('keeps only the latest 12 months of history', async () => {
    const { society, resident } = await fullSociety();
    for (let m = 0; m < 14; m += 1) {
      await Contribution.create({
        userId: resident._id, societyId: society._id, category: 'plastic', weightKg: 1,
        loggedAt: new Date(Date.UTC(2025, m, 10)),
      });
    }
    const res = await api('get', `/api/ngo/societies/${society.id}`, await seedNgo({ verified: true }));
    const months = res.body.data.contributionHistory.map((h) => h.month);
    expect(months).toHaveLength(12);
    expect(months[0]).toBe('2026-02');
    expect(months[11]).toBe('2025-03');
  });

  it('returns the flag history (newest first) and the flag count and collected kg', async () => {
    const { society } = await fullSociety();
    const flag = (shortfallKg, createdAt) =>
      Flag.create({
        societyId: society._id, contractId: oid(), collectionId: oid(), promisedKg: 20, actualKg: 20 - shortfallKg, shortfallKg, createdAt,
      });
    await flag(5, new Date('2026-01-31'));
    await flag(10, new Date('2026-02-28'));
    await Collection.create({
      contractId: oid(), societyId: society._id, ngoId: oid(), category: 'plastic',
      windowStart: new Date(), windowEnd: new Date(), promisedKg: 20, actualKg: 12,
    });

    const res = await api('get', `/api/ngo/societies/${society.id}`, await seedNgo({ verified: true }));
    expect(res.body.data.flagHistory.map((f) => f.shortfallKg)).toEqual([10, 5]);
    expect(res.body.data.flagHistory[0]).toMatchObject({ promisedKg: 20, actualKg: 10 });
    expect(res.body.data).toMatchObject({ flagCount: 2, totalCollectedKg: 12 });
  });

  it('is empty for a brand-new society', async () => {
    const society = await seedSociety();
    const res = await api('get', `/api/ngo/societies/${society.id}`, await seedNgo({ verified: true }));
    expect(res.body.data.contributionHistory).toEqual([]);
    expect(res.body.data.flagHistory).toEqual([]);
  });

  it('403 NGO_NOT_VERIFIED for an unverified or pending NGO, and for a person or bhangarwala', async () => {
    const { society } = await fullSociety();
    const url = `/api/ngo/societies/${society.id}`;

    const unverified = await api('get', url, await seedNgo({ verified: false }));
    expect([unverified.status, unverified.body.error.code]).toEqual([403, 'NGO_NOT_VERIFIED']);

    const pending = await seedNgo();
    await User.updateOne({ _id: pending._id }, { 'ngo.verificationStatus': 'pending' });
    expect((await api('get', url, pending)).status).toBe(403);

    expect((await api('get', url, await seedPerson())).status).toBe(403);
    expect((await api('get', url, await seedBhangarwala())).status).toBe(403);
    expect((await api('get', url)).status).toBe(401);
  });

  it('404 for an unknown or malformed society id', async () => {
    const ngo = await seedNgo({ verified: true });
    expect((await api('get', `/api/ngo/societies/${oid()}`, ngo)).status).toBe(404);
    expect((await api('get', '/api/ngo/societies/nope', ngo)).status).toBe(404);
  });

  it('officer contacts never appear on the public endpoints (E11/E12), even for a verified NGO', async () => {
    const { society, cp } = await fullSociety();
    const ngo = await seedNgo({ verified: true });

    const list = await api('get', '/api/societies', ngo);
    const detail = await api('get', `/api/societies/${society.id}`, ngo);
    for (const body of [list.body, detail.body]) {
      const text = JSON.stringify(body);
      expect(text).not.toContain(cp.phone);
      expect(text).not.toContain(cp.email);
      expect(text).not.toMatch(/"officers"/);
    }
  });
});
