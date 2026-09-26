/**
 * RBAC middleware tests against throwaway test-only routes
 * (real society routes arrive in later steps).
 */

const express = require('express');
const request = require('supertest');
const errorHandler = require('../../src/middleware/errorHandler');
const {
  auth, requireRole, requireSocietyMember, requireSocietyOfficer, requireVerifiedNgo,
} = require('../../src/middleware/auth');
const {
  seedPerson, seedResident, seedSociety, seedOfficer, seedNgo, seedBhangarwala, authHeader,
} = require('../fixtures');

const done = (_req, res) => res.json({ success: true, data: {} });

const app = express();
app.use(express.json());
app.get('/t/persons-and-ngos', auth, requireRole('person', 'ngo'), done);
app.get('/t/ngos', auth, requireRole('ngo'), done);
app.get('/t/societies/:societyId/member', auth, requireSocietyMember, done);
app.get('/t/societies/:societyId/officer', auth, requireSocietyOfficer, done);
app.get('/t/verified-ngo', auth, requireVerifiedNgo, done);
app.use(errorHandler);

const get = (path, user) => request(app).get(path).set(user ? authHeader(user) : {});

describe('requireRole', () => {
  it('allows a listed role', async () => {
    expect((await get('/t/persons-and-ngos', await seedPerson())).status).toBe(200);
    expect((await get('/t/persons-and-ngos', await seedNgo())).status).toBe(200);
  });

  it('403 FORBIDDEN for an unlisted role', async () => {
    const res = await get('/t/persons-and-ngos', await seedBhangarwala());
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });

  it('401 without a token (auth runs first)', async () => {
    expect((await get('/t/ngos')).status).toBe(401);
  });
});

describe('requireSocietyMember', () => {
  it('allows a member (resident or officer)', async () => {
    const society = await seedSociety();
    const resident = await seedResident({ societyId: society._id });
    expect((await get(`/t/societies/${society.id}/member`, resident)).status).toBe(200);
    expect((await get(`/t/societies/${society.id}/member`, await seedOfficer({ societyId: society._id }))).status).toBe(200);
  });

  it('403 NOT_SOCIETY_MEMBER for a person with no society', async () => {
    const society = await seedSociety();
    const res = await get(`/t/societies/${society.id}/member`, await seedPerson());
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('NOT_SOCIETY_MEMBER');
  });

  it('403 NOT_SOCIETY_MEMBER for a member of a different society', async () => {
    const [a, b] = [await seedSociety(), await seedSociety()];
    const residentOfA = await seedResident({ societyId: a._id });
    const res = await get(`/t/societies/${b.id}/member`, residentOfA);
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('NOT_SOCIETY_MEMBER');
  });
});

describe('requireSocietyOfficer', () => {
  it('allows the CP and the Treasurer of that society', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const treasurer = await seedOfficer({ role: 'treasurer', societyId: society._id });
    expect((await get(`/t/societies/${society.id}/officer`, cp)).status).toBe(200);
    expect((await get(`/t/societies/${society.id}/officer`, treasurer)).status).toBe(200);
  });

  it('403 NOT_SOCIETY_OFFICER for a resident', async () => {
    const society = await seedSociety();
    const resident = await seedResident({ societyId: society._id });
    const res = await get(`/t/societies/${society.id}/officer`, resident);
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('NOT_SOCIETY_OFFICER');
  });

  it('403 for an officer of society A acting on society B', async () => {
    const [a, b] = [await seedSociety(), await seedSociety()];
    const cpOfA = await seedOfficer({ role: 'cp', societyId: a._id });
    const res = await get(`/t/societies/${b.id}/officer`, cpOfA);
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('NOT_SOCIETY_OFFICER');
  });

  it('403 for a person with no society', async () => {
    const society = await seedSociety();
    expect((await get(`/t/societies/${society.id}/officer`, await seedPerson())).status).toBe(403);
  });
});

describe('requireVerifiedNgo', () => {
  it('allows an approved NGO', async () => {
    expect((await get('/t/verified-ngo', await seedNgo({ verified: true }))).status).toBe(200);
  });

  it('403 NGO_NOT_VERIFIED for an unverified NGO', async () => {
    const res = await get('/t/verified-ngo', await seedNgo({ verified: false }));
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('NGO_NOT_VERIFIED');
  });

  it('403 NGO_NOT_VERIFIED for a non-NGO', async () => {
    const res = await get('/t/verified-ngo', await seedPerson());
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('NGO_NOT_VERIFIED');
  });
});
