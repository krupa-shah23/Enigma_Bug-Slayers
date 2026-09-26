const mongoose = require('mongoose');
const {
  User, Society, Contribution, Contract, Collection, Flag, Payment, P2PRequest, Quote, Job, Event,
} = require('../../src/models');

const oid = () => new mongoose.Types.ObjectId();
const expectInvalid = async (doc, path) => {
  await expect(doc.validate()).rejects.toMatchObject({ errors: { [path]: expect.anything() } });
};

beforeAll(async () => {
  // make sure unique indexes exist before the duplicate tests
  await Promise.all(Object.values(mongoose.models).map((m) => m.init()));
});

describe('all 11 models are registered', () => {
  it('exports every model', () => {
    expect(Object.keys(require('../../src/models')).sort()).toEqual(
      ['Collection', 'Contract', 'Contribution', 'Event', 'Flag', 'Job', 'P2PRequest', 'Payment', 'Quote', 'Society', 'User'].sort()
    );
  });
});

describe('User', () => {
  const valid = { name: 'A', email: 'A@Test.com', passwordHash: 'h', role: 'person' };

  it('requires name, email, passwordHash and role', async () => {
    const doc = new User({});
    await Promise.all(['name', 'email', 'passwordHash', 'role'].map((p) => expectInvalid(doc, p)));
  });

  it('rejects an unknown role and unknown societyRole', async () => {
    await expectInvalid(new User({ ...valid, role: 'admin' }), 'role');
    await expectInvalid(new User({ ...valid, societyRole: 'boss' }), 'societyRole');
  });

  it('lowercases the email and defaults feeCreditPaise to 0', async () => {
    const u = await User.create(valid);
    expect(u.email).toBe('a@test.com');
    expect(u.feeCreditPaise).toBe(0);
  });

  it('enforces a unique email', async () => {
    await User.create(valid);
    await expect(User.create({ ...valid, email: 'a@test.com' })).rejects.toMatchObject({ code: 11000 });
  });

  it('ngo defaults to verificationStatus none; other roles have no ngo block', async () => {
    const ngo = await User.create({ ...valid, email: 'n@t.com', role: 'ngo', ngo: { orgName: 'X' } });
    expect(ngo.ngo.verificationStatus).toBe('none');
    const person = await User.create({ ...valid, email: 'p@t.com' });
    expect(person.ngo).toBeUndefined();
    expect(person.bhangarwala).toBeUndefined();
  });

  it('rejects an invalid verificationStatus and out-of-range coordinates', async () => {
    await expectInvalid(
      new User({ ...valid, role: 'ngo', ngo: { verificationStatus: 'maybe' } }),
      'ngo.verificationStatus'
    );
    await expectInvalid(
      new User({ ...valid, role: 'bhangarwala', bhangarwala: { location: { lat: 91, lng: 0 } } }),
      'bhangarwala.location.lat'
    );
  });

  it('toJSON exposes id and hides _id, __v, passwordHash and refreshTokenHash', async () => {
    const u = await User.create({ ...valid, refreshTokenHash: 'r' });
    const json = u.toJSON();
    expect(json.id).toBe(u._id.toString());
    ['_id', '__v', 'passwordHash', 'refreshTokenHash'].forEach((k) => expect(json).not.toHaveProperty(k));
    expect(JSON.stringify(u)).not.toContain('passwordHash');
  });
});

describe('Society', () => {
  const valid = () => ({ name: 'S', location: { lat: 19, lng: 72 }, cpId: oid() });

  it('requires name, location and cpId', async () => {
    const doc = new Society({});
    await Promise.all(['name', 'location', 'cpId'].map((p) => expectInvalid(doc, p)));
  });

  it('has the documented defaults', () => {
    const s = new Society(valid());
    expect(s.collectionFrequency).toBe('monthly');
    expect(s.trustScore).toBeNull();
    expect(s.feeReductionTotalPaise).toBe(0);
    expect(s.unallocatedPaise).toBe(0);
    expect(s.festivalSchedule).toBeUndefined();
  });

  it('rejects a bad frequency and a trust score above 100', async () => {
    await expectInvalid(new Society({ ...valid(), collectionFrequency: 'daily' }), 'collectionFrequency');
    await expectInvalid(new Society({ ...valid(), trustScore: 101 }), 'trustScore');
  });

  it('festivalSchedule.decision defaults to pending and validates the enum', async () => {
    const s = new Society({ ...valid(), festivalSchedule: { festivalName: 'Diwali' } });
    expect(s.festivalSchedule.decision).toBe('pending');
    await expectInvalid(
      new Society({ ...valid(), festivalSchedule: { decision: 'nope' } }),
      'festivalSchedule.decision'
    );
  });
});

describe('Contribution', () => {
  const valid = () => ({ userId: oid(), societyId: oid(), category: 'plastic', weightKg: 5 });

  it('requires its fields', async () => {
    const doc = new Contribution({});
    await Promise.all(['userId', 'societyId', 'category', 'weightKg'].map((p) => expectInvalid(doc, p)));
  });

  it.each([0, -1, 501])('rejects weightKg %p', async (w) => {
    await expectInvalid(new Contribution({ ...valid(), weightKg: w }), 'weightKg');
  });

  it('accepts the boundary 500 and rejects a bad category', async () => {
    await expect(new Contribution({ ...valid(), weightKg: 500 }).validate()).resolves.toBeUndefined();
    await expectInvalid(new Contribution({ ...valid(), category: 'gold' }), 'category');
  });

  it('defaults loggedAt to now', () => {
    expect(new Contribution(valid()).loggedAt).toBeInstanceOf(Date);
  });
});

describe('Contract', () => {
  const valid = () => ({ ngoId: oid(), societyId: oid(), materialType: 'paper', quantityKg: 50, ratePerKg: 10 });

  it('defaults status to offered and validates enums', async () => {
    expect(new Contract(valid()).status).toBe('offered');
    await expectInvalid(new Contract({ ...valid(), status: 'paused' }), 'status');
    await expectInvalid(new Contract({ ...valid(), materialType: 'gold' }), 'materialType');
  });

  it('requires its fields and rejects negative numbers', async () => {
    const doc = new Contract({});
    await Promise.all(['ngoId', 'societyId', 'materialType', 'quantityKg', 'ratePerKg'].map((p) => expectInvalid(doc, p)));
    await expectInvalid(new Contract({ ...valid(), ratePerKg: -1 }), 'ratePerKg');
  });
});

describe('Collection', () => {
  const valid = () => ({
    contractId: oid(), societyId: oid(), ngoId: oid(), category: 'paper',
    windowStart: new Date(), windowEnd: new Date(), promisedKg: 10, actualKg: 8,
  });

  it('defaults flagged=false and paymentStatus=unpaid; validates enum', async () => {
    const c = new Collection(valid());
    expect(c.flagged).toBe(false);
    expect(c.paymentStatus).toBe('unpaid');
    await expectInvalid(new Collection({ ...valid(), paymentStatus: 'refunded' }), 'paymentStatus');
  });

  it('requires its fields', async () => {
    const doc = new Collection({});
    await Promise.all(
      ['contractId', 'societyId', 'ngoId', 'category', 'windowStart', 'windowEnd', 'promisedKg', 'actualKg']
        .map((p) => expectInvalid(doc, p))
    );
  });
});

describe('Flag', () => {
  it('requires its fields', async () => {
    const doc = new Flag({});
    await Promise.all(
      ['societyId', 'contractId', 'collectionId', 'promisedKg', 'actualKg', 'shortfallKg'].map((p) => expectInvalid(doc, p))
    );
  });
});

describe('Payment', () => {
  const valid = () => ({
    contractId: oid(), collectionId: oid(), ngoId: oid(), societyId: oid(), amountPaise: 1000,
  });

  it('defaults mode simulated, status completed, empty splits', () => {
    const p = new Payment(valid());
    expect([p.mode, p.status, p.unallocatedPaise]).toEqual(['simulated', 'completed', 0]);
    expect(p.splits).toHaveLength(0);
  });

  it('validates mode and split shape', async () => {
    await expectInvalid(new Payment({ ...valid(), mode: 'cash' }), 'mode');
    await expectInvalid(new Payment({ ...valid(), splits: [{ userId: oid(), weightKg: 1 }] }), 'splits.0.sharePaise');
  });

  it('allows only one payment per collection', async () => {
    const data = valid();
    await Payment.create(data);
    await expect(Payment.create({ ...valid(), collectionId: data.collectionId })).rejects.toMatchObject({ code: 11000 });
  });
});

describe('P2PRequest', () => {
  const valid = () => ({
    personId: oid(), photoUrl: '/u/x.png', category: 'metal', location: { lat: 19, lng: 72 },
  });

  it('defaults to open with no notified bhangarwalas', () => {
    const r = new P2PRequest(valid());
    expect(r.status).toBe('open');
    expect(r.notifiedBhangarwalaIds).toHaveLength(0);
  });

  it('requires personId, photoUrl, category and location', async () => {
    const doc = new P2PRequest({});
    await Promise.all(['personId', 'photoUrl', 'category', 'location'].map((p) => expectInvalid(doc, p)));
    await expectInvalid(new P2PRequest({ ...valid(), status: 'cancelled' }), 'status');
  });
});

describe('Quote', () => {
  const valid = () => ({ requestId: oid(), bhangarwalaId: oid(), price: 100, distanceKm: 1, etaMinutes: 5 });

  it('defaults to pending and rejects price <= 0', async () => {
    expect(new Quote(valid()).status).toBe('pending');
    await expectInvalid(new Quote({ ...valid(), price: 0 }), 'price');
  });

  it('enforces one quote per (request, bhangarwala)', async () => {
    const data = valid();
    await Quote.create(data);
    await expect(Quote.create(data)).rejects.toMatchObject({ code: 11000 });
    await expect(Quote.create({ ...data, bhangarwalaId: oid() })).resolves.toBeDefined();
  });
});

describe('Job', () => {
  const valid = () => ({ requestId: oid(), quoteId: oid(), personId: oid(), bhangarwalaId: oid(), price: 150 });

  it('starts assigned with an initial history entry', async () => {
    const job = await Job.create(valid());
    expect(job.status).toBe('assigned');
    expect(job.statusHistory.map((h) => h.status)).toEqual(['assigned']);
  });

  it('does not re-seed history on later saves', async () => {
    const job = await Job.create(valid());
    job.status = 'heading';
    job.statusHistory.push({ status: 'heading' });
    await job.save();
    expect((await Job.findById(job._id)).statusHistory).toHaveLength(2);
  });

  it('rejects an invalid status and allows only one job per request', async () => {
    await expectInvalid(new Job({ ...valid(), status: 'lost' }), 'status');
    const data = valid();
    await Job.create(data);
    await expect(Job.create({ ...valid(), requestId: data.requestId })).rejects.toMatchObject({ code: 11000 });
  });
});

describe('Event', () => {
  const valid = () => ({
    creatorId: oid(), creatorRole: 'cp', title: 'Drive', type: 'drive', date: new Date(),
  });

  it('defaults to active with no society and no rsvps', () => {
    const e = new Event(valid());
    expect(e.status).toBe('active');
    expect(e.societyId).toBeNull();
    expect(e.rsvps).toHaveLength(0);
  });

  it('validates required fields and enums', async () => {
    const doc = new Event({});
    await Promise.all(['creatorId', 'creatorRole', 'title', 'type', 'date'].map((p) => expectInvalid(doc, p)));
    await expectInvalid(new Event({ ...valid(), type: 'party' }), 'type');
    await expectInvalid(new Event({ ...valid(), creatorRole: 'person' }), 'creatorRole');
  });
});
