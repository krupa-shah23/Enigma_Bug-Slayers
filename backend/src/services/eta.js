/**
 * eta.js — bhangarwala arrival estimate.
 * minutes = max(2, ceil(km x 1.3 road factor / 15 km/h x 60))
 */

const { haversineKm } = require('./geo');

const ROAD_FACTOR = 1.3;
const SPEED_KMH = 15;
const MIN_ETA_MINUTES = 2;

function etaFromKm(km) {
  const minutes = ((km * ROAD_FACTOR) / SPEED_KMH) * 60;
  // toFixed strips float noise (26.000000000000004 must not ceil to 27)
  return Math.max(MIN_ETA_MINUTES, Math.ceil(Number(minutes.toFixed(6))));
}

/** ETA in whole minutes between two { lat, lng } points. */
function computeEta(from, to) {
  return etaFromKm(haversineKm(from, to));
}

module.exports = { computeEta, etaFromKm };
