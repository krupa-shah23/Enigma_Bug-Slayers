import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppState.jsx';
import { Badge, EmptyState, Icon, MapCanvas, PageHeader, Pin } from '../../components/ui.jsx';
import { TrustBadge } from '../Person/Societies.jsx';

const PINS = { gvh: [30, 58], crestview: [58, 30], palm: [74, 62], silveroak: [42, 24], lotus: [86, 22], aura: [16, 26] };

export default function Societies() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('trust');
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    const f = state.societies.filter((s) => !t || `${s.name} ${s.address} ${s.city}`.toLowerCase().includes(t));
    return [...f].sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name) : sort === 'kg' ? b.totalKg - a.totalKg : (b.trust ?? -1) - (a.trust ?? -1)));
  }, [state.societies, q, sort]);

  return (
    <main className="page stack">
      <PageHeader eyebrow="NGO Procurement Mode" title="Societies" subtitle="Registered residential societies and their compliance history." actions={<Badge tone="neutral" icon="shield_person">Read-Only Ledger</Badge>} />
      <div className="flex flex-col gap-space-md sm:flex-row">
        <div className="relative flex-1"><Icon name="search" size={20} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline" /><input className="input pl-10" placeholder="Search societies by name or ward..." value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search societies" /></div>
        <select className="input sm:w-56" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by"><option value="trust">Sort: Trust Score</option><option value="kg">Sort: Total collected</option><option value="name">Sort: Name</option></select>
      </div>
      <MapCanvas className="h-72">
        {state.societies.filter((s) => PINS[s.id]).map((s) => (
          <button key={s.id} type="button" aria-label={`Open ${s.name}`} onClick={() => navigate(`/ngo/societies/${s.id}`)}>
            <Pin x={PINS[s.id][0]} y={PINS[s.id][1]} icon="apartment" tone={s.trust == null ? 'muted' : s.trust >= 85 ? 'primary' : s.trust >= 70 ? 'accent' : 'warn'} label={s.name} />
          </button>
        ))}
      </MapCanvas>
      {list.length === 0 ? <div className="card"><EmptyState icon="search_off" title="No societies match" text={`Nothing found for "${q}".`} /></div> : (
        <div className="grid gap-space-lg md:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <Link key={s.id} to={`/ngo/societies/${s.id}`} className="card card-hover flex flex-col gap-space-md">
              <div className="flex items-start justify-between gap-space-sm"><div><h2 className="h-card">{s.name}</h2><p className="mt-0.5 flex items-center gap-1 text-body-sm text-on-surface-variant"><Icon name="location_on" size={15} />{s.short}</p></div><TrustBadge score={s.trust} /></div>
              <dl className="grid grid-cols-2 gap-space-md border-t border-outline-variant/40 pt-space-md text-body-sm">
                <div><dt className="text-on-surface-variant">Collection</dt><dd className="font-label-lg text-label-lg">{s.freq}</dd></div>
                <div><dt className="text-on-surface-variant">Active Contracts</dt><dd className="font-label-lg text-label-lg">{s.contracts}</dd></div>
                <div><dt className="text-on-surface-variant">Flag count</dt><dd className={`flex items-center gap-1 font-label-lg text-label-lg ${s.flags ? 'text-error' : ''}`}><Icon name="flag" size={15} />{s.flags} {s.flags === 1 ? 'flag' : 'flags'}</dd></div>
                <div><dt className="text-on-surface-variant">Total collected</dt><dd className="font-label-lg text-label-lg">{s.totalKg.toLocaleString('en-IN')} kg</dd></div>
              </dl>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
