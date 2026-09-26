/**
 * tests/integration/events.test.js
 * E49 GET    /api/events
 * E50 POST   /api/events
 * E51 PATCH  /api/events/:eventId
 * E52 DELETE /api/events/:eventId
 * E53 POST   /api/events/:eventId/rsvp
 */

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const { Event } = require('../../src/models');
const {
  seedPerson, seedResident, seedSociety, seedOfficer,
  seedNgo, seedBhangarwala, authHeader,
} = require('../fixtures');

const api = (method, path, user) =>
  request(app)[method](path).set(user ? authHeader(user) : {});

const oid = () => new mongoose.Types.ObjectId().toString();

// ── shared event body ─────────────────────────────────────────────────────────

const eventBody = (overrides = {}) => ({
  title: 'Plastic Drive',
  type: 'drive',
  date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  location: 'Society Gate',
  description: 'Monthly plastic collection drive',
  ...overrides,
});

// ─────────────────────────────────────────────────────────────────────────────
// E50 POST /api/events
// ─────────────────────────────────────────────────────────────────────────────

describe('E50 POST /api/events', () => {
  it('a CP creates an event for their own society → 201, creatorRole=cp, societyId set', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const res = await api('post', '/api/events', cp).send(eventBody());
    expect(res.status).toBe(201);
    expect(res.body.data.event).toMatchObject({
      creatorId: cp.id,
      creatorRole: 'cp',
      societyId: society.id,
      title: 'Plastic Drive',
      type: 'drive',
      status: 'active',
    });
    expect(res.body.data.event.rsvps).toHaveLength(0);
  });

  it('a treasurer creates an event for their society', async () => {
    const society = await seedSociety();
    const treasurer = await seedOfficer({ role: 'treasurer', societyId: society._id });
    const res = await api('post', '/api/events', treasurer).send(eventBody());
    expect(res.status).toBe(201);
    expect(res.body.data.event.creatorRole).toBe('treasurer');
    expect(res.body.data.event.societyId).toBe(society.id);
  });

  it('a verified NGO creates a public event (societyId omitted → null)', async () => {
    const ngo = await seedNgo({ verified: true });
    const res = await api('post', '/api/events', ngo).send(eventBody());
    expect(res.status).toBe(201);
    expect(res.body.data.event.societyId).toBeNull();
    expect(res.body.data.event.creatorRole).toBe('ngo');
  });

  it('a verified NGO creates a targeted event with a societyId', async () => {
    const ngo = await seedNgo({ verified: true });
    const society = await seedSociety();
    const res = await api('post', '/api/events', ngo).send(eventBody({ societyId: society.id }));
    expect(res.status).toBe(201);
    expect(res.body.data.event.societyId).toBe(society.id);
  });

  it('403 FORBIDDEN for a resident (non-officer person)', async () => {
    const society = await seedSociety();
    const resident = await seedResident({ societyId: society._id });
    const res = await api('post', '/api/events', resident).send(eventBody());
    expect(res.status).toBe(403);
  });

  it('403 FORBIDDEN for a plain person with no society', async () => {
    const person = await seedPerson();
    expect((await api('post', '/api/events', person).send(eventBody())).status).toBe(403);
  });

  it('403 FORBIDDEN for a bhangarwala', async () => {
    expect(
      (await api('post', '/api/events', await seedBhangarwala()).send(eventBody())).status
    ).toBe(403);
  });

  it('403 NGO_NOT_VERIFIED for an unverified NGO', async () => {
    const unverifiedNgo = await seedNgo({ verified: false });
    const res = await api('post', '/api/events', unverifiedNgo).send(eventBody());
    expect([res.status, res.body.error.code]).toEqual([403, 'NGO_NOT_VERIFIED']);
  });

  it('400 for invalid fields: missing title, bad type, past date', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    expect((await api('post', '/api/events', cp).send(eventBody({ title: '' }))).status).toBe(400);
    expect((await api('post', '/api/events', cp).send(eventBody({ type: 'party' }))).status).toBe(400);
    expect((await api('post', '/api/events', cp).send({ type: 'drive', date: 'tomorrow' })).status).toBe(400);
  });

  it('401 without a token', async () => {
    expect((await api('post', '/api/events').send(eventBody())).status).toBe(401);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// E49 GET /api/events
// ─────────────────────────────────────────────────────────────────────────────

describe('E49 GET /api/events', () => {
  it('a person sees their society events + public NGO events, but not other societies\'', async () => {
    const society1 = await seedSociety();
    const society2 = await seedSociety();
    const cp1 = await seedOfficer({ role: 'cp', societyId: society1._id });
    const cp2 = await seedOfficer({ role: 'cp', societyId: society2._id });
    const ngo = await seedNgo({ verified: true });
    const resident = await seedResident({ societyId: society1._id });

    // society1 event (visible to resident)
    const ev1 = (await api('post', '/api/events', cp1).send(eventBody({ title: 'Soc1 Drive' }))).body.data.event;
    // society2 event (not visible)
    await api('post', '/api/events', cp2).send(eventBody({ title: 'Soc2 Drive' }));
    // public NGO event (visible)
    const ev3 = (await api('post', '/api/events', ngo).send(eventBody({ title: 'NGO Public' }))).body.data.event;

    const res = await api('get', '/api/events', resident);
    expect(res.status).toBe(200);
    const ids = res.body.data.map((e) => e.id);
    expect(ids).toContain(ev1.id);
    expect(ids).toContain(ev3.id);
    // society2's event must NOT appear
    expect(res.body.data.every((e) => e.title !== 'Soc2 Drive')).toBe(true);
  });

  it('a person with no society only sees public NGO events', async () => {
    const ngo = await seedNgo({ verified: true });
    const person = await seedPerson();
    await api('post', '/api/events', ngo).send(eventBody({ title: 'Public' }));

    const res = await api('get', '/api/events', person);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].title).toBe('Public');
  });

  it('an NGO only sees events it created', async () => {
    const ngo = await seedNgo({ verified: true });
    const otherNgo = await seedNgo({ verified: true });
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });

    await api('post', '/api/events', ngo).send(eventBody({ title: 'Mine' }));
    await api('post', '/api/events', otherNgo).send(eventBody({ title: 'Other NGO' }));
    await api('post', '/api/events', cp).send(eventBody({ title: 'Society Event' }));

    const res = await api('get', '/api/events', ngo);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].title).toBe('Mine');
  });

  it('cancelled events do not appear in the list', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const resident = await seedResident({ societyId: society._id });

    const created = (await api('post', '/api/events', cp).send(eventBody())).body.data.event;
    await api('delete', `/api/events/${created.id}`, cp);

    const res = await api('get', '/api/events', resident);
    expect(res.body.data.every((e) => e.id !== created.id)).toBe(true);
  });

  it('events are sorted by date ascending', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const resident = await seedResident({ societyId: society._id });
    const now = Date.now();

    await api('post', '/api/events', cp).send(eventBody({ title: 'Later', date: new Date(now + 14 * 86400000).toISOString() }));
    await api('post', '/api/events', cp).send(eventBody({ title: 'Sooner', date: new Date(now + 3 * 86400000).toISOString() }));

    const res = await api('get', '/api/events', resident);
    const titles = res.body.data.map((e) => e.title);
    expect(titles.indexOf('Sooner')).toBeLessThan(titles.indexOf('Later'));
  });

  it('401 without a token', async () => {
    expect((await api('get', '/api/events')).status).toBe(401);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// E51 PATCH /api/events/:eventId
// ─────────────────────────────────────────────────────────────────────────────

describe('E51 PATCH /api/events/:eventId', () => {
  it('creator can update title, type, date, location and description', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const created = (await api('post', '/api/events', cp).send(eventBody())).body.data.event;

    const newDate = new Date(Date.now() + 30 * 86400000).toISOString();
    const res = await api('patch', `/api/events/${created.id}`, cp)
      .send({ title: 'Updated Drive', type: 'workshop', date: newDate });
    expect(res.status).toBe(200);
    expect(res.body.data.event).toMatchObject({ title: 'Updated Drive', type: 'workshop' });
  });

  it('can update a single field', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const { event } = (await api('post', '/api/events', cp).send(eventBody())).body.data;
    const res = await api('patch', `/api/events/${event.id}`, cp).send({ title: 'New Title' });
    expect(res.status).toBe(200);
    expect(res.body.data.event.title).toBe('New Title');
  });

  it('403 NOT_CREATOR when another user tries to edit', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const otherCp = await seedOfficer({ role: 'cp' }); // different society
    const { event } = (await api('post', '/api/events', cp).send(eventBody())).body.data;

    const res = await api('patch', `/api/events/${event.id}`, otherCp).send({ title: 'Hijacked' });
    expect([res.status, res.body.error.code]).toEqual([403, 'NOT_CREATOR']);
  });

  it('409 EVENT_CANCELLED when editing a cancelled event', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const { event } = (await api('post', '/api/events', cp).send(eventBody())).body.data;
    await api('delete', `/api/events/${event.id}`, cp);

    const res = await api('patch', `/api/events/${event.id}`, cp).send({ title: 'After Cancel' });
    expect([res.status, res.body.error.code]).toEqual([409, 'EVENT_CANCELLED']);
  });

  it('400 for an empty body; 404 for an unknown id', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const { event } = (await api('post', '/api/events', cp).send(eventBody())).body.data;

    expect((await api('patch', `/api/events/${event.id}`, cp).send({})).status).toBe(400);
    expect((await api('patch', `/api/events/${oid()}`, cp).send({ title: 'X' })).status).toBe(404);
  });

  it('401 without a token', async () => {
    expect((await api('patch', `/api/events/${oid()}`).send({ title: 'X' })).status).toBe(401);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// E52 DELETE /api/events/:eventId
// ─────────────────────────────────────────────────────────────────────────────

describe('E52 DELETE /api/events/:eventId', () => {
  it('creator can soft-cancel an active event', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const { event } = (await api('post', '/api/events', cp).send(eventBody())).body.data;

    const res = await api('delete', `/api/events/${event.id}`, cp);
    expect(res.status).toBe(200);
    expect(res.body.data.event.status).toBe('cancelled');
    expect((await Event.findById(event.id)).status).toBe('cancelled');
  });

  it('a verified NGO can cancel its own event', async () => {
    const ngo = await seedNgo({ verified: true });
    const { event } = (await api('post', '/api/events', ngo).send(eventBody())).body.data;
    const res = await api('delete', `/api/events/${event.id}`, ngo);
    expect(res.status).toBe(200);
    expect(res.body.data.event.status).toBe('cancelled');
  });

  it('403 NOT_CREATOR when someone else tries to delete', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const otherCp = await seedOfficer({ role: 'cp' });
    const { event } = (await api('post', '/api/events', cp).send(eventBody())).body.data;

    const res = await api('delete', `/api/events/${event.id}`, otherCp);
    expect([res.status, res.body.error.code]).toEqual([403, 'NOT_CREATOR']);
  });

  it('409 EVENT_CANCELLED when already cancelled', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const { event } = (await api('post', '/api/events', cp).send(eventBody())).body.data;
    await api('delete', `/api/events/${event.id}`, cp);

    const res = await api('delete', `/api/events/${event.id}`, cp);
    expect([res.status, res.body.error.code]).toEqual([409, 'EVENT_CANCELLED']);
  });

  it('404 for an unknown or malformed id', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    expect((await api('delete', `/api/events/${oid()}`, cp)).status).toBe(404);
    expect((await api('delete', '/api/events/nope', cp)).status).toBe(404);
  });

  it('401 without a token', async () => {
    expect((await api('delete', `/api/events/${oid()}`)).status).toBe(401);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// E53 POST /api/events/:eventId/rsvp
// ─────────────────────────────────────────────────────────────────────────────

describe('E53 POST /api/events/:eventId/rsvp', () => {
  it('toggles RSVP on then off and the count is correct', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const resident = await seedResident({ societyId: society._id });
    const { event } = (await api('post', '/api/events', cp).send(eventBody())).body.data;

    // First RSVP: adds
    let res = await api('post', `/api/events/${event.id}/rsvp`, resident);
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ rsvped: true, rsvpCount: 1 });

    // Second RSVP: removes
    res = await api('post', `/api/events/${event.id}/rsvp`, resident);
    expect(res.body.data).toMatchObject({ rsvped: false, rsvpCount: 0 });

    // Count still 0 in DB
    expect((await Event.findById(event.id)).rsvps).toHaveLength(0);
  });

  it('two residents RSVP independently — count is 2', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const r1 = await seedResident({ societyId: society._id });
    const r2 = await seedResident({ societyId: society._id });
    const { event } = (await api('post', '/api/events', cp).send(eventBody())).body.data;

    await api('post', `/api/events/${event.id}/rsvp`, r1);
    const res = await api('post', `/api/events/${event.id}/rsvp`, r2);
    expect(res.body.data.rsvpCount).toBe(2);
  });

  it('a resident can RSVP a public NGO event', async () => {
    const ngo = await seedNgo({ verified: true });
    const resident = await seedResident();
    const { event } = (await api('post', '/api/events', ngo).send(eventBody())).body.data;

    const res = await api('post', `/api/events/${event.id}/rsvp`, resident);
    expect(res.status).toBe(200);
    expect(res.body.data.rsvped).toBe(true);
  });

  it('403 FORBIDDEN when a resident tries to RSVP another society\'s private event', async () => {
    const soc1 = await seedSociety();
    const soc2 = await seedSociety();
    const cp1 = await seedOfficer({ role: 'cp', societyId: soc1._id });
    const resident2 = await seedResident({ societyId: soc2._id });
    const { event } = (await api('post', '/api/events', cp1).send(eventBody())).body.data;

    const res = await api('post', `/api/events/${event.id}/rsvp`, resident2);
    expect(res.status).toBe(403);
  });

  it('403 FORBIDDEN when a person with no society RSVPs a private event', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const person = await seedPerson();
    const { event } = (await api('post', '/api/events', cp).send(eventBody())).body.data;

    expect((await api('post', `/api/events/${event.id}/rsvp`, person)).status).toBe(403);
  });

  it('409 EVENT_CANCELLED when RSVPing a cancelled event', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const resident = await seedResident({ societyId: society._id });
    const { event } = (await api('post', '/api/events', cp).send(eventBody())).body.data;
    await api('delete', `/api/events/${event.id}`, cp);

    const res = await api('post', `/api/events/${event.id}/rsvp`, resident);
    expect([res.status, res.body.error.code]).toEqual([409, 'EVENT_CANCELLED']);
  });

  it('403 FORBIDDEN for an NGO (not a person)', async () => {
    const ngo = await seedNgo({ verified: true });
    const { event } = (await api('post', '/api/events', ngo).send(eventBody())).body.data;
    expect((await api('post', `/api/events/${event.id}/rsvp`, ngo)).status).toBe(403);
  });

  it('404 for an unknown or malformed event id', async () => {
    const resident = await seedResident();
    expect((await api('post', `/api/events/${oid()}/rsvp`, resident)).status).toBe(404);
    expect((await api('post', '/api/events/nope/rsvp', resident)).status).toBe(404);
  });

  it('401 without a token', async () => {
    expect((await api('post', `/api/events/${oid()}/rsvp`)).status).toBe(401);
  });
});
