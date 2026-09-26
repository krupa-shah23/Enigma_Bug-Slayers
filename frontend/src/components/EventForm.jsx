import { useState } from 'react';
import { EVENT_TYPES } from '../data/seed.js';
import { fmtDate, fmtTime, toInputDate, toInputTime } from '../lib/format.js';
import { Field, Icon } from './ui.jsx';

// Shared by the resident "Create Event" modal and the NGO publish/edit forms.
export default function EventForm({ initial, societies, onSubmit, submitLabel = 'Publish Event', onCancel, idPrefix = 'ev' }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    type: initial?.type || 'drive',
    societyId: initial?.societyId || societies?.[0]?.id || 'gvh',
    date: initial ? toInputDate(initial.date) : '2025-11-20',
    time: initial ? toInputTime(initial.time) : '09:30',
    location: initial?.location || '',
    desc: initial?.desc || '',
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const valid = form.title.trim() && form.location.trim() && form.date && form.time;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    onSubmit({ title: form.title.trim(), type: form.type, societyId: form.societyId, date: fmtDate(form.date), time: fmtTime(form.time), location: form.location.trim(), desc: form.desc.trim() });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-space-md" id={`${idPrefix}-form`}>
      <Field label="Event Title *"><input className="input" value={form.title} onChange={set('title')} placeholder="e.g. Diwali E-Waste & Appliance Collection Drive" required /></Field>
      <div className="grid gap-space-md sm:grid-cols-2">
        <Field label="Event Type *"><select className="input" value={form.type} onChange={set('type')}>{EVENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></Field>
        {societies ? (
          <Field label="Target Society"><select className="input" value={form.societyId} onChange={set('societyId')}>{societies.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
        ) : <Field label="Audience"><input className="input" value="Green Valley Heights residents" disabled /></Field>}
      </div>
      <div className="grid gap-space-md sm:grid-cols-2">
        <Field label="Date *"><input type="date" className="input" value={form.date} onChange={set('date')} required /></Field>
        <Field label="Time *"><input type="time" className="input" value={form.time} onChange={set('time')} required /></Field>
      </div>
      <Field label="Staging Bay / Location *"><input className="input" value={form.location} onChange={set('location')} placeholder="e.g. Community Clubhouse & Staging Bay" required /></Field>
      <Field label="Description & Instructions"><textarea className="input" rows={3} value={form.desc} onChange={set('desc')} placeholder="Community-wide collection drive. Sorting bins available on site." /></Field>
      <div className="flex justify-end gap-space-sm">
        {onCancel && <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="btn-primary" disabled={!valid}><Icon name="add" size={18} />{submitLabel}</button>
      </div>
    </form>
  );
}
