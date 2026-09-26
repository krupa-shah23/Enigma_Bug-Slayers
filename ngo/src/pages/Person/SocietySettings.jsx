import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function SocietySettings(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased flex flex-col justify-between min-h-screen">
      <Navbar variant="Person"/>
      <main className="w-full pt-16 bg-[#F5F7F6] flex-1">
        <div className="flex flex-col w-full">



<div className="fixed top-20 right-6 z-50 max-w-md w-full transition-all duration-300 transform translate-y-0" id="socket-toast-s07">
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xl flex items-start gap-space-sm">
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-headline-sm" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
</div>
<div className="flex-1 min-w-0 pr-space-xs">
<div className="flex items-center gap-space-xs">
<span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-1.5 py-0.5 rounded-full">S07 Event</span>
<span className="font-label-sm text-label-sm text-outline">Just now</span>
</div>
<p className="font-body-md text-body-md text-on-surface font-semibold mt-0.5">Contract proposal received</p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">EcoCompost Organics submitted terms for 1,200 kg/mo Compost/Wet Waste.</p>
</div>
<button aria-label="Dismiss toast" className="text-outline hover:text-on-surface transition-colors p-1 rounded-lg">
<span className="material-symbols-outlined text-headline-sm">close</span>
</button>
</div>
</div>
<div className="max-w-7xl mx-auto px-6 py-8 w-full space-y-8">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div className="space-y-1">
<div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
<span className="material-symbols-outlined text-headline-sm">verified_user</span>
<span>Verified Administrative Unit</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface font-bold">Society Settings &amp; Governance</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Manage collection parameters, committee designations, and upcycling agreements.</p>
</div>
<div className="flex items-center gap-space-sm bg-surface-container px-space-md py-space-xs rounded-full self-start md:self-auto">
<span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
<span className="font-label-md text-label-md text-on-surface-variant">Role Scope: <strong className="text-on-surface">Committee President (CP)</strong></span>
</div>
</div>

<div className="bg-secondary-fixed/50 p-space-lg rounded-xl shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-headline-lg" style={{fontVariationSettings: "'FILL' 1"}}>crisis_alert</span>
</div>
<div className="space-y-1">
<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary px-2 py-0.5 bg-secondary-fixed rounded-full">Seasonal Surge Forecast</span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Confidence: 94.2%</span>
</div>
<p className="font-headline-sm text-headline-sm text-on-secondary-fixed font-bold">Diwali Cleanup Surge Projected: Recommended extra pickup cycle on Nov 10, 2025.</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Historical volume shows a 48% influx of composite paper, cartons, and festive biodegradable matter.</p>
</div>
</div>
<div className="flex flex-wrap items-center gap-space-sm w-full lg:w-auto shrink-0">
<div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-outline text-headline-sm">event</span>
<input className="font-body-md text-body-md text-on-surface bg-transparent focus:outline-none" id="surge-date-input" type="date" value="2025-11-10"/>
</div>
<button className="h-10 px-space-md rounded-lg font-label-lg text-label-lg bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-space-xs" type="button">
<span>Override Date</span>
</button>
<button className="h-10 px-space-lg rounded-lg font-label-lg text-label-lg bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm flex items-center gap-space-xs" type="button">
<span className="material-symbols-outlined text-headline-sm">task_alt</span>
<span>Accept Suggestion</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

<div className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-6">
<div className="flex items-center justify-between pb-space-sm">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Officer Governance Controls</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Regulated under Model Bye-Law Section 14A for Solid Waste Segregation.</p>
</div>
<span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2.5 py-1 rounded-full">Authorized Session</span>
</div>
<div className="space-y-space-md">

<div className="space-y-1.5">
<label className="block font-label-lg text-label-lg text-on-surface" htmlFor="collection-frequency">Collection Frequency</label>
<div className="relative">
<select className="w-full h-11 px-space-md pr-10 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none appearance-none transition-all shadow-sm" id="collection-frequency">
<option value="Weekly">Weekly (High Density Protocol)</option>
<option defaultSelected value="Bi-weekly">Bi-weekly (Standard Suburb Standard)</option>
<option value="Monthly">Monthly (Restricted Bulk Volume)</option>
</select>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-space-md text-outline">
<span className="material-symbols-outlined">expand_more</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-outline">Interval changes require 48-hour prior sync with logistics contractors.</p>
</div>

<div className="space-y-1.5">
<div className="flex items-center justify-between">
<label className="block font-label-lg text-label-lg text-on-surface" htmlFor="treasurer-selector">Treasurer Designation (CP-only privilege)</label>
<span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-sm">lock</span> CP Permissioned
              </span>
</div>
<div className="relative">
<div className="flex items-center bg-surface-container-low rounded-lg px-space-md py-2.5 gap-space-sm shadow-sm">
<img className="w-10 h-10 rounded-full object-cover shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0D7o4N6528Z9RWUrVWPY-k0OHvBU7PepoO_eEJGsyNxEXOuGgMVdWsHVLKSJvEhVhrf4uDH83LT_GQlehDA8Mn3bjpVMduW4eghsSqfXyxevKrxt3bXqywIruL_7Oy--fcNsJY0uikIocet4lkOUTNl67y2dtvWxaQQPd0NPdtlAPKX-vDfTlg3uwUzjxC6cuY5wQle0sCaXC8wDDzii5mIlBv3aKWxoiHusQAJ2_3jchDTD3qNZIvA"/>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">Vikram Malhotra</span>
<span className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full shrink-0">Elected Treasurer</span>
</div>
<span className="font-body-sm text-body-sm text-outline truncate block">+91 98111 22334 • Society Flat C-402</span>
</div>
<button aria-label="Change designated treasurer" className="text-outline hover:text-primary transition-colors p-1" type="button">
<span className="material-symbols-outlined">sync_alt</span>
</button>
</div>
</div>
<p className="font-body-sm text-body-sm text-outline">Authorized to sign disbursement escrow splits for raw bulk off-take.</p>
</div>
</div>
<div className="pt-space-sm flex items-center justify-between">
<div className="flex items-center gap-2 text-outline font-body-sm text-body-sm">
<span className="material-symbols-outlined text-sm text-primary">history</span>
<span>Last amended Oct 14, 2025 by CP</span>
</div>
<button className="h-10 px-space-lg rounded-lg font-label-lg text-label-lg text-primary bg-primary/10 hover:bg-primary/20 transition-colors flex items-center gap-space-xs font-semibold" type="button">
<span className="material-symbols-outlined text-headline-sm">save</span>
<span>Save Parameters</span>
</button>
</div>
</div>

<div className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">Network Metrics</span>
<span className="font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed font-semibold px-2 py-0.5 rounded-full">Optimal Ledger Flow</span>
</div>
<div className="flex items-center gap-space-md">
<div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-primary shrink-0 relative">
<svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
<path className="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
<path className="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="88, 100" strokeLinecap="round" strokeWidth="3.5"></path>
</svg>
<div className="absolute inset-0 flex items-center justify-center font-headline-sm text-headline-sm text-on-surface font-bold">88%</div>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Community Segregation Index</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">92/104 households compliant under wet/dry separation mandates.</p>
</div>
</div>
<div className="relative rounded-lg overflow-hidden h-36">
<img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBurc1kLRR6Hnqj5Z6t1u2zVY0O0oHndURstytPxsmQRNaWOsdMn3WDGcrQhhDl2ELHk3gJJHsRIVT3rYOrNLeInkjX5rwHkdhD87yOxDAc7-hSSyvggQVUEWEnv-DrFAL79BkdwnF9EwugJ8bSCGHjkQWpjYt0al7IFyMzabMPWyJpD7K45KNME9VTbJbqqvL2MM9qOyJBVnZJqCtQjEloTKN8B716wZERIyazUIUpFn5aJKMS6Pl_-Q"/>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-space-md">
<span className="font-label-sm text-label-sm text-inverse-on-surface">Staging Yard: Block B Covered Bay (Capacity 2,500 kg)</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Material Contracts</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Active processing lines, monthly guaranteed tonnage thresholds, and off-take rates.</p>
</div>
<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm bg-surface-container-high px-space-sm py-1 rounded-md text-on-surface-variant">3 Counterparties Synchronized</span>
</div>
</div>

<div className="space-y-space-sm">

<div className="bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary font-bold shrink-0">
<span className="material-symbols-outlined">recycling</span>
</div>
<div className="space-y-0.5 min-w-0">
<div className="flex items-center gap-space-sm flex-wrap">
<span className="font-label-lg text-label-lg text-on-surface font-bold">GreenCycle Upcyclers</span>
<span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full font-medium">Active</span>
</div>
<div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="font-medium text-on-surface">Dry Recyclables</span>
<span>•</span>
<span>Tonnage: <strong>800 kg/mo</strong></span>
<span>•</span>
<span>Unit Rate: <strong>$0.22/kg</strong></span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm shrink-0 self-end md:self-auto">
<button className="h-9 px-space-md rounded-lg font-label-md text-label-md bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors" type="button">
              Review
            </button>
<button className="h-9 px-space-md rounded-lg font-label-md text-label-md bg-surface-container text-on-surface-variant font-semibold cursor-default" type="button">
              Accepted
            </button>
</div>
</div>

<div className="bg-secondary-fixed/20 hover:bg-secondary-fixed/30 transition-colors rounded-xl p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold shrink-0">
<span className="material-symbols-outlined">compost</span>
</div>
<div className="space-y-0.5 min-w-0">
<div className="flex items-center gap-space-sm flex-wrap">
<span className="font-label-lg text-label-lg text-on-surface font-bold">EcoCompost Organics</span>
<span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full font-medium">Offered</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">New Proposal</span>
</div>
<div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="font-medium text-on-surface">Compost/Wet Waste</span>
<span>•</span>
<span>Tonnage: <strong>1,200 kg/mo</strong></span>
<span>•</span>
<span>Unit Rate: <strong>$0.15/kg</strong></span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm shrink-0 self-end md:self-auto">
<button className="h-9 px-space-md rounded-lg font-label-md text-label-md bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors shadow-sm" type="button">
              Review
            </button>
<button className="h-9 px-space-md rounded-lg font-label-md text-label-lg bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm" type="button">
              Accept
            </button>
</div>
</div>

<div className="bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary font-bold shrink-0">
<span className="material-symbols-outlined">devices_other</span>
</div>
<div className="space-y-0.5 min-w-0">
<div className="flex items-center gap-space-sm flex-wrap">
<span className="font-label-lg text-label-lg text-on-surface font-bold">TerraE-waste Solutions</span>
<span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full font-medium">Active</span>
</div>
<div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="font-medium text-on-surface">E-waste &amp; Metals</span>
<span>•</span>
<span>Tonnage: <strong>150 kg/mo</strong></span>
<span>•</span>
<span>Unit Rate: <strong>$1.40/kg</strong></span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm shrink-0 self-end md:self-auto">
<button className="h-9 px-space-md rounded-lg font-label-md text-label-md bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors" type="button">
              Manage
            </button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-6">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm">
<div className="space-y-1">
<div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
<span className="material-symbols-outlined text-sm">home_work</span>
<span>Resident Desk Registry</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Register Society (Resident Desk)</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Enroll an affiliated residential cluster or sub-society into the regional circular collection grid.</p>
</div>
<span className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-3 py-1 rounded-full self-start md:self-auto">Draft Form S-101</span>
</div>
<form className="space-y-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">

<div className="space-y-1.5">
<label className="block font-label-lg text-label-lg text-on-surface font-medium" htmlFor="reg-society-name">Society Name</label>
<input className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none transition-all shadow-sm" id="reg-society-name" placeholder="e.g., Pinecrest Residents Welfare Society" required="" type="text" value="Silver Oak Heights Cooperative"/>
</div>

<div className="space-y-1.5">
<label className="block font-label-lg text-label-lg text-on-surface font-medium" htmlFor="reg-society-address">Address</label>
<input className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none transition-all shadow-sm" id="reg-society-address" placeholder="Street address, Sector, City" required="" type="text" value="Plot 42, Sector 54, Golf Course Extension Road"/>
</div>
</div>

<div className="space-y-space-sm bg-surface-container-low p-space-md rounded-xl">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-headline-sm">pin_drop</span>
<span>Latitude / Longitude Geo-Coordinates</span>
</label>
<div className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 self-start sm:self-auto" id="ward-badge">
<span>✓ Verified Municipal Ward 14</span>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-12 gap-space-md items-center">
<div className="sm:col-span-4 space-y-1">
<span className="font-label-sm text-label-sm text-outline">Latitude</span>
<input className="w-full h-10 px-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md font-mono focus:outline-none" id="lat-field" type="text" value="28.4595° N"/>
</div>
<div className="sm:col-span-4 space-y-1">
<span className="font-label-sm text-label-sm text-outline">Longitude</span>
<input className="w-full h-10 px-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md font-mono focus:outline-none" id="lng-field" type="text" value="77.0266° E"/>
</div>
<div className="sm:col-span-4 sm:pt-5">
<button className="w-full h-10 px-space-md rounded-lg font-label-md text-label-md bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center gap-1.5" type="button">
<span className="material-symbols-outlined text-sm">my_location</span>
<span>Check Location</span>
</button>
</div>
</div>
</div>

<div className="space-y-1.5 max-w-md">
<label className="block font-label-lg text-label-lg text-on-surface font-medium" htmlFor="reg-collection-frequency">Collection Frequency</label>
<div className="relative">
<select className="w-full h-11 px-space-md pr-10 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none appearance-none transition-all shadow-sm" id="reg-collection-frequency">
<option value="Weekly">Weekly</option>
<option defaultSelected value="Bi-weekly">Bi-weekly</option>
<option value="Monthly">Monthly</option>
</select>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-space-md text-outline">
<span className="material-symbols-outlined">expand_more</span>
</div>
</div>
</div>

<div className="pt-space-sm flex flex-col sm:flex-row items-center justify-end gap-space-md">
<button className="w-full sm:w-auto h-11 px-8 rounded-lg font-label-lg text-label-lg bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-space-xs" type="submit">
<span className="material-symbols-outlined text-headline-sm">app_registration</span>
<span>Register Society</span>
</button>
</div>
</form>
</div>
</div>
</div>
</main>
<footer className="w-full bg-white border-t border-gray-200 mt-auto">
  <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
    <p>© 2025 ReWaste Materials Ledger. All rights reserved.</p>
    <div className="flex items-center gap-gutter">
      <span className="font-label-md text-label-md text-outline">Operational Circular Network</span>
    </div>
  </div>
</footer>
{notice && <div className="fixed bottom-4 right-4 bg-primary text-on-primary px-4 py-2 rounded-lg shadow-lg z-50">{notice}</div>}
</div>
</div>
);
}

