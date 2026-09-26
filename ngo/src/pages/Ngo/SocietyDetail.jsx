import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function SocietyDetail(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-surface font-body-md text-on-surface antialiased flex flex-col justify-between min-h-screen"><Navbar variant="Ngo"/><main className="w-full pt-16 bg-surface flex-1"><div className="max-w-[1440px] mx-auto px-margin py-space-lg"><div className="flex flex-col w-full">

<div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm mb-space-md">
<Link className="hover:text-primary transition-colors flex items-center gap-1" to="/ngo/societies">
<span className="material-symbols-outlined text-[16px]">arrow_back</span>
<span>Societies</span>
</Link>
<span>/</span>
<span className="text-on-surface font-label-md text-label-md">Crestview Towers</span>
</div>

<header className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm mb-gutter">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">

<div className="flex items-start gap-space-md min-w-0">
<div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 text-primary">
<span className="material-symbols-outlined text-[32px]">apartment</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex flex-wrap items-center gap-space-xs">
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Crestview Towers</h1>
<span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-primary-container/15 text-primary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
              Tier A • Verified
            </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[18px] text-outline">location_on</span>
            Sector 54, Golf Course Extension, Gurugram
          </p>
</div>
</div>

<div className="flex flex-wrap items-center gap-space-lg self-start lg:self-center">

<div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs rounded-xl">
<div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
<svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
<circle className="stroke-surface-container-highest" cx="28" cy="28" fill="none" r="22" strokeWidth="5"></circle>

<circle className="stroke-primary" cx="28" cy="28" fill="none" r="22" stroke-dasharray="138.2" stroke-dashoffset="5.5" strokeLinecap="round" strokeWidth="5"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center text-center">
<span className="font-headline-sm text-headline-sm text-on-surface leading-none">96</span>
<span className="font-label-sm text-[9px] text-on-surface-variant leading-none">/100</span>
</div>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Trust Score</span>
<span className="font-label-lg text-label-lg text-primary">Exceptional (Tier A)</span>
</div>
</div>

<Link className="inline-flex items-center justify-center gap-space-xs px-space-lg h-10 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" to="/ngo/dashboard">
<span className="material-symbols-outlined text-[18px]">handshake</span>
<span>Offer Contract</span>
</Link>
</div>
</div>
</header>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-gutter">

<section className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-space-xs mb-space-md">
<span className="material-symbols-outlined text-primary text-[20px]">contacts</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Committee Contacts</h2>
</div>
<div className="flex flex-col gap-space-md">

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<div>
<h3 className="font-label-lg text-label-lg text-on-surface">Ananya Sharma</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Committee President</p>
</div>
<span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">badge</span>
</span>
</div>
<div className="pt-space-xs flex flex-col gap-1 font-body-sm text-body-sm text-on-surface">
<Link className="flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors" to="tel:+919876543210">
<span className="material-symbols-outlined text-[16px] text-outline">call</span>
<span>+91 98765 43210</span>
</Link>
<Link className="flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors" to="mailto:ananya.cp@crestview.org">
<span className="material-symbols-outlined text-[16px] text-outline">mail</span>
<span>ananya.cp@crestview.org</span>
</Link>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<div>
<h3 className="font-label-lg text-label-lg text-on-surface">Vikram Malhotra</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Treasurer</p>
</div>
<span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
</span>
</div>
<div className="pt-space-xs flex flex-col gap-1 font-body-sm text-body-sm text-on-surface">
<Link className="flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors" to="tel:+919811122334">
<span className="material-symbols-outlined text-[16px] text-outline">call</span>
<span>+91 98111 22334</span>
</Link>
<Link className="flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors" to="mailto:vikram.treasurer@crestview.org">
<span className="material-symbols-outlined text-[16px] text-outline">mail</span>
<span>vikram.treasurer@crestview.org</span>
</Link>
</div>
</div>
</div>
</div>
<div className="mt-space-md pt-space-sm text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-primary">security</span>
<span>Verified residential representative authorized for waste agreements.</span>
</div>
</section>

<section className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px]">bar_chart</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Contribution History</h2>
</div>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Monthly Breakdown</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
        Aggregated monthly collected material metrics by classification. Total current month yield: <strong className="text-on-surface font-label-md">13,420 kg</strong>.
      </p>

<div className="flex flex-col gap-space-md my-auto">

<div className="flex flex-col gap-1">
<div className="flex justify-between items-baseline font-body-sm text-body-sm">
<span className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
              Compost / Wet
            </span>
<span className="font-headline-sm text-headline-sm text-on-surface">6,400 <span className="font-body-sm text-body-sm text-outline">kg</span></span>
</div>
<div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full transition-all duration-500" style={{width: 91.4}}></div>
</div>
</div>

<div className="flex flex-col gap-1">
<div className="flex justify-between items-baseline font-body-sm text-body-sm">
<span className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary-container inline-block"></span>
              Dry Recyclables
            </span>
<span className="font-headline-sm text-headline-sm text-on-surface">4,900 <span className="font-body-sm text-body-sm text-outline">kg</span></span>
</div>
<div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container rounded-full transition-all duration-500" style={{width: 70}}></div>
</div>
</div>

<div className="flex flex-col gap-1">
<div className="flex justify-between items-baseline font-body-sm text-body-sm">
<span className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-secondary-container inline-block"></span>
              E-waste
            </span>
<span className="font-headline-sm text-headline-sm text-on-surface">1,800 <span className="font-body-sm text-body-sm text-outline">kg</span></span>
</div>
<div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary-container rounded-full transition-all duration-500" style={{width: 25.7}}></div>
</div>
</div>

<div className="flex flex-col gap-1">
<div className="flex justify-between items-baseline font-body-sm text-body-sm">
<span className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span>
              Hazardous
            </span>
<span className="font-headline-sm text-headline-sm text-on-surface">320 <span className="font-body-sm text-body-sm text-outline">kg</span></span>
</div>
<div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary rounded-full transition-all duration-500" style={{width: 4.6}}></div>
</div>
</div>
</div>
<div className="flex items-center justify-between text-outline font-label-sm text-label-sm pt-space-md mt-space-sm border-t border-surface-container">
<span>0 kg</span>
<span>1,750 kg</span>
<span>3,500 kg</span>
<span>5,250 kg</span>
<span>7,000 kg</span>
</div>
</section>
</div>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px]">flag</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Flag History</h2>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
        3 Records Logged
      </span>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
<th className="py-space-sm px-space-md rounded-l-lg">Date</th>
<th className="py-space-sm px-space-md">Material</th>
<th className="py-space-sm px-space-md">Promised kg</th>
<th className="py-space-sm px-space-md">Actual kg</th>
<th className="py-space-sm px-space-md">Variance</th>
<th className="py-space-sm px-space-md rounded-r-lg">Resolution / Status</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-space-md px-space-md font-label-md text-label-md text-on-surface whitespace-nowrap">
              Oct 12, 2025
            </td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface">
<span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                Dry Paper
              </span>
</td>
<td className="py-space-md px-space-md">400 kg</td>
<td className="py-space-md px-space-md">392 kg</td>
<td className="py-space-md px-space-md">
<span className="font-label-md text-label-md text-on-surface-variant">-2%</span>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-primary-container/15 text-primary font-label-sm text-label-sm">
                Normal / Accepted
              </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-space-md px-space-md font-label-md text-label-md text-on-surface whitespace-nowrap">
              Aug 28, 2025
            </td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface">
<span className="w-2 h-2 rounded-full bg-primary"></span>
                Compost
              </span>
</td>
<td className="py-space-md px-space-md">1,200 kg</td>
<td className="py-space-md px-space-md">1,020 kg</td>
<td className="py-space-md px-space-md">
<span className="font-label-md text-label-md text-secondary">-15%</span>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm">
                Investigated - Seasonal Rain Adjustment
              </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-space-md px-space-md font-label-md text-label-md text-on-surface whitespace-nowrap">
              Jun 14, 2025
            </td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                E-waste
              </span>
</td>
<td className="py-space-md px-space-md">150 kg</td>
<td className="py-space-md px-space-md">148 kg</td>
<td className="py-space-md px-space-md">
<span className="font-label-md text-label-md text-on-surface-variant">-1.3%</span>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-primary-container/15 text-primary font-label-sm text-label-sm">
                Resolved
              </span>
</td>
</tr>
</tbody>
</table>
</div>
</section>
</div></div></main><footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] py-space-lg mt-auto"><div className="max-w-[1440px] mx-auto px-margin flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><p className="font-label-sm text-label-sm text-outline">Operational Circular Network</p></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
