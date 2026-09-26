/**
 * setup.js — runs via setupFilesAfterEnv before every test file.
 *
 * Lifecycle per test file:
 *   beforeAll  → spin up MongoMemoryServer, connect Mongoose
 *   afterEach  → wipe every collection (test isolation)
 *   afterAll   → disconnect Mongoose, stop the memory server
 *
 * Works correctly whether Jest runs files in parallel workers
 * or sequentially (--runInBand), because each file gets its own
 * Mongoose connection to its own in-memory instance.
 */

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  // Disconnect any leftover connection (relevant in --runInBand mode)
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(uri);
}, 60000); // generous timeout — binary download on CI can be slow

afterEach(async () => {
  // Clear every collection so tests never bleed into each other
  const { collections } = mongoose.connection;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
}, 30000);
