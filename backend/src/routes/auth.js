/**
 * routes/auth.js — E01 signup, E02 login, E03 logout, E04 me, E05 refresh-token.
 */

const express = require('express');
const Joi = require('joi');
const AppError = require('../lib/AppError');
const asyncHandler = require('../lib/asyncHandler');
const { ok } = require('../lib/response');
const { hashPassword, comparePassword } = require('../lib/passwords');
const { issueTokens, verifyRefreshToken, compareRefreshToken } = require('../lib/tokens');
const validate = require('../middleware/validate');
const { auth } = require('../middleware/auth');
const { ROLES } = require('../config/constants');
const User = require('../models/User');

const router = express.Router();

const email = Joi.string().email({ tlds: { allow: false } }).lowercase().trim();

const signupSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  email: email.required(),
  password: Joi.string().min(8).max(128).required(),
  phone: Joi.string().trim().min(5).max(20).required(),
  role: Joi.string().valid(...ROLES).required(),
});

const loginSchema = Joi.object({
  email: email.required(),
  password: Joi.string().required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

// E01 — POST /api/auth/signup (public)
router.post(
  '/signup',
  validate({ body: signupSchema }),
  asyncHandler(async (req, res) => {
    const { name, email: addr, password, phone, role } = req.body;

    if (await User.exists({ email: addr })) {
      throw new AppError(409, 'EMAIL_TAKEN', 'Email is already registered');
    }

    const doc = { name, email: addr, phone, role, passwordHash: await hashPassword(password) };
    if (role === 'ngo') doc.ngo = { verificationStatus: 'none' };
    if (role === 'bhangarwala') doc.bhangarwala = { isOnline: false };

    const user = await User.create(doc);
    const tokens = await issueTokens(user);
    return ok(res, { user, ...tokens }, 201);
  })
);

// E02 — POST /api/auth/login (public)
router.post(
  '/login',
  validate({ body: loginSchema }),
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const valid = user && (await comparePassword(req.body.password, user.passwordHash));
    if (!valid) throw new AppError(401, 'UNAUTHENTICATED', 'Invalid email or password');

    const tokens = await issueTokens(user);
    return ok(res, { user, ...tokens });
  })
);

// E03 — POST /api/auth/logout (any authenticated): revokes the refresh token
router.post(
  '/logout',
  auth,
  asyncHandler(async (req, res) => {
    await User.updateOne({ _id: req.user._id }, { $unset: { refreshTokenHash: 1 } });
    return ok(res, {});
  })
);

// E04 — GET /api/auth/me (any authenticated)
router.get('/me', auth, (req, res) => ok(res, { user: req.user }));

// E05 — POST /api/auth/refresh-token (refresh-token holder): rotates the pair
router.post(
  '/refresh-token',
  validate({ body: refreshSchema }),
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    const payload = verifyRefreshToken(refreshToken);

    const user = await User.findById(payload.sub);
    const valid =
      user && user.refreshTokenHash && (await compareRefreshToken(refreshToken, user.refreshTokenHash));
    if (!valid) throw new AppError(401, 'UNAUTHENTICATED', 'Refresh token has been revoked');

    const tokens = await issueTokens(user);
    return ok(res, tokens);
  })
);

module.exports = router;
