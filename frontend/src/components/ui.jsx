import { useEffect, useState } from 'react';
import { inr, initials, kg } from '../lib/format.js';

export function Icon({ name, fill = false, size = 20, className = '' }) {
  return (
    <span aria-hidden className={`material-symbols-outlined select-none leading-none ${className}`} style={{ fontSize: size, width: size, height: size, fontVariationSettings: fill ? "'FILL' 1" : undefined }}>
      {name}
    </span>
  );
}

const AVATAR_TONES = ['bg-primary-container text-on-primary', 'bg-secondary text-on-secondary', 'bg-tertiary text-on-tertiary', 'bg-primary-fixed-dim text-primary', 'bg-tertiary-container text-on-tertiary-container'];
export function Avatar({ name = '', src, size = 32, className = '' }) {
  const tone = AVATAR_TONES[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_TONES.length];
  const style = { width: size, height: size, fontSize: Math.max(11, size * 0.38) };
  if (src) return <img alt={name} src={src} style={style} className={`shrink-0 rounded-full object-cover ring-1 ring-outline-variant ${className}`} />;
  return <span style={style} className={`inline-flex shrink-0 items-center justify-center rounded-full font-label-lg font-semibold ${tone} ${className}`}>{initials(name)}</span>;
}

export function Badge({ tone = 'neutral', icon, children, className = '' }) {
  return (
    <span className={`badge-${tone} ${className}`}>
      {icon && <Icon name={icon} size={14} fill />}
      {children}
    </span>
  );
}

const STATUS_TONE = {
  Active: 'success', Paid: 'success', Disbursed: 'success', Completed: 'success', Verified: 'success', Accepted: 'success', Confirmed: 'success', Going: 'success',
  Offered: 'info', Archived: 'neutral', Cancelled: 'neutral', 'Under Review': 'warn', Pending: 'warn', 'Pending Payment': 'warn', 'Pending Confirmation': 'warn', Unpaid: 'danger',
  'Dispatch Assigned': 'neutral', Flagged: 'danger', 'Action Required': 'danger', 'Resolved with Penalty': 'success',
};
export const StatusBadge = ({ status }) => <Badge tone={STATUS_TONE[status] || 'neutral'}>{status}</Badge>;

export function Modal({ open, onClose, title, subtitle, icon, children, footer, wide = false }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-inverse-surface/50 p-space-md backdrop-blur-[2px]" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <section role="dialog" aria-modal="true" aria-label={title} className={`pop-in flex max-h-[90vh] w-full flex-col overflow-hidden rounded-xl bg-white shadow-xl ${wide ? 'max-w-3xl' : 'max-w-xl'}`}>
        <header className="flex items-start justify-between gap-space-md border-b border-outline-variant/40 px-space-lg py-space-md">
          <div className="flex items-start gap-space-sm">
            {icon && <Icon name={icon} className="mt-0.5 text-primary-container" size={24} />}
            <div>
              <h2 className="h-section">{title}</h2>
              {subtitle && <p className="mt-0.5 text-body-sm text-on-surface-variant">{subtitle}</p>}
            </div>
          </div>
          <button type="button" aria-label="Close dialog" onClick={onClose} className="btn-ghost btn-sm !px-1.5"><Icon name="close" /></button>
        </header>
        <div className="overflow-y-auto px-space-lg py-space-lg">{children}</div>
        {footer && <footer className="flex flex-wrap items-center justify-end gap-space-sm border-t border-outline-variant/40 bg-surface-container-low/50 px-space-lg py-space-md">{footer}</footer>}
      </section>
    </div>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-primary-container' : 'bg-outline-variant'}`}>
      <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </button>
  );
}

export function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-space-xs flex items-center gap-space-sm"><span className="h-1.5 w-1.5 rounded-full bg-primary-container" />{eyebrow}</p>}
        <h1 className="h-title">{title}</h1>
        {subtitle && <p className="muted mt-space-xs max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-space-sm">{actions}</div>}
    </div>
  );
}

export function StatCard({ label, value, note, icon, tone = 'default' }) {
  const toneText = tone === 'danger' ? 'text-error' : 'text-on-surface';
  return (
    <article className="card card-hover flex flex-col justify-between gap-space-md">
      <div className="flex items-center justify-between gap-space-md">
        <span className="font-label-lg text-label-lg text-on-surface-variant">{label}</span>
        {icon && <span className={`flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-low ${tone === 'danger' ? 'text-error' : 'text-primary-container'}`}><Icon name={icon} size={22} fill /></span>}
      </div>
      <div>
        <div className={`font-headline-xl text-headline-xl font-bold tracking-tight ${toneText}`}>{value}</div>
        {note && <p className="mt-1 text-body-sm text-on-surface-variant">{note}</p>}
      </div>
    </article>
  );
}

export function Gauge({ value = 0, size = 64, label }) {
  const r = 15.9155;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="meter" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
        <circle cx="18" cy="18" r={r} fill="none" strokeWidth="3.5" className="stroke-surface-container-high" />
        <circle cx="18" cy="18" r={r} fill="none" strokeWidth="3.5" strokeLinecap="round" strokeDasharray={`${value}, 100`} className="stroke-primary-container transition-all duration-700" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-label-md text-label-md font-bold text-primary">{label ?? `${value}%`}</span>
    </div>
  );
}

export function Pills({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-space-sm" role="tablist">
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        const active = opt.value === value;
        return (
          <button key={opt.value} type="button" role="tab" aria-selected={active} onClick={() => onChange(opt.value)}
            className={`inline-flex h-9 items-center gap-space-sm rounded-full border px-space-md font-label-lg text-label-lg transition-colors ${active ? 'border-primary-container bg-primary-container text-on-primary' : 'border-outline-variant bg-white text-on-surface-variant hover:bg-surface-container-low'}`}>
            {opt.label}
            {opt.count != null && <span className={`rounded-full px-1.5 text-label-sm ${active ? 'bg-white/20' : 'bg-surface-container-high'}`}>{opt.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function EmptyState({ icon = 'inbox', title, text }) {
  return (
    <div className="flex flex-col items-center gap-space-sm px-space-lg py-space-xl text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-low text-outline"><Icon name={icon} size={26} /></span>
      <h3 className="h-card">{title}</h3>
      {text && <p className="muted max-w-sm">{text}</p>}
    </div>
  );
}

export function Field({ label, hint, children, className = '' }) {
  return (
    <label className={`field ${className}`}>
      {label && <span className="label">{label}</span>}
      {children}
      {hint && <span className="text-body-sm text-on-surface-variant">{hint}</span>}
    </label>
  );
}

export function IconInput({ icon, right, ...props }) {
  return (
    <div className="relative">
      <Icon name={icon} size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
      <input {...props} className={`input pl-10 ${right ? 'pr-11' : ''}`} />
      {right && <div className="absolute right-2 top-1/2 -translate-y-1/2">{right}</div>}
    </div>
  );
}

export function Stepper({ steps, active }) {
  return (
    <ol className="flex w-full items-start">
      {steps.map((step, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <li key={step.label} className="relative flex flex-1 flex-col items-center gap-space-xs text-center">
            {i > 0 && <span className={`absolute right-1/2 top-[18px] h-0.5 w-full ${i <= active ? 'bg-primary-container' : 'bg-outline-variant'}`} />}
            <span className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors ${done || current ? 'border-primary-container bg-primary-container text-on-primary' : 'border-outline-variant bg-white text-outline'} ${current ? 'ring-4 ring-primary-container/20' : ''}`}>
              <Icon name={done ? 'check' : step.icon} size={18} />
            </span>
            <span className={`font-label-md text-label-md ${done || current ? 'text-primary' : 'text-outline'}`}>{step.label}</span>
            <span className="text-body-sm text-on-surface-variant">{done ? 'Done' : current ? 'In progress' : 'Pending'}</span>
          </li>
        );
      })}
    </ol>
  );
}

// Payment split ledger, shared by resident history and NGO payments.
export function SplitModal({ payment, onClose, title, subtitle }) {
  if (!payment) return null;
  return (
    <Modal open onClose={onClose} title={title} subtitle={subtitle} icon="account_balance_wallet" wide
      footer={<button type="button" className="btn-primary" onClick={onClose}>Close Ledger</button>}>
      <div className="overflow-x-auto rounded-lg border border-outline-variant/50">
        <table className="tbl">
          <thead><tr><th>Resident</th><th>Flat</th><th className="text-right">Weight</th><th className="text-right">Net Share</th></tr></thead>
          <tbody>
            {payment.split.map((r) => (
              <tr key={r.name} className={r.you ? 'bg-primary-fixed/20' : ''}>
                <td className="font-label-lg">{r.name}{r.you && <span className="ml-2 text-primary">(You)</span>}</td>
                <td className="text-on-surface-variant">{r.flat}</td>
                <td className="text-right">{kg(r.kg)}</td>
                <td className="text-right font-label-lg">{inr(r.share, 2)}</td>
              </tr>
            ))}
            <tr className="bg-surface-container-low/60 font-label-lg">
              <td colSpan={2}>Total Reconciled</td>
              <td className="text-right">{kg(payment.split.reduce((a, r) => a + r.kg, 0))}</td>
              <td className="text-right">{inr(payment.amount, 2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-space-md flex items-center gap-space-sm text-body-sm text-on-surface-variant"><Icon name="verified" size={16} className="text-primary-container" fill />Allocated in proportion to each household's weigh-in. Audited by the ReWaste circular ledger.</p>
    </Modal>
  );
}

// ---- Stylised map used by request feed, tracking and active job ----
export function MapCanvas({ children, className = '', zoomable = true }) {
  const [zoom, setZoom] = useState(1);
  return (
    <div className={`relative overflow-hidden rounded-xl border border-outline-variant/40 bg-[#f2efe9] ${className}`}>
      <div className="absolute inset-0 origin-center transition-transform duration-300" style={{ transform: `scale(${zoom})` }}>
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" fontFamily="Inter, Arial, sans-serif">
          <rect width="800" height="500" fill="#f2efe9" />
          <rect x="40" y="50" width="170" height="120" rx="6" fill="#c8e6c9" />
          <rect x="590" y="310" width="190" height="150" rx="6" fill="#c8e6c9" />
          <path d="M-10 420 C 120 380, 200 470, 340 440 S 520 470, 810 400 L 810 510 L -10 510 Z" fill="#aadaff" />
          <g fill="#e6e2d8"><rect x="240" y="40" width="80" height="60" /><rect x="450" y="30" width="90" height="70" /><rect x="620" y="60" width="120" height="80" /><rect x="60" y="230" width="110" height="70" /><rect x="470" y="330" width="90" height="60" /></g>
          <g stroke="#dadce0" strokeWidth="18" fill="none" strokeLinecap="round"><path d="M-20 130 L 820 170" /><path d="M560 -20 L 600 520" /><path d="M-20 260 L 820 300" /><path d="M200 -20 L 180 520" /></g>
          <g stroke="#ffffff" strokeWidth="14" fill="none" strokeLinecap="round"><path d="M-20 130 L 820 170" /><path d="M560 -20 L 600 520" /><path d="M-20 260 L 820 300" /><path d="M200 -20 L 180 520" /></g>
          <path d="M-20 320 C 200 250, 420 380, 820 240" stroke="#e8b84a" strokeWidth="24" fill="none" />
          <path d="M-20 320 C 200 250, 420 380, 820 240" stroke="#fce08c" strokeWidth="18" fill="none" />
          <path d="M290 -20 C 310 160, 430 300, 410 520" stroke="#e8b84a" strokeWidth="22" fill="none" />
          <path d="M290 -20 C 310 160, 430 300, 410 520" stroke="#fce08c" strokeWidth="16" fill="none" />
          <g fontSize="11" fill="#5f6368"><text x="70" y="115">Riverside Park</text><text x="620" y="395">Central Park</text><text x="330" y="150" transform="rotate(4 330 150)">Golf Course Rd</text><text x="60" y="292">Sector 5 Inner Ring Rd</text><text x="60" y="470" fill="#3a7bbf">Yamuna Canal</text></g>
        </svg>
      </div>
      <div className="absolute inset-0">{children}</div>
      {zoomable && (
        <div className="absolute bottom-space-md right-space-md flex flex-col overflow-hidden rounded-lg border border-outline-variant/50 bg-white shadow">
          <button type="button" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.2).toFixed(1)))} className="flex h-9 w-9 items-center justify-center hover:bg-surface-container-low"><Icon name="add" /></button>
          <button type="button" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(1, +(z - 0.2).toFixed(1)))} className="flex h-9 w-9 items-center justify-center border-t border-outline-variant/50 hover:bg-surface-container-low"><Icon name="remove" /></button>
        </div>
      )}
    </div>
  );
}

const PIN_TONE = { primary: 'bg-primary-container text-on-primary', accent: 'bg-secondary-container text-on-secondary-container', warn: 'bg-amber-400 text-white', muted: 'bg-white text-primary border border-outline-variant' };
export function Pin({ x, y, icon, label, tone = 'primary', pulse = false, style }) {
  return (
    <div className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition-all duration-1000 ease-linear" style={{ left: `${x}%`, top: `${y}%`, ...style }}>
      <span className="relative flex">
        {pulse && <span className="absolute inset-0 animate-ping rounded-full bg-primary-container/40" />}
        <span className={`relative flex h-9 w-9 items-center justify-center rounded-full shadow-md ring-2 ring-white ${PIN_TONE[tone]}`}><Icon name={icon} size={18} fill /></span>
      </span>
      {label && <span className="whitespace-nowrap rounded-md bg-white/95 px-2 py-0.5 font-label-sm text-label-sm text-on-surface shadow-sm">{label}</span>}
    </div>
  );
}
