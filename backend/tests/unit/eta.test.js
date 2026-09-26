const { computeEta, etaFromKm } = require('../../src/services/eta');

describe('etaFromKm', () => {
  it('0 km -> minimum 2 minutes', () => {
    expect(etaFromKm(0)).toBe(2);
  });

  it('5 km -> ceil(5 x 1.3 / 15 x 60) = 26', () => {
    expect(etaFromKm(5)).toBe(26);
  });

  it('rounds up partial minutes', () => {
    expect(etaFromKm(1)).toBe(6); // 5.2 -> 6
  });
});

describe('computeEta', () => {
  it('same point -> 2 minutes', () => {
    const p = { lat: 19.076, lng: 72.8777 };
    expect(computeEta(p, p)).toBe(2);
  });

  it('~1 km apart -> 6 minutes', () => {
    const a = { lat: 19.076, lng: 72.8777 };
    const b = { lat: 19.076 + 1 / 111.195, lng: 72.8777 }; // ~1 km north
    expect(computeEta(a, b)).toBe(6);
  });
});
