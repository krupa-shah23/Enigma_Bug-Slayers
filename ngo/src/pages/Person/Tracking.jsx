import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Tracking(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased flex flex-col justify-between min-h-screen"><Navbar variant="Person"/><main className="w-full pt-16 bg-[#F5F7F6] flex-1"><div className="flex flex-col w-full">

<div className="fixed top-20 right-6 z-50 max-w-md w-full bg-surface-container-lowest shadow-xl rounded-xl p-space-md transition-all duration-300 transform translate-y-0 opacity-100" id="socket-toast">
<div className="flex items-start gap-space-sm">
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0 text-on-secondary-fixed">
<span className="material-symbols-outlined text-headline-sm" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-space-xs mb-0.5">
<span className="bg-secondary text-on-secondary font-label-sm text-label-sm px-1.5 py-0.2 rounded font-semibold tracking-wider uppercase">SOCKET EVENT S05</span>
<span className="text-on-surface-variant font-body-sm text-body-sm">Just now</span>
</div>
<p className="text-on-surface font-body-md text-body-md font-medium leading-snug">
          Collector Ramesh Kumar is 500m away. Please keep scrap lot ready at gate.
        </p>
</div>
<button aria-label="Dismiss toast" className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg transition-colors">
<span className="material-symbols-outlined text-headline-sm">close</span>
</button>
</div>
</div>
<div className="max-w-7xl mx-auto px-6 py-space-xl w-full">

<div className="mb-space-lg">
<Link className="inline-flex items-center gap-1 font-label-lg text-label-lg text-primary hover:text-tertiary-container transition-colors mb-space-sm group" to="/home">
<span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
        Back to Active Requests
      </Link>
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Live Pickup Tracking</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
            Tracking Collector <span className="font-semibold text-on-surface">Ramesh Kumar</span> • Route <span className="font-semibold text-on-surface">#A-14</span>
</p>
</div>

<div className="inline-flex items-center gap-space-sm px-space-md py-2.5 rounded-full bg-secondary-fixed text-on-secondary-fixed shadow-sm">
<span className="material-symbols-outlined text-headline-sm text-secondary animate-pulse" style={{fontVariationSettings: "'FILL' 1"}}>timer</span>
<span className="font-label-lg text-label-lg font-semibold tracking-tight">
            Estimated Arrival: 8 mins <span className="opacity-75 font-normal">(0.9 km away)</span>
</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest shadow-sm rounded-xl p-space-lg mb-space-lg">
<div className="relative flex items-center justify-between">

<div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-container-high z-0"></div>

<div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-1 bg-primary-container z-0"></div>

<div className="relative z-10 flex flex-col items-center group">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
<span className="material-symbols-outlined text-headline-sm" style={{fontVariationSettings: "'FILL' 1"}}>check</span>
</div>
<span className="mt-2 font-label-md text-label-md font-semibold text-on-surface">Heading</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">09:42 AM</span>
</div>

<div className="relative z-10 flex flex-col items-center">
<div className="relative">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined text-headline-sm animate-spin" style={{animationDuration: "4s"}}>near_me</span>
</div>
<span className="absolute -inset-1.5 rounded-full bg-primary-container opacity-25 animate-ping pointer-events-none"></span>
</div>
<span className="mt-2 font-label-md text-label-md font-semibold text-primary-container">Arrived</span>
<span className="font-body-sm text-body-sm text-primary font-medium">In Transit</span>
</div>

<div className="relative z-10 flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
<span className="material-symbols-outlined text-headline-sm">inventory_2</span>
</div>
<span className="mt-2 font-label-md text-label-md text-on-surface-variant">Picked up</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Pending</span>
</div>

<div className="relative z-10 flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
<span className="material-symbols-outlined text-headline-sm">task_alt</span>
</div>
<span className="mt-2 font-label-md text-label-md text-on-surface-variant">Completed</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Pending</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

<div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<div className="relative w-full h-[520px] bg-[#E9EBE8] overflow-hidden select-none" id="map-viewport">

<svg className="absolute inset-0 w-full h-full text-surface-container-high opacity-70 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
<defs>
<pattern height="40" id="grid-pattern" patternUnits="userSpaceOnUse" width="40">
<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1.2"></path>
</pattern>
</defs>
<rect fill="url(#grid-pattern)" height="100%" width="100%"></rect>

<path d="M -50,300 C 150,310 250,150 480,220 C 650,270 750,120 950,180" fill="none" stroke="#D1D5DB" strokeLinecap="round" strokeWidth="24"></path>
<path d="M 120,-20 C 150,180 320,240 500,420 C 620,540 850,500 950,560" fill="none" stroke="#D1D5DB" strokeLinecap="round" strokeWidth="16"></path>

<path d="M 680,60 Q 820,80 840,200 Q 720,240 640,160 Z" fill="#DCECD7" opacity="0.6"></path>
</svg>

<svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">

<path d="M 240,320 Q 380,290 460,240 T 640,180" fill="none" id="route-path" stroke="#2E7D32" stroke-dasharray="8 8" strokeLinecap="round" strokeWidth="5">
<animate attributeName="stroke-dashoffset" dur="1.2s" repeatCount="indefinite" values="32;0"></animate>
</path>

<g transform="translate(430, 235)">
<rect fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" height="22" rx="11" width="70" x="-35" y="-12"></rect>
<text fill="#2E7D32" fontFamily="Inter" fontSize="11" font-weight="600" textAnchor="middle" x="0" y="3">500 m</text>
</g>
</svg>

<div className="absolute z-20 top-[180px] left-[640px] -translate-x-1/2 -translate-y-full flex flex-col items-center">

<div className="bg-surface-container-lowest px-2.5 py-1 rounded-md shadow-md mb-1.5 flex items-center gap-1.5 whitespace-nowrap">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm font-semibold text-on-surface">Plot 14, Riverside Avenue</span>
</div>

<div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-lg">
<span className="material-symbols-outlined text-headline-sm" style={{fontVariationSettings: "'FILL' 1"}}>home_pin</span>
</div>
<div className="w-2 h-2 bg-secondary rotate-45 -mt-1"></div>
</div>

<div className="absolute z-20 top-[320px] left-[240px] -translate-x-1/2 -translate-y-full flex flex-col items-center">

<div className="bg-surface-container-lowest px-2.5 py-1 rounded-md shadow-md mb-1.5 flex items-center gap-1.5 whitespace-nowrap">
<span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
<span className="font-label-sm text-label-sm font-semibold text-on-surface">Ramesh Kumar (Collector)</span>
</div>

<div className="relative flex items-center justify-center">
<div className="absolute w-14 h-14 rounded-full bg-primary-container opacity-25 animate-ping pointer-events-none"></div>
<div className="w-11 h-11 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg relative z-10">
<span className="material-symbols-outlined text-headline-sm" style={{fontVariationSettings: "'FILL' 1"}}>electric_rickshaw</span>
</div>
</div>
<div className="w-2 h-2 bg-primary-container rotate-45 -mt-1"></div>
</div>

<div className="absolute bottom-5 right-5 z-30 flex flex-col bg-surface-container-lowest rounded-lg shadow-md overflow-hidden">
<button aria-label="Zoom in" className="w-9 h-9 flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-body-lg">add</span>
</button>
<div className="h-px bg-surface-variant w-full"></div>
<button aria-label="Zoom out" className="w-9 h-9 flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-body-lg">remove</span>
</button>
</div>

<div className="absolute bottom-5 left-5 z-30 bg-surface-container-lowest/95 backdrop-blur-sm px-space-md py-2.5 rounded-lg shadow-sm flex items-center gap-space-md">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-primary-container"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Collector Location</span>
</div>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Pickup Point</span>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-space-lg">
<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col">
<div className="flex items-center gap-space-md pb-space-md">

<div className="relative shrink-0">
<img className="w-16 h-16 rounded-full object-cover shadow-inner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMsQpjLsponZEP7YLqIWoPOpNssd6Y0lnMNr-_styhWhc-_z_hO8m6-s0YmMDxPJ28a9Bmmc_oVoQt1rjaiAzYfR93UFPgAg_6e_H7ov1lXAJLCzfDpcmwbEekKyRiAJk9Xt-owpGlQVVDoFvqgseTXeMwyJHY236YeNVDxeU7VrwVuhkMhKZFkiGXcAYpY6A2ss85ecH8pnWIGEhCFatIHa2Z5U1l9AXXllEq-k_dCTjI3elAlBglXg" />
<div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow">
<span className="material-symbols-outlined text-[12px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
</div>
</div>
<div className="min-w-0">
<span className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wider">Assigned Bhangarwala</span>
<h2 className="font-headline-md text-headline-md text-on-surface truncate">Ramesh Kumar</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">EcoTrader Express Hub #4</p>
</div>
</div>

<div className="grid grid-cols-2 gap-space-sm py-space-sm bg-surface-container-low rounded-lg px-space-md my-space-sm">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Rating</span>
<div className="flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-headline-sm text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="font-headline-sm text-headline-sm font-semibold text-on-surface">4.9</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(142)</span>
</div>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Vehicle Details</span>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="material-symbols-outlined text-headline-sm text-on-surface-variant">electric_rickshaw</span>
<span className="font-label-md text-label-md font-semibold text-on-surface">DL-5S-9912</span>
</div>
</div>
</div>

<div className="mt-space-md pt-space-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Direct Helpline</span>
<span className="font-label-md text-label-md font-semibold text-on-surface">+91 98112 44321</span>
</div>
<Link className="w-full h-11 bg-primary-container hover:bg-tertiary-container text-on-primary rounded-lg font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors" to="tel:+919811244321">
<span className="material-symbols-outlined text-headline-sm">call</span>
              Call Collector
            </Link>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Pickup Node</span>
<span className="font-label-sm text-label-sm bg-surface-container-high px-2 py-0.5 rounded text-on-surface font-semibold">Resident Site</span>
</div>
<p className="font-headline-sm text-headline-sm text-on-surface">Plot 14, Riverside Avenue</p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Main Gate Collection Point • Block C</p>
<div className="mt-space-md pt-space-sm flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-headline-sm text-secondary">info</span>
<span className="font-body-sm text-body-sm">Weigh-scale digital check-in will occur upon arrival.</span>
</div>
<button className="w-full mt-3 py-2 px-3 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"><svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> Report Issue / Material Mismatch</button></div>
</div>
</div>
</div>

</div></main><footer className="w-full bg-white border-t border-gray-200 mt-auto"><div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm"><p className="">© 2025 ReWaste Materials Ledger. All rights reserved.</p><div className="flex items-center gap-gutter"><span className="font-label-md text-label-md text-outline">Operational Circular Network</span></div></div></footer>

<div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" id="dispute-modal"><div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 flex flex-col"><div className="p-5 border-b border-gray-100 flex items-start justify-between bg-surface-bright"><div className="flex items-start gap-3"><div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5"><span className="material-symbols-outlined text-headline-md" style={{fontVariationSettings: "'FILL' 1"}}>gavel</span></div><div><h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Report Material Mismatch or Issue</h3><p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Lot #EX-4092 • Household E-Waste (Collector: Ramesh Kumar)</p></div></div><button aria-label="Close dialog" className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-gray-100 transition-colors"><span className="material-symbols-outlined text-headline-md">close</span></button></div><div className="p-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto"><div className="flex flex-col gap-2"><label className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">Select Dispute Reason</label><div className="flex flex-col gap-2"><label className="flex items-start gap-3 p-2.5 rounded-lg border border-primary-container bg-emerald-50/50 cursor-pointer"><input defaultChecked className="mt-1 text-primary accent-primary" name="dispute-reason" type="radio" /><div className="flex flex-col"><span className="font-label-md text-label-md font-semibold text-on-surface">Actual weight significantly different from estimate</span><span className="font-body-sm text-body-sm text-on-surface-variant">Discrepancy detected during gate weighing scale verification.</span></div></label><label className="flex items-start gap-3 p-2.5 rounded-lg border border-gray-200 hover:bg-surface-container-low cursor-pointer transition-colors"><input className="mt-1 text-primary accent-primary" name="dispute-reason" type="radio" /><div className="flex flex-col"><span className="font-label-md text-label-md font-semibold text-on-surface">Material category mismatch</span><span className="font-body-sm text-body-sm text-on-surface-variant">Non-recyclable or hazardous items present in scrap parcel.</span></div></label><label className="flex items-start gap-3 p-2.5 rounded-lg border border-gray-200 hover:bg-surface-container-low cursor-pointer transition-colors"><input className="mt-1 text-primary accent-primary" name="dispute-reason" type="radio" /><div className="flex flex-col"><span className="font-label-md text-label-md font-semibold text-on-surface">Condition / contamination issue</span><span className="font-body-sm text-body-sm text-on-surface-variant">Lot damaged, heavily wet, or contaminated.</span></div></label><label className="flex items-start gap-3 p-2.5 rounded-lg border border-gray-200 hover:bg-surface-container-low cursor-pointer transition-colors"><input className="mt-1 text-primary accent-primary" name="dispute-reason" type="radio" /><div className="flex flex-col"><span className="font-label-md text-label-md font-semibold text-on-surface">Collector arrived with incorrect rate proposal</span><span className="font-body-sm text-body-sm text-on-surface-variant">Refusal to honor pre-agreed smart contract rates.</span></div></label></div></div><div className="bg-surface-container-low rounded-xl p-3 border border-gray-200 flex flex-col gap-2"><div className="flex items-center justify-between"><span className="font-label-sm text-label-sm font-semibold text-on-surface-variant">Weight Adjustment &amp; Price Preview</span><span className="font-label-sm text-label-sm text-secondary font-semibold">Auto-Recalculating</span></div><div className="grid grid-cols-2 gap-3 pt-1"><div className="flex flex-col bg-white p-2.5 rounded-lg border border-gray-200"><span className="text-[11px] text-on-surface-variant font-medium">Estimated Weight</span><span className="font-headline-sm text-headline-sm font-bold text-on-surface">18.0 kg</span><span className="text-[11px] text-outline line-through mt-0.5">Original: $26.50</span></div><div className="flex flex-col bg-white p-2.5 rounded-lg border border-primary-container shadow-xs"><span className="text-[11px] text-primary font-semibold">Actual Scale Reading</span><div className="flex items-center gap-1 mt-0.5"><input className="w-16 font-headline-sm text-headline-sm font-bold text-on-surface border-b border-primary-container focus:outline-none bg-transparent" type="text" value="9.5" /><span className="font-label-sm text-label-sm text-on-surface-variant">kg</span></div><span className="text-[11px] font-bold text-emerald-800 mt-0.5">Adjusted: $14.00</span></div></div></div><div className="flex flex-col gap-1.5"><label className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">Photo Verification Proof</label><div className="flex items-center gap-3"><div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center shrink-0"><img alt="Weigh scale snapshot" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPX8BfW6R_X0w2c4mN-j1vG-67XjU9H1k6k7j5x9b3v7h6f5d4" /><div className="hidden flex-col items-center justify-center text-on-surface-variant p-1"><span className="material-symbols-outlined text-headline-sm text-primary">scale</span><span className="text-[10px] text-center font-medium">9.50 kg</span></div><div className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-[9px] text-white text-center py-0.5 font-semibold">9.50 kg</div></div><div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition-colors"><span className="material-symbols-outlined text-headline-sm text-on-surface-variant">add_a_photo</span><span className="font-label-sm text-label-sm text-primary font-semibold mt-0.5">Upload additional proof</span><span className="text-[11px] text-outline">JPEG or PNG (Max 5MB)</span></div></div></div><div className="flex flex-col gap-1.5"><label className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">Context for Arbitrator &amp; Collector</label><textarea className="w-full p-2.5 rounded-lg border border-gray-300 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary-container resize-none" placeholder="Provide context for escrow arbitrator and collector..." rows="2"></textarea></div></div><div className="p-4 border-t border-gray-100 bg-surface-bright flex flex-col gap-2.5"><div className="flex items-center justify-end gap-2.5"><button className="px-4 py-2 text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-semibold rounded-lg hover:bg-gray-100 transition-colors" type="button">Cancel</button><button className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-label-md text-label-md font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-colors" type="button"><span className="material-symbols-outlined text-headline-sm">lock_clock</span>Submit Dispute &amp; Hold Escrow</button></div><p className="font-body-sm text-[11px] text-on-surface-variant text-center flex items-center justify-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">lock</span>Escrow funds ($26.50) will remain locked until mutual agreement or mediator verification.</p></div></div></div><div aria-live="polite">{notice}</div></div></div>;
}
