import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppState.jsx';
import { Avatar, Badge, Field, Icon, Modal, StatusBadge } from '../../components/ui.jsx';

export default function Verification() {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const user = state.users.Ngo;
  const v = state.verification;
  const [org, setOrg] = useState(user.org);
  const [phone, setPhone] = useState(user.phone);
  const [avatar, setAvatar] = useState(user.avatar);
  const [preview, setPreview] = useState(false);
  const pickDoc = (e) => { const f = e.target.files?.[0]; if (f) actions.setVerificationDoc(f.name, `${(f.size / 1048576).toFixed(1)} MB`); e.target.value = ''; };
  const pickAvatar = (e) => { const f = e.target.files?.[0]; if (f) setAvatar(URL.createObjectURL(f)); };
  const saveProfile = () => { actions.updateProfile('Ngo', { org, phone, avatar }); actions.toast('NGO profile saved.'); };
  const logout = () => { navigate('/'); actions.logout(); };

  return (
    <main className="page-narrow stack">
      <div className="flex flex-col justify-between gap-space-md sm:flex-row sm:items-end">
        <div><p className="eyebrow mb-space-xs flex items-center gap-space-sm"><Icon name="verified_user" size={14} />Compliance Clearance Node</p><h1 className="h-title">NGO Profile &amp; Institutional Verification</h1><p className="muted mt-space-xs">Submit statutory compliance documents for zero-landfill procurement authority.</p></div>
      </div>

      <section className="card stack !gap-space-md">
        <div className="flex items-start justify-between gap-space-md"><div><h2 className="h-section">Organization Statutory Verification</h2><p className="muted">Zero-landfill regulatory documentation &amp; credentialing</p></div><StatusBadge status={v.status} /></div>
        <Field label="Organization Name"><div className="relative"><Icon name="apartment" size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline" /><input className="input pl-10" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Enter legal entity name" /></div></Field>
        <div className="field">
          <span className="label">Institutional Registration / 80G / 12A Certificate</span>
          {v.docName ? (
            <div className="flex items-center gap-space-md rounded-lg border border-outline-variant/50 p-space-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-error-container text-error"><Icon name="picture_as_pdf" size={24} /></span>
              <div className="min-w-0 flex-1"><p className="truncate font-label-lg text-label-lg">{v.docName}</p><p className="text-body-sm text-on-surface-variant">{v.docSize} • Signed 80G / 12A</p></div>
              <button type="button" aria-label="View document" className="btn-ghost btn-sm !px-1.5" onClick={() => setPreview(true)}><Icon name="visibility" size={20} /></button>
              <button type="button" aria-label="Remove document" className="btn-ghost btn-sm !px-1.5" disabled={v.status === 'Verified'} onClick={() => actions.setVerificationDoc('', '')}><Icon name="close" size={20} /></button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed border-outline-variant bg-surface-container-low/50 px-space-md py-space-lg text-center hover:bg-surface-container-low">
              <Icon name="upload_file" size={28} className="text-primary-container" /><span className="font-label-lg text-label-lg">Drag &amp; drop NGO Registration / Tax Exemption PDF or <span className="text-primary underline">Browse files</span></span><span className="text-body-sm text-on-surface-variant">Max 10MB • PDF with stamp certification</span>
              <input type="file" accept="application/pdf,image/*" className="sr-only" onChange={pickDoc} />
            </label>
          )}
        </div>
        {v.status === 'Verified' && <p className="flex items-center gap-1.5 rounded-lg bg-primary-fixed/30 p-space-md text-body-md text-primary"><Icon name="verified" size={20} fill />Verified by {v.reviewer}. Zero-landfill procurement authority granted.</p>}
        <div className="flex flex-col gap-space-sm border-t border-outline-variant/40 pt-space-lg sm:flex-row sm:justify-end">
          <button type="button" className="btn-secondary" disabled={v.status !== 'Under Review'} onClick={actions.approveVerification}><Icon name="verified" size={18} />Simulate Approval</button>
          <button type="button" className="btn-primary" disabled={!v.docName || v.status !== 'Pending'} onClick={actions.submitVerification}><Icon name="send" size={18} />Submit Verification Documents</button>
        </div>
      </section>

      <section className="card stack !gap-space-md">
        <div><h2 className="h-section">NGO Lead Profile</h2><p className="muted">Primary account authority &amp; communication channel</p></div>
        <div className="flex items-center gap-space-md"><Avatar name={user.org} src={avatar} size={72} /><div><label className="btn-secondary cursor-pointer"><Icon name="photo_camera" size={18} />Change Logo / Avatar<input type="file" accept="image/*" className="sr-only" onChange={pickAvatar} /></label><p className="mt-1 flex items-center gap-1 text-body-sm text-on-surface-variant"><Icon name="shield" size={14} />{user.name} • {user.email}</p></div></div>
        <Field label="Registered Contact Phone"><div className="relative"><Icon name="call" size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline" /><input className="input pl-10" value={phone} onChange={(e) => setPhone(e.target.value)} /></div></Field>
        <div className="flex flex-col-reverse justify-between gap-space-sm border-t border-outline-variant/40 pt-space-lg sm:flex-row">
          <button type="button" className="btn-danger" onClick={logout}><Icon name="logout" size={18} />Logout</button>
          <button type="button" className="btn-primary" onClick={saveProfile}><Icon name="check" size={18} />Save Changes</button>
        </div>
      </section>

      <Modal open={preview} onClose={() => setPreview(false)} icon="picture_as_pdf" title={v.docName} subtitle={`${v.docSize} • Statutory certificate`} footer={<button type="button" className="btn-primary" onClick={() => setPreview(false)}>Close</button>}>
        <div className="rounded-lg border border-outline-variant/50 bg-surface-container-low/50 p-space-lg text-center"><Icon name="workspace_premium" size={48} className="text-primary-container" /><p className="h-card mt-space-sm">Certificate of Registration • 80G / 12A</p><p className="muted">{org}</p><Badge tone="success" className="mt-space-sm" icon="verified">Signature verified</Badge></div>
      </Modal>
    </main>
  );
}
