/**
 * routes.test.js — Manifest gate.
 *
 * Rules (enforced every step):
 *  1. The manifest must contain exactly 57 endpoints with unique IDs.
 *  2. For every endpoint marked `implemented: true`, a real HTTP request
 *     to that path must NOT return 404 (proving the route is registered).
 *
 * At Step 1 there are 0 implemented endpoints, so rule 2 is vacuously true.
 * As each step lands and flips endpoints to `implemented: true`, those
 * endpoints are automatically validated here on the next gate run.
 *
 * Note: The deep "no stray routes" check (every Express route must appear
 * in the manifest) is added in Step 18 once all 57 are implemented.
 */

const request = require('supertest');
const app = require('../../src/app');
const endpoints = require('./endpoints.json');

// Paths that Express exposes but are intentionally NOT in the manifest
const WHITELISTED_PATHS = ['/health'];

describe('Endpoint manifest', () => {
  it('has exactly 57 entries', () => {
    expect(endpoints).toHaveLength(57);
  });

  it('all IDs are unique (E01–E57)', () => {
    const ids = endpoints.map((e) => e.id);
    expect(new Set(ids).size).toBe(57);
  });

  it('all methods are valid HTTP verbs', () => {
    const valid = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
    endpoints.forEach((e) => {
      expect(valid.has(e.method)).toBe(true);
    });
  });

  it('all paths start with /api/', () => {
    endpoints.forEach((e) => {
      expect(e.path.startsWith('/api/')).toBe(true);
    });
  });

  // Whitelisted paths won't accidentally show up as manifest entries
  it('whitelisted paths (/health) are not in the manifest', () => {
    const manifestPaths = endpoints.map((e) => e.path);
    WHITELISTED_PATHS.forEach((p) => {
      expect(manifestPaths).not.toContain(p);
    });
  });
});

// ── Per-endpoint registration check ──────────────────────────────────────────

const implemented = endpoints.filter((e) => e.implemented);

describe(`Implemented endpoints (${implemented.length} of 57) are registered in Express`, () => {
  if (implemented.length === 0) {
    it('0 endpoints implemented at this step — nothing to verify yet', () => {
      expect(implemented).toHaveLength(0);
    });
  } else {
    implemented.forEach((endpoint) => {
      it(`${endpoint.id}: ${endpoint.method} ${endpoint.path} → not 404`, async () => {
        const method = endpoint.method.toLowerCase();
        // Replace all Express param segments with a placeholder value
        const testPath = endpoint.path.replace(/:[\w]+/g, 'test-placeholder-id');

        const res = await request(app)[method](testPath);

        // Any status other than 404 (Not Found) means the route IS registered.
        // 401 / 403 are expected for protected endpoints with no auth header.
        expect(res.status).not.toBe(404);
      });
    });
  }
});
