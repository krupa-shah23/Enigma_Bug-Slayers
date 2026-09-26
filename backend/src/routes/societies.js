/**
 * routes/societies.js — E09–E19 (E20, the NGO society view, lands in Step 12).
 *
 * Route order matters: fixed paths (/verify-location) are registered before
 * any /:societyId route.
 */

const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const AppError = require('../lib/AppError');
const asyncHandler = require('../lib/asyncHandler');
const { ok } = require('../lib/response');
const validate = require('../middleware/validate');
const {
  auth, requireRole, requireSocietyMember, requireSocietyOfficer,
} = require('../middleware/auth');
const { COLLECTION_FREQUENCIES, CONTRACT_STATUSES, OFFICER_ROLES } = require('../config/constants');
const festivals = require('../config/festivals');
const { checkLocation } = require('../services/geo');
const { nextCollectionDate, festivalSuggestion, toUtcDay } = require('../services/schedule');
const { currentCycle } = require('../services/aggregate');
const { loadStats, projectSociety, festivalStatus } = require('../services/societyView');
const { User, Society, Contract, Payment } = require('../models');

const router = express.Router();

// ── helpers ──────────────────────────────────────────────────────────────────

const notFound = (what) => new AppError(404, 'NOT_FOUND', `${what} not found`);

async function loadSociety(id) {
  const society = mongoose.isValidObjectId(id) ? await Society.findById(id) : null;
  if (!society) throw notFound('Society');
  return society;
}

/** Next collection date from the last collection (or creation); never in the past. */
function computeNextCollection(society, frequency) {
  const now = new Date();
  const next = nextCollectionDate(society.lastCollectionDate || society.createdAt, frequency);
  return next > now ? next : nextCollectionDate(now, frequency);
}

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const objectId = Joi.string().hex().length(24);
const isOfficer = (user) => OFFICER_ROLES.includes(user.societyRole);

const contact = (u) => ({
  id: u.id, name: u.name, phone: u.phone, email: u.email, societyRole: u.societyRole,
});

// ── schemas ──────────────────────────────────────────────────────────────────

const latLng = {
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required(),
};

const registerSchema = Joi.object({
  name: Joi.string().trim().min(1).max(120).required(),
  address: Joi.string().trim().min(1).max(300).required(),
  collectionFrequency: Joi.string().valid(...COLLECTION_FREQUENCIES).default('monthly'),
  ...latLng,
});

const listQuerySchema = Joi.object({
  sort: Joi.string().valid('trustScore', 'name').default('name'),
  q: Joi.string().trim().allow('').default(''),
});

const patchSchema = Joi.object({
  collectionFrequency: Joi.string().valid(...COLLECTION_FREQUENCIES),
  treasurerId: objectId.allow(null),
}).min(1);

const festivalDecisionSchema = Joi.alternatives().try(
  Joi.object({ decision: Joi.string().valid('accept').required() }),
  Joi.object({
    decision: Joi.string().valid('override').required(),
    date: Joi.date().iso().greater('now').required(),
  })
);

const contractsQuerySchema = Joi.object({
  status: Joi.string().valid(...CONTRACT_STATUSES),
});

// ── E09 · POST /api/societies ─────────────────────────────────────────────────
router.post(
  '/',
  auth,
  requireRole('person'),
  validate({ body: registerSchema }),
  asyncHandler(async (req, res) => {
    const { name, address, lat, lng, collectionFrequency } = req.body;

    if (req.user.societyId) {
      throw new AppError(409, 'ALREADY_IN_SOCIETY', 'You already belong to a society');
    }

    const existing = await Society.find().select('location').lean();
    const { zoneId } = checkLocation(lat, lng, existing);

    const society = await Society.create({
      name,
      address,
      location: { lat, lng },
      zoneId,
      cpId: req.user._id,
      collectionFrequency,
      nextCollectionDate: nextCollectionDate(new Date(), collectionFrequency),
    });

    // Conditional update: guards against two simultaneous registrations by the same person
    const claimed = await User.updateOne(
      { _id: req.user._id, societyId: { $exists: false } },
      { societyId: society._id, societyRole: 'cp' }
    );
    if (claimed.modifiedCount === 0) {
      await Society.deleteOne({ _id: society._id });
      throw new AppError(409, 'ALREADY_IN_SOCIETY', 'You already belong to a society');
    }

    return ok(res, { society }, 201);
  })
);

// ── E10 · POST /api/societies/verify-location ─────────────────────────────────
router.post(
  '/verify-location',
  auth,
  requireRole('person'),
  validate({ body: Joi.object(latLng) }),
  asyncHandler(async (req, res) => {
    const existing = await Society.find().select('location').lean();
    const { valid, zoneId } = checkLocation(req.body.lat, req.body.lng, existing);
    return ok(res, { valid, zoneId });
  })
);

// ── E11 · GET /api/societies ──────────────────────────────────────────────────
router.get(
  '/',
  auth,
  requireRole('person', 'ngo'),
  validate({ query: listQuerySchema }),
  asyncHandler(async (req, res) => {
    const { sort, q } = req.query;
    const filter = q
      ? { $or: [{ name: new RegExp(escapeRegex(q), 'i') }, { address: new RegExp(escapeRegex(q), 'i') }] }
      : {};

    const societies = await Society.find(filter);
    const stats = await loadStats(societies.map((s) => s._id));
    const isNgo = req.user.role === 'ngo';
    const views = societies.map((s) => projectSociety(s, stats, { isNgo }));

    // trustScore sort: highest first, unscored ("New") societies last; ties by name
    views.sort((a, b) => {
      if (sort === 'trustScore') {
        const diff = (b.trustScore ?? -1) - (a.trustScore ?? -1);
        if (diff !== 0) return diff;
      }
      return a.name.localeCompare(b.name);
    });

    return ok(res, views);
  })
);

// ── E12 · GET /api/societies/:societyId ───────────────────────────────────────
router.get(
  '/:societyId',
  auth,
  requireRole('person', 'ngo'),
  asyncHandler(async (req, res) => {
    const society = await loadSociety(req.params.societyId);
    const stats = await loadStats([society._id]);
    return ok(res, projectSociety(society, stats, { isNgo: req.user.role === 'ngo', detail: true }));
  })
);

// ── E13 · POST /api/societies/:societyId/join ─────────────────────────────────
router.post(
  '/:societyId/join',
  auth,
  requireRole('person'),
  asyncHandler(async (req, res) => {
    const society = await loadSociety(req.params.societyId);

    // Conditional update makes "already in a society" race-safe
    const joined = await User.updateOne(
      { _id: req.user._id, societyId: { $exists: false } },
      { societyId: society._id, societyRole: 'resident' }
    );
    if (joined.modifiedCount === 0) {
      throw new AppError(409, 'ALREADY_IN_SOCIETY', 'You already belong to a society');
    }

    const stats = await loadStats([society._id]);
    return ok(res, { society: projectSociety(society, stats, { detail: true }) });
  })
);

// ── E14 · GET /api/societies/:societyId/full ──────────────────────────────────
router.get(
  '/:societyId/full',
  auth,
  requireRole('person'),
  requireSocietyMember,
  asyncHandler(async (req, res) => {
    const society = await loadSociety(req.params.societyId);
    const officerIds = [society.cpId, society.treasurerId].filter(Boolean);

    const [stats, cycle, officers, payments] = await Promise.all([
      loadStats([society._id]),
      currentCycle(society._id),
      User.find({ _id: { $in: officerIds } }),
      Payment.find({ societyId: society._id }).sort({ createdAt: -1 }).limit(5),
    ]);

    const data = {
      ...projectSociety(society, stats, { detail: true }),
      officers: officers.map(contact),
      promised: cycle.byCategory,
      festivalSchedule: festivalStatus(society, festivals),
      recentPayments: payments.map((p) => ({
        id: p.id,
        contractId: p.contractId,
        amountPaise: p.amountPaise,
        createdAt: p.createdAt,
      })),
      feeReductionTotalPaise: society.feeReductionTotalPaise,
      feeCreditPaise: req.user.feeCreditPaise,
    };

    if (isOfficer(req.user)) {
      const members = await User.find({ societyId: society._id }).sort({ name: 1 });
      data.members = members.map((m) => ({ ...contact(m), feeCreditPaise: m.feeCreditPaise }));
    }

    return ok(res, data);
  })
);

// ── E15 · GET /api/societies/:societyId/contributions ─────────────────────────
router.get(
  '/:societyId/contributions',
  auth,
  requireRole('person'),
  requireSocietyMember,
  asyncHandler(async (req, res) => {
    const { byCategory, entries } = await currentCycle(req.params.societyId);

    const users = await User.find({ _id: { $in: entries.map((e) => e.userId) } }).select('name');
    const names = new Map(users.map((u) => [u.id, u.name]));

    return ok(res, {
      byCategory,
      entries: entries.map((e) => ({
        id: e._id.toString(),
        user: { id: e.userId.toString(), name: names.get(e.userId.toString()) },
        category: e.category,
        weightKg: e.weightKg,
        loggedAt: e.loggedAt,
      })),
    });
  })
);

// ── E16 · PATCH /api/societies/:societyId ─────────────────────────────────────
router.patch(
  '/:societyId',
  auth,
  requireSocietyOfficer,
  validate({ body: patchSchema }),
  asyncHandler(async (req, res) => {
    const society = await loadSociety(req.params.societyId);
    const { collectionFrequency, treasurerId } = req.body;
    const set = {};
    const unset = {};

    if (treasurerId !== undefined) {
      if (req.user.societyRole !== 'cp') {
        throw new AppError(403, 'FORBIDDEN', 'Only the CP can appoint the treasurer');
      }

      if (treasurerId === null) {
        unset.treasurerId = 1;
      } else {
        const appointee = await User.findOne({ _id: treasurerId, societyId: society._id });
        if (!appointee) {
          throw new AppError(400, 'VALIDATION_ERROR', 'The treasurer must be a member of this society');
        }
        if (appointee._id.equals(society.cpId)) {
          throw new AppError(400, 'VALIDATION_ERROR', 'The CP cannot also be the treasurer');
        }
        await User.updateOne({ _id: appointee._id }, { societyRole: 'treasurer' });
        set.treasurerId = appointee._id;
      }

      // The previous treasurer (if a different person) goes back to being a resident
      if (society.treasurerId && !society.treasurerId.equals(treasurerId)) {
        await User.updateOne({ _id: society.treasurerId }, { societyRole: 'resident' });
      }
    }

    if (collectionFrequency) {
      set.collectionFrequency = collectionFrequency;
      set.nextCollectionDate = computeNextCollection(society, collectionFrequency);
      unset.festivalSchedule = 1; // a new date invalidates any earlier festival decision
    }

    const update = {};
    if (Object.keys(set).length) update.$set = set;
    if (Object.keys(unset).length) update.$unset = unset;
    const updated = await Society.findByIdAndUpdate(society._id, update, { new: true });

    return ok(res, { society: updated });
  })
);

// ── E17 · PATCH /api/societies/:societyId/festival-schedule ───────────────────
router.patch(
  '/:societyId/festival-schedule',
  auth,
  requireSocietyOfficer,
  validate({ body: festivalDecisionSchema }),
  asyncHandler(async (req, res) => {
    const society = await loadSociety(req.params.societyId);
    const suggestion = festivalSuggestion(society.nextCollectionDate, festivals);
    const { decision, date } = req.body;

    let finalDate;
    if (decision === 'accept') {
      if (!suggestion) {
        throw new AppError(400, 'VALIDATION_ERROR', 'There is no festival suggestion to accept');
      }
      finalDate = suggestion.suggestedDate;
    } else {
      finalDate = toUtcDay(date);
    }

    society.nextCollectionDate = finalDate;
    society.festivalSchedule = {
      festivalName: suggestion ? suggestion.festivalName : undefined,
      suggestedDate: suggestion ? suggestion.suggestedDate : undefined,
      decision: decision === 'accept' ? 'accepted' : 'overridden',
      finalDate,
    };
    await society.save();

    return ok(res, { society });
  })
);

// ── E18 · GET /api/societies/:societyId/contracts ─────────────────────────────
router.get(
  '/:societyId/contracts',
  auth,
  requireSocietyOfficer,
  validate({ query: contractsQuerySchema }),
  asyncHandler(async (req, res) => {
    const statuses = req.query.status ? [req.query.status] : ['offered', 'active'];
    const contracts = await Contract.find({
      societyId: req.params.societyId,
      status: { $in: statuses },
    }).sort({ createdAt: -1 });

    const ngos = await User.find({ _id: { $in: contracts.map((c) => c.ngoId) } }).select('name ngo');
    const ngoById = new Map(ngos.map((n) => [n.id, { id: n.id, name: n.name, orgName: n.ngo.orgName }]));

    return ok(
      res,
      contracts.map((c) => ({ ...c.toJSON(), ngo: ngoById.get(c.ngoId.toString()) }))
    );
  })
);

// ── E19 · POST /api/societies/:societyId/contracts/:contractId/accept ─────────
router.post(
  '/:societyId/contracts/:contractId/accept',
  auth,
  requireSocietyOfficer,
  asyncHandler(async (req, res) => {
    const { societyId, contractId } = req.params;
    if (!mongoose.isValidObjectId(contractId)) throw notFound('Contract');

    // offered -> active in one conditional update, so two officers can't both accept
    const contract = await Contract.findOneAndUpdate(
      { _id: contractId, societyId, status: 'offered' },
      { status: 'active', acceptedAt: new Date(), acceptedBy: req.user._id },
      { new: true }
    );

    if (!contract) {
      const exists = await Contract.exists({ _id: contractId, societyId });
      if (!exists) throw notFound('Contract');
      throw new AppError(409, 'CONTRACT_NOT_EDITABLE', 'Only an offered contract can be accepted');
    }

    // TODO(step 9/13): emit S08 contract:accepted to user:<ngoId> once the socket emitter exists.
    return ok(res, { contract });
  })
);

module.exports = router;
