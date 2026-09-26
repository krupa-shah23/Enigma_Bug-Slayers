const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const { computeEta } = require('../../src/services/eta');
const {
  User, P2PRequest, Quote, Job,
} = require('../../src/models');
const {
  seedPerson, seedSociety, seedNgo, seedBhangarwala, seedP2PRequest, authHeader,
} = require('../fixtures');

const oid = () => new mongoose.Types.ObjectId();
const MUMBAI = { lat: 19.076, lng: 72.8777 };
const KM = 1 / 111.195; // degrees of latitude per km
const north = (km) => ({ lat: MUMBAI.lat + km * KM, lng: MUMBAI.lng });
const api = (method, path, user) => request(app)[method](path).set(user ? authHeader(user) : {});

const postQuote = (bhangarwala, req, price = 150) =>
  api('post', `/api/bhangarwala/requests/${req.id}/quote`, bhangarwala).send({ price });
const select = (person, req, quoteId) =>
  api('post', `/api/p2p/requests/${req.id}/select-quote`, person).send({ quoteId });

// A person, two online bhangarwalas and an open request that notified both
async function scenario() {
  const person = await seedPerson();
  const b1 = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
  const b2 = await seedBhangarwala({ lat: 19.07, lng: 72.87 });
  const req = await seedP2PRequest({ personId: person._id, notified: [b1._id, b2._id] });
  return { person, b1, b2, req };
}

// ── E23 ──────────────────────────────────────────────────────────────────────

describe('E23 POST /api/p2p/requests', () => {
  const body = (o = {}) => ({
    photoUrl: '/uploads/a.png', description: 'Old paper', category: 'paper', ...MUMBAI, ...o,
  });

  it('notifies exactly the online bhangarwalas within 3 km', async () => {
    const person = await seedPerson();
    const near = await seedBhangarwala(north(1));
    await seedBhangarwala(north(5)); // too far
    await seedBhangarwala({ ...north(1), locationUpdatedAt: new Date(Date.now() - 20 * 60 * 1000) }); // stale ping
    await seedBhangarwala({ ...north(1), isOnline: false }); // toggled offline
    await seedBhangarwala(); // online but never shared a location

    const res = await api('post', '/api/p2p/requests', person).send(body());
    expect(res.status).toBe(201);
    expect(res.body.data.notifiedCount).toBe(1);

    const saved = await P2PRequest.findById(res.body.data.request.id);
    expect(saved.notifiedBhangarwalaIds.map(String)).toEqual([near.id]);
    expect(saved.status).toBe('open');
    expect(saved.personId.toString()).toBe(person.id);
  });

  it('returns the request without leaking who was notified', async () => {
    await seedBhangarwala(north(1));
    const res = await api('post', '/api/p2p/requests', await seedPerson()).send(body());
    expect(res.body.data.request).toMatchObject({ category: 'paper', description: 'Old paper', status: 'open' });
    expect(res.body.data.request).not.toHaveProperty('notifiedBhangarwalaIds');
  });

  it('notifies nobody when no bhangarwala is around', async () => {
    const res = await api('post', '/api/p2p/requests', await seedPerson()).send(body());
    expect(res.status).toBe(201);
    expect(res.body.data.notifiedCount).toBe(0);
  });

  it('works for a person who is not in a society', async () => {
    expect((await api('post', '/api/p2p/requests', await seedPerson()).send(body())).status).toBe(201);
  });

  it('400 on missing photo, bad category or bad coordinates', async () => {
    const person = await seedPerson();
    expect((await api('post', '/api/p2p/requests', person).send(body({ photoUrl: undefined }))).status).toBe(400);
    expect((await api('post', '/api/p2p/requests', person).send(body({ category: 'gold' }))).status).toBe(400);
    expect((await api('post', '/api/p2p/requests', person).send(body({ lat: 95 }))).status).toBe(400);
    expect((await api('post', '/api/p2p/requests', person).send(body({ lng: undefined }))).status).toBe(400);
  });

  it('403 for an NGO or bhangarwala, 401 without a token', async () => {
    expect((await api('post', '/api/p2p/requests', await seedNgo()).send(body())).status).toBe(403);
    expect((await api('post', '/api/p2p/requests', await seedBhangarwala()).send(body())).status).toBe(403);
    expect((await api('post', '/api/p2p/requests').send(body())).status).toBe(401);
  });
});

// ── E24 ──────────────────────────────────────────────────────────────────────

describe('E24 GET /api/p2p/requests/mine', () => {
  it('lists only my requests, newest first, with quoteCount and jobId', async () => {
    const { person, b1, b2, req } = await scenario();
    const older = await seedP2PRequest({ personId: person._id, createdAt: new Date(Date.now() - 60 * 1000) });
    await seedP2PRequest(); // someone else's
    await postQuote(b1, req);
    await postQuote(b2, req, 180);
    const q = await Quote.findOne({ bhangarwalaId: b1._id });
    await select(person, req, q.id);

    const res = await api('get', '/api/p2p/requests/mine', person);
    expect(res.status).toBe(200);
    expect(res.body.data.map((r) => r.id)).toEqual([req.id, older.id]); // newest first
    const mine = res.body.data.find((r) => r.id === req.id);
    expect(mine).toMatchObject({ status: 'assigned', quoteCount: 2 });
    expect(mine.jobId).toEqual(expect.any(String));
    expect(res.body.data.find((r) => r.id === older.id)).toMatchObject({ status: 'open', quoteCount: 0 });
    expect(mine).not.toHaveProperty('notifiedBhangarwalaIds');
  });

  it('filters by status and rejects an unknown one', async () => {
    const person = await seedPerson();
    await seedP2PRequest({ personId: person._id });
    const done = await seedP2PRequest({ personId: person._id, status: 'completed' });

    const res = await api('get', '/api/p2p/requests/mine?status=completed', person);
    expect(res.body.data.map((r) => r.id)).toEqual([done.id]);
    expect((await api('get', '/api/p2p/requests/mine?status=weird', person)).status).toBe(400);
  });

  it('is empty when there are no requests, and blocked for other roles', async () => {
    expect((await api('get', '/api/p2p/requests/mine', await seedPerson())).body.data).toEqual([]);
    expect((await api('get', '/api/p2p/requests/mine', await seedBhangarwala())).status).toBe(403);
  });
});

// ── E30 ──────────────────────────────────────────────────────────────────────

describe('E30 POST /api/bhangarwala/requests/:requestId/quote', () => {
  it('two bhangarwalas can quote the same request; ETA and distance are server-computed', async () => {
    const { b1, b2, req } = await scenario();
    const q1 = await postQuote(b1, req, 150);
    const q2 = await postQuote(b2, req, 180);
    expect(q1.status).toBe(201);
    expect(q2.status).toBe(201);

    const expected = computeEta({ lat: 19.08, lng: 72.88 }, req.location);
    expect(q1.body.data.quote).toMatchObject({ price: 150, etaMinutes: expected, status: 'pending' });
    expect(q1.body.data.quote.distanceKm).toBeGreaterThan(0);
    expect(q1.body.data.quote.id).toEqual(expect.any(String));
  });

  it('ignores a client-supplied eta/distance', async () => {
    const { b1, req } = await scenario();
    const res = await api('post', `/api/bhangarwala/requests/${req.id}/quote`, b1).send({
      price: 100, etaMinutes: 1, distanceKm: 0,
    });
    expect(res.body.data.quote.etaMinutes).toBe(computeEta({ lat: 19.08, lng: 72.88 }, req.location));
  });

  it('409 ALREADY_QUOTED when the same bhangarwala quotes twice', async () => {
    const { b1, req } = await scenario();
    await postQuote(b1, req);
    const res = await postQuote(b1, req, 90);
    expect([res.status, res.body.error.code]).toEqual([409, 'ALREADY_QUOTED']);
    expect(await Quote.countDocuments()).toBe(1);
  });

  it('two simultaneous quotes from one bhangarwala: exactly one is stored', async () => {
    const { b1, req } = await scenario();
    const results = await Promise.all([postQuote(b1, req, 100), postQuote(b1, req, 110)]);
    expect(results.map((r) => r.status).sort()).toEqual([201, 409]);
    expect(await Quote.countDocuments()).toBe(1);
  });

  it('400 LOCATION_UNKNOWN when he has never shared a location', async () => {
    const person = await seedPerson();
    const noLocation = await seedBhangarwala();
    const req = await seedP2PRequest({ personId: person._id });
    const res = await postQuote(noLocation, req);
    expect([res.status, res.body.error.code]).toEqual([400, 'LOCATION_UNKNOWN']);
  });

  it('409 REQUEST_NOT_OPEN once the request is assigned', async () => {
    const { b1, req } = await scenario();
    await P2PRequest.updateOne({ _id: req._id }, { status: 'assigned' });
    const res = await postQuote(b1, req);
    expect([res.status, res.body.error.code]).toEqual([409, 'REQUEST_NOT_OPEN']);
  });

  it('400 for a missing, zero or negative price', async () => {
    const { b1, req } = await scenario();
    const url = `/api/bhangarwala/requests/${req.id}/quote`;
    expect((await api('post', url, b1).send({})).status).toBe(400);
    expect((await api('post', url, b1).send({ price: 0 })).status).toBe(400);
    expect((await api('post', url, b1).send({ price: -5 })).status).toBe(400);
  });

  it('404 for an unknown or malformed request id', async () => {
    const { b1 } = await scenario();
    expect((await api('post', `/api/bhangarwala/requests/${oid()}/quote`, b1).send({ price: 10 })).status).toBe(404);
    expect((await api('post', '/api/bhangarwala/requests/nope/quote', b1).send({ price: 10 })).status).toBe(404);
  });

  it('403 for a person, 401 without a token', async () => {
    const { person, req } = await scenario();
    expect((await api('post', `/api/bhangarwala/requests/${req.id}/quote`, person).send({ price: 10 })).status).toBe(403);
    expect((await api('post', `/api/bhangarwala/requests/${req.id}/quote`).send({ price: 10 })).status).toBe(401);
  });
});

// ── E25 ──────────────────────────────────────────────────────────────────────

describe('E25 GET /api/p2p/requests/:requestId/quotes', () => {
  it('shows the owner every quote with price, ETA, distance and the bhangarwala\'s name', async () => {
    const { person, b1, b2, req } = await scenario();
    await User.updateOne({ _id: b1._id }, { avatarUrl: '/uploads/b1.png' });
    await postQuote(b1, req, 180);
    await postQuote(b2, req, 150);

    const res = await api('get', `/api/p2p/requests/${req.id}/quotes`, person);
    expect(res.status).toBe(200);
    expect(res.body.data.map((q) => q.price)).toEqual([150, 180]); // cheapest first
    expect(res.body.data[1]).toMatchObject({
      bhangarwala: { name: b1.name, avatar: '/uploads/b1.png' },
      status: 'pending',
      requestId: req.id,
      bhangarwalaId: b1.id,
    });
    expect(res.body.data[0].etaMinutes).toEqual(expect.any(Number));
    expect(res.body.data[0].distanceKm).toEqual(expect.any(Number));
  });

  it('is empty when nobody has quoted', async () => {
    const { person, req } = await scenario();
    expect((await api('get', `/api/p2p/requests/${req.id}/quotes`, person)).body.data).toEqual([]);
  });

  it('403 for another person, 404 for unknown/malformed ids, 403 for a bhangarwala', async () => {
    const { b1, req } = await scenario();
    expect((await api('get', `/api/p2p/requests/${req.id}/quotes`, await seedPerson())).status).toBe(403);
    const owner = await User.findById(req.personId);
    expect((await api('get', `/api/p2p/requests/${oid()}/quotes`, owner)).status).toBe(404);
    expect((await api('get', '/api/p2p/requests/nope/quotes', owner)).status).toBe(404);
    expect((await api('get', `/api/p2p/requests/${req.id}/quotes`, b1)).status).toBe(403);
  });
});

// ── E26 ──────────────────────────────────────────────────────────────────────

describe('E26 POST /api/p2p/requests/:requestId/select-quote', () => {
  async function quoted() {
    const s = await scenario();
    const q1 = (await postQuote(s.b1, s.req, 150)).body.data.quote;
    const q2 = (await postQuote(s.b2, s.req, 180)).body.data.quote;
    return { ...s, q1, q2 };
  }

  it('creates an assigned Job, assigns the request, accepts the chosen quote and expires the rest', async () => {
    const { person, b1, req, q1, q2 } = await quoted();
    const res = await select(person, req, q1.id);
    expect(res.status).toBe(200);
    expect(res.body.data.job).toMatchObject({
      status: 'assigned', price: 150, personId: person.id, bhangarwalaId: b1.id, requestId: req.id, quoteId: q1.id,
    });
    expect(res.body.data.job.statusHistory.map((h) => h.status)).toEqual(['assigned']);

    const saved = await P2PRequest.findById(req._id);
    expect(saved.status).toBe('assigned');
    expect(saved.jobId.toString()).toBe(res.body.data.job.id);
    expect((await Quote.findById(q1.id)).status).toBe('accepted');
    expect((await Quote.findById(q2.id)).status).toBe('expired');
  });

  it('the owner sees the expired quote on E25 afterwards', async () => {
    const { person, req, q1, q2 } = await quoted();
    await select(person, req, q1.id);
    const list = await api('get', `/api/p2p/requests/${req.id}/quotes`, person);
    expect(list.body.data.find((q) => q.id === q2.id).status).toBe('expired');
    expect(list.body.data.find((q) => q.id === q1.id).status).toBe('accepted');
  });

  it('409 when selecting an expired quote after a selection was made', async () => {
    const { person, req, q1, q2 } = await quoted();
    await select(person, req, q1.id);
    const res = await select(person, req, q2.id);
    expect(res.status).toBe(409);
    expect(['QUOTE_NOT_PENDING', 'REQUEST_NOT_OPEN']).toContain(res.body.error.code);
    expect(await Job.countDocuments()).toBe(1);
  });

  it('409 REQUEST_NOT_OPEN when selecting again on an already-assigned request', async () => {
    const { person, req, q1 } = await quoted();
    await select(person, req, q1.id);
    const res = await select(person, req, q1.id);
    expect([res.status, res.body.error.code]).toEqual([409, 'REQUEST_NOT_OPEN']);
  });

  it('409 QUOTE_NOT_PENDING for an expired quote on an open request, and nothing is left half-done', async () => {
    const { person, req, q1 } = await quoted();
    await Quote.updateOne({ _id: q1.id }, { status: 'expired' });

    const res = await select(person, req, q1.id);
    expect([res.status, res.body.error.code]).toEqual([409, 'QUOTE_NOT_PENDING']);
    // the transaction rolled back: request still open, no job, other quote still pending
    expect((await P2PRequest.findById(req._id)).status).toBe('open');
    expect(await Job.countDocuments()).toBe(0);
  });

  it('403 for a non-owner', async () => {
    const { req, q1 } = await quoted();
    const res = await select(await seedPerson(), req, q1.id);
    expect(res.status).toBe(403);
    expect((await P2PRequest.findById(req._id)).status).toBe('open');
  });

  it('404 for an unknown quote or a quote that belongs to another request', async () => {
    const { person, req } = await quoted();
    expect((await select(person, req, oid().toString())).status).toBe(404);

    const other = await seedP2PRequest({ personId: person._id, notified: [] });
    const b3 = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    const foreign = (await postQuote(b3, other)).body.data.quote;
    expect((await select(person, req, foreign.id)).status).toBe(404);
  });

  it('400 for a missing or malformed quoteId, 404 for an unknown request', async () => {
    const { person, req } = await quoted();
    expect((await api('post', `/api/p2p/requests/${req.id}/select-quote`, person).send({})).status).toBe(400);
    expect((await select(person, req, 'nope')).status).toBe(400);
    expect((await api('post', `/api/p2p/requests/${oid()}/select-quote`, person).send({ quoteId: oid().toString() })).status).toBe(404);
  });

  it('two simultaneous selects: exactly one succeeds, the other gets 409, one Job exists', async () => {
    const { person, req, q1, q2 } = await quoted();
    const [a, b] = await Promise.all([select(person, req, q1.id), select(person, req, q2.id)]);

    expect([a.status, b.status].sort()).toEqual([200, 409]);
    expect(await Job.countDocuments()).toBe(1);
    expect(await Quote.countDocuments({ status: 'accepted' })).toBe(1);
    expect(await Quote.countDocuments({ status: 'expired' })).toBe(1);
    expect((await P2PRequest.findById(req._id)).status).toBe('assigned');
  });

  it('two simultaneous selects of the same quote: still exactly one Job', async () => {
    const { person, req, q1 } = await quoted();
    const results = await Promise.all([select(person, req, q1.id), select(person, req, q1.id)]);
    expect(results.map((r) => r.status).sort()).toEqual([200, 409]);
    expect(await Job.countDocuments()).toBe(1);
  });
});

// ── E29 ──────────────────────────────────────────────────────────────────────

describe('E29 GET /api/bhangarwala/requests', () => {
  it('lists open requests he was notified about, without personal details and with an approximate location', async () => {
    const person = await seedPerson();
    const b = await seedBhangarwala(north(1));
    const req = await seedP2PRequest({
      personId: person._id, notified: [b._id], location: { lat: 19.07612, lng: 72.87779 },
    });

    const res = await api('get', '/api/bhangarwala/requests', b);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0]).toMatchObject({
      id: req.id, category: 'paper', status: 'open', myQuote: null, location: { lat: 19.076, lng: 72.878 },
    });
    expect(res.body.data[0].distanceKm).toBeGreaterThan(0);
    expect(JSON.stringify(res.body)).not.toMatch(new RegExp(`${person.id}|${person.name}|${person.email}|${person.phone}`));
  });

  it('omits requests he was not notified about, and requests that are no longer open', async () => {
    const b = await seedBhangarwala(north(1));
    await seedP2PRequest({ notified: [] });
    await seedP2PRequest({ notified: [b._id], status: 'assigned' });
    expect((await api('get', '/api/bhangarwala/requests', b)).body.data).toEqual([]);
  });

  it('shows myQuote and tracks it from pending to expired once someone else is chosen', async () => {
    const { person, b1, b2, req } = await scenario();
    await postQuote(b1, req, 150);
    await postQuote(b2, req, 180);

    const pending = await api('get', '/api/bhangarwala/requests', b2);
    expect(pending.body.data[0].myQuote).toMatchObject({ price: 180, status: 'pending' });
    expect(pending.body.data[0].myQuote.etaMinutes).toEqual(expect.any(Number));

    const chosen = await Quote.findOne({ bhangarwalaId: b1._id });
    await select(person, req, chosen.id);

    const winner = await api('get', '/api/bhangarwala/requests', b1);
    expect(winner.body.data[0].myQuote.status).toBe('accepted');
    const loser = await api('get', '/api/bhangarwala/requests', b2);
    expect(loser.body.data[0]).toMatchObject({ status: 'assigned' });
    expect(loser.body.data[0].myQuote.status).toBe('expired');
  });

  it('includes a request he quoted within 24 h even if he was not notified, but not older ones', async () => {
    const b = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    const recent = await seedP2PRequest({ notified: [] });
    const old = await seedP2PRequest({ notified: [] });
    await postQuote(b, recent);
    await Quote.create({
      requestId: old._id, bhangarwalaId: b._id, price: 50, distanceKm: 1, etaMinutes: 5,
      createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
    });

    const res = await api('get', '/api/bhangarwala/requests', b);
    expect(res.body.data.map((r) => r.id)).toEqual([recent.id]);
  });

  it('distanceKm is null when he has no location; 403 for a person', async () => {
    const b = await seedBhangarwala();
    await seedP2PRequest({ notified: [b._id] });
    expect((await api('get', '/api/bhangarwala/requests', b)).body.data[0].distanceKm).toBeNull();
    expect((await api('get', '/api/bhangarwala/requests', await seedPerson())).status).toBe(403);
  });
});

// ── E28 ──────────────────────────────────────────────────────────────────────

describe('E28 GET /api/bhangarwala/nearby-people', () => {
  it('returns rounded dots for open requests and societies within 3 km only', async () => {
    const b = await seedBhangarwala(MUMBAI);
    await seedP2PRequest({ location: { lat: 19.0851234, lng: 72.8777891 } }); // ~1 km
    await seedP2PRequest({ location: north(5) }); // too far
    await seedP2PRequest({ location: north(1), status: 'assigned' }); // not open
    await seedSociety({ location: { lat: 19.0941567, lng: 72.8777 } }); // ~2 km
    await seedSociety({ location: north(10) }); // too far

    const res = await api('get', '/api/bhangarwala/nearby-people', b);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([
      { type: 'request', lat: 19.085, lng: 72.878 },
      { type: 'society', lat: 19.094, lng: 72.878 },
    ]);
  });

  it('is empty when he has no location; 403 for a person', async () => {
    expect((await api('get', '/api/bhangarwala/nearby-people', await seedBhangarwala())).body.data).toEqual([]);
    expect((await api('get', '/api/bhangarwala/nearby-people', await seedPerson())).status).toBe(403);
  });
});

// ── E31 ──────────────────────────────────────────────────────────────────────

describe('E31 POST /api/bhangarwala/location', () => {
  it('stores the location and marks him online', async () => {
    const b = await seedBhangarwala({ isOnline: false });
    const res = await api('post', '/api/bhangarwala/location', b).send({ lat: 19.1, lng: 72.9 });
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ location: { lat: 19.1, lng: 72.9 }, isOnline: true });

    const saved = await User.findById(b._id);
    expect(saved.bhangarwala.location.toObject()).toEqual({ lat: 19.1, lng: 72.9 });
    expect(saved.bhangarwala.isOnline).toBe(true);
    expect(Date.now() - saved.bhangarwala.locationUpdatedAt.getTime()).toBeLessThan(5000);
  });

  it('isOnline:false takes him offline and stops him being notified', async () => {
    const b = await seedBhangarwala(north(1));
    await api('post', '/api/bhangarwala/location', b).send({ ...north(1), isOnline: false });
    expect((await User.findById(b._id)).bhangarwala.isOnline).toBe(false);

    const res = await api('post', '/api/p2p/requests', await seedPerson())
      .send({ photoUrl: '/u/x.png', category: 'paper', ...MUMBAI });
    expect(res.body.data.notifiedCount).toBe(0);
  });

  it('a first ping makes a brand-new bhangarwala eligible for notifications', async () => {
    const signup = await request(app).post('/api/auth/signup').send({
      name: 'New B', email: 'newb@test.com', password: 'Password123!', phone: '9000000099', role: 'bhangarwala',
    });
    const headers = { Authorization: `Bearer ${signup.body.data.accessToken}` };

    const before = await api('post', '/api/p2p/requests', await seedPerson())
      .send({ photoUrl: '/u/x.png', category: 'paper', ...MUMBAI });
    expect(before.body.data.notifiedCount).toBe(0);

    await request(app).post('/api/bhangarwala/location').set(headers).send(north(1)).expect(200);

    const after = await api('post', '/api/p2p/requests', await seedPerson())
      .send({ photoUrl: '/u/x.png', category: 'paper', ...MUMBAI });
    expect(after.body.data.notifiedCount).toBe(1);
  });

  it('400 for missing/invalid coordinates or a non-boolean isOnline', async () => {
    const b = await seedBhangarwala();
    expect((await api('post', '/api/bhangarwala/location', b).send({ lat: 19 })).status).toBe(400);
    expect((await api('post', '/api/bhangarwala/location', b).send({ lat: 99, lng: 72 })).status).toBe(400);
    expect((await api('post', '/api/bhangarwala/location', b).send({ lat: 19, lng: 72, isOnline: 'maybe' })).status).toBe(400);
  });

  it('403 for a person, 401 without a token', async () => {
    expect((await api('post', '/api/bhangarwala/location', await seedPerson()).send({ lat: 19, lng: 72 })).status).toBe(403);
    expect((await api('post', '/api/bhangarwala/location').send({ lat: 19, lng: 72 })).status).toBe(401);
  });
});
