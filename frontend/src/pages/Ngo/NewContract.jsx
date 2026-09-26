import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../state/AppState.jsx';
import { MATERIALS } from '../../data/seed.js';
import { Field, Icon } from '../../components/ui.jsx';
import { inr } from '../../lib/format.js';

export default function NewContract() {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [societyId, setSociety] = useState(params.get('society') || 'gvh');
  const [material, setMaterial] = useState('Compost / Wet Waste');
  const [qty, setQty] = useState('1200');
  const [rate, setRate] = useState('4');
  const valid = Number(qty) > 0 && Number(rate) > 0;
  const submit = (e) => { e.preventDefault(); if (!valid) return; actions.offerContract({ societyId, material, qty: Number(qty), rate: Number(rate) }); navigate('/ngo/contracts'); };

  return (
    <main className="page-narrow stack">
      <Link to="/ngo/contracts" className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-primary"><Icon name="arrow_back" size={18} />Back to Contracts</Link>
      <div><h1 className="h-title">Offer Material Contract</h1><p className="muted mt-space-xs">Establish recurring waste procurement and off-take agreement with residential societies.</p></div>
      <form onSubmit={submit} className="card stack !gap-space-md">
        <Field label="Residential Society"><select className="input" value={societyId} onChange={(e) => setSociety(e.target.value)}>{state.societies.filter((s) => s.trust != null).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
        <Field label="Material Type"><select className="input" value={material} onChange={(e) => setMaterial(e.target.value)}>{MATERIALS.map((m) => <option key={m}>{m}</option>)}</select></Field>
        <div className="grid gap-space-md sm:grid-cols-2">
          <Field label="Quantity (kg / month)"><input className="input" type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} /></Field>
          <Field label="Rate per kg (₹)"><input className="input" type="number" min="0.1" step="0.05" value={rate} onChange={(e) => setRate(e.target.value)} /></Field>
        </div>
        <div className="flex items-start gap-space-md rounded-lg bg-primary-fixed/25 p-space-md"><Icon name="account_balance_wallet" className="text-primary" /><div><p className="eyebrow">Estimated Monthly Payout</p><p className="font-headline-lg text-headline-lg text-primary">{inr(Number(qty) * Number(rate))} / month</p><p className="text-body-sm text-on-surface-variant">Disbursed directly to society escrow upon verified monthly weigh-in.</p></div></div>
        <button type="submit" className="btn-primary btn-lg" disabled={!valid}>Submit Contract Offer<Icon name="send" size={18} /></button>
      </form>
    </main>
  );
}
