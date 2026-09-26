/**
 * upload.js — multer disk-storage uploader factory.
 *
 * Safety:
 *  - only the listed MIME types are accepted, with a size cap
 *  - the stored filename is a random UUID (the client's name is never used)
 *  - after saving, the file's magic bytes must match its declared type,
 *    otherwise the file is deleted and the request is rejected
 *
 * Every failure becomes a 400 VALIDATION_ERROR.
 */

const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');
const env = require('../config/env');
const AppError = require('../lib/AppError');

const EXTENSIONS = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'application/pdf': '.pdf',
};

const startsWith = (buf, ...bytes) => bytes.every((b, i) => buf[i] === b);
const asText = (buf, from, to) => buf.subarray(from, to).toString('latin1');

const SIGNATURES = {
  'image/png': (b) => startsWith(b, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a),
  'image/jpeg': (b) => startsWith(b, 0xff, 0xd8, 0xff),
  'image/webp': (b) => asText(b, 0, 4) === 'RIFF' && asText(b, 8, 12) === 'WEBP',
  'application/pdf': (b) => asText(b, 0, 5) === '%PDF-',
};

const badRequest = (message) => new AppError(400, 'VALIDATION_ERROR', message);

async function matchesSignature(filePath, mimetype) {
  const handle = await fs.promises.open(filePath, 'r');
  try {
    const head = Buffer.alloc(12);
    await handle.read(head, 0, 12, 0);
    return SIGNATURES[mimetype](head);
  } finally {
    await handle.close();
  }
}

/** Returns Express middleware that reads one file from the multipart field `file`. */
function createUploader({ mimeTypes, maxBytes, label }) {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      fs.mkdirSync(env.UPLOAD_DIR, { recursive: true });
      cb(null, env.UPLOAD_DIR);
    },
    filename: (_req, file, cb) => cb(null, `${crypto.randomUUID()}${EXTENSIONS[file.mimetype]}`),
  });

  const single = multer({
    storage,
    limits: { fileSize: maxBytes, files: 1 },
    fileFilter: (_req, file, cb) => {
      if (!mimeTypes.includes(file.mimetype)) {
        return cb(badRequest(`${label} must be one of: ${mimeTypes.join(', ')}`));
      }
      return cb(null, true);
    },
  }).single('file');

  return (req, res, next) => {
    single(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return next(
          err.code === 'LIMIT_FILE_SIZE'
            ? badRequest(`${label} is too large (max ${maxBytes / (1024 * 1024)} MB)`)
            : badRequest('Send exactly one file in the "file" field')
        );
      }
      if (err) return next(err);
      if (!req.file) return next(badRequest('A file is required in the "file" field'));

      try {
        if (!(await matchesSignature(req.file.path, req.file.mimetype))) {
          await fs.promises.unlink(req.file.path);
          return next(badRequest(`File content does not match its declared type (${req.file.mimetype})`));
        }
      } catch (e) {
        return next(e);
      }
      return next();
    });
  };
}

const imageUpload = createUploader({
  mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxBytes: 5 * 1024 * 1024,
  label: 'Image',
});

const documentUpload = createUploader({
  mimeTypes: ['application/pdf'],
  maxBytes: 10 * 1024 * 1024,
  label: 'Document',
});

module.exports = { createUploader, imageUpload, documentUpload };
