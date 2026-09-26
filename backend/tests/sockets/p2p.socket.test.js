/** S01–S04 (and the S06 branch of E31) over real sockets. */

const request = require('supertest');
const app = require('../../src/app');
const { computeEta } = require('../../src/services/eta');
const { Job, Quote, P2PRequest } = require('../../src/models');
const {
  seedPerson, seedBhangarwala, seedP2PRequest, authHeader,
} = require('../fixtures');
const {
  startTestServer, waitFor, expectNoEvent, record,
} = require('./helpers');

const MUMBAI = { lat: 19.076, lng: 72.8777 };
const KM = 1 / 111.195;
const north = (km) => ({ lat: MUMBAI.lat + km * KM, lng: MUMBAI.lng });
const api = (method, path, user) => request(app)[method](path).set(authHeader(user));

let t;
beforeAll(async () => { t = await startTestServer(); });
afterAll(async () => { await t.close(); });

describe('S01 request:new', () => {
  it('reaches only the in-radius online bhangarwalas, each with their own distance', async () => {
    const person = await seedPerson();
    const near = await seedBhangarwala(north(1));
    const nearer = await seedBhangarwala(north(0.5));
    const far = await seedBhangarwala(north(5));
    const offline = await seedBhangarwala({ ...north(1), isOnline: false });
    const sockets = await Promise.all([near, nearer, far, offline].map((b) => t.connectAs(b)));
    const [sNear, sNearer, sFar, sOffline] = sockets;

    const gotNear = waitFor(sNear, 'request:new');
    const gotNearer = waitFor(sNearer, 'request:new');
    const nones = [expectNoEvent(sFar, 'request:new'), expectNoEvent(sOffline, 'request:new')];

    await api('post', '/api/p2p/requests', person)
      .send({ photoUrl: '/uploads/a.png', description: 'Cans', category: 'metal', ...MUMBAI })
      .expect(201);

    const [a, b] = await Promise.all([gotNear, gotNearer]);
    expect(a.request).toMatchObject({ category: 'metal', description: 'Cans', status: 'open', photoUrl: '/uploads/a.png' });
    expect(a.request.distanceKm).toBeCloseTo(1, 1);
    expect(b.request.distanceKm).toBeCloseTo(0.5, 1);
    expect(a.request).not.toHaveProperty('personId');
    expect(a.request.location).toEqual({ lat: 19.076, lng: 72.878 }); // ~100 m precision
    await Promise.all(nones);
  });
});

describe('S02 quote:new', () => {
  it('reaches the requesting person only', async () => {
    const person = await seedPerson();
    const otherPerson = await seedPerson();
    const b = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    const req = await seedP2PRequest({ personId: person._id, notified: [b._id] });
    const [sp, so] = [await t.connectAs(person), await t.connectAs(otherPerson)];

    const got = waitFor(sp, 'quote:new');
    const none = expectNoEvent(so, 'quote:new');
    await api('post', `/api/bhangarwala/requests/${req.id}/quote`, b).send({ price: 175 }).expect(201);

    const payload = await got;
    expect(payload.requestId).toBe(req.id);
    expect(payload.quote).toMatchObject({
      price: 175, status: 'pending', bhangarwala: { name: b.name }, etaMinutes: computeEta({ lat: 19.08, lng: 72.88 }, req.location),
    });
    await none;
  });

  it('is not emitted when the quote is refused', async () => {
    const person = await seedPerson();
    const b = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    const req = await seedP2PRequest({ personId: person._id, notified: [b._id], status: 'assigned' });
    const sp = await t.connectAs(person);

    const none = expectNoEvent(sp, 'quote:new');
    await api('post', `/api/bhangarwala/requests/${req.id}/quote`, b).send({ price: 100 }).expect(409);
    await none;
  });
});

describe('S03 quote:accepted and S04 quote:expired', () => {
  it('tells the winner (S03) and every loser (S04), and nobody else', async () => {
    const person = await seedPerson();
    const [winner, loser1, loser2, bystander] = [
      await seedBhangarwala({ lat: 19.08, lng: 72.88 }),
      await seedBhangarwala({ lat: 19.07, lng: 72.87 }),
      await seedBhangarwala({ lat: 19.072, lng: 72.872 }),
      await seedBhangarwala({ lat: 19.071, lng: 72.871 }), // never quoted
    ];
    const req = await seedP2PRequest({ personId: person._id, notified: [winner._id, loser1._id, loser2._id] });
    const [sw, sl1, sl2, sb] = await Promise.all([winner, loser1, loser2, bystander].map((b) => t.connectAs(b)));

    const quotes = {};
    for (const [name, b, price] of [['w', winner, 120], ['l1', loser1, 150], ['l2', loser2, 200]]) {
      quotes[name] = (await api('post', `/api/bhangarwala/requests/${req.id}/quote`, b).send({ price }).expect(201)).body.data.quote;
    }

    const accepted = waitFor(sw, 'quote:accepted');
    const expired1 = waitFor(sl1, 'quote:expired');
    const expired2 = waitFor(sl2, 'quote:expired');
    const nones = [
      expectNoEvent(sw, 'quote:expired'),
      expectNoEvent(sl1, 'quote:accepted'),
      expectNoEvent(sb, 'quote:accepted'),
      expectNoEvent(sb, 'quote:expired'),
    ];

    const res = await api('post', `/api/p2p/requests/${req.id}/select-quote`, person)
      .send({ quoteId: quotes.w.id })
      .expect(200);

    expect(await accepted).toEqual({ requestId: req.id, quoteId: quotes.w.id, jobId: res.body.data.job.id });
    expect(await expired1).toEqual({ requestId: req.id, quoteId: quotes.l1.id });
    expect(await expired2).toEqual({ requestId: req.id, quoteId: quotes.l2.id });
    await Promise.all(nones);
  });

  it('emits nothing when the selection is refused', async () => {
    const person = await seedPerson();
    const b = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    const req = await seedP2PRequest({ personId: person._id, notified: [b._id] });
    const q = (await api('post', `/api/bhangarwala/requests/${req.id}/quote`, b).send({ price: 100 })).body.data.quote;
    await Quote.updateOne({ _id: q.id }, { status: 'expired' });
    const sb = await t.connectAs(b);

    const none = expectNoEvent(sb, 'quote:accepted');
    await api('post', `/api/p2p/requests/${req.id}/select-quote`, person).send({ quoteId: q.id }).expect(409);
    await none;
    expect((await P2PRequest.findById(req._id)).status).toBe('open');
  });
});

describe('S06 job:location (E31)', () => {
  const startedJob = async (status) => {
    const person = await seedPerson();
    const b = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    const req = await seedP2PRequest({ personId: person._id, notified: [b._id] });
    const quote = await Quote.create({
      requestId: req._id, bhangarwalaId: b._id, price: 100, distanceKm: 1, etaMinutes: 5,
    });
    const job = await Job.create({
      requestId: req._id, quoteId: quote._id, personId: person._id, bhangarwalaId: b._id, price: 100, status,
    });
    return { person, b, req, job };
  };

  it.each(['heading', 'arrived'])('a ping while the job is %s reaches the person with a fresh ETA', async (status) => {
    const { person, b, req, job } = await startedJob(status);
    const sp = await t.connectAs(person);

    const got = waitFor(sp, 'job:location');
    await api('post', '/api/bhangarwala/location', b).send({ lat: 19.078, lng: 72.879 }).expect(200);

    expect(await got).toEqual({
      jobId: job.id, lat: 19.078, lng: 72.879, etaMinutes: computeEta({ lat: 19.078, lng: 72.879 }, req.location),
    });
  });

  it('a ping with no active job, or while merely assigned, emits nothing', async () => {
    const { person, b } = await startedJob('assigned');
    const lonely = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    const sp = await t.connectAs(person);

    const events = record(sp, 'job:location');
    await api('post', '/api/bhangarwala/location', b).send({ lat: 19.078, lng: 72.879 }).expect(200);
    await api('post', '/api/bhangarwala/location', lonely).send({ lat: 19.078, lng: 72.879 }).expect(200);
    await expectNoEvent(sp, 'job:location');
    expect(events).toHaveLength(0);
  });
});
