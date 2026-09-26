import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collectorOf, useApp, useLiveOnce } from '../../state/AppState.jsx';
import { Avatar, Badge, Gauge, Icon, Modal, PageHeader } from '../../components/ui.jsx';
import EventForm from '../../components/EventForm.jsx';
import { inr, trustTier } from '../../lib/format.js';

export const EVENT_VISUAL = {
  drive: { icon: 'local_shipping', grad: 'from-primary to-primary-container', label: 'Drive' },
  workshop: { icon: 'build_circle', grad: 'from-secondary to-tertiary', label: 'Workshop' },
  green_event: { icon: 'compost', grad: 'from-tertiary to-tertiary-container', label: 'Green Event' },
};

const STEP_LABEL = ['Driver En Route', 'Collector Arrived', 'Lot Picked Up'];

function EventCard({ ev, onRsvp }) {
  const v = EVENT_VISUAL[ev.type] || EVENT_VISUAL.drive;
  return (
    <article className="card card-hover flex flex-col overflow-hidden !p-0">
      <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${v.grad}`}>
        <Icon name={v.icon} size={48} fill className="text-white/85" />
        <span className="absolute left-space-md top-space-md rounded-full bg-white/90 px-2.5 py-1 font-label-sm text-label-sm uppercase tracking-wide text-primary">{v.label}</span>
      </div>
      <div className="flex flex-1 flex-col gap-space-md p-space-md">
        <div className="flex-1 space-y-space-xs">
          <h3 className="h-card line-clamp-2">{ev.title}</h3>
          <p className="flex items-center gap-1.5 text-body-sm text-on-surface-variant"><Icon name="event" size={16} className="text-primary" />{ev.date} • {ev.time}</p>
          <p className="flex items-center gap-1.5 text-body-sm text-on-surface-variant"><Icon name="location_on" size={16} className="text-outline" />{ev.location}</p>
        </div>
        <div className="flex items-center justify-between gap-space-sm">
          <span className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant"><Icon name="groups" size={16} className="text-primary" />{ev.rsvps} Attending</span>
          <button type="button" onClick={() => onRsvp(ev.id)} className={`btn-sm ${ev.going ? 'btn-secondary' : 'btn-primary'}`}>
            {ev.going ? <><Icon name="check" size={16} />Going</> : 'RSVP'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const { state, me, actions } = useApp();
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const society = state.society;
  const gvh = state.societies.find((s) => s.id === 'gvh');
  const events = state.events.filter((e) => e.status === 'active' && (e.societyId === 'gvh' || e.societyId === 'all'));
  const job = state.jobs.find((j) => !j.closed && state.lots.find((l) => l.id === j.lotId)?.ownerId === 'ananya');
  const collector = job && collectorOf(job.collectorId);

  useLiveOnce('home-dispatch', 3500, () => {
    if (job) actions.notify('Person', { title: 'Live Dispatch', text: `S05: ${collector.name} is ${job.etaMin} mins away on Route #${job.route}.`, icon: 'local_shipping', to: `/exchange/${job.id}/tracking` });
  }, !!job);

  return (
    <main className="page stack">
      <PageHeader eyebrow={`${gvh.name} • ${me.flat}`} title={`Welcome back, ${me.name.split(' ')[0]}`} subtitle="Your society's circular economy at a glance." />

      {job ? (
        <section className="card relative flex flex-col items-start justify-between gap-space-md overflow-hidden md:flex-row md:items-center">
          <span className="absolute inset-y-0 left-0 w-1.5 bg-secondary-container" />
          <div className="flex items-center gap-space-md pl-space-xs">
            <Avatar name={collector.name} size={48} />
            <div>
              <div className="flex flex-wrap items-center gap-space-sm">
                <h2 className="h-card">{collector.name}</h2>
                <Badge tone="info"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />{STEP_LABEL[job.step]}</Badge>
              </div>
              <p className="mt-0.5 text-body-sm text-on-surface-variant">Assigned Collector • {collector.vehicle} Route #{job.route}</p>
            </div>
          </div>
          <Link to={`/exchange/${job.id}/tracking`} className="btn-primary w-full md:w-auto"><Icon name="near_me" size={18} />Track Pickup</Link>
        </section>
      ) : (
        <section className="card flex flex-col items-start justify-between gap-space-md md:flex-row md:items-center">
          <div className="flex items-center gap-space-md"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-low text-outline"><Icon name="local_shipping" size={24} /></span>
            <div><h2 className="h-card">No pickup in progress</h2><p className="text-body-sm text-on-surface-variant">Post a scrap lot and collectors nearby will send quotes.</p></div></div>
          <Link to="/exchange" className="btn-primary w-full md:w-auto"><Icon name="hail" size={18} />Request Pickup</Link>
        </section>
      )}

      <section className="grid gap-space-lg md:grid-cols-3">
        <article className="card card-hover flex flex-col justify-between gap-space-md">
          <div className="flex items-center justify-between"><span className="font-label-lg text-on-surface-variant">Fee Credit This Cycle</span><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-low text-primary-container"><Icon name="account_balance_wallet" size={22} fill /></span></div>
          <div>
            <div className="font-display-lg text-display-lg font-bold tracking-tight">{inr(society.creditThisCycle)}</div>
            <p className="mt-1 flex items-center gap-1 text-body-sm text-primary"><Icon name="trending_up" size={16} />Credited toward next maintenance fee</p>
          </div>
        </article>
        <article className="card card-hover flex flex-col justify-between gap-space-md">
          <div className="flex items-center justify-between"><span className="font-label-lg text-on-surface-variant">Next Collection Date</span><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-low text-primary-container"><Icon name="calendar_today" size={22} fill /></span></div>
          <div>
            <div className="font-headline-xl text-headline-xl font-bold tracking-tight">{society.nextPickup || '30 September 2026'}</div>
            <p className="mt-1 flex items-center gap-1 text-body-sm text-on-surface-variant"><Icon name="schedule" size={16} className="text-secondary" />Morning Slot: {society.slot}</p>
            <p className="mt-1.5 flex items-center gap-1 text-body-sm font-medium text-primary"><Icon name="local_shipping" size={16} />Collector ETA: {society.collectorEta || '10:30 AM'}</p>
          </div>
        </article>
        <article className="card card-hover flex flex-col justify-between gap-space-md">
          <div className="flex items-center justify-between"><span className="font-label-lg text-on-surface-variant">Society Trust Score</span><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-low text-primary-container"><Icon name="verified_user" size={22} fill /></span></div>
          <div className="flex items-center justify-between gap-space-md">
            <div>
              <div className="font-display-lg text-display-lg font-bold tracking-tight">{gvh.trust}<span className="font-headline-md text-headline-md font-normal text-outline">/100</span></div>
              <Badge tone="neutral" className="mt-1 !text-primary">{trustTier(gvh.trust)} Verified</Badge>
            </div>
            <Gauge value={gvh.trust} />
          </div>
        </article>
      </section>

      <section className="grid gap-space-md sm:grid-cols-2">
        <button type="button" onClick={() => navigate('/log-contribution')} className="btn-primary btn-lg"><Icon name="add_circle" size={22} />Log Contribution</button>
        <button type="button" onClick={() => navigate('/exchange')} className="btn-secondary btn-lg"><Icon name="hail" size={22} />Request Pickup</button>
      </section>

      <section className="stack !gap-space-md">
        <div className="flex items-baseline justify-between gap-space-md">
          <div className="flex items-baseline gap-space-sm"><h2 className="h-section">Events &amp; Workshops</h2><span className="eyebrow hidden sm:inline">Society Circular Calendar</span></div>
          <span className="font-label-md text-label-md font-semibold text-primary-container">{events.length} Upcoming</span>
        </div>
        <div className="grid gap-space-lg sm:grid-cols-2 lg:grid-cols-4">
          {events.map((ev) => <EventCard key={ev.id} ev={ev} onRsvp={actions.rsvp} />)}
          <button type="button" onClick={() => setCreating(true)} className="card card-hover flex min-h-[15rem] flex-col items-center justify-center gap-space-sm border-dashed text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-primary-container"><Icon name="add" size={26} /></span>
            <span className="h-card">Create Event</span>
            <span className="max-w-[12rem] text-body-sm text-on-surface-variant">Schedule a collection drive or sustainability workshop</span>
            <span className="mt-space-xs inline-flex items-center gap-1 font-label-sm text-label-sm font-semibold text-primary">Officer Portal<Icon name="arrow_forward" size={14} /></span>
          </button>
        </div>
      </section>

      <Modal open={creating} onClose={() => setCreating(false)} icon="event" title="Create Event" subtitle="Visible to all Green Valley Heights residents. Officer portal (Committee President).">
        <EventForm idPrefix="home-ev" submitLabel="Publish Event" onCancel={() => setCreating(false)} onSubmit={(ev) => { actions.createEvent({ ...ev, societyId: 'gvh' }); setCreating(false); }} />
      </Modal>
    </main>
  );
}
