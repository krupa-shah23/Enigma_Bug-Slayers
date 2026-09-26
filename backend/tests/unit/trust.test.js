const { isFlagged, trustScore } = require('../../src/services/trust');

const c = (promisedKg, actualKg) => ({ promisedKg, actualKg });

describe('isFlagged', () => {
  it('flags only when actual < promised', () => {
    expect(isFlagged(100, 99)).toBe(true);
    expect(isFlagged(100, 100)).toBe(false);
    expect(isFlagged(100, 120)).toBe(false);
  });
});

describe('trustScore', () => {
  it('no collections -> null', () => {
    expect(trustScore([])).toBeNull();
  });

  it('all clean -> 100', () => {
    expect(trustScore([c(100, 100), c(50, 80)])).toBe(100);
  });

  it('[100 promised/50 actual, 100/100] -> 68', () => {
    // mean = 0.75, flags = 1/2 -> 100 x (0.7 x 0.75 + 0.3 x 0.5) = 67.5 -> 68
    expect(trustScore([c(100, 50), c(100, 100)])).toBe(68);
  });

  it('promised 0 counts as fulfilled and unflagged', () => {
    expect(trustScore([c(0, 0)])).toBe(100);
  });

  it('a single total miss scores 0', () => {
    expect(trustScore([c(100, 0)])).toBe(0);
  });

  it('only the last 6 collections count', () => {
    const old = [c(100, 0), c(100, 0), c(100, 0)];
    const recent = Array.from({ length: 6 }, () => c(100, 100));
    expect(trustScore([...old, ...recent])).toBe(100);
  });
});
