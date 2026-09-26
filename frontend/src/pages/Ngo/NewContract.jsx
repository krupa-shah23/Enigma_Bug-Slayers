import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function NewContract(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-lg"><Link className="flex items-center gap-space-sm" to="/ngo/dashboard"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W6N7O6ZgE2Tll6drrzyraadVHbqUPUs8qfNIeNKws4onwuYsxxdedp7BeTkIs0Txon3umt_QP8qOaEmZSI73-IZdcgoiddIyqPPoI3BmnPY5RLnNxVE2-Jq3nOjW7HpKVgbvuMfi79kkCrl4z176MqkLjcsk8ddgs1xFVpTIMFCOv0Zsk5iD1GqxWAiT4V7UoagrTSXG5WqIrbzsQSPHTF-dKjat2b_25Db6lusmuKF9auSZJEzc90UlGt"/><span className="font-headline-sm text-headline-sm text-primary tracking-tight">ReWaste</span></Link></div><Navbar variant="Ngo" className="hidden lg:flex items-center gap-space-xs"><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/dashboard">Dashboard</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/societies">Societies</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/contracts">Contracts</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/collections">Collections</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/events">Events</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/verification">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button className="relative p-space-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container"></span></button><div className="flex items-center gap-space-sm pl-space-xs"><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/><span className="hidden sm:inline-flex items-center px-space-sm py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-secondary font-semibold">NGO Partner</span></div></div></div></header><main className="w-full pt-16 bg-surface flex-1"><div className="flex flex-col w-full">
<div className="max-w-[1440px] w-full mx-auto px-margin py-space-xl">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg">
<div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
<Link className="hover:text-primary transition-colors flex items-center gap-1" to="/ngo/contracts">
<span className="material-symbols-outlined text-[16px]">description</span>
<span>Contracts</span>
</Link>
<span className="text-outline-variant">/</span>
<span className="text-on-surface font-semibold">New Contract Proposal</span>
</div>
<Link className="inline-flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors w-fit" to="/ngo/contracts">
<span className="material-symbols-outlined text-[18px]">arrow_back</span>
<span>Back to Contracts</span>
</Link>
</div>

<div className="mb-space-xl">
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Offer Material Contract</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-1 max-w-3xl">
        Establish recurring municipal waste procurement and off-take agreement with residential societies.
      </p>
</div>

<div className="max-w-2xl mx-auto w-full">
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-md flex flex-col gap-space-lg">
<form className="flex flex-col gap-space-lg" id="contract-form">

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between" htmlFor="society-select">
<span>Residential Society</span>
<span className="font-label-sm text-label-sm text-primary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">verified</span> Verified Partners
              </span>
</label>
<div className="relative">
<select className="w-full appearance-none bg-surface-container-low rounded-lg px-space-md py-3 pr-10 font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all" id="society-select">
<option value="crestview">Crestview Towers - Sector 54, Gurugram (Trust Score: 96)</option>
<option value="greenvalley">Green Valley Heights - Phase 2, DLF (Trust Score: 92)</option>
<option value="silveroak">Silver Oak Enclave - Nirvana Country (Trust Score: 88)</option>
</select>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-space-md text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">expand_more</span>
</div>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="material-select">Material Type</label>
<div className="relative">
<select className="w-full appearance-none bg-surface-container-low rounded-lg px-space-md py-3 pr-10 font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all" id="material-select">
<option value="organic">Compost / Organic Wet Waste</option>
<option defaultSelected value="dry">Dry Recyclables (Paper, Cardboard, Plastics)</option>
<option value="ewaste">E-Waste &amp; Electronics</option>
<option value="hazardous">Hazardous Scrap</option>
</select>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-space-md text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">expand_more</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="quantity-input">Quantity</label>
<div className="relative flex items-center">
<input className="w-full bg-surface-container-low rounded-lg px-space-md py-3 pr-24 font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all" id="quantity-input" min="1" placeholder="1,200" step="50" type="number" value="1200"/>
<span className="absolute right-3 font-label-md text-label-md text-on-surface-variant pointer-events-none bg-surface-container-high px-2 py-0.5 rounded">
                  kg / month
                </span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="rate-input">Rate per kg</label>
<div className="relative flex items-center">
<span className="absolute left-3 font-body-md text-body-md text-on-surface-variant pointer-events-none">$</span>
<input className="w-full bg-surface-container-low rounded-lg pl-8 pr-20 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all" id="rate-input" min="0.01" placeholder="0.15" step="0.01" type="number" value="0.15"/>
<span className="absolute right-3 font-label-md text-label-md text-on-surface-variant pointer-events-none bg-surface-container-high px-2 py-0.5 rounded">
                  per kg
                </span>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col gap-space-xs">
<div className="flex items-center justify-between flex-wrap gap-space-xs">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
<span className="font-label-md text-label-md text-on-surface-variant">Estimated Monthly Payout</span>
</div>
<div className="font-headline-lg text-headline-lg text-primary tracking-tight" id="payout-display">
                $180.00 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/ month</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Disbursed directly to society custodial escrow upon verified monthly weigh-in.
            </p>
</div>

<button className="w-full bg-primary-container hover:bg-tertiary-container active:bg-primary text-on-primary font-label-lg text-label-lg py-3 px-space-xl rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm" type="submit">
<span>Submit Contract Offer</span>
<span className="material-symbols-outlined text-[18px]">send</span>
</button>
</form>
</div>
</div>
</div>
</div>
</main><footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] py-space-lg mt-auto"><div className="max-w-[1440px] mx-auto px-margin flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><p className="font-label-sm text-label-sm text-outline">Operational Circular Network</p></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
