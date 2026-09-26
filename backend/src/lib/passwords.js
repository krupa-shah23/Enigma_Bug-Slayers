/** bcrypt password hashing. Low cost under test to keep the suite fast. */

const bcrypt = require('bcryptjs');
const env = require('../config/env');

const ROUNDS = env.NODE_ENV === 'test' ? 4 : 10;

const hashPassword = (plain) => bcrypt.hash(plain, ROUNDS);
const comparePassword = (plain, hash) => bcrypt.compare(plain, hash);

module.exports = { hashPassword, comparePassword, ROUNDS };
