/**
 * contracts.js — shared helpers for contract / collection views and access checks.
 */

const { OFFICER_ROLES } = require('../config/constants');

const round3 = (n) => Math.round(n * 1000) / 1000;

/** Compact view of one collection (used in contract lists and history). */
const collectionSummary = (c) => ({
  id: c.id,
  promisedKg: c.promisedKg,
  actualKg: c.actualKg,
  shortfallKg: Math.max(0, round3(c.promisedKg - c.actualKg)),
  flagged: c.flagged,
  paymentStatus: c.paymentStatus,
  collectedAt: c.collectedAt,
});

/** True for the CP/Treasurer of `societyId`. */
const isOfficerOf = (user, societyId) =>
  Boolean(user.societyId)
  && user.societyId.equals(societyId)
  && OFFICER_ROLES.includes(user.societyRole);

/** True for the NGO that owns `contract`. */
const isOwnerNgo = (user, contract) => user.role === 'ngo' && contract.ngoId.equals(user._id);

module.exports = {
  round3, collectionSummary, isOfficerOf, isOwnerNgo,
};
