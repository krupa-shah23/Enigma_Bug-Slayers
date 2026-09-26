/**
 * routes/bhangarwala.js — bhangarwala side.
 *   E28 nearby people   E29 my requests   E30 quote   E31 location ping
 *   E32 active job   E33 start   E34 advance status   E35 transactions
 *   E36 profile view   E37 profile update
 */

const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const AppError = require('../lib/AppError');
const asyncHandler = require('../lib/asyncHandler');
const { ok } = require('../lib/response');
const validate = require('../middleware/validate');
const { auth, requireRole } = require('../middleware/auth');
const { P2P_RADIUS_KM } = require('../config/geo');
const { haversineKm } = require('../services/geo');
const { computeEta } = require('../services/eta');
const { JOB_STATUSES, assertTransition } = require('../services/jobState');
const {
  locationOf, requestCard, quoteView, roundCoord, round2,
} = require('../lib/p2p');
const { emitToUser } = require('../sockets/emitter');
const {
  User, Society, P2PRequest, Quote, Job,
} = require('../models');

const router = express.Router();
router.use(auth, requireRole('bhangarwala'));

const DAY_MS = 24 * 60 * 60 * 1000;

const quoteSchema = Joi.object({ price: Joi.number().greater(0).max(1_000_000).required() });

const statusSchema = Joi.object({ status: Joi.string().valid(...JOB_STATUSES).required() });

const locationSchema = Joi.object({
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required(),
  isOnline: Joi.boolean(),
});

// ── E28 · GET /api/bhangarwala/nearby-people ──────────────────────────────────
// Ambient map dots: open-request locations and society centroids within 3 km,
// rounded to ~100 m so no exact address is exposed.
router.get(
  '/nearby-people',
  asyncHandler(async (req, res) => {
    const from = locationOf(req.user);
    if (!from) return ok(res, []);

    const [requests, societies] = await Promise.all([
      P2PRequest.find({ status: 'open' }).select('location'),
      Society.find().select('location'),
    ]);

    const dot = (type) => (doc) => ({
      type, lat: roundCoord(doc.location.lat), lng: roundCoord(doc.location.lng),
    });
    const near = (doc) => haversineKm(from, doc.location) <= P2P_RADIUS_KM;

    return ok(res, [
      ...requests.filter(near).map(dot('request')),
      ...societies.filter(near).map(dot('society')),
    ]);
  })
);

// ── E29 · GET /api/bhangarwala/requests ───────────────────────────────────────
// Open requests he was notified about + requests he quoted in the last 24 h.
router.get(
  '/requests',
  asyncHandler(async (req, res) => {
    const me = req.user;
    const from = locationOf(me);

    const myQuotes = await Quote.find({
      bhangarwalaId: me._id, createdAt: { $gte: new Date(Date.now() - DAY_MS) },
    });
    const quoteByRequest = new Map(myQuotes.map((q) => [q.requestId.toString(), q]));

    const requests = await P2PRequest.find({
      $or: [
        { _id: { $in: myQuotes.map((q) => q.requestId) } },
        { notifiedBhangarwalaIds: me._id, status: 'open' },
      ],
    }).sort({ createdAt: -1 });

    return ok(
      res,
      requests.map((r) => {
        const q = quoteByRequest.get(r.id);
        return {
          ...requestCard(r, from),
          myQuote: q ? { price: q.price, etaMinutes: q.etaMinutes, status: q.status } : null,
        };
      })
    );
  })
);

// ── E30 · POST /api/bhangarwala/requests/:requestId/quote ─────────────────────
router.post(
  '/requests/:requestId/quote',
  validate({ body: quoteSchema }),
  asyncHandler(async (req, res) => {
    const me = req.user;
    const { requestId } = req.params;

    const request = mongoose.isValidObjectId(requestId) ? await P2PRequest.findById(requestId) : null;
    if (!request) throw new AppError(404, 'NOT_FOUND', 'Request not found');
    if (request.status !== 'open') throw new AppError(409, 'REQUEST_NOT_OPEN', 'This request is no longer open');

    const from = locationOf(me);
    if (!from) {
      throw new AppError(400, 'LOCATION_UNKNOWN', 'Share your location before quoting');
    }
    if (await Quote.exists({ requestId: request._id, bhangarwalaId: me._id })) {
      throw new AppError(409, 'ALREADY_QUOTED', 'You have already quoted on this request');
    }

    let quote;
    try {
      quote = await Quote.create({
        requestId: request._id,
        bhangarwalaId: me._id,
        price: req.body.price,
        distanceKm: round2(haversineKm(from, request.location)),
        etaMinutes: computeEta(from, request.location), // server-computed, never client-supplied
      });
    } catch (err) {
      if (err.code === 11000) throw new AppError(409, 'ALREADY_QUOTED', 'You have already quoted on this request');
      throw err;
    }

    // The request may have been assigned while we were creating the quote
    if (!(await P2PRequest.exists({ _id: request._id, status: 'open' }))) {
      await Quote.updateOne({ _id: quote._id }, { status: 'expired' });
      throw new AppError(409, 'REQUEST_NOT_OPEN', 'This request is no longer open');
    }

    // S02 — the requesting person sees the quote live
    emitToUser(request.personId, 'quote:new', { requestId: request.id, quote: quoteView(quote, me) });
    return ok(res, { quote }, 201);
  })
);

// ── E31 · POST /api/bhangarwala/location ──────────────────────────────────────
// Pings his location. A ping counts as "online" unless isOnline:false is sent.
router.post(
  '/location',
  validate({ body: locationSchema }),
  asyncHandler(async (req, res) => {
    const { lat, lng } = req.body;
    const isOnline = req.body.isOnline === undefined ? true : req.body.isOnline;
    const now = new Date();

    await User.updateOne(
      { _id: req.user._id },
      {
        'bhangarwala.location': { lat, lng },
        'bhangarwala.locationUpdatedAt': now,
        'bhangarwala.isOnline': isOnline,
      }
    );

    // S06 — while a pickup is under way the person sees him move, with a fresh ETA
    const job = await Job.findOne({ bhangarwalaId: req.user._id, status: { $in: ['heading', 'arrived'] } });
    if (job) {
      const request = await P2PRequest.findById(job.requestId);
      emitToUser(job.personId, 'job:location', {
        jobId: job.id, lat, lng, etaMinutes: computeEta({ lat, lng }, request.location),
      });
    }

    return ok(res, { location: { lat, lng }, isOnline, locationUpdatedAt: now });
  })
);

// ── jobs ──────────────────────────────────────────────────────────────────────

/** Loads a job assigned to the caller: 404 if missing, 403 if it is another bhangarwala's. */
async function loadOwnJob(id, user) {
  const job = mongoose.isValidObjectId(id) ? await Job.findById(id) : null;
  if (!job) throw new AppError(404, 'NOT_FOUND', 'Job not found');
  if (!job.bhangarwalaId.equals(user._id)) {
    throw new AppError(403, 'FORBIDDEN', 'This job is assigned to another bhangarwala');
  }
  return job;
}

/**
 * Moves a job to `requested`, which must be exactly the next status (else 409).
 * The conditional update means two simultaneous advances can't both win; on
 * completion the request is completed in the same transaction. Emits S05.
 */
async function advanceJob(job, requested) {
  const next = assertTransition(job.status, requested);
  const at = new Date();
  let updated;

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      updated = await Job.findOneAndUpdate(
        { _id: job._id, status: job.status },
        {
          status: next,
          ...(next === 'completed' && { completedAt: at }),
          $push: { statusHistory: { status: next, at } },
        },
        { new: true, session }
      );
      if (!updated) throw new AppError(409, 'INVALID_TRANSITION', 'The job status has already changed');

      if (next === 'completed') {
        await P2PRequest.updateOne({ _id: job.requestId }, { status: 'completed' }, { session });
      }
    });
  } finally {
    await session.endSession();
  }

  emitToUser(job.personId, 'job:status', { jobId: job.id, status: next, at });
  return updated;
}

// ── E32 · GET /api/bhangarwala/jobs/active ────────────────────────────────────
// His current unfinished job (oldest first) with the request and the person's contact.
router.get(
  '/jobs/active',
  asyncHandler(async (req, res) => {
    const job = await Job.findOne({ bhangarwalaId: req.user._id, status: { $ne: 'completed' } }).sort({ createdAt: 1 });
    if (!job) return ok(res, null);

    const [request, person] = await Promise.all([
      P2PRequest.findById(job.requestId),
      User.findById(job.personId),
    ]);

    return ok(res, {
      job,
      request: {
        id: request.id,
        photoUrl: request.photoUrl,
        description: request.description,
        category: request.category,
        location: { lat: request.location.lat, lng: request.location.lng }, // exact, now that he is assigned
      },
      person: { id: person.id, name: person.name, phone: person.phone },
    });
  })
);

// ── E33 · POST /api/bhangarwala/jobs/:jobId/start ─────────────────────────────
router.post(
  '/jobs/:jobId/start',
  asyncHandler(async (req, res) => {
    const job = await loadOwnJob(req.params.jobId, req.user);
    return ok(res, { job: await advanceJob(job, 'heading') });
  })
);

// ── E34 · PATCH /api/bhangarwala/jobs/:jobId/status ───────────────────────────
router.patch(
  '/jobs/:jobId/status',
  validate({ body: statusSchema }),
  asyncHandler(async (req, res) => {
    const job = await loadOwnJob(req.params.jobId, req.user);
    return ok(res, { job: await advanceJob(job, req.body.status) });
  })
);

// ── E35 · GET /api/bhangarwala/transactions ───────────────────────────────────
router.get(
  '/transactions',
  asyncHandler(async (req, res) => {
    const jobs = await Job.find({ bhangarwalaId: req.user._id, status: 'completed' }).sort({ completedAt: -1 });

    const [requests, people] = await Promise.all([
      P2PRequest.find({ _id: { $in: jobs.map((j) => j.requestId) } }).select('category'),
      User.find({ _id: { $in: jobs.map((j) => j.personId) } }).select('name'),
    ]);
    const categoryOf = new Map(requests.map((r) => [r.id, r.category]));
    const nameOf = new Map(people.map((p) => [p.id, p.name]));

    return ok(res, {
      transactions: jobs.map((j) => ({
        id: j.id,
        requestId: j.requestId.toString(),
        category: categoryOf.get(j.requestId.toString()),
        personName: nameOf.get(j.personId.toString()),
        price: j.price,
        completedAt: j.completedAt,
      })),
      totalEarnings: round2(jobs.reduce((sum, j) => sum + j.price, 0)),
    });
  })
);

// ── E36 · GET /api/bhangarwala/profile ───────────────────────────────────────────────
// Returns the bhangarwala's profile + earnings summary.
router.get(
  '/profile',
  asyncHandler(async (req, res) => {
    const me = req.user;

    // Compute total earnings from completed jobs
    const earningsRows = await Job.aggregate([
      { $match: { bhangarwalaId: me._id, status: 'completed' } },
      { $group: { _id: null, totalEarnings: { $sum: '$price' }, jobCount: { $sum: 1 } } },
    ]);
    const { totalEarnings = 0, jobCount = 0 } = earningsRows[0] || {};

    return ok(res, {
      id: me.id,
      name: me.name,
      email: me.email,
      phone: me.phone,
      vehicleType: me.bhangarwala?.vehicleType || null,
      areaNote: me.bhangarwala?.areaNote || null,
      isOnline: me.bhangarwala?.isOnline || false,
      location: me.bhangarwala?.location
        ? { lat: me.bhangarwala.location.lat, lng: me.bhangarwala.location.lng }
        : null,
      locationUpdatedAt: me.bhangarwala?.locationUpdatedAt || null,
      totalEarnings: round2(totalEarnings),
      jobCount,
    });
  })
);

// ── E37 · PATCH /api/bhangarwala/profile ───────────────────────────────────────────────
// Updates vehicleType and/or areaNote only (location is managed by E31).
const profileSchema = Joi.object({
  vehicleType: Joi.string().trim().max(50),
  areaNote: Joi.string().trim().max(500).allow('', null),
}).min(1);

router.patch(
  '/profile',
  validate({ body: profileSchema }),
  asyncHandler(async (req, res) => {
    const updates = {};
    if (req.body.vehicleType !== undefined) updates['bhangarwala.vehicleType'] = req.body.vehicleType;
    if (req.body.areaNote !== undefined) updates['bhangarwala.areaNote'] = req.body.areaNote;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    );

    return ok(res, {
      vehicleType: updated.bhangarwala?.vehicleType || null,
      areaNote: updated.bhangarwala?.areaNote || null,
    });
  })
);

module.exports = router;
