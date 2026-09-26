import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-center items-center"><div className="min-h-screen" onSubmit={handleSubmit}><main className="w-full flex-1 flex items-center justify-center"><div className="flex flex-col w-full py-8 px-4 sm:px-6">
<div className="max-w-4xl w-full mx-auto my-6 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row bg-surface-container-lowest">

<div className="md:w-2/5 bg-gradient-to-br from-[#1b5e20] to-[#2e7d32] p-8 text-on-primary flex flex-col justify-between relative overflow-hidden">

<div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/5 pointer-events-none"></div>
<div className="absolute -left-20 top-1/2 w-64 h-64 rounded-full bg-white/5 pointer-events-none"></div>
<div className="absolute right-4 bottom-24 w-32 h-32 rounded-full bg-white/5 pointer-events-none"></div>

<div className="relative z-10">
<div className="flex items-center gap-2 mb-6">
<span className="material-symbols-outlined text-primary-fixed text-headline-xl">cyclone</span>
<span className="font-headline-lg text-headline-lg tracking-tight text-surface-container-lowest">ReWaste</span>
</div>
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-on-primary backdrop-blur-sm mb-6">
<span className="material-symbols-outlined text-label-sm text-primary-fixed">verified</span>
<span className="font-label-sm text-label-sm tracking-wider uppercase">Decentralized Recovery Grid</span>
</div>
<h2 className="font-headline-xl text-headline-xl text-surface-container-lowest leading-tight mb-4">
          Turn waste into worth.
        </h2>
<p className="font-body-md text-body-md text-on-primary/90 leading-relaxed">
          Powering verified circular exchanges between communities, grassroots aggregators, and certified industrial upcyclers.
        </p>
</div>

<div className="relative z-10 mt-8 pt-6">
<div className="p-4 rounded-xl bg-white/10 backdrop-blur-md">
<div className="flex items-center gap-2 text-primary-fixed mb-1">
<span className="material-symbols-outlined text-headline-sm">payments</span>
<span className="font-label-sm text-label-sm uppercase tracking-wide">Instant Settlement</span>
</div>
<div className="font-label-lg text-label-lg font-semibold text-surface-container-lowest">
            Bhangarwala Operational Network
          </div>
<div className="font-body-sm text-body-sm text-primary-fixed-dim">
            100% Direct Payouts
          </div>
</div>
</div>
</div>

<div className="md:w-3/5 p-8 lg:p-10 bg-surface-container-lowest flex flex-col justify-between">
<div>

<div className="bg-surface-container-low p-1 rounded-xl flex items-center mb-6">
<button className="flex-1 py-1.5 px-3 rounded-lg text-center font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface" type="button">
            Person
          </button>
<button className="flex-1 py-1.5 px-3 rounded-lg text-center font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface" type="button">
            NGO
          </button>
<button className="flex-1 py-1.5 px-3 rounded-lg text-center font-label-md text-label-md bg-surface-container-lowest text-primary shadow-sm" type="button">
            Bhangarwala
          </button>
</div>

<div className="mb-6">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Registration Desk</span>
<h1 className="font-headline-lg text-headline-lg text-on-surface mt-1">Register as Bhangarwala Partner</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Connect directly to residential scrap listings and guaranteed spot payouts.
          </p>
</div>

<form className="space-y-4">
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1">Full Name</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-headline-sm">badge</span>
<input className="w-full bg-surface-container-low rounded-lg pl-10 pr-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-colors" placeholder="e.g. Ramesh Kumar" type="text"/>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1">Work or Personal Email</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-headline-sm">mail</span>
<input className="w-full bg-surface-container-low rounded-lg pl-10 pr-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-colors" placeholder="ramesh.collector@ecotraders.in" type="email"/>
</div>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1">Phone Number</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-headline-sm">call</span>
<input className="w-full bg-surface-container-low rounded-lg pl-10 pr-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-colors" placeholder="+91 98112 44321" type="tel"/>
</div>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1">Vehicle Type</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-headline-sm">electric_rickshaw</span>
<select className="w-full bg-surface-container-low rounded-lg pl-10 pr-8 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container appearance-none transition-colors">
<option value="electric_trike">Electric Trike (Capacity 350kg)</option>
<option value="mini_truck">Mini Truck / Tempo</option>
<option value="manual_cart">Manual Cart</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-2.5 text-outline pointer-events-none text-headline-sm">expand_more</span>
</div>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1">Area Note</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-headline-sm">location_on</span>
<input className="w-full bg-surface-container-low rounded-lg pl-10 pr-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-colors" placeholder="Sector 54, Golf Course Ext &amp; Riverside Hubs" type="text"/>
</div>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1">Create Password</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-headline-sm">lock</span>
<input className="w-full bg-surface-container-low rounded-lg pl-10 pr-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-colors" placeholder="••••••••••••" type="password"/>
</div>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface mb-1">Confirm Password</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-headline-sm">lock_reset</span>
<input className="w-full bg-surface-container-low rounded-lg pl-10 pr-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-colors" placeholder="••••••••••••" type="password"/>
</div>
</div>
</div>
<button className="w-full mt-2 h-10 px-5 bg-primary-container hover:bg-[#256628] active:bg-[#1B4D1E] text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2" type="submit">
<span>Create Bhangarwala Account</span>
<span className="material-symbols-outlined text-headline-sm">arrow_forward</span>
</button>
</form>
<div className="text-center mt-5">
<Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/bhangarwala/requests">
            Already have an account? <span className="font-semibold text-primary">Log in</span>
</Link>
</div>
</div>

<div className="mt-8 pt-4 flex items-center justify-center gap-2 text-outline">
<span className="material-symbols-outlined text-label-md">shield</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider">
          Zero-emission operational ledger | SECURE SSL 256-BIT
        </span>
</div>
</div>
</div>
</div></main><div aria-live="polite">{notice}</div></div></div>;
}
