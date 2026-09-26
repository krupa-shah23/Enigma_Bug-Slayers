import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Quotes(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200"><div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between"><div className="flex items-center gap-space-sm"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZimPwqvNO5WBOD_Rr6DrxoFMG9U7zp-_fA8lYNGY_YUTus1BXwWVvqCq2vAkd1inpXBz7YGFuKubvo8a2k-YT6CEQst72AhHKNbk4Wov6WvbuvA_1JPsy564A0qOyka9DCmxpACzZ8OsJmOiTcvhVN8WirT4gjLSAaC1jNGwZHBweKLc4cOBIwvuml0rB5HGeCFdZwTwvsFkXyDjUlmBiMv4h54GnAgwiEpoFSVeDDqJHmQWBy0rbew"/><span className="font-headline-md text-headline-md tracking-tight text-primary font-bold hidden sm:inline-block">ReWaste</span></div><Navbar variant="Person" className="hidden md:flex items-center gap-gutter"><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/societies">All Societies</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button aria-label="Notifications" className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-headline-md">notifications</span></button><span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm">Person</span><div className="flex items-center"><img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPgf1R8-C9KtO74b0DTwy8-hSJibHRzegzP7HZ2l7U_XyJaXe2XIJV1NvvNf8Yb3YyWBe-t9mtW_W0aaYglDw8zqDhXx2Qn3j9fP6s2nNL4cdjJsbeidTrZ-jbDDNjjjBy-_3Th_O8c8oKoTm_ihFtdU5TTYi8csrr-mD2LddOyEHyHzscf2nQOqnKgG8M790yl9XYy0F8BkDRzJL-g5Ia0Vn3M_hcoSDyK3EJqGaCI4BQTt25MJQJHQ"/></div></div></div></header><main className="w-full pt-16 bg-[#F5F7F6]"><div className="flex flex-col w-full">

<div className="fixed top-20 right-6 z-50 max-w-md w-full bg-surface-container-lowest shadow-xl rounded-xl p-space-md transition-all duration-300 transform translate-y-0 opacity-100 flex items-start gap-space-sm" id="socket-toast">
<div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span className="material-symbols-outlined text-[18px]">bolt</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-space-xs">
<span className="inline-block w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Socket Event S02</span>
</div>
<p className="font-body-md text-body-md text-on-surface mt-0.5">
        New quote received from <span className="font-headline-sm text-headline-sm text-primary">Surender Scrap Traders</span> (<span className="font-headline-sm text-headline-sm text-primary-container">$24.00</span>, ETA 25 mins)
      </p>
</div>
<button aria-label="Dismiss toast" className="text-on-surface-variant hover:text-on-surface p-1 transition-colors">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
<div className="max-w-7xl mx-auto w-full px-6 py-space-xl flex flex-col gap-space-lg">

<div>
<Link className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-primary hover:text-tertiary-container transition-colors group" to="/home">
<span className="material-symbols-outlined text-headline-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
<span>Back to Active Requests</span>
</Link>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm p-5 flex flex-col md:flex-row gap-space-lg items-center">
<div className="w-full md:w-56 h-44 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
<img alt="Household recyclable electronics and appliances in a cardboard box" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4aAwoNqyoaIbzKS6OIDVBp0Mn_hWgMA40XWH90Y1BifocoP7CMNIjcX5v9o5ICBkQjOBXaI14iMLobeoJbwmgplKSgISXs1E04tCP5X-fEGPBzHTvhy0wigTyXhQrmoCXtiqWclX3WfZBtYbMRxTC8hlfwuOhK9ekkB5QDAklTxAhN5LNHu85z2tpIZRV-ImzygT2xLxbWnhSkKDeYiqwBWgkis4Dfr1MZxGD5vsEuVDVy0xIAwAgaQ"/>
</div>
<div className="flex-1 min-w-0 flex flex-col gap-space-xs justify-center">
<div className="flex flex-wrap items-center gap-space-sm mb-1">
<span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-space-sm py-0.5 rounded-full">
            E-waste
          </span>
<span className="font-body-sm text-body-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">schedule</span> Posted 2 hours ago
          </span>
<span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-2.5 py-0.5 rounded-full flex items-center gap-1">
<span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
            3 Quotes Available
          </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Lot #EX-4092: Household E-Waste &amp; Small Appliances
        </h1>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
          Old CRT monitor, vintage radio, blender, assorted copper wiring and chargers. Approx 18kg.
        </p>
<div className="pt-space-xs flex items-center gap-space-md text-outline">
<span className="font-body-sm text-body-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">scale</span> 18 kg estimated
          </span>
<span className="font-body-sm text-body-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">location_on</span> Sector 14 Collection Node
          </span>
<span className="font-body-sm text-body-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">verified</span> Digital Scale Required
          </span>
</div>
</div>
</div>

<div className="flex items-center justify-between pt-space-xs">
<div>
<h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Available Collector Quotes</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Review offers, verification credibility, and estimated arrival windows</p>
</div>
<div className="hidden sm:flex items-center gap-space-xs bg-surface-container px-3 py-1.5 rounded-full text-on-surface-variant font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        Live Dispatch Network Active
      </div>
</div>

<div className="flex flex-col gap-space-md">

<div className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-lg relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>
<div className="flex items-center gap-space-md min-w-0">
<div className="w-14 h-14 rounded-full bg-primary text-on-primary font-headline-md text-headline-md flex items-center justify-center flex-shrink-0 shadow-sm">
            RK
          </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-headline-md text-headline-md text-on-surface truncate">Ramesh Kumar (EcoTrader Express)</span>
<span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
</div>
<div className="flex items-center gap-space-sm mt-0.5">
<span className="font-label-md text-label-md text-secondary flex items-center gap-0.5">
                ★ 4.9 <span className="font-body-sm text-body-sm text-outline">(142 pickups)</span>
</span>
<span className="text-outline">•</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Avg verification 4m</span>
</div>
</div>
</div>
<div className="flex items-center justify-between md:justify-end gap-space-xl flex-shrink-0">
<div className="flex flex-col md:items-end">
<div className="font-display-lg text-display-lg font-bold text-primary-container leading-none">
              $26.50
            </div>
<div className="mt-1.5">
<span className="bg-primary/10 text-primary font-label-sm text-label-sm px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">local_shipping</span>
                ETA 20 mins
              </span>
</div>
</div>
<div>
<button className="bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-lg text-label-lg px-6 h-10 rounded-lg shadow-sm flex items-center justify-center gap-space-xs cursor-pointer">
<span>Select Quote</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-14 h-14 rounded-full bg-secondary-fixed text-on-secondary-fixed font-headline-md text-headline-md flex items-center justify-center flex-shrink-0">
            ST
          </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-headline-md text-headline-md text-on-surface truncate">Surender Scrap Traders</span>
<span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
</div>
<div className="flex items-center gap-space-sm mt-0.5">
<span className="font-label-md text-label-md text-secondary flex items-center gap-0.5">
                ★ 4.8 <span className="font-body-sm text-body-sm text-outline">(89 pickups)</span>
</span>
<span className="text-outline">•</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Instant digital weigh</span>
</div>
</div>
</div>
<div className="flex items-center justify-between md:justify-end gap-space-xl flex-shrink-0">
<div className="flex flex-col md:items-end">
<div className="font-headline-xl text-headline-xl font-bold text-on-surface leading-none">
              $24.00
            </div>
<div className="mt-1.5">
<span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">schedule</span>
                ETA 25 mins
              </span>
</div>
</div>
<div>
<button className="bg-transparent hover:bg-primary-container/10 text-primary-container font-label-lg text-label-lg px-6 h-10 rounded-lg shadow-sm flex items-center justify-center gap-space-xs transition-colors cursor-pointer" style={{boxShadow: "inset 0 0 0 1.5px #2E7D32"}}>
<span>Select Quote</span>
</button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-14 h-14 rounded-full bg-surface-container-highest text-on-surface-variant font-headline-md text-headline-md flex items-center justify-center flex-shrink-0">
            MD
          </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-headline-md text-headline-md text-on-surface truncate">Modern Green Upcyclers</span>
</div>
<div className="flex items-center gap-space-sm mt-0.5">
<span className="font-label-md text-label-md text-secondary flex items-center gap-0.5">
                ★ 4.7 <span className="font-body-sm text-body-sm text-outline">(215 pickups)</span>
</span>
<span className="text-outline">•</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Scheduled route match</span>
</div>
</div>
</div>
<div className="flex items-center justify-between md:justify-end gap-space-xl flex-shrink-0">
<div className="flex flex-col md:items-end">
<div className="font-headline-xl text-headline-xl font-bold text-on-surface leading-none">
              $22.00
            </div>
<div className="mt-1.5">
<span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">schedule</span>
                ETA 45 mins
              </span>
</div>
</div>
<div>
<button className="bg-transparent hover:bg-primary-container/10 text-primary-container font-label-lg text-label-lg px-6 h-10 rounded-lg shadow-sm flex items-center justify-center gap-space-xs transition-colors cursor-pointer" style={{boxShadow: "inset 0 0 0 1.5px #2E7D32"}}>
<span>Select Quote</span>
</button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant flex-shrink-0">
<span className="material-symbols-outlined text-headline-md animate-spin">sync</span>
</div>
<div>
<p className="font-headline-sm text-headline-sm text-on-surface">Waiting for quotes...</p>
<p className="font-body-md text-body-md text-on-surface-variant">Verified local collectors are reviewing your lot specifications.</p>
</div>
</div>
<div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">sensors</span>
<span>Broadcasting to 14 collectors within 5km</span>
</div>
</div>
</div>


</div></main><footer className="w-full bg-white border-t border-gray-200 mt-auto"><div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><div className="flex items-center gap-gutter"><span className="font-label-md text-label-md text-outline">Operational Circular Network</span></div></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
