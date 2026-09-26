// Demo "today" — every relative date in the seed data is anchored here.
export const TODAY = 'Nov 01, 2025';

export const inr = (n, decimals) => {
  const value = Number(n) || 0;
  const d = decimals ?? (Number.isInteger(value) ? 0 : 2);
  return '₹' + value.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
};

export const kg = (n) => `${Number(n).toLocaleString('en-IN', { maximumFractionDigits: 1 })} kg`;

export const trustTier = (score) => (score == null ? 'Unrated' : score >= 85 ? 'Tier A' : score >= 70 ? 'Tier B' : 'Tier C');

export const initials = (name = '') => name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();

export const variancePct = (promised, actual) => ((actual - promised) / promised) * 100;

export const pct = (n) => `${n > 0 ? '+' : ''}${n.toFixed(1).replace(/\.0$/, '')}%`;

export const uid = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// '2025-11-08' -> 'Nov 08, 2025'
export const fmtDate = (iso) => {
  const [y, m, d] = iso.split('-');
  return `${MONTHS[Number(m) - 1]} ${d}, ${y}`;
};
// 'Nov 08, 2025' -> '2025-11-08'
export const toInputDate = (label) => {
  const [mon, d, y] = label.replace(',', '').split(' ');
  return `${y}-${String(MONTHS.indexOf(mon) + 1).padStart(2, '0')}-${d}`;
};
// '14:30' -> '02:30 PM'
export const fmtTime = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return `${String(h % 12 || 12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};
// '02:30 PM' -> '14:30'
export const toInputTime = (label) => {
  const [hm, ap] = label.split(' ');
  let [h, m] = hm.split(':').map(Number);
  if (ap === 'PM' && h < 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};
