/**
 * routes/person.js — person-facing aggregated views.
 *
 *   E47  GET  /api/person/dashboard         contribution stats, fee credit,
 *                                           active P2P request, upcoming events
 *   E48  GET  /api/person/exchange-history  completed P2P jobs the person was part of
 */

const express = require('express');
const mongoose = require('mongoose');
const { ok } = require('../lib/response');
const asyncHandler = require('../lib/asyncHandler');
const { auth, requireRole } = require('../middleware/auth');
const { currentCycle } = require('../services/aggregate');
const {
  User, P2PRequest, Job, Quote, Event, Payment,
} = require('../models');

const router = express.Router();
router.use(auth, requireRole('person'));

// ── E47 · GET /api/person/dashboard ──────────────────────────────────────────
// Returns:
//  - contributions: current cycle byCategory totals (requires societyId)
//  - feeCreditPaise: accumulated credit from waste-collection payouts
//  - totalFeeCreditPaise: same (alias, for clarity)
//  - activeRequest: the person's one open P2P request (null if none)
//  - upcomingEvents: next 5 active events visible to them (societyId events + public)
router.get(
  '/dashboard',
  asyncHandler(async (req, res) => {
    const { user } = req;

    // Run all data fetches in parallel where independent
    const [contributionData, activeRequest, upcomingEvents] = await Promise.all([
      // Contribution cycle — only available when the user belongs to a society
      user.societyId ? currentCycle(user.societyId) : Promise.resolve(null),

      // Their one open P2P request (most recent)
      P2PRequest.findOne({ personId: user._id, status: 'open' })
        .sort({ createdAt: -1 })
        .lean(),

      // Next 5 visible active events sorted by date
      Event.find({
        status: 'active',
        $or: [
          { societyId: null },
          ...(user.societyId ? [{ societyId: user.societyId }] : []),
        ],
        date: { $gte: new Date() },
      })
        .sort({ date: 1 })
        .limit(5)
        .lean(),
    ]);

    return ok(res, {
      feeCreditPaise: user.feeCreditPaise,
      contributions: contributionData ? contributionData.byCategory : null,
      activeRequest: activeRequest
        ? {
            id: activeRequest._id.toString(),
            category: activeRequest.category,
            description: activeRequest.description,
            photoUrl: activeRequest.photoUrl,
            createdAt: activeRequest.createdAt,
          }
        : null,
      upcomingEvents: upcomingEvents.map((e) => ({
        id: e._id.toString(),
        title: e.title,
        type: e.type,
        date: e.date,
        location: e.location || null,
        societyId: e.societyId ? e.societyId.toString() : null,
      })),
    });
  })
);

// ── E48 · GET /api/person/exchange-history ────────────────────────────────────
// Completed P2P jobs where this person was the requester. Newest first.
// Each entry includes the job's price, the bhangarwala's name, and the category.
router.get(
  '/exchange-history',
  asyncHandler(async (req, res) => {
    const jobs = await Job.find({
      personId: req.user._id,
      status: 'completed',
    })
      .sort({ completedAt: -1 })
      .lean();

    if (!jobs.length) {
      return ok(res, { history: [] });
    }

    const [requests, bhangarwalas] = await Promise.all([
      P2PRequest.find({ _id: { $in: jobs.map((j) => j.requestId) } })
        .select('category description photoUrl')
        .lean(),
      User.find({ _id: { $in: jobs.map((j) => j.bhangarwalaId) } })
        .select('name phone')
        .lean(),
    ]);

    const reqMap = new Map(requests.map((r) => [r._id.toString(), r]));
    const bhMap = new Map(bhangarwalas.map((b) => [b._id.toString(), b]));

    const history = jobs.map((j) => {
      const req = reqMap.get(j.requestId.toString()) || {};
      const bh = bhMap.get(j.bhangarwalaId.toString()) || {};
      return {
        jobId: j._id.toString(),
        requestId: j.requestId.toString(),
        category: req.category || null,
        description: req.description || null,
        photoUrl: req.photoUrl || null,
        price: j.price,
        bhangarwala: { id: j.bhangarwalaId.toString(), name: bh.name || null, phone: bh.phone || null },
        completedAt: j.completedAt,
      };
    });

    return ok(res, { history });
  })
);

module.exports = router;
