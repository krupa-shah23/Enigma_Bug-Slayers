const { haversineKm, withinRadius, checkLocation } = require('../../src/services/geo');

const MUMBAI = { lat: 19.076, lng: 72.8777 };
const DELHI = { lat: 28.6139, lng: 77.209 };

describe('haversineKm', () => {
  it('is 0 for identical points', () => {
    expect(haversineKm(MUMBAI, MUMBAI)).toBe(0);
  });

  it('Mumbai -> Delhi is about 1150 km (within 1%)', () => {
    const km = haversineKm(MUMBAI, DELHI);
    expect(Math.abs(km - 1153) / 1153).toBeLessThan(0.01);
  });

  it('is symmetric', () => {
    expect(haversineKm(MUMBAI, DELHI)).toBeCloseTo(haversineKm(DELHI, MUMBAI), 9);
  });
});

describe('withinRadius', () => {
  it('true inside, false outside', () => {
    const near = { lat: MUMBAI.lat + 0.009, lng: MUMBAI.lng }; // ~1 km
    expect(withinRadius(MUMBAI, near, 2)).toBe(true);
    expect(withinRadius(MUMBAI, near, 0.5)).toBe(false);
  });
});

describe('checkLocation', () => {
  const existing = [{ location: MUMBAI }];

  it('accepts a point inside a zone and returns the zone id', () => {
    const res = checkLocation(19.2, 72.9, []);
    expect(res).toEqual({ valid: true, zoneId: 'mumbai' });
  });

  it('rejects a point outside every zone with OUTSIDE_SERVICE_AREA', () => {
    expect(() => checkLocation(0, 0, [])).toThrow(
      expect.objectContaining({ status: 400, code: 'OUTSIDE_SERVICE_AREA' })
    );
  });

  it('rejects a point ~100 m from an existing society with DUPLICATE_LOCATION', () => {
    expect(() => checkLocation(MUMBAI.lat + 0.0009, MUMBAI.lng, existing)).toThrow(
      expect.objectContaining({ status: 409, code: 'DUPLICATE_LOCATION' })
    );
  });

  it('accepts a point ~200 m from an existing society', () => {
    const res = checkLocation(MUMBAI.lat + 0.0018, MUMBAI.lng, existing);
    expect(res.valid).toBe(true);
  });
});
