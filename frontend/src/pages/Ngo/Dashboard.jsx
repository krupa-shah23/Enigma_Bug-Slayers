import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Dashboard(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-lg"><Link className="flex items-center gap-space-sm" to="/ngo/dashboard"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W6N7O6ZgE2Tll6drrzyraadVHbqUPUs8qfNIeNKws4onwuYsxxdedp7BeTkIs0Txon3umt_QP8qOaEmZSI73-IZdcgoiddIyqPPoI3BmnPY5RLnNxVE2-Jq3nOjW7HpKVgbvuMfi79kkCrl4z176MqkLjcsk8ddgs1xFVpTIMFCOv0Zsk5iD1GqxWAiT4V7UoagrTSXG5WqIrbzsQSPHTF-dKjat2b_25Db6lusmuKF9auSZJEzc90UlGt"/><span className="font-headline-sm text-headline-sm text-primary tracking-tight">ReWaste</span></Link></div><Navbar variant="Ngo" className="hidden lg:flex items-center gap-space-xs"><Link className="px-space-md py-space-sm transition-colors bg-primary-container text-on-primary-container font-semibold rounded-lg" to="/ngo/dashboard">Dashboard</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/societies">Societies</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/contracts">Contracts</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/collections">Collections</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/events">Events</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/verification">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button className="relative p-space-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container"></span></button><div className="flex items-center gap-space-sm pl-space-xs"><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/><span className="hidden sm:inline-flex items-center px-space-sm py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-secondary font-semibold">NGO Partner</span></div></div></div></header><main className="w-full pt-16 bg-surface flex-1"><div className="max-w-[1440px] mx-auto px-margin py-space-lg"><div className="flex flex-col w-full relative">

<div className="fixed top-20 right-6 z-50 flex flex-col gap-space-sm max-w-md w-full pointer-events-none">

<div className="pointer-events-auto flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-xl transition-all duration-500 ease-out transform translate-y-0 opacity-100" id="toast-s08">
<div className="p-2 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between gap-space-xs mb-0.5">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Live Event S08</span>
<span className="font-body-sm text-body-sm text-outline">Just now</span>
</div>
<p className="font-label-md text-label-md text-on-surface">SOCKET EVENT S08: Crestview Towers accepted Compost contract (1,200 kg/mo)</p>
</div>
<button className="text-on-surface-variant hover:text-on-surface p-1 shrink-0 transition-colors">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>

<div className="pointer-events-auto flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-xl transition-all duration-500 ease-out transform translate-y-2 opacity-95" id="toast-s09">
<div className="p-2 rounded-lg bg-error-container text-error flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between gap-space-xs mb-0.5">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-error font-semibold">Live Event S09</span>
<span className="font-body-sm text-body-sm text-outline">2m ago</span>
</div>
<p className="font-label-md text-label-md text-on-surface">SOCKET EVENT S09: Weigh-in flag logged on batch #WB-409</p>
</div>
<button className="text-on-surface-variant hover:text-on-surface p-1 shrink-0 transition-colors">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</div>

<header className="flex flex-col gap-space-xs mb-space-xl">
<div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wider">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
      Operations Console
    </div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">NGO Operations Dashboard</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">Active material sourcing pipelines, society compliance, and scheduled collections.</p>
</header>

<section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-xl">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between transition-all duration-200 hover:shadow-md">
<div className="flex items-center justify-between gap-space-sm mb-space-md">
<span className="font-label-lg text-label-lg text-on-surface-variant">Active Contracts</span>
<div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">description</span>
</div>
</div>
<div>
<div className="font-display-lg text-display-lg text-on-surface mb-1">12 Contracts</div>
<p className="font-body-sm text-body-sm text-outline">Across 8 residential societies</p>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between transition-all duration-200 hover:shadow-md">
<div className="flex items-center justify-between gap-space-sm mb-space-md">
<span className="font-label-lg text-label-lg text-on-surface-variant">Upcoming Month-End Pickups</span>
<div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">local_shipping</span>
</div>
</div>
<div>
<div className="font-display-lg text-display-lg text-on-surface mb-1">4 Scheduled</div>
<p className="font-body-sm text-body-sm text-outline">Estimated 4,850 kg recyclable volume</p>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between transition-all duration-200 hover:shadow-md">
<div className="flex items-center justify-between gap-space-sm mb-space-md">
<span className="font-label-lg text-label-lg text-on-surface-variant">Recent Flags</span>
<div className="w-10 h-10 rounded-lg bg-error-container/30 flex items-center justify-center text-error">
<span className="material-symbols-outlined text-[22px]">flag</span>
</div>
</div>
<div>
<div className="font-display-lg text-display-lg text-error mb-1">2 Flagged</div>
<p className="font-body-sm text-body-sm text-outline">Weight variance &gt;15% detected</p>
</div>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

<section className="lg:col-span-7 flex flex-col gap-space-md">
<div className="flex items-center justify-between px-space-xs">
<h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Pickups</h2>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">3 Active Queued</span>
</div>
<div className="flex flex-col gap-space-md">

<article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex flex-wrap items-start justify-between gap-space-sm">
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Crestview Towers</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Compost/Wet • 1,200 kg</p>
</div>
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-[#E8F5E9] text-[#2E7D32]">Confirmed</span>
</div>
<div className="flex flex-wrap items-center justify-between gap-y-space-sm gap-x-space-lg pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-outline">calendar_today</span>
<span>Date: Oct 31, 2025</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-outline">person</span>
<span>Bhangarwala: Ramesh Kumar</span>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex flex-wrap items-start justify-between gap-space-sm">
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Green Valley Heights</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Dry Recyclables • 850 kg</p>
</div>
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-high text-on-surface-variant">Dispatch Assigned</span>
</div>
<div className="flex flex-wrap items-center justify-between gap-y-space-sm gap-x-space-lg pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-outline">calendar_today</span>
<span>Date: Nov 02, 2025</span>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex flex-wrap items-start justify-between gap-space-sm">
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Palm Heights</h3>
<p className="font-body-md text-body-md text-on-surface-variant">E-Waste &amp; Scrap • 320 kg</p>
</div>
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-[#FFF8E1] text-[#835400]">Pending Confirmation</span>
</div>
<div className="flex flex-wrap items-center justify-between gap-y-space-sm gap-x-space-lg pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-outline">calendar_today</span>
<span>Date: Nov 05, 2025</span>
</div>
</div>
</article>
</div>
</section>

<section className="lg:col-span-5 flex flex-col gap-space-md">
<div className="flex items-center justify-between px-space-xs">
<h2 className="font-headline-md text-headline-md text-on-surface">Recent Flags</h2>
<span className="font-label-sm text-label-sm text-error bg-error-container/40 px-2.5 py-1 rounded-full font-semibold">Action Required</span>
</div>
<div className="flex flex-col gap-space-md">

<article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm">
<div className="flex items-start justify-between gap-space-sm">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Silver Oak Enclave</h3>
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-[#FFF8E1] text-[#835400]">Under Review</span>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
<div className="flex items-center gap-1.5 text-error font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px]">priority_high</span>
<span>Flagged: Actual 32 kg vs Promised 50 kg E-waste</span>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant pl-5 font-semibold text-error">-36% variance</p>
</div>
<div className="flex items-center gap-1.5 pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[18px] text-outline">event</span>
<span>Date: Oct 24, 2025</span>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm">
<div className="flex items-start justify-between gap-space-sm">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Lotus Residency</h3>
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-[#E8F5E9] text-[#2E7D32]">Resolved with Penalty</span>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
<div className="flex items-start gap-1.5 text-on-surface font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">report_problem</span>
<span>Flagged: Wet waste contamination in dry paper batch</span>
</div>
</div>
<div className="flex items-center gap-1.5 pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[18px] text-outline">event</span>
<span>Date: Oct 18, 2025</span>
</div>
</article>
</div>
</section>
</div>
</div></div></main><footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] py-space-lg mt-auto"><div className="max-w-[1440px] mx-auto px-margin flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><p className="font-label-sm text-label-sm text-outline">Operational Circular Network</p></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
