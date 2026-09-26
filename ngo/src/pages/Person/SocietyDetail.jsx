import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function SocietyDetail(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200"><div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between"><div className="flex items-center gap-space-sm"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZimPwqvNO5WBOD_Rr6DrxoFMG9U7zp-_fA8lYNGY_YUTus1BXwWVvqCq2vAkd1inpXBz7YGFuKubvo8a2k-YT6CEQst72AhHKNbk4Wov6WvbuvA_1JPsy564A0qOyka9DCmxpACzZ8OsJmOiTcvhVN8WirT4gjLSAaC1jNGwZHBweKLc4cOBIwvuml0rB5HGeCFdZwTwvsFkXyDjUlmBiMv4h54GnAgwiEpoFSVeDDqJHmQWBy0rbew"/><span className="font-headline-md text-headline-md tracking-tight text-primary font-bold hidden sm:inline-block">ReWaste</span></div><Navbar variant="Person" className="hidden md:flex items-center gap-gutter"><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/societies">All Societies</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button aria-label="Notifications" className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-headline-md">notifications</span></button><span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm">Person</span><div className="flex items-center"><img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPgf1R8-C9KtO74b0DTwy8-hSJibHRzegzP7HZ2l7U_XyJaXe2XIJV1NvvNf8Yb3YyWBe-t9mtW_W0aaYglDw8zqDhXx2Qn3j9fP6s2nNL4cdjJsbeidTrZ-jbDDNjjjBy-_3Th_O8c8oKoTm_ihFtdU5TTYi8csrr-mD2LddOyEHyHzscf2nQOqnKgG8M790yl9XYy0F8BkDRzJL-g5Ia0Vn3M_hcoSDyK3EJqGaCI4BQTt25MJQJHQ"/></div></div></div></header><main className="w-full pt-16 bg-[#F5F7F6]"><div className="flex flex-col w-full">
<div className="w-full max-w-5xl mx-auto px-6 py-8 sm:py-12 flex flex-col gap-8">

<Navbar variant="Person" className="flex items-center">
<Link className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary-container font-label-lg text-label-lg transition-colors group" to="/societies">
<span className="material-symbols-outlined text-headline-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
<span>Back to All Societies</span>
</Link>
</Navbar>

<div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-6 sm:p-10 flex flex-col gap-10">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
<div className="flex flex-col gap-2">
<div className="inline-flex items-center gap-2">
<span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">Cooperative Hub</span>
<span className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
              Certified Network
            </span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Crestview Towers</h1>
<p className="inline-flex items-center gap-1.5 text-on-surface-variant font-body-md text-body-md">
<span className="material-symbols-outlined text-headline-sm text-outline">location_on</span>
            Sector 54, Golf Course Extension, Gurugram
          </p>
</div>

<div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl self-start md:self-auto">
<div className="relative w-16 h-16 flex items-center justify-center">
<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
<path className="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
<path className="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="96, 100" strokeLinecap="round" strokeWidth="3.5"></path>
</svg>
<span className="absolute font-headline-md text-headline-md text-primary font-bold">96</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface-variant">Trust Score</span>
<span className="font-label-lg text-label-lg text-on-surface font-semibold">96/100</span>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              Tier A - Verified
            </span>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="bg-surface-container-low p-5 rounded-xl flex items-start gap-4 transition-all">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shadow-sm shrink-0">
<span className="material-symbols-outlined text-headline-md">calendar_today</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Pickup Schedule</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">Bi-weekly</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Scheduled cycle</span>
</div>
</div>

<div className="bg-surface-container-low p-5 rounded-xl flex items-start gap-4 transition-all">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shadow-sm shrink-0">
<span className="material-symbols-outlined text-headline-md">group</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Community Base</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">380 Registered Households</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Active segregation</span>
</div>
</div>

<div className="bg-surface-container-low p-5 rounded-xl flex items-start gap-4 transition-all">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shadow-sm shrink-0">
<span className="material-symbols-outlined text-headline-md">assignment_turned_in</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Circular Traceability</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">5 Active Municipal &amp; Upcycling Contracts</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Direct processing</span>
</div>
</div>
</div>

<div className="flex flex-col items-center gap-3 pt-4">
<button className="w-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg h-12 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm" type="button">
<span className="material-symbols-outlined text-headline-sm">how_to_reg</span>
<span>Join This Society</span>
</button>
<p className="font-body-sm text-body-sm text-on-surface-variant text-center">
          Currently unassigned resident? Request society membership
        </p>
</div>
</div>
</div>
</div></main><footer className="w-full bg-white border-t border-gray-200 mt-auto"><div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><div className="flex items-center gap-gutter"><span className="font-label-md text-label-md text-outline">Operational Circular Network</span></div></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
