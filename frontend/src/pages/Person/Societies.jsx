import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Societies(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200"><div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between"><div className="flex items-center gap-space-sm"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZimPwqvNO5WBOD_Rr6DrxoFMG9U7zp-_fA8lYNGY_YUTus1BXwWVvqCq2vAkd1inpXBz7YGFuKubvo8a2k-YT6CEQst72AhHKNbk4Wov6WvbuvA_1JPsy564A0qOyka9DCmxpACzZ8OsJmOiTcvhVN8WirT4gjLSAaC1jNGwZHBweKLc4cOBIwvuml0rB5HGeCFdZwTwvsFkXyDjUlmBiMv4h54GnAgwiEpoFSVeDDqJHmQWBy0rbew"/><span className="font-headline-md text-headline-md tracking-tight text-primary font-bold hidden sm:inline-block">ReWaste</span></div><Navbar variant="Person" className="hidden md:flex items-center gap-gutter"><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link><Link className="transition-colors py-1 text-primary-container font-headline-sm" to="/societies">All Societies</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button aria-label="Notifications" className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-headline-md">notifications</span></button><span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm">Person</span><div className="flex items-center"><img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPgf1R8-C9KtO74b0DTwy8-hSJibHRzegzP7HZ2l7U_XyJaXe2XIJV1NvvNf8Yb3YyWBe-t9mtW_W0aaYglDw8zqDhXx2Qn3j9fP6s2nNL4cdjJsbeidTrZ-jbDDNjjjBy-_3Th_O8c8oKoTm_ihFtdU5TTYi8csrr-mD2LddOyEHyHzscf2nQOqnKgG8M790yl9XYy0F8BkDRzJL-g5Ia0Vn3M_hcoSDyK3EJqGaCI4BQTt25MJQJHQ"/></div></div></div></header><main className="w-full pt-16 bg-[#F5F7F6]"><div className="max-w-7xl mx-auto px-6 py-8"><div className="flex flex-col w-full">
<div className="w-full mb-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md flex-1 max-w-2xl">
<div className="relative flex-1">
<span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full h-10 pl-11 pr-space-md rounded-lg bg-surface-container-low font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-colors" id="society-search" placeholder="Search societies by name or area..." type="text"/>
</div>
<div className="relative min-w-[170px]">
<select className="w-full h-10 px-space-md pr-8 rounded-lg bg-surface-container-low font-label-lg text-on-surface appearance-none focus:outline-none focus:bg-surface-container cursor-pointer transition-colors" id="society-sort">
<option value="trust">Trust Score</option>
<option value="name">Name</option>
</select>
<span className="material-symbols-outlined absolute right-space-sm top-1/2 -translate-y-1/2 text-outline pointer-events-none text-headline-sm">expand_more</span>
</div>
</div>
<div className="flex items-center gap-space-xs text-on-surface-variant bg-surface-container px-space-md py-2 rounded-lg self-start md:self-auto">
<span className="material-symbols-outlined text-body-lg text-outline">info</span>
<span className="font-label-md text-label-md">Browse Mode: Viewing registered residential societies</span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter w-full" id="societies-grid">
<div className="society-card group bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<h2 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary-container transition-colors">Green Meadows Co-op</h2>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#E8F5E9] text-[#2E7D32] whitespace-nowrap">
<span className="material-symbols-outlined text-label-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
            94 Trust Score
          </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mb-space-lg">
<span className="material-symbols-outlined text-body-lg text-outline">location_on</span>
          Sector 42, Golf Course Rd, Gurugram
        </p>
</div>
<div className="pt-space-md bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg pb-space-lg rounded-b-xl flex items-center justify-between mt-space-md">
<span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
<span className="material-symbols-outlined text-body-lg text-outline">calendar_today</span>
          Bi-weekly
        </span>
<span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary-container font-semibold">
<span className="material-symbols-outlined text-body-lg">description</span>
          3 Active Contracts
        </span>
</div>
</div>
<div className="society-card group bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<h2 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary-container transition-colors">Silver Oak Enclave</h2>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#E8F5E9] text-[#2E7D32] whitespace-nowrap">
<span className="material-symbols-outlined text-label-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
            88 Trust Score
          </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mb-space-lg">
<span className="material-symbols-outlined text-body-lg text-outline">location_on</span>
          DLF Phase 5, Club Drive, Gurugram
        </p>
</div>
<div className="pt-space-md bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg pb-space-lg rounded-b-xl flex items-center justify-between mt-space-md">
<span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
<span className="material-symbols-outlined text-body-lg text-outline">calendar_today</span>
          Weekly
        </span>
<span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary-container font-semibold">
<span className="material-symbols-outlined text-body-lg">description</span>
          4 Active Contracts
        </span>
</div>
</div>
<div className="society-card group bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<h2 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary-container transition-colors">Lotus Residency</h2>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#FFF8E1] text-[#F9A825] whitespace-nowrap">
<span className="material-symbols-outlined text-label-sm" style={{fontVariationSettings: "'FILL' 1"}}>shield</span>
            68 Trust Score
          </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mb-space-lg">
<span className="material-symbols-outlined text-body-lg text-outline">location_on</span>
          Indirapuram, Habitat Centre Rd, Ghaziabad
        </p>
</div>
<div className="pt-space-md bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg pb-space-lg rounded-b-xl flex items-center justify-between mt-space-md">
<span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
<span className="material-symbols-outlined text-body-lg text-outline">calendar_today</span>
          Weekly
        </span>
<span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary-container font-semibold">
<span className="material-symbols-outlined text-body-lg">description</span>
          1 Active Contract
        </span>
</div>
</div>
<div className="society-card group bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<h2 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary-container transition-colors">Palm Heights</h2>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#E8F5E9] text-[#2E7D32] whitespace-nowrap">
<span className="material-symbols-outlined text-label-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
            91 Trust Score
          </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mb-space-lg">
<span className="material-symbols-outlined text-body-lg text-outline">location_on</span>
          Sector 65, Emerald Hills, Gurugram
        </p>
</div>
<div className="pt-space-md bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg pb-space-lg rounded-b-xl flex items-center justify-between mt-space-md">
<span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
<span className="material-symbols-outlined text-body-lg text-outline">calendar_today</span>
          Monthly
        </span>
<span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary-container font-semibold">
<span className="material-symbols-outlined text-body-lg">description</span>
          2 Active Contracts
        </span>
</div>
</div>
<div className="society-card group bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<h2 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary-container transition-colors">Aura Boulevard</h2>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#F3F4F6] text-[#6B7280] whitespace-nowrap">
<span className="material-symbols-outlined text-label-sm">fiber_new</span>
            New
          </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mb-space-lg">
<span className="material-symbols-outlined text-body-lg text-outline">location_on</span>
          Sector 137, Expressway Corridor, Noida
        </p>
</div>
<div className="pt-space-md bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg pb-space-lg rounded-b-xl flex items-center justify-between mt-space-md">
<span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
<span className="material-symbols-outlined text-body-lg text-outline">calendar_today</span>
          Weekly
        </span>
<span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary-container font-semibold">
<span className="material-symbols-outlined text-body-lg">description</span>
          0 Active Contracts
        </span>
</div>
</div>
<div className="society-card group bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<h2 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary-container transition-colors">Crestview Towers</h2>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#E8F5E9] text-[#2E7D32] whitespace-nowrap">
<span className="material-symbols-outlined text-label-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
            96 Trust Score
          </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mb-space-lg">
<span className="material-symbols-outlined text-body-lg text-outline">location_on</span>
          Sector 54, Golf Course Extension, Gurugram
        </p>
</div>
<div className="pt-space-md bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg pb-space-lg rounded-b-xl flex items-center justify-between mt-space-md">
<span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
<span className="material-symbols-outlined text-body-lg text-outline">calendar_today</span>
          Bi-weekly
        </span>
<span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary-container font-semibold">
<span className="material-symbols-outlined text-body-lg">description</span>
          5 Active Contracts
        </span>
</div>
</div>
</div>
</div>
</div></main><footer className="w-full bg-white border-t border-gray-200 mt-auto"><div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><div className="flex items-center gap-gutter"><span className="font-label-md text-label-md text-outline">Operational Circular Network</span></div></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
