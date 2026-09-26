import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Requests(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest border-b border-outline-variant"><div className="h-16 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-sm shrink-0"><img alt="Clean minimalist geometric logo for ReWaste featuring a modern circular loop recycling leaf icon with bold typography 'ReWaste' in emerald forest green #2E7D32, vector style, flat design, white background. Design context: - Primary color: #2e7d32 - Font: epilogue - Mode: light - Roundness: rounded-md . The logo should be visually consistent with these brand tokens." className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W6N7O6ZgE2Tll6drrzyraadVHbqUPUs8qfNIeNKws4onwuYsxxdedp7BeTkIs0Txon3umt_QP8qOaEmZSI73-IZdcgoiddIyqPPoI3BmnPY5RLnNxVE2-Jq3nOjW7HpKVgbvuMfi79kkCrl4z176MqkLjcsk8ddgs1xFVpTIMFCOv0Zsk5iD1GqxWAiT4V7UoagrTSXG5WqIrbzsQSPHTF-dKjat2b_25Db6lusmuKF9auSZJEzc90UlGt"/><span className="font-headline-sm text-headline-sm text-primary tracking-tight">ReWaste</span></div><Navbar variant="Bhangarwala" className="hidden md:flex items-center gap-space-sm"><Link className="px-space-md py-space-xs rounded-lg transition-colors bg-primary-container text-on-primary font-label-lg" to="/bhangarwala/requests">Requests</Link><Link className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" to="/bhangarwala/active-job">Active Job<span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container">LIVE</span></Link><Link className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" to="/bhangarwala/history">History</Link><Link className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" to="/bhangarwala/profile">Profile</Link></Navbar><div className="flex items-center gap-space-md shrink-0"><button aria-label="Notifications" className="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary-container"></span></button><span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant font-semibold">Bhangarwala</span><img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/></div></div></header><main className="w-full pt-16 flex-1 bg-surface"><div className="flex flex-col w-full">

<div className="fixed top-20 right-6 z-50 flex flex-col gap-space-xs max-w-sm w-full pointer-events-none">
<div className="pointer-events-auto bg-surface-container-lowest text-on-surface shadow-xl rounded-xl p-space-md flex items-start gap-space-sm transform transition-all duration-300 translate-y-0 opacity-100" id="live-toast-s01">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">cell_tower</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between gap-space-xs mb-0.5">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Live Broadcast</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Just now</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface font-semibold leading-snug">New P2P scrap request broadcasted: E-Waste Lot #EX-4092 nearby</p>
</div>
<button aria-label="Dismiss notification" className="text-on-surface-variant hover:text-on-surface p-1 rounded transition-colors">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</div>

<div className="max-w-7xl mx-auto w-full px-gutter py-space-lg">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

<div className="lg:col-span-6 flex flex-col">
<div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col h-[740px] relative">

<div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-space-xs pointer-events-none">

<div className="pointer-events-auto bg-surface-container-lowest/95 backdrop-blur shadow-md px-3.5 py-2 rounded-xl flex items-center gap-space-sm">
<span className="relative flex h-3 w-3">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase text-outline leading-none">Status</span>
<span className="font-label-lg text-label-lg text-on-surface font-semibold leading-tight">ONLINE</span>
</div>
<button aria-label="Toggle Online Status" className="ml-2 w-9 h-5 bg-primary-container rounded-full relative transition-colors focus:outline-none flex items-center p-0.5" type="button">
<span className="w-4 h-4 bg-on-primary rounded-full shadow-sm transform translate-x-4 transition-transform"></span>
</button>
</div>

<div className="pointer-events-auto bg-surface-container-lowest/95 backdrop-blur shadow-md px-3.5 py-2 rounded-xl flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[18px]">share_location</span>
<span className="font-label-sm text-label-sm text-on-surface font-medium">Coverage: Sector 54 &amp; Golf Course Rd</span>
</div>
</div>

<div className="relative w-full flex-1 bg-surface-container overflow-hidden select-none" id="vector-map-canvas">

<svg className="absolute inset-0 w-full h-full text-surface-container-highest" preserveAspectRatio="xMidYMid slice" viewBox="0 0 600 700">
<defs>
<pattern height="40" id="grid-pattern" patternunits="userSpaceOnUse" width="40">
<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-opacity="0.4" strokeWidth="0.8"></path>
</pattern>
</defs>
<rect fill="url(#grid-pattern)" height="100%" width="100%"></rect>

<path d="M-50,220 C180,240 220,180 440,320 C540,380 620,410 700,430" fill="none" stroke="#d8dad9" strokeLinecap="round" strokeWidth="24"></path>
<path d="M-50,220 C180,240 220,180 440,320 C540,380 620,410 700,430" fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="18"></path>

<path d="M120,-30 L380,720" fill="none" stroke="#d8dad9" strokeWidth="16"></path>
<path d="M120,-30 L380,720" fill="none" stroke="#ffffff" strokeWidth="12"></path>

<path d="M60,520 L580,480" fill="none" stroke="#e1e3e2" strokeWidth="10"></path>
<path d="M60,520 L580,480" fill="none" stroke="#ffffff" strokeWidth="6"></path>

<circle cx="310" cy="360" fill="#2e7d32" fillOpacity="0.04" r="230" stroke="#2e7d32" stroke-dasharray="6 4" strokeWidth="1.5"></circle>
</svg>


<div className="absolute left-[48%] top-[54%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20">
<span className="relative flex h-8 w-8 items-center justify-center">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed-dim opacity-40"></span>
<span className="relative inline-flex rounded-full h-7 w-7 bg-primary text-on-primary items-center justify-center shadow-lg ring-4 ring-surface-container-lowest">
<span className="material-symbols-outlined text-[16px]">local_shipping</span>
</span>
</span>
<span className="mt-1 px-2 py-0.5 bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold rounded shadow-md whitespace-nowrap">You (Bhangarwala Hub)</span>
</div>

<div className="absolute left-[34%] top-[36%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10 transition-transform hover:scale-110">
<div className="relative flex items-center justify-center">
<span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-primary-container opacity-60"></span>
<div className="w-9 h-9 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center ring-2 ring-surface-container-lowest">
<span className="material-symbols-outlined text-[18px]">devices</span>
</div>
</div>
<div className="mt-1.5 px-2.5 py-1 bg-surface-container-lowest/95 rounded-lg shadow-md flex items-center gap-1.5 whitespace-nowrap">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span className="font-label-sm text-label-sm font-semibold text-on-surface">Lot #EX-4092 (18 kg)</span>
</div>
</div>

<div className="absolute left-[68%] top-[28%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10 transition-transform hover:scale-110">
<div className="relative flex items-center justify-center">
<span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-primary-container opacity-40"></span>
<div className="w-8 h-8 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center ring-2 ring-surface-container-lowest">
<span className="material-symbols-outlined text-[17px]">plumbing</span>
</div>
</div>
<div className="mt-1.5 px-2 py-0.5 bg-surface-container-lowest/95 rounded-lg shadow-md flex items-center gap-1 whitespace-nowrap">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
<span className="font-label-sm text-label-sm font-semibold text-on-surface">Lot #EX-4098 (12 kg)</span>
</div>
</div>

<div className="absolute left-[38%] top-[68%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10 transition-transform hover:scale-110">
<div className="relative flex items-center justify-center">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container shadow-lg flex items-center justify-center ring-2 ring-surface-container-lowest">
<span className="material-symbols-outlined text-[17px]">inventory_2</span>
</div>
</div>
<div className="mt-1 px-2 py-0.5 bg-surface-container-lowest/95 rounded-lg shadow-md flex items-center gap-1 whitespace-nowrap">
<span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
<span className="font-label-sm text-label-sm font-semibold text-on-secondary-container">Lot #EX-4085 ($24.00 Bid)</span>
</div>
</div>
</div>

<div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-space-sm pointer-events-none">

<div className="pointer-events-auto bg-surface-container-lowest/95 backdrop-blur px-3 py-2 rounded-xl shadow-md flex items-center gap-space-md">
<div className="flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
<span className="font-label-sm text-label-sm text-on-surface">Available Requests</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
<span className="font-label-sm text-label-sm text-on-surface">Active Bid</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-primary-fixed-dim"></span>
<span className="font-label-sm text-label-sm text-on-surface">My Hub</span>
</div>
</div>

<div className="pointer-events-auto bg-surface-container-lowest/95 backdrop-blur rounded-xl shadow-md flex flex-col overflow-hidden">
<button aria-label="Zoom in" className="w-9 h-9 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]">add</span>
</button>
<div className="h-px bg-surface-container-high w-full"></div>
<button aria-label="Zoom out" className="w-9 h-9 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]">remove</span>
</button>
</div>
</div>
</div>
</div>

<div className="lg:col-span-6 flex flex-col gap-space-md">

<div className="flex items-start justify-between gap-space-sm pb-1">
<div>
<div className="flex items-center gap-space-sm">
<h1 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">Nearby Scrap Requests</h1>
<span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed font-semibold">3 Active in your zone</span>
</div>
<div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-body-sm text-body-sm">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
<span>Live dispatch stream • Auto-refreshing every 15s</span>
</div>
</div>
<button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors" title="Refresh nearby requests" type="button">
<span className="material-symbols-outlined text-[20px]">sync</span>
</button>
</div>

<div className="flex flex-col gap-space-md">

<div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-md transition-shadow hover:shadow-lg">
<div className="flex items-start gap-space-md">

<div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-surface-container relative">
<img alt="Household E-Waste Lot #EX-4092" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1V4cTZYndSSIAnpt0d745wZD0potDWpVbsHt_xvk9GKXCn2TnpuRTuMoiD4Blz_HESz0Zow0P0OAU0jjtUBeyQVK_tWiRzDZiNjkr_lks--HXjnt2ooynLntvPQnwVndYaX0EO4BmWipEGP32cCNU4ZHau2srGkU54CcFnIhllLQHqc6voeZSkMHqQnYpH_QSAMbEZeEAUgAf7kZgjSthWyV1zooKdyiDpB5Ro5mNwbY2kIOaSgYTYgxEKV"/>
<span className="absolute bottom-1 right-1 bg-surface-container-lowest/90 px-1 py-0.5 rounded font-label-sm text-[10px] font-semibold text-on-surface">5 items</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex flex-wrap items-center justify-between gap-space-xs mb-1">
<span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant font-semibold">E-waste</span>
<span className="font-body-sm text-body-sm text-secondary font-semibold">12 mins left</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface truncate">Lot #EX-4092: Household E-Waste &amp; Small Appliances</h2>
<div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">near_me</span>
                    0.9 km away • Plot 14, Riverside Ave
                  </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">scale</span>
                    18 kg estimated
                  </span>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
<span>CRT Monitor, Toaster, Blender, Wire Cables</span>
<span className="text-primary font-semibold text-label-sm">High Value Grade</span>
</div>

<form className="flex items-center gap-space-sm pt-1">
<div className="relative flex-1">
<span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-label-lg text-label-lg text-outline">$</span>
<input aria-label="Quote Price for Lot EX-4092" className="w-full bg-surface-container-low text-on-surface font-label-lg text-label-lg rounded-lg pl-8 pr-3 py-2.5 outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary font-semibold transition-all" type="text" value="26.50"/>
</div>
<button className="bg-primary text-on-primary hover:bg-surface-tint active:bg-primary-container px-space-lg py-2.5 rounded-lg font-label-lg text-label-lg flex items-center gap-2 shadow-sm shrink-0 transition-colors" type="submit">
<span>Submit Quote</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</form>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-md transition-shadow hover:shadow-lg">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[26px]">plumbing</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex flex-wrap items-center justify-between gap-space-xs mb-1">
<span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant font-semibold">Metals &amp; Brass</span>
<span className="font-body-sm text-body-sm text-outline">Expires in 28m</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface truncate">Lot #EX-4098: Decommissioned Copper Pipes &amp; Brass Fittings</h2>
<div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">near_me</span>
                    1.4 km away • Sector 54
                  </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">scale</span>
                    12 kg
                  </span>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
<span>Cleaned plumber scrap, unmixed alloys</span>
<span className="text-secondary font-semibold text-label-sm">Premium Scrap</span>
</div>

<form className="flex items-center gap-space-sm pt-1">
<div className="relative flex-1">
<span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-label-lg text-label-lg text-outline">$</span>
<input aria-label="Quote Price for Lot EX-4098" className="w-full bg-surface-container-low text-on-surface font-label-lg text-label-lg rounded-lg pl-8 pr-3 py-2.5 outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary font-semibold transition-all" type="text" value="19.00"/>
</div>
<button className="bg-primary text-on-primary hover:bg-surface-tint active:bg-primary-container px-space-lg py-2.5 rounded-lg font-label-lg text-label-lg flex items-center gap-2 shadow-sm shrink-0 transition-colors" type="submit">
<span>Submit Quote</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</form>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-sm opacity-95">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[26px]">inventory_2</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex flex-wrap items-center justify-between gap-space-xs mb-1">
<span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant font-semibold">Paper &amp; Cardboard</span>
<span className="font-label-sm text-label-sm text-outline">Bidded 8m ago</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface truncate">Lot #EX-4085: Heavy Corrugated Cardboard Boxes</h2>
<div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">near_me</span>
                    0.4 km away
                  </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-outline">scale</span>
                    35 kg
                  </span>
</div>
</div>
</div>

<div className="mt-2 bg-surface-container-low rounded-lg p-3 flex items-center justify-between">
<div className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold">Quote Submitted ($24.00) — Awaiting Resident Selection</span>
</div>
<span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-semibold">Pending Review</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div></main><footer className="w-full bg-surface-container-low border-t border-outline-variant py-space-lg"><div className="max-w-7xl mx-auto px-gutter text-center font-body-sm text-body-sm text-on-surface-variant">© 2025 ReWaste Materials Ledger. All rights reserved. | Operational Circular Network</div></footer><div aria-live="polite">{notice}</div></div></div>;
}
