/**
 * routes/ngo.js — NGO-facing endpoints under /api/ngo.
 *   E54 submit verification   E55 verification status   E56 demo approval
 *   E20 society view (verified NGOs: trust + officer contacts + history)
 *   E39 my contracts
 *   E44 my payments
 *   E57 NGO dashboard
 */

const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const env = require('../config/env');
const AppError = require('../lib/AppError');
const asyncHandler = require('../lib/asyncHandler');
const { ok } = require('../lib/response');
const validate = require('../middleware/validate');
const { auth, requireRole, requireVerifiedNgo } = require('../middleware/auth');
const { CONTRACT_STATUSES } = require('../config/constants');
const { collectionSummary } = require('../lib/contracts');
const { monthlyHistory } = require('../services/aggregate');
const { loadStats, projectSociety } = require('../services/societyView');
const {
  User, Society, Flag, Contract, Collection, Payment,
} = require('../models');

const router = express.Router();

const submitSchema = Joi.object({
  documentUrl: Joi.string().trim().max(500).required(),
  orgName: Joi.string().trim().min(1).max(150).required(),
});

const contractsQuerySchema = Joi.object({
  status: Joi.string().valid(...CONTRACT_STATUSES),
});

const verificationView = (user) => ({
  status: user.ngo.verificationStatus,
  submittedAt: user.ngo.submittedAt || null,
  orgName: user.ngo.orgName,
  documentUrl: user.ngo.documentUrl,
});

// ── E54 · POST /api/ngo/verification ──────────────────────────────────────────
// Submits (or re-submits) the verification document: none|pending|rejected -> pending.
router.post(
  '/verification',
  auth,
  requireRole('ngo'),
  validate({ body: submitSchema }),
  asyncHandler(async (req, res) => {
    const { documentUrl, orgName } = req.body;
    const now = new Date();

    const updated = await User.findOneAndUpdate(
      { _id: req.user._id, 'ngo.verificationStatus': { $ne: 'approved' } },
      {
        'ngo.orgName': orgName,
        'ngo.documentUrl': documentUrl,
        'ngo.verificationStatus': 'pending',
        'ngo.submittedAt': now,
      },
      { new: true }
    );
    if (!updated) throw new AppError(409, 'INVALID_TRANSITION', 'This NGO is already verified');

    return ok(res, verificationView(updated));
  })
);

// ── E55 · GET /api/ngo/verification/status ────────────────────────────────────
router.get('/verification/status', auth, requireRole('ngo'), (req, res) =>
  ok(res, verificationView(req.user))
);

// ── E56 · POST /api/ngo/verification/demo-approve ─────────────────────────────
// Only exists while DEMO_MODE is on (read per request): pending -> approved.
router.post(
  '/verification/demo-approve',
  (_req, _res, next) => {
    if (!env.DEMO_MODE) return next(new AppError(404, 'DEMO_DISABLED', 'Not found'));
    return next();
  },
  auth,
  requireRole('ngo'),
  asyncHandler(async (req, res) => {
    const approved = await User.findOneAndUpdate(
      { _id: req.user._id, 'ngo.verificationStatus': 'pending' },
      { 'ngo.verificationStatus': 'approved' },
      { new: true }
    );
    if (!approved) {
      throw new AppError(409, 'INVALID_TRANSITION', 'Only a pending verification can be approved');
    }
    return ok(res, verificationView(approved));
  })
);

// ── E20 · GET /api/ngo/societies/:societyId ───────────────────────────────────
router.get(
  '/societies/:societyId',
  auth,
  requireVerifiedNgo,
  asyncHandler(async (req, res) => {
    const { societyId } = req.params;
    const society = mongoose.isValidObjectId(societyId) ? await Society.findById(societyId) : null;
    if (!society) throw new AppError(404, 'NOT_FOUND', 'Society not found');

    const officerIds = [society.cpId, society.treasurerId].filter(Boolean);
    const [stats, officers, history, flags] = await Promise.all([
      loadStats([society._id]),
      User.find({ _id: { $in: officerIds } }),
      monthlyHistory(society._id),
      Flag.find({ societyId: society._id }).sort({ createdAt: -1 }).limit(20),
    ]);

    return ok(res, {
      ...projectSociety(society, stats, { isNgo: true, detail: true }),
      officers: officers.map((o) => ({
        id: o.id, name: o.name, phone: o.phone, email: o.email, societyRole: o.societyRole,
      })),
      contributionHistory: history,
      flagHistory: flags.map((f) => ({
        id: f.id,
        contractId: f.contractId,
        collectionId: f.collectionId,
        promisedKg: f.promisedKg,
        actualKg: f.actualKg,
        shortfallKg: f.shortfallKg,
        createdAt: f.createdAt,
      })),
    });
  })
);

// ── E39 · GET /api/ngo/contracts ──────────────────────────────────────────────
// The NGO's own contracts (?status= filter), each with its latest collection.
router.get(
  '/contracts',
  auth,
  requireRole('ngo'),
  validate({ query: contractsQuerySchema }),
  asyncHandler(async (req, res) => {
    const filter = { ngoId: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const contracts = await Contract.find(filter).sort({ createdAt: -1 });
    const [collections, societies] = await Promise.all([
      Collection.find({ contractId: { $in: contracts.map((c) => c._id) } }).sort({ collectedAt: -1 }),
      Society.find({ _id: { $in: contracts.map((c) => c.societyId) } }).select('name'),
    ]);

    const latestByContract = new Map();
    collections.forEach((c) => {
      if (!latestByContract.has(c.contractId.toString())) latestByContract.set(c.contractId.toString(), c);
    });
    const societyName = new Map(societies.map((s) => [s.id, s.name]));

    return ok(
      res,
      contracts.map((c) => {
        const latest = latestByContract.get(c.id);
        return {
          ...c.toJSON(),
          society: { id: c.societyId.toString(), name: societyName.get(c.societyId.toString()) },
          latestCollection: latest ? collectionSummary(latest) : null,
        };
      })
    );
  })
);

// ── E44 · GET /api/ngo/payments ───────────────────────────────────────────────
// Imported from routes/payments.js to keep payment logic in one place.
const { listNgoPayments } = require('./payments');
router.get('/payments', ...listNgoPayments);

// ── E57 · GET /api/ngo/dashboard ───────────────────────────────────────────────
// NGO portfolio overview:
//   - contracts: count by status (active, offered, completed, cancelled)
//   - payments: total disbursed paise (all-time)
//   - recentCollections: last 5 collections across all contracts
//   - activeSocieties: ids of societies with an active contract
router.get(
  '/dashboard',
  auth,
  requireRole('ngo'),
  asyncHandler(async (req, res) => {
    const ngoId = req.user._id;

    const [contractRows, paymentRows, recentCollections, activeContracts] = await Promise.all([
      // Contract counts by status
      Contract.aggregate([
        { $match: { ngoId } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      // Total paise disbursed
      Payment.aggregate([
        { $match: { ngoId } },
        { $group: { _id: null, totalPaise: { $sum: '$amountPaise' }, paymentCount: { $sum: 1 } } },
      ]),
      // Last 5 collections across all this NGO's contracts
      Collection.find({ ngoId }).sort({ collectedAt: -1 }).limit(5).lean(),
      // Active contracts (for society list)
      Contract.find({ ngoId, status: 'active' }).select('societyId').lean(),
    ]);

    // Build contract count map
    const contractsByStatus = {};
    contractRows.forEach(({ _id, count }) => { contractsByStatus[_id] = count; });

    const { totalPaise = 0, paymentCount = 0 } = paymentRows[0] || {};

    // Enrich recent collections with contract materialType
    const contractIds = [...new Set(recentCollections.map((c) => c.contractId.toString()))];
    const contracts = await Contract.find({ _id: { $in: contractIds } })
      .select('materialType societyId')
      .lean();
    const contractMeta = new Map(contracts.map((c) => [c._id.toString(), c]));

    return ok(res, {
      contracts: {
        offered: contractsByStatus.offered || 0,
        active: contractsByStatus.active || 0,
        completed: contractsByStatus.completed || 0,
        cancelled: contractsByStatus.cancelled || 0,
        total: Object.values(contractsByStatus).reduce((s, n) => s + n, 0),
      },
      payments: {
        totalPaise,
        paymentCount,
      },
      recentCollections: recentCollections.map((c) => {
        const meta = contractMeta.get(c.contractId.toString()) || {};
        return {
          id: c._id.toString(),
          contractId: c.contractId.toString(),
          societyId: c.societyId.toString(),
          materialType: meta.materialType || null,
          actualKg: c.actualKg,
          flagged: c.flagged,
          paymentStatus: c.paymentStatus,
          collectedAt: c.collectedAt,
        };
      }),
      activeSocietyIds: [...new Set(activeContracts.map((c) => c.societyId.toString()))],
    });
  })
);

module.exports = router;
