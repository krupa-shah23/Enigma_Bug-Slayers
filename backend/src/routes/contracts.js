/**
 * routes/contracts.js — contracts, month-end collections, flags and trust.
 *   E38 offer a contract      E40 contract detail     E41 edit / cancel / complete
 *   E42 log a collection      E43 collection history
 * (E39, the NGO's contract list, lives in routes/ngo.js.)
 */

const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const AppError = require('../lib/AppError');
const asyncHandler = require('../lib/asyncHandler');
const { ok } = require('../lib/response');
const validate = require('../middleware/validate');
const { auth, requireRole, requireVerifiedNgo } = require('../middleware/auth');
const { CATEGORIES } = require('../config/constants');
const { currentCycle } = require('../services/aggregate');
const { isFlagged, trustScore } = require('../services/trust');
const {
  round3, collectionSummary, isOfficerOf, isOwnerNgo,
} = require('../lib/contracts');
const { emitToUser, emitToOfficers } = require('../sockets/emitter');
const {
  Society, Contract, Collection, Flag,
} = require('../models');

const router = express.Router();

const objectId = Joi.string().hex().length(24);

const createSchema = Joi.object({
  societyId: objectId.required(),
  materialType: Joi.string().valid(...CATEGORIES).required(),
  quantityKg: Joi.number().greater(0).max(1_000_000).required(),
  ratePerKg: Joi.number().greater(0).max(100_000).required(),
});

// Either edit terms (only while offered) or change status — never both at once.
const patchSchema = Joi.object({
  quantityKg: Joi.number().greater(0).max(1_000_000),
  ratePerKg: Joi.number().greater(0).max(100_000),
  status: Joi.string().valid('cancelled', 'completed'),
}).min(1).without('status', ['quantityKg', 'ratePerKg']);

const collectionSchema = Joi.object({ actualKg: Joi.number().min(0).max(10_000_000).required() });

// Which current statuses each requested status may come from
const ALLOWED_FROM = { cancelled: ['offered', 'active'], completed: ['active'] };

const notFound = (what) => new AppError(404, 'NOT_FOUND', `${what} not found`);

async function loadContract(id) {
  const contract = mongoose.isValidObjectId(id) ? await Contract.findById(id) : null;
  if (!contract) throw notFound('Contract');
  return contract;
}

/** Loads a contract for its owning NGO or the target society's officers (403 otherwise). */
async function loadReadableContract(id, user) {
  const contract = await loadContract(id);
  if (!isOwnerNgo(user, contract) && !isOfficerOf(user, contract.societyId)) {
    throw new AppError(403, 'FORBIDDEN', 'You do not have access to this contract');
  }
  return contract;
}

/** Loads a contract owned by the calling NGO (403 for anyone else). */
async function loadOwnedContract(id, user) {
  const contract = await loadContract(id);
  if (!isOwnerNgo(user, contract)) {
    throw new AppError(403, 'FORBIDDEN', 'This contract belongs to another NGO');
  }
  return contract;
}

// ── E38 · POST /api/contracts ─────────────────────────────────────────────────
router.post(
  '/',
  auth,
  requireVerifiedNgo,
  validate({ body: createSchema }),
  asyncHandler(async (req, res) => {
    const society = await Society.findById(req.body.societyId);
    if (!society) throw notFound('Society');

    const contract = await Contract.create({ ...req.body, ngoId: req.user._id, status: 'offered' });

    // S07 — the society's officers see the offer live
    emitToOfficers(society.id, 'contract:new', {
      contract: {
        ...contract.toJSON(),
        ngo: { id: req.user.id, name: req.user.name, orgName: req.user.ngo.orgName },
      },
    });
    return ok(res, { contract }, 201);
  })
);

// ── E40 · GET /api/contracts/:contractId ──────────────────────────────────────
router.get(
  '/:contractId',
  auth,
  asyncHandler(async (req, res) => {
    const contract = await loadReadableContract(req.params.contractId, req.user);

    const [society, cycle, collections] = await Promise.all([
      Society.findById(contract.societyId).select('name'),
      currentCycle(contract.societyId),
      Collection.find({ contractId: contract._id }).sort({ collectedAt: -1 }),
    ]);
    const promised = cycle.byCategory.find((b) => b.category === contract.materialType);

    return ok(res, {
      contract,
      society: { id: society.id, name: society.name },
      promisedKg: promised.totalKg, // live: contributions since the last collection of this material
      collections: {
        count: collections.length,
        flaggedCount: collections.filter((c) => c.flagged).length,
        totalActualKg: round3(collections.reduce((sum, c) => sum + c.actualKg, 0)),
        latest: collections.length ? collectionSummary(collections[0]) : null,
      },
    });
  })
);

// ── E41 · PATCH /api/contracts/:contractId ────────────────────────────────────
router.patch(
  '/:contractId',
  auth,
  requireRole('ngo'),
  validate({ body: patchSchema }),
  asyncHandler(async (req, res) => {
    const contract = await loadOwnedContract(req.params.contractId, req.user);
    const { status, quantityKg, ratePerKg } = req.body;

    // Conditional updates: the status check and the write are one atomic step
    const filter = status
      ? { _id: contract._id, status: { $in: ALLOWED_FROM[status] } }
      : { _id: contract._id, status: 'offered' }; // terms are editable only while offered
    const change = status ? { status } : { quantityKg, ratePerKg };
    Object.keys(change).forEach((k) => change[k] === undefined && delete change[k]);

    const updated = await Contract.findOneAndUpdate(filter, change, { new: true });
    if (!updated) {
      throw new AppError(
        409,
        'CONTRACT_NOT_EDITABLE',
        status
          ? `A ${contract.status} contract cannot be set to ${status}`
          : 'Terms can only be edited while the contract is offered'
      );
    }
    return ok(res, { contract: updated });
  })
);

// ── E42 · POST /api/contracts/:contractId/collections ─────────────────────────
// The NGO weighs what it collected. We snapshot the society's promised weight,
// flag any shortfall, and recalculate the society's trust score.
router.post(
  '/:contractId/collections',
  auth,
  requireRole('ngo'),
  validate({ body: collectionSchema }),
  asyncHandler(async (req, res) => {
    const contract = await loadOwnedContract(req.params.contractId, req.user);
    if (contract.status !== 'active') {
      throw new AppError(409, 'CONTRACT_NOT_ACTIVE', 'Collections can only be logged on an active contract');
    }

    const { actualKg } = req.body;
    let outcome;

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        // Taken per attempt: a retried (conflicted) collection must be timestamped
        // after the collection that beat it.
        const now = new Date();

        // Writing the society first serialises concurrent collections for it:
        // the loser write-conflicts, retries, and then sees the winner's collection.
        const society = await Society.findOneAndUpdate(
          { _id: contract.societyId },
          { lastCollectionDate: now },
          { new: true, session }
        );
        if (!(await Contract.exists({ _id: contract._id, status: 'active' }).session(session))) {
          throw new AppError(409, 'CONTRACT_NOT_ACTIVE', 'Collections can only be logged on an active contract');
        }

        const cycle = await currentCycle(society._id);
        const window = cycle.byCategory.find((b) => b.category === contract.materialType);
        const promisedKg = window.totalKg;
        const flagged = isFlagged(promisedKg, actualKg);

        const [collection] = await Collection.create(
          [{
            contractId: contract._id,
            societyId: society._id,
            ngoId: contract.ngoId,
            category: contract.materialType,
            windowStart: window.since,
            windowEnd: now,
            promisedKg,
            actualKg,
            flagged,
            collectedAt: now,
          }],
          { session }
        );

        if (flagged) {
          await Flag.create(
            [{
              societyId: society._id,
              contractId: contract._id,
              collectionId: collection._id,
              promisedKg,
              actualKg,
              shortfallKg: round3(promisedKg - actualKg),
            }],
            { session }
          );
        }

        const history = await Collection.find({ societyId: society._id })
          .sort({ collectedAt: 1 })
          .session(session)
          .lean();
        const score = trustScore(history);
        await Society.updateOne({ _id: society._id }, { trustScore: score }, { session });

        outcome = { collection, flagged, score, societyId: society.id };
      });
    } finally {
      await session.endSession();
    }

    const {
      collection, flagged, score, societyId,
    } = outcome;

    // S09 — officers and the NGO learn of a shortfall
    if (flagged) {
      const payload = {
        contractId: contract.id, promisedKg: collection.promisedKg, actualKg, trustScore: score,
      };
      emitToOfficers(societyId, 'contract:flag-raised', payload);
      emitToUser(contract.ngoId, 'contract:flag-raised', payload);
    }

    return ok(res, { collection, flagged, trustScore: score }, 201);
  })
);

// ── E43 · GET /api/contracts/:contractId/collections ──────────────────────────
router.get(
  '/:contractId/collections',
  auth,
  asyncHandler(async (req, res) => {
    const contract = await loadReadableContract(req.params.contractId, req.user);
    const collections = await Collection.find({ contractId: contract._id }).sort({ collectedAt: -1 });

    return ok(
      res,
      collections.map((c) => ({
        ...collectionSummary(c),
        contractId: c.contractId.toString(),
        category: c.category,
        windowStart: c.windowStart,
        windowEnd: c.windowEnd,
      }))
    );
  })
);

module.exports = router;
