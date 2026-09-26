/** S05 job:status — every status change is pushed to the requesting person. */

const request = require('supertest');
const app = require('../../src/app');
const { Job, Quote } = require('../../src/models');
const {
  seedPerson, seedBhangarwala, seedP2PRequest, authHeader,
} = require('../fixtures');
const {
  startTestServer, waitFor, expectNoEvent, record,
} = require('./helpers');

const api = (method, path, user) => request(app)[method](path).set(authHeader(user));

let t;
beforeAll(async () => { t = await startTestServer(); });
afterAll(async () => { await t.close(); });

async function seedJob() {
  const person = await seedPerson();
  const b = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
  const req = await seedP2PRequest({ personId: person._id, notified: [b._id], status: 'assigned' });
  const quote = await Quote.create({
    requestId: req._id, bhangarwalaId: b._id, price: 100, distanceKm: 1, etaMinutes: 5, status: 'accepted',
  });
  const job = await Job.create({
    requestId: req._id, quoteId: quote._id, personId: person._id, bhangarwalaId: b._id, price: 100,
  });
  return { person, b, job };
}

describe('S05 job:status', () => {
  it('fires on every status change, in order, with { jobId, status, at }', async () => {
    const { person, b, job } = await seedJob();
    const sp = await t.connectAs(person);
    const events = record(sp, 'job:status');

    const firstEvent = waitFor(sp, 'job:status');
    await api('post', `/api/bhangarwala/jobs/${job.id}/start`, b).expect(200);
    expect(await firstEvent).toMatchObject({ jobId: job.id, status: 'heading' });

    for (const status of ['arrived', 'picked_up', 'completed']) {
      const next = waitFor(sp, 'job:status');
      await api('patch', `/api/bhangarwala/jobs/${job.id}/status`, b).send({ status }).expect(200);
      await next;
    }

    expect(events.map((e) => e.status)).toEqual(['heading', 'arrived', 'picked_up', 'completed']);
    expect(events.every((e) => e.jobId === job.id && !Number.isNaN(Date.parse(e.at)))).toBe(true);
  });

  it('reaches only the requesting person', async () => {
    const { person, b, job } = await seedJob();
    const bystander = await seedPerson();
    const [sp, sb] = [await t.connectAs(person), await t.connectAs(bystander)];

    const got = waitFor(sp, 'job:status');
    const none = expectNoEvent(sb, 'job:status');
    await api('post', `/api/bhangarwala/jobs/${job.id}/start`, b).expect(200);
    await got;
    await none;
  });

  it('is not emitted for a refused transition', async () => {
    const { person, b, job } = await seedJob();
    const sp = await t.connectAs(person);

    const none = expectNoEvent(sp, 'job:status');
    await api('patch', `/api/bhangarwala/jobs/${job.id}/status`, b).send({ status: 'completed' }).expect(409);
    await none;
  });
});
