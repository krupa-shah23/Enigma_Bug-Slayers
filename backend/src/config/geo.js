/**
 * Geo constants and hardcoded service zones (PS6 3.1, 3.3).
 */

const SERVICE_ZONES = [
  { id: 'mumbai',    name: 'Mumbai Metropolitan Region', center: { lat: 19.076,  lng: 72.8777 }, radiusKm: 30 },
  { id: 'pune',      name: 'Pune',                       center: { lat: 18.5204, lng: 73.8567 }, radiusKm: 20 },
  { id: 'ahmedabad', name: 'Ahmedabad',                  center: { lat: 23.0225, lng: 72.5714 }, radiusKm: 20 },
  { id: 'delhi',     name: 'Delhi NCR',                  center: { lat: 28.6139, lng: 77.209  }, radiusKm: 35 },
  { id: 'bengaluru', name: 'Bengaluru',                  center: { lat: 12.9716, lng: 77.5946 }, radiusKm: 25 },
];

module.exports = {
  SERVICE_ZONES,
  DUPLICATE_RADIUS_M: 150, // societies closer than this are duplicates
  P2P_RADIUS_KM: 3,        // bhangarwalas notified within this radius
  ONLINE_WINDOW_MIN: 10,   // "online" = location ping within this window
};
