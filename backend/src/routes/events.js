/**
 * routes/events.js — community events.
 *
 *   E49  GET    /api/events                  list visible events
 *   E50  POST   /api/events                  create (officer or verified NGO)
 *   E51  PATCH  /api/events/:eventId          edit (creator only)
 *   E52  DELETE /api/events/:eventId          soft-cancel (creator only)
 *   E53  POST   /api/events/:eventId/rsvp     toggle RSVP (person only)
 *
 * Visibility rules (E49):
 *   - person: own society's events + all public NGO events (societyId === null)
 *   - ngo:    only the events it created
 *
 * Creation rules (E50):
 *   - officer (cp/treasurer): creates for their own society (societyId = theirs)
 *   - verified NGO: creates with societyId = null (public) or any valid societyId (targeted)
 *
 * RSVP (E53): toggles — if already RSVPed, removes; otherwise adds.
 *   A person may not RSVP a private (society-scoped) event they don't belong to.
 *
 * S11: event:new → society room (society event) or persons room (public NGO event).
 */

const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const AppError = require('../lib/AppError');
const asyncHandler = require('../lib/asyncHandler');
const { ok } = require('../lib/response');
const validate = require('../middleware/validate');
const { auth, requireRole } = require('../middleware/auth');
const { OFFICER_ROLES, EVENT_TYPES } = require('../config/constants');
const { emitToSociety, emitToPersons } = require('../sockets/emitter');
const { Event } = require('../models');

const router = express.Router();

// ── Schemas ───────────────────────────────────────────────────────────────────

const objectId = Joi.string().hex().length(24);

const createSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).required(),
  type: Joi.string().valid(...EVENT_TYPES).required(),
  date: Joi.date().iso().required(),
  location: Joi.string().trim().max(300),
  description: Joi.string().trim().max(2000),
  // NGOs may optionally target a specific society; officers always use their own.
  societyId: objectId,
});

const patchSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200),
  type: Joi.string().valid(...EVENT_TYPES),
  date: Joi.date().iso(),
  location: Joi.string().trim().max(300).allow('', null),
  description: Joi.string().trim().max(2000).allow('', null),
}).min(1);

// ── Helpers ───────────────────────────────────────────────────────────────────

const notFound = () => new AppError(404, 'NOT_FOUND', 'Event not found');

/** Load an event and verify the caller is its creator (403 NOT_CREATOR otherwise). */
async function loadOwnEvent(eventId, user) {
  if (!mongoose.isValidObjectId(eventId)) throw notFound();
  const event = await Event.findById(eventId);
  if (!event) throw notFound();
  if (!event.creatorId.equals(user._id)) {
    throw new AppError(403, 'NOT_CREATOR', 'Only the event creator can do this');
  }
  return event;
}

/** True when the user is an officer (cp or treasurer). */
const isOfficer = (user) => user.role === 'person' && OFFICER_ROLES.includes(user.societyRole);

// ── E49 · GET /api/events ─────────────────────────────────────────────────────
router.get(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    let filter;

    if (req.user.role === 'ngo') {
      // NGO sees only the events it created
      filter = { creatorId: req.user._id, status: 'active' };
    } else if (req.user.role === 'person') {
      // Person sees: their own society's events + all public (societyId=null) active events
      const conditions = [{ societyId: null, status: 'active' }];
      if (req.user.societyId) {
        conditions.push({ societyId: req.user.societyId, status: 'active' });
      }
      filter = { $or: conditions };
    } else {
      // Bhangarwalas see nothing here
      return ok(res, []);
    }

    const events = await Event.find(filter).sort({ date: 1 });
    return ok(res, events);
  })
);

// ── E50 · POST /api/events ────────────────────────────────────────────────────
router.post(
  '/',
  auth,
  validate({ body: createSchema }),
  asyncHandler(async (req, res) => {
    const { user } = req;

    // Determine creator role and target societyId
    let creatorRole;
    let societyId;

    if (isOfficer(user)) {
      // Officers create events for their own society only
      if (!user.societyId) {
        throw new AppError(403, 'FORBIDDEN', 'You must belong to a society to create events');
      }
      creatorRole = user.societyRole; // 'cp' or 'treasurer'
      societyId = user.societyId;
    } else if (user.role === 'ngo') {
      // Verified NGO check
      if (!user.ngo || user.ngo.verificationStatus !== 'approved') {
        throw new AppError(403, 'NGO_NOT_VERIFIED', 'Your NGO has not been verified yet');
      }
      creatorRole = 'ngo';
      // NGO may pass an optional societyId (targeted) or leave it null (public)
      societyId = req.body.societyId
        ? new mongoose.Types.ObjectId(req.body.societyId)
        : null;
    } else {
      // Residents and bhangarwalas cannot create events
      throw new AppError(403, 'FORBIDDEN', 'Only officers and verified NGOs can create events');
    }

    const event = await Event.create({
      creatorId: user._id,
      creatorRole,
      societyId,
      title: req.body.title,
      type: req.body.type,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
    });

    // S11 — notify the right room
    if (societyId) {
      emitToSociety(societyId, 'event:new', { event });
    } else {
      // Public NGO event: notify all persons
      emitToPersons('event:new', { event });
    }

    return ok(res, { event }, 201);
  })
);

// ── E51 · PATCH /api/events/:eventId ─────────────────────────────────────────
router.patch(
  '/:eventId',
  auth,
  validate({ body: patchSchema }),
  asyncHandler(async (req, res) => {
    const event = await loadOwnEvent(req.params.eventId, req.user);

    if (event.status === 'cancelled') {
      throw new AppError(409, 'EVENT_CANCELLED', 'A cancelled event cannot be edited');
    }

    const updates = {};
    ['title', 'type', 'date', 'location', 'description'].forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    Object.assign(event, updates);
    await event.save();

    return ok(res, { event });
  })
);

// ── E52 · DELETE /api/events/:eventId ────────────────────────────────────────
// Soft-cancel: sets status = 'cancelled'.
router.delete(
  '/:eventId',
  auth,
  asyncHandler(async (req, res) => {
    const event = await loadOwnEvent(req.params.eventId, req.user);

    if (event.status === 'cancelled') {
      throw new AppError(409, 'EVENT_CANCELLED', 'Event is already cancelled');
    }

    event.status = 'cancelled';
    await event.save();

    return ok(res, { event });
  })
);

// ── E53 · POST /api/events/:eventId/rsvp ─────────────────────────────────────
// Toggle: if already RSVP'd → remove; otherwise add.
router.post(
  '/:eventId/rsvp',
  auth,
  requireRole('person'),
  asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.eventId)) throw notFound();
    const event = await Event.findById(req.params.eventId);
    if (!event) throw notFound();

    if (event.status === 'cancelled') {
      throw new AppError(409, 'EVENT_CANCELLED', 'Cannot RSVP to a cancelled event');
    }

    // A person may not RSVP a private (society-scoped) event they are not a member of
    if (event.societyId && (!req.user.societyId || !event.societyId.equals(req.user.societyId))) {
      throw new AppError(403, 'FORBIDDEN', 'You are not a member of this society');
    }

    const userId = req.user._id;
    const alreadyRsvped = event.rsvps.some((id) => id.equals(userId));

    let updatedEvent;
    if (alreadyRsvped) {
      updatedEvent = await Event.findByIdAndUpdate(
        event._id,
        { $pull: { rsvps: userId } },
        { new: true }
      );
    } else {
      updatedEvent = await Event.findByIdAndUpdate(
        event._id,
        { $addToSet: { rsvps: userId } },
        { new: true }
      );
    }

    return ok(res, {
      rsvped: !alreadyRsvped,
      rsvpCount: updatedEvent.rsvps.length,
    });
  })
);

module.exports = router;
