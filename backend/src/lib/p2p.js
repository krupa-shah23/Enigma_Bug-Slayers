/**
 * p2p.js — shared helpers for the P2P (resident <-> bhangarwala) flow.
 */

const { ONLINE_WINDOW_MIN } = require('../config/geo');
const { haversineKm } = require('../services/geo');

/** ~100 m precision: locations shown to bhangarwalas before a job is assigned. */
const roundCoord = (v) => Math.round(v * 1000) / 1000;
const round2 = (v) => Math.round(v * 100) / 100;

/** Mongo filter for bhangarwalas who are online: flag set AND pinged within the online window. */
const onlineBhangarwalaFilter = (now = new Date()) => ({
  role: 'bhangarwala',
  'bhangarwala.isOnline': true,
  'bhangarwala.locationUpdatedAt': { $gte: new Date(now.getTime() - ONLINE_WINDOW_MIN * 60 * 1000) },
});

/** A bhangarwala's last known { lat, lng }, or null. */
const locationOf = (user) => {
  const loc = user.bhangarwala && user.bhangarwala.location;
  return loc ? { lat: loc.lat, lng: loc.lng } : null;
};

/** What a bhangarwala may see of an open request: no identity, approximate location. */
function requestCard(request, from) {
  return {
    id: request.id,
    photoUrl: request.photoUrl,
    description: request.description,
    category: request.category,
    location: { lat: roundCoord(request.location.lat), lng: roundCoord(request.location.lng) },
    status: request.status,
    createdAt: request.createdAt,
    distanceKm: from ? round2(haversineKm(from, request.location)) : null,
  };
}

/** A quote as the requesting person sees it. `bhangarwala` is the quoting User. */
const quoteView = (quote, bhangarwala) => ({
  id: quote.id,
  requestId: quote.requestId.toString(),
  bhangarwalaId: quote.bhangarwalaId.toString(),
  bhangarwala: { name: bhangarwala.name, avatar: bhangarwala.avatarUrl },
  price: quote.price,
  etaMinutes: quote.etaMinutes,
  distanceKm: quote.distanceKm,
  status: quote.status,
});

/** A request as its owner sees it: everything except who was notified. */
const ownerRequestView = (request) => {
  const json = request.toJSON();
  delete json.notifiedBhangarwalaIds;
  return json;
};

module.exports = {
  roundCoord,
  round2,
  onlineBhangarwalaFilter,
  locationOf,
  requestCard,
  quoteView,
  ownerRequestView,
};
