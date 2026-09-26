/**
 * setup.js — runs via setupFilesAfterEnv before every test file.
 *
 * Lifecycle per test file:
 *   beforeAll  → spin up an in-memory MongoDB *replica set*, connect Mongoose
 *   afterEach  → wipe every collection (test isolation)
 *   afterAll   → disconnect Mongoose, stop the memory server
 *
 * A replica set (rather than a standalone server) is required so that
 * multi-document transactions work (P2P select-quote, payments).
 * Each file gets its own instance, so parallel workers never share data.
 */

const { MongoMemoryReplSet } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
  const uri = mongod.getUri();

  // Disconnect any leftover connection (relevant in --runInBand mode)
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(uri);

  // Build indexes up front so unique constraints are enforced from the first test
  await Promise.all(Object.values(mongoose.models).map((m) => m.init()));
}, 90000); // generous timeout — replica-set start and binary download can be slow

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
