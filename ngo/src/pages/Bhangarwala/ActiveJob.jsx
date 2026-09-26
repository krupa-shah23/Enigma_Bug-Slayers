import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function ActiveJob(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between"><div className="min-h-screen" onSubmit={handleSubmit}><Navbar variant="Bhangarwala" /><main className="w-full pt-16 flex-1 bg-surface"><div className="flex flex-col w-full">
<div className="max-w-7xl mx-auto w-full px-gutter py-space-lg flex flex-col gap-space-lg">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div className="flex flex-wrap items-center gap-space-sm">
<h1 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
            Active Job #JOB-8842 <span className="text-on-surface-variant font-normal">— Household E-Waste Pickup</span>
</h1>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm bg-secondary-fixed text-on-secondary-fixed-variant uppercase tracking-wider font-semibold">
<span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
            En Route to Gate
          </span>
</div>
<div className="shrink-0">
<button className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-2.5 bg-primary text-on-primary rounded-lg font-label-lg text-label-lg shadow-sm hover:bg-tertiary transition-all duration-200" id="stepActionBtn" type="button">
<span className="material-symbols-outlined text-[20px]">where_to_vote</span>
<span id="actionBtnText" className="">Confirm Arrival at Resident Gate</span>
</button>
</div>
</div>

<div className="relative pt-space-xs pb-space-xs">
<div className="grid grid-cols-4 gap-2 relative">

<div className="absolute top-1/2 left-[12%] right-[12%] -translate-y-1/2 h-0.5 bg-surface-container-highest -z-0">
<div className="h-full bg-primary transition-all duration-500 w-[33%]" id="stepperProgressBar"></div>
</div>

<div className="relative z-10 flex flex-col items-center group cursor-pointer">
<div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[18px]">check</span>
</div>
<span className="mt-2 font-label-md text-label-md text-primary font-semibold text-center">Heading</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">09:15 AM</span>
</div>

<div className="relative z-10 flex flex-col items-center group cursor-pointer">
<div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md ring-4 ring-primary-fixed">
<span className="material-symbols-outlined text-[18px] animate-pulse">pin_drop</span>
</div>
<span className="mt-2 font-label-md text-label-md text-primary font-bold text-center">Arrived</span>
<span className="font-label-sm text-label-sm text-primary font-medium">In Progress</span>
</div>

<div className="relative z-10 flex flex-col items-center group cursor-pointer">
<div className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">inventory_2</span>
</div>
<span className="mt-2 font-label-md text-label-md text-on-surface-variant text-center">Picked up</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Pending</span>
</div>

<div className="relative z-10 flex flex-col items-center group cursor-pointer">
<div className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">flag</span>
</div>
<span className="mt-2 font-label-md text-label-md text-on-surface-variant text-center">Completed</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Pending</span>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

<div className="lg:col-span-8 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">

<div className="relative w-full h-[540px] bg-surface-container-low overflow-hidden">

<div className="absolute inset-0 w-full h-full bg-cover bg-center"></div>

<svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="routeGradient" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#0d631b" stopOpacity="0.8"></stop>
<stop offset="100%" stopColor="#2e7d32" stopOpacity="1"></stop>
</linearGradient>
</defs>

<path className="text-primary" d="M 120 440 Q 260 380, 390 280 T 680 140" fill="none" stroke="currentColor" stroke-dasharray="8 6" strokeWidth="4"></path>
</svg>

<div className="absolute left-[380px] top-[270px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined text-[20px]">local_shipping</span>
</div>
<div className="mt-1 px-2 py-0.5 bg-surface-container-lowest/90 backdrop-blur rounded text-label-sm font-label-sm text-primary font-bold shadow-sm">
              Your Van
            </div>
</div>

<div className="absolute left-[680px] top-[140px] -translate-x-1/2 -translate-y-full flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-lg animate-bounce">
<span className="material-symbols-outlined text-[22px]" style={{fontVariationSettings: "'FILL' 1"}}>location_on</span>
</div>
<div className="px-2 py-0.5 bg-inverse-surface text-inverse-on-surface rounded text-label-sm font-label-sm font-semibold shadow-md whitespace-nowrap">
              Plot 14 Gate
            </div>
</div>

<div className="absolute top-space-md left-space-md flex flex-wrap items-center gap-space-sm">
<div className="bg-surface-container-lowest/95 backdrop-blur px-space-md py-space-xs rounded-lg shadow-sm flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[20px]">near_me</span>
<div>
<p className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">ETA: 6 mins</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">0.5 km remaining</p>
</div>
</div>
<div className="bg-surface-container-lowest/95 backdrop-blur px-space-md py-space-xs rounded-lg shadow-sm flex items-center gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Speed: 24 km/h</span>
</div>
</div>

<div className="absolute bottom-space-md right-space-md flex flex-col gap-1">
<button aria-label="Zoom in" className="w-10 h-10 bg-surface-container-lowest/95 backdrop-blur hover:bg-surface-container-low text-on-surface rounded-lg shadow-sm flex items-center justify-center transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]">add</span>
</button>
<button aria-label="Zoom out" className="w-10 h-10 bg-surface-container-lowest/95 backdrop-blur hover:bg-surface-container-low text-on-surface rounded-lg shadow-sm flex items-center justify-center transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]">remove</span>
</button>
<button aria-label="Center location" className="w-10 h-10 bg-surface-container-lowest/95 backdrop-blur hover:bg-surface-container-low text-on-surface rounded-lg shadow-sm flex items-center justify-center transition-colors mt-1" type="button">
<span className="material-symbols-outlined text-[20px]">my_location</span>
</button>
</div>
</div>

<div className="px-space-lg py-space-md bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-outline text-[20px]">turn_slight_right</span>
<p className="font-body-md text-body-md text-on-surface">Next turn: In 180m, turn slight right into Sector 5 Inner Ring Road.</p>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded">Optimal Route Active</span>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-space-md">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Resident Contact</span>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-semibold">
<span className="material-symbols-outlined text-[16px]">verified</span> Verified Resident
            </span>
</div>
<div className="flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<img className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-primary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPQPJ40AHXY7xle4G7F2B9bbb3NYzM0oD8lp0HT907rLhk44xp3LteZ6zV6O0aZuiqSfqeR6DfJlApZvDzi21t9AYbxptuTqY5i8hYao57MPPXHNC3mP8uueOUaKBt9jpmkk0V1n-nq07tbiwfjFhNBOmbtnxo3CfNKt76pynNmT2vowjqbE3hJQU2bA4fZcgFOAWUh9gYIDpduSXOZETXij-P6tDxFum-NoLcUr83hALc2Br1T0YShA" />
<div className="min-w-0">
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Ananya Sharma</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">+91 98765 43210</p>
</div>
</div>
<Link className="shrink-0 inline-flex items-center justify-center w-11 h-11 bg-primary text-on-primary rounded-full shadow-sm hover:bg-tertiary transition-colors" to="tel:+919876543210" title="Call Resident">
<span className="material-symbols-outlined text-[20px]">phone</span>
</Link>
</div>
<div className="bg-surface-container-low rounded-lg p-space-md flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">location_on</span>
<div className="min-w-0">
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Destination Address</p>
<p className="font-body-md text-body-md text-on-surface font-medium mt-0.5">Plot 14, Riverside Avenue, Sector 5, Block C Gate</p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Security Gate instructions: Entry via RFID or scan driver OTP at barrier.</p>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Lot Manifest</span>
<span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed-variant font-semibold">Lot #EX-4092</span>
</div>

<div className="flex gap-space-md items-start">
<img className="w-24 h-24 rounded-lg object-cover shadow-sm shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZGB6TIE3Px0qLDrTNlQeUvdc1Thqd4LOhmz7ul1QUWuF6b5dZQxfLF-tsY6WzdvqdiqhZNppPa3GNVD-MlcfUolZ6rRvmRzkuVjNajMXEoR5fiXCDSWxw64eXlmPK3PtDiyTX8qWrU59S1dhu33HZUZ4-A3q-QB3xLrvlnVfHkEf3hYrCIwqc6VCrOPLEzSKcwbryMjLmkfHBuaoaTcfL7Cyt1m6ngsI7fuRAxwKSLcYeyrPKLHoeQA" />
<div className="flex flex-col min-w-0">
<h3 className="font-label-lg text-label-lg text-on-surface font-semibold leading-tight">Household E-Waste</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">Old CRT monitor, vintage radio, blender, assorted power adapters &amp; copper cables.</p>
<div className="mt-2 inline-flex items-center gap-1 text-label-sm font-label-sm text-primary font-semibold">
<span className="material-symbols-outlined text-[16px]">scale</span>
                18 kg estimated
              </div>
</div>
</div>

<div className="bg-surface-container rounded-lg p-space-md flex flex-col gap-space-xs">
<div className="flex items-baseline justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">Agreed Price</span>
<span className="font-headline-md text-headline-md text-primary font-bold">$26.50</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
              Direct Digital Payout on Handover (Escrow Secured)
            </p>
</div>

<div className="bg-secondary-fixed/30 rounded-lg p-space-md flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0">info</span>
<p className="font-body-sm text-body-sm text-on-secondary-fixed-variant leading-snug">
<strong className="font-semibold">Verification Instruction:</strong> Weigh on portable digital scale upon arrival and confirm handover.
            </p>
</div>
<button id="openDisputeModalBtn" className="w-full mt-1 py-2 px-3 text-label-sm font-label-sm font-semibold text-error bg-error-container/40 hover:bg-error-container/70 border border-error/20 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer" type="button"><span className="material-symbols-outlined text-[18px] text-error">warning</span> Flag Material Mismatch / Renegotiate</button></div>
</div>
</div>
</div>
</div>
<div id="disputeModal" className="fixed inset-0 bg-inverse-surface/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"><div className="bg-surface-container-lowest rounded-xl shadow-lg max-w-lg w-full overflow-hidden border border-outline-variant flex flex-col my-auto"><div className="px-space-lg py-space-md border-b border-outline-variant flex items-start justify-between gap-space-md bg-surface-container-low"><div className="flex items-start gap-space-sm"><div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0 mt-0.5"><span className="material-symbols-outlined text-secondary text-[22px]">gavel</span></div><div><h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Field Material Mismatch &amp; Renegotiation</h3><p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Active Job #JOB-8842 • Resident: Ananya Sharma</p></div></div><button className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg transition-colors" type="button" aria-label="Close modal"><span className="material-symbols-outlined text-[20px]">close</span></button></div><div className="p-space-lg flex flex-col gap-space-md max-h-[75vh] overflow-y-auto"><div><label className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant block mb-1.5">1. Select Mismatch Reason</label><div className="flex flex-col gap-2"><label className="flex items-center gap-space-sm p-space-sm rounded-lg border border-primary bg-primary-fixed/20 cursor-pointer"><input type="radio" name="mismatch_reason" defaultChecked className="accent-primary w-4 h-4" /><span className="font-body-sm text-body-sm font-medium text-on-surface">Actual weight lower than resident declaration (Weigh-scale check)</span></label><label className="flex items-center gap-space-sm p-space-sm rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer"><input type="radio" name="mismatch_reason" className="accent-primary w-4 h-4" /><span className="font-body-sm text-body-sm text-on-surface">Lot contaminated with unusable scrap/waste</span></label><label className="flex items-center gap-space-sm p-space-sm rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer"><input type="radio" name="mismatch_reason" className="accent-primary w-4 h-4" /><span className="font-body-sm text-body-sm text-on-surface">Resident absent or item missing items</span></label></div></div><div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm border border-outline-variant/60"><div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/50"><span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">Weight Adjustment &amp; Counter-Offer</span><span className="font-label-sm text-label-sm text-primary font-semibold">Rate: $1.47 / kg</span></div><div className="grid grid-cols-2 gap-space-sm"><div className="bg-surface-container-lowest p-space-sm rounded border border-outline-variant"><p className="font-label-sm text-label-sm text-on-surface-variant">Declared Weight</p><p className="font-headline-sm text-headline-sm text-on-surface font-semibold">18.0 kg</p><p className="font-label-sm text-label-sm text-on-surface-variant">Quoted: $26.50</p></div><div className="bg-surface-container-lowest p-space-sm rounded border-2 border-primary"><label className="font-label-sm text-label-sm font-semibold text-primary block">Field Scale Net Weight</label><div className="flex items-center gap-1.5 mt-0.5"><input type="number" value="9.5" step="0.1" className="w-20 px-2 py-1 border border-outline-variant rounded font-headline-sm text-headline-sm font-bold text-on-surface text-center focus:outline-none focus:ring-1 focus:ring-primary" /><span className="font-body-md text-body-md text-on-surface font-semibold">kg</span></div><span className="font-label-sm text-label-sm text-error font-medium">-8.5 kg difference</span></div></div><div className="bg-primary-fixed/30 rounded p-space-sm flex items-center justify-between mt-1"><span className="font-label-md text-label-md text-on-surface font-semibold">Proposed Counter Payout:</span><div className="text-right"><span className="font-headline-md text-headline-md text-primary font-bold">$14.00</span><span className="font-label-sm text-label-sm text-on-surface-variant block">Recalculated (9.5 kg × $1.47)</span></div></div></div><div className="bg-surface-container rounded-lg p-space-sm flex items-center gap-space-sm"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZGB6TIE3Px0qLDrTNlQeUvdc1Thqd4LOhmz7ul1QUWuF6b5dZQxfLF-tsY6WzdvqdiqhZNppPa3GNVD-MlcfUolZ6rRvmRzkuVjNajMXEoR5fiXCDSWxw64eXlmPK3PtDiyTX8qWrU59S1dhu33HZUZ4-A3q-QB3xLrvlnVfHkEf3hYrCIwqc6VCrOPLEzSKcwbryMjLmkfHBuaoaTcfL7Cyt1m6ngsI7fuRAxwKSLcYeyrPKLHoeQA" className="w-14 h-14 rounded object-cover border border-outline-variant shrink-0" alt="Scale verification photo" /><div className="min-w-0 flex-1"><div className="flex items-center gap-1 text-label-sm font-label-sm text-primary font-semibold"><span className="material-symbols-outlined text-[16px]">photo_camera</span> Scale Evidence Captured</div><p className="font-body-sm text-body-sm text-on-surface-variant truncate">scale_reading_0922am_job8842.jpg</p><span className="font-label-sm text-label-sm text-on-surface-variant">Verified timestamp: Today, 09:22 AM</span></div><button type="button" className="px-2 py-1 text-label-sm font-label-sm text-primary font-semibold bg-surface-container-lowest rounded border border-outline-variant hover:bg-surface-container-low transition-colors">Retake</button></div><div><label className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant block mb-1.5">2. Resolution Action</label><div className="flex flex-col gap-2"><label className="flex items-start gap-space-sm p-space-sm rounded-lg border-2 border-primary bg-primary-fixed/20 cursor-pointer"><input type="radio" name="resolution_action" defaultChecked className="accent-primary w-4 h-4 mt-0.5" /><div className="min-w-0"><p className="font-body-sm text-body-sm font-semibold text-on-surface">Request Resident Approval for Adjusted Payout ($14.00)</p><p className="font-label-sm text-label-sm text-primary font-medium">(Recommended • Immediate Escrow Sync)</p></div></label><label className="flex items-start gap-space-sm p-space-sm rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer"><input type="radio" name="resolution_action" className="accent-primary w-4 h-4 mt-0.5" /><div className="min-w-0"><p className="font-body-sm text-body-sm text-on-surface">Cancel Pickup &amp; Release Lot back to Exchange</p><p className="font-label-sm text-label-sm text-on-surface-variant">No cancellation fee penalty for verified mismatch.</p></div></label></div></div></div><div className="p-space-lg bg-surface-container-low border-t border-outline-variant flex flex-col gap-space-sm"><div className="flex items-center gap-space-xs text-label-sm font-label-sm text-secondary font-medium"><span className="material-symbols-outlined text-[16px] text-secondary">bolt</span> Resident will receive an instant push notification on P10 to accept or decline the revised weigh-in.</div><div className="flex items-center justify-end gap-space-sm"><button className="px-space-md py-2 border border-outline-variant rounded-lg font-label-lg text-label-lg text-on-surface hover:bg-surface-container transition-colors" type="button">Dismiss</button><button className="inline-flex items-center gap-1.5 px-space-lg py-2 bg-primary text-on-primary rounded-lg font-label-lg text-label-lg font-semibold shadow-sm hover:bg-tertiary transition-all duration-200" type="button"><span className="material-symbols-outlined text-[18px]">send</span> Send Adjusted Proposal to Resident ($14.00)</button></div></div></div></div></main><footer className="w-full bg-surface-container-low border-t border-outline-variant py-space-lg"><div className="max-w-7xl mx-auto px-gutter text-center font-body-sm text-body-sm text-on-surface-variant">© 2025 ReWaste Materials Ledger. All rights reserved. | Operational Circular Network</div></footer>

<div aria-live="polite">{notice}</div></div></div>;
}
