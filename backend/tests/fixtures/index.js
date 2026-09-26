/**
 * fixtures/index.js — seed helpers for integration tests.
 * Every seeder creates real documents in the in-memory DB and returns the
 * Mongoose document. Anything not overridden gets a sensible default.
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  User, Society, Contract, P2PRequest,
} = require('../../src/models');

const DEFAULT_PASSWORD = 'Password123!';
// Hash once (cost 4 keeps the suite fast); every seeded user shares it.
const PASSWORD_HASH = bcrypt.hashSync(DEFAULT_PASSWORD, 4);

const MUMBAI = { lat: 19.076, lng: 72.8777 };

let counter = 0;
const next = () => {
  counter += 1;
  return counter;
};

function baseUser(role, overrides) {
  const n = next();
  return {
    name: `${role} ${n}`,
    email: `${role}${n}@test.com`,
    passwordHash: PASSWORD_HASH,
    phone: `90000${String(n).padStart(5, '0')}`,
    role,
    ...overrides,
  };
}

/** A plain person with no society. (lat/lng are accepted and ignored.) */
async function seedPerson(overrides = {}) {
  const { lat: _lat, lng: _lng, ...rest } = overrides;
  return User.create(baseUser('person', rest));
}

/**
 * A society. Creates its CP (a person) unless `cpId` is given,
 * and links the CP to the society.
 */
async function seedSociety(overrides = {}) {
  const n = next();
  let { cpId } = overrides;
  if (!cpId) cpId = (await seedPerson())._id;

  const society = await Society.create({
    name: `Society ${n}`,
    address: `${n} Green Street`,
    // spread societies ~1 km apart so they never trip the duplicate check
    location: { lat: MUMBAI.lat + n * 0.01, lng: MUMBAI.lng },
    zoneId: 'mumbai',
    collectionFrequency: 'monthly',
    nextCollectionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    ...overrides,
    cpId,
  });

  await User.updateOne(
    { _id: cpId },
    { societyId: society._id, societyRole: 'cp' }
  );
  return society;
}

/** A resident belonging to `societyId` (a new society is created if omitted). */
async function seedResident(overrides = {}) {
  const societyId = overrides.societyId || (await seedSociety())._id;
  return User.create(baseUser('person', { societyRole: 'resident', ...overrides, societyId }));
}

/**
 * A society officer. role 'cp' returns the society's CP;
 * role 'treasurer' creates a treasurer and links it to the society.
 */
async function seedOfficer({ role = 'cp', societyId, ...overrides } = {}) {
  const society = societyId ? await Society.findById(societyId) : await seedSociety();

  if (role === 'cp') {
    return User.findById(society.cpId);
  }

  const treasurer = await User.create(
    baseUser('person', { ...overrides, societyId: society._id, societyRole: 'treasurer' })
  );
  await Society.updateOne({ _id: society._id }, { treasurerId: treasurer._id });
  return treasurer;
}

/** An NGO. `verified: true` -> verificationStatus 'approved', otherwise 'none'. */
async function seedNgo({ verified = false, ...overrides } = {}) {
  const n = next();
  return User.create(
    baseUser('ngo', {
      ngo: {
        orgName: `NGO ${n}`,
        verificationStatus: verified ? 'approved' : 'none',
      },
      ...overrides,
    })
  );
}

/**
 * A bhangarwala. When lat/lng are given the location is set and the
 * account is online (pinged just now) unless overridden.
 */
async function seedBhangarwala({
  lat, lng, isOnline = true, locationUpdatedAt, ...overrides
} = {}) {
  const hasLocation = lat !== undefined && lng !== undefined;
  return User.create(
    baseUser('bhangarwala', {
      bhangarwala: {
        ...(hasLocation && { location: { lat, lng }, locationUpdatedAt: locationUpdatedAt || new Date() }),
        isOnline,
        vehicleType: 'cycle',
      },
      ...overrides,
    })
  );
}

/** A contract between a verified NGO and a society (both created if not given). */
async function seedContract({ status = 'offered', ...overrides } = {}) {
  const ngoId = overrides.ngoId || (await seedNgo({ verified: true }))._id;
  const societyId = overrides.societyId || (await seedSociety())._id;
  return Contract.create({
    materialType: 'plastic',
    quantityKg: 100,
    ratePerKg: 12,
    ...overrides,
    ngoId,
    societyId,
    status,
    ...(status === 'active' && { acceptedAt: new Date() }),
  });
}

/** An open P2P request. `notified` is the list of notified bhangarwala ids. */
async function seedP2PRequest({ notified = [], ...overrides } = {}) {
  const personId = overrides.personId || (await seedPerson())._id;
  return P2PRequest.create({
    photoUrl: '/uploads/test.png',
    description: 'Old newspapers',
    category: 'paper',
    location: MUMBAI,
    ...overrides,
    personId,
    notifiedBhangarwalaIds: notified,
  });
}

/** Signs a 15-minute access token for `user` (same shape the auth routes issue). */
function signToken(user, options = { expiresIn: '15m' }) {
  return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, options);
}

/** Supertest header object: `.set(authHeader(user))`. */
function authHeader(user) {
  return { Authorization: `Bearer ${signToken(user)}` };
}

module.exports = {
  DEFAULT_PASSWORD,
  seedPerson,
  seedResident,
  seedSociety,
  seedOfficer,
  seedNgo,
  seedBhangarwala,
  seedContract,
  seedP2PRequest,
  signToken,
  authHeader,
};
