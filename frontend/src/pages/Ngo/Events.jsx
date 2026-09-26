import { useState } from 'react';
import { useApp } from '../../state/AppState.jsx';
import { EVENT_TYPES } from '../../data/seed.js';
import EventForm from '../../components/EventForm.jsx';
import { Badge, Icon, Modal, PageHeader, StatCard } from '../../components/ui.jsx';

export default function Events() {
  const { state, actions } = useApp();
  const [edit, setEdit] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const societies = [{ id: 'all', name: 'All Affiliated Societies' }, ...state.societies.filter((s) => s.trust != null)];
  const name = (id) => societies.find((s) => s.id === id)?.name || id;
  const live = state.events.filter((e) => e.status === 'active');

  return (
    <main className="page stack">
      <PageHeader eyebrow="Grassroots Community Engagement" title="Society Circular Events & Workshops" subtitle="Organize collection drives, upcycling workshops, and sustainability sessions." />
      <section className="grid gap-space-lg md:grid-cols-2">
        <StatCard label="Scheduled" icon="calendar_month" value={`${live.length} Drives`} note="Active events across societies" />
        <StatCard label="Total RSVPs" icon="group" value={`${live.reduce((a, e) => a + e.rsvps, 0)} Confirmed`} note="Updates live as residents RSVP" />
      </section>
      <div className="grid items-start gap-space-lg lg:grid-cols-5">
        <section className="card stack !gap-space-md lg:col-span-2">
          <div className="flex items-center justify-between"><div className="flex items-center gap-space-sm"><Icon name="add_circle" className="text-primary-container" /><h2 className="h-section">Publish New Event</h2></div><Badge tone="neutral">NGO Portal</Badge></div>
          <EventForm key={formKey} idPrefix="ngo-ev" societies={societies} onSubmit={(ev) => { actions.createEvent(ev, 'Ngo'); setFormKey((k) => k + 1); }} />
        </section>
        <section className="card !p-0 lg:col-span-3">
          <div className="p-space-lg pb-space-md"><h2 className="h-section">Organized Events Roster</h2><p className="muted">Live record of grassroots collection and engagement sessions</p></div>
          <div className="overflow-x-auto"><table className="tbl">
            <thead><tr><th>Title</th><th>Type</th><th>Date</th><th className="text-right">RSVPs</th><th>Actions</th></tr></thead>
            <tbody>{state.events.map((e) => (
              <tr key={e.id} className={e.status === 'cancelled' ? 'opacity-60' : ''}>
                <td className="min-w-52"><p className="font-label-lg text-label-lg">{e.title}</p><p className="flex items-center gap-1 text-body-sm text-on-surface-variant"><Icon name={e.societyId === 'all' ? 'domain' : 'apartment'} size={14} />{name(e.societyId)}</p></td>
                <td><Badge tone={e.status === 'cancelled' ? 'neutral' : 'info'}>{e.status === 'cancelled' ? 'Cancelled' : EVENT_TYPES.find((t) => t.value === e.type)?.label}</Badge></td>
                <td className="whitespace-nowrap">{e.date}<br /><span className="text-body-sm text-on-surface-variant">{e.time}</span></td>
                <td className="whitespace-nowrap text-right"><span className="inline-flex items-center gap-1"><Icon name="how_to_reg" size={16} className="text-primary" />{e.rsvps}</span></td>
                <td><div className="flex gap-space-xs"><button type="button" className="btn-secondary btn-sm" onClick={() => setEdit(e)}>Edit</button>{e.status === 'cancelled' ? <button type="button" className="btn-secondary btn-sm" onClick={() => actions.setEventStatus(e.id, 'active')}>Reinstate</button> : <button type="button" className="btn-danger btn-sm" onClick={() => actions.setEventStatus(e.id, 'cancelled')}>Cancel</button>}</div></td>
              </tr>))}</tbody></table></div>
          <p className="flex items-center gap-1.5 border-t border-outline-variant/40 p-space-md text-body-sm text-on-surface-variant"><Icon name="verified" size={16} className="text-primary-container" />Automated notifications are dispatched to registered residents upon publication. Showing {state.events.length} entries.</p>
        </section>
      </div>
      <Modal open={!!edit} onClose={() => setEdit(null)} icon="edit_calendar" title="Edit Event" subtitle={edit?.title}>
        {edit && <EventForm idPrefix="edit-ev" initial={edit} societies={societies} submitLabel="Save Changes" onCancel={() => setEdit(null)} onSubmit={(ev) => { actions.updateEvent(edit.id, ev); setEdit(null); }} />}
      </Modal>
    </main>
  );
}
