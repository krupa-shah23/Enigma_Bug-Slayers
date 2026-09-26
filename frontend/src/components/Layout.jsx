import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppState.jsx';
import { Avatar, Icon } from './ui.jsx';

export const ROLE_META = {
  Person: { label: 'Person', login: '/person/login', home: '/home', profile: '/profile' },
  Ngo: { label: 'NGO Partner', login: '/ngo/login', home: '/ngo/dashboard', profile: '/ngo/verification' },
  Bhangarwala: { label: 'Scrape Collector', login: '/bhangarwala/login', home: '/bhangarwala/requests', profile: '/bhangarwala/profile' },
};

const NAV = {
  Person: [['Home', '/home'], ['Societies', '/societies'], ['My Society', '/my-society'], ['Exchange', '/exchange'], ['History', '/history'], ['Profile', '/profile']],
  Ngo: [['Dashboard', '/ngo/dashboard'], ['Societies', '/ngo/societies'], ['Contracts', '/ngo/contracts'], ['Collections', '/ngo/collections'], ['Payments', '/ngo/payments'], ['Events', '/ngo/events'], ['Profile', '/ngo/verification']],
  Bhangarwala: [['Requests', '/bhangarwala/requests'], ['Active Job', '/bhangarwala/active-job'], ['History', '/bhangarwala/history'], ['Profile', '/bhangarwala/profile']],
};

export function Logo({ to = '/', light = false }) {
  return (
    <Link to={to} className="flex items-center gap-space-sm" aria-label="ReWaste home">
      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${light ? 'bg-white/15 text-white' : 'bg-primary-container text-on-primary'}`}><Icon name="recycling" size={20} /></span>
      <span className={`font-headline-md text-headline-md font-bold tracking-tight ${light ? 'text-white' : 'text-primary'}`}>ReWaste</span>
    </Link>
  );
}

function useDismiss(open, onClose) {
  const box = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => box.current && !box.current.contains(e.target) && onClose();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open, onClose]);
  return box;
}

function NotificationBell({ role }) {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const items = state.notifications[role];
  const unread = items.filter((n) => !n.read).length;
  const close = () => { setOpen(false); if (unread) actions.markRead(role); };
  const box = useDismiss(open, close);
  return (
    <div ref={box} className="relative">
      <button type="button" aria-label="Notifications" aria-expanded={open} onClick={() => (open ? close() : setOpen(true))} className="relative flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">
        <Icon name="notifications" size={22} fill={open} />
        {unread > 0 && <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-semibold text-white">{unread}</span>}
      </button>
      {open && (
        <div className="pop-in absolute right-0 top-11 z-[65] w-[22rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-outline-variant/50 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-outline-variant/40 px-space-md py-space-sm">
            <h3 className="h-card">Notifications</h3>
            {items.length > 0 && <button type="button" className="font-label-md text-label-md text-primary hover:underline" onClick={() => actions.clearNotifications(role)}>Clear all</button>}
          </div>
          <ul className="max-h-96 overflow-y-auto">
            {items.length === 0 && <li className="px-space-md py-space-lg text-center text-body-md text-on-surface-variant">You're all caught up.</li>}
            {items.map((n) => (
              <li key={n.id}>
                <button type="button" onClick={() => { close(); if (n.to) navigate(n.to); }} className={`flex w-full items-start gap-space-sm px-space-md py-space-md text-left transition-colors hover:bg-surface-container-low ${n.read ? '' : 'bg-primary-fixed/15'}`}>
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-fixed text-secondary"><Icon name={n.icon || 'notifications'} size={18} fill /></span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-space-sm"><span className="font-label-lg text-label-lg text-on-surface">{n.title}</span><span className="shrink-0 text-body-sm text-outline">{n.time}</span></span>
                    <span className="mt-0.5 block text-body-sm text-on-surface-variant">{n.text}</span>
                  </span>
                  {!n.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-container" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function RoleMenu({ role }) {
  const { actions } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const box = useDismiss(open, () => setOpen(false));
  const go = (r) => { actions.login(r); setOpen(false); navigate(ROLE_META[r].home); };
  return (
    <div ref={box} className="relative hidden sm:block">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="inline-flex h-7 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 pl-3 pr-1.5 font-label-sm text-label-sm text-emerald-800 transition-colors hover:bg-emerald-100">
        {ROLE_META[role].label}<Icon name="expand_more" size={16} />
      </button>
      {open && (
        <div className="pop-in absolute right-0 top-9 z-[65] w-56 overflow-hidden rounded-xl border border-outline-variant/50 bg-white py-space-xs shadow-xl">
          <p className="eyebrow px-space-md py-space-xs">Switch demo role</p>
          {Object.entries(ROLE_META).map(([r, m]) => (
            <button key={r} type="button" onClick={() => go(r)} className={`flex w-full items-center gap-space-sm px-space-md py-space-sm text-left text-body-md hover:bg-surface-container-low ${r === role ? 'font-semibold text-primary' : 'text-on-surface'}`}>
              <Icon name={r === role ? 'radio_button_checked' : 'radio_button_unchecked'} size={18} />{m.label}
            </button>
          ))}
          <div className="my-space-xs border-t border-outline-variant/40" />
          <button type="button" onClick={() => { actions.resetDemo(); setOpen(false); navigate(ROLE_META[role].home); }} className="flex w-full items-center gap-space-sm px-space-md py-space-sm text-left text-body-md text-on-surface hover:bg-surface-container-low">
            <Icon name="restart_alt" size={18} />Reset demo data
          </button>
        </div>
      )}
    </div>
  );
}

function Header({ role }) {
  const { state, me, actions } = useApp();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const meta = ROLE_META[role];
  const liveJob = role === 'Bhangarwala' && state.jobs.some((j) => j.collectorId === 'ramesh' && !j.closed);
  useEffect(() => { setMenu(false); }, [pathname]);

  const logout = () => { navigate('/'); actions.logout(); };
  const link = ({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant/50 bg-white/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center gap-space-md px-gutter lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center justify-self-start"><Logo to={meta.home} /></div>
        <nav aria-label="Primary" className="hidden items-center gap-space-xs lg:flex">
          {NAV[role].map(([name, to]) => (
            <NavLink key={to} to={to} className={link}>
              {name}
              {name === 'Active Job' && liveJob && <span className="rounded-full bg-secondary-container px-1.5 py-0.5 text-[10px] font-bold text-on-secondary-container">LIVE</span>}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center justify-self-end gap-space-sm">
          <NotificationBell role={role} />
          <RoleMenu role={role} />
          <Link to={meta.profile} aria-label="Open profile" title="Profile" className="flex items-center gap-space-sm rounded-full transition-opacity hover:opacity-80">
            <Avatar name={me.name} src={me.avatar} size={32} />
          </Link>
          <button type="button" aria-label="Log out" title="Log out" onClick={logout} className="hidden h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-error sm:flex"><Icon name="logout" size={20} /></button>
          <button type="button" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)} className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low lg:hidden"><Icon name={menu ? 'close' : 'menu'} size={22} /></button>
        </div>
      </div>
      {menu && (
        <nav aria-label="Mobile" className="border-t border-outline-variant/40 bg-white px-gutter py-space-sm lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-space-xs">
            {NAV[role].map(([name, to]) => <NavLink key={to} to={to} className={link}>{name}</NavLink>)}
            <button type="button" onClick={logout} className="nav-link text-error"><Icon name="logout" size={18} />Log out</button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-outline-variant/50 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-space-sm px-gutter py-space-lg text-body-sm text-on-surface-variant sm:flex-row">
        <p>© 2025 ReWaste Materials Ledger. All rights reserved.</p>
        <p className="font-label-md text-label-md text-outline">Operational Circular Network</p>
      </div>
    </footer>
  );
}

const TOAST_ICON = { success: 'check_circle', info: 'info', warn: 'warning', error: 'error', live: 'bolt' };
const TOAST_COLOR = { success: 'bg-primary-fixed/50 text-primary', info: 'bg-surface-container-high text-on-surface-variant', warn: 'bg-amber-100 text-amber-800', error: 'bg-error-container text-error', live: 'bg-secondary-fixed text-secondary' };

export function ToastHost() {
  const { toasts, actions } = useApp();
  const navigate = useNavigate();
  return (
    <div aria-live="polite" className="pointer-events-none fixed right-gutter top-20 z-[70] flex w-[24rem] max-w-[calc(100vw-2rem)] flex-col gap-space-sm">
      {toasts.map((t) => (
        <div key={t.id} className={`toast-in pointer-events-auto flex items-start gap-space-sm rounded-xl border border-outline-variant/40 bg-white p-space-md shadow-xl ${t.to ? 'cursor-pointer' : ''}`}
          onClick={() => { if (t.to) { navigate(t.to); actions.dismissToast(t.id); } }}>
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${TOAST_COLOR[t.tone] || TOAST_COLOR.success}`}><Icon name={t.icon || TOAST_ICON[t.tone] || 'check_circle'} size={18} fill /></span>
          <div className="min-w-0 flex-1">
            {t.title && <p className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">{t.title}</p>}
            <p className="text-body-md text-on-surface">{t.text}</p>
          </div>
          <button type="button" aria-label="Dismiss" onClick={(e) => { e.stopPropagation(); actions.dismissToast(t.id); }} className="rounded p-0.5 text-outline hover:text-on-surface"><Icon name="close" size={18} /></button>
        </div>
      ))}
    </div>
  );
}

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export function RoleLayout({ role }) {
  const { role: current } = useApp();
  if (current !== role) return <Navigate to={ROLE_META[role].login} replace />;
  return (
    <div className="flex min-h-screen flex-col">
      <Header role={role} />
      <Outlet />
      <Footer />
    </div>
  );
}
