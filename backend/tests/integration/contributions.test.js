const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const { Contribution, Collection } = require('../../src/models');
const { currentCycle, promisedKg } = require('../../src/services/aggregate');
const {
  seedPerson, seedResident, seedSociety, seedNgo, seedBhangarwala, authHeader,
} = require('../fixtures');

const oid = () => new mongoose.Types.ObjectId();
const DAY = 24 * 60 * 60 * 1000;
const api = (method, path, user) => request(app)[method](path).set(user ? authHeader(user) : {});

const mkCollection = (society, extra = {}) =>
  Collection.create({
    contractId: oid(), societyId: society._id, ngoId: oid(), category: 'plastic',
    windowStart: new Date(), windowEnd: new Date(), promisedKg: 0, actualKg: 0, ...extra,
  });

describe('E21 POST /api/contributions', () => {
  it('logs a contribution for a society member', async () => {
    const resident = await seedResident();
    const res = await api('post', '/api/contributions', resident).send({ category: 'plastic', weightKg: 12.5 });
    expect(res.status).toBe(201);
    expect(res.body.data.contribution).toMatchObject({
      category: 'plastic',
      weightKg: 12.5,
      userId: resident.id,
      societyId: resident.societyId.toString(),
    });
    expect(await Contribution.countDocuments()).toBe(1);
  });

  it('officers can log too', async () => {
    const society = await seedSociety();
    const cp = await mongoose.model('User').findById(society.cpId);
    expect((await api('post', '/api/contributions', cp).send({ category: 'paper', weightKg: 1 })).status).toBe(201);
  });

  it('accepts the boundary weight of 500 kg', async () => {
    const res = await api('post', '/api/contributions', await seedResident()).send({ category: 'metal', weightKg: 500 });
    expect(res.status).toBe(201);
  });

  it.each([0, -5, 501, 'heavy'])('400 for weightKg %p', async (weightKg) => {
    const res = await api('post', '/api/contributions', await seedResident()).send({ category: 'plastic', weightKg });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('400 for a bad or missing category, and for a missing weight', async () => {
    const resident = await seedResident();
    expect((await api('post', '/api/contributions', resident).send({ category: 'gold', weightKg: 1 })).status).toBe(400);
    expect((await api('post', '/api/contributions', resident).send({ weightKg: 1 })).status).toBe(400);
    expect((await api('post', '/api/contributions', resident).send({ category: 'glass' })).status).toBe(400);
  });

  it('403 for a person with no society', async () => {
    const res = await api('post', '/api/contributions', await seedPerson()).send({ category: 'plastic', weightKg: 1 });
    expect(res.status).toBe(403);
    expect(await Contribution.countDocuments()).toBe(0);
  });

  it('403 for an NGO or bhangarwala, 401 without a token', async () => {
    const body = { category: 'plastic', weightKg: 1 };
    expect((await api('post', '/api/contributions', await seedNgo()).send(body)).status).toBe(403);
    expect((await api('post', '/api/contributions', await seedBhangarwala()).send(body)).status).toBe(403);
    expect((await api('post', '/api/contributions').send(body)).status).toBe(401);
  });

  it('ignores a client-supplied userId/societyId', async () => {
    const resident = await seedResident();
    const res = await api('post', '/api/contributions', resident).send({
      category: 'plastic', weightKg: 1, userId: oid(), societyId: oid(),
    });
    expect(res.body.data.contribution.userId).toBe(resident.id);
    expect(res.body.data.contribution.societyId).toBe(resident.societyId.toString());
  });
});

describe('E22 GET /api/contributions/mine', () => {
  const log = (user, minutesAgo, extra = {}) =>
    Contribution.create({
      userId: user._id, societyId: user.societyId, category: 'plastic', weightKg: 1,
      loggedAt: new Date(Date.now() - minutesAgo * 60 * 1000), ...extra,
    });

  it('returns only the caller\'s logs, newest first', async () => {
    const me = await seedResident();
    const other = await seedResident({ societyId: me.societyId });
    const old = await log(me, 30);
    const recent = await log(me, 5);
    await log(other, 1);

    const res = await api('get', '/api/contributions/mine', me);
    expect(res.status).toBe(200);
    expect(res.body.data.contributions.map((c) => c.id)).toEqual([recent.id, old.id]);
    expect(res.body.data.nextCursor).toBeNull();
  });

  it('is empty for a person with no logs (or no society)', async () => {
    const res = await api('get', '/api/contributions/mine', await seedPerson());
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({ contributions: [], nextCursor: null });
  });

  it('paginates with limit and cursor without gaps or repeats', async () => {
    const me = await seedResident();
    const made = [];
    for (let i = 5; i >= 1; i -= 1) made.push(await log(me, i * 10)); // oldest -> newest
    const expected = made.map((c) => c.id).reverse(); // newest first

    const p1 = await api('get', '/api/contributions/mine?limit=2', me);
    expect(p1.body.data.contributions.map((c) => c.id)).toEqual(expected.slice(0, 2));
    expect(p1.body.data.nextCursor).toEqual(expect.any(String));

    const p2 = await api('get', `/api/contributions/mine?limit=2&cursor=${p1.body.data.nextCursor}`, me);
    expect(p2.body.data.contributions.map((c) => c.id)).toEqual(expected.slice(2, 4));

    const p3 = await api('get', `/api/contributions/mine?limit=2&cursor=${p2.body.data.nextCursor}`, me);
    expect(p3.body.data.contributions.map((c) => c.id)).toEqual(expected.slice(4));
    expect(p3.body.data.nextCursor).toBeNull();
  });

  it('paginates correctly across entries with an identical timestamp', async () => {
    const me = await seedResident();
    const at = new Date(Date.now() - 60 * 1000);
    const made = [await log(me, 0, { loggedAt: at }), await log(me, 0, { loggedAt: at }), await log(me, 0, { loggedAt: at })];
    const expected = made.map((c) => c.id).sort().reverse(); // ties fall back to _id desc

    const p1 = await api('get', '/api/contributions/mine?limit=2', me);
    const p2 = await api('get', `/api/contributions/mine?limit=2&cursor=${p1.body.data.nextCursor}`, me);
    const seen = [...p1.body.data.contributions, ...p2.body.data.contributions].map((c) => c.id);
    expect(seen).toEqual(expected);
  });

  it('400 for a bad limit or a malformed cursor', async () => {
    const me = await seedResident();
    expect((await api('get', '/api/contributions/mine?limit=0', me)).status).toBe(400);
    expect((await api('get', '/api/contributions/mine?limit=101', me)).status).toBe(400);
    expect((await api('get', '/api/contributions/mine?cursor=garbage', me)).status).toBe(400);
  });

  it('403 for an NGO, 401 without a token', async () => {
    expect((await api('get', '/api/contributions/mine', await seedNgo())).status).toBe(403);
    expect((await api('get', '/api/contributions/mine')).status).toBe(401);
  });
});

describe('aggregate service: promised kg per category', () => {
  const log = (user, society, weightKg, category, daysAgo) =>
    Contribution.create({
      userId: user._id, societyId: society._id, category, weightKg,
      loggedAt: new Date(Date.now() - daysAgo * DAY),
    });

  it('sums every contribution when there has never been a collection', async () => {
    const society = await seedSociety();
    const user = await seedResident({ societyId: society._id });
    await log(user, society, 2.5, 'plastic', 1);
    await log(user, society, 4, 'plastic', 0.5);

    expect(await promisedKg(society._id, 'plastic')).toBe(6.5);
    expect(await promisedKg(society._id, 'paper')).toBe(0);
  });

  it('only counts logs after the last collection for that category (sum resets)', async () => {
    const society = await seedSociety();
    const user = await seedResident({ societyId: society._id });
    await log(user, society, 30, 'plastic', 10);
    await log(user, society, 5, 'paper', 10);
    await mkCollection(society, { category: 'plastic', collectedAt: new Date(Date.now() - 4 * DAY) });
    await log(user, society, 8, 'plastic', 2);

    expect(await promisedKg(society._id, 'plastic')).toBe(8); // reset by the collection
    expect(await promisedKg(society._id, 'paper')).toBe(5); // untouched category keeps counting
  });

  it('uses the most recent collection when there are several', async () => {
    const society = await seedSociety();
    const user = await seedResident({ societyId: society._id });
    await mkCollection(society, { collectedAt: new Date(Date.now() - 20 * DAY) });
    await mkCollection(society, { collectedAt: new Date(Date.now() - 3 * DAY) });
    await log(user, society, 10, 'plastic', 10);
    await log(user, society, 1, 'plastic', 1);

    expect(await promisedKg(society._id, 'plastic')).toBe(1);
  });

  it('keeps societies separate', async () => {
    const [a, b] = [await seedSociety(), await seedSociety()];
    const userA = await seedResident({ societyId: a._id });
    await log(userA, a, 9, 'glass', 1);

    expect(await promisedKg(a._id, 'glass')).toBe(9);
    expect(await promisedKg(b._id, 'glass')).toBe(0);
  });

  it('rounds away floating-point noise', async () => {
    const society = await seedSociety();
    const user = await seedResident({ societyId: society._id });
    await log(user, society, 0.1, 'metal', 1);
    await log(user, society, 0.2, 'metal', 1);
    expect(await promisedKg(society._id, 'metal')).toBe(0.3);
  });

  it('currentCycle reports every category with its window start', async () => {
    const society = await seedSociety();
    const collectedAt = new Date(Date.now() - DAY);
    await mkCollection(society, { category: 'glass', collectedAt });

    const { byCategory, entries } = await currentCycle(society._id);
    expect(byCategory).toHaveLength(8);
    expect(new Date(byCategory.find((b) => b.category === 'glass').since).getTime()).toBe(collectedAt.getTime());
    expect(new Date(byCategory.find((b) => b.category === 'paper').since).getTime()).toBe(society.createdAt.getTime());
    expect(entries).toEqual([]);
  });
});
