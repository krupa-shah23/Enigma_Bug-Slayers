const { splitPayment } = require('../../src/services/split');

const shares = (r) => r.splits.map((s) => s.sharePaise);
const sum = (arr) => arr.reduce((a, b) => a + b, 0);

describe('splitPayment', () => {
  it('splits proportionally: 36000 over 10/20/0 kg -> 12000/24000/0', () => {
    const r = splitPayment(36000, [
      { userId: 'a', weightKg: 10 },
      { userId: 'b', weightKg: 20 },
      { userId: 'c', weightKg: 0 },
    ]);
    expect(shares(r)).toEqual([12000, 24000, 0]);
    expect(r.unallocated).toBe(0);
  });

  it('Rs 100 over three equal contributors -> 3334 + 3333 + 3333', () => {
    const r = splitPayment(10000, [
      { userId: 'a', weightKg: 1 },
      { userId: 'b', weightKg: 1 },
      { userId: 'c', weightKg: 1 },
    ]);
    expect(shares(r)).toEqual([3334, 3333, 3333]);
    expect(sum(shares(r))).toBe(10000);
  });

  it('gives leftover paise to the largest remainders', () => {
    // exact: 3.33..., 6.66... -> floors 3, 6, leftover 1 goes to the .66
    const r = splitPayment(10, [
      { userId: 'a', weightKg: 1 },
      { userId: 'b', weightKg: 2 },
    ]);
    expect(shares(r)).toEqual([3, 7]);
  });

  it('a lone contributor takes everything', () => {
    const r = splitPayment(999, [{ userId: 'a', weightKg: 4.5 }]);
    expect(shares(r)).toEqual([999]);
  });

  it('zero weight everywhere -> nothing split, all unallocated', () => {
    const r = splitPayment(5000, [
      { userId: 'a', weightKg: 0 },
      { userId: 'b', weightKg: 0 },
    ]);
    expect(r).toEqual({ splits: [], unallocated: 5000 });
  });

  it('no contributors -> all unallocated', () => {
    expect(splitPayment(5000, [])).toEqual({ splits: [], unallocated: 5000 });
  });

  it('total of 0 paise yields all-zero shares', () => {
    const r = splitPayment(0, [{ userId: 'a', weightKg: 3 }]);
    expect(shares(r)).toEqual([0]);
  });

  it('preserves input order and carries userId and weightKg', () => {
    const r = splitPayment(100, [
      { userId: 'x', weightKg: 1 },
      { userId: 'y', weightKg: 3 },
    ]);
    expect(r.splits.map((s) => s.userId)).toEqual(['x', 'y']);
    expect(r.splits[1].weightKg).toBe(3);
  });

  it.each([-1, 1.5, '100', NaN])('rejects invalid total %p', (bad) => {
    expect(() => splitPayment(bad, [{ userId: 'a', weightKg: 1 }])).toThrow(/non-negative integer/);
  });

  it('shares always sum exactly to the total (200 random cases)', () => {
    let seed = 42;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    for (let i = 0; i < 200; i += 1) {
      const total = Math.floor(rand() * 1_000_000);
      const n = 1 + Math.floor(rand() * 8);
      const contribs = Array.from({ length: n }, (_, k) => ({
        userId: `u${k}`,
        weightKg: Math.floor(rand() * 40) / 2, // 0 .. 19.5 in 0.5 steps
      }));
      const r = splitPayment(total, contribs);
      expect(sum(shares(r)) + r.unallocated).toBe(total);
      r.splits.forEach((s) => {
        expect(Number.isInteger(s.sharePaise)).toBe(true);
        if (s.weightKg === 0) expect(s.sharePaise).toBe(0);
      });
    }
  });
});
