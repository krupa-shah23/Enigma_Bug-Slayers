/**
 * trust.js — flagging and society trust score.
 */

const WINDOW = 6;

function isFlagged(promised, actual) {
  return actual < promised;
}

/** Fulfilment ratio capped at 1; a zero promise counts as fully met. */
function fulfilment(c) {
  return c.promisedKg === 0 ? 1 : Math.min(c.actualKg / c.promisedKg, 1);
}

/**
 * Trust score over the last 6 collections.
 * `collections` must be chronological (oldest first), each { promisedKg, actualKg }.
 *   score = round(100 x (0.7 x mean(fulfil) + 0.3 x (1 - flags/n)))
 * Returns null when there are no collections ("New" in the UI).
 */
function trustScore(collections) {
  if (collections.length === 0) return null;

  const recent = collections.slice(-WINDOW);
  const n = recent.length;
  const mean = recent.reduce((sum, c) => sum + fulfilment(c), 0) / n;
  const flags = recent.filter((c) => isFlagged(c.promisedKg, c.actualKg)).length;

  const score = 100 * (0.7 * mean + 0.3 * (1 - flags / n));
  // epsilon keeps exact .5 cases (e.g. 67.5) from rounding down on float noise
  return Math.round(score + 1e-9);
}

module.exports = { isFlagged, trustScore };
