/**
 * Socket test helpers: a real HTTP + Socket.IO server on an ephemeral port,
 * authenticated clients, and small event-waiting utilities.
 *
 * The server wraps the same `app` that Supertest uses, so an HTTP request made
 * with supertest(app) triggers real socket emissions to the connected clients.
 */

const http = require('http');
const { io: connect } = require('socket.io-client');
const app = require('../../src/app');
const { attachSockets } = require('../../src/sockets');
const { setIo } = require('../../src/sockets/emitter');
const { signToken } = require('../fixtures');

async function startTestServer() {
  const server = http.createServer(app);
  const io = attachSockets(server);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const clients = new Set();

  /** Connects with an arbitrary handshake `auth` object. Rejects with the connect_error. */
  const connectRaw = (auth) =>
    new Promise((resolve, reject) => {
      const socket = connect(url, {
        auth, transports: ['websocket'], forceNew: true, reconnection: false,
      });
      clients.add(socket);
      socket.once('connect', () => resolve(socket));
      socket.once('connect_error', (err) => {
        socket.close();
        reject(err);
      });
    });

  /** Connects as `user` using a real access token. */
  const connectAs = (user) => connectRaw({ token: signToken(user) });

  /** The rooms a user's (first) live socket sits in, minus its private id room. */
  const roomsOf = async (userId) => {
    const [socket] = await io.in(`user:${userId}`).fetchSockets();
    return [...socket.rooms].filter((r) => r !== socket.id).sort();
  };

  const close = async () => {
    clients.forEach((s) => s.close());
    await new Promise((resolve) => io.close(resolve));
    setIo(null);
  };

  return {
    server, io, url, connectRaw, connectAs, roomsOf, close,
  };
}

/** Resolves with the payload of the next `event`, or rejects after `timeout` ms. */
function waitFor(socket, event, timeout = 2000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      socket.off(event, onEvent);
      reject(new Error(`Timed out waiting for "${event}"`));
    }, timeout);
    function onEvent(payload) {
      clearTimeout(timer);
      resolve(payload);
    }
    socket.once(event, onEvent);
  });
}

/** Resolves if `event` does NOT arrive within `ms`; rejects if it does. */
function expectNoEvent(socket, event, ms = 250) {
  return new Promise((resolve, reject) => {
    const onEvent = (payload) => {
      clearTimeout(timer);
      reject(new Error(`Unexpected "${event}": ${JSON.stringify(payload)}`));
    };
    const timer = setTimeout(() => {
      socket.off(event, onEvent);
      resolve();
    }, ms);
    socket.once(event, onEvent);
  });
}

/** Records every `event` payload into an array (for ordering assertions). */
function record(socket, event) {
  const received = [];
  socket.on(event, (payload) => received.push(payload));
  return received;
}

module.exports = {
  startTestServer, waitFor, expectNoEvent, record,
};
