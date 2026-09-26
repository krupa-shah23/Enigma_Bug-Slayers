/**
 * routes/uploads.js — E06 image upload (any role), E07 document upload (NGO).
 * Role checks run before multer so rejected callers never write to disk.
 */

const express = require('express');
const { ok } = require('../lib/response');
const { auth, requireRole } = require('../middleware/auth');
const { imageUpload, documentUpload } = require('../middleware/upload');

const router = express.Router();

const respond = (req, res) => ok(res, { url: `/uploads/${req.file.filename}` }, 201);

// E06 — POST /api/uploads/image (any authenticated): jpg/png/webp, <= 5 MB
router.post('/image', auth, imageUpload, respond);

// E07 — POST /api/uploads/document (ngo): pdf, <= 10 MB
router.post('/document', auth, requireRole('ngo'), documentUpload, respond);

module.exports = router;
