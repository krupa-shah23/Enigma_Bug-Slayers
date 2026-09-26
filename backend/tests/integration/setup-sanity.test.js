/**
 * setup-sanity.test.js
 *
 * Verifies that tests/setup.js works correctly:
 *   1. The in-memory DB is connected and writable.
 *   2. afterEach actually clears the collection (test isolation).
 */

const mongoose = require('mongoose');

// Inline schema — no real model needed yet
const schema = new mongoose.Schema({ value: String });
let TestModel;

beforeAll(() => {
  // Guard against model re-registration across --runInBand runs
  TestModel =
    mongoose.models.SetupSanity || mongoose.model('SetupSanity', schema);
});

describe('In-memory DB: write and read', () => {
  it('can create and retrieve a document', async () => {
    const doc = await TestModel.create({ value: 'hello' });
    const found = await TestModel.findById(doc._id);
    expect(found.value).toBe('hello');
  });

  it('collection is empty after the previous test (afterEach cleaned it up)', async () => {
    const count = await TestModel.countDocuments();
    expect(count).toBe(0);
  });
});
