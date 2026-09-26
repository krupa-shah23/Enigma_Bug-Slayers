/**
 * schedule.js — collection cadence and festival-aware suggestions.
 * All dates are handled as UTC calendar days (time-of-day is dropped).
 */

const DAY_MS = 24 * 60 * 60 * 1000;

function toUtcDay(date) {
  const d = new Date(date);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function addDays(date, n) {
  const d = toUtcDay(date);
  d.setUTCDate(d.getUTCDate() + n);
  return d;
}

/** +n months, clamped to the target month's last day (Jan 31 + 1 -> Feb 28/29). */
function addMonths(date, n) {
  const d = toUtcDay(date);
  const lastDayOfTarget = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n + 1, 0)).getUTCDate();
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, Math.min(d.getUTCDate(), lastDayOfTarget))
  );
}

/** last collection + 7 days / 14 days / 1 month. */
function nextCollectionDate(last, freq) {
  switch (freq) {
    case 'weekly':   return addDays(last, 7);
    case 'biweekly': return addDays(last, 14);
    case 'monthly':  return addMonths(last, 1);
    default: throw new Error(`Unknown collection frequency: ${freq}`);
  }
}

/**
 * If festival.date - 2d <= nextDate <= festival.date, suggest festival.date + shiftDays.
 * Returns { festivalName, suggestedDate } or null. Earliest matching festival wins.
 */
function festivalSuggestion(nextDate, calendar) {
  const next = toUtcDay(nextDate).getTime();

  const matches = calendar
    .map((f) => ({ f, t: toUtcDay(f.date).getTime() }))
    .filter(({ t }) => next >= t - 2 * DAY_MS && next <= t)
    .sort((a, b) => a.t - b.t);

  if (matches.length === 0) return null;

  const { f } = matches[0];
  return { festivalName: f.name, suggestedDate: addDays(f.date, f.shiftDays) };
}

module.exports = { nextCollectionDate, festivalSuggestion };
