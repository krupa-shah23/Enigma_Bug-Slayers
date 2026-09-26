import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { collectorOf, useApp } from '../../state/AppState.jsx';
import { Avatar, Badge, EmptyState, Icon } from '../../components/ui.jsx';
import { CATEGORY_ICON } from './Exchange.jsx';
import { inr } from '../../lib/format.js';

export default function Quotes() {
  const { requestId } = useParams();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const lot = state.lots.find((l) => l.reqId === requestId);

  useEffect(() => { if (lot) actions.startSim(lot.id); }, [lot?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lot) {
    return <main className="page-narrow"><div className="card"><EmptyState icon="search_off" title="Request not found" text="This listing doesn't exist." /><div className="flex justify-center"><Link to="/exchange" className="btn-primary">Back to Active Requests</Link></div></div></main>;
  }
  const quotes = state.quotes.filter((q) => q.lotId === lot.id).sort((a, b) => b.price - a.price);
  const open = lot.status === 'open';
  const select = (q) => { const jobId = actions.selectQuote(lot.id, q.id); navigate(`/exchange/${jobId}/tracking`); };

  return (
    <main className="page-narrow stack">
      <Link to="/exchange" className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-primary"><Icon name="arrow_back" size={18} />Back to Active Requests</Link>

      <section className="card flex flex-col gap-space-md sm:flex-row">
        <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-surface-container-low text-primary-container"><Icon name={CATEGORY_ICON[lot.category]} size={44} fill /></span>
        <div className="min-w-0 flex-1 space-y-space-sm">
          <div className="flex flex-wrap items-center gap-space-sm"><Badge tone="neutral">{lot.category}</Badge><span className="flex items-center gap-1 text-body-sm text-on-surface-variant"><Icon name="schedule" size={14} />Posted {lot.posted}</span><Badge tone="success">{quotes.length} Quotes Available</Badge></div>
          <h1 className="font-headline-lg text-headline-lg">Lot #{lot.id}: {lot.title}</h1>
          <p className="muted">{lot.desc}</p>
          <div className="flex flex-wrap gap-x-space-lg gap-y-1 text-body-sm text-on-surface-variant">
            <span className="flex items-center gap-1"><Icon name="scale" size={16} />{lot.kg} kg estimated</span>
            <span className="flex items-center gap-1"><Icon name="location_on" size={16} />{lot.address}</span>
            <span className="flex items-center gap-1"><Icon name="verified" size={16} />Digital Scale Required</span>
          </div>
        </div>
      </section>

      <div className="flex items-end justify-between gap-space-md">
        <div><h2 className="h-section">Available Collector Quotes</h2><p className="muted">Review offers, verification credibility, and estimated arrival windows.</p></div>
        {open && <span className="hidden items-center gap-1.5 font-label-md text-label-md text-primary sm:flex"><span className="h-2 w-2 animate-pulse rounded-full bg-primary-container" />Live Dispatch Network Active</span>}
      </div>

      {!open && <div className="card flex items-center justify-between gap-space-md"><p className="flex items-center gap-space-sm font-label-lg text-label-lg text-primary"><Icon name="task_alt" size={22} fill />A quote has been accepted for this lot.</p>{lot.jobId && <Link to={`/exchange/${lot.jobId}/tracking`} className="btn-primary btn-sm">Track Pickup</Link>}</div>}

      <div className="stack !gap-space-md">
        {quotes.map((q, i) => {
          const c = collectorOf(q.collectorId);
          return (
            <article key={q.id} className={`card rise flex flex-col gap-space-md sm:flex-row sm:items-center ${q.state === 'accepted' ? 'ring-2 ring-primary-container' : ''} ${q.state === 'declined' ? 'opacity-60' : ''}`}>
              <Avatar name={c.name} size={48} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-space-sm"><h3 className="h-card">{c.name}{c.hub && q.collectorId === 'ramesh' ? ` (${c.hub})` : ''}</h3><Icon name="verified" size={16} className="text-primary-container" fill />{i === 0 && open && <Badge tone="success">Best offer</Badge>}{q.state === 'accepted' && <Badge tone="success">Accepted</Badge>}{q.at === 'Just now' && <Badge tone="info">New</Badge>}</div>
                <p className="text-body-sm text-on-surface-variant">★ {c.rating} ({c.pickups} pickups) • {c.note}</p>
              </div>
              <div className="flex items-center justify-between gap-space-lg sm:justify-end">
                <div className="sm:text-right"><p className="font-headline-lg text-headline-lg text-primary">{inr(q.price)}</p><p className="flex items-center gap-1 text-body-sm text-on-surface-variant sm:justify-end"><Icon name="local_shipping" size={14} />ETA {q.eta} mins</p></div>
                {open && <button type="button" className="btn-primary" onClick={() => select(q)}>Select Quote<Icon name="arrow_forward" size={18} /></button>}
              </div>
            </article>
          );
        })}
        {open && (
          <div className="card flex items-center gap-space-md border-dashed bg-surface-container-low/40">
            <Icon name="sync" size={24} className="animate-spin text-primary-container" />
            <div><p className="font-label-lg text-label-lg">Waiting for quotes...</p><p className="text-body-sm text-on-surface-variant">Verified local collectors are reviewing your lot • Broadcasting to 14 collectors within 5km</p></div>
          </div>
        )}
      </div>
    </main>
  );
}
