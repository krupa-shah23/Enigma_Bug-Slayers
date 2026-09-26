import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../state/AppState.jsx';
import { Badge, EmptyState, Icon, PageHeader } from '../../components/ui.jsx';

export const TrustBadge = ({ score }) => {
  if (score == null) return <Badge tone="info" icon="fiber_new">New</Badge>;
  return <Badge tone={score >= 85 ? 'success' : score >= 70 ? 'info' : 'warn'} icon={score >= 70 ? 'verified' : 'shield'}>{score} Trust Score</Badge>;
};

export default function Societies() {
  const { state } = useApp();
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('trust');

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtered = state.societies.filter((s) => !term || `${s.name} ${s.address} ${s.city}`.toLowerCase().includes(term));
    return [...filtered].sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name) : (b.trust ?? -1) - (a.trust ?? -1)));
  }, [state.societies, q, sort]);

  return (
    <main className="page stack">
      <PageHeader eyebrow="Browse Mode" title="All Societies" subtitle="Registered residential societies on the ReWaste network." />
      <div className="flex flex-col gap-space-md sm:flex-row">
        <div className="relative flex-1">
          <Icon name="search" size={20} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input className="input pl-10" placeholder="Search societies by name or area..." value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search societies" />
        </div>
        <select className="input sm:w-56" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort societies">
          <option value="trust">Sort: Trust Score</option>
          <option value="name">Sort: Name</option>
        </select>
      </div>
      {list.length === 0 ? (
        <div className="card"><EmptyState icon="search_off" title="No societies match" text={`Nothing found for "${q}". Try a different name or area.`} /></div>
      ) : (
        <div className="grid gap-space-lg md:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <Link key={s.id} to={`/societies/${s.id}`} className="card card-hover flex flex-col justify-between gap-space-lg">
              <div className="space-y-space-sm">
                <div className="flex items-start justify-between gap-space-sm">
                  <h2 className="h-card">{s.name}</h2>
                  <TrustBadge score={s.trust} />
                </div>
                <p className="flex items-start gap-1.5 text-body-sm text-on-surface-variant"><Icon name="location_on" size={16} className="mt-0.5 shrink-0" />{s.address}, {s.city}</p>
                {s.id === 'gvh' && <Badge tone="neutral" icon="home">Your society</Badge>}
              </div>
              <div className="flex items-center justify-between border-t border-outline-variant/40 pt-space-md text-body-sm text-on-surface-variant">
                <span className="flex items-center gap-1"><Icon name="calendar_today" size={16} />{s.freq}</span>
                <span className="flex items-center gap-1"><Icon name="description" size={16} />{s.contracts} Active {s.contracts === 1 ? 'Contract' : 'Contracts'}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
