import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Societies(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-surface font-body-md text-on-surface antialiased flex flex-col justify-between min-h-screen"><Navbar variant="Ngo"/><main className="w-full pt-16 bg-surface flex-1"><div className="max-w-[1440px] mx-auto px-margin py-space-lg"><div className="flex flex-col w-full">

<div className="mb-space-lg p-space-md rounded-xl bg-surface-container-high flex items-center justify-between gap-space-md shadow-sm">
<div className="flex items-center gap-space-sm min-w-0">
<span className="material-symbols-outlined text-secondary shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>shield_person</span>
<p className="font-body-md text-body-md text-on-surface truncate">
<span className="font-label-lg text-label-lg text-secondary">NGO Procurement Mode:</span> Viewing registered residential societies and compliance history
      </p>
</div>
<span className="shrink-0 px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
      Read-Only Ledger
    </span>
</div>

<div className="mb-space-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">

<div className="relative flex-1 max-w-xl">
<span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline pointer-events-none">search</span>
<input className="w-full h-10 pl-11 pr-space-md rounded-lg bg-surface-container-lowest shadow-sm text-on-surface placeholder:text-outline font-body-md text-body-md outline-none focus:bg-surface-container-low transition-colors" id="societySearch" placeholder="Search societies by name or ward..." type="text"/>
</div>

<div className="flex items-center gap-space-sm shrink-0">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="societySort">Sort by</label>
<div className="relative">
<select className="h-10 pl-space-md pr-10 rounded-lg bg-surface-container-lowest shadow-sm text-on-surface font-label-lg text-label-lg outline-none appearance-none cursor-pointer focus:bg-surface-container-low transition-colors" id="societySort">
<option value="trust">Trust Score</option>
<option value="flags">Flag Count</option>
<option value="name">Name</option>
</select>
<span className="material-symbols-outlined absolute right-space-sm top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">expand_more</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter" id="societyGrid">

<Link className="society-card group bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between" to="/ngo/contracts">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-md">
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">
              Crestview Towers
            </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
              Sector 54, Gurugram
            </p>
</div>
<span className="shrink-0 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
            96
          </span>
</div>
<div className="grid grid-cols-2 gap-space-sm p-space-md rounded-lg bg-surface-container-low mb-space-md">
<div>
<span className="font-label-sm text-label-sm text-outline block">Collection</span>
<span className="font-label-lg text-label-lg text-on-surface">Bi-weekly</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Active Contracts</span>
<span className="font-label-lg text-label-lg text-on-surface">5</span>
</div>
</div>
</div>

<div className="pt-space-md bg-surface-container rounded-lg p-space-sm">
<div className="flex items-center justify-between text-on-surface mb-1">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-primary">flag</span>
            Flag count
          </span>
<span className="font-label-sm text-label-sm font-semibold text-primary">0 flags</span>
</div>
<div className="flex items-center justify-between text-on-surface">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">scale</span>
            Total collected
          </span>
<span className="font-label-lg text-label-lg text-on-surface font-semibold">14,200 kg</span>
</div>
</div>
</Link>

<Link className="society-card group bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between" to="/ngo/contracts">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-md">
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">
              Green Valley Heights
            </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
              Sector 5, Riverside
            </p>
</div>
<span className="shrink-0 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
            88
          </span>
</div>
<div className="grid grid-cols-2 gap-space-sm p-space-md rounded-lg bg-surface-container-low mb-space-md">
<div>
<span className="font-label-sm text-label-sm text-outline block">Collection</span>
<span className="font-label-lg text-label-lg text-on-surface">Bi-weekly</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Active Contracts</span>
<span className="font-label-lg text-label-lg text-on-surface">3</span>
</div>
</div>
</div>

<div className="pt-space-md bg-surface-container rounded-lg p-space-sm">
<div className="flex items-center justify-between text-on-surface mb-1">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-secondary">flag</span>
            Flag count
          </span>
<span className="font-label-sm text-label-sm font-semibold text-secondary">1 flag</span>
</div>
<div className="flex items-center justify-between text-on-surface">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">scale</span>
            Total collected
          </span>
<span className="font-label-lg text-label-lg text-on-surface font-semibold">9,850 kg</span>
</div>
</div>
</Link>

<Link className="society-card group bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between" to="/ngo/contracts">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-md">
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">
              Palm Heights
            </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
              Sector 65, Emerald Hills
            </p>
</div>
<span className="shrink-0 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
            91
          </span>
</div>
<div className="grid grid-cols-2 gap-space-sm p-space-md rounded-lg bg-surface-container-low mb-space-md">
<div>
<span className="font-label-sm text-label-sm text-outline block">Collection</span>
<span className="font-label-lg text-label-lg text-on-surface">Monthly</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Active Contracts</span>
<span className="font-label-lg text-label-lg text-on-surface">2</span>
</div>
</div>
</div>

<div className="pt-space-md bg-surface-container rounded-lg p-space-sm">
<div className="flex items-center justify-between text-on-surface mb-1">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-primary">flag</span>
            Flag count
          </span>
<span className="font-label-sm text-label-sm font-semibold text-primary">0 flags</span>
</div>
<div className="flex items-center justify-between text-on-surface">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">scale</span>
            Total collected
          </span>
<span className="font-label-lg text-label-lg text-on-surface font-semibold">6,400 kg</span>
</div>
</div>
</Link>

<Link className="society-card group bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between" to="/ngo/contracts">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-md">
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">
              Silver Oak Enclave
            </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
              DLF Phase 5
            </p>
</div>
<span className="shrink-0 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
            88
          </span>
</div>
<div className="grid grid-cols-2 gap-space-sm p-space-md rounded-lg bg-surface-container-low mb-space-md">
<div>
<span className="font-label-sm text-label-sm text-outline block">Collection</span>
<span className="font-label-lg text-label-lg text-on-surface">Weekly</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Active Contracts</span>
<span className="font-label-lg text-label-lg text-on-surface">4</span>
</div>
</div>
</div>

<div className="pt-space-md bg-surface-container rounded-lg p-space-sm">
<div className="flex items-center justify-between text-on-surface mb-1">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-secondary">flag</span>
            Flag count
          </span>
<span className="font-label-sm text-label-sm font-semibold text-secondary">2 flags</span>
</div>
<div className="flex items-center justify-between text-on-surface">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">scale</span>
            Total collected
          </span>
<span className="font-label-lg text-label-lg text-on-surface font-semibold">8,100 kg</span>
</div>
</div>
</Link>

<Link className="society-card group bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between" to="/ngo/contracts">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-md">
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">
              Lotus Residency
            </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
              Indirapuram
            </p>
</div>
<span className="shrink-0 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
            68
          </span>
</div>
<div className="grid grid-cols-2 gap-space-sm p-space-md rounded-lg bg-surface-container-low mb-space-md">
<div>
<span className="font-label-sm text-label-sm text-outline block">Collection</span>
<span className="font-label-lg text-label-lg text-on-surface">Weekly</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Active Contracts</span>
<span className="font-label-lg text-label-lg text-on-surface">1</span>
</div>
</div>
</div>

<div className="pt-space-md bg-surface-container rounded-lg p-space-sm">
<div className="flex items-center justify-between text-on-surface mb-1">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-error">flag</span>
            Flag count
          </span>
<span className="font-label-sm text-label-sm font-semibold text-error">3 flags</span>
</div>
<div className="flex items-center justify-between text-on-surface">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">scale</span>
            Total collected
          </span>
<span className="font-label-lg text-label-lg text-on-surface font-semibold">3,200 kg</span>
</div>
</div>
</Link>

<Link className="society-card group bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between" to="/ngo/contracts">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-md">
<div className="min-w-0">
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">
              Aura Boulevard
            </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
              Sector 137, Noida
            </p>
</div>
<span className="shrink-0 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">fiber_new</span>
            New
          </span>
</div>
<div className="grid grid-cols-2 gap-space-sm p-space-md rounded-lg bg-surface-container-low mb-space-md">
<div>
<span className="font-label-sm text-label-sm text-outline block">Collection</span>
<span className="font-label-lg text-label-lg text-on-surface">Weekly</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-outline block">Active Contracts</span>
<span className="font-label-lg text-label-lg text-on-surface">0</span>
</div>
</div>
</div>

<div className="pt-space-md bg-surface-container rounded-lg p-space-sm">
<div className="flex items-center justify-between text-on-surface mb-1">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">flag</span>
            Flag count
          </span>
<span className="font-label-sm text-label-sm font-semibold text-on-surface-variant">0 flags</span>
</div>
<div className="flex items-center justify-between text-on-surface">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">scale</span>
            Total collected
          </span>
<span className="font-label-lg text-label-lg text-on-surface font-semibold">0 kg</span>
</div>
</div>
</Link>
</div>

</div></div></main><footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] py-space-lg mt-auto"><div className="max-w-[1440px] mx-auto px-margin flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><p className="font-label-sm text-label-sm text-outline">Operational Circular Network</p></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
