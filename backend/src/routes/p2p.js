/**
 * routes/p2p.js — person side of the resident <-> bhangarwala exchange.
 *   E23 create request   E24 my requests   E25 quotes on a request
 *   E26 select a quote   E27 job view (owner)
 *
 * Register /requests/mine before any /requests/:requestId route.
 */

const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const AppError = require('../lib/AppError');
const asyncHandler = require('../lib/asyncHandler');
const { ok } = require('../lib/response');
const validate = require('../middleware/validate');
const { auth, requireRole } = require('../middleware/auth');
const {
  CATEGORIES, REQUEST_STATUSES,
} = require('../config/constants');
const { P2P_RADIUS_KM } = require('../config/geo');
const { haversineKm } = require('../services/geo');
const { computeEta } = require('../services/eta');
const {
  onlineBhangarwalaFilter, locationOf, requestCard, quoteView, ownerRequestView,
} = require('../lib/p2p');
const { emitToUser } = require('../sockets/emitter');
const {
  User, P2PRequest, Quote, Job,
} = require('../models');

const router = express.Router();
router.use(auth, requireRole('person'));

const objectId = Joi.string().hex().length(24);

const createSchema = Joi.object({
  photoUrl: Joi.string().trim().max(500).required(),
  description: Joi.string().trim().max(500).allow('').default(''),
  category: Joi.string().valid(...CATEGORIES).required(),
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required(),
});

const mineQuerySchema = Joi.object({
  status: Joi.string().valid(...REQUEST_STATUSES),
});

const selectSchema = Joi.object({ quoteId: objectId.required() });

// An ETA only means something while he is still on his way
const ETA_STATUSES = ['assigned', 'heading', 'arrived'];

const notFound = (what) => new AppError(404, 'NOT_FOUND', `${what} not found`);

/** Loads a request the caller owns: 404 if missing, 403 if it belongs to someone else. */
async function loadOwnedRequest(id, user) {
  const request = mongoose.isValidObjectId(id) ? await P2PRequest.findById(id) : null;
  if (!request) throw notFound('Request');
  if (!request.personId.equals(user._id)) {
    throw new AppError(403, 'FORBIDDEN', 'This request belongs to another user');
  }
  return request;
}

// ── E23 · POST /api/p2p/requests ──────────────────────────────────────────────
router.post(
  '/requests',
  validate({ body: createSchema }),
  asyncHandler(async (req, res) => {
    const {
      photoUrl, description, category, lat, lng,
    } = req.body;
    const origin = { lat, lng };

    // Online (flag + pinged within 10 min) bhangarwalas within 3 km
    const online = await User.find(onlineBhangarwalaFilter());
    const nearby = online
      .map((b) => ({ user: b, from: locationOf(b) }))
      .filter(({ from }) => from && haversineKm(origin, from) <= P2P_RADIUS_KM);

    const request = await P2PRequest.create({
      personId: req.user._id,
      photoUrl,
      description,
      category,
      location: origin,
      notifiedBhangarwalaIds: nearby.map(({ user }) => user._id),
    });

    // S01 — each bhangarwala gets a card with their own distance to the pickup
    nearby.forEach(({ user, from }) => {
      emitToUser(user.id, 'request:new', { request: requestCard(request, from) });
    });

    return ok(res, { request: ownerRequestView(request), notifiedCount: nearby.length }, 201);
  })
);

// ── E24 · GET /api/p2p/requests/mine ──────────────────────────────────────────
router.get(
  '/requests/mine',
  validate({ query: mineQuerySchema }),
  asyncHandler(async (req, res) => {
    const filter = { personId: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const requests = await P2PRequest.find(filter).sort({ createdAt: -1 });
    const counts = await Quote.aggregate([
      { $match: { requestId: { $in: requests.map((r) => r._id) } } },
      { $group: { _id: '$requestId', n: { $sum: 1 } } },
    ]);
    const quoteCount = new Map(counts.map((c) => [c._id.toString(), c.n]));

    return ok(
      res,
      requests.map((r) => ({ ...ownerRequestView(r), quoteCount: quoteCount.get(r.id) || 0 }))
    );
  })
);

// ── E25 · GET /api/p2p/requests/:requestId/quotes ─────────────────────────────
router.get(
  '/requests/:requestId/quotes',
  asyncHandler(async (req, res) => {
    const request = await loadOwnedRequest(req.params.requestId, req.user);
    const quotes = await Quote.find({ requestId: request._id }).sort({ price: 1, etaMinutes: 1 });
    const users = await User.find({ _id: { $in: quotes.map((q) => q.bhangarwalaId) } });
    const byId = new Map(users.map((u) => [u.id, u]));

    return ok(res, quotes.map((q) => quoteView(q, byId.get(q.bhangarwalaId.toString()))));
  })
);

// ── E26 · POST /api/p2p/requests/:requestId/select-quote ──────────────────────
router.post(
  '/requests/:requestId/select-quote',
  validate({ body: selectSchema }),
  asyncHandler(async (req, res) => {
    const request = await loadOwnedRequest(req.params.requestId, req.user);
    const { quoteId } = req.body;

    if (!(await Quote.exists({ _id: quoteId, requestId: request._id }))) throw notFound('Quote');

    // One transaction: assign the request, accept the chosen quote, expire the rest,
    // create the job. Conditional updates make concurrent selects safe — the loser
    // either write-conflicts (and is retried into a 409) or matches nothing (409).
    let outcome;
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const assigned = await P2PRequest.findOneAndUpdate(
          { _id: request._id, status: 'open' },
          { status: 'assigned' },
          { new: true, session }
        );
        if (!assigned) throw new AppError(409, 'REQUEST_NOT_OPEN', 'This request is no longer open');

        const chosen = await Quote.findOneAndUpdate(
          { _id: quoteId, requestId: request._id, status: 'pending' },
          { status: 'accepted' },
          { new: true, session }
        );
        if (!chosen) throw new AppError(409, 'QUOTE_NOT_PENDING', 'This quote is no longer available');

        const losers = await Quote.find({
          requestId: request._id, status: 'pending', _id: { $ne: chosen._id },
        }).session(session);
        await Quote.updateMany(
          { _id: { $in: losers.map((l) => l._id) } },
          { status: 'expired' },
          { session }
        );

        const [job] = await Job.create(
          [{
            requestId: request._id,
            quoteId: chosen._id,
            personId: req.user._id,
            bhangarwalaId: chosen.bhangarwalaId,
            price: chosen.price,
          }],
          { session }
        );
        await P2PRequest.updateOne({ _id: request._id }, { jobId: job._id }, { session });

        outcome = { job, chosen, losers };
      });
    } finally {
      await session.endSession();
    }

    const { job, chosen, losers } = outcome;
    // S03 to the winner, S04 to every loser
    emitToUser(chosen.bhangarwalaId, 'quote:accepted', {
      requestId: request.id, quoteId: chosen.id, jobId: job.id,
    });
    losers.forEach((loser) => {
      emitToUser(loser.bhangarwalaId, 'quote:expired', { requestId: request.id, quoteId: loser.id });
    });

    return ok(res, { job });
  })
);

// ── E27 · GET /api/p2p/jobs/:jobId ────────────────────────────────────────────
// The requesting person's live view of their pickup.
router.get(
  '/jobs/:jobId',
  asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const job = mongoose.isValidObjectId(jobId) ? await Job.findById(jobId) : null;
    if (!job) throw notFound('Job');
    if (!job.personId.equals(req.user._id)) {
      throw new AppError(403, 'FORBIDDEN', 'This job belongs to another user');
    }

    const [bhangarwala, request] = await Promise.all([
      User.findById(job.bhangarwalaId),
      P2PRequest.findById(job.requestId),
    ]);
    const location = locationOf(bhangarwala);
    const etaMinutes = location && ETA_STATUSES.includes(job.status)
      ? computeEta(location, request.location)
      : null;

    return ok(res, {
      job,
      bhangarwala: { name: bhangarwala.name, phone: bhangarwala.phone, location },
      etaMinutes,
    });
  })
);

module.exports = router;
