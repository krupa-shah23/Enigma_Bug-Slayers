import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppState.jsx';
import { Avatar, Field, Icon } from './ui.jsx';

// Shared editable profile for Person / Bhangarwala. `fields` describes the editable inputs.
export default function ProfileForm({ role, title, subtitle, fields, extra }) {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const user = state.users[role];
  const [form, setForm] = useState(() => Object.fromEntries(fields.map((f) => [f.key, user[f.key] ?? ''])));
  const [avatar, setAvatar] = useState(user.avatar);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const pick = (e) => { const file = e.target.files?.[0]; if (file) setAvatar(URL.createObjectURL(file)); };
  const save = (e) => { e.preventDefault(); actions.updateProfile(role, { ...form, avatar }); actions.toast('Profile changes saved.'); };
  const logout = () => { navigate('/'); actions.logout(); };

  return (
    <main className="page-narrow stack">
      <div><h1 className="h-title">{title}</h1><p className="muted mt-space-xs">{subtitle}</p></div>
      <form onSubmit={save} className="card stack">
        <div className="flex flex-col items-start gap-space-md sm:flex-row sm:items-center">
          <Avatar name={form.name || user.name} src={avatar} size={80} />
          <div>
            <label className="btn-secondary cursor-pointer"><Icon name="photo_camera" size={18} />Change Avatar<input type="file" accept="image/*" className="sr-only" onChange={pick} /></label>
            <p className="mt-space-xs text-body-sm text-on-surface-variant">JPG or PNG, max 2MB</p>
          </div>
        </div>
        <div className="grid gap-space-md">
          {fields.map((f) => (
            <Field key={f.key} label={f.label} hint={f.hint}>
              <div className="relative">
                <Icon name={f.icon} size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input className="input pl-10" value={form[f.key]} onChange={set(f.key)} disabled={f.readOnly} type={f.type || 'text'} />
                {f.readOnly && <Icon name="lock" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline" />}
              </div>
            </Field>
          ))}
        </div>
        {extra}
        <div className="flex flex-col-reverse justify-between gap-space-sm border-t border-outline-variant/40 pt-space-lg sm:flex-row">
          <button type="button" className="btn-danger" onClick={logout}><Icon name="logout" size={18} />Log Out</button>
          <button type="submit" className="btn-primary"><Icon name="check" size={18} />Save Changes</button>
        </div>
      </form>
    </main>
  );
}
