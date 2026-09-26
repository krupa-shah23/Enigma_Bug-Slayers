import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../state/AppState.jsx';
import { Avatar, Badge, EmptyState, Icon, MapCanvas, Modal, Pin, Pills, Stepper } from '../../components/ui.jsx';
import { inr } from '../../lib/format.js';

const STEPS = [{ label: 'Heading', icon: 'check' }, { label: 'Arrived', icon: 'pin_drop' }, { label: 'Picked up', icon: 'inventory_2' }, { label: 'Completed', icon: 'flag' }];
const ACTION = ['Mark Arrived at Gate', 'Confirm Weigh-in & Pickup', 'Complete Job & Collect Payout'];
const REASONS = ['Actual weight lower than resident declaration (Weigh-scale check)', 'Lot contaminated with unusable scrap/waste', 'Resident absent or items missing'];

export default function ActiveJob() {
  const { state, actions } = useApp();
  const jobs = state.jobs.filter((j) => j.collectorId === 'ramesh' && !j.closed);
  const [sel, setSel] = useState(null);
  const job = jobs.find((j) => j.id === sel) || jobs[0];
  const [dlg, setDlg] = useState(false);
  const [reason, setReason] = useState(0);
  const [kg, setKg] = useState('');
  const [action, setAction] = useState('adjust');
  const moving = job && job.step === 0 && job.etaMin > 0;

  useEffect(() => {
    if (!moving) return undefined;
    const id = window.setInterval(() => actions.tickJob(job.id), 2500);
    return () => window.clearInterval(id);
  }, [moving, job?.id, actions]);

  if (!job) return <main className="page-narrow"><div className="card"><EmptyState icon="local_shipping" title="No active job" text="Submit quotes on nearby lots. Accepted quotes become jobs here." /><div className="flex justify-center"><Link to="/bhangarwala/requests" className="btn-primary">Browse Requests</Link></div></div></main>;

  const lot = state.lots.find((l) => l.id === job.lotId);
  const rate = job.price / job.declaredKg;
  const val = Number(kg) || 0;
  const frac = job.step > 0 ? 0 : job.distKm / lot.dist;
  const open = () => { setKg(String(Math.round(job.declaredKg * 0.53 * 10) / 10)); setReason(0); setAction('adjust'); setDlg(true); };

  return (
    <main className="page stack">
      {jobs.length > 1 && <Pills value={job.id} onChange={setSel} options={jobs.map((j) => ({ value: j.id, label: j.id }))} />}
      <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-center">
        <div><h1 className="h-title">Active Job #{job.id}</h1><p className="muted mt-space-xs">{job.title}</p></div>
        <div className="flex items-center gap-space-md"><Badge tone="info">{['En Route', 'Arrived', 'Picked Up'][job.step]}</Badge>
          <button type="button" className="btn-primary btn-lg" onClick={() => actions.advanceJob(job.id, job.step + 1)}><Icon name="where_to_vote" size={20} />{ACTION[job.step]}</button></div>
      </div>
      {job.dispute && <section className="card flex flex-col gap-space-md border-amber-300 bg-amber-50 md:flex-row md:items-center"><Icon name="gavel" size={26} className="text-amber-700" /><div className="flex-1"><h2 className="h-card">Resident dispute {job.dispute.status}</h2><p className="text-body-md">{job.dispute.reason}. Scale reading {job.dispute.actualKg} kg → {inr(job.dispute.adjusted)}. Escrow on hold.</p></div>{job.dispute.status === 'held' && <div className="flex gap-space-sm"><button type="button" className="btn-secondary" onClick={() => actions.resolveDispute(job.id, false)}>Decline</button><button type="button" className="btn-primary" onClick={() => actions.resolveDispute(job.id, true)}>Accept {inr(job.dispute.adjusted)}</button></div>}</section>}
      {job.proposal && <p className="card flex items-center gap-space-sm !py-space-md text-body-md"><Icon name="scale" className="text-primary-container" />Your adjusted proposal of {inr(job.proposal.amount)} ({job.proposal.kg} kg) is <strong>{job.proposal.status}</strong>.</p>}

      <div className="grid items-start gap-space-lg lg:grid-cols-3">
        <section className="stack !gap-space-md lg:col-span-2">
          <div className="card"><Stepper steps={STEPS} active={job.step} /></div>
          <MapCanvas className="h-96">
            <Pin x={76} y={30} icon="location_on" label={`Plot 14 Gate`} tone="accent" />
            <Pin x={job.step > 0 ? 76 : 14 + (1 - frac) * 60} y={job.step > 0 ? 34 : 74 - (1 - frac) * 42} icon="local_shipping" label="Your Van" pulse={moving} />
            <div className="absolute left-space-md top-space-md z-20 rounded-lg bg-white px-space-md py-space-sm shadow"><p className="flex items-center gap-1 font-label-lg text-label-lg"><Icon name="near_me" size={16} className="text-primary" />ETA: {job.etaMin} mins</p><p className="text-body-sm text-on-surface-variant">{job.distKm.toFixed(1)} km remaining • 24 km/h</p></div>
          </MapCanvas>
          <p className="card flex items-center gap-space-md !py-space-md"><Icon name="turn_slight_right" className="text-primary-container" />Next turn: In 180m, turn slight right into Sector 5 Inner Ring Road. <Badge tone="success" className="ml-auto">Optimal Route</Badge></p>
        </section>
        <aside className="stack !gap-space-md">
          <section className="card stack !gap-space-sm"><p className="eyebrow">Resident Contact</p><div className="flex items-center gap-space-md"><Avatar name={job.resident} size={44} /><div className="flex-1"><h2 className="h-card">{job.resident}</h2><p className="text-body-sm text-on-surface-variant">{job.phone}</p></div><a href={`tel:${job.phone.replace(/\s/g, '')}`} aria-label="Call resident" className="btn-secondary btn-sm !px-2"><Icon name="phone" size={18} /></a></div>
            <p className="flex items-start gap-1.5 text-body-sm text-on-surface-variant"><Icon name="location_on" size={16} className="mt-0.5" />{job.address}</p></section>
          <section className="card stack !gap-space-sm"><p className="eyebrow">Lot Manifest • #{lot.id}</p><h2 className="h-card">{lot.title}</h2><p className="text-body-sm text-on-surface-variant">{job.desc}</p>
            <div className="flex justify-between border-t border-outline-variant/40 pt-space-sm"><span className="flex items-center gap-1 text-body-sm"><Icon name="scale" size={16} />{job.declaredKg} kg estimated</span><span className="font-headline-sm text-headline-sm text-primary">{inr(job.price)}</span></div>
            <p className="flex items-center gap-1.5 text-body-sm text-on-surface-variant"><Icon name="lock" size={16} />Direct digital payout on handover (escrow secured)</p>
            <button type="button" className="btn-danger" onClick={open} disabled={job.step === 0}><Icon name="warning" size={18} />Flag Material Mismatch / Renegotiate</button>
            {job.step === 0 && <p className="text-body-sm text-outline">Available once you arrive on site.</p>}</section>
        </aside>
      </div>

      <Modal open={dlg} onClose={() => setDlg(false)} icon="gavel" title="Field Material Mismatch & Renegotiation" subtitle={`Active Job #${job.id} • Resident: ${job.resident}`}
        footer={<><button type="button" className="btn-secondary" onClick={() => setDlg(false)}>Dismiss</button><button type="button" className="btn-primary" disabled={action === 'adjust' && val <= 0} onClick={() => { actions.proposeAdjustment(job.id, { kg: val, reason: REASONS[reason].split(' (')[0].toLowerCase(), action }); setDlg(false); }}><Icon name="send" size={18} />{action === 'adjust' ? `Send Adjusted Proposal (${inr(Math.round(rate * val))})` : 'Cancel Pickup & Release Lot'}</button></>}>
        <div className="stack !gap-space-md">
          <fieldset className="stack !gap-space-sm"><legend className="label mb-space-sm">1. Select Mismatch Reason</legend>{REASONS.map((r, i) => <label key={r} className="flex cursor-pointer items-start gap-space-sm rounded-lg border border-outline-variant/50 p-space-md"><input type="radio" name="mm" checked={reason === i} onChange={() => setReason(i)} className="mt-1 accent-[#195c28]" />{r}</label>)}</fieldset>
          <div className="grid gap-space-md sm:grid-cols-2"><div className="rounded-lg bg-surface-container-low/60 p-space-md"><p className="eyebrow">Declared Weight</p><p className="font-headline-md text-headline-md">{job.declaredKg} kg</p><p className="text-body-sm">Quoted: {inr(job.price)}</p></div><label className="rounded-lg bg-surface-container-low/60 p-space-md"><span className="eyebrow">Field Scale Net Weight (kg)</span><input className="input mt-1" type="number" step="0.1" value={kg} onChange={(e) => setKg(e.target.value)} /><span className="text-body-sm text-primary">Counter payout: {inr(Math.round(rate * val))} ({inr(rate, 2)}/kg)</span></label></div>
          <fieldset className="stack !gap-space-sm"><legend className="label mb-space-sm">2. Resolution Action</legend>
            {[['adjust', 'Request Resident Approval for Adjusted Payout', 'Recommended • Immediate escrow sync'], ['cancel', 'Cancel Pickup & Release Lot back to Exchange', 'No cancellation fee for verified mismatch']].map(([v, t, d]) => <label key={v} className="flex cursor-pointer items-start gap-space-sm rounded-lg border border-outline-variant/50 p-space-md"><input type="radio" name="res" checked={action === v} onChange={() => setAction(v)} className="mt-1 accent-[#195c28]" /><span><span className="block font-label-lg text-label-lg">{t}</span><span className="text-body-sm text-on-surface-variant">{d}</span></span></label>)}</fieldset>
        </div>
      </Modal>
    </main>
  );
}
