/**
 * routes/config.js — E08 festival calendar.
 */

const express = require('express');
const { ok } = require('../lib/response');
const { auth, requireRole } = require('../middleware/auth');
const festivals = require('../config/festivals');

const router = express.Router();

// E08 — GET /api/config/festival-calendar (person, ngo)
router.get('/festival-calendar', auth, requireRole('person', 'ngo'), (_req, res) => ok(res, festivals));

module.exports = router;
