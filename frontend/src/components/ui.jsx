import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { inr, initials } from '../lib/format.js';

// Fix Leaflet's default marker icon paths bug in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Icon Creator function with HTML/SVG matching app's design system
const createCustomIcon = (iconName, labelText, tone = 'primary', pulse = false) => {
  const bgColors = {
    primary: '#2E7D32', // dark green circular pin for Junkcleaner/vehicle
    accent: '#1565C0',  // blue
    warn: '#F9A825',    // amber
    muted: '#FFFFFF',   // white
    secondary: '#1B5E20'
  };

  const textColors = {
    primary: '#FFFFFF',
    accent: '#FFFFFF',
    warn: '#FFFFFF',
    muted: '#2E7D32',
    secondary: '#FFFFFF'
  };

  const bgColor = bgColors[tone] || bgColors.primary;
  const textColor = textColors[tone] || textColors.primary;

  const html = `
    <div style="position: relative; display: flex; flex-direction: column; items-center; justify-content: center; transform: translate(-50%, -50%); cursor: pointer;">
      ${pulse ? `<div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background-color: rgba(46, 125, 50, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; top: 0; left: 0;"></div>` : ''}
      <div style="position: relative; width: 36px; height: 36px; border-radius: 50%; background-color: ${bgColor}; color: ${textColor}; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 2px solid white;">
        <span class="material-symbols-outlined" style="font-size: 20px; font-variation-settings: 'FILL' 1;">${iconName}</span>
      </div>
      ${labelText ? `<div style="white-space: nowrap; border-radius: 6px; background-color: rgba(255, 255, 255, 0.95); padding: 2px 8px; font-size: 11px; font-weight: 600; color: #1c1b1f; box-shadow: 0 1px 3px rgba(0,0,0,0.12); margin-top: 4px; text-align: center;">${labelText}</div>` : ''}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

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

// REAL OPENSTREETMAP COORDINATES (SIES Graduate School of Technology, Nerul, Navi Mumbai)
const SIES_GST_CENTER = [19.0304, 73.0297];

// Converts relative percentage positions (0-100) to lat/lng offsets around SIES GST Nerul
function percentToLatLng(x, y) {
  const latOffset = (50 - y) * 0.0003;
  const lngOffset = (x - 50) * 0.0003;
  return [SIES_GST_CENTER[0] + latOffset, SIES_GST_CENTER[1] + lngOffset];
}

export function MapCanvas({ children, className = '', zoomable = true }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-outline-variant/40 bg-[#f2efe9] ${className}`}>
      <MapContainer
        center={SIES_GST_CENTER}
        zoom={15}
        scrollWheelZoom={zoomable}
        zoomControl={zoomable}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </div>
  );
}

export function Pin({ x, y, lat, lng, icon, label, tone = 'primary', pulse = false, style, onClick }) {
  const [position, setPosition] = useState(() => {
    if (lat != null && lng != null) return [lat, lng];
    if (x != null && y != null) return percentToLatLng(x, y);
    return SIES_GST_CENTER;
  });

  useEffect(() => {
    if (lat != null && lng != null) {
      setPosition([lat, lng]);
    } else if (x != null && y != null) {
      setPosition(percentToLatLng(x, y));
    }
  }, [x, y, lat, lng]);

  const customIcon = createCustomIcon(icon, label, tone, pulse);

  return (
    <Marker
      position={position}
      icon={customIcon}
      eventHandlers={{
        click: () => onClick && onClick(),
      }}
    >
      {label && <Popup>{label}</Popup>}
    </Marker>
  );
}

export function MapRoute({ from, to, color = '#2E7D32', dashArray = '8 8' }) {
  const fromPos = from.lat != null ? [from.lat, from.lng] : percentToLatLng(from.x, from.y);
  const toPos = to.lat != null ? [to.lat, to.lng] : percentToLatLng(to.x, to.y);

  return (
    <Polyline
      positions={[fromPos, toPos]}
      pathOptions={{ color, dashArray, weight: 4 }}
    />
  );
}
