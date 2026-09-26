/**
 * auth.js — authentication and role-based access middleware.
 *
 * JWT roles are person / ngo / bhangarwala. Society roles (cp / treasurer)
 * live on user.societyRole and are checked per society by the helpers below.
 */

const mongoose = require('mongoose');
const AppError = require('../lib/AppError');
const asyncHandler = require('../lib/asyncHandler');
const { verifyAccessToken } = require('../lib/tokens');
const { OFFICER_ROLES } = require('../config/constants');
const User = require('../models/User');

/** Verifies the Bearer token and loads the fresh user into req.user. */
const auth = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    throw new AppError(401, 'UNAUTHENTICATED', 'Missing or malformed Authorization header');
  }

  const payload = verifyAccessToken(token);
  const user = mongoose.isValidObjectId(payload.sub) ? await User.findById(payload.sub) : null;
  if (!user) throw new AppError(401, 'UNAUTHENTICATED', 'User no longer exists');

  req.user = user;
  next();
});

/** 403 FORBIDDEN unless the user's JWT role is one of `roles`. */
const requireRole = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new AppError(403, 'FORBIDDEN', 'You do not have access to this resource'));
  }
  return next();
};

const isMemberOf = (user, societyId) =>
  Boolean(user.societyId) && user.societyId.toString() === String(societyId);

/** 403 NOT_SOCIETY_MEMBER unless user.societyId matches :societyId. */
const requireSocietyMember = (req, _res, next) => {
  if (!isMemberOf(req.user, req.params.societyId)) {
    return next(new AppError(403, 'NOT_SOCIETY_MEMBER', 'You are not a member of this society'));
  }
  return next();
};

/** 403 NOT_SOCIETY_OFFICER unless a member of :societyId who is its CP or Treasurer. */
const requireSocietyOfficer = (req, _res, next) => {
  const { user } = req;
  if (!isMemberOf(user, req.params.societyId) || !OFFICER_ROLES.includes(user.societyRole)) {
    return next(new AppError(403, 'NOT_SOCIETY_OFFICER', 'Only the CP or Treasurer can do this'));
  }
  return next();
};

/** 403 NGO_NOT_VERIFIED unless an NGO whose verification is approved. */
const requireVerifiedNgo = (req, _res, next) => {
  const { user } = req;
  if (user.role !== 'ngo' || !user.ngo || user.ngo.verificationStatus !== 'approved') {
    return next(new AppError(403, 'NGO_NOT_VERIFIED', 'Your NGO has not been verified yet'));
  }
  return next();
};

module.exports = {
  auth,
  requireRole,
  requireSocietyMember,
  requireSocietyOfficer,
  requireVerifiedNgo,
};
