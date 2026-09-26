/**
 * app.js — Express application factory.
 *
 * Exports the Express `app` WITHOUT calling `.listen()`.
 * This lets Supertest import and test the app in isolation while
 * server.js handles the real HTTP server + Socket.IO binding.
 *
 * Routes are registered here as each step lands.
 */

const express = require('express');

const app = express();

// ── Body parsers ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Health check (internal, whitelisted — not in endpoint manifest) ───────────
app.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

// ── API routes (mounted per step) ─────────────────────────────────────────────
// Step 5:  app.use('/api/auth',        require('./routes/auth'));
// Step 6:  app.use('/api/uploads',     require('./routes/uploads'));
// Step 6:  app.use('/api/config',      require('./routes/config'));
// Step 7:  app.use('/api/societies',   require('./routes/societies'));
// Step 8:  app.use('/api/contributions', require('./routes/contributions'));
// Step 10: app.use('/api/p2p',         require('./routes/p2p'));
// Step 10: app.use('/api/bhangarwala', require('./routes/bhangarwala'));
// Step 12: app.use('/api/ngo',         require('./routes/ngo'));
// Step 13: app.use('/api/contracts',   require('./routes/contracts'));
// Step 14: app.use('/api/payments',    require('./routes/payments'));
// Step 15: app.use('/api/events',      require('./routes/events'));
// Step 16: app.use('/api/person',      require('./routes/person'));

module.exports = app;
