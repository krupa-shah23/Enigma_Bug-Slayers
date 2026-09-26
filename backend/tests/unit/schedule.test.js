const { nextCollectionDate, festivalSuggestion } = require('../../src/services/schedule');

const iso = (d) => d.toISOString().slice(0, 10);

describe('nextCollectionDate', () => {
  it('weekly adds 7 days', () => {
    expect(iso(nextCollectionDate('2026-03-01', 'weekly'))).toBe('2026-03-08');
  });

  it('biweekly adds 14 days', () => {
    expect(iso(nextCollectionDate('2026-03-01', 'biweekly'))).toBe('2026-03-15');
  });

  it('monthly adds one calendar month', () => {
    expect(iso(nextCollectionDate('2026-03-15', 'monthly'))).toBe('2026-04-15');
  });

  it('monthly clamps Jan 31 to Feb 28 (non-leap)', () => {
    expect(iso(nextCollectionDate('2026-01-31', 'monthly'))).toBe('2026-02-28');
  });

  it('monthly clamps Jan 31 to Feb 29 (leap year)', () => {
    expect(iso(nextCollectionDate('2028-01-31', 'monthly'))).toBe('2028-02-29');
  });

  it('monthly rolls over the year', () => {
    expect(iso(nextCollectionDate('2026-12-20', 'monthly'))).toBe('2027-01-20');
  });

  it('accepts Date objects and drops time-of-day', () => {
    const d = nextCollectionDate(new Date('2026-03-01T18:30:00Z'), 'weekly');
    expect(d.toISOString()).toBe('2026-03-08T00:00:00.000Z');
  });

  it('throws on an unknown frequency', () => {
    expect(() => nextCollectionDate('2026-03-01', 'daily')).toThrow(/Unknown collection frequency/);
  });
});

describe('festivalSuggestion', () => {
  const calendar = [
    { name: 'Diwali', date: '2026-11-08', shiftDays: 2 },
    { name: 'Christmas', date: '2026-12-25', shiftDays: 1 },
  ];

  it('suggests festival date + shiftDays when inside the window', () => {
    const res = festivalSuggestion('2026-11-07', calendar);
    expect(res.festivalName).toBe('Diwali');
    expect(iso(res.suggestedDate)).toBe('2026-11-10');
  });

  it('matches at both window edges (festival - 2d and the festival day)', () => {
    expect(festivalSuggestion('2026-11-06', calendar).festivalName).toBe('Diwali');
    expect(festivalSuggestion('2026-11-08', calendar).festivalName).toBe('Diwali');
  });

  it('returns null just outside the window', () => {
    expect(festivalSuggestion('2026-11-05', calendar)).toBeNull();
    expect(festivalSuggestion('2026-11-09', calendar)).toBeNull();
  });

  it('returns null for an empty calendar', () => {
    expect(festivalSuggestion('2026-11-07', [])).toBeNull();
  });

  it('picks the earliest festival when windows overlap', () => {
    const overlap = [
      { name: 'B', date: '2026-05-11', shiftDays: 1 },
      { name: 'A', date: '2026-05-10', shiftDays: 1 },
    ];
    expect(festivalSuggestion('2026-05-09', overlap).festivalName).toBe('A');
  });
});
