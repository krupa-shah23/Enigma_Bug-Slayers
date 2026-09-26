import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppState.jsx';
import { Logo, ROLE_META } from '../../components/Layout.jsx';
import { Field, Icon, IconInput } from '../../components/ui.jsx';
import { initials } from '../../lib/format.js';

const ROLE_TABS = [
  { role: 'Person', icon: 'person', label: 'Person', to: '/person/login' },
  { role: 'Ngo', icon: 'volunteer_activism', label: 'NGO', to: '/ngo/login' },
  { role: 'Bhangarwala', icon: 'local_shipping', label: 'Scrape Collector', to: '/bhangarwala/login' },
];

const HERO = {
  Person: { eyebrow: 'Decentralized Recovery Grid', badge: 'Exchange Network Active', icon: 'format_image_left', title: 'Chain-of-Custody Verified', text: 'Institutional grade batch tracking', stat: '100%', loginTitle: 'Log in to ReWaste', loginText: 'Access real-time aggregation lots, tickets, and payments.', signupTitle: 'Create your account', signupText: 'Get immediate onboarding for decentralized waste trade.' },
  Ngo: { eyebrow: 'ReWaste Ecosystem', badge: 'Verified Aggregator Impact', icon: 'verified', title: '94.8% recovery purity', text: 'Verified across 4,200+ grassroots collection societies', stat: '+12.4% MoM', loginTitle: 'Log in to your NGO workspace', loginText: 'Access contracts, collection verification, payments, and events.', signupTitle: 'Register NGO Organization', signupText: 'Establish institutional governance for local circular supply streams.' },
  Bhangarwala: { eyebrow: 'Scrape Collector Operational Network', badge: 'Instant Settlement', icon: 'payments', title: '100% Direct Payouts', text: 'Spot payments released on verified handover', stat: '₹0 fees', loginTitle: 'Log in as Scrape Collector Partner', loginText: 'Connect directly to residential scrap listings and guaranteed spot payouts.', signupTitle: 'Register as Scrape Collector Partner', signupText: 'Connect directly to residential scrap listings and guaranteed spot payouts.' },
};

// Demo credentials are prefilled; the form accepts anything.
const DEMO = {
  Person: { email: 'ananya.sharma@greenvalley.org', name: 'Ananya Sharma', phone: '+91 98765 43210' },
  Ngo: { email: 'contact@ecoaction.org', name: 'Rajesh Singhania', phone: '+91 98112 04821', org: 'EcoAction India Foundation' },
  Bhangarwala: { email: 'ramesh.collector@ecotraders.in', name: 'Ramesh Kumar', phone: '+91 98112 44321' },
};

export default function AuthPage({ role }) {
  const { role: current, state, actions } = useApp();
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const hero = HERO[role];
  const demo = DEMO[role];

  if (current === role) return <Navigate to={ROLE_META[role].home} replace />;

  const submit = (e) => {
    e.preventDefault();
    setBusy(true);
    const first = state.users[role].name.split(' ')[0];
    window.setTimeout(() => {
      actions.login(role);
      actions.toast(`Welcome${signup ? '' : ' back'}, ${first}. You're signed in as ${ROLE_META[role].label}.`);
      navigate(ROLE_META[role].home);
    }, 450);
  };

  const pwToggle = <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPw((v) => !v)} className="flex h-8 w-8 items-center justify-center rounded text-outline hover:text-on-surface"><Icon name={showPw ? 'visibility_off' : 'visibility'} size={18} /></button>;

  return (
    <main className="flex min-h-screen items-stretch bg-page p-space-md lg:p-space-lg">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg lg:grid-cols-[1.05fr_1fr]">
        {/* Hero panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-primary-container to-tertiary p-space-xl text-white lg:flex">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-8 -top-8 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />
          <Logo to="/" light />
          <div className="relative space-y-space-lg">
            <div className="rounded-xl border border-white/15 bg-white/10 p-space-lg backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-space-sm font-label-md text-label-md"><span className="h-2 w-2 animate-pulse rounded-full bg-primary-fixed" />{hero.badge}</span>
                <span className="font-label-sm text-label-sm text-white/70">v2.4 Live</span>
              </div>
              <div className="mt-space-lg flex items-center gap-space-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15"><Icon name={hero.icon} size={26} /></span>
                <div>
                  <p className="font-headline-sm text-headline-sm">{hero.title}</p>
                  <p className="text-body-sm text-white/75">{hero.text}</p>
                </div>
                <span className="ml-auto font-headline-md text-headline-md text-primary-fixed">{hero.stat}</span>
              </div>
            </div>
            <div>
              <p className="eyebrow !text-primary-fixed">{hero.eyebrow}</p>
              <h2 className="mt-space-sm font-display-lg text-display-lg">Turn waste into worth.</h2>
              <p className="mt-space-md max-w-md text-body-lg text-white/80">Powering verified circular exchanges between communities, grassroots aggregators, and certified industrial upcyclers.</p>
            </div>
          </div>
          <p className="relative flex items-center gap-space-sm text-body-sm text-white/70"><Icon name="energy_savings_leaf" size={16} />Zero-emission operational ledger</p>
        </section>

        {/* Form panel */}
        <section className="flex flex-col p-space-lg sm:p-space-xl">
          <div className="mb-space-lg flex items-center justify-between gap-space-md">
            <span className="lg:hidden"><Logo to="/" /></span>
            <span className="eyebrow hidden items-center gap-space-sm lg:flex"><span className="h-1.5 w-1.5 rounded-full bg-primary-container" />Registration Desk</span>
            <button type="button" onClick={() => setSignup((v) => !v)} className="font-label-md text-label-md text-on-surface-variant hover:text-primary">
              {signup ? <>Already have an account? <span className="text-primary underline">Log in</span></> : <>New here? <span className="text-primary underline">Sign up</span></>}
            </button>
          </div>

          <p className="label mb-space-sm">Select your operating entity</p>
          <div role="tablist" aria-label="Account identity" className="grid grid-cols-3 gap-space-xs rounded-xl bg-surface-container-low p-space-xs">
            {ROLE_TABS.map((t) => (
              <Link key={t.role} to={t.to} role="tab" aria-selected={t.role === role} className={`flex h-10 items-center justify-center gap-space-xs rounded-lg font-label-md text-label-md transition-colors ${t.role === role ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
                <Icon name={t.icon} size={18} />{t.label}
              </Link>
            ))}
          </div>

          <div className="mb-space-lg mt-space-lg">
            <h1 className="font-headline-lg text-headline-lg">{signup ? hero.signupTitle : hero.loginTitle}</h1>
            <p className="muted mt-space-xs">{signup ? hero.signupText : hero.loginText}</p>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-space-md">
            {signup && role === 'Ngo' && <Field label="Organization Name"><IconInput icon="corporate_fare" name="org" defaultValue={demo.org} placeholder="EcoAction India Foundation" /></Field>}
            {signup && <Field label="Full Name"><IconInput icon="badge" name="name" defaultValue={demo.name} placeholder="e.g. Ramesh Kumar" /></Field>}
            <Field label="Work or Personal Email"><IconInput icon="alternate_email" type="email" name="email" defaultValue={demo.email} placeholder="name@organization.in" /></Field>
            {signup && <Field label="Phone Number"><IconInput icon="call" type="tel" name="phone" defaultValue={demo.phone} placeholder="+91 98765 43210" /></Field>}
            {signup && role === 'Bhangarwala' && (
              <div className="grid gap-space-md sm:grid-cols-2">
                <Field label="Vehicle Type">
                  <select name="vehicle" className="input" defaultValue="Electric Cargo Trike"><option>Electric Cargo Trike</option><option>Cycle Cart</option><option>Mini Truck</option><option>Cargo Van</option></select>
                </Field>
                <Field label="Area Note"><IconInput icon="location_on" name="area" placeholder="Sector 54 & Riverside Hubs" /></Field>
              </div>
            )}
            <Field label={signup ? 'Create Password' : 'Password'}><IconInput icon="lock" type={showPw ? 'text' : 'password'} name="password" defaultValue="demo-password" placeholder="Minimum 8 characters" right={pwToggle} /></Field>
            {signup && <Field label="Confirm Password"><IconInput icon="lock_reset" type={showPw ? 'text' : 'password'} name="confirm" defaultValue="demo-password" placeholder="Re-enter your password" right={pwToggle} /></Field>}
            <button type="submit" disabled={busy} className="btn-primary btn-lg mt-space-sm w-full">
              {busy ? <><Icon name="progress_activity" className="animate-spin" />Signing in…</> : <>{signup ? 'Create Account' : 'Log In'}<Icon name="arrow_forward" /></>}
            </button>
          </form>

          <div className="mt-space-lg flex items-center gap-space-md rounded-lg bg-surface-container-low px-space-md py-space-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container font-label-md text-label-md text-on-primary">{initials(state.users[role].name)}</span>
            <p className="text-body-sm text-on-surface-variant"><span className="font-label-lg text-on-surface">Demo mode.</span> Any details sign you in as {state.users[role].name}.</p>
          </div>
          <p className="mt-auto flex items-center justify-between pt-space-lg text-body-sm text-outline"><span className="flex items-center gap-1"><Icon name="shield" size={14} />SECURE SSL 256-BIT</span><Link to="/" className="hover:text-primary">← Back to home</Link></p>
        </section>
      </div>
    </main>
  );
}
