const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/models');
const emitter = require('../../src/sockets/emitter');
const jwt = require('jsonwebtoken');
const {
  seedPerson, seedResident, seedSociety, seedOfficer, seedNgo, seedBhangarwala, authHeader, signToken,
} = require('../fixtures');
const { startTestServer, waitFor, expectNoEvent } = require('./helpers');

let t;
beforeAll(async () => { t = await startTestServer(); });
afterAll(async () => { await t.close(); });

const refusal = async (auth) => {
  const err = await t.connectRaw(auth).then(() => null, (e) => e);
  expect(err).not.toBeNull();
  return err;
};

describe('handshake authentication', () => {
  it('connects with a valid access token', async () => {
    const socket = await t.connectAs(await seedPerson());
    expect(socket.connected).toBe(true);
  });

  it('refuses a missing token with UNAUTHENTICATED', async () => {
    const err = await refusal({});
    expect(err.message).toBe('UNAUTHENTICATED');
    expect(err.data.code).toBe('UNAUTHENTICATED');
  });

  it('refuses a garbage token', async () => {
    expect((await refusal({ token: 'not.a.jwt' })).message).toBe('UNAUTHENTICATED');
  });

  it('refuses an expired token with TOKEN_EXPIRED', async () => {
    const user = await seedPerson();
    const err = await refusal({ token: signToken(user, { expiresIn: -10 }) });
    expect(err.message).toBe('TOKEN_EXPIRED');
  });

  it('refuses a token signed with the wrong secret', async () => {
    const user = await seedPerson();
    const forged = jwt.sign({ sub: user.id, role: 'person' }, 'a-different-secret-entirely-32chars!!');
    expect((await refusal({ token: forged })).message).toBe('UNAUTHENTICATED');
  });

  it('refuses a token whose user was deleted, or whose subject is not an id', async () => {
    const user = await seedPerson();
    const token = signToken(user);
    await User.deleteOne({ _id: user._id });
    expect((await refusal({ token })).message).toBe('UNAUTHENTICATED');

    const bad = jwt.sign({ sub: 'nope', role: 'person' }, process.env.JWT_SECRET);
    expect((await refusal({ token: bad })).message).toBe('UNAUTHENTICATED');
  });
});

describe('room membership', () => {
  it('a person with no society joins only their user room and "persons"', async () => {
    const person = await seedPerson();
    await t.connectAs(person);
    expect(await t.roomsOf(person.id)).toEqual(['persons', `user:${person.id}`].sort());
  });

  it('a resident also joins the society room, but not the officers room', async () => {
    const resident = await seedResident();
    await t.connectAs(resident);
    const sid = resident.societyId.toString();
    expect(await t.roomsOf(resident.id)).toEqual(['persons', `society:${sid}`, `user:${resident.id}`].sort());
  });

  it('the CP and the Treasurer also join the officers room', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const treasurer = await seedOfficer({ role: 'treasurer', societyId: society._id });
    await t.connectAs(cp);
    await t.connectAs(treasurer);

    for (const officer of [cp, treasurer]) {
      const rooms = await t.roomsOf(officer.id);
      expect(rooms).toContain(`society:${society.id}`);
      expect(rooms).toContain(`society:${society.id}:officers`);
    }
  });

  it('NGOs and bhangarwalas only join their own user room', async () => {
    const ngo = await seedNgo();
    const bhangarwala = await seedBhangarwala();
    await t.connectAs(ngo);
    await t.connectAs(bhangarwala);
    expect(await t.roomsOf(ngo.id)).toEqual([`user:${ngo.id}`]);
    expect(await t.roomsOf(bhangarwala.id)).toEqual([`user:${bhangarwala.id}`]);
  });
});

describe('emitter reaches only the intended rooms', () => {
  it('emitToUser reaches only that user, with the payload intact', async () => {
    const [a, b] = [await seedPerson(), await seedPerson()];
    const [sa, sb] = [await t.connectAs(a), await t.connectAs(b)];

    const got = waitFor(sa, 'quote:new');
    const none = expectNoEvent(sb, 'quote:new');
    emitter.emitToUser(a.id, 'quote:new', { requestId: 'r1', price: 150 });

    expect(await got).toEqual({ requestId: 'r1', price: 150 });
    await none;
  });

  it('emitToUsers reaches each listed user and nobody else', async () => {
    const [a, b, c] = [await seedBhangarwala(), await seedBhangarwala(), await seedBhangarwala()];
    const [sa, sb, sc] = [await t.connectAs(a), await t.connectAs(b), await t.connectAs(c)];

    const gots = [waitFor(sa, 'request:new'), waitFor(sb, 'request:new')];
    const none = expectNoEvent(sc, 'request:new');
    emitter.emitToUsers([a.id, b.id], 'request:new', { request: 1 });

    await Promise.all(gots);
    await none;
  });

  it('emitToSociety reaches members of that society only', async () => {
    const society = await seedSociety();
    const member = await seedResident({ societyId: society._id });
    const outsider = await seedResident(); // another society
    const [sm, so] = [await t.connectAs(member), await t.connectAs(outsider)];

    const got = waitFor(sm, 'event:new');
    const none = expectNoEvent(so, 'event:new');
    emitter.emitToSociety(society.id, 'event:new', { event: 'x' });

    expect(await got).toEqual({ event: 'x' });
    await none;
  });

  it('emitToOfficers reaches the CP and Treasurer only', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const treasurer = await seedOfficer({ role: 'treasurer', societyId: society._id });
    const resident = await seedResident({ societyId: society._id });
    const otherCp = await seedOfficer({ role: 'cp' }); // officer of a different society
    const [scp, str, sres, sother] = await Promise.all(
      [cp, treasurer, resident, otherCp].map((u) => t.connectAs(u))
    );

    const gots = [waitFor(scp, 'contract:new'), waitFor(str, 'contract:new')];
    const nones = [expectNoEvent(sres, 'contract:new'), expectNoEvent(sother, 'contract:new')];
    emitter.emitToOfficers(society.id, 'contract:new', { contract: 1 });

    await Promise.all([...gots, ...nones]);
  });

  it('emitToPersons reaches persons but not NGOs or bhangarwalas', async () => {
    const [person, resident, ngo, bhangarwala] = [
      await seedPerson(), await seedResident(), await seedNgo(), await seedBhangarwala(),
    ];
    const [sp, sr, sn, sb] = await Promise.all([person, resident, ngo, bhangarwala].map((u) => t.connectAs(u)));

    const gots = [waitFor(sp, 'event:new'), waitFor(sr, 'event:new')];
    const nones = [expectNoEvent(sn, 'event:new'), expectNoEvent(sb, 'event:new')];
    emitter.emitToPersons('event:new', { event: 'public' });

    await Promise.all([...gots, ...nones]);
  });

  it('reports whether an io instance was attached', () => {
    expect(emitter.emitToUser('x', 'e', {})).toBe(true);
    expect(emitter.getIo()).toBe(t.io);
  });
});

describe('live rooms follow membership changes (syncRooms)', () => {
  it('joining a society gives the open socket the society room without reconnecting', async () => {
    const society = await seedSociety();
    const person = await seedPerson();
    const socket = await t.connectAs(person);

    await request(app).post(`/api/societies/${society.id}/join`).set(authHeader(person)).expect(200);

    const got = waitFor(socket, 'event:new');
    emitter.emitToSociety(society.id, 'event:new', { hello: true });
    expect(await got).toEqual({ hello: true });
  });

  it('registering a society makes the new CP an officer live', async () => {
    const person = await seedPerson();
    const socket = await t.connectAs(person);

    const res = await request(app)
      .post('/api/societies')
      .set(authHeader(person))
      .send({ name: 'Live Society', address: '1 Road', lat: 19.25, lng: 72.99 })
      .expect(201);

    const got = waitFor(socket, 'contract:new');
    emitter.emitToOfficers(res.body.data.society.id, 'contract:new', { contract: 1 });
    await got;
  });

  it('demoting the treasurer removes the officers room but keeps the society room', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const treasurer = await seedOfficer({ role: 'treasurer', societyId: society._id });
    const socket = await t.connectAs(treasurer);

    await request(app)
      .patch(`/api/societies/${society.id}`)
      .set(authHeader(cp))
      .send({ treasurerId: null })
      .expect(200);

    const rooms = await t.roomsOf(treasurer.id);
    expect(rooms).toContain(`society:${society.id}`);
    expect(rooms).not.toContain(`society:${society.id}:officers`);

    const none = expectNoEvent(socket, 'contract:new');
    emitter.emitToOfficers(society.id, 'contract:new', {});
    await none;
  });

  it('appointing a treasurer gives their open socket the officers room', async () => {
    const society = await seedSociety();
    const cp = await seedOfficer({ role: 'cp', societyId: society._id });
    const resident = await seedResident({ societyId: society._id });
    const socket = await t.connectAs(resident);

    await request(app)
      .patch(`/api/societies/${society.id}`)
      .set(authHeader(cp))
      .send({ treasurerId: resident.id })
      .expect(200);

    const got = waitFor(socket, 'contract:new');
    emitter.emitToOfficers(society.id, 'contract:new', {});
    await got;
  });

  it('syncing an unknown user is a harmless no-op', async () => {
    await expect(emitter.syncRooms('64b000000000000000000000')).resolves.toBeUndefined();
  });
});
