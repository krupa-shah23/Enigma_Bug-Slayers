import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function MySociety(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200"><div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between"><div className="flex items-center gap-space-sm"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZimPwqvNO5WBOD_Rr6DrxoFMG9U7zp-_fA8lYNGY_YUTus1BXwWVvqCq2vAkd1inpXBz7YGFuKubvo8a2k-YT6CEQst72AhHKNbk4Wov6WvbuvA_1JPsy564A0qOyka9DCmxpACzZ8OsJmOiTcvhVN8WirT4gjLSAaC1jNGwZHBweKLc4cOBIwvuml0rB5HGeCFdZwTwvsFkXyDjUlmBiMv4h54GnAgwiEpoFSVeDDqJHmQWBy0rbew"/><span className="font-headline-md text-headline-md tracking-tight text-primary font-bold hidden sm:inline-block">ReWaste</span></div><Navbar variant="Person" className="hidden md:flex items-center gap-gutter"><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/societies">All Societies</Link><Link className="transition-colors py-1 text-primary-container font-headline-sm" to="/my-society">My Society</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button aria-label="Notifications" className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-headline-md">notifications</span></button><span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm">Person</span><div className="flex items-center"><img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPgf1R8-C9KtO74b0DTwy8-hSJibHRzegzP7HZ2l7U_XyJaXe2XIJV1NvvNf8Yb3YyWBe-t9mtW_W0aaYglDw8zqDhXx2Qn3j9fP6s2nNL4cdjJsbeidTrZ-jbDDNjjjBy-_3Th_O8c8oKoTm_ihFtdU5TTYi8csrr-mD2LddOyEHyHzscf2nQOqnKgG8M790yl9XYy0F8BkDRzJL-g5Ia0Vn3M_hcoSDyK3EJqGaCI4BQTt25MJQJHQ"/></div></div></div></header><main className="w-full pt-16 bg-[#F5F7F6]"><div className="max-w-7xl mx-auto px-6 py-8"><div className="flex flex-col w-full relative">

<aside aria-live="polite" className="fixed top-20 right-6 z-50 flex items-center gap-space-sm bg-surface-container-lowest text-on-surface shadow-xl rounded-xl p-space-md transition-all duration-300" id="toast-notification">
<div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-headline-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
</div>
<div className="flex flex-col pr-space-md">
<span className="font-label-md text-label-md text-primary font-bold tracking-wide uppercase">Transaction Settled</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Payment Completed: $240 distributed to society ledger</span>
</div>
<button aria-label="Close notification" className="text-outline hover:text-on-surface transition-colors p-1" type="button">
<span className="material-symbols-outlined text-headline-sm">close</span>
</button>
</aside>

<header className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm mb-space-lg relative overflow-hidden">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-lg relative z-10">

<div className="flex flex-col gap-space-xs max-w-2xl">
<div className="flex items-center gap-space-sm flex-wrap">
<span className="bg-primary/10 text-primary px-space-sm py-0.5 rounded-full font-label-sm text-label-sm">
            Resident Officer
          </span>
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">Node #GVH-8821</span>
</div>
<h1 className="font-display-lg text-display-lg text-on-surface tracking-tight mt-1">Green Valley Heights</h1>
<div className="flex items-center gap-space-xs text-on-surface-variant font-body-md text-body-md mt-1">
<span className="material-symbols-outlined text-headline-sm text-outline">location_on</span>
<span>Plot 14, Riverside Avenue, Sector 5</span>
</div>
</div>

<div className="flex items-center gap-space-md bg-surface-container-low p-space-md rounded-xl shadow-sm shrink-0">
<div className="relative w-20 h-20 flex items-center justify-center">
<svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
<path className="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
<path className="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="88, 100" strokeLinecap="round" strokeWidth="3.5"></path>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center text-center">
<span className="font-headline-lg text-headline-lg text-on-surface font-bold leading-none">88</span>
<span className="font-label-sm text-label-sm text-outline leading-tight">/100</span>
</div>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Reliability Index</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">Grade A Partner</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Top 4% Regional Tier</span>
</div>
</div>
</div>
</header>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg">

<div className="lg:col-span-4 bg-primary text-on-primary rounded-xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden">
<div className="relative z-10 flex flex-col">
<div className="w-12 h-12 rounded-xl bg-on-primary/10 flex items-center justify-center mb-space-md">
<span className="material-symbols-outlined text-headline-xl text-on-primary" style={{fontVariationSettings: "'FILL' 1"}}>price_check</span>
</div>
<span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider font-semibold">Cumulative Net Yield</span>
<div className="font-display-lg text-display-lg text-on-primary font-bold tracking-tight mt-1 mb-space-xs">
          $142.00
        </div>
<p className="font-body-md text-body-md text-primary-fixed-dim leading-relaxed">
          Total Maintenance Offset applied directly to current quarter residential assessment.
        </p>
</div>
<div className="relative z-10 pt-space-md flex items-center gap-space-xs text-on-primary font-label-md text-label-md">
<span className="material-symbols-outlined text-headline-sm text-primary-fixed">verified</span>
<span>Reconciled through Municipal Ledger</span>
</div>
</div>

<div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between pb-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
<h2 className="font-headline-md text-headline-md text-on-surface">Designated Officers</h2>
</div>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Governing Committee</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-space-sm">

<div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wider">Committee President (CP)</span>
<span className="material-symbols-outlined text-headline-sm text-outline">badge</span>
</div>
<div className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-space-sm">Ananya Sharma</div>
</div>
<div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
<Link className="flex items-center gap-space-xs hover:text-primary transition-colors" to="tel:+919876543210">
<span className="material-symbols-outlined text-body-lg text-outline">call</span>
<span>+91 98765 43210</span>
</Link>
<Link className="flex items-center gap-space-xs hover:text-primary transition-colors" to="mailto:ananya.cp@greenvalley.org">
<span className="material-symbols-outlined text-body-lg text-outline">mail</span>
<span className="truncate">ananya.cp@greenvalley.org</span>
</Link>
</div>
</div>

<div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wider">Treasurer</span>
<span className="material-symbols-outlined text-headline-sm text-outline">account_balance_wallet</span>
</div>
<div className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-space-sm">Vikram Malhotra</div>
</div>
<div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
<Link className="flex items-center gap-space-xs hover:text-primary transition-colors" to="tel:+919811122334">
<span className="material-symbols-outlined text-body-lg text-outline">call</span>
<span>+91 98111 22334</span>
</Link>
<Link className="flex items-center gap-space-xs hover:text-primary transition-colors" to="mailto:vikram.treasurer@greenvalley.org">
<span className="material-symbols-outlined text-body-lg text-outline">mail</span>
<span className="truncate">vikram.treasurer@greenvalley.org</span>
</Link>
</div>
</div>
</div>
</div>
</div>

<section className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm mb-space-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
<div>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Material Balance</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Contribution Aggregate</h2>
</div>
<div className="flex items-center gap-space-md font-body-sm text-body-sm text-on-surface-variant">
<span>Cycle Total: <strong className="text-on-surface font-headline-sm">1,127 kg</strong></span>
<span className="text-outline">•</span>
<span>Reconciliation: Verified In-House</span>
</div>
</div>

<div className="w-full h-3.5 rounded-full bg-surface-container overflow-hidden flex mb-space-lg">
<div className="bg-primary-container h-full transition-all" style={{width: 55.0}} title="Compost/Wet: 620 kg"></div>
<div className="bg-primary-fixed-dim h-full transition-all" style={{width: 39.9}} title="Dry Recyclables: 450 kg"></div>
<div className="bg-secondary-container h-full transition-all" style={{width: 4.0}} title="E-waste: 45 kg"></div>
<div className="bg-error h-full transition-all" style={{width: 1.1}} title="Hazardous: 12 kg"></div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">

<div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Compost / Wet</span>
<span className="w-3 h-3 rounded-full bg-primary-container"></span>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-xl text-headline-xl text-on-surface font-bold">620</span>
<span className="font-body-md text-body-md text-outline">kg</span>
</div>
<div className="w-full bg-surface-variant h-1.5 rounded-full mt-space-sm overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{width: 100}}></div>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Dry Recyclables</span>
<span className="w-3 h-3 rounded-full bg-primary-fixed-dim"></span>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-xl text-headline-xl text-on-surface font-bold">450</span>
<span className="font-body-md text-body-md text-outline">kg</span>
</div>
<div className="w-full bg-surface-variant h-1.5 rounded-full mt-space-sm overflow-hidden">
<div className="bg-primary-fixed-dim h-full rounded-full" style={{width: 72.5}}></div>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">E-Waste</span>
<span className="w-3 h-3 rounded-full bg-secondary-container"></span>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-xl text-headline-xl text-on-surface font-bold">45</span>
<span className="font-body-md text-body-md text-outline">kg</span>
</div>
<div className="w-full bg-surface-variant h-1.5 rounded-full mt-space-sm overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{width: 7.2}}></div>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Hazardous</span>
<span className="w-3 h-3 rounded-full bg-error"></span>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-xl text-headline-xl text-on-surface font-bold">12</span>
<span className="font-body-md text-body-md text-outline">kg</span>
</div>
<div className="w-full bg-surface-variant h-1.5 rounded-full mt-space-sm overflow-hidden">
<div className="bg-error h-full rounded-full" style={{width: 1.9}}></div>
</div>
</div>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">

<div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col">
<div className="flex items-center justify-between mb-space-md">
<div>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Weigh-in Ledger</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Collection History</h2>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-space-sm py-0.5 rounded-full">
          4 Records Logged
        </span>
</div>
<div className="w-full overflow-x-auto">
<table className="w-full text-left font-body-md text-body-md">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
<th className="py-space-sm px-space-md rounded-l-lg font-semibold" scope="col">Date</th>
<th className="py-space-sm px-space-md font-semibold" scope="col">Material</th>
<th className="py-space-sm px-space-md text-right font-semibold" scope="col">Promised kg</th>
<th className="py-space-sm px-space-md text-right font-semibold" scope="col">Actual kg</th>
<th className="py-space-sm px-space-md text-right rounded-r-lg font-semibold" scope="col">Indicator</th>
</tr>
</thead>
<tbody className="text-on-surface">

<tr className="hover:bg-surface-container-lowest transition-colors">
<td className="py-space-md px-space-md font-medium">Oct 24, 2025</td>
<td className="py-space-md px-space-md">Dry Recyclables</td>
<td className="py-space-md px-space-md text-right text-on-surface-variant">150 kg</td>
<td className="py-space-md px-space-md text-right font-semibold">148 kg</td>
<td className="py-space-md px-space-md text-right">
<span className="inline-flex items-center justify-center bg-primary/10 text-primary font-label-sm text-label-sm px-2.5 py-0.5 rounded-full">
                  Normal
                </span>
</td>
</tr>

<tr className="bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
<td className="py-space-md px-space-md font-medium">Oct 20, 2025</td>
<td className="py-space-md px-space-md">Compost/Wet</td>
<td className="py-space-md px-space-md text-right text-on-surface-variant">200 kg</td>
<td className="py-space-md px-space-md text-right font-semibold">210 kg</td>
<td className="py-space-md px-space-md text-right">
<span className="inline-flex items-center justify-center bg-primary/10 text-primary font-label-sm text-label-sm px-2.5 py-0.5 rounded-full">
                  Normal
                </span>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors">
<td className="py-space-md px-space-md font-medium">Oct 16, 2025</td>
<td className="py-space-md px-space-md">E-waste</td>
<td className="py-space-md px-space-md text-right text-on-surface-variant">50 kg</td>
<td className="py-space-md px-space-md text-right font-semibold">32 kg</td>
<td className="py-space-md px-space-md text-right">
<span className="inline-flex items-center justify-center bg-error-container text-on-error-container font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-semibold">
                  Flagged red
                </span>
</td>
</tr>

<tr className="bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
<td className="py-space-md px-space-md font-medium">Oct 11, 2025</td>
<td className="py-space-md px-space-md">Hazardous</td>
<td className="py-space-md px-space-md text-right text-on-surface-variant">12 kg</td>
<td className="py-space-md px-space-md text-right font-semibold">12 kg</td>
<td className="py-space-md px-space-md text-right">
<span className="inline-flex items-center justify-center bg-primary/10 text-primary font-label-sm text-label-sm px-2.5 py-0.5 rounded-full">
                  Normal
                </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-md">
<div>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Disbursements</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Recent Payouts</h2>
</div>
<span className="material-symbols-outlined text-headline-md text-primary">payments</span>
</div>
<div className="flex flex-col gap-space-sm">

<div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs">
<div className="flex items-center justify-between font-label-md text-label-md">
<span className="text-on-surface font-semibold">Oct 15, 2025</span>
<span className="bg-primary/10 text-primary px-space-xs py-0.5 rounded font-label-sm text-label-sm">Disbursed</span>
</div>
<div className="flex items-center justify-between mt-1">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-outline">Society Share</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">$240.00 Total</span>
</div>
<div className="flex flex-col text-right">
<span className="font-body-sm text-body-sm text-outline">Resident Credit</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">$18.50 Credit</span>
</div>
</div>
</div>

<div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs">
<div className="flex items-center justify-between font-label-md text-label-md">
<span className="text-on-surface font-semibold">Sep 30, 2025</span>
<span className="bg-surface-variant text-on-surface-variant px-space-xs py-0.5 rounded font-label-sm text-label-sm">Archived</span>
</div>
<div className="flex items-center justify-between mt-1">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-outline">Society Share</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">$195.00 Total</span>
</div>
<div className="flex flex-col text-right">
<span className="font-body-sm text-body-sm text-outline">Resident Credit</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">$15.20 Credit</span>
</div>
</div>
</div>
</div>
</div>

<div className="mt-space-md pt-space-md flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-body-md text-primary">account_balance</span>
          HDFC Escrow Linked
        </span>
<span className="font-semibold text-primary">Automated Split</span>
</div>
</div>
</div>
</div></div></main><footer className="w-full bg-white border-t border-gray-200 mt-auto"><div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><div className="flex items-center gap-gutter"><span className="font-label-md text-label-md text-outline">Operational Circular Network</span></div></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
