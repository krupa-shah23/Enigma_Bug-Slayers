/**
 * rooms.js — Socket.IO room naming and membership rules.
 *
 *   user:<id>               every authenticated user
 *   society:<id>            members of that society
 *   society:<id>:officers   the society's CP / Treasurer
 *   persons                 every user with role "person" (public NGO events, S11)
 */

const { OFFICER_ROLES } = require('../config/constants');

const PERSONS_ROOM = 'persons';
const userRoom = (id) => `user:${id}`;
const societyRoom = (id) => `society:${id}`;
const officersRoom = (id) => `society:${id}:officers`;

/** Every room a user belongs in, given their current role and society. */
function roomsFor(user) {
  const rooms = [userRoom(user.id)];
  if (user.role === 'person') rooms.push(PERSONS_ROOM);
  if (user.societyId) {
    rooms.push(societyRoom(user.societyId));
    if (OFFICER_ROLES.includes(user.societyRole)) rooms.push(officersRoom(user.societyId));
  }
  return rooms;
}

module.exports = {
  PERSONS_ROOM, userRoom, societyRoom, officersRoom, roomsFor,
};
