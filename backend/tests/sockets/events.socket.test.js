/**
 * tests/sockets/events.socket.test.js
 * S11 — event:new fires on E50 POST /api/events.
 *
 * Society event  → emitted to society room (members) but not to the persons room
 * Public NGO event → emitted to persons room (all persons) but not to officers of
 *                    unrelated societies
 */

const request = require('supertest');
const app = require('../../src/app');
const {
  seedSociety, seedOfficer, seedResident, seedNgo, authHeader,
} = require('../fixtures');
const { startTestServer, waitFor, expectNoEvent } = require('./helpers');

const api = (method, path, user) => request(app)[method](path).set(authHeader(user));

let t;
beforeAll(async () => { t = await startTestServer(); });
afterAll(async () => { await t.close(); });

const futureDate = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

const eventBody = (overrides = {}) => ({
  title: 'Test Drive',
  type: 'drive',
  date: futureDate(),
  ...overrides,
});

describe('S11 event:new — society event', () => {
  it('reaches every member of the society but not members of another society', async () => {
    const soc1 = await seedSociety();
    const soc2 = await seedSociety();
    const cp1 = await seedOfficer({ role: 'cp', societyId: soc1._id });
    const treasurer1 = await seedOfficer({ role: 'treasurer', societyId: soc1._id });
    const resident1 = await seedResident({ societyId: soc1._id });
    const cp2 = await seedOfficer({ role: 'cp', societyId: soc2._id });

    const [s_cp1, s_tr1, s_res1, s_cp2] = await Promise.all(
      [cp1, treasurer1, resident1, cp2].map((u) => t.connectAs(u))
    );

    const EVENT = 'event:new';
    const gots = [waitFor(s_cp1, EVENT), waitFor(s_tr1, EVENT), waitFor(s_res1, EVENT)];
    const none = expectNoEvent(s_cp2, EVENT);

    const res = await api('post', '/api/events', cp1).send(eventBody({ title: 'Soc1 Event' })).expect(201);

    for (const payload of await Promise.all(gots)) {
      expect(payload.event.id).toBe(res.body.data.event.id);
      expect(payload.event.societyId).toBe(soc1.id);
    }
    await none;
  });

  it('is not emitted when creation fails (unverified NGO)', async () => {
    const soc = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: soc._id });
    const s_cp = await t.connectAs(cp);
    const none = expectNoEvent(s_cp, 'event:new');

    await api('post', '/api/events', await seedNgo({ verified: false }))
      .send(eventBody())
      .expect(403);

    await none;
  });
});

describe('S11 event:new — public NGO event', () => {
  it('reaches all connected persons but not officers of unrelated societies as NGO', async () => {
    const ngo = await seedNgo({ verified: true });
    const otherNgo = await seedNgo({ verified: true });

    // Two persons with different societies
    const soc = await seedSociety();
    const resident = await seedResident({ societyId: soc._id });
    const loner = await seedResident(); // person with a fresh society

    const [s_res, s_loner, s_ngo, s_other_ngo] = await Promise.all(
      [resident, loner, ngo, otherNgo].map((u) => t.connectAs(u))
    );

    const EVENT = 'event:new';
    const gotRes = waitFor(s_res, EVENT);
    const gotLoner = waitFor(s_loner, EVENT);
    // NGOs are not in the persons room — they should NOT receive
    const noneNgo = expectNoEvent(s_ngo, EVENT);
    const noneOtherNgo = expectNoEvent(s_other_ngo, EVENT);

    const res = await api('post', '/api/events', ngo)
      .send(eventBody({ title: 'Public NGO Event' }))
      .expect(201);

    for (const payload of [await gotRes, await gotLoner]) {
      expect(payload.event.id).toBe(res.body.data.event.id);
      expect(payload.event.societyId).toBeNull();
    }
    await Promise.all([noneNgo, noneOtherNgo]);
  });

  it('a targeted NGO event (with societyId) only reaches that society', async () => {
    const ngo = await seedNgo({ verified: true });
    const soc1 = await seedSociety();
    const soc2 = await seedSociety();
    const res1 = await seedResident({ societyId: soc1._id });
    const res2 = await seedResident({ societyId: soc2._id });

    const [s_res1, s_res2] = await Promise.all(
      [res1, res2].map((u) => t.connectAs(u))
    );

    const EVENT = 'event:new';
    const got = waitFor(s_res1, EVENT);
    const none = expectNoEvent(s_res2, EVENT);

    const res = await api('post', '/api/events', ngo)
      .send(eventBody({ societyId: soc1.id, title: 'Targeted NGO Event' }))
      .expect(201);

    expect((await got).event.societyId).toBe(soc1.id);
    await none;
  });
});
