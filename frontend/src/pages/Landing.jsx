import { Link } from 'react-router-dom';
import { Logo } from '../components/Layout.jsx';
import { Footer } from '../components/Layout.jsx';
import { Icon } from '../components/ui.jsx';

const ROLES = [
  { icon: 'person', title: 'Residents', text: 'Log doorstep weigh-ins, earn maintenance credits, and post scrap lots straight to verified local collectors.', cta: 'Join as a person', to: '/person/login' },
  { icon: 'volunteer_activism', title: 'NGOs', text: 'Offer contracts to societies, verify month-end weigh-ins against promised tonnage, and release escrow payouts.', cta: 'Partner as an NGO', to: '/ngo/login' },
  { icon: 'local_shipping', title: 'Scrape Collectors', text: 'Get live scrap requests within 5 km, quote in seconds, and receive guaranteed payouts on verified handover.', cta: 'Join as a Scrape Collector', to: '/bhangarwala/login' },
];

const STEPS = [
  ['scale', 'Segregate & weigh', 'Households log verified weigh-ins on the doorstep scale.'],
  ['handshake', 'Contract & quote', 'NGOs offer bulk contracts; collectors quote on P2P lots.'],
  ['local_shipping', 'Collect & verify', 'Live tracking and weigh-scale check-in on every pickup.'],
  ['payments', 'Split & settle', 'Escrow is split by contribution and settled instantly.'],
];

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <header className="sticky top-0 z-40 border-b border-outline-variant/50 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-gutter">
          <Logo />
          <nav className="flex items-center gap-space-xs">
            <Link className="nav-link" to="/person/login">Person</Link>
            <Link className="nav-link" to="/ngo/login">NGO</Link>
            <Link className="nav-link" to="/bhangarwala/login">Scrape Collector</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto grid max-w-7xl items-center gap-space-xl px-gutter py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="eyebrow mb-space-md flex items-center gap-space-sm !text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary-container" />A cleaner circular economy</p>
            <h1 className="font-display-lg text-[48px] leading-[56px] tracking-tight text-on-surface">Turn waste into worth.</h1>
            <p className="mt-space-md max-w-xl text-body-lg text-on-surface-variant">Connect communities, grassroots aggregators, and certified recyclers through a transparent, verified materials network.</p>
            <div className="mt-space-lg flex flex-wrap gap-space-md">
              <Link className="btn-primary btn-lg" to="/person/login">Join as a person<Icon name="arrow_forward" /></Link>
              <Link className="btn-secondary btn-lg" to="/ngo/login">Partner as an NGO</Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-tertiary p-space-xl text-white shadow-lg">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
            <p className="flex items-center gap-space-sm font-label-lg text-label-lg"><span className="h-2 w-2 animate-pulse rounded-full bg-primary-fixed" />Verified circular exchange</p>
            <div className="mt-space-xl grid grid-cols-2 gap-space-lg">
              <div><strong className="font-display-lg text-display-lg">94.8%</strong><p className="text-body-md text-white/75">Partner trust score</p></div>
              <div><strong className="font-display-lg text-display-lg">4,200+</strong><p className="text-body-md text-white/75">Collection societies</p></div>
              <div><strong className="font-display-lg text-display-lg">3 roles</strong><p className="text-body-md text-white/75">One connected ecosystem</p></div>
              <div><strong className="font-display-lg text-display-lg">₹0</strong><p className="text-body-md text-white/75">Fees for collectors</p></div>
            </div>
            <Link className="btn mt-space-xl bg-white text-primary hover:bg-primary-fixed" to="/bhangarwala/login">Join as a Scrape Collector</Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-gutter pb-16">
          <div className="grid gap-space-lg md:grid-cols-3">
            {ROLES.map((r) => (
              <article key={r.title} className="card card-hover flex flex-col gap-space-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-primary-container"><Icon name={r.icon} size={26} fill /></span>
                <h2 className="h-section">{r.title}</h2>
                <p className="muted flex-1">{r.text}</p>
                <Link to={r.to} className="btn-secondary self-start">{r.cta}<Icon name="arrow_forward" size={18} /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-outline-variant/50 bg-white">
          <div className="mx-auto max-w-7xl px-gutter py-16">
            <h2 className="h-title mb-space-xl text-center">How the ledger works</h2>
            <ol className="grid gap-space-lg sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map(([icon, title, text], i) => (
                <li key={title} className="flex flex-col gap-space-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary"><Icon name={icon} size={20} /></span>
                  <p className="eyebrow">Step {i + 1}</p>
                  <h3 className="h-card">{title}</h3>
                  <p className="muted">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
