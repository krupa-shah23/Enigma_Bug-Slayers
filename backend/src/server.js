/**
 * server.js — HTTP server entry point.
 *
 * Connects Mongoose, creates the HTTP server, attaches Socket.IO,
 * and calls listen. This file is NOT imported by Supertest tests;
 * tests import app.js directly.
 */

require('dotenv').config();

const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/waste-exchange';

const server = http.createServer(app);

// Socket.IO is attached in Step 9 (sockets/index.js)
// const { attachSockets } = require('./sockets');
// attachSockets(server);

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
