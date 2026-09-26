/**
 * geo.js — distance maths and society location validation.
 */

const AppError = require('../lib/AppError');
const { SERVICE_ZONES, DUPLICATE_RADIUS_M } = require('../config/geo');

const EARTH_RADIUS_KM = 6371;
const toRad = (deg) => (deg * Math.PI) / 180;

/** Great-circle distance in km between two { lat, lng } points. */
function haversineKm(a, b) {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

function withinRadius(a, b, radiusKm) {
  return haversineKm(a, b) <= radiusKm;
}

/**
 * Validates a proposed society location.
 *  - must be inside a service zone      -> else 400 OUTSIDE_SERVICE_AREA
 *  - must be > 150 m from every society -> else 409 DUPLICATE_LOCATION
 * `existing` is an array of societies with `location: { lat, lng }`.
 * Returns { valid: true, zoneId }.
 */
function checkLocation(lat, lng, existing) {
  const point = { lat, lng };

  const zone = SERVICE_ZONES.find((z) => withinRadius(point, z.center, z.radiusKm));
  if (!zone) {
    throw new AppError(400, 'OUTSIDE_SERVICE_AREA', 'Location is outside all service zones');
  }

  const duplicate = existing.some((s) =>
    withinRadius(point, s.location, DUPLICATE_RADIUS_M / 1000)
  );
  if (duplicate) {
    throw new AppError(409, 'DUPLICATE_LOCATION', 'A society is already registered at this location');
  }

  return { valid: true, zoneId: zone.id };
}

module.exports = { haversineKm, withinRadius, checkLocation };
