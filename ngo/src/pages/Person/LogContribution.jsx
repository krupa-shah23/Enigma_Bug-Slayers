import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function LogContribution(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200"><div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between"><div className="flex items-center gap-space-sm"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZimPwqvNO5WBOD_Rr6DrxoFMG9U7zp-_fA8lYNGY_YUTus1BXwWVvqCq2vAkd1inpXBz7YGFuKubvo8a2k-YT6CEQst72AhHKNbk4Wov6WvbuvA_1JPsy564A0qOyka9DCmxpACzZ8OsJmOiTcvhVN8WirT4gjLSAaC1jNGwZHBweKLc4cOBIwvuml0rB5HGeCFdZwTwvsFkXyDjUlmBiMv4h54GnAgwiEpoFSVeDDqJHmQWBy0rbew"/><span className="font-headline-md text-headline-md tracking-tight text-primary font-bold hidden sm:inline-block">ReWaste</span></div><Navbar variant="Person" className="hidden md:flex items-center gap-gutter"><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/societies">All Societies</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button aria-label="Notifications" className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-headline-md">notifications</span></button><span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm">Person</span><div className="flex items-center"><img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPgf1R8-C9KtO74b0DTwy8-hSJibHRzegzP7HZ2l7U_XyJaXe2XIJV1NvvNf8Yb3YyWBe-t9mtW_W0aaYglDw8zqDhXx2Qn3j9fP6s2nNL4cdjJsbeidTrZ-jbDDNjjjBy-_3Th_O8c8oKoTm_ihFtdU5TTYi8csrr-mD2LddOyEHyHzscf2nQOqnKgG8M790yl9XYy0F8BkDRzJL-g5Ia0Vn3M_hcoSDyK3EJqGaCI4BQTt25MJQJHQ"/></div></div></div></header><main className="w-full pt-16 bg-[#F5F7F6]"><div className="flex flex-col w-full">
<div className="max-w-7xl mx-auto w-full px-space-xl py-space-xl">

<div className="mb-space-xl">
<div className="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider mb-space-xs">
<span className="material-symbols-outlined text-headline-sm">recycling</span>
<span>Residential Portal • Doorstep Verification</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">Log Waste Contribution</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">Record segregated waste weigh-in for residential maintenance credit offset.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">

<div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex items-center gap-space-sm pb-space-md mb-space-lg border-b border-surface-container">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined">scale</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Weigh-in Submission</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Instant ledger verification</p>
</div>
</div>
<form className="flex flex-col gap-space-lg" id="wasteContributionForm">

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="wasteCategory">Material Category</label>
<div className="relative">
<select className="w-full appearance-none bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg py-3 px-4 pr-10 focus:outline-none focus:bg-surface-container transition-colors cursor-pointer" id="wasteCategory" required="">
<option disabled defaultSelected value="">Select category</option>
<option value="Compost / Wet Waste">Compost / Wet Waste</option>
<option value="Dry Recyclables (Paper/Plastic)">Dry Recyclables (Paper/Plastic)</option>
<option value="E-waste">E-waste</option>
<option value="Hazardous / Glass">Hazardous / Glass</option>
</select>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-on-surface-variant">
<span className="material-symbols-outlined">expand_more</span>
</div>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="weightInput">Weight</label>
<div className="relative rounded-lg bg-surface-container-low focus-within:bg-surface-container transition-colors">
<input className="w-full bg-transparent font-body-lg text-body-lg text-on-surface py-3 pl-4 pr-14 rounded-lg focus:outline-none placeholder:text-outline" id="weightInput" min="0.1" placeholder="0.0" required="" step="0.1" type="number"/>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">kg</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[15px]">info</span>
              Enter verified weight from doorstep scale
            </p>
</div>

<div className="pt-space-xs">
<button className="w-full h-10 px-5 bg-primary-container hover:bg-primary active:bg-on-tertiary-fixed text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm flex items-center justify-center gap-space-xs transition-colors cursor-pointer" type="submit">
<span className="material-symbols-outlined text-headline-sm">check_circle</span>
<span>Submit Weigh-in Record</span>
</button>
</div>
</form>
<div className="hidden mt-space-md p-space-md bg-on-tertiary-container/30 text-on-primary-fixed-variant rounded-lg flex items-center gap-space-sm" id="successNotice">
<span className="material-symbols-outlined text-headline-md">task_alt</span>
<span className="font-body-md text-body-md">Weigh-in captured and added to your ledger.</span>
</div>
</div>

<div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex items-center justify-between pb-space-md mb-space-md border-b border-surface-container">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined">receipt_long</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">My Recent Logs</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Validated doorstep collections</p>
</div>
</div>
<span className="font-label-sm text-label-sm text-primary bg-surface-container-low px-3 py-1 rounded-full">5 Entries</span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
<th className="py-3 px-4 rounded-l-lg" scope="col">Date</th>
<th className="py-3 px-4" scope="col">Category</th>
<th className="py-3 px-4 text-right rounded-r-lg" scope="col">Weight (kg)</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md text-on-surface" id="logsTableBody">

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-4 px-4 whitespace-nowrap">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
<span className="font-medium">Oct 24, 2025</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Dry Recyclables</span>
</div>
</td>
<td className="py-4 px-4 text-right whitespace-nowrap">
<span className="font-semibold text-on-surface">8.4 kg</span>
<span className="ml-2 inline-flex items-center rounded-full bg-[#E8F5E9] px-2 py-0.5 font-label-sm text-label-sm text-[#2E7D32]">Verified</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-4 px-4 whitespace-nowrap">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
<span className="font-medium">Oct 21, 2025</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
<span>Compost / Wet Waste</span>
</div>
</td>
<td className="py-4 px-4 text-right whitespace-nowrap">
<span className="font-semibold text-on-surface">14.2 kg</span>
<span className="ml-2 inline-flex items-center rounded-full bg-[#E8F5E9] px-2 py-0.5 font-label-sm text-label-sm text-[#2E7D32]">Verified</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-4 px-4 whitespace-nowrap">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
<span className="font-medium">Oct 17, 2025</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-on-secondary-container"></span>
<span>E-waste</span>
</div>
</td>
<td className="py-4 px-4 text-right whitespace-nowrap">
<span className="font-semibold text-on-surface">3.5 kg</span>
<span className="ml-2 inline-flex items-center rounded-full bg-[#E8F5E9] px-2 py-0.5 font-label-sm text-label-sm text-[#2E7D32]">Verified</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-4 px-4 whitespace-nowrap">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
<span className="font-medium">Oct 12, 2025</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
<span>Compost / Wet Waste</span>
</div>
</td>
<td className="py-4 px-4 text-right whitespace-nowrap">
<span className="font-semibold text-on-surface">11.0 kg</span>
<span className="ml-2 inline-flex items-center rounded-full bg-[#E8F5E9] px-2 py-0.5 font-label-sm text-label-sm text-[#2E7D32]">Verified</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-4 px-4 whitespace-nowrap">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
<span className="font-medium">Oct 08, 2025</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Dry Recyclables</span>
</div>
</td>
<td className="py-4 px-4 text-right whitespace-nowrap">
<span className="font-semibold text-on-surface">6.8 kg</span>
<span className="ml-2 inline-flex items-center rounded-full bg-[#E8F5E9] px-2 py-0.5 font-label-sm text-label-sm text-[#2E7D32]">Verified</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</main><footer className="w-full bg-white border-t border-gray-200 mt-auto"><div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><div className="flex items-center gap-gutter"><span className="font-label-md text-label-md text-outline">Operational Circular Network</span></div></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
