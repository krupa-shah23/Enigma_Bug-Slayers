import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../state/AppState.jsx';
import { EmptyState, Field, Icon, PageHeader } from '../../components/ui.jsx';
import { inr, variancePct } from '../../lib/format.js';

export default function Collections() {
  const { state, actions } = useApp();
  const pending = state.batches.filter((b) => !b.paid);
  const [id, setId] = useState(pending[0]?.id);
  const [actual, setActual] = useState('');
  const b = state.batches.find((x) => x.id === id) || pending[0];
  const soc = b && state.societies.find((s) => s.id === b.societyId);

  useEffect(() => { if (b) setActual(b.weighed ? String(b.actual) : b.id === 'WB-409' ? '1020' : ''); }, [b?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!b) return <main className="page-narrow"><div className="card"><EmptyState icon="task_alt" title="All batches settled" text="Every collection batch has been weighed and paid out." /><div className="flex justify-center"><Link to="/ngo/payments" className="btn-primary">View Payments</Link></div></div></main>;

  const val = Number(actual);
  const variance = b.weighed ? variancePct(b.promised, b.actual) : 0;
  const flagged = b.weighed && variance <= -10;
  const payout = b.weighed ? b.actual * b.rate : 0;

  return (
    <main className="page-narrow stack">
      <PageHeader eyebrow="Audit & Disbursement Protocol" title="Month-End Collection & Weigh-in Verification" subtitle="Verify collected batch weights against promised thresholds and disburse society escrow credits." />
      <section className="card stack !gap-space-md">
        <Field label="Select Finalized Collection Batch"><select className="input" value={b.id} onChange={(e) => setId(e.target.value)}>{pending.map((x) => <option key={x.id} value={x.id}>#{x.id} • {state.societies.find((s) => s.id === x.societyId).name} • {x.material}</option>)}</select></Field>
        <div className="grid gap-space-md sm:grid-cols-3">
          {[['Society Committee Contact', `${soc.treasurer.name} (${soc.treasurer.phone})`, 'person'], ['Scheduled Collection', b.date, 'calendar_today'], ['Contract Agreement Rate', `${inr(b.rate, 2)} / kg baseline`, 'payments']].map(([k, v, i]) => <div key={k} className="rounded-lg bg-surface-container-low/60 p-space-md"><p className="eyebrow flex items-center gap-1"><Icon name={i} size={14} />{k}</p><p className="mt-1 font-label-lg text-label-lg">{v}</p></div>)}
        </div>
        <div className="grid items-end gap-space-md sm:grid-cols-2">
          <div className="rounded-lg border border-outline-variant/50 p-space-md"><p className="eyebrow">Promised Weight (Contract Baseline)</p><p className="font-display-lg text-display-lg font-bold">{b.promised.toLocaleString('en-IN')}<span className="ml-1 text-body-md font-normal text-outline">kg</span></p></div>
          <Field label="Actual Weight Received (kg)" hint="Weigh-bridge telemetry • Terminal #WB-BLR-04"><input className="input" type="number" min="0" value={actual} onChange={(e) => setActual(e.target.value)} disabled={b.weighed} placeholder="0" /></Field>
        </div>
        <button type="button" className="btn-primary" disabled={b.weighed || !(val > 0)} onClick={() => actions.submitWeighIn(b.id, val)}><Icon name="fact_check" size={18} />{b.weighed ? 'Weigh-in Recorded' : 'Submit Weigh-in Record'}</button>
      </section>

      {b.weighed && (
        <section className="card stack !gap-space-md rise">
          {flagged ? <div className="flex items-start gap-space-md rounded-lg bg-error-container/50 p-space-md"><Icon name="warning" className="text-error" /><div><h2 className="h-card text-error">Weight Variance Flag Logged • {variance.toFixed(1)}%</h2><p className="text-body-md">Actual weight ({b.actual.toLocaleString('en-IN')} kg) is below promised ({b.promised.toLocaleString('en-IN')} kg). The society committee has been notified; pro-rata disbursement can proceed.</p></div></div>
            : <div className="flex items-start gap-space-md rounded-lg bg-primary-fixed/30 p-space-md"><Icon name="check_circle" fill className="text-primary" /><p className="text-body-md">Within tolerance ({variance.toFixed(1)}%). No flag raised.</p></div>}
          <div className="flex flex-col justify-between gap-space-md sm:flex-row sm:items-center"><div><p className="eyebrow">Approved Society Escrow Credit</p><p className="font-display-lg text-display-lg font-bold text-primary">{inr(payout, 2)}</p><p className="text-body-sm text-on-surface-variant">{b.actual.toLocaleString('en-IN')} kg delivered @ {inr(b.rate, 2)}/kg</p></div>
            <button type="button" className="btn-primary btn-lg" onClick={() => { actions.triggerPayment(b.id); setId(undefined); }}><Icon name="account_balance_wallet" size={20} />Trigger Payment to Society Escrow</button></div>
        </section>
      )}
    </main>
  );
}
