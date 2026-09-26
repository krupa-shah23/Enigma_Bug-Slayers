import { Link, useParams } from 'react-router-dom';
import { useApp } from '../../state/AppState.jsx';
import { Avatar, Badge, EmptyState, Icon } from '../../components/ui.jsx';
import { pct, trustTier, variancePct } from '../../lib/format.js';

const BARS = [['compost', 'Compost / Wet', 'bg-tertiary'], ['dry', 'Dry Recyclables', 'bg-primary-container'], ['ewaste', 'E-waste', 'bg-secondary'], ['haz', 'Hazardous', 'bg-amber-500']];

const Contact = ({ p }) => (
  <div className="flex items-start gap-space-md rounded-xl bg-surface-container-low/60 p-space-md"><Avatar name={p.name} size={40} />
    <div className="min-w-0"><p className="h-card">{p.name}</p><p className="eyebrow">{p.role}</p>
      <a href={`tel:${p.phone.replace(/\s/g, '')}`} className="mt-1 flex items-center gap-1.5 text-body-sm hover:text-primary"><Icon name="call" size={15} />{p.phone}</a>
      <a href={`mailto:${p.email}`} className="flex items-center gap-1.5 truncate text-body-sm hover:text-primary"><Icon name="mail" size={15} />{p.email}</a></div></div>
);

export default function SocietyDetail() {
  const { id } = useParams();
  const { state } = useApp();
  const s = state.societies.find((x) => x.id === id);
  if (!s) return <main className="page-narrow"><div className="card"><EmptyState icon="apartment" title="Society not found" /><div className="flex justify-center"><Link to="/ngo/societies" className="btn-primary">Back to Societies</Link></div></div></main>;
  const total = Object.values(s.monthly).reduce((a, b) => a + b, 0);
  const max = Math.max(1, ...Object.values(s.monthly));

  return (
    <main className="page stack">
      <Link to="/ngo/societies" className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-primary"><Icon name="arrow_back" size={18} />Societies / {s.name}</Link>
      <section className="card flex flex-col justify-between gap-space-md md:flex-row md:items-center">
        <div className="flex items-center gap-space-md"><span className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container-low text-primary-container"><Icon name="apartment" size={30} fill /></span>
          <div><div className="flex flex-wrap items-center gap-space-sm"><h1 className="h-title">{s.name}</h1><Badge tone="success" icon="verified">{trustTier(s.trust)} • Verified</Badge></div><p className="muted flex items-center gap-1"><Icon name="location_on" size={16} />{s.address}, {s.city}</p></div></div>
        <div className="flex items-center gap-space-lg"><div><p className="eyebrow">Trust Score</p><p className="font-display-lg text-display-lg font-bold text-primary">{s.trust ?? '—'}<span className="text-body-md font-normal text-outline">/100</span></p></div>
          <Link to={`/ngo/contracts/new?society=${s.id}`} className="btn-primary"><Icon name="handshake" size={18} />Offer Contract</Link></div>
      </section>
      <div className="grid items-start gap-space-lg lg:grid-cols-3">
        <section className="card stack !gap-space-md"><h2 className="h-section">Committee Contacts</h2><Contact p={s.cp} /><Contact p={s.treasurer} /><p className="flex items-center gap-1.5 text-body-sm text-on-surface-variant"><Icon name="security" size={16} />Verified residential representatives authorized for waste agreements.</p></section>
        <section className="card stack !gap-space-md lg:col-span-2">
          <div><h2 className="h-section">Contribution History</h2><p className="muted">Total current month yield: <strong>{total.toLocaleString('en-IN')} kg</strong>.</p></div>
          <div className="stack !gap-space-md">{BARS.map(([k, label, c]) => (
            <div key={k}><div className="mb-1 flex justify-between text-body-sm"><span>{label}</span><span className="font-label-lg">{s.monthly[k].toLocaleString('en-IN')} kg</span></div><div className="h-3 overflow-hidden rounded-full bg-surface-container-high"><div className={`h-full rounded-full ${c} transition-all duration-700`} style={{ width: `${(s.monthly[k] / max) * 100}%` }} /></div></div>
          ))}</div>
        </section>
      </div>
      <section className="card !p-0">
        <div className="flex items-center gap-space-md p-space-lg pb-space-md"><Icon name="flag" className="text-error" /><h2 className="h-section">Flag History</h2><span className="text-body-sm text-on-surface-variant">{s.flagHistory.length} Records Logged</span></div>
        {s.flagHistory.length === 0 ? <EmptyState icon="verified" title="Clean record" text="No weight-variance flags on this society." /> : (
          <div className="overflow-x-auto"><table className="tbl"><thead><tr><th>Date</th><th>Material</th><th className="text-right">Promised</th><th className="text-right">Actual</th><th className="text-right">Variance</th><th>Resolution / Status</th></tr></thead>
            <tbody>{s.flagHistory.map((f) => { const v = variancePct(f.promised, f.actual); return <tr key={f.date + f.material}><td>{f.date}</td><td className="font-label-lg">{f.material}</td><td className="text-right">{f.promised} kg</td><td className="text-right">{f.actual} kg</td><td className={`text-right font-label-lg ${v <= -10 ? 'text-error' : ''}`}>{pct(v)}</td><td>{f.resolution}</td></tr>; })}</tbody></table></div>
        )}
      </section>
    </main>
  );
}
