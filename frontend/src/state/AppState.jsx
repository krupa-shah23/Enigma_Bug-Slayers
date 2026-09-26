import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { COLLECTORS, makeSplit, seed, splitBasis } from '../data/seed.js';
import { TODAY, fmtDate, inr, uid, variancePct } from '../lib/format.js';

// Everything here is local, in-browser state. No network. Timers stand in for socket events.

const STORAGE_KEY = 'rewaste-demo-state';
const SEED_VERSION = seed().version;

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.version === SEED_VERSION) return parsed;
    }
  } catch { /* fall through to seed */ }
  return seed();
};

const CATEGORY_RATE = { 'E-waste': 80, 'Metals & Brass': 300, 'Paper & Cardboard': 9, Plastics: 14, 'Glass & Bottles': 3, 'Other Scrap': 10 };
const MATERIAL_KEY = { 'Compost / Wet Waste': 'compost', 'Dry Recyclables': 'dry', 'E-waste': 'ewaste', 'E-Waste': 'ewaste', Hazardous: 'haz' };
const SHORT_MATERIAL = { 'Compost / Wet Waste': 'Compost', 'Dry Recyclables': 'Dry Recyclables', 'E-Waste': 'E-Waste', 'Paper & Cardboard': 'Paper', Hazardous: 'Hazardous' };
const round5 = (n) => Math.max(5, Math.round(n / 5) * 5);

const AppContext = createContext(null);
const firedOnce = new Set();

// Stand-in for a socket event: runs fn once per session, `delay` ms after the screen mounts.
export function useLiveOnce(key, delay, fn, enabled = true) {
  const latest = useRef(fn);
  latest.current = fn;
  useEffect(() => {
    if (!enabled || firedOnce.has(key)) return undefined;
    const id = window.setTimeout(() => { firedOnce.add(key); latest.current(); }, delay);
    return () => window.clearTimeout(id);
  }, [key, delay, enabled]);
}

export const useApp = () => useContext(AppContext);
export const collectorOf = (id) => COLLECTORS[id];

export function AppProvider({ children }) {
  const [state, setState] = useState(load);
  const [toasts, setToasts] = useState([]);
  const ref = useRef(state);
  const scheduled = useRef(new Set());
  const actionsRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* storage unavailable */ }
  }, [state]);

  const commit = useCallback((fn) => {
    const next = fn(ref.current);
    ref.current = next;
    setState(next);
  }, []);

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const toast = useCallback((text, opts = {}) => {
    const id = uid('t');
    setToasts((t) => [...t.slice(-3), { id, text, tone: 'success', ...opts }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), opts.ttl ?? 4800);
  }, []);

  const notify = useCallback((role, n, { silent = false } = {}) => {
    const item = { id: uid('n'), time: 'Just now', read: false, ...n };
    commit((s) => ({ ...s, notifications: { ...s.notifications, [role]: [item, ...s.notifications[role]].slice(0, 12) } }));
    if (!silent && ref.current.session.role === role) toast(n.text, { title: n.title, icon: n.icon, tone: 'live', to: n.to });
  }, [commit, toast]);

  if (!actionsRef.current) actionsRef.current = {};
  const A = actionsRef.current;

  // Rebuilt each render so closures stay fresh, but the object identity is stable.
  Object.assign(A, {
    toast,
    notify,
    dismissToast,

    // ---- session ----
    login(role) { commit((s) => ({ ...s, session: { role } })); },
    logout() { commit((s) => ({ ...s, session: { role: null } })); toast('You have been signed out.', { tone: 'info' }); },
    resetDemo() {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
      scheduled.current.clear();
      firedOnce.clear();
      commit(() => seed());
      toast('Demo data reset to its starting point.', { tone: 'info' });
    },
    markRead(role) {
      commit((s) => ({ ...s, notifications: { ...s.notifications, [role]: s.notifications[role].map((n) => ({ ...n, read: true })) } }));
    },
    clearNotifications(role) {
      commit((s) => ({ ...s, notifications: { ...s.notifications, [role]: [] } }));
    },
    updateProfile(role, patch) {
      commit((s) => ({ ...s, users: { ...s.users, [role]: { ...s.users[role], ...patch } } }));
    },

    // ---- events ----
    rsvp(id) {
      const ev = ref.current.events.find((e) => e.id === id);
      const going = !ev.going;
      commit((s) => ({ ...s, events: s.events.map((e) => (e.id === id ? { ...e, going, rsvps: e.rsvps + (going ? 1 : -1) } : e)) }));
      toast(going ? `You're on the attendee list for ${ev.title}.` : `RSVP removed for ${ev.title}.`, { tone: going ? 'success' : 'info' });
    },
    createEvent(ev, by = 'Person') {
      const created = { id: uid('ev'), societyId: 'gvh', rsvps: 0, going: false, status: 'active', ...ev };
      commit((s) => ({ ...s, events: [...s.events, created] }));
      toast(`"${created.title}" published. Residents have been notified.`);
      if (by !== 'Person' && (created.societyId === 'gvh' || created.societyId === 'all')) {
        notify('Person', { title: 'New event announced', text: `${created.title} on ${created.date}.`, icon: 'event', to: '/home' });
      }
    },
    updateEvent(id, patch) {
      commit((s) => ({ ...s, events: s.events.map((e) => (e.id === id ? { ...e, ...patch } : e)) }));
      toast('Event updated successfully.');
    },
    setEventStatus(id, status) {
      commit((s) => ({ ...s, events: s.events.map((e) => (e.id === id ? { ...e, status } : e)) }));
      toast(status === 'cancelled' ? 'Event cancelled. Registered residents will be notified.' : 'Event reinstated.', { tone: status === 'cancelled' ? 'info' : 'success' });
    },

    // ---- society (person) ----
    logContribution({ category, kg }) {
      const key = MATERIAL_KEY[category] || 'dry';
      commit((s) => ({
        ...s,
        contributions: [{ id: uid('c'), date: TODAY, category, kg }, ...s.contributions],
        personHistory: [{ id: uid('h'), type: 'contribution', date: TODAY, title: `Doorstep Weigh-in: ${category}`, sub: 'Logged from resident portal • Awaiting batch reconciliation', amount: `${kg} kg`, status: 'Verified' }, ...s.personHistory],
        society: { ...s.society, material: { ...s.society.material, [key]: s.society.material[key] + kg } },
      }));
      toast(`Weigh-in captured: ${kg} kg of ${category} added to your ledger.`);
    },
    joinSociety(id) {
      const soc = ref.current.societies.find((x) => x.id === id);
      commit((s) => ({ ...s, joinRequests: [...new Set([...s.joinRequests, id])] }));
      toast(`Membership request sent to ${soc.name}'s committee.`);
    },
    saveSocietySettings({ frequency }) {
      commit((s) => ({ ...s, society: { ...s.society, frequency }, societies: s.societies.map((x) => (x.id === 'gvh' ? { ...x, freq: frequency } : x)) }));
      toast(`Collection frequency set to ${frequency}. Logistics contractors notified.`);
    },
    setSurge(date, mode) {
      commit((s) => ({ ...s, society: { ...s.society, surgeDate: date, surgeAccepted: true } }));
      toast(mode === 'accept' ? `Extra pickup scheduled for ${fmtDate(date)}. Logistics contractors notified.` : `Surge pickup moved to ${fmtDate(date)}.`);
    },
    setTreasurer(residentId) {
      const s0 = ref.current;
      const pick = s0.residents.find((r) => r.id === residentId);
      const old = s0.societies.find((x) => x.id === 'gvh').treasurer;
      commit((s) => ({
        ...s,
        residents: [...s.residents.filter((r) => r.id !== residentId), { id: uid('r'), name: old.name, flat: s.society.treasurerFlat, phone: old.phone }],
        society: { ...s.society, treasurerFlat: pick.flat, treasurerNote: `Last amended ${TODAY} by CP` },
        societies: s.societies.map((x) => (x.id === 'gvh' ? { ...x, treasurer: { name: pick.name, role: 'Treasurer', phone: pick.phone, email: `${pick.name.split(' ')[0].toLowerCase()}.treasurer@greenvalley.org` } } : x)),
      }));
      toast(`${pick.name} is now the designated Treasurer.`);
    },
    acceptContract(id) {
      const c = ref.current.contracts.find((x) => x.id === id);
      commit((s) => ({ ...s, contracts: s.contracts.map((x) => (x.id === id ? { ...x, status: 'Active', last: 'Awaiting first pickup' } : x)) }));
      toast(`Contract accepted: ${c.material} (${c.qty.toLocaleString('en-IN')} kg/mo) is now active.`);
      notify('Ngo', { title: 'Contract accepted', text: `Green Valley Heights accepted ${c.material.split(' /')[0]} contract (${c.qty.toLocaleString('en-IN')} kg/mo).`, icon: 'check_circle', to: '/ngo/contracts' });
    },
    registerSociety({ name, address, frequency }) {
      const cpUser = ref.current.users.Person;
      const society = {
        id: uid('soc').toLowerCase(), name, short: address.split(',').slice(0, 2).join(','), address, city: 'Gurugram', ward: 'Municipal Ward 14', trust: null, freq: frequency, contracts: 0, households: 0, compliant: 0, flags: 0, totalKg: 0,
        cp: { name: cpUser.name, role: 'Committee President', phone: cpUser.phone, email: cpUser.email }, treasurer: { name: 'To be designated', role: 'Treasurer', phone: '—', email: '—' },
        monthly: { compost: 0, dry: 0, ewaste: 0, haz: 0 }, flagHistory: [],
      };
      commit((s) => ({ ...s, societies: [...s.societies, society] }));
      toast(`${name} registered. It now appears in the society directory.`);
      notify('Ngo', { title: 'New society registered', text: `${name} joined the network and is awaiting a first contract.`, icon: 'apartment', to: '/ngo/societies' });
    },

    // ---- exchange ----
    postRequest({ desc, category, kg, photoName }) {
      const lots = ref.current.lots;
      const n = lots.length;
      const detected = Number((desc.match(/(\d+(?:\.\d+)?)\s*kg/i) || [])[1]);
      const weight = kg || detected || 10;
      const rate = CATEGORY_RATE[category] || 10;
      const words = desc.replace(/[.,].*$/, '').split(/\s+/).slice(0, 5).join(' ');
      const lot = {
        id: `EX-${4102 + n}`, reqId: `REQ-2025-0${915 + n}`, title: words ? words.charAt(0).toUpperCase() + words.slice(1) : `${category} Lot`, category, kg: weight, desc,
        items: desc.slice(0, 60), grade: 'Standard Scrap', owner: 'Ananya Sharma', ownerId: 'ananya', flat: 'Flat C-402', address: 'Plot 14, Riverside Ave, Sector 5', dist: 0.9, expires: '30 mins left', posted: 'Just now',
        status: 'open', jobId: null, suggested: round5(weight * rate), photoCount: photoName ? 1 : 0,
        sim: [
          { collectorId: 'ramesh', price: round5(weight * rate), eta: 20, delay: 3000 },
          { collectorId: 'surender', price: round5(weight * rate * 0.9), eta: 25, delay: 6500 },
          { collectorId: 'modern', price: round5(weight * rate * 0.82), eta: 45, delay: 10500 },
        ],
      };
      commit((s) => ({ ...s, lots: [lot, ...s.lots] }));
      notify('Bhangarwala', { title: 'New lot nearby', text: `${category} Lot #${lot.id} (${weight} kg) was broadcast 0.9 km from you.`, icon: 'cell_tower', to: '/bhangarwala/requests' }, { silent: true });
      toast(`${lot.reqId} posted. Broadcasting to 14 collectors within 5 km.`);
      A.startSim(lot.id);
      return lot;
    },
    // Fires the pending simulated collector quotes for a lot (stands in for socket "new quote" events).
    startSim(lotId) {
      const lot = ref.current.lots.find((l) => l.id === lotId);
      if (!lot || lot.status !== 'open') return;
      lot.sim.forEach((entry) => {
        const key = `${lotId}:${entry.collectorId}`;
        if (scheduled.current.has(key)) return;
        scheduled.current.add(key);
        window.setTimeout(() => A.addQuote(lotId, entry.collectorId, entry.price, entry.eta), entry.delay);
      });
    },
    addQuote(lotId, collectorId, price, eta) {
      const lot = ref.current.lots.find((l) => l.id === lotId);
      if (!lot || lot.status !== 'open') return false;
      if (ref.current.quotes.some((q) => q.lotId === lotId && q.collectorId === collectorId)) return false;
      const quote = { id: uid('q'), lotId, collectorId, price, eta, state: 'open', at: 'Just now' };
      commit((s) => ({ ...s, quotes: [...s.quotes, quote], lots: s.lots.map((l) => (l.id === lotId ? { ...l, sim: l.sim.filter((e) => e.collectorId !== collectorId) } : l)) }));
      if (lot.ownerId === 'ananya') {
        notify('Person', { title: 'Socket Event S02', text: `New quote received from ${COLLECTORS[collectorId].name} (${inr(price)}, ETA ${eta} mins)`, icon: 'bolt', to: `/exchange/${lot.reqId}/quotes` });
      }
      return true;
    },
    submitQuote(lotId, price) {
      const ok = A.addQuote(lotId, 'ramesh', price, 15);
      if (ok) toast(`Quote of ${inr(price)} submitted. Awaiting resident selection.`);
    },
    selectQuote(lotId, quoteId) {
      const s0 = ref.current;
      const lot = s0.lots.find((l) => l.id === lotId);
      const q = s0.quotes.find((x) => x.id === quoteId);
      const jobId = `JOB-${8841 + s0.jobs.length}`;
      const job = {
        id: jobId, lotId, collectorId: q.collectorId, resident: lot.owner, phone: s0.users.Person.phone, address: `${lot.address}, Block C Gate`, title: `${lot.title} Pickup`, desc: lot.desc, declaredKg: lot.kg,
        price: q.price, step: 0, etaMin: q.eta, distKm: lot.dist, route: 'A-14', proposal: null, dispute: null, closed: false,
      };
      commit((s) => ({
        ...s,
        jobs: [...s.jobs, job],
        lots: s.lots.map((l) => (l.id === lotId ? { ...l, status: 'accepted', jobId, sim: [] } : l)),
        quotes: s.quotes.map((x) => (x.lotId !== lotId ? x : { ...x, state: x.id === quoteId ? 'accepted' : 'declined' })),
      }));
      toast(`Quote accepted. ${COLLECTORS[q.collectorId].name} is on the way.`);
      if (q.collectorId === 'ramesh') {
        notify('Bhangarwala', { title: 'Quote accepted', text: `${lot.owner} accepted your ${inr(q.price)} quote for Lot #${lotId}. Job ${jobId} is live.`, icon: 'task_alt', to: '/bhangarwala/active-job' }, { silent: true });
      }
      return jobId;
    },
    advanceJob(jobId, step) {
      const job = ref.current.jobs.find((j) => j.id === jobId);
      if (!job || step <= job.step) return;
      const lot = ref.current.lots.find((l) => l.id === job.lotId);
      const collector = COLLECTORS[job.collectorId];
      const finalKg = job.finalKg ?? job.declaredKg;
      commit((s) => ({
        ...s,
        jobs: s.jobs.map((j) => (j.id === jobId ? { ...j, step, etaMin: 0, distKm: 0, closed: step >= 3 } : j)),
        ...(step >= 3 ? {
          lots: s.lots.map((l) => (l.id === job.lotId ? { ...l, status: 'completed' } : l)),
          bhang: job.collectorId === 'ramesh' ? {
            ...s.bhang,
            history: [{ id: uid('bh'), date: TODAY, item: `${lot.title} (${finalKg} kg)`, resident: job.resident, amount: job.price }, ...s.bhang.history],
            earnings: s.bhang.earnings + job.price, runs: s.bhang.runs + 1,
          } : s.bhang,
          personHistory: [{ id: uid('h'), type: 'p2p', date: TODAY, title: `Lot #${lot.id}: ${lot.title} (Sold to ${collector.name})`, sub: 'Direct peer trade • Handover confirmed at Block C gate', amount: `+${inr(job.price)}`, status: 'Completed' }, ...s.personHistory],
        } : {}),
      }));
      const text = [null, `Collector ${collector.name} has arrived at your gate.`, `${collector.name} weighed and picked up Lot #${lot.id}.`, `Pickup complete. ${inr(job.price)} released from escrow.`][step];
      notify('Person', { title: step >= 3 ? 'Pickup completed' : 'Live Dispatch', text, icon: step >= 3 ? 'task_alt' : 'local_shipping', to: `/exchange/${jobId}/tracking` });
    },
    // Simulated collector movement: one "minute" of ETA per tick.
    tickJob(jobId) {
      const job = ref.current.jobs.find((j) => j.id === jobId);
      if (!job || job.step !== 0 || job.etaMin <= 0) return;
      const etaMin = job.etaMin - 1;
      const distKm = Math.max(0, Math.round((job.distKm - job.distKm / job.etaMin) * 100) / 100);
      const nearNow = distKm <= 0.5 && !job.near;
      commit((s) => ({ ...s, jobs: s.jobs.map((j) => (j.id === jobId ? { ...j, etaMin, distKm, near: j.near || nearNow } : j)) }));
      if (nearNow && etaMin > 0) notify('Person', { title: 'Socket Event S05', text: `Collector ${COLLECTORS[job.collectorId].name} is 500m away. Please keep scrap lot ready at gate.`, icon: 'bolt', to: `/exchange/${jobId}/tracking` });
      if (etaMin === 0) A.advanceJob(jobId, 1);
    },
    openDispute(jobId, { reason, actualKg, note }) {
      const job = ref.current.jobs.find((j) => j.id === jobId);
      const adjusted = Math.round((job.price / job.declaredKg) * actualKg);
      commit((s) => ({ ...s, jobs: s.jobs.map((j) => (j.id === jobId ? { ...j, dispute: { reason, actualKg, note, adjusted, status: 'held' } } : j)) }));
      toast(`Dispute submitted. Escrow of ${inr(job.price)} is on hold until both sides agree.`, { tone: 'info' });
      notify('Bhangarwala', { title: 'Resident raised a dispute', text: `${job.resident} reported: ${reason}. Escrow is on hold.`, icon: 'gavel', to: '/bhangarwala/active-job' }, { silent: true });
    },
    resolveDispute(jobId, accept) {
      const job = ref.current.jobs.find((j) => j.id === jobId);
      if (!job.dispute) return;
      commit((s) => ({
        ...s,
        jobs: s.jobs.map((j) => (j.id === jobId ? { ...j, price: accept ? j.dispute.adjusted : j.price, finalKg: accept ? j.dispute.actualKg : j.finalKg, dispute: { ...j.dispute, status: accept ? 'resolved' : 'rejected' } } : j)),
      }));
      toast(accept ? `Dispute resolved at ${inr(job.dispute.adjusted)}. Escrow released.` : 'Dispute declined. Original terms stand pending mediator review.', { tone: accept ? 'success' : 'info' });
      notify('Person', { title: 'Dispute update', text: accept ? `Collector accepted the adjusted payout of ${inr(job.dispute.adjusted)}.` : 'Collector declined the adjustment; mediator review requested.', icon: 'gavel', to: `/exchange/${jobId}/tracking` }, { silent: true });
    },
    proposeAdjustment(jobId, { kg, reason, action }) {
      const job = ref.current.jobs.find((j) => j.id === jobId);
      const lot = ref.current.lots.find((l) => l.id === job.lotId);
      if (action === 'cancel') {
        commit((s) => ({
          ...s,
          jobs: s.jobs.map((j) => (j.id === jobId ? { ...j, closed: true, cancelled: true } : j)),
          lots: s.lots.map((l) => (l.id === job.lotId ? { ...l, status: 'open', jobId: null } : l)),
        }));
        toast('Pickup cancelled. Lot released back to the exchange.', { tone: 'info' });
        notify('Person', { title: 'Pickup cancelled', text: `${COLLECTORS[job.collectorId].name} released Lot #${lot.id} back to the exchange (${reason}).`, icon: 'cancel', to: '/exchange' }, { silent: true });
        return;
      }
      const amount = Math.round((job.price / job.declaredKg) * kg);
      commit((s) => ({ ...s, jobs: s.jobs.map((j) => (j.id === jobId ? { ...j, proposal: { kg, amount, reason, status: 'pending' } } : j)) }));
      toast(`Adjusted proposal of ${inr(amount)} sent to ${job.resident}.`);
      notify('Person', { title: 'Revised weigh-in proposal', text: `${COLLECTORS[job.collectorId].name} proposes ${inr(amount)} for ${kg} kg (${reason}).`, icon: 'scale', to: `/exchange/${jobId}/tracking` }, { silent: true });
    },
    respondProposal(jobId, accept) {
      const job = ref.current.jobs.find((j) => j.id === jobId);
      const p = job.proposal;
      commit((s) => ({
        ...s,
        jobs: s.jobs.map((j) => (j.id === jobId ? { ...j, price: accept ? p.amount : j.price, finalKg: accept ? p.kg : j.finalKg, proposal: { ...p, status: accept ? 'accepted' : 'declined' } } : j)),
      }));
      toast(accept ? `Adjusted payout of ${inr(p.amount)} accepted.` : 'Proposal declined. The collector has been notified.', { tone: accept ? 'success' : 'info' });
      notify('Bhangarwala', { title: accept ? 'Proposal accepted' : 'Proposal declined', text: accept ? `${job.resident} accepted the adjusted payout of ${inr(p.amount)}.` : `${job.resident} declined the revised weigh-in.`, icon: accept ? 'task_alt' : 'cancel', to: '/bhangarwala/active-job' }, { silent: true });
    },
    setOnline(online) {
      commit((s) => ({ ...s, bhang: { ...s.bhang, online } }));
      toast(online ? 'You are online and visible to residents.' : 'You are offline. New lots will not be broadcast to you.', { tone: 'info' });
    },
    // Simulated broadcast of a brand-new lot near the collector.
    broadcastLot() {
      if (ref.current.lots.some((l) => l.id === 'EX-4101')) return;
      const lot = { id: 'EX-4101', reqId: 'REQ-2025-0901', title: 'Old Newspapers & Magazines', category: 'Paper & Cardboard', kg: 40, desc: 'Bundled newspapers and magazines, dry.', items: 'Tied newspaper bundles, magazines', grade: 'Standard Scrap', owner: 'Rahul Mehta', ownerId: 'rahul', flat: 'Flat A-305', address: 'Block A, Green Valley Heights', dist: 0.7, expires: '25m left', posted: 'Just now', status: 'open', jobId: null, suggested: 320, photoCount: 2, sim: [] };
      commit((s) => ({ ...s, lots: [...s.lots, lot] }));
      notify('Bhangarwala', { title: 'Live Broadcast', text: 'New P2P scrap request broadcast: Paper Lot #EX-4101 (40 kg) nearby.', icon: 'cell_tower', to: '/bhangarwala/requests' });
    },

    // ---- NGO ----
    offerContract({ societyId, material, qty, rate }) {
      const n = ref.current.contracts.length + 1;
      const contract = { id: `CT-2025-${String(n).padStart(2, '0')}`, societyId, material, qty, rate, status: 'Offered', last: 'Pending Initial' };
      const soc = ref.current.societies.find((x) => x.id === societyId);
      commit((s) => ({ ...s, contracts: [contract, ...s.contracts] }));
      toast(`Contract offer sent to ${soc.name}: ${material}, ${qty.toLocaleString('en-IN')} kg/mo at ${inr(rate, 2)}/kg.`);
      if (societyId === 'gvh') {
        notify('Person', { title: 'Contract proposal received', text: `EcoAction India Foundation offered ${material} terms for ${qty.toLocaleString('en-IN')} kg/mo.`, icon: 'handshake', to: '/my-society/settings' }, { silent: true });
      }
    },
    updateContract(id, patch) {
      commit((s) => ({ ...s, contracts: s.contracts.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));
      toast(`Contract ${id} terms updated and sent for signature.`);
    },
    setContractStatus(id, status) {
      commit((s) => ({ ...s, contracts: s.contracts.map((c) => (c.id === id ? { ...c, status } : c)) }));
      toast(status === 'Cancelled' ? `Contract ${id} cancelled.` : `Contract ${id} marked ${status.toLowerCase()}.`, { tone: status === 'Cancelled' ? 'info' : 'success' });
    },
    submitWeighIn(batchId, actual) {
      const batch = ref.current.batches.find((b) => b.id === batchId);
      const variance = variancePct(batch.promised, actual);
      const flagged = variance <= -10;
      commit((s) => ({
        ...s,
        batches: s.batches.map((b) => (b.id === batchId ? { ...b, actual, weighed: true, status: 'Weighed' } : b)),
        flags: flagged ? [{ id: uid('f'), societyId: batch.societyId, status: 'Action Required', text: `Flagged: Actual ${actual.toLocaleString('en-IN')} kg vs Promised ${batch.promised.toLocaleString('en-IN')} kg ${SHORT_MATERIAL[batch.material] || batch.material}`, variance: `${variance.toFixed(0)}% variance`, date: TODAY, tone: 'danger' }, ...s.flags] : s.flags,
        societies: flagged ? s.societies.map((x) => (x.id === batch.societyId ? { ...x, flags: x.flags + 1 } : x)) : s.societies,
      }));
      if (flagged) {
        toast(`Weight variance flagged (${variance.toFixed(1)}%). Society committee notified.`, { tone: 'warn' });
        if (batch.societyId === 'gvh') notify('Person', { title: 'Weigh-in flag logged', text: `${batch.material} batch ${batchId}: ${actual} kg received vs ${batch.promised} kg promised.`, icon: 'flag', to: '/my-society' }, { silent: true });
      } else toast('Weigh-in record locked to the ledger.');
    },
    triggerPayment(batchId) {
      const batch = ref.current.batches.find((b) => b.id === batchId);
      const amount = Math.round(batch.actual * batch.rate * 100) / 100;
      const pay = { id: uid('PAY'), date: TODAY, societyId: batch.societyId, contractId: batch.contractId, label: `#${batch.contractId} (${SHORT_MATERIAL[batch.material] || batch.material})`, batch: batchId, amount, status: 'Paid', split: makeSplit(batch.societyId, amount), totalKg: (splitBasis[batch.societyId] || []).reduce((a, r) => a + r.kg, 0) };
      commit((s) => ({
        ...s,
        batches: s.batches.map((b) => (b.id === batchId ? { ...b, paid: true, status: 'Paid' } : b)),
        payments: [pay, ...s.payments],
        contracts: s.contracts.map((c) => (c.id === batch.contractId ? { ...c, last: TODAY } : c)),
        societies: s.societies.map((x) => (x.id === batch.societyId ? { ...x, totalKg: x.totalKg + batch.actual } : x)),
      }));
      toast(`Disbursement of ${inr(amount)} queued to the escrow smart contract.`);
      A.creditSociety(pay);
    },
    payUnpaid(paymentId) {
      const pay = ref.current.payments.find((p) => p.id === paymentId);
      commit((s) => ({ ...s, payments: s.payments.map((p) => (p.id === paymentId ? { ...p, status: 'Paid' } : p)) }));
      toast(`Payment of ${inr(pay.amount)} to ${ref.current.societies.find((x) => x.id === pay.societyId).name} sent.`);
      A.creditSociety(pay);
    },
    // A settled payout to Green Valley Heights shows up on the resident's side too.
    creditSociety(pay) {
      if (pay.societyId !== 'gvh') return;
      const you = pay.split.find((r) => r.you);
      const credit = you ? you.share : 0;
      commit((s) => ({
        ...s,
        society: {
          ...s.society,
          creditThisCycle: Math.round((s.society.creditThisCycle + credit) * 100) / 100,
          yieldTotal: Math.round((s.society.yieldTotal + credit) * 100) / 100,
          payouts: [{ id: `DISB-${pay.id}`, date: TODAY, status: 'Disbursed', total: pay.amount, credit, paymentId: pay.id }, ...s.society.payouts],
        },
        personHistory: [{ id: uid('h'), type: 'payout', date: TODAY, title: 'Society Escrow Share Payout', sub: `Batch #${pay.batch} • ${pay.label}`, amount: `+${inr(credit)} Credit`, status: 'Disbursed', paymentId: pay.id }, ...s.personHistory],
      }));
      notify('Person', { title: 'Transaction Settled', text: `Payment completed: ${inr(pay.amount)} distributed to society ledger.`, icon: 'check_circle', to: '/my-society' }, { silent: true });
    },
    resolveFlag(id) {
      commit((s) => ({ ...s, flags: s.flags.map((f) => (f.id === id ? { ...f, status: 'Resolved', tone: 'warn' } : f)) }));
      toast('Flag marked as resolved.');
    },
    setVerificationDoc(name, size) { commit((s) => ({ ...s, verification: { ...s.verification, docName: name, docSize: size } })); },
    submitVerification() {
      commit((s) => ({ ...s, verification: { ...s.verification, status: 'Under Review' } }));
      toast('Verification documents submitted for statutory review.');
    },
    approveVerification() {
      commit((s) => ({ ...s, verification: { ...s.verification, status: 'Verified', reviewer: 'Ministry Compliance Desk' } }));
      toast('Verification approved. Zero-landfill procurement authority granted.');
    },
  });

  const value = useMemo(() => ({ state, toasts, actions: A }), [state, toasts, A]);
  const role = state.session.role;
  const derived = useMemo(() => ({ role, me: role ? state.users[role] : null }), [role, state.users]);

  return <AppContext.Provider value={{ ...value, ...derived }}>{children}</AppContext.Provider>;
}
