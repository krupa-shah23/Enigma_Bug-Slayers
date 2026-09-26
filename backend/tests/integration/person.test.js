/**
 * tests/integration/person.test.js
 * E47 GET /api/person/dashboard
 * E48 GET /api/person/exchange-history
 */

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const { Contribution, Job, Event } = require('../../src/models');
const {
  seedPerson, seedResident, seedSociety, seedOfficer,
  seedBhangarwala, seedNgo, seedP2PRequest, authHeader,
} = require('../fixtures');

const api = (method, path, user) =>
  request(app)[method](path).set(user ? authHeader(user) : {});

// ─────────────────────────────────────────────────────────────────────────────
// E47 GET /api/person/dashboard
// ─────────────────────────────────────────────────────────────────────────────

describe('E47 GET /api/person/dashboard', () => {
  it('returns zero/null for a fresh person with no society', async () => {
    const person = await seedPerson();
    const res = await api('get', '/api/person/dashboard', person);
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      feeCreditPaise: 0,
      contributions: null, // no society
      activeRequest: null,
      upcomingEvents: [],
    });
  });

  it('returns contribution cycle, fee credit, active request and upcoming events', async () => {
    const society = await seedSociety();
    const ngo = await seedNgo({ verified: true });
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const resident = await seedResident({ societyId: society._id });

    // Log a contribution for the resident
    await Contribution.create({
      userId: resident._id,
      societyId: society._id,
      category: 'plastic',
      weightKg: 5,
      loggedAt: new Date(),
    });

    // Create an open P2P request for this person
    const pReq = await seedP2PRequest({ personId: resident._id });

    // Create an upcoming event for the society
    await Event.create({
      creatorId: cp._id,
      creatorRole: 'cp',
      societyId: society._id,
      title: 'Upcoming Drive',
      type: 'drive',
      date: new Date(Date.now() + 3 * 86400000),
    });

    // Create a public NGO event (also visible)
    await Event.create({
      creatorId: ngo._id,
      creatorRole: 'ngo',
      societyId: null,
      title: 'NGO Public Event',
      type: 'workshop',
      date: new Date(Date.now() + 5 * 86400000),
    });

    // Create a past event (should NOT appear in upcoming)
    await Event.create({
      creatorId: cp._id,
      creatorRole: 'cp',
      societyId: society._id,
      title: 'Past Drive',
      type: 'drive',
      date: new Date(Date.now() - 86400000),
    });

    const res = await api('get', '/api/person/dashboard', resident);
    expect(res.status).toBe(200);

    const { data } = res.body;

    // Contributions present and plastic totalKg = 5
    expect(data.contributions).not.toBeNull();
    const plastic = data.contributions.find((c) => c.category === 'plastic');
    expect(plastic.totalKg).toBe(5);

    // Active request
    expect(data.activeRequest).not.toBeNull();
    expect(data.activeRequest.id).toBe(pReq.id);

    // Upcoming events: 2 (society + public), no past event
    expect(data.upcomingEvents).toHaveLength(2);
    const titles = data.upcomingEvents.map((e) => e.title);
    expect(titles).toContain('Upcoming Drive');
    expect(titles).toContain('NGO Public Event');
    expect(titles).not.toContain('Past Drive');

    // Events sorted by date ascending
    expect(new Date(data.upcomingEvents[0].date) <= new Date(data.upcomingEvents[1].date)).toBe(true);
  });

  it('capped at 5 upcoming events', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const resident = await seedResident({ societyId: society._id });

    // Create 7 future events
    for (let i = 1; i <= 7; i++) {
      await Event.create({
        creatorId: cp._id, creatorRole: 'cp', societyId: society._id,
        title: `Event ${i}`, type: 'drive',
        date: new Date(Date.now() + i * 86400000),
      });
    }

    const res = await api('get', '/api/person/dashboard', resident);
    expect(res.body.data.upcomingEvents).toHaveLength(5);
  });

  it('does not show another society\'s events', async () => {
    const soc1 = await seedSociety();
    const soc2 = await seedSociety();
    const cp1 = await seedOfficer({ role: 'cp', societyId: soc1._id });
    const cp2 = await seedOfficer({ role: 'cp', societyId: soc2._id });
    const resident = await seedResident({ societyId: soc1._id });

    await Event.create({
      creatorId: cp1._id, creatorRole: 'cp', societyId: soc1._id,
      title: 'My Society', type: 'drive', date: new Date(Date.now() + 86400000),
    });
    await Event.create({
      creatorId: cp2._id, creatorRole: 'cp', societyId: soc2._id,
      title: 'Other Society', type: 'drive', date: new Date(Date.now() + 86400000),
    });

    const res = await api('get', '/api/person/dashboard', resident);
    const titles = res.body.data.upcomingEvents.map((e) => e.title);
    expect(titles).toContain('My Society');
    expect(titles).not.toContain('Other Society');
  });

  it('cancelled events do not appear in upcoming', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const resident = await seedResident({ societyId: society._id });

    await Event.create({
      creatorId: cp._id, creatorRole: 'cp', societyId: society._id,
      title: 'Cancelled Drive', type: 'drive',
      date: new Date(Date.now() + 86400000), status: 'cancelled',
    });

    const res = await api('get', '/api/person/dashboard', resident);
    expect(res.body.data.upcomingEvents.every((e) => e.title !== 'Cancelled Drive')).toBe(true);
  });

  it('activeRequest is null when no open request', async () => {
    const society = await seedSociety();
    const resident = await seedResident({ societyId: society._id });
    // Create a completed request — should not appear
    const req = await seedP2PRequest({ personId: resident._id, status: 'completed' });
    const res = await api('get', '/api/person/dashboard', resident);
    expect(res.body.data.activeRequest).toBeNull();
  });

  it('403 for a bhangarwala, 401 without a token', async () => {
    expect((await api('get', '/api/person/dashboard', await seedBhangarwala())).status).toBe(403);
    expect((await api('get', '/api/person/dashboard')).status).toBe(401);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// E48 GET /api/person/exchange-history
// ─────────────────────────────────────────────────────────────────────────────

describe('E48 GET /api/person/exchange-history', () => {
  it('returns empty history for a fresh person', async () => {
    const person = await seedPerson();
    const res = await api('get', '/api/person/exchange-history', person);
    expect(res.status).toBe(200);
    expect(res.body.data.history).toHaveLength(0);
  });

  it('returns completed jobs with category and bhangarwala details, newest first', async () => {
    const person = await seedPerson();
    const bh = await seedBhangarwala({ lat: 19.0, lng: 72.8 });
    const req1 = await seedP2PRequest({ personId: person._id, category: 'paper', status: 'completed' });
    const req2 = await seedP2PRequest({ personId: person._id, category: 'metal', status: 'completed' });

    const now = new Date();
    const earlier = new Date(now.getTime() - 3600000);

    const [j1, j2] = await Job.create([
      {
        requestId: req1._id, quoteId: new mongoose.Types.ObjectId(),
        personId: person._id, bhangarwalaId: bh._id,
        price: 150, status: 'completed', completedAt: earlier,
      },
      {
        requestId: req2._id, quoteId: new mongoose.Types.ObjectId(),
        personId: person._id, bhangarwalaId: bh._id,
        price: 200, status: 'completed', completedAt: now,
      },
    ]);

    const res = await api('get', '/api/person/exchange-history', person);
    expect(res.status).toBe(200);
    const { history } = res.body.data;
    expect(history).toHaveLength(2);

    // Newest first
    expect(history[0].price).toBe(200);
    expect(history[0].category).toBe('metal');
    expect(history[1].price).toBe(150);
    expect(history[1].category).toBe('paper');

    // Bhangarwala info present
    expect(history[0].bhangarwala.id).toBe(bh.id);
    expect(history[0].bhangarwala.name).toBe(bh.name);
  });

  it('does not include in-progress (non-completed) jobs', async () => {
    const person = await seedPerson();
    const bh = await seedBhangarwala({ lat: 19.0, lng: 72.8 });
    const req1 = await seedP2PRequest({ personId: person._id });
    await Job.create({
      requestId: req1._id, quoteId: new mongoose.Types.ObjectId(),
      personId: person._id, bhangarwalaId: bh._id,
      price: 100, status: 'heading',
    });

    const res = await api('get', '/api/person/exchange-history', person);
    expect(res.body.data.history).toHaveLength(0);
  });

  it('does not include another person\'s jobs', async () => {
    const p1 = await seedPerson();
    const p2 = await seedPerson();
    const bh = await seedBhangarwala({ lat: 19.0, lng: 72.8 });
    const req = await seedP2PRequest({ personId: p2._id, status: 'completed' });
    await Job.create({
      requestId: req._id, quoteId: new mongoose.Types.ObjectId(),
      personId: p2._id, bhangarwalaId: bh._id,
      price: 300, status: 'completed', completedAt: new Date(),
    });

    const res = await api('get', '/api/person/exchange-history', p1);
    expect(res.body.data.history).toHaveLength(0);
  });

  it('403 for a bhangarwala, 401 without a token', async () => {
    expect((await api('get', '/api/person/exchange-history', await seedBhangarwala())).status).toBe(403);
    expect((await api('get', '/api/person/exchange-history')).status).toBe(401);
  });
});
