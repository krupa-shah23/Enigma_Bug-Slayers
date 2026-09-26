import { Link } from 'react-router-dom';

export default function Landing() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-on-surface font-body-md antialiased flex flex-col">
      {/* 1. Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Left */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">recycling</span>
            </div>
            <span className="font-headline-md text-headline-md tracking-tight font-bold text-primary">ReWaste</span>
          </Link>

          {/* Nav Links Center */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-body-md font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-body-md font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              For NGOs
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-body-md font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              For Bhangarwalas
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-body-md font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Single Login / Signup Pill Button Right */}
          <div className="flex items-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-[#0d631b] hover:bg-[#0b4d16] text-white font-label-lg text-label-lg px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200"
            >
              <span>Login / Signup</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="bg-gradient-to-br from-[#06330e] via-[#0d631b] to-[#145a1c] text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
          {/* Subtle background glow effects */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Side Content */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-200 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Verified Circular Exchange</span>
                </div>

                <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-[1.15] mb-6">
                  Turn waste into worth.
                </h1>

                <p className="font-body-lg text-lg text-emerald-100/90 max-w-xl leading-relaxed mb-8">
                  Connect communities, grassroots aggregators, and certified recyclers through a transparent, verified materials ledger.
                </p>

                {/* Single Primary CTA Button */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-3 bg-white text-[#0d631b] hover:bg-emerald-50 font-label-lg text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl font-bold transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span>Login / Signup</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Right Side Visual & Floating Cards */}
              <div className="lg:col-span-6 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Hero Photography Container */}
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative group">
                    <img
                      src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80"
                      alt="Recycling material management"
                      className="w-full h-[400px] sm:h-[460px] object-cover mix-blend-overlay group-hover:mix-blend-normal transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06330e]/80 via-transparent to-transparent"></div>
                  </div>

                  {/* Floating Stat Badge Card Top-Right */}
                  <div className="absolute -top-6 -right-4 sm:right-2 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-100 text-on-surface flex items-center gap-4 animate-bounce-slow">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#0d631b] flex items-center justify-center font-bold text-xl">
                      <span className="material-symbols-outlined text-[26px]">verified</span>
                    </div>
                    <div>
                      <div className="font-headline-sm text-lg font-bold text-gray-900">94.8%</div>
                      <div className="font-body-sm text-xs text-gray-600 font-medium">Partner Trust Score</div>
                    </div>
                  </div>

                  {/* Floating Pill Tag Bottom-Left */}
                  <div className="absolute -bottom-6 -left-4 sm:left-2 bg-white/95 backdrop-blur-md rounded-full px-5 py-3 shadow-xl border border-gray-100 text-on-surface flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0d631b] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                    </div>
                    <span className="font-label-md text-sm font-semibold text-gray-900">Verified Circular Exchange</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Trust Strip Below Hero */}
        <section className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-around gap-6 text-center text-on-surface-variant">
              <div className="flex items-center gap-2 font-label-lg text-sm font-semibold">
                <span className="material-symbols-outlined text-primary text-[22px]">verified_user</span>
                <span>100% Verified Chain of Custody</span>
              </div>
              <div className="hidden sm:block text-gray-300">•</div>
              <div className="flex items-center gap-2 font-label-lg text-sm font-semibold">
                <span className="material-symbols-outlined text-primary text-[22px]">eco</span>
                <span>Zero-Emission Operational Ledger</span>
              </div>
              <div className="hidden sm:block text-gray-300">•</div>
              <div className="flex items-center gap-2 font-label-lg text-sm font-semibold">
                <span className="material-symbols-outlined text-primary text-[22px]">payments</span>
                <span>Guaranteed Spot Settlement</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Feature Section */}
        <section id="how-it-works" className="py-16 sm:py-24 bg-[#f8faf9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Photo & Stat Overlay */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white p-3">
                  <img
                    src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80"
                    alt="Sustainable material collection"
                    className="w-full h-80 sm:h-96 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="font-label-sm text-xs uppercase tracking-widest text-emerald-300 font-bold mb-1">Grassroots Governance</p>
                    <h3 className="font-headline-md text-xl font-bold">Connecting Local Societies to Industrial Recyclers</h3>
                  </div>
                </div>
              </div>

              {/* Checklist & Stat Row */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <span className="font-label-md text-xs uppercase tracking-widest text-primary font-bold mb-2 block">System Integrity</span>
                <h2 className="font-headline-xl text-3xl sm:text-4xl text-on-surface font-bold tracking-tight mb-6">
                  Built for transparent, verified circular recovery.
                </h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                    <div>
                      <h4 className="font-label-lg text-base font-semibold text-on-surface">End-to-End Batch Traceability</h4>
                      <p className="font-body-md text-sm text-on-surface-variant">Every scrap batch logged with precise weight, purity score, and digital verification stamp.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                    <div>
                      <h4 className="font-label-lg text-base font-semibold text-on-surface">Fair Market Price Quotes</h4>
                      <p className="font-body-md text-sm text-on-surface-variant">Real-time competitive pricing for residents and local aggregators with no middleman markups.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                    <div>
                      <h4 className="font-label-lg text-base font-semibold text-on-surface">Institutional NGO Verification</h4>
                      <p className="font-body-md text-sm text-on-surface-variant">NGOs govern societies and contract verified Bhangarwalas for clean, reliable pickup runs.</p>
                    </div>
                  </div>
                </div>

                {/* Stat Row */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div>
                    <strong className="font-headline-lg text-2xl sm:text-3xl font-bold text-primary block">99.8%</strong>
                    <span className="font-body-sm text-xs text-on-surface-variant font-medium">Recovery Purity</span>
                  </div>
                  <div>
                    <strong className="font-headline-lg text-2xl sm:text-3xl font-bold text-primary block">500+</strong>
                    <span className="font-body-sm text-xs text-on-surface-variant font-medium">Active Societies</span>
                  </div>
                  <div>
                    <strong className="font-headline-lg text-2xl sm:text-3xl font-bold text-primary block">99.4%</strong>
                    <span className="font-body-sm text-xs text-on-surface-variant font-medium">Traceability Score</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 5. Services Section (3 Dark Cards) */}
        <section id="services" className="py-16 sm:py-24 bg-[#0a4213] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-label-md text-xs uppercase tracking-widest text-emerald-300 font-bold mb-2 block">Ecosystem Participants</span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl font-bold text-white tracking-tight">
                One Platform, Three Powerhouses
              </h2>
              <p className="font-body-md text-emerald-100/80 mt-3 text-base">
                Connecting all stakeholders in the circular material recovery loop seamlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Service Card 1: Resident Exchange */}
              <div className="bg-[#0e5219] rounded-2xl p-8 border border-emerald-700/50 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[32px]">person</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-white mb-3">Resident Exchange</h3>
                  <p className="font-body-md text-emerald-100/80 text-sm leading-relaxed mb-6">
                    Residents schedule scrap pickups, receive instant competitive quotes from verified collectors, and earn environmental credits.
                  </p>
                </div>
                <div className="pt-6 border-t border-emerald-700/40 flex items-center justify-between">
                  <span className="font-label-sm text-xs text-emerald-200">Doorstep Recovery</span>
                  <span className="material-symbols-outlined text-emerald-300">arrow_forward</span>
                </div>
              </div>

              {/* Service Card 2: NGO Verification & Contracts */}
              <div className="bg-[#0e5219] rounded-2xl p-8 border border-emerald-700/50 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[32px]">volunteer_activism</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-white mb-3">NGO Verification & Governance</h3>
                  <p className="font-body-md text-emerald-100/80 text-sm leading-relaxed mb-6">
                    Grassroots organizations oversee society collection hubs, verify material purities, and manage collector agreements transparently.
                  </p>
                </div>
                <div className="pt-6 border-t border-emerald-700/40 flex items-center justify-between">
                  <span className="font-label-sm text-xs text-emerald-200">Institutional Audit</span>
                  <span className="material-symbols-outlined text-emerald-300">arrow_forward</span>
                </div>
              </div>

              {/* Service Card 3: Bhangarwala Marketplace */}
              <div className="bg-[#0e5219] rounded-2xl p-8 border border-emerald-700/50 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[32px]">local_shipping</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-white mb-3">Bhangarwala Marketplace</h3>
                  <p className="font-body-md text-emerald-100/80 text-sm leading-relaxed mb-6">
                    Aggregators and collectors get direct access to society scrap listings, optimized routing, and instant digital spot payouts.
                  </p>
                </div>
                <div className="pt-6 border-t border-emerald-700/40 flex items-center justify-between">
                  <span className="font-label-sm text-xs text-emerald-200">Direct Payouts</span>
                  <span className="material-symbols-outlined text-emerald-300">arrow_forward</span>
                </div>
              </div>

            </div>

            {/* Bottom Callout to Single Login / Signup Path */}
            <div className="mt-16 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-3 bg-white text-[#0d631b] hover:bg-emerald-50 font-label-lg text-base px-8 py-3.5 rounded-full shadow-lg font-bold transition-all duration-200"
              >
                <span>Get Started — Login / Signup</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* 6. Footer */}
      <footer id="contact" className="bg-white border-t border-gray-200 py-12 text-on-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Logo & Info */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">recycling</span>
                </div>
                <span className="font-headline-md text-lg font-bold text-primary">ReWaste</span>
              </Link>
              <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                Empowering sustainable circular economies through transparent material tracking and grassroots participation.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-label-lg text-sm font-bold text-on-surface uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2.5 font-body-sm text-sm text-on-surface-variant">
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-primary transition-colors cursor-pointer">How It Works</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors cursor-pointer">Services</button></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Login / Signup</Link></li>
              </ul>
            </div>

            {/* Roles */}
            <div>
              <h4 className="font-label-lg text-sm font-bold text-on-surface uppercase tracking-wider mb-4">Ecosystem</h4>
              <ul className="space-y-2.5 font-body-sm text-sm text-on-surface-variant">
                <li><Link to="/login" className="hover:text-primary transition-colors">Resident Portal</Link></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">NGO Dashboard</Link></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Bhangarwala Hub</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-label-lg text-sm font-bold text-on-surface uppercase tracking-wider mb-4">Contact</h4>
              <ul className="space-y-2.5 font-body-sm text-sm text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">mail</span>
                  <span>support@rewaste.org</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                  <span>+91 (022) 800-REWASTE</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  <span>Mumbai Circular Hub, IN</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
            <p>© 2025 ReWaste Materials Ledger. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
              <span className="hover:text-primary cursor-pointer">Terms of Service</span>
              <span className="hover:text-primary cursor-pointer">Verification Ledger</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
