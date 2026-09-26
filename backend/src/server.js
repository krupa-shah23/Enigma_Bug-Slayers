/**
 * server.js — HTTP server entry point.
 *
 * Connects Mongoose, creates the HTTP server, attaches Socket.IO,
 * and calls listen. This file is NOT imported by Supertest tests;
 * tests import app.js directly.
 */

const http = require('http');
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require('./config/env');
const app = require('./app');
const { attachSockets } = require('./sockets');

const server = http.createServer(app);

attachSockets(server);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = server;
