const geo = require('../../src/config/geo');
const festivals = require('../../src/config/festivals');
const { loadEnv } = require('../../src/config/env');

const base = { NODE_ENV: 'test', JWT_SECRET: 'x'.repeat(32), JWT_REFRESH_SECRET: 'y'.repeat(32) };

describe('geo config', () => {
  it('every zone has an id, a centre and a positive radius', () => {
    expect(geo.SERVICE_ZONES.length).toBeGreaterThan(0);
    geo.SERVICE_ZONES.forEach((z) => {
      expect(z.id).toBeTruthy();
      expect(typeof z.center.lat).toBe('number');
      expect(typeof z.center.lng).toBe('number');
      expect(z.radiusKm).toBeGreaterThan(0);
    });
  });

  it('exposes the spec constants', () => {
    expect(geo.DUPLICATE_RADIUS_M).toBe(150);
    expect(geo.P2P_RADIUS_KM).toBe(3);
    expect(geo.ONLINE_WINDOW_MIN).toBe(10);
  });
});

describe('festival config', () => {
  it('has at least 4 festivals with valid dates and shiftDays in {1,2}', () => {
    expect(festivals.length).toBeGreaterThanOrEqual(4);
    festivals.forEach((f) => {
      expect(f.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(f.date))).toBe(false);
      expect([1, 2]).toContain(f.shiftDays);
    });
  });

  it('includes a festival near today (demo mode is on under test)', () => {
    const soon = festivals.find((f) => f.name === 'Demo Festival');
    expect(soon).toBeDefined();
  });
});

describe('env config', () => {
  it('applies defaults', () => {
    const env = loadEnv(base);
    expect(env.PORT).toBe(3000);
    expect(env.DEMO_MODE).toBe(false);
    expect(env.PAYMENT_MODE).toBe('simulated');
    expect(env.CORS_ORIGINS).toEqual([]);
  });

  it('parses booleans and the CORS list', () => {
    const env = loadEnv({ ...base, DEMO_MODE: 'true', CORS_ORIGINS: 'http://a.com, http://b.com' });
    expect(env.DEMO_MODE).toBe(true);
    expect(env.CORS_ORIGINS).toEqual(['http://a.com', 'http://b.com']);
  });

  it('throws when secrets are missing', () => {
    expect(() => loadEnv({ NODE_ENV: 'test' })).toThrow(/Invalid environment/);
  });

  it('requires MONGO_URI outside of test', () => {
    expect(() => loadEnv({ ...base, NODE_ENV: 'production' })).toThrow(/MONGO_URI/);
  });

  it('rejects an unknown PAYMENT_MODE', () => {
    expect(() => loadEnv({ ...base, PAYMENT_MODE: 'bitcoin' })).toThrow(/PAYMENT_MODE/);
  });
});
