/**
 * tokens.js — JWT issuing/verification and refresh-token storage.
 *
 * Access token:  15 min, payload { sub, role }, signed with JWT_SECRET.
 * Refresh token: 7 days, payload { sub, role, jti }, signed with JWT_REFRESH_SECRET.
 *   Stored on the user as a bcrypt hash, rotated on every refresh, cleared on logout.
 *
 * bcrypt only reads the first 72 bytes, and every JWT for a user shares the same
 * first ~70, so we hash a SHA-256 digest of the token instead of the raw token.
 */

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('../config/env');
const AppError = require('./AppError');
const { ROUNDS } = require('./passwords');
const User = require('../models/User');

const ACCESS_TTL = '15m';
const REFRESH_TTL = '7d';

const signAccessToken = (user) =>
  jwt.sign({ sub: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: ACCESS_TTL });

const signRefreshToken = (user) =>
  jwt.sign({ sub: user.id, role: user.role, jti: crypto.randomUUID() }, env.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TTL,
  });

function verify(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AppError(401, 'TOKEN_EXPIRED', 'Token has expired');
    }
    throw new AppError(401, 'UNAUTHENTICATED', 'Invalid token');
  }
}

const verifyAccessToken = (token) => verify(token, env.JWT_SECRET);
const verifyRefreshToken = (token) => verify(token, env.JWT_REFRESH_SECRET);

const digest = (token) => crypto.createHash('sha256').update(token).digest('hex');
const hashRefreshToken = (token) => bcrypt.hash(digest(token), ROUNDS);
const compareRefreshToken = (token, hash) => bcrypt.compare(digest(token), hash);

/** Issues a fresh token pair and stores the refresh token's hash on the user. */
async function issueTokens(user) {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  await User.updateOne({ _id: user._id }, { refreshTokenHash: await hashRefreshToken(refreshToken) });
  return { accessToken, refreshToken };
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  compareRefreshToken,
  issueTokens,
};
