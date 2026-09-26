/**
 * emitter.js — the only way routes talk to Socket.IO.
 *
 * Routes call these helpers and never touch `io` directly. Until an `io`
 * instance is attached (see sockets/index.js) every helper is a no-op, so
 * HTTP-only tests and scripts need no socket server.
 */

const User = require('../models/User');
const {
  PERSONS_ROOM, userRoom, societyRoom, officersRoom, roomsFor,
} = require('./rooms');

let io = null;

const setIo = (instance) => { io = instance; };
const getIo = () => io;

function emitTo(rooms, event, payload) {
  if (!io) return false;
  io.to(rooms).emit(event, payload);
  return true;
}

const emitToUser = (userId, event, payload) => emitTo(userRoom(userId), event, payload);
const emitToUsers = (userIds, event, payload) => emitTo(userIds.map(userRoom), event, payload);
const emitToSociety = (societyId, event, payload) => emitTo(societyRoom(societyId), event, payload);
const emitToOfficers = (societyId, event, payload) => emitTo(officersRoom(societyId), event, payload);
const emitToPersons = (event, payload) => emitTo(PERSONS_ROOM, event, payload);

/**
 * Re-syncs a user's live sockets with their current society membership.
 * Call after anything that changes societyId / societyRole (register, join,
 * appoint/demote treasurer) so open sessions get the right rooms immediately.
 */
async function syncRooms(userId) {
  if (!io) return;
  const user = await User.findById(userId);
  if (!user) return;

  const target = new Set(roomsFor(user));
  const sockets = await io.in(userRoom(userId)).fetchSockets();

  sockets.forEach((socket) => {
    socket.rooms.forEach((room) => {
      if (room !== socket.id && !target.has(room)) socket.leave(room);
    });
    socket.join([...target]);
  });
}

module.exports = {
  setIo,
  getIo,
  emitToUser,
  emitToUsers,
  emitToSociety,
  emitToOfficers,
  emitToPersons,
  syncRooms,
};
