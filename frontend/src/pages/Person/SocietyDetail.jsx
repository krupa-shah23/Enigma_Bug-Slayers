import { Link, useParams } from 'react-router-dom';
import { useApp } from '../../state/AppState.jsx';
import { Badge, EmptyState, Gauge, Icon } from '../../components/ui.jsx';
import { trustTier } from '../../lib/format.js';

const Fact = ({ icon, label, value, note }) => (
  <div className="flex items-start gap-space-md rounded-xl bg-surface-container-low/60 p-space-md">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary-container"><Icon name={icon} size={22} fill /></span>
    <div><p className="eyebrow">{label}</p><p className="font-headline-sm text-headline-sm">{value}</p><p className="text-body-sm text-on-surface-variant">{note}</p></div>
  </div>
);

export default function SocietyDetail() {
  const { id } = useParams();
  const { state, actions } = useApp();
  const s = state.societies.find((x) => x.id === id);
  if (!s) {
    return <main className="page-narrow"><div className="card"><EmptyState icon="apartment" title="Society not found" text="This society isn't registered on the network." /><div className="flex justify-center"><Link to="/societies" className="btn-primary">Back to All Societies</Link></div></div></main>;
  }
  const mine = s.id === 'gvh';
  const requested = state.joinRequests.includes(s.id);

  return (
    <main className="page-narrow stack">
      <Link to="/societies" className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-primary"><Icon name="arrow_back" size={18} />Back to All Societies</Link>
      <section className="card stack">
        <div className="flex flex-col justify-between gap-space-md sm:flex-row sm:items-start">
          <div className="space-y-space-sm">
            <Badge tone="success" icon="verified">{s.trust == null ? 'Newly Registered' : 'Certified Network'}</Badge>
            <h1 className="h-title">{s.name}</h1>
            <p className="flex items-center gap-1.5 text-body-md text-on-surface-variant"><Icon name="location_on" size={18} />{s.address}, {s.city}</p>
          </div>
          <div className="flex items-center gap-space-md rounded-xl border border-outline-variant/40 px-space-md py-space-sm">
            <Gauge value={s.trust ?? 0} label={s.trust ?? '—'} />
            <div><p className="eyebrow">Trust Score</p><p className="font-headline-sm text-headline-sm">{s.trust == null ? 'Not yet rated' : `${s.trust}/100`}</p><p className="text-body-sm text-primary">{trustTier(s.trust)}{s.trust != null && ' - Verified'}</p></div>
          </div>
        </div>
        <div className="grid gap-space-md md:grid-cols-3">
          <Fact icon="calendar_today" label="Pickup Schedule" value={s.freq} note="Scheduled cycle" />
          <Fact icon="group" label="Community Base" value={`${s.households} Registered Households`} note="Active segregation" />
          <Fact icon="assignment_turned_in" label="Circular Traceability" value={`${s.contracts} Active Municipal & Upcycling Contracts`} note="Direct processing" />
        </div>
        <div className="flex flex-col items-start justify-between gap-space-md border-t border-outline-variant/40 pt-space-lg sm:flex-row sm:items-center">
          {mine ? (
            <>
              <p className="muted">This is your society. Manage collections, contracts and committee details.</p>
              <Link to="/my-society" className="btn-primary"><Icon name="apartment" size={18} />Go to My Society</Link>
            </>
          ) : (
            <>
              <p className="muted">Currently unassigned resident? Request society membership.</p>
              <button type="button" disabled={requested} onClick={() => actions.joinSociety(s.id)} className="btn-primary">
                <Icon name={requested ? 'schedule_send' : 'how_to_reg'} size={18} />{requested ? 'Request Sent' : 'Join This Society'}
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
