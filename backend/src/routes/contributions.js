/**
 * routes/contributions.js — E21 log a contribution, E22 my contributions.
 */

const express = require('express');
const Joi = require('joi');
const AppError = require('../lib/AppError');
const asyncHandler = require('../lib/asyncHandler');
const { ok } = require('../lib/response');
const validate = require('../middleware/validate');
const { auth, requireRole } = require('../middleware/auth');
const { CATEGORIES, MAX_CONTRIBUTION_KG } = require('../config/constants');
const { Contribution } = require('../models');

const router = express.Router();

const createSchema = Joi.object({
  category: Joi.string().valid(...CATEGORIES).required(),
  weightKg: Joi.number().greater(0).max(MAX_CONTRIBUTION_KG).required(),
});

const listSchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(20),
  cursor: Joi.string().pattern(/^\d+_[0-9a-f]{24}$/i),
});

// E21 — POST /api/contributions (person in a society)
router.post(
  '/',
  auth,
  requireRole('person'),
  validate({ body: createSchema }),
  asyncHandler(async (req, res) => {
    if (!req.user.societyId) {
      throw new AppError(403, 'NOT_SOCIETY_MEMBER', 'Join a society before logging contributions');
    }

    const contribution = await Contribution.create({
      userId: req.user._id,
      societyId: req.user.societyId,
      category: req.body.category,
      weightKg: req.body.weightKg,
    });
    return ok(res, { contribution }, 201);
  })
);

// E22 — GET /api/contributions/mine?limit&cursor (person)
// Newest first. `cursor` is the opaque `nextCursor` of the previous page.
router.get(
  '/mine',
  auth,
  requireRole('person'),
  validate({ query: listSchema }),
  asyncHandler(async (req, res) => {
    const { limit, cursor } = req.query;
    const filter = { userId: req.user._id };

    if (cursor) {
      const [ms, id] = cursor.split('_');
      const at = new Date(Number(ms));
      filter.$or = [{ loggedAt: { $lt: at } }, { loggedAt: at, _id: { $lt: id } }];
    }

    const rows = await Contribution.find(filter)
      .sort({ loggedAt: -1, _id: -1 })
      .limit(limit + 1);

    const page = rows.slice(0, limit);
    const last = page[page.length - 1];
    const nextCursor = rows.length > limit ? `${last.loggedAt.getTime()}_${last.id}` : null;

    return ok(res, { contributions: page, nextCursor });
  })
);

module.exports = router;
