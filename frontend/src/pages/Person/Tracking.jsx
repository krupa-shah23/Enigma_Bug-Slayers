import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collectorOf, useApp } from '../../state/AppState.jsx';
import { Avatar, Badge, EmptyState, Icon, MapCanvas, Modal, Pin, Stepper } from '../../components/ui.jsx';
import { inr } from '../../lib/format.js';

const STEPS = [{ label: 'Heading', icon: 'check' }, { label: 'Arrived', icon: 'near_me' }, { label: 'Picked up', icon: 'inventory_2' }, { label: 'Completed', icon: 'task_alt' }];
const REASONS = [
  ['Actual weight significantly different from estimate', 'Discrepancy detected during gate weighing scale verification.'],
  ['Material category mismatch', 'Non-recyclable or hazardous items present in scrap parcel.'],
  ['Condition / contamination issue', 'Lot damaged, heavily wet, or contaminated.'],
  ['Collector arrived with incorrect rate proposal', 'Refusal to honor pre-agreed rates.'],
];

export default function Tracking() {
  const { jobId } = useParams();
  const { state, actions } = useApp();
  const job = state.jobs.find((j) => j.id === jobId);
  const lot = job && state.lots.find((l) => l.id === job.lotId);
  const [dialog, setDialog] = useState(false);
  const [reason, setReason] = useState(0);
  const [actual, setActual] = useState('');
  const [note, setNote] = useState('');

  const moving = job && job.step === 0 && job.etaMin > 0;
  useEffect(() => {
    if (!moving) return undefined;
    const id = window.setInterval(() => actions.tickJob(jobId), 2500);
    return () => window.clearInterval(id);
  }, [moving, jobId, actions]);

  if (!job) return <main className="page-narrow"><div className="card"><EmptyState icon="local_shipping" title="No such pickup" text="We couldn't find that job." /><div className="flex justify-center"><Link to="/exchange" className="btn-primary">Back to Active Requests</Link></div></div></main>;

  const c = collectorOf(job.collectorId);
  const frac = job.step > 0 ? 0 : job.distKm / lot.dist;
  const cx = 14 + (1 - frac) * 60;
  const cy = 74 - (1 - frac) * 42;
  const actualKg = Number(actual) || 0;
  const preview = Math.round((job.price / job.declaredKg) * actualKg);
  const done = job.step >= 3;
  const status = job.cancelled ? 'Cancelled' : ['En Route', 'Arrived', 'Picked Up', 'Completed'][job.step];

  const openDialog = () => { setActual(String(Math.round(job.declaredKg * 0.53 * 10) / 10)); setReason(0); setNote(''); setDialog(true); };
  const submitDispute = () => { actions.openDispute(job.id, { reason: REASONS[reason][0], actualKg, note }); setDialog(false); };

  return (
    <main className="page stack">
      <Link to="/exchange" className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-primary"><Icon name="arrow_back" size={18} />Back to Active Requests</Link>
      <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
        <div><h1 className="h-title">Live Pickup Tracking</h1><p className="muted mt-space-xs">Tracking Collector {c.name} • Route #{job.route} • Job {job.id}</p></div>
        <Badge tone={done ? 'success' : job.cancelled ? 'neutral' : 'info'} className="!px-3 !py-1.5 !text-label-md"><Icon name={done ? 'task_alt' : 'timer'} size={16} />{done ? 'Pickup completed' : job.cancelled ? 'Pickup cancelled' : job.step === 0 ? `Estimated Arrival: ${job.etaMin} mins (${job.distKm.toFixed(1)} km away)` : status}</Badge>
      </div>

      {job.proposal?.status === 'pending' && (
        <section className="card flex flex-col gap-space-md border-amber-300 bg-amber-50 md:flex-row md:items-center">
          <Icon name="scale" size={28} className="text-amber-700" />
          <div className="flex-1"><h2 className="h-card">Revised weigh-in proposal</h2><p className="text-body-md text-on-surface-variant">{c.name} weighed {job.proposal.kg} kg (declared {job.declaredKg} kg) and proposes {inr(job.proposal.amount)} instead of {inr(job.price)}. Reason: {job.proposal.reason}.</p></div>
          <div className="flex gap-space-sm"><button type="button" className="btn-secondary" onClick={() => actions.respondProposal(job.id, false)}>Decline</button><button type="button" className="btn-primary" onClick={() => actions.respondProposal(job.id, true)}>Accept {inr(job.proposal.amount)}</button></div>
        </section>
      )}
      {job.dispute && <section className="card flex items-start gap-space-md"><Icon name="gavel" size={24} className="text-primary-container" /><div><h2 className="h-card">Dispute {job.dispute.status === 'held' ? 'open — escrow on hold' : job.dispute.status === 'resolved' ? 'resolved' : 'under mediator review'}</h2><p className="text-body-md text-on-surface-variant">{job.dispute.reason}. Scale reading {job.dispute.actualKg} kg → adjusted payout {inr(job.dispute.adjusted)}.</p></div></section>}
      {done && <section className="card flex items-center gap-space-md bg-primary-fixed/25"><Icon name="task_alt" size={28} fill className="text-primary" /><div className="flex-1"><h2 className="h-card">Pickup complete</h2><p className="text-body-md text-on-surface-variant">{inr(job.price)} was released from escrow to your ledger.</p></div><Link to="/history" className="btn-primary btn-sm">View in History</Link></section>}

      <div className="grid items-start gap-space-lg lg:grid-cols-3">
        <section className="stack !gap-space-md lg:col-span-2">
          <div className="card"><Stepper steps={STEPS} active={job.cancelled ? 0 : job.step} /></div>
          <MapCanvas className="h-96">
            <Pin x={78} y={30} icon="home_pin" label={`Pickup Point • ${lot.address.split(',')[0]}`} tone="accent" />
            {!job.cancelled && <Pin x={job.step > 0 ? 78 : cx} y={job.step > 0 ? 34 : cy} icon="electric_rickshaw" label={`${c.name}${job.step === 0 ? ` • ${Math.round(job.distKm * 1000)} m` : ''}`} pulse={moving} />}
          </MapCanvas>
        </section>

        <aside className="stack !gap-space-md">
          <section className="card stack !gap-space-md">
            <div className="flex items-center gap-space-md"><Avatar name={c.name} size={52} /><div><p className="eyebrow flex items-center gap-1"><Icon name="verified" size={14} fill className="text-primary-container" />Assigned Scrape Collector</p><h2 className="h-section">{c.name}</h2><p className="text-body-sm text-on-surface-variant">{c.hub} Hub #4</p></div></div>
            <dl className="grid grid-cols-2 gap-space-md text-body-sm">
              <div><dt className="text-on-surface-variant">Rating</dt><dd className="font-label-lg text-label-lg">★ {c.rating} ({c.pickups})</dd></div>
              <div><dt className="text-on-surface-variant">Vehicle</dt><dd className="font-label-lg text-label-lg">{c.reg}</dd></div>
              <div><dt className="text-on-surface-variant">Agreed payout</dt><dd className="font-label-lg text-label-lg text-primary">{inr(job.price)}</dd></div>
              <div><dt className="text-on-surface-variant">Direct helpline</dt><dd className="font-label-lg text-label-lg">{c.phone}</dd></div>
            </dl>
            <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="btn-secondary"><Icon name="call" size={18} />Call Collector</a>
          </section>
          <section className="card stack !gap-space-sm">
            <p className="eyebrow">Pickup Node • Resident Site</p>
            <p className="font-label-lg text-label-lg">{lot.address}</p>
            <p className="text-body-sm text-on-surface-variant">Main Gate Collection Point • Block C</p>
            <p className="flex items-start gap-1.5 text-body-sm text-on-surface-variant"><Icon name="info" size={16} className="mt-0.5" />Weigh-scale digital check-in will occur upon arrival.</p>
            <p className="flex items-center gap-1.5 text-body-sm text-primary"><Icon name="lock" size={16} />{inr(job.price)} held in escrow</p>
            <button type="button" className="btn-danger mt-space-sm" disabled={done || job.cancelled || !!job.dispute} onClick={openDialog}><Icon name="report" size={18} />Report Issue / Material Mismatch</button>
          </section>
        </aside>
      </div>

      <Modal open={dialog} onClose={() => setDialog(false)} icon="gavel" wide title="Report Material Mismatch or Issue" subtitle={`Lot #${lot.id} • ${lot.title} (Collector: ${c.name})`}
        footer={<><button type="button" className="btn-secondary" onClick={() => setDialog(false)}>Cancel</button><button type="button" className="btn-primary" disabled={actualKg <= 0} onClick={submitDispute}><Icon name="lock_clock" size={18} />Submit Dispute &amp; Hold Escrow</button></>}>
        <div className="stack !gap-space-lg">
          <fieldset className="stack !gap-space-sm"><legend className="label mb-space-sm">Select Dispute Reason</legend>
            {REASONS.map(([t, d], i) => (
              <label key={t} className={`flex cursor-pointer items-start gap-space-md rounded-lg border p-space-md ${reason === i ? 'border-primary-container bg-primary-fixed/15' : 'border-outline-variant/50'}`}>
                <input type="radio" name="reason" checked={reason === i} onChange={() => setReason(i)} className="mt-1 accent-[#195c28]" /><span><span className="block font-label-lg text-label-lg">{t}</span><span className="text-body-sm text-on-surface-variant">{d}</span></span>
              </label>
            ))}
          </fieldset>
          <div className="grid gap-space-md sm:grid-cols-2">
            <div className="rounded-lg bg-surface-container-low/60 p-space-md"><p className="eyebrow">Estimated Weight</p><p className="font-headline-md text-headline-md">{job.declaredKg} kg</p><p className="text-body-sm text-on-surface-variant">Original: {inr(job.price)}</p></div>
            <div className="rounded-lg bg-surface-container-low/60 p-space-md"><p className="eyebrow">Actual Scale Reading</p><div className="flex items-center gap-space-sm"><input className="input w-28" type="number" min="0" step="0.1" value={actual} onChange={(e) => setActual(e.target.value)} aria-label="Actual scale reading" /><span>kg</span></div><p className="mt-1 text-body-sm text-primary">Adjusted: {inr(preview)}</p></div>
          </div>
          <label className="field"><span className="label">Context for Arbitrator &amp; Collector</span><textarea className="input" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Provide context for escrow arbitrator and collector..." /></label>
          <p className="flex items-center gap-1.5 text-body-sm text-on-surface-variant"><Icon name="lock" size={16} />Escrow funds ({inr(job.price)}) remain locked until mutual agreement or mediator verification.</p>
        </div>
      </Modal>
    </main>
  );
}
