/**
 * jest.env.js — runs via setupFiles (before test framework installs).
 * Sets process.env defaults so tests never need a real .env file.
 * Real values from .env will override these if dotenv is loaded.
 */

const os = require('os');
const path = require('path');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET =
  process.env.JWT_SECRET || 'test-jwt-secret-must-be-at-least-32-chars-ok';
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-must-be-32-chars-ok!!';
process.env.DEMO_MODE = process.env.DEMO_MODE !== undefined ? process.env.DEMO_MODE : 'true';
process.env.PAYMENT_MODE = process.env.PAYMENT_MODE || 'simulated';
// Uploads go to a per-worker temp directory, never the real /uploads folder.
process.env.UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.join(os.tmpdir(), `ps6-test-uploads-${process.pid}`);
// MONGO_URI is intentionally left unset here — tests/setup.js provides it
// via mongodb-memory-server.
