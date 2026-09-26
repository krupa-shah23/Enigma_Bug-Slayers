import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Exchange(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200"><div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between"><div className="flex items-center gap-space-sm"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZimPwqvNO5WBOD_Rr6DrxoFMG9U7zp-_fA8lYNGY_YUTus1BXwWVvqCq2vAkd1inpXBz7YGFuKubvo8a2k-YT6CEQst72AhHKNbk4Wov6WvbuvA_1JPsy564A0qOyka9DCmxpACzZ8OsJmOiTcvhVN8WirT4gjLSAaC1jNGwZHBweKLc4cOBIwvuml0rB5HGeCFdZwTwvsFkXyDjUlmBiMv4h54GnAgwiEpoFSVeDDqJHmQWBy0rbew"/><span className="font-headline-md text-headline-md tracking-tight text-primary font-bold hidden sm:inline-block">ReWaste</span></div><Navbar variant="Person" className="hidden md:flex items-center gap-gutter"><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/societies">All Societies</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button aria-label="Notifications" className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-headline-md">notifications</span></button><span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm">Person</span><div className="flex items-center"><img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPgf1R8-C9KtO74b0DTwy8-hSJibHRzegzP7HZ2l7U_XyJaXe2XIJV1NvvNf8Yb3YyWBe-t9mtW_W0aaYglDw8zqDhXx2Qn3j9fP6s2nNL4cdjJsbeidTrZ-jbDDNjjjBy-_3Th_O8c8oKoTm_ihFtdU5TTYi8csrr-mD2LddOyEHyHzscf2nQOqnKgG8M790yl9XYy0F8BkDRzJL-g5Ia0Vn3M_hcoSDyK3EJqGaCI4BQTt25MJQJHQ"/></div></div></div></header><main className="w-full pt-16 bg-[#F5F7F6]"><div className="flex flex-col w-full">

<div className="w-full max-w-7xl mx-auto px-6 py-8">

<div className="mb-8">
<div className="flex items-center gap-2 mb-1.5">
<span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-primary-container"></span>
<span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">Direct Material Transfer</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">P2P Waste Exchange</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Post recyclable lots directly to local licensed bhangarwalas &amp; collectors.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

<div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 shadow-sm">
<div className="flex items-center justify-between mb-5">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-headline-md">post_add</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Create New Scrap Listing</h2>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2.5 py-1 rounded-full">Network Verified</span>
</div>
<form className="flex flex-col gap-5">

<div className="flex flex-col gap-2">
<label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between">
<span>Lot Photography</span>
<span className="font-label-sm text-label-sm text-outline">1 file attached</span>
</label>
<div className="relative bg-surface-container-low rounded-xl p-4 transition-colors hover:bg-surface-container">

<div className="rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer" style={{outline: "2px dashed #bfcaba", outlineOffset: -2}}>
<div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary mb-2 shadow-sm">
<span className="material-symbols-outlined text-headline-md">cloud_upload</span>
</div>
<p className="font-body-md text-body-md text-on-surface font-medium">
                  Drag &amp; drop photos of scrap materials or <span className="text-primary font-semibold underline underline-offset-2">Browse files</span>
</p>
<p className="font-label-sm text-label-sm text-outline mt-1">(PNG, JPG)</p>
</div>

<div className="mt-4 pt-4 bg-surface-container-lowest rounded-lg p-3 flex items-center justify-between shadow-sm">
<div className="flex items-center gap-3 min-w-0">
<img alt="Discarded household electronics" className="w-14 h-14 object-cover rounded-lg flex-shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4aAwoNqyoaIbzKS6OIDVBp0Mn_hWgMA40XWH90Y1BifocoP7CMNIjcX5v9o5ICBkQjOBXaI14iMLobeoJbwmgplKSgISXs1E04tCP5X-fEGPBzHTvhy0wigTyXhQrmoCXtiqWclX3WfZBtYbMRxTC8hlfwuOhK9ekkB5QDAklTxAhN5LNHu85z2tpIZRV-ImzygT2xLxbWnhSkKDeYiqwBWgkis4Dfr1MZxGD5vsEuVDVy0xIAwAgaQ"/>
<div className="flex flex-col min-w-0">
<span className="font-label-lg text-label-lg text-on-surface truncate">lot_ewaste_verification_01.jpg</span>
<span className="font-body-sm text-body-sm text-outline">1.8 MB • Uploaded ready</span>
</div>
</div>
<div className="flex items-center gap-2 flex-shrink-0">
<span className="flex items-center text-primary text-label-sm bg-surface-container-low px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-sm mr-1" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> Attached
                  </span>
<button aria-label="Remove photo" className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-error hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-headline-sm">delete</span>
</button>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-1.5">
<label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between" htmlFor="material-description">
<span>Description</span>
<span className="font-label-sm text-label-sm text-outline">Include items &amp; weight</span>
</label>
<textarea className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg p-3.5 outline-none focus:bg-surface-container-lowest focus:shadow-sm transition-all resize-none" id="material-description" placeholder="e.g. Old CRT monitor, vintage radio, blender, assorted copper wiring and chargers. Approx 18kg." rows="3">Old CRT monitor, vintage radio, blender, assorted copper wiring and chargers. Approx 18kg.</textarea>
</div>

<div className="flex flex-col gap-1.5">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="material-category">Material Category</label>
<div className="relative">
<select className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg py-3 px-3.5 pr-10 appearance-none outline-none focus:bg-surface-container-lowest focus:shadow-sm transition-all cursor-pointer" id="material-category">
<option defaultSelected value="ewaste">E-waste &amp; Appliances</option>
<option value="cardboard">Bulk Cardboard / Paper</option>
<option value="metal">Scrap Metal &amp; Iron</option>
<option value="plastic">Mixed Plastics</option>
</select>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-on-surface-variant">
<span className="material-symbols-outlined text-headline-sm">expand_more</span>
</div>
</div>
</div>

<div className="pt-2">
<button className="w-full h-10 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors active:scale-[0.99]" type="submit">
<span className="material-symbols-outlined text-headline-sm">send</span>
              Post Request to Network
            </button>
</div>
</form>
</div>

<div className="lg:col-span-5 flex flex-col gap-4">
<div className="flex items-center justify-between pb-1">
<div className="flex items-center gap-2">
<h2 className="font-headline-md text-headline-md text-on-surface">My Active Requests</h2>
<span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center justify-center">3</span>
</div>
<span className="font-label-sm text-label-sm text-primary font-semibold cursor-pointer hover:underline">Real-time Feed</span>
</div>
<div className="flex flex-col gap-3.5">

<div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3 transition-transform hover:-translate-y-0.5 duration-200">
<div className="flex gap-3.5 items-start">
<img alt="Discarded household electronics in box" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4aAwoNqyoaIbzKS6OIDVBp0Mn_hWgMA40XWH90Y1BifocoP7CMNIjcX5v9o5ICBkQjOBXaI14iMLobeoJbwmgplKSgISXs1E04tCP5X-fEGPBzHTvhy0wigTyXhQrmoCXtiqWclX3WfZBtYbMRxTC8hlfwuOhK9ekkB5QDAklTxAhN5LNHu85z2tpIZRV-ImzygT2xLxbWnhSkKDeYiqwBWgkis4Dfr1MZxGD5vsEuVDVy0xIAwAgaQ"/>
<div className="flex flex-col min-w-0 flex-1">
<div className="flex items-center justify-between gap-2 mb-1">
<span className="font-label-sm text-label-sm text-outline">REQ-2025-0914</span>
<span className="bg-[#FFF8E1] text-[#F9A825] font-label-sm text-label-sm px-2.5 py-0.5 rounded-full whitespace-nowrap">Receiving Quotes</span>
</div>
<p className="font-body-md text-body-md text-on-surface font-medium line-clamp-2">
                  Old CRT monitor, vintage radio, cables &amp; small appliances (18kg)
                </p>
</div>
</div>
<div className="bg-surface-container-low rounded-lg px-3 py-2 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-headline-sm text-secondary-container">local_offer</span>
                3 Quotes Received
              </span>
<Link className="font-label-sm text-label-sm text-primary hover:text-tertiary-container font-semibold flex items-center" to="/exchange/1/quotes">
                View Quotes →
              </Link>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3 transition-transform hover:-translate-y-0.5 duration-200">
<div className="flex gap-3.5 items-start">
<img className="w-16 h-16 rounded-lg object-cover flex-shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT6j1eb7GTD6cWl_SEnSw-sJsaJOVwbfIO7wlpr3RjYx-QZ-5JOFiJeuxGe-xh6Rl2Yx-MTrz0Bbyhlhys3JmE-W29iWlydgYP1L-cEGZ10cTPPOB4D_rkbwK-_PeXeCE7k6YR8l6iIKCyCE69Ifk6pzl3jHdIkFrsVFrPtHgkFwFjkn9LQbNNPN1EQn1F3wK34uCcfcBaLQMFKOG0fKduPAJV8uWqNCqWSrzfAaF-OXngtBT4cqIJgQ"/>
<div className="flex flex-col min-w-0 flex-1">
<div className="flex items-center justify-between gap-2 mb-1">
<span className="font-label-sm text-label-sm text-outline">REQ-2025-0899</span>
<span className="bg-[#FFF8E1] text-[#F9A825] font-label-sm text-label-sm px-2.5 py-0.5 rounded-full whitespace-nowrap">Pending Review</span>
</div>
<p className="font-body-md text-body-md text-on-surface font-medium line-clamp-2">
                  Copper pipes, brass fittings from plumbing renovation (12kg)
                </p>
</div>
</div>
<div className="bg-surface-container-low rounded-lg px-3 py-2 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-headline-sm text-secondary-container">local_offer</span>
                1 Quote Received
              </span>
<span className="font-label-sm text-label-sm text-outline">Under Review</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3 transition-transform hover:-translate-y-0.5 duration-200">
<div className="flex gap-3.5 items-start">
<img className="w-16 h-16 rounded-lg object-cover flex-shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1V0t_4sKoYn8ORN7XppZquOnmcMOehVDZMg4CJNK-uMI1t-C3ad-iLYcOdJmKK3CiHcSxzgj23SCdfIddfkNS9B11v2weXC6y5MQG9hrv-eRob8Ga_gL4r09O4EBk8aFvfkALPetkPr5bFPAIeQNpn4nYSjvGgpQEv_Ou9V2zTeO7Ug0UjlWnF6p4KiBXM6ZAQEjju5EP1SdLirZAsga5KsNrxpimmNt0I2kUOf5F-kBxHsSr5VOxaA"/>
<div className="flex flex-col min-w-0 flex-1">
<div className="flex items-center justify-between gap-2 mb-1">
<span className="font-label-sm text-label-sm text-outline">REQ-2025-0842</span>
<span className="bg-[#E8F5E9] text-[#2E7D32] font-label-sm text-label-sm px-2.5 py-0.5 rounded-full whitespace-nowrap">Scheduled</span>
</div>
<p className="font-body-md text-body-md text-on-surface font-medium line-clamp-2">
                  Corrugated boxes from home moving (35kg)
                </p>
</div>
</div>
<div className="bg-surface-container-low rounded-lg px-3 py-2 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-primary flex items-center gap-1.5">
<span className="material-symbols-outlined text-headline-sm" style={{fontVariationSettings: "'FILL' 1"}}>task_alt</span>
                Quote Accepted
              </span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Pickup: Today, 4 PM</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div></main><footer className="w-full bg-white border-t border-gray-200 mt-auto"><div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><div className="flex items-center gap-gutter"><span className="font-label-md text-label-md text-outline">Operational Circular Network</span></div></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
