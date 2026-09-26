/**
 * sockets/index.js — Socket.IO server: JWT handshake + room membership.
 *
 * Client:  io(url, { auth: { token: <access token> } })
 * A missing/invalid/expired token is refused with a connect_error whose
 * message (and data.code) is UNAUTHENTICATED or TOKEN_EXPIRED.
 */

const mongoose = require('mongoose');
const { Server } = require('socket.io');
const env = require('../config/env');
const AppError = require('../lib/AppError');
const { verifyAccessToken } = require('../lib/tokens');
const User = require('../models/User');
const { roomsFor } = require('./rooms');
const { setIo } = require('./emitter');

async function authenticate(socket) {
  const token = socket.handshake.auth && socket.handshake.auth.token;
  if (!token) throw new AppError(401, 'UNAUTHENTICATED', 'Missing token');

  const payload = verifyAccessToken(token);
  const user = mongoose.isValidObjectId(payload.sub) ? await User.findById(payload.sub) : null;
  if (!user) throw new AppError(401, 'UNAUTHENTICATED', 'User no longer exists');

  return user;
}

/** Attaches Socket.IO to an HTTP server and registers it with the emitter. */
function attachSockets(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: env.CORS_ORIGINS.length ? env.CORS_ORIGINS : true },
  });

  io.use(async (socket, next) => {
    try {
      const user = await authenticate(socket);
      socket.data.userId = user.id;
      socket.data.rooms = roomsFor(user);
      next();
    } catch (err) {
      const code = err instanceof AppError ? err.code : 'UNAUTHENTICATED';
      const refusal = new Error(code);
      refusal.data = { code };
      next(refusal);
    }
  });

  // Joined synchronously so rooms exist before the client sees "connect".
  io.on('connection', (socket) => {
    socket.join(socket.data.rooms);
  });

  setIo(io);
  return io;
}

module.exports = { attachSockets };
