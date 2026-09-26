const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const festivals = require('../../src/config/festivals');
const { nextCollectionDate } = require('../../src/services/schedule');
const {
  User, Society, Contribution, Collection, Flag, Payment, Contract,
} = require('../../src/models');
const {
  seedPerson, seedResident, seedSociety, seedOfficer, seedNgo, seedBhangarwala, seedContract, authHeader,
} = require('../fixtures');

const oid = () => new mongoose.Types.ObjectId();
const DAY = 24 * 60 * 60 * 1000;
const api = (method, path, user) => request(app)[method](path).set(user ? authHeader(user) : {});
const demoFestival = festivals.find((f) => f.name === 'Demo Festival');
const iso = (d) => new Date(d).toISOString().slice(0, 10);

const mkCollection = (society, extra = {}) =>
  Collection.create({
    contractId: oid(), societyId: society._id, ngoId: oid(), category: 'plastic',
    windowStart: new Date(), windowEnd: new Date(), promisedKg: 10, actualKg: 8, ...extra,
  });

const mkContribution = (user, society, extra = {}) =>
  Contribution.create({
    userId: user._id, societyId: society._id, category: 'plastic', weightKg: 5, ...extra,
  });

// A society with a CP, a treasurer and one resident
async function seedFullSociety() {
  const society = await seedSociety();
  const cp = await seedOfficer({ role: 'cp', societyId: society._id });
  const treasurer = await seedOfficer({ role: 'treasurer', societyId: society._id });
  const resident = await seedResident({ societyId: society._id });
  return { society, cp, treasurer, resident };
}

// ── E09 / E10 ────────────────────────────────────────────────────────────────

describe('E09 POST /api/societies', () => {
  const body = (o = {}) => ({
    name: 'Green Heights', address: '1 Park Rd', lat: 19.2, lng: 72.95, collectionFrequency: 'weekly', ...o,
  });

  it('registers a society at a valid location and makes the caller CP', async () => {
    const person = await seedPerson();
    const res = await api('post', '/api/societies', person).send(body());
    expect(res.status).toBe(201);
    expect(res.body.data.society).toMatchObject({ name: 'Green Heights', zoneId: 'mumbai', collectionFrequency: 'weekly' });
    expect(res.body.data.society.nextCollectionDate).toBeDefined();

    const user = await User.findById(person._id);
    expect(user.societyRole).toBe('cp');
    expect(user.societyId.toString()).toBe(res.body.data.society.id);
  });

  it('defaults the frequency to monthly', async () => {
    const res = await api('post', '/api/societies', await seedPerson()).send(body({ collectionFrequency: undefined }));
    expect(res.body.data.society.collectionFrequency).toBe('monthly');
  });

  it('409 DUPLICATE_LOCATION within 150 m of an existing society', async () => {
    const existing = await seedSociety();
    const res = await api('post', '/api/societies', await seedPerson()).send(
      body({ lat: existing.location.lat + 0.0009, lng: existing.location.lng })
    );
    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('DUPLICATE_LOCATION');
  });

  it('400 OUTSIDE_SERVICE_AREA outside every zone', async () => {
    const res = await api('post', '/api/societies', await seedPerson()).send(body({ lat: 0, lng: 0 }));
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('OUTSIDE_SERVICE_AREA');
  });

  it('409 ALREADY_IN_SOCIETY for someone who already belongs to one', async () => {
    const resident = await seedResident();
    const res = await api('post', '/api/societies', resident).send(body());
    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('ALREADY_IN_SOCIETY');
  });

  it('two simultaneous registrations by one person: exactly one wins', async () => {
    const person = await seedPerson();
    const before = await Society.countDocuments();
    const [a, b] = await Promise.all([
      api('post', '/api/societies', person).send(body({ name: 'A', lat: 19.2 })),
      api('post', '/api/societies', person).send(body({ name: 'B', lat: 19.3 })),
    ]);
    expect([a.status, b.status].sort()).toEqual([201, 409]);
    expect(await Society.countDocuments()).toBe(before + 1);
  });

  it('403 for an NGO, 401 without a token, 400 on bad input', async () => {
    expect((await api('post', '/api/societies', await seedNgo()).send(body())).status).toBe(403);
    expect((await api('post', '/api/societies').send(body())).status).toBe(401);
    const person = await seedPerson();
    expect((await api('post', '/api/societies', person).send(body({ name: '' }))).status).toBe(400);
    expect((await api('post', '/api/societies', person).send(body({ lat: 200 }))).status).toBe(400);
    expect((await api('post', '/api/societies', person).send(body({ collectionFrequency: 'daily' }))).status).toBe(400);
  });
});

describe('E10 POST /api/societies/verify-location', () => {
  it('returns valid + zoneId for a good location', async () => {
    const res = await api('post', '/api/societies/verify-location', await seedPerson()).send({ lat: 19.2, lng: 72.95 });
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({ valid: true, zoneId: 'mumbai' });
  });

  it('returns the same errors as E09', async () => {
    const person = await seedPerson();
    const outside = await api('post', '/api/societies/verify-location', person).send({ lat: 0, lng: 0 });
    expect([outside.status, outside.body.error.code]).toEqual([400, 'OUTSIDE_SERVICE_AREA']);

    const existing = await seedSociety();
    const dup = await api('post', '/api/societies/verify-location', person).send(existing.location.toObject());
    expect([dup.status, dup.body.error.code]).toEqual([409, 'DUPLICATE_LOCATION']);
  });

  it('works for a person who is already in a society, but not for an NGO', async () => {
    const resident = await seedResident();
    expect((await api('post', '/api/societies/verify-location', resident).send({ lat: 19.2, lng: 72.95 })).status).toBe(200);
    expect((await api('post', '/api/societies/verify-location', await seedNgo()).send({ lat: 19.2, lng: 72.95 })).status).toBe(403);
  });

  it('400 when coordinates are missing', async () => {
    const res = await api('post', '/api/societies/verify-location', await seedPerson()).send({ lat: 19 });
    expect(res.status).toBe(400);
  });
});

// ── E11 / E12 ────────────────────────────────────────────────────────────────

describe('E11 GET /api/societies', () => {
  const PUBLIC_KEYS = ['activeContractCount', 'address', 'collectionFrequency', 'id', 'location', 'name', 'trustScore'];

  it('lets a resident browse: trust score visible, no contact or officer fields', async () => {
    const { society, resident } = await seedFullSociety();
    await Society.updateOne({ _id: society._id }, { trustScore: 82 });

    const res = await api('get', '/api/societies', resident);
    expect(res.status).toBe(200);
    const item = res.body.data.find((s) => s.id === society.id);
    expect(Object.keys(item).sort()).toEqual(PUBLIC_KEYS);
    expect(item.trustScore).toBe(82);
    expect(JSON.stringify(res.body)).not.toMatch(/phone|email|cpId|treasurerId/);
  });

  it('gives NGOs flagCount and totalCollectedKg (real values)', async () => {
    const society = await seedSociety();
    await mkCollection(society, { actualKg: 8 });
    await mkCollection(society, { actualKg: 12 });
    await Flag.create({ societyId: society._id, contractId: oid(), collectionId: oid(), promisedKg: 10, actualKg: 8, shortfallKg: 2 });
    await seedSociety(); // a second society with no collections or flags

    const res = await api('get', '/api/societies', await seedNgo());
    const item = res.body.data.find((s) => s.id === society.id);
    expect(item).toMatchObject({ flagCount: 1, totalCollectedKg: 20 });
    expect(res.body.data.every((s) => 'flagCount' in s)).toBe(true);
    expect(res.body.data.find((s) => s.id !== society.id)).toMatchObject({ flagCount: 0, totalCollectedKg: 0 });

    const asPerson = await api('get', '/api/societies', await seedPerson());
    expect(asPerson.body.data[0]).not.toHaveProperty('flagCount');
  });

  it('counts only active contracts', async () => {
    const society = await seedSociety();
    await seedContract({ societyId: society._id, status: 'active' });
    await seedContract({ societyId: society._id, status: 'offered' });
    await seedContract({ societyId: society._id, status: 'cancelled' });
    const res = await api('get', '/api/societies', await seedPerson());
    expect(res.body.data.find((s) => s.id === society.id).activeContractCount).toBe(1);
  });

  it('sorts by name by default and by trust score (best first, unscored last)', async () => {
    const [b, a, c] = [
      await seedSociety({ name: 'Bravo', trustScore: 50 }),
      await seedSociety({ name: 'Alpha', trustScore: null }),
      await seedSociety({ name: 'Charlie', trustScore: 90 }),
    ];
    const person = await seedPerson();

    const byName = await api('get', '/api/societies', person);
    expect(byName.body.data.map((s) => s.name)).toEqual(['Alpha', 'Bravo', 'Charlie']);

    const byTrust = await api('get', '/api/societies?sort=trustScore', person);
    expect(byTrust.body.data.map((s) => s.id)).toEqual([c.id, b.id, a.id]);
  });

  it('breaks trust-score ties by name', async () => {
    await seedSociety({ name: 'Zed', trustScore: 70 });
    await seedSociety({ name: 'Ace', trustScore: 70 });
    const res = await api('get', '/api/societies?sort=trustScore', await seedPerson());
    expect(res.body.data.map((s) => s.name)).toEqual(['Ace', 'Zed']);
  });

  it('filters by q on name or address, case-insensitively and regex-safe', async () => {
    await seedSociety({ name: 'Lotus Towers', address: '5 Rose Lane' });
    await seedSociety({ name: 'Maple Court', address: '9 Hill Rd (East)' });
    const person = await seedPerson();

    expect((await api('get', '/api/societies?q=lotus', person)).body.data.map((s) => s.name)).toEqual(['Lotus Towers']);
    expect((await api('get', '/api/societies?q=ROSE', person)).body.data.map((s) => s.name)).toEqual(['Lotus Towers']);
    expect((await api('get', '/api/societies?q=(East)', person)).body.data.map((s) => s.name)).toEqual(['Maple Court']);
    expect((await api('get', '/api/societies?q=(', person)).status).toBe(200);
  });

  it('403 for a bhangarwala, 401 without a token, 400 on a bad sort', async () => {
    expect((await api('get', '/api/societies', await seedBhangarwala())).status).toBe(403);
    expect((await api('get', '/api/societies')).status).toBe(401);
    expect((await api('get', '/api/societies?sort=random', await seedPerson())).status).toBe(400);
  });
});

describe('E12 GET /api/societies/:societyId', () => {
  it('returns the public profile plus nextCollectionDate and memberCount', async () => {
    const { society } = await seedFullSociety(); // cp + treasurer + resident = 3
    const res = await api('get', `/api/societies/${society.id}`, await seedPerson());
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ id: society.id, name: society.name, memberCount: 3 });
    expect(res.body.data.nextCollectionDate).toBeDefined();
    expect(JSON.stringify(res.body)).not.toMatch(/phone|email/);
  });

  it('shows NGOs the extra fields', async () => {
    const society = await seedSociety();
    const res = await api('get', `/api/societies/${society.id}`, await seedNgo());
    expect(res.body.data).toMatchObject({ flagCount: 0, totalCollectedKg: 0 });
  });

  it('404 for an unknown or malformed id; 403 for a bhangarwala', async () => {
    const person = await seedPerson();
    expect((await api('get', `/api/societies/${oid()}`, person)).status).toBe(404);
    expect((await api('get', '/api/societies/not-an-id', person)).status).toBe(404);
    const society = await seedSociety();
    expect((await api('get', `/api/societies/${society.id}`, await seedBhangarwala())).status).toBe(403);
  });
});

// ── E13 ──────────────────────────────────────────────────────────────────────

describe('E13 POST /api/societies/:societyId/join', () => {
  it('joins as a resident', async () => {
    const society = await seedSociety();
    const person = await seedPerson();
    const res = await api('post', `/api/societies/${society.id}/join`, person);
    expect(res.status).toBe(200);
    expect(res.body.data.society.id).toBe(society.id);

    const user = await User.findById(person._id);
    expect([user.societyRole, user.societyId.toString()]).toEqual(['resident', society.id]);
  });

  it('409 ALREADY_IN_SOCIETY when joining twice, or when already a CP', async () => {
    const society = await seedSociety();
    const person = await seedPerson();
    await api('post', `/api/societies/${society.id}/join`, person);
    const again = await api('post', `/api/societies/${society.id}/join`, person);
    expect([again.status, again.body.error.code]).toEqual([409, 'ALREADY_IN_SOCIETY']);

    const other = await seedSociety();
    const cp = await User.findById(other.cpId);
    expect((await api('post', `/api/societies/${society.id}/join`, cp)).status).toBe(409);
  });

  it('404 for an unknown society; 403 for an NGO', async () => {
    expect((await api('post', `/api/societies/${oid()}/join`, await seedPerson())).status).toBe(404);
    const society = await seedSociety();
    expect((await api('post', `/api/societies/${society.id}/join`, await seedNgo())).status).toBe(403);
  });
});

// ── E14 / E15 ────────────────────────────────────────────────────────────────

describe('E14 GET /api/societies/:societyId/full', () => {
  it('shows a resident the officer contacts, promised aggregate, fee credit and payments — not the member list', async () => {
    const { society, cp, treasurer, resident } = await seedFullSociety();
    await User.updateOne({ _id: resident._id }, { feeCreditPaise: 1234 });
    await Society.updateOne({ _id: society._id }, { feeReductionTotalPaise: 5000 });
    await mkContribution(resident, society, { weightKg: 4 });
    await mkContribution(cp, society, { weightKg: 6 });
    await Payment.create({
      contractId: oid(), collectionId: oid(), ngoId: oid(), societyId: society._id, amountPaise: 9000,
    });

    const res = await api('get', `/api/societies/${society.id}/full`, resident);
    expect(res.status).toBe(200);
    const d = res.body.data;

    expect(d.officers.map((o) => o.societyRole).sort()).toEqual(['cp', 'treasurer']);
    expect(d.officers.find((o) => o.societyRole === 'cp')).toMatchObject({ id: cp.id, phone: cp.phone, email: cp.email });
    expect(d.officers.find((o) => o.societyRole === 'treasurer').id).toBe(treasurer.id);
    expect(d.promised).toHaveLength(8);
    expect(d.promised.find((p) => p.category === 'plastic').totalKg).toBe(10);
    expect(d.promised.find((p) => p.category === 'paper').totalKg).toBe(0);
    expect(d.feeCreditPaise).toBe(1234);
    expect(d.feeReductionTotalPaise).toBe(5000);
    expect(d.recentPayments).toHaveLength(1);
    expect(d.recentPayments[0].amountPaise).toBe(9000);
    expect(d.recentPayments[0]).not.toHaveProperty('splits');
    expect(d.nextCollectionDate).toBeDefined();
    expect(d).toHaveProperty('festivalSchedule', null);
    expect(d).not.toHaveProperty('members');
  });

  it('gives officers the member list', async () => {
    const { society, cp, treasurer, resident } = await seedFullSociety();
    for (const officer of [cp, treasurer]) {
      const res = await api('get', `/api/societies/${society.id}/full`, officer);
      expect(res.body.data.members.map((m) => m.id).sort()).toEqual([cp.id, treasurer.id, resident.id].sort());
      expect(res.body.data.members[0]).toHaveProperty('feeCreditPaise');
    }
  });

  it('only counts the current cycle: contributions before the last collection are excluded', async () => {
    const { society, resident } = await seedFullSociety();
    await mkContribution(resident, society, { weightKg: 50, loggedAt: new Date(Date.now() - 10 * DAY) });
    await mkCollection(society, { collectedAt: new Date(Date.now() - 5 * DAY) });
    await mkContribution(resident, society, { weightKg: 7, loggedAt: new Date(Date.now() - 1 * DAY) });
    await mkContribution(resident, society, { weightKg: 20, category: 'paper', loggedAt: new Date(Date.now() - 10 * DAY) });

    const res = await api('get', `/api/societies/${society.id}/full`, resident);
    const byCat = Object.fromEntries(res.body.data.promised.map((p) => [p.category, p.totalKg]));
    expect(byCat.plastic).toBe(7); // reset by the plastic collection
    expect(byCat.paper).toBe(20); // never collected, so it still counts
  });

  it('shows a pending festival suggestion when the next collection is inside a festival window', async () => {
    const { society, resident } = await seedFullSociety();
    await Society.updateOne({ _id: society._id }, { nextCollectionDate: new Date(demoFestival.date) });

    const res = await api('get', `/api/societies/${society.id}/full`, resident);
    const fs = res.body.data.festivalSchedule;
    expect(fs).toMatchObject({ festivalName: 'Demo Festival', decision: 'pending' });
    expect(iso(fs.suggestedDate)).toBe(iso(new Date(new Date(demoFestival.date).getTime() + demoFestival.shiftDays * DAY)));
  });

  it('403 NOT_SOCIETY_MEMBER for outsiders and other societies\' members', async () => {
    const society = await seedSociety();
    const outsider = await api('get', `/api/societies/${society.id}/full`, await seedPerson());
    expect([outsider.status, outsider.body.error.code]).toEqual([403, 'NOT_SOCIETY_MEMBER']);

    const otherMember = await seedResident();
    expect((await api('get', `/api/societies/${society.id}/full`, otherMember)).status).toBe(403);
    expect((await api('get', `/api/societies/${society.id}/full`, await seedNgo())).status).toBe(403);
  });
});

describe('E15 GET /api/societies/:societyId/contributions', () => {
  it('returns the per-category aggregate and the entries in the current cycle', async () => {
    const { society, cp, resident } = await seedFullSociety();
    await mkContribution(resident, society, { weightKg: 3, loggedAt: new Date(Date.now() - 2 * DAY) });
    await mkContribution(cp, society, { weightKg: 4, category: 'paper' });

    const res = await api('get', `/api/societies/${society.id}/contributions`, resident);
    expect(res.status).toBe(200);
    expect(res.body.data.byCategory).toHaveLength(8);
    expect(res.body.data.byCategory.find((b) => b.category === 'plastic')).toMatchObject({ totalKg: 3 });
    expect(res.body.data.byCategory[0].since).toBeDefined();

    const { entries } = res.body.data;
    expect(entries.map((e) => e.category)).toEqual(['paper', 'plastic']); // newest first
    expect(entries[1].user).toEqual({ id: resident.id, name: resident.name });
  });

  it('excludes entries older than the last collection of their category', async () => {
    const { society, resident } = await seedFullSociety();
    await mkContribution(resident, society, { weightKg: 9, loggedAt: new Date(Date.now() - 10 * DAY) });
    await mkCollection(society, { collectedAt: new Date(Date.now() - 5 * DAY) });

    const res = await api('get', `/api/societies/${society.id}/contributions`, resident);
    expect(res.body.data.entries).toHaveLength(0);
    expect(res.body.data.byCategory.find((b) => b.category === 'plastic').totalKg).toBe(0);
  });

  it('403 for non-members', async () => {
    const society = await seedSociety();
    expect((await api('get', `/api/societies/${society.id}/contributions`, await seedPerson())).status).toBe(403);
  });
});

// ── E16 ──────────────────────────────────────────────────────────────────────

describe('E16 PATCH /api/societies/:societyId', () => {
  const patch = (society, user, body) => api('patch', `/api/societies/${society.id}`, user).send(body);

  it('403 NOT_SOCIETY_OFFICER for a resident', async () => {
    const { society, resident } = await seedFullSociety();
    const res = await patch(society, resident, { collectionFrequency: 'weekly' });
    expect([res.status, res.body.error.code]).toEqual([403, 'NOT_SOCIETY_OFFICER']);
  });

  it('403 for the officer of a different society', async () => {
    const { society } = await seedFullSociety();
    const other = await seedFullSociety();
    expect((await patch(society, other.cp, { collectionFrequency: 'weekly' })).status).toBe(403);
  });

  it('CP changes the frequency and nextCollectionDate is recomputed', async () => {
    const { society, cp } = await seedFullSociety();
    const res = await patch(society, cp, { collectionFrequency: 'weekly' });
    expect(res.status).toBe(200);
    expect(res.body.data.society.collectionFrequency).toBe('weekly');
    expect(iso(res.body.data.society.nextCollectionDate)).toBe(iso(nextCollectionDate(society.createdAt, 'weekly')));
  });

  it('never schedules a date in the past', async () => {
    const { society, cp } = await seedFullSociety();
    await Society.updateOne({ _id: society._id }, { lastCollectionDate: new Date(Date.now() - 90 * DAY) });
    const res = await patch(society, cp, { collectionFrequency: 'monthly' });
    expect(new Date(res.body.data.society.nextCollectionDate).getTime()).toBeGreaterThan(Date.now());
  });

  it('bases the new date on the last collection when there is one', async () => {
    const { society, cp } = await seedFullSociety();
    const last = new Date(Date.now() - 2 * DAY);
    await Society.updateOne({ _id: society._id }, { lastCollectionDate: last });
    const res = await patch(society, cp, { collectionFrequency: 'biweekly' });
    expect(iso(res.body.data.society.nextCollectionDate)).toBe(iso(nextCollectionDate(last, 'biweekly')));
  });

  it('lets the treasurer change the frequency', async () => {
    const { society, treasurer } = await seedFullSociety();
    expect((await patch(society, treasurer, { collectionFrequency: 'biweekly' })).status).toBe(200);
  });

  it('clears an earlier festival decision when the date is recomputed', async () => {
    const { society, cp } = await seedFullSociety();
    await Society.updateOne({ _id: society._id }, { festivalSchedule: { festivalName: 'X', decision: 'accepted' } });
    const res = await patch(society, cp, { collectionFrequency: 'weekly' });
    expect(res.body.data.society).not.toHaveProperty('festivalSchedule');
  });

  it('CP appoints a treasurer (a member), who becomes an officer', async () => {
    const society = await seedSociety();
    const cp = await User.findById(society.cpId);
    const resident = await seedResident({ societyId: society._id });

    const res = await patch(society, cp, { treasurerId: resident.id });
    expect(res.status).toBe(200);
    expect(res.body.data.society.treasurerId).toBe(resident.id);
    expect((await User.findById(resident._id)).societyRole).toBe('treasurer');
  });

  it('replacing the treasurer demotes the previous one to resident', async () => {
    const { society, cp, treasurer } = await seedFullSociety();
    const other = await seedResident({ societyId: society._id });
    await patch(society, cp, { treasurerId: other.id });
    expect((await User.findById(treasurer._id)).societyRole).toBe('resident');
    expect((await User.findById(other._id)).societyRole).toBe('treasurer');
  });

  it('re-appointing the same treasurer keeps them as treasurer', async () => {
    const { society, cp, treasurer } = await seedFullSociety();
    const res = await patch(society, cp, { treasurerId: treasurer.id });
    expect(res.status).toBe(200);
    expect((await User.findById(treasurer._id)).societyRole).toBe('treasurer');
  });

  it('treasurerId: null removes the treasurer', async () => {
    const { society, cp, treasurer } = await seedFullSociety();
    const res = await patch(society, cp, { treasurerId: null });
    expect(res.status).toBe(200);
    expect(res.body.data.society).not.toHaveProperty('treasurerId');
    expect((await User.findById(treasurer._id)).societyRole).toBe('resident');
  });

  it('403 FORBIDDEN when the treasurer tries to appoint a treasurer', async () => {
    const { society, treasurer, resident } = await seedFullSociety();
    const res = await patch(society, treasurer, { treasurerId: resident.id });
    expect([res.status, res.body.error.code]).toEqual([403, 'FORBIDDEN']);
  });

  it('400 when the appointee is not a member (no society, or another society)', async () => {
    const { society, cp } = await seedFullSociety();
    const outsider = await seedPerson();
    const foreign = await seedResident();
    expect((await patch(society, cp, { treasurerId: outsider.id })).status).toBe(400);
    expect((await patch(society, cp, { treasurerId: foreign.id })).status).toBe(400);
    expect((await patch(society, cp, { treasurerId: oid().toString() })).status).toBe(400);
  });

  it('400 when the CP appoints themself', async () => {
    const { society, cp } = await seedFullSociety();
    expect((await patch(society, cp, { treasurerId: cp.id })).status).toBe(400);
  });

  it('400 on an empty body, a bad frequency or a malformed treasurerId', async () => {
    const { society, cp } = await seedFullSociety();
    expect((await patch(society, cp, {})).status).toBe(400);
    expect((await patch(society, cp, { collectionFrequency: 'daily' })).status).toBe(400);
    expect((await patch(society, cp, { treasurerId: 'abc' })).status).toBe(400);
  });
});

// ── E17 ──────────────────────────────────────────────────────────────────────

describe('E17 PATCH /api/societies/:societyId/festival-schedule', () => {
  const patch = (society, user, body) =>
    api('patch', `/api/societies/${society.id}/festival-schedule`, user).send(body);
  const festivalDay = () => new Date(demoFestival.date);

  async function societyNearFestival() {
    const setup = await seedFullSociety();
    await Society.updateOne({ _id: setup.society._id }, { nextCollectionDate: festivalDay() });
    return setup;
  }

  it('accept shifts the date by the festival\'s shiftDays', async () => {
    const { society, cp } = await societyNearFestival();
    const res = await patch(society, cp, { decision: 'accept' });
    expect(res.status).toBe(200);

    const expected = iso(new Date(festivalDay().getTime() + demoFestival.shiftDays * DAY));
    expect(iso(res.body.data.society.nextCollectionDate)).toBe(expected);
    expect(res.body.data.society.festivalSchedule).toMatchObject({
      festivalName: 'Demo Festival', decision: 'accepted',
    });
    expect(iso(res.body.data.society.festivalSchedule.finalDate)).toBe(expected);
  });

  it('after accepting, E14 shows the stored decision instead of a new suggestion', async () => {
    const { society, cp } = await societyNearFestival();
    await patch(society, cp, { decision: 'accept' });
    const res = await api('get', `/api/societies/${society.id}/full`, cp);
    expect(res.body.data.festivalSchedule).toMatchObject({ festivalName: 'Demo Festival', decision: 'accepted' });
  });

  it('override sets a custom future date', async () => {
    const { society, treasurer } = await societyNearFestival();
    const custom = new Date(Date.now() + 40 * DAY);
    const res = await patch(society, treasurer, { decision: 'override', date: custom.toISOString() });
    expect(res.status).toBe(200);
    expect(iso(res.body.data.society.nextCollectionDate)).toBe(iso(custom));
    expect(res.body.data.society.festivalSchedule).toMatchObject({ decision: 'overridden', festivalName: 'Demo Festival' });
  });

  it('an override that stays inside the window is not re-suggested', async () => {
    const { society, cp } = await societyNearFestival();
    await patch(society, cp, { decision: 'override', date: festivalDay().toISOString() });
    const res = await api('get', `/api/societies/${society.id}/full`, cp);
    expect(res.body.data.festivalSchedule.decision).toBe('overridden');
  });

  it('override works even when there is no festival suggestion', async () => {
    const { society, cp } = await seedFullSociety();
    const custom = new Date(Date.now() + 60 * DAY);
    const res = await patch(society, cp, { decision: 'override', date: custom.toISOString() });
    expect(res.status).toBe(200);
    expect(res.body.data.society.festivalSchedule.decision).toBe('overridden');
    expect(res.body.data.society.festivalSchedule).not.toHaveProperty('festivalName');
  });

  it('400 for an override date in the past', async () => {
    const { society, cp } = await societyNearFestival();
    const past = new Date(Date.now() - 2 * DAY).toISOString();
    expect((await patch(society, cp, { decision: 'override', date: past })).status).toBe(400);
  });

  it('400 when accepting with no suggestion', async () => {
    const { society, cp } = await seedFullSociety();
    const res = await patch(society, cp, { decision: 'accept' });
    expect(res.status).toBe(400);
  });

  it('400 on a missing date for override, or an unknown decision', async () => {
    const { society, cp } = await societyNearFestival();
    expect((await patch(society, cp, { decision: 'override' })).status).toBe(400);
    expect((await patch(society, cp, { decision: 'maybe' })).status).toBe(400);
    expect((await patch(society, cp, {})).status).toBe(400);
  });

  it('403 for a resident', async () => {
    const { society, resident } = await societyNearFestival();
    expect((await patch(society, resident, { decision: 'accept' })).status).toBe(403);
  });
});

// ── E18 / E19 ────────────────────────────────────────────────────────────────

describe('E18 GET /api/societies/:societyId/contracts', () => {
  it('lists offered and active contracts with the NGO info, for officers only', async () => {
    const { society, cp, treasurer, resident } = await seedFullSociety();
    const ngo = await seedNgo({ verified: true });
    const offered = await seedContract({ societyId: society._id, ngoId: ngo._id, status: 'offered' });
    const active = await seedContract({ societyId: society._id, ngoId: ngo._id, status: 'active' });
    await seedContract({ societyId: society._id, ngoId: ngo._id, status: 'cancelled' });
    await seedContract({ status: 'offered' }); // another society's contract

    for (const officer of [cp, treasurer]) {
      const res = await api('get', `/api/societies/${society.id}/contracts`, officer);
      expect(res.status).toBe(200);
      expect(res.body.data.map((c) => c.id).sort()).toEqual([offered.id, active.id].sort());
      expect(res.body.data[0].ngo).toEqual({ id: ngo.id, name: ngo.name, orgName: ngo.ngo.orgName });
    }
    expect((await api('get', `/api/societies/${society.id}/contracts`, resident)).status).toBe(403);
  });

  it('supports a status filter', async () => {
    const { society, cp } = await seedFullSociety();
    await seedContract({ societyId: society._id, status: 'offered' });
    const cancelled = await seedContract({ societyId: society._id, status: 'cancelled' });
    const res = await api('get', `/api/societies/${society.id}/contracts?status=cancelled`, cp);
    expect(res.body.data.map((c) => c.id)).toEqual([cancelled.id]);
    expect((await api('get', `/api/societies/${society.id}/contracts?status=weird`, cp)).status).toBe(400);
  });
});

describe('E19 POST /api/societies/:societyId/contracts/:contractId/accept', () => {
  const accept = (society, contract, user) =>
    api('post', `/api/societies/${society.id}/contracts/${contract.id}/accept`, user);

  it('an officer accepts an offered contract -> active', async () => {
    const { society, cp } = await seedFullSociety();
    const contract = await seedContract({ societyId: society._id, status: 'offered' });
    const res = await accept(society, contract, cp);
    expect(res.status).toBe(200);
    expect(res.body.data.contract).toMatchObject({ status: 'active', acceptedBy: cp.id });
    expect(res.body.data.contract.acceptedAt).toBeDefined();
    expect((await Contract.findById(contract._id)).status).toBe('active');
  });

  it('the treasurer can accept too', async () => {
    const { society, treasurer } = await seedFullSociety();
    const contract = await seedContract({ societyId: society._id, status: 'offered' });
    expect((await accept(society, contract, treasurer)).status).toBe(200);
  });

  it.each(['active', 'cancelled', 'completed'])('409 CONTRACT_NOT_EDITABLE when the contract is %s', async (status) => {
    const { society, cp } = await seedFullSociety();
    const contract = await seedContract({ societyId: society._id, status });
    const res = await accept(society, contract, cp);
    expect([res.status, res.body.error.code]).toEqual([409, 'CONTRACT_NOT_EDITABLE']);
  });

  it('403 for a resident and for an officer of another society', async () => {
    const { society, resident } = await seedFullSociety();
    const other = await seedFullSociety();
    const contract = await seedContract({ societyId: society._id, status: 'offered' });
    expect((await accept(society, contract, resident)).status).toBe(403);
    expect((await accept(society, contract, other.cp)).status).toBe(403);
    expect((await Contract.findById(contract._id)).status).toBe('offered');
  });

  it('404 for a contract that belongs to another society, does not exist, or has a malformed id', async () => {
    const { society, cp } = await seedFullSociety();
    const foreign = await seedContract({ status: 'offered' });
    expect((await accept(society, foreign, cp)).status).toBe(404);
    expect((await accept(society, { id: oid().toString() }, cp)).status).toBe(404);
    expect((await accept(society, { id: 'nope' }, cp)).status).toBe(404);
  });

  it('two simultaneous accepts: exactly one wins', async () => {
    const { society, cp, treasurer } = await seedFullSociety();
    const contract = await seedContract({ societyId: society._id, status: 'offered' });
    const [a, b] = await Promise.all([accept(society, contract, cp), accept(society, contract, treasurer)]);
    expect([a.status, b.status].sort()).toEqual([200, 409]);
  });
});
