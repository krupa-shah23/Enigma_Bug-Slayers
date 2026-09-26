import { Link } from 'react-router-dom';
import { useApp, useLiveOnce } from '../../state/AppState.jsx';
import { Badge, EmptyState, Icon, PageHeader, StatCard, StatusBadge } from '../../components/ui.jsx';

export default function Dashboard() {
  const { state, actions } = useApp();
  const soc = (id) => state.societies.find((s) => s.id === id);
  const active = state.contracts.filter((c) => c.status === 'Active');
  const pickups = state.batches.filter((b) => !b.paid);
  const flags = state.flags;
  const openFlags = flags.filter((f) => f.status !== 'Resolved' && f.status !== 'Resolved with Penalty');
  const pickupKg = pickups.reduce((a, b) => a + b.promised, 0);

  useLiveOnce('ngo-s08', 2000, () => actions.notify('Ngo', { title: 'Live Event S08', text: 'SOCKET EVENT S08: Crestview Towers renewed Compost contract (1,200 kg/mo)', icon: 'check_circle', to: '/ngo/contracts' }));
  useLiveOnce('ngo-s09', 5500, () => actions.notify('Ngo', { title: 'Live Event S09', text: 'SOCKET EVENT S09: Weigh-in flag logged on batch #WB-391 (Green Valley Heights)', icon: 'warning', to: '/ngo/dashboard' }));

  return (
    <main className="page stack">
      <PageHeader eyebrow="Operations Console" title="NGO Operations Dashboard" subtitle="Active material sourcing pipelines, society compliance, and scheduled collections."
        actions={<><Link to="/ngo/collections" className="btn-secondary"><Icon name="fact_check" size={18} />Verify Weigh-ins</Link><Link to="/ngo/contracts/new" className="btn-primary"><Icon name="handshake" size={18} />Offer Contract</Link></>} />

      <section className="grid gap-space-lg md:grid-cols-3">
        <StatCard label="Active Contracts" icon="description" value={`${active.length} Contracts`} note={`Across ${new Set(active.map((c) => c.societyId)).size} residential societies`} />
        <StatCard label="Upcoming Month-End Pickups" icon="local_shipping" value={`${pickups.length} Scheduled`} note={`Estimated ${pickupKg.toLocaleString('en-IN')} kg recyclable volume`} />
        <StatCard label="Recent Flags" icon="flag" tone="danger" value={`${openFlags.length} Flagged`} note="Weight variance >10% detected" />
      </section>

      <div className="grid items-start gap-space-lg lg:grid-cols-2">
        <section className="stack !gap-space-md">
          <div className="flex items-center justify-between"><h2 className="h-section">Upcoming Pickups</h2><Badge tone="neutral">{pickups.length} Active Queued</Badge></div>
          {pickups.length === 0 && <div className="card"><EmptyState icon="task_alt" title="All batches settled" text="No pickups awaiting weigh-in." /></div>}
          {pickups.map((b) => (
            <Link key={b.id} to="/ngo/collections" className="card card-hover flex flex-col gap-space-sm">
              <div className="flex items-start justify-between gap-space-sm"><div><h3 className="h-card">{soc(b.societyId).name}</h3><p className="text-body-sm text-on-surface-variant">{b.material} • {b.promised.toLocaleString('en-IN')} kg</p></div><StatusBadge status={b.weighed ? 'Under Review' : b.status} /></div>
              <div className="flex flex-wrap items-center justify-between gap-space-sm border-t border-outline-variant/40 pt-space-sm text-body-sm text-on-surface-variant">
                <span className="flex items-center gap-1"><Icon name="calendar_today" size={16} />Date: {b.date}</span>
                {b.driver && <span className="flex items-center gap-1"><Icon name="person" size={16} />Scrape Collector: {b.driver}</span>}
              </div>
            </Link>
          ))}
        </section>

        <section className="stack !gap-space-md">
          <div className="flex items-center justify-between"><h2 className="h-section">Recent Flags</h2><Badge tone="danger">Action Required</Badge></div>
          {flags.slice(0, 4).map((f) => (
            <article key={f.id} className="card flex flex-col gap-space-sm">
              <div className="flex items-start justify-between gap-space-sm"><h3 className="h-card">{soc(f.societyId).name}</h3><StatusBadge status={f.status} /></div>
              <p className={`flex items-start gap-1.5 rounded-lg px-space-md py-space-sm text-body-sm ${f.tone === 'danger' ? 'bg-error-container/50 text-error' : 'bg-amber-50 text-amber-800'}`}><Icon name={f.tone === 'danger' ? 'priority_high' : 'report_problem'} size={16} className="mt-0.5" /><span>{f.text}{f.variance && <strong className="ml-1">{f.variance}</strong>}</span></p>
              <div className="flex items-center justify-between text-body-sm text-on-surface-variant"><span className="flex items-center gap-1"><Icon name="event" size={16} />Date: {f.date}</span>
                {f.status === 'Resolved' || f.status === 'Resolved with Penalty' ? null : <button type="button" className="btn-secondary btn-sm" onClick={() => actions.resolveFlag(f.id)}>Mark Resolved</button>}</div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
