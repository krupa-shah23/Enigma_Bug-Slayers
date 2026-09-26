import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Home(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200"><div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between"><div className="flex items-center gap-space-sm"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZimPwqvNO5WBOD_Rr6DrxoFMG9U7zp-_fA8lYNGY_YUTus1BXwWVvqCq2vAkd1inpXBz7YGFuKubvo8a2k-YT6CEQst72AhHKNbk4Wov6WvbuvA_1JPsy564A0qOyka9DCmxpACzZ8OsJmOiTcvhVN8WirT4gjLSAaC1jNGwZHBweKLc4cOBIwvuml0rB5HGeCFdZwTwvsFkXyDjUlmBiMv4h54GnAgwiEpoFSVeDDqJHmQWBy0rbew"/><span className="font-headline-md text-headline-md tracking-tight text-primary font-bold hidden sm:inline-block">ReWaste</span></div><Navbar variant="Person" className="hidden md:flex items-center gap-gutter"><Link className="transition-colors py-1 text-primary-container font-headline-sm" to="/home">Home</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/societies">All Societies</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button aria-label="Notifications" className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-headline-md">notifications</span></button><span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm">Person</span><div className="flex items-center"><img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPgf1R8-C9KtO74b0DTwy8-hSJibHRzegzP7HZ2l7U_XyJaXe2XIJV1NvvNf8Yb3YyWBe-t9mtW_W0aaYglDw8zqDhXx2Qn3j9fP6s2nNL4cdjJsbeidTrZ-jbDDNjjjBy-_3Th_O8c8oKoTm_ihFtdU5TTYi8csrr-mD2LddOyEHyHzscf2nQOqnKgG8M790yl9XYy0F8BkDRzJL-g5Ia0Vn3M_hcoSDyK3EJqGaCI4BQTt25MJQJHQ"/></div></div></div></header><main className="w-full pt-16 bg-[#F5F7F6]"><div className="max-w-7xl mx-auto px-6 py-8"><div className="flex flex-col w-full relative">

<div className="fixed top-20 right-6 z-50 max-w-sm w-full bg-surface-container-lowest shadow-xl rounded-xl p-space-md flex items-start gap-space-sm transition-all duration-500 ease-out transform translate-y-0 opacity-100" id="live-status-toast">
<div className="p-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-headline-sm" style={{fontVariationSettings: "'FILL' 1"}}>local_shipping</span>
</div>
<div className="flex flex-col flex-1 min-w-0">
<div className="flex items-center justify-between gap-space-xs">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Live Dispatch</span>
<span className="font-body-sm text-body-sm text-outline">Just now</span>
</div>
<p className="font-body-md text-body-md text-on-surface mt-0.5 leading-snug">
<span className="font-label-md text-label-md text-primary font-semibold">S05:</span> Bhangarwala Ramesh has updated pickup status to <span className="font-label-md text-label-md text-primary bg-primary-fixed/30 px-1.5 py-0.5 rounded">Arrived</span>
</p>
</div>
<button aria-label="Dismiss toast" className="text-outline hover:text-on-surface p-1 rounded transition-colors" type="button">
<span className="material-symbols-outlined text-headline-sm">close</span>
</button>
</div>

<div className="w-full mb-space-lg">
<div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-space-md md:p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary-container"></div>
<div className="flex items-center gap-space-md pl-space-xs">
<div className="relative shrink-0">
<img className="w-12 h-12 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhhZitNYlppv5xZOz4jHI-OnvlD7HcJsYyHrR2elMY1Yw2Z2VvF9SEcGHatJOrqJzhiCnWwpfKFedF9aN5EW7RVnTGxTbI3HKW1EtMQ1VhsgdMJ4ojl1-h4FIgMG7yzfu9gvic4GfVVe96PXEPWtGOr1vCK1Kn8Zg28o3r_4EAPsj_yvHrorQEfa815yG2ClDdlCPpxDaeX25dqgMdReTzNtY4KvOPcua06NiGXXT1oQzwT9YPI_0RVA"/>
<span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary-container rounded-full ring-2 ring-surface-container-lowest"></span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-sm flex-wrap">
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Ramesh Kumar</h2>
<span className="inline-flex items-center gap-1.5 bg-secondary-fixed/50 text-on-secondary-fixed px-2.5 py-0.5 rounded-full font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              Driver En Route
            </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Assigned Collector • Electric Trike Route #A-14</p>
</div>
</div>
<div className="flex items-center gap-space-sm w-full md:w-auto self-end md:self-center">
<Link className="w-full md:w-auto inline-flex items-center justify-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg px-5 py-2.5 rounded-lg shadow-sm transition-all duration-200" to="/home">
<span className="material-symbols-outlined text-headline-sm">near_me</span>
          Track Pickup
        </Link>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-lg">

<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col justify-between transition-shadow hover:shadow-md">
<div className="flex items-center justify-between mb-space-md">
<span className="font-label-lg text-label-lg text-on-surface-variant font-medium">Fee Credit This Cycle</span>
<div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-headline-md">account_balance_wallet</span>
</div>
</div>
<div>
<div className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">$42.50</div>
<p className="font-body-sm text-body-sm text-primary mt-1 flex items-center gap-1">
<span className="material-symbols-outlined text-body-md">trending_up</span>
          Credited toward next maintenance fee
        </p>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col justify-between transition-shadow hover:shadow-md">
<div className="flex items-center justify-between mb-space-md">
<span className="font-label-lg text-label-lg text-on-surface-variant font-medium">Next Collection Date</span>
<div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-headline-md">calendar_today</span>
</div>
</div>
<div>
<div className="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight">Oct 28, 2025</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
<span className="material-symbols-outlined text-body-md text-secondary">schedule</span>
          Morning Slot: 08:30 AM – 11:00 AM
        </p>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col justify-between transition-shadow hover:shadow-md">
<div className="flex items-center justify-between mb-space-md">
<span className="font-label-lg text-label-lg text-on-surface-variant font-medium">Society Trust Score</span>
<div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-headline-md" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
</div>
</div>
<div className="flex items-center justify-between gap-space-md">
<div>
<div className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">92<span className="font-headline-md text-headline-md text-outline font-normal">/100</span></div>
<span className="inline-flex items-center gap-1 mt-1 bg-surface-container-low text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full">
            Tier A Verified
          </span>
</div>

<div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
<path className="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="92, 100" strokeLinecap="round" strokeWidth="3.5"></path>
</svg>
<span className="absolute font-label-md text-label-md text-primary font-bold">92%</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md mb-space-xl">
<button className="flex-1 inline-flex items-center justify-center gap-space-sm bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg h-12 px-6 rounded-xl shadow-sm transition-all duration-200 cursor-pointer" type="button">
<span className="material-symbols-outlined text-headline-md">add_circle</span>
      Log Contribution
    </button>
<button className="flex-1 inline-flex items-center justify-center gap-space-sm bg-surface-container-lowest hover:bg-surface-container-low text-primary-container font-label-lg text-label-lg h-12 px-6 rounded-xl shadow-sm transition-all duration-200 cursor-pointer" type="button">
<span className="material-symbols-outlined text-headline-md">hail</span>
      Request Pickup
    </button>
</div>

<section className="w-full flex flex-col">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-baseline gap-space-sm">
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Events &amp; Workshops</h2>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider hidden sm:inline">Society Circular Calendar</span>
</div>
<span className="font-label-md text-label-md text-primary-container font-semibold">3 Upcoming</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:shadow-md group">
<div>
<div className="relative h-36 w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdrd2fIV0GjRXfNV8vhFjIvFzxUZgU7T-q_QDb6GyFAtIwxZ1xYDMW4UG1G3reeH0OHkiKGonsgZee9J1mImW01jm3fcYULVMEMs4DKGq8Jwgg9h-3zOOmK9agKFnRDP7ZIlAQv_egpwgixexrJ_UHB00fjAMdasrddlF0T5AY3hXf0aXhST4Qq5jEi-WZFXJaPYgjCp-HR6wBYJ3RYDGq4U6BsGFid3xOWp3mJS5TDb-Yc7GuxByMMA"/>
<div className="absolute top-3 left-3">
<span className="bg-primary-container text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">drive</span>
</div>
</div>
<div className="p-space-md">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-1">E-Waste Clearance Drive</h3>
<div className="mt-space-xs space-y-1">
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-body-md text-primary">event</span>
                Nov 02, 2025 • 09:00 AM
              </p>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-body-md text-outline">location_on</span>
                Central Clubhouse Gate
              </p>
</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between gap-space-sm mt-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-body-md text-primary">groups</span>
            48 Attending
          </span>
<button className="bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer" type="button">
            RSVP
          </button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:shadow-md group">
<div>
<div className="relative h-36 w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ2dyeWVMC2lsEIhUUATMqRVZeA6djtRROAA0nsf59sF4WOSV3euQz3HrWY2lRlx0ErdxSEXQf6y4U4Tq9tex2D_42OuV18E-bpqqAagon6o-ExuHktlea6_zwulO69sjX1j0qAzyyildd5pIjlLrmgEGvs5aUziDBaRMTEF8lajAq7trZZGqI4T9ROuY1wrvwiZSMzD8XLvpJ5nlYc06StvoXLzPWyVdenai0aNbHxBZmrblAymsPHQ"/>
<div className="absolute top-3 left-3">
<span className="bg-surface-container-highest text-primary font-label-sm text-label-sm px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">green_event</span>
</div>
</div>
<div className="p-space-md">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-1">Compost Distribution Gala</h3>
<div className="mt-space-xs space-y-1">
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-body-md text-primary">event</span>
                Nov 09, 2025 • 10:30 AM
              </p>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-body-md text-outline">location_on</span>
                Community Rooftop Plot
              </p>
</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between gap-space-sm mt-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-body-md text-primary">groups</span>
            32 Attending
          </span>
<button className="bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer" type="button">
            RSVP
          </button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:shadow-md group">
<div>
<div className="relative h-36 w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDpUSCjxsKpVVznPDzrSWN-ThgtPe1yo-r013wRg4MA7pD03Ib1WhLrrHQi-MDyurIVECtsj5UN-4ndw8RqifQRVwOKKOLT4PM_pH_3oaGr07bO0ad11dw68wmGyVEZU5Q-6zqkd80VdGcSHVbESLhwh_CWZQL4-7clKNLLv1OY-u3rpbZfKUinb06UG9kqN4K-aUs1wyKnxOzPxxHuKfxz_PirR51BWaI2c0kyEv43fAKm3AppBl4Rg"/>
<div className="absolute top-3 left-3">
<span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">workshop</span>
</div>
</div>
<div className="p-space-md">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-1">Plastic Grading Masterclass</h3>
<div className="mt-space-xs space-y-1">
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-body-md text-primary">event</span>
                Nov 15, 2025 • 04:00 PM
              </p>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-body-md text-outline">location_on</span>
                Eco Lab Room 2B
              </p>
</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between gap-space-sm mt-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-body-md text-primary">groups</span>
            19 Attending
          </span>
<button className="bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer" type="button">
            RSVP
          </button>
</div>
</div>

<button className="bg-surface-container-lowest/60 hover:bg-surface-container-low rounded-xl p-space-lg flex flex-col items-center justify-center text-center group cursor-pointer transition-all min-h-[260px] shadow-sm" type="button">
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform mb-space-sm">
<span className="material-symbols-outlined text-headline-md font-bold">add</span>
</div>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Create Event</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-[180px]">
          Schedule a collection drive or sustainability workshop
        </p>
<span className="mt-space-md inline-flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold">
          Officer Portal
          <span className="material-symbols-outlined text-body-sm">arrow_forward</span>
</span>
</button>
</div>
</section>
</div></div></main><footer className="w-full bg-white border-t border-gray-200 mt-auto"><div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><div className="flex items-center gap-gutter"><span className="font-label-md text-label-md text-outline">Operational Circular Network</span></div></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
