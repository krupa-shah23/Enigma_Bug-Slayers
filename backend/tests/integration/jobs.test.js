const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const { computeEta } = require('../../src/services/eta');
const { P2PRequest, Job, Quote } = require('../../src/models');
const {
  seedPerson, seedNgo, seedBhangarwala, seedP2PRequest, authHeader,
} = require('../fixtures');

const oid = () => new mongoose.Types.ObjectId();
const api = (method, path, user) => request(app)[method](path).set(user ? authHeader(user) : {});
const REQ_LOCATION = { lat: 19.076, lng: 72.8777 };

/** An assigned job (request assigned, quote accepted) between a person and a bhangarwala. */
async function seedJob({ person, b, price = 150, status, requestOverrides = {} } = {}) {
  const owner = person || await seedPerson();
  const worker = b || await seedBhangarwala({ lat: 19.08, lng: 72.88 });
  const req = await seedP2PRequest({
    personId: owner._id, notified: [worker._id], status: 'assigned', location: REQ_LOCATION, ...requestOverrides,
  });
  const quote = await Quote.create({
    requestId: req._id, bhangarwalaId: worker._id, price, distanceKm: 1, etaMinutes: 5, status: 'accepted',
  });
  const job = await Job.create({
    requestId: req._id, quoteId: quote._id, personId: owner._id, bhangarwalaId: worker._id, price, ...(status && { status }),
  });
  await P2PRequest.updateOne({ _id: req._id }, { jobId: job._id });
  return { person: owner, b: worker, req, quote, job };
}

const start = (b, job) => api('post', `/api/bhangarwala/jobs/${job.id}/start`, b);
const advance = (b, job, status) => api('patch', `/api/bhangarwala/jobs/${job.id}/status`, b).send({ status });

// ── E33 / E34 ────────────────────────────────────────────────────────────────

describe('E33 start + E34 status: the job state machine', () => {
  it('runs the full path start -> arrived -> picked_up -> completed', async () => {
    const { b, job, req } = await seedJob();

    const s = await start(b, job);
    expect(s.status).toBe(200);
    expect(s.body.data.job.status).toBe('heading');

    for (const status of ['arrived', 'picked_up', 'completed']) {
      const res = await advance(b, job, status);
      expect(res.status).toBe(200);
      expect(res.body.data.job.status).toBe(status);
    }

    const saved = await Job.findById(job._id);
    expect(saved.statusHistory.map((h) => h.status)).toEqual(['assigned', 'heading', 'arrived', 'picked_up', 'completed']);
    expect(saved.completedAt).toBeInstanceOf(Date);
    expect((await P2PRequest.findById(req._id)).status).toBe('completed');
  });

  it('does not complete the request before the final step', async () => {
    const { b, job, req } = await seedJob();
    await start(b, job);
    await advance(b, job, 'arrived');
    await advance(b, job, 'picked_up');
    expect((await P2PRequest.findById(req._id)).status).toBe('assigned');
    expect((await Job.findById(job._id)).completedAt).toBeUndefined();
  });

  it('E34 can also perform the first step (assigned -> heading)', async () => {
    const { b, job } = await seedJob();
    expect((await advance(b, job, 'heading')).status).toBe(200);
  });

  it('409 INVALID_TRANSITION when skipping a step', async () => {
    const { b, job } = await seedJob();
    await start(b, job);
    const res = await advance(b, job, 'completed');
    expect([res.status, res.body.error.code]).toEqual([409, 'INVALID_TRANSITION']);
    expect((await Job.findById(job._id)).status).toBe('heading');

    expect((await advance(await seedBhangarwala(), job, 'arrived')).status).toBe(403);
  });

  it('409 when jumping ahead from assigned', async () => {
    const { b, job } = await seedJob();
    expect((await advance(b, job, 'arrived')).status).toBe(409);
    expect((await advance(b, job, 'completed')).status).toBe(409);
  });

  it('409 when starting twice', async () => {
    const { b, job } = await seedJob();
    await start(b, job).expect(200);
    const res = await start(b, job);
    expect([res.status, res.body.error.code]).toEqual([409, 'INVALID_TRANSITION']);
    expect((await Job.findById(job._id)).statusHistory).toHaveLength(2);
  });

  it('409 when moving backwards or repeating a status', async () => {
    const { b, job } = await seedJob();
    await start(b, job);
    await advance(b, job, 'arrived');
    expect((await advance(b, job, 'heading')).status).toBe(409);
    expect((await advance(b, job, 'arrived')).status).toBe(409);
  });

  it('409 for any update after completion', async () => {
    const { b, job } = await seedJob();
    await start(b, job);
    for (const s of ['arrived', 'picked_up', 'completed']) await advance(b, job, s);
    expect((await advance(b, job, 'completed')).status).toBe(409);
    expect((await start(b, job)).status).toBe(409);
    expect((await Job.findById(job._id)).statusHistory).toHaveLength(5);
  });

  it('two simultaneous starts: exactly one wins', async () => {
    const { b, job } = await seedJob();
    const results = await Promise.all([start(b, job), start(b, job)]);
    expect(results.map((r) => r.status).sort()).toEqual([200, 409]);
    expect((await Job.findById(job._id)).statusHistory.map((h) => h.status)).toEqual(['assigned', 'heading']);
  });

  it('403 FORBIDDEN when another bhangarwala updates the job', async () => {
    const { job } = await seedJob();
    const other = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    const s = await start(other, job);
    expect([s.status, s.body.error.code]).toEqual([403, 'FORBIDDEN']);
    expect((await advance(other, job, 'heading')).status).toBe(403);
    expect((await Job.findById(job._id)).status).toBe('assigned');
  });

  it('403 for a person or NGO, 401 without a token', async () => {
    const { person, job } = await seedJob();
    expect((await start(person, job)).status).toBe(403);
    expect((await start(await seedNgo(), job)).status).toBe(403);
    expect((await api('post', `/api/bhangarwala/jobs/${job.id}/start`)).status).toBe(401);
  });

  it('404 for an unknown or malformed job id', async () => {
    const b = await seedBhangarwala();
    expect((await api('post', `/api/bhangarwala/jobs/${oid()}/start`, b)).status).toBe(404);
    expect((await api('post', '/api/bhangarwala/jobs/nope/start', b)).status).toBe(404);
    expect((await api('patch', `/api/bhangarwala/jobs/${oid()}/status`, b).send({ status: 'heading' })).status).toBe(404);
  });

  it('400 for a missing or unknown status value', async () => {
    const { b, job } = await seedJob();
    expect((await api('patch', `/api/bhangarwala/jobs/${job.id}/status`, b).send({})).status).toBe(400);
    expect((await advance(b, job, 'teleported')).status).toBe(400);
  });
});

// ── E32 ──────────────────────────────────────────────────────────────────────

describe('E32 GET /api/bhangarwala/jobs/active', () => {
  it('is null when he has no unfinished job', async () => {
    const res = await api('get', '/api/bhangarwala/jobs/active', await seedBhangarwala());
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, data: null });
  });

  it('returns the job with the request (exact location) and the person\'s contact', async () => {
    const { person, b, job, req } = await seedJob({ requestOverrides: { location: { lat: 19.07612, lng: 72.87779 } } });
    const res = await api('get', '/api/bhangarwala/jobs/active', b);
    expect(res.status).toBe(200);
    expect(res.body.data.job).toMatchObject({ id: job.id, status: 'assigned', price: 150 });
    expect(res.body.data.request).toMatchObject({
      id: req.id, category: 'paper', photoUrl: '/uploads/test.png', location: { lat: 19.07612, lng: 72.87779 },
    });
    expect(res.body.data.person).toEqual({ id: person.id, name: person.name, phone: person.phone });
  });

  it('reflects progress and ignores completed jobs and other bhangarwalas\' jobs', async () => {
    const { b, job } = await seedJob();
    await seedJob(); // someone else's
    await start(b, job);
    expect((await api('get', '/api/bhangarwala/jobs/active', b)).body.data.job.status).toBe('heading');

    for (const s of ['arrived', 'picked_up', 'completed']) await advance(b, job, s);
    expect((await api('get', '/api/bhangarwala/jobs/active', b)).body.data).toBeNull();
  });

  it('returns the oldest unfinished job when there are several', async () => {
    const b = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    const first = await seedJob({ b });
    await seedJob({ b });
    const res = await api('get', '/api/bhangarwala/jobs/active', b);
    expect(res.body.data.job.id).toBe(first.job.id);
  });

  it('403 for a person', async () => {
    expect((await api('get', '/api/bhangarwala/jobs/active', await seedPerson())).status).toBe(403);
  });
});

// ── E35 ──────────────────────────────────────────────────────────────────────

describe('E35 GET /api/bhangarwala/transactions', () => {
  const complete = async (b, job) => {
    await start(b, job);
    for (const s of ['arrived', 'picked_up', 'completed']) await advance(b, job, s);
  };

  it('lists completed jobs newest first with total earnings', async () => {
    const b = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    const a = await seedJob({ b, price: 150.5, requestOverrides: { category: 'metal' } });
    const c = await seedJob({ b, price: 99.25 });
    await complete(b, a.job);
    await complete(b, c.job);
    await seedJob({ b, price: 500 }); // not completed: not counted

    const res = await api('get', '/api/bhangarwala/transactions', b);
    expect(res.status).toBe(200);
    expect(res.body.data.totalEarnings).toBe(249.75);
    expect(res.body.data.transactions.map((t) => t.id)).toEqual([c.job.id, a.job.id]);
    expect(res.body.data.transactions[1]).toMatchObject({
      requestId: a.req.id, category: 'metal', personName: a.person.name, price: 150.5,
    });
    expect(res.body.data.transactions[0].completedAt).toBeDefined();
  });

  it('only counts his own jobs, and is empty with zero earnings when there are none', async () => {
    const mine = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    const other = await seedJob();
    await complete(other.b, other.job);

    const res = await api('get', '/api/bhangarwala/transactions', mine);
    expect(res.body.data).toEqual({ transactions: [], totalEarnings: 0 });
  });

  it('403 for a person', async () => {
    expect((await api('get', '/api/bhangarwala/transactions', await seedPerson())).status).toBe(403);
  });
});

// ── E27 ──────────────────────────────────────────────────────────────────────

describe('E27 GET /api/p2p/jobs/:jobId', () => {
  it('shows the owner the job, the bhangarwala\'s name, phone and location, and an ETA', async () => {
    const { person, b, job } = await seedJob();
    const res = await api('get', `/api/p2p/jobs/${job.id}`, person);
    expect(res.status).toBe(200);
    expect(res.body.data.job).toMatchObject({ id: job.id, status: 'assigned', price: 150 });
    expect(res.body.data.bhangarwala).toEqual({ name: b.name, phone: b.phone, location: { lat: 19.08, lng: 72.88 } });
    expect(res.body.data.etaMinutes).toBe(computeEta({ lat: 19.08, lng: 72.88 }, REQ_LOCATION));
  });

  it('follows his latest location and status', async () => {
    const { person, b, job } = await seedJob();
    await start(b, job);
    await api('post', '/api/bhangarwala/location', b).send({ lat: 19.078, lng: 72.879 });

    const res = await api('get', `/api/p2p/jobs/${job.id}`, person);
    expect(res.body.data.job.status).toBe('heading');
    expect(res.body.data.bhangarwala.location).toEqual({ lat: 19.078, lng: 72.879 });
    expect(res.body.data.etaMinutes).toBe(computeEta({ lat: 19.078, lng: 72.879 }, REQ_LOCATION));
  });

  it('has no ETA once he has picked up or completed', async () => {
    const { person, b, job } = await seedJob();
    await start(b, job);
    await advance(b, job, 'arrived');
    await advance(b, job, 'picked_up');
    expect((await api('get', `/api/p2p/jobs/${job.id}`, person)).body.data.etaMinutes).toBeNull();
    await advance(b, job, 'completed');
    const done = await api('get', `/api/p2p/jobs/${job.id}`, person);
    expect(done.body.data.job.status).toBe('completed');
    expect(done.body.data.etaMinutes).toBeNull();
  });

  it('location and ETA are null when the bhangarwala has never shared a location', async () => {
    const b = await seedBhangarwala();
    const { person, job } = await seedJob({ b });
    const res = await api('get', `/api/p2p/jobs/${job.id}`, person);
    expect(res.body.data.bhangarwala.location).toBeNull();
    expect(res.body.data.etaMinutes).toBeNull();
  });

  it('403 for another person, 403 for a bhangarwala, 401 without a token', async () => {
    const { b, job } = await seedJob();
    expect((await api('get', `/api/p2p/jobs/${job.id}`, await seedPerson())).status).toBe(403);
    expect((await api('get', `/api/p2p/jobs/${job.id}`, b)).status).toBe(403);
    expect((await api('get', `/api/p2p/jobs/${job.id}`)).status).toBe(401);
  });

  it('404 for an unknown or malformed job id', async () => {
    const person = await seedPerson();
    expect((await api('get', `/api/p2p/jobs/${oid()}`, person)).status).toBe(404);
    expect((await api('get', '/api/p2p/jobs/nope', person)).status).toBe(404);
  });
});

// ── end to end ───────────────────────────────────────────────────────────────

describe('a whole pickup through the public endpoints', () => {
  it('request -> quote -> select -> start -> ... -> completed appears in both histories', async () => {
    const person = await seedPerson();
    const b = await seedBhangarwala({ lat: 19.08, lng: 72.88 });

    const created = await api('post', '/api/p2p/requests', person)
      .send({ photoUrl: '/u/x.png', category: 'paper', ...REQ_LOCATION }).expect(201);
    expect(created.body.data.notifiedCount).toBe(1);
    const requestId = created.body.data.request.id;

    const quote = (await api('post', `/api/bhangarwala/requests/${requestId}/quote`, b).send({ price: 120 }).expect(201)).body.data.quote;
    const jobId = (await api('post', `/api/p2p/requests/${requestId}/select-quote`, person).send({ quoteId: quote.id }).expect(200)).body.data.job.id;

    expect((await api('get', '/api/bhangarwala/jobs/active', b)).body.data.job.id).toBe(jobId);
    await api('post', `/api/bhangarwala/jobs/${jobId}/start`, b).expect(200);
    for (const status of ['arrived', 'picked_up', 'completed']) {
      await api('patch', `/api/bhangarwala/jobs/${jobId}/status`, b).send({ status }).expect(200);
    }

    expect((await api('get', '/api/bhangarwala/jobs/active', b)).body.data).toBeNull();
    const tx = await api('get', '/api/bhangarwala/transactions', b);
    expect(tx.body.data).toMatchObject({ totalEarnings: 120, transactions: [{ id: jobId, price: 120 }] });
    const mine = await api('get', '/api/p2p/requests/mine?status=completed', person);
    expect(mine.body.data.map((r) => r.id)).toEqual([requestId]);
  });
});
