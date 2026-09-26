import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp, useLiveOnce } from '../../state/AppState.jsx';
import { Avatar, Badge, Gauge, Icon, PageHeader, SplitModal } from '../../components/ui.jsx';
import { inr, kg, trustTier } from '../../lib/format.js';

const MATERIALS = [
  ['compost', 'Compost / Wet', 'bg-tertiary'],
  ['dry', 'Dry Recyclables', 'bg-primary-container'],
  ['ewaste', 'E-Waste', 'bg-secondary'],
  ['haz', 'Hazardous', 'bg-amber-500'],
];

function Officer({ p }) {
  return (
    <div className="flex items-start gap-space-md rounded-xl bg-surface-container-low/60 p-space-md">
      <Avatar name={p.name} size={44} />
      <div className="min-w-0 space-y-0.5">
        <p className="eyebrow">{p.role}</p>
        <p className="h-card">{p.name}</p>
        <a href={`tel:${p.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-body-sm text-on-surface-variant hover:text-primary"><Icon name="call" size={15} />{p.phone}</a>
        <a href={`mailto:${p.email}`} className="flex items-center gap-1.5 truncate text-body-sm text-on-surface-variant hover:text-primary"><Icon name="mail" size={15} />{p.email}</a>
      </div>
    </div>
  );
}

export default function MySociety() {
  const { state, actions } = useApp();
  const [splitFor, setSplitFor] = useState(null);
  const s = state.societies.find((x) => x.id === 'gvh');
  const soc = state.society;
  const total = Object.values(soc.material).reduce((a, b) => a + b, 0);
  const latest = soc.payouts[0];

  useLiveOnce('mysociety-settled', 2500, () => actions.toast(`Payment completed: ${inr(latest.total)} distributed to society ledger.`, { title: 'Transaction Settled', icon: 'check_circle', tone: 'live' }));

  return (
    <main className="page stack">
      <PageHeader
        eyebrow="Resident Officer • Node #GVH-8821"
        title={s.name}
        subtitle={`${s.address}, ${s.city}`}
        actions={<>
          <Link to="/log-contribution" className="btn-secondary"><Icon name="add_circle" size={18} />Log Contribution</Link>
          <Link to="/my-society/settings" className="btn-primary"><Icon name="settings" size={18} />Society Settings</Link>
        </>}
      />

      <section className="grid gap-space-lg lg:grid-cols-3">
        <article className="card flex items-center gap-space-lg">
          <Gauge value={s.trust} size={88} label={s.trust} />
          <div>
            <p className="eyebrow">Reliability Index</p>
            <p className="font-headline-lg text-headline-lg">{s.trust}<span className="text-body-md font-normal text-outline">/100</span></p>
            <Badge tone="success" className="mt-1">{trustTier(s.trust)} Partner</Badge>
            <p className="mt-1 text-body-sm text-on-surface-variant">Top 4% Regional Tier</p>
          </div>
        </article>
        <article className="card flex flex-col justify-between gap-space-sm lg:col-span-2">
          <div className="flex items-center justify-between"><p className="eyebrow">Cumulative Net Yield</p><Icon name="price_check" className="text-primary-container" size={24} /></div>
          <p className="font-display-lg text-display-lg font-bold tracking-tight">{inr(soc.yieldTotal)}</p>
          <p className="text-body-sm text-on-surface-variant">Total maintenance offset applied directly to the current quarter residential assessment.</p>
          <p className="flex items-center gap-1.5 text-body-sm text-primary"><Icon name="verified" size={16} fill />Reconciled through Municipal Ledger</p>
        </article>
      </section>

      <section className="card stack !gap-space-md">
        <div><p className="eyebrow">Governing Committee</p><h2 className="h-section">Designated Officers</h2></div>
        <div className="grid gap-space-md md:grid-cols-2"><Officer p={s.cp} /><Officer p={s.treasurer} /></div>
      </section>

      <section className="card stack !gap-space-md">
        <div className="flex flex-col justify-between gap-space-xs sm:flex-row sm:items-end">
          <div><p className="eyebrow">Material Balance</p><h2 className="h-section">Contribution Aggregate</h2></div>
          <p className="flex items-center gap-space-sm text-body-sm text-on-surface-variant"><span className="font-label-lg text-on-surface">Cycle Total: {kg(total)}</span>• Reconciliation: Verified In-House</p>
        </div>
        <div className="flex h-3 overflow-hidden rounded-full bg-surface-container-high">
          {MATERIALS.map(([k, , color]) => <span key={k} className={`${color} transition-all duration-700`} style={{ width: `${(soc.material[k] / total) * 100}%` }} />)}
        </div>
        <div className="grid gap-space-md sm:grid-cols-2 lg:grid-cols-4">
          {MATERIALS.map(([k, label, color]) => (
            <div key={k} className="rounded-xl bg-surface-container-low/60 p-space-md">
              <p className="flex items-center gap-space-sm text-body-sm text-on-surface-variant"><span className={`h-2.5 w-2.5 rounded-full ${color}`} />{label}</p>
              <p className="mt-1 font-headline-lg text-headline-lg">{Math.round(soc.material[k] * 10) / 10}<span className="ml-1 text-body-md font-normal text-outline">kg</span></p>
            </div>
          ))}
        </div>
      </section>

      <section className="card !p-0">
        <div className="flex items-end justify-between gap-space-md p-space-lg pb-space-md">
          <div><p className="eyebrow">Weigh-in Ledger</p><h2 className="h-section">Collection History</h2></div>
          <span className="text-body-sm text-on-surface-variant">{soc.collections.length} Records Logged</span>
        </div>
        <div className="overflow-x-auto">
          <table className="tbl">
            <thead><tr><th>Date</th><th>Material</th><th className="text-right">Promised</th><th className="text-right">Actual</th><th>Indicator</th></tr></thead>
            <tbody>
              {soc.collections.map((c) => {
                const flagged = c.actual < c.promised * 0.9;
                return (
                  <tr key={c.date + c.material}>
                    <td>{c.date}</td><td className="font-label-lg">{c.material}</td><td className="text-right">{c.promised} kg</td><td className="text-right">{c.actual} kg</td>
                    <td>{flagged ? <Badge tone="danger" icon="flag">Flagged ({Math.round(((c.actual - c.promised) / c.promised) * 100)}%)</Badge> : <Badge tone="success" icon="check_circle">Normal</Badge>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card stack !gap-space-md">
        <div className="flex items-end justify-between gap-space-md">
          <div><p className="eyebrow">Disbursements</p><h2 className="h-section">Recent Payouts</h2></div>
          <span className="flex items-center gap-1.5 text-body-sm text-on-surface-variant"><Icon name="account_balance" size={16} />HDFC Escrow Linked</span>
        </div>
        <div className="grid gap-space-md md:grid-cols-2">
          {soc.payouts.slice(0, 4).map((p) => (
            <div key={p.id} className="flex flex-col gap-space-md rounded-xl border border-outline-variant/40 p-space-md">
              <div className="flex items-center justify-between"><span className="flex items-center gap-1.5 font-label-lg text-label-lg"><Icon name="payments" size={18} className="text-primary-container" />{p.date}</span><Badge tone={p.status === 'Disbursed' ? 'success' : 'neutral'}>{p.status}</Badge></div>
              <div className="grid grid-cols-2 gap-space-md">
                <div><p className="text-body-sm text-on-surface-variant">Society Share</p><p className="font-headline-sm text-headline-sm">{inr(p.total, 2)} <span className="text-body-sm font-normal text-outline">Total</span></p></div>
                <div><p className="text-body-sm text-on-surface-variant">Resident Credit</p><p className="font-headline-sm text-headline-sm text-primary">{inr(p.credit, 2)} <span className="text-body-sm font-normal text-outline">Credit</span></p></div>
              </div>
              <button type="button" className="btn-secondary btn-sm self-start" onClick={() => setSplitFor(state.payments.find((x) => x.id === p.paymentId))}>Automated Split<Icon name="arrow_forward" size={16} /></button>
            </div>
          ))}
        </div>
      </section>

      <SplitModal payment={splitFor} onClose={() => setSplitFor(null)} title="Payment Split Ledger" subtitle={splitFor && `Disbursement batch #${splitFor.batch} • Total escrow: ${inr(splitFor.amount, 2)}`} />
    </main>
  );
}
