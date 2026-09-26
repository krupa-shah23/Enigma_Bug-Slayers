/**
 * Hardcoded festival calendar (PS6 3.11). Served by E08.
 * shiftDays is 1 or 2: how far a collection inside the festival window moves.
 */

const { DEMO_MODE } = require('./env');

const FESTIVALS = [
  { name: 'Dussehra',        date: '2026-10-20', shiftDays: 1 },
  { name: 'Diwali',          date: '2026-11-08', shiftDays: 2 },
  { name: 'Christmas',       date: '2026-12-25', shiftDays: 1 },
  { name: 'Makar Sankranti', date: '2027-01-14', shiftDays: 1 },
  { name: 'Republic Day',    date: '2027-01-26', shiftDays: 1 },
];

// In demo mode, always include a festival 3 days out so the
// festival-suggestion flow can be shown at any time.
if (DEMO_MODE) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + 3);
  FESTIVALS.push({
    name: 'Demo Festival',
    date: d.toISOString().slice(0, 10),
    shiftDays: 2,
  });
}

module.exports = FESTIVALS;
