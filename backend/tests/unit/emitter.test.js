/**
 * With no Socket.IO server attached the emitter must be a harmless no-op
 * (HTTP-only tests and scripts rely on this).
 */

const emitter = require('../../src/sockets/emitter');
const { roomsFor } = require('../../src/sockets/rooms');

describe('emitter without an io instance', () => {
  it('every emit helper returns false and does not throw', () => {
    expect(emitter.getIo()).toBeNull();
    expect(emitter.emitToUser('u1', 'e', {})).toBe(false);
    expect(emitter.emitToUsers(['u1', 'u2'], 'e', {})).toBe(false);
    expect(emitter.emitToSociety('s1', 'e', {})).toBe(false);
    expect(emitter.emitToOfficers('s1', 'e', {})).toBe(false);
    expect(emitter.emitToPersons('e', {})).toBe(false);
  });

  it('syncRooms resolves without touching the database', async () => {
    await expect(emitter.syncRooms('anything')).resolves.toBeUndefined();
  });
});

describe('roomsFor', () => {
  const base = { id: 'u1', societyId: null };

  it('everyone gets a user room; only persons join "persons"', () => {
    expect(roomsFor({ ...base, role: 'person' })).toEqual(['user:u1', 'persons']);
    expect(roomsFor({ ...base, role: 'ngo' })).toEqual(['user:u1']);
    expect(roomsFor({ ...base, role: 'bhangarwala' })).toEqual(['user:u1']);
  });

  it('society members get the society room; officers also get the officers room', () => {
    const resident = { ...base, role: 'person', societyId: 's1', societyRole: 'resident' };
    expect(roomsFor(resident)).toEqual(['user:u1', 'persons', 'society:s1']);
    expect(roomsFor({ ...resident, societyRole: 'cp' })).toContain('society:s1:officers');
    expect(roomsFor({ ...resident, societyRole: 'treasurer' })).toContain('society:s1:officers');
  });
});
