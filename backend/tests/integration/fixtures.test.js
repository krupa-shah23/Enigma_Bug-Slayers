const jwt = require('jsonwebtoken');
const {
  User, Society, Contract, P2PRequest,
} = require('../../src/models');
const {
  seedPerson, seedResident, seedSociety, seedOfficer, seedNgo, seedBhangarwala,
  seedContract, seedP2PRequest, authHeader,
} = require('../fixtures');

describe('fixtures smoke test', () => {
  it('seedPerson creates a society-less person', async () => {
    const p = await seedPerson();
    expect(p.role).toBe('person');
    expect(p.societyId).toBeUndefined();
  });

  it('seedPerson accepts and ignores lat/lng', async () => {
    const p = await seedPerson({ lat: 19.07, lng: 72.87 });
    expect(p.role).toBe('person');
    expect(p.lat).toBeUndefined();
  });

  it('seedSociety creates a CP linked to the society', async () => {
    const s = await seedSociety();
    const cp = await User.findById(s.cpId);
    expect(cp.societyId.equals(s._id)).toBe(true);
    expect(cp.societyRole).toBe('cp');
  });

  it('seedSociety uses a supplied cpId', async () => {
    const cp = await seedPerson();
    const s = await seedSociety({ cpId: cp._id });
    expect(s.cpId.equals(cp._id)).toBe(true);
  });

  it('societies are seeded far enough apart to never be duplicates', async () => {
    const [a, b] = [await seedSociety(), await seedSociety()];
    expect(Math.abs(a.location.lat - b.location.lat)).toBeGreaterThan(0.005);
  });

  it('seedResident joins an existing society, or creates one', async () => {
    const s = await seedSociety();
    const r = await seedResident({ societyId: s._id });
    expect([r.societyRole, r.societyId.equals(s._id)]).toEqual(['resident', true]);
    expect((await seedResident()).societyId).toBeDefined();
  });

  it('seedOfficer returns the CP, or a treasurer linked to the society', async () => {
    const s = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: s._id });
    expect(cp._id.equals(s.cpId)).toBe(true);

    const treasurer = await seedOfficer({ role: 'treasurer', societyId: s._id });
    expect(treasurer.societyRole).toBe('treasurer');
    expect((await Society.findById(s._id)).treasurerId.equals(treasurer._id)).toBe(true);

    expect((await seedOfficer()).societyRole).toBe('cp'); // creates its own society
  });

  it('seedNgo honours the verified flag', async () => {
    expect((await seedNgo()).ngo.verificationStatus).toBe('none');
    expect((await seedNgo({ verified: true })).ngo.verificationStatus).toBe('approved');
  });

  it('seedBhangarwala sets location and online status', async () => {
    const b = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    expect(b.bhangarwala.location.lat).toBe(19.08);
    expect(b.bhangarwala.isOnline).toBe(true);
    expect(b.bhangarwala.locationUpdatedAt).toBeInstanceOf(Date);

    const offline = await seedBhangarwala({ lat: 19.08, lng: 72.88, isOnline: false });
    expect(offline.bhangarwala.isOnline).toBe(false);

    const noLocation = await seedBhangarwala();
    expect(noLocation.bhangarwala.location).toBeUndefined();
  });

  it('seedContract creates a verified NGO and society by default, and honours status', async () => {
    const c = await seedContract();
    expect(c.status).toBe('offered');
    expect((await User.findById(c.ngoId)).ngo.verificationStatus).toBe('approved');
    expect(await Society.findById(c.societyId)).not.toBeNull();

    const active = await seedContract({ status: 'active' });
    expect(active.status).toBe('active');
    expect(active.acceptedAt).toBeInstanceOf(Date);
    expect(await Contract.countDocuments()).toBe(2);
  });

  it('seedP2PRequest stores the notified bhangarwalas', async () => {
    const b = await seedBhangarwala({ lat: 19.08, lng: 72.88 });
    const p = await seedPerson();
    const r = await seedP2PRequest({ personId: p._id, notified: [b._id] });
    expect(r.status).toBe('open');
    expect(r.notifiedBhangarwalaIds[0].equals(b._id)).toBe(true);
    expect((await seedP2PRequest()).personId).toBeDefined();
    expect(await P2PRequest.countDocuments()).toBe(2);
  });

  it('authHeader produces a verifiable bearer token with { sub, role }', async () => {
    const u = await seedPerson();
    const { Authorization } = authHeader(u);
    expect(Authorization).toMatch(/^Bearer /);
    const payload = jwt.verify(Authorization.slice(7), process.env.JWT_SECRET);
    expect(payload.sub).toBe(u.id);
    expect(payload.role).toBe('person');
  });
});
