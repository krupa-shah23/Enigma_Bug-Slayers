import { useState } from 'react';
import { useApp, useLiveOnce } from '../../state/AppState.jsx';
import { FREQUENCIES } from '../../data/seed.js';
import { Avatar, Badge, Field, Icon, Modal, PageHeader, StatusBadge } from '../../components/ui.jsx';
import { fmtDate, inr } from '../../lib/format.js';

const MATERIAL_ICON = { 'Dry Recyclables': 'recycling', 'Compost / Wet Waste': 'compost', 'E-Waste': 'devices_other', 'Paper & Cardboard': 'description' };

export default function SocietySettings() {
  const { state, actions } = useApp();
  const soc = state.society;
  const gvh = state.societies.find((s) => s.id === 'gvh');
  const contracts = state.contracts.filter((c) => c.societyId === 'gvh');
  const [freq, setFreq] = useState(soc.frequency);
  const [surge, setSurge] = useState(soc.surgeDate);
  const [pickTreasurer, setPickTreasurer] = useState(false);
  const [review, setReview] = useState(null);
  const [reg, setReg] = useState({ name: '', address: '', freq: 'Weekly', lat: '28.4595° N', lng: '77.0266° E' });
  const [located, setLocated] = useState(false);
  const [locating, setLocating] = useState(false);
  const offered = contracts.find((c) => c.status === 'Offered');

  useLiveOnce('settings-proposal', 3000, () => actions.notify('Person', { title: 'S07 Event', text: `EcoAction India Foundation submitted terms for ${offered.qty.toLocaleString('en-IN')} kg/mo ${offered.material}.`, icon: 'bolt', to: '/my-society/settings' }), !!offered);

  const checkLocation = () => {
    setLocating(true);
    window.setTimeout(() => { setLocating(false); setLocated(true); actions.toast('Location verified inside Municipal Ward 14 service area.'); }, 700);
  };
  const register = (e) => {
    e.preventDefault();
    actions.registerSociety({ name: reg.name.trim(), address: reg.address.trim(), frequency: reg.freq });
    setReg({ name: '', address: '', freq: 'Weekly', lat: '28.4595° N', lng: '77.0266° E' });
    setLocated(false);
  };

  return (
    <main className="page stack">
      <PageHeader
        eyebrow="Role Scope: Committee President (CP)"
        title="Society Settings & Governance"
        subtitle="Manage collection parameters, committee designations, and upcycling agreements."
        actions={<Badge tone="success" icon="verified_user">Verified Administrative Unit</Badge>}
      />

      {/* Surge forecast */}
      <section className="card flex flex-col gap-space-lg lg:flex-row lg:items-center">
        <div className="flex-1 space-y-space-sm">
          <div className="flex flex-wrap items-center gap-space-sm"><Icon name="crisis_alert" className="text-amber-600" size={22} /><h2 className="h-card">Seasonal Surge Forecast</h2><Badge tone="warn">Confidence: 94.2%</Badge></div>
          <p className="font-label-lg text-label-lg">Diwali Cleanup Surge Projected: Recommended extra pickup cycle on Nov 10, 2025.</p>
          <p className="muted">Historical volume shows a 48% influx of composite paper, cartons, and festive biodegradable matter.</p>
          {soc.surgeAccepted && <p className="flex items-center gap-1.5 font-label-lg text-label-lg text-primary"><Icon name="event_available" size={18} fill />Extra pickup scheduled for {fmtDate(soc.surgeDate)}</p>}
        </div>
        <div className="flex flex-col gap-space-sm sm:flex-row sm:items-end">
          <Field label="Pickup date"><input type="date" className="input sm:w-44" value={surge} onChange={(e) => setSurge(e.target.value)} /></Field>
          <button type="button" className="btn-secondary" onClick={() => actions.setSurge(surge, 'override')}>Override Date</button>
          <button type="button" className="btn-primary" onClick={() => { setSurge('2025-11-10'); actions.setSurge('2025-11-10', 'accept'); }}><Icon name="task_alt" size={18} />Accept Suggestion</button>
        </div>
      </section>

      <div className="grid gap-space-lg lg:grid-cols-3">
        {/* Governance */}
        <section className="card stack lg:col-span-2 !gap-space-md">
          <div><h2 className="h-section">Officer Governance Controls</h2><p className="muted">Regulated under Model Bye-Law Section 14A for Solid Waste Segregation.</p></div>
          <Field label="Collection Frequency" hint="Interval changes require 48-hour prior sync with logistics contractors.">
            <select className="input" value={freq} onChange={(e) => setFreq(e.target.value)}>{FREQUENCIES.map((f) => <option key={f}>{f}</option>)}</select>
          </Field>
          <div>
            <div className="mb-space-xs flex items-center justify-between"><span className="label">Treasurer Designation (CP-only privilege)</span><Badge tone="neutral" icon="lock">CP Permissioned</Badge></div>
            <div className="flex items-center gap-space-md rounded-xl border border-outline-variant/40 p-space-md">
              <Avatar name={gvh.treasurer.name} size={44} />
              <div className="min-w-0 flex-1"><p className="h-card">{gvh.treasurer.name}</p><p className="text-body-sm text-on-surface-variant">Elected Treasurer</p><p className="text-body-sm text-on-surface-variant">{gvh.treasurer.phone} • Society {soc.treasurerFlat}</p></div>
              <button type="button" aria-label="Change designated treasurer" title="Change designated treasurer" className="btn-secondary btn-sm" onClick={() => setPickTreasurer(true)}><Icon name="sync_alt" size={16} />Change</button>
            </div>
            <p className="mt-space-xs text-body-sm text-on-surface-variant">Authorized to sign disbursement escrow splits for raw bulk off-take.</p>
          </div>
          <div className="flex flex-col items-start justify-between gap-space-sm border-t border-outline-variant/40 pt-space-md sm:flex-row sm:items-center">
            <p className="flex items-center gap-1.5 text-body-sm text-on-surface-variant"><Icon name="history" size={16} />{soc.treasurerNote}</p>
            <button type="button" className="btn-primary" onClick={() => actions.saveSocietySettings({ frequency: freq })}><Icon name="save" size={18} />Save Parameters</button>
          </div>
        </section>

        {/* Metrics */}
        <section className="card flex flex-col gap-space-md">
          <p className="eyebrow">Network Metrics</p>
          <div className="flex items-end justify-between"><h2 className="h-section">Optimal Ledger Flow</h2><span className="font-display-lg text-display-lg font-bold text-primary">88%</span></div>
          <div>
            <h3 className="h-card">Community Segregation Index</h3>
            <p className="muted">{gvh.compliant}/{gvh.households} households compliant under wet/dry separation mandates.</p>
            <div className="mt-space-sm h-2 overflow-hidden rounded-full bg-surface-container-high"><div className="h-full rounded-full bg-primary-container" style={{ width: `${(gvh.compliant / gvh.households) * 100}%` }} /></div>
          </div>
          <p className="mt-auto flex items-start gap-1.5 text-body-sm text-on-surface-variant"><Icon name="warehouse" size={16} className="mt-0.5" />Staging Yard: {soc.stagingYard}</p>
        </section>
      </div>

      {/* Contracts */}
      <section className="card !p-0">
        <div className="flex flex-col justify-between gap-space-xs p-space-lg pb-space-md sm:flex-row sm:items-end">
          <div><h2 className="h-section">Material Contracts</h2><p className="muted">Active processing lines, monthly guaranteed tonnage thresholds, and off-take rates.</p></div>
          <span className="text-body-sm text-on-surface-variant">{contracts.length} Counterparties Synchronized</span>
        </div>
        <ul>
          {contracts.map((c) => (
            <li key={c.id} className="flex flex-col gap-space-md border-t border-outline-variant/40 px-space-lg py-space-md sm:flex-row sm:items-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-container-low text-primary-container"><Icon name={MATERIAL_ICON[c.material] || 'recycling'} size={24} /></span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-space-sm"><h3 className="h-card">EcoAction India Foundation</h3><StatusBadge status={c.status} />{c.status === 'Offered' && <Badge tone="info" icon="fiber_new">New Proposal</Badge>}</div>
                <p className="text-body-sm text-on-surface-variant">{c.material} • Tonnage: {c.qty.toLocaleString('en-IN')} kg/mo • Unit Rate: {inr(c.rate, 2)}/kg</p>
              </div>
              <div className="flex gap-space-sm">
                <button type="button" className="btn-secondary btn-sm" onClick={() => setReview(c)}>{c.status === 'Offered' ? 'Review' : 'Manage'}</button>
                {c.status === 'Offered' && <button type="button" className="btn-primary btn-sm" onClick={() => actions.acceptContract(c.id)}>Accept</button>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Register society */}
      <section className="card stack !gap-space-md">
        <div className="flex flex-col justify-between gap-space-xs sm:flex-row sm:items-end">
          <div><p className="eyebrow">Resident Desk Registry</p><h2 className="h-section">Register Society</h2><p className="muted">Enroll an affiliated residential cluster or sub-society into the regional circular collection grid.</p></div>
          <Badge tone="neutral">Draft Form S-101</Badge>
        </div>
        <form onSubmit={register} className="grid gap-space-md md:grid-cols-2">
          <Field label="Society Name"><input className="input" required value={reg.name} onChange={(e) => setReg({ ...reg, name: e.target.value })} placeholder="e.g. Pinecrest Residents Welfare Society" /></Field>
          <Field label="Collection Frequency"><select className="input" value={reg.freq} onChange={(e) => setReg({ ...reg, freq: e.target.value })}>{FREQUENCIES.map((f) => <option key={f}>{f}</option>)}</select></Field>
          <Field label="Address" className="md:col-span-2"><input className="input" required value={reg.address} onChange={(e) => setReg({ ...reg, address: e.target.value })} placeholder="Street address, Sector, City" /></Field>
          <div className="md:col-span-2">
            <div className="mb-space-xs flex items-center justify-between"><span className="label flex items-center gap-1"><Icon name="pin_drop" size={16} />Latitude / Longitude Geo-Coordinates</span>{located && <span className="flex items-center gap-1 font-label-md text-label-md text-primary"><Icon name="check_circle" size={16} fill />Verified Municipal Ward 14</span>}</div>
            <div className="flex flex-col gap-space-sm sm:flex-row">
              <input className="input" aria-label="Latitude" value={reg.lat} onChange={(e) => setReg({ ...reg, lat: e.target.value })} />
              <input className="input" aria-label="Longitude" value={reg.lng} onChange={(e) => setReg({ ...reg, lng: e.target.value })} />
              <button type="button" className="btn-secondary shrink-0" onClick={checkLocation} disabled={locating}><Icon name={locating ? 'progress_activity' : 'my_location'} size={18} className={locating ? 'animate-spin' : ''} />Check Location</button>
            </div>
          </div>
          <div className="md:col-span-2"><button type="submit" className="btn-primary" disabled={!reg.name.trim() || !reg.address.trim()}><Icon name="app_registration" size={18} />Register Society</button></div>
        </form>
      </section>

      <Modal open={pickTreasurer} onClose={() => setPickTreasurer(false)} icon="sync_alt" title="Change Designated Treasurer" subtitle="Choose a verified resident. This action is logged against your CP credentials.">
        <ul className="divide-y divide-outline-variant/40 rounded-lg border border-outline-variant/40">
          {state.residents.map((r) => (
            <li key={r.id} className="flex items-center gap-space-md p-space-md">
              <Avatar name={r.name} size={36} />
              <div className="flex-1"><p className="font-label-lg text-label-lg">{r.name}</p><p className="text-body-sm text-on-surface-variant">{r.flat} • {r.phone}</p></div>
              <button type="button" className="btn-primary btn-sm" onClick={() => { actions.setTreasurer(r.id); setPickTreasurer(false); }}>Designate</button>
            </li>
          ))}
        </ul>
      </Modal>

      <Modal open={!!review} onClose={() => setReview(null)} icon="description" title={review ? `Contract ${review.id}` : ''} subtitle="EcoAction India Foundation • Smart-protocol agreement"
        footer={review && review.status === 'Offered' ? <><button type="button" className="btn-secondary" onClick={() => setReview(null)}>Close</button><button type="button" className="btn-primary" onClick={() => { actions.acceptContract(review.id); setReview(null); }}>Accept Contract</button></> : <button type="button" className="btn-primary" onClick={() => setReview(null)}>Close</button>}>
        {review && (
          <dl className="grid gap-space-md sm:grid-cols-2">
            {[['Material', review.material], ['Status', review.status], ['Monthly Tonnage', `${review.qty.toLocaleString('en-IN')} kg`], ['Unit Rate', `${inr(review.rate, 2)} / kg`], ['Est. Monthly Payout', inr(review.qty * review.rate)], ['Last Collection', review.last]].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-surface-container-low/60 p-space-md"><dt className="eyebrow">{k}</dt><dd className="mt-1 font-headline-sm text-headline-sm">{v}</dd></div>
            ))}
          </dl>
        )}
      </Modal>
    </main>
  );
}
