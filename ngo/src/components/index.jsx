import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const profilePathByRole = {
  Person: '/profile',
  Ngo: '/ngo/verification',
  Bhangarwala: '/bhangarwala/profile'
};

const navByRole = {
  Person: [
    ['Home', '/home'],
    ['Societies', '/societies'],
    ['My Society', '/my-society'],
    ['Exchange', '/exchange'],
    ['History', '/history']
  ],
  Ngo: [
    ['Dashboard', '/ngo/dashboard'],
    ['Societies', '/ngo/societies'],
    ['Contracts', '/ngo/contracts'],
    ['Collections', '/ngo/collections'],
    ['Events', '/ngo/events']
  ],
  Bhangarwala: [
    ['Requests', '/bhangarwala/requests'],
    ['Active Job', '/bhangarwala/active-job'],
    ['History', '/bhangarwala/history']
  ]
};

export function Navbar({ variant = 'Person', className, children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Live Dispatch Update',
      desc: 'Bhangarwala Ramesh updated pickup status to Arrived',
      time: 'Just now',
      unread: true
    },
    {
      id: 2,
      title: 'Batch Verified',
      desc: 'NGO EcoAction verified 120kg PET Plastic batch',
      time: '15m ago',
      unread: true
    },
    {
      id: 3,
      title: 'New Contract Available',
      desc: 'Green Valley Society posted a new quarterly collection run',
      time: '1h ago',
      unread: true
    }
  ]);

  const profilePath = profilePathByRole[variant] || '/profile';

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    setUnreadCount(0);
  };

  const dismissNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    setUnreadCount(updated.filter(n => n.unread).length);
  };

  if (children) return <nav className={className}>{children}</nav>;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* TASK 2: Logo links to Role's Profile Page */}
        <Link
          to={profilePath}
          title={`Click to view ${variant} Profile`}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">recycling</span>
          </div>
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">ReWaste</span>
        </Link>

        {/* Navigation Links WITHOUT Profile */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {navByRole[variant]?.map(([name, to]) => {
            const isActive = pathname === to || (to !== '/' && pathname.startsWith(to) && to.length > 5);
            return (
              <Link
                key={to}
                to={to}
                className={`rounded-lg px-3 py-1.5 font-label-lg text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-primary text-white font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-primary hover:bg-emerald-50/60 font-medium'
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Notifications Bell & Profile Avatar */}
        <div className="flex items-center gap-3 relative">
          
          {/* TASK 1: Notifications Bell Button */}
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-emerald-50 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-secondary-container ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-sm font-bold text-on-surface">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-emerald-100 text-emerald-800 font-label-sm text-xs px-2 py-0.5 rounded-full font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="font-label-sm text-xs text-primary hover:underline font-semibold cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-body-sm text-center py-6 text-on-surface-variant">No new notifications</p>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-xl border transition-colors flex items-start justify-between gap-2 ${
                        n.unread ? 'bg-emerald-50/50 border-emerald-100' : 'bg-gray-50/50 border-gray-100'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-label-md text-xs font-bold text-on-surface line-clamp-1">{n.title}</span>
                          <span className="font-body-sm text-[10px] text-outline shrink-0">{n.time}</span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-snug">{n.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => dismissNotification(n.id)}
                        className="text-gray-400 hover:text-gray-600 p-0.5 rounded"
                        title="Dismiss"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-3 mt-2 border-t border-gray-100 text-center">
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="font-label-sm text-xs text-on-surface-variant hover:text-primary font-medium cursor-pointer"
                >
                  Close Notifications
                </button>
              </div>
            </div>
          )}

          {/* Role Badge */}
          <span className="rounded-full bg-emerald-100/80 text-[#0d631b] border border-emerald-200/60 px-3 py-1 font-label-sm text-xs font-semibold">
            {variant}
          </span>

          {/* Profile Avatar Button */}
          <button
            type="button"
            onClick={() => navigate(profilePath)}
            title="Go to Profile"
            className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/20 hover:ring-primary transition-all cursor-pointer"
          >
            <img
              alt="User Avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPgf1R8-C9KtO74b0DTwy8-hSJibHRzegzP7HZ2l7U_XyJaXe2XIJV1NvvNf8Yb3YyWBe-t9mtW_W0aaYglDw8zqDhXx2Qn3j9fP6s2nNL4cdjJsbeidTrZ-jbDDNjjjBy-_3Th_O8c8oKoTm_ihFtdU5TTYi8csrr-mD2LddOyEHyHzscf2nQOqnKgG8M790yl9XYy0F8BkDRzJL-g5Ia0Vn3M_hcoSDyK3EJqGaCI4BQTt25MJQJHQ"
            />
          </button>

        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-gray-200 bg-white py-6">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-body-sm text-on-surface-variant">
        <span>© 2025 ReWaste Materials Ledger. All rights reserved.</span>
        <span className="font-medium text-emerald-800">Operational Circular Network</span>
      </div>
    </footer>
  );
}

export function SocietyCard({ name = 'Community Society', children }) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      {children || <h2 className="font-headline-md text-headline-md font-semibold text-on-surface">{name}</h2>}
    </article>
  );
}

export function TrustScoreGauge({ score = 94.8 }) {
  return (
    <div
      className="grid h-16 w-16 place-items-center rounded-full border-4 border-primary font-label-lg font-bold text-primary shadow-xs"
      role="meter"
      aria-valuenow={score}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {score}%
    </div>
  );
}

export function StatusStepper({ steps = ['Created', 'In Transit', 'Verified', 'Dispersed'], active = 0 }) {
  return (
    <ol className="flex items-center gap-2 w-full">
      {steps.map((step, i) => (
        <li
          key={step}
          className={`flex-1 border-t-2 pt-2 text-label-sm font-semibold transition-colors ${
            i <= active ? 'border-primary text-primary' : 'border-gray-200 text-outline'
          }`}
        >
          {step}
        </li>
      ))}
    </ol>
  );
}

export function MapPanel({ children }) {
  return (
    <section className="relative min-h-64 overflow-hidden rounded-2xl border border-gray-200 bg-surface-container-high p-6 shadow-xs">
      {children}
    </section>
  );
}

export function StatCard({ label, value, trend }) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <p className="text-body-sm text-on-surface-variant font-medium">{label}</p>
      <div className="flex items-baseline justify-between mt-2">
        <strong className="font-headline-lg text-headline-lg font-bold text-on-surface">{value}</strong>
        {trend && <span className="text-label-sm font-semibold text-primary bg-emerald-50 px-2 py-0.5 rounded-full">{trend}</span>}
      </div>
    </article>
  );
}

export function EventCard({ title, children }) {
  return (
    <article className="border-l-4 border-primary bg-white p-4 rounded-r-xl border-y border-r border-gray-100 shadow-xs">
      <h3 className="font-label-lg font-bold text-on-surface">{title}</h3>
      <div className="mt-1 text-body-md text-on-surface-variant">{children}</div>
    </article>
  );
}

export function QuoteCard({ children }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      {children}
    </article>
  );
}

export function ContractRow({ children }) {
  return (
    <tr className="border-b border-gray-100 transition-colors hover:bg-emerald-50/40">
      {children}
    </tr>
  );
}

export function PaymentSplitModal({ open = false, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-xs p-4">
      <section className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold p-1 rounded-lg cursor-pointer"
        >
          ✕
        </button>
        {children}
      </section>
    </div>
  );
}

export function PhotoUploadDropzone({ onFiles }) {
  return (
    <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary bg-gray-50 hover:bg-emerald-50/30 p-8 text-center transition-all">
      <span className="material-symbols-outlined text-[36px] text-primary mb-2 block">cloud_upload</span>
      <span className="font-label-lg text-sm text-on-surface font-semibold">Drop photos here or choose files</span>
      <input
        className="sr-only"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => onFiles?.(Array.from(e.target.files || []))}
      />
    </label>
  );
}

export function StatusBadge({ status = 'Pending' }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 text-[#0d631b] border border-emerald-200/80 px-3 py-1 text-label-sm font-semibold">
      {status}
    </span>
  );
}
