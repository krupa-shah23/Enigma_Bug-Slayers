import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Contracts(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-lg"><Link className="flex items-center gap-space-sm" to="/ngo/dashboard"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W6N7O6ZgE2Tll6drrzyraadVHbqUPUs8qfNIeNKws4onwuYsxxdedp7BeTkIs0Txon3umt_QP8qOaEmZSI73-IZdcgoiddIyqPPoI3BmnPY5RLnNxVE2-Jq3nOjW7HpKVgbvuMfi79kkCrl4z176MqkLjcsk8ddgs1xFVpTIMFCOv0Zsk5iD1GqxWAiT4V7UoagrTSXG5WqIrbzsQSPHTF-dKjat2b_25Db6lusmuKF9auSZJEzc90UlGt"/><span className="font-headline-sm text-headline-sm text-primary tracking-tight">ReWaste</span></Link></div><Navbar variant="Ngo" className="hidden lg:flex items-center gap-space-xs"><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/dashboard">Dashboard</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/societies">Societies</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/contracts">Contracts</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/collections">Collections</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/events">Events</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/verification">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button className="relative p-space-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container"></span></button><div className="flex items-center gap-space-sm pl-space-xs"><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/><span className="hidden sm:inline-flex items-center px-space-sm py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-secondary font-semibold">NGO Partner</span></div></div></div></header><main className="w-full pt-16 bg-surface flex-1"><div className="flex flex-col w-full">
<div className="w-full max-w-[1440px] mx-auto px-margin py-space-xl flex flex-col gap-space-lg">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div>
<div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-wider mb-1">
<span>Operations Ledger</span>
<span>/</span>
<span className="text-primary font-semibold">Institutional Agreements</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Contract Management</h1>
</div>

<Link className="inline-flex items-center justify-center gap-space-xs bg-primary hover:bg-surface-tint text-on-primary font-label-lg text-label-lg px-5 py-2.5 rounded-lg shadow-sm transition-all duration-150 active:scale-[0.98]" to="/ngo/contracts/new">
<span className="material-symbols-outlined text-[20px]">add</span>
<span>+ Post New Contract</span>
</Link>
</div>

<div className="bg-surface-container-lowest rounded-xl p-1.5 shadow-sm flex items-center justify-between overflow-x-auto">
<div className="flex items-center gap-1 min-w-max" id="contractFilterTabs" role="tablist">
<button aria-selected="false" className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2" role="tab" type="button">
<span>All</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold">18</span>
</button>
<button aria-selected="false" className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2" role="tab" type="button">
<span>Offered</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold text-[11px]">3</span>
</button>
<button aria-selected="true" className="px-space-md py-2 rounded-lg font-label-md text-label-md bg-primary-container text-on-primary font-semibold shadow-sm flex items-center gap-2" role="tab" type="button">
<span>Active</span>
<span className="px-2 py-0.5 rounded-full bg-on-primary-container text-on-primary-fixed text-[11px] font-bold">11</span>
</button>
<button aria-selected="false" className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2" role="tab" type="button">
<span>Completed</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">3</span>
</button>
<button aria-selected="false" className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2" role="tab" type="button">
<span>Cancelled</span>
<span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px]">1</span>
</button>
</div>
<div className="hidden md:flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm pr-space-sm">
<span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span>Verified Ledger Sync</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<div className="overflow-x-auto w-full">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-space-md px-space-lg font-semibold" scope="col">Society</th>
<th className="py-space-md px-space-md font-semibold" scope="col">Material</th>
<th className="py-space-md px-space-md font-semibold" scope="col">Quantity</th>
<th className="py-space-md px-space-md font-semibold" scope="col">Rate</th>
<th className="py-space-md px-space-md font-semibold" scope="col">Status</th>
<th className="py-space-md px-space-md font-semibold" scope="col">Last Collection</th>
<th className="py-space-md px-space-lg text-right font-semibold" scope="col">Actions</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md text-on-surface">

<tr className="hover:bg-surface-container-low/60 transition-colors bg-surface-container-low/30">
<td className="py- space-md py-4 px-space-lg">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-headline-sm text-headline-sm">
                    CT
                  </div>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block leading-tight">Crestview Towers</span>
<span className="font-body-sm text-body-sm text-outline">Sector 48, Urban Ward B</span>
</div>
</div>
</td>
<td className="py-4 px-space-md font-medium text-on-surface">Compost / Wet Waste</td>
<td className="py-4 px-space-md font-medium text-on-surface">1,200 kg/mo</td>
<td className="py-4 px-space-md font-semibold text-primary">$0.15/kg</td>
<td className="py-4 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]"></span>
                  Active
                </span>
</td>
<td className="py-4 px-space-md text-on-surface-variant font-label-md text-label-md">Oct 24, 2025</td>
<td className="py-4 px-space-lg text-right">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm hover:bg-surface-tint shadow-sm transition-colors" type="button">
<span>Manage</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-4 px-space-lg">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary font-headline-sm text-headline-sm">
                    GV
                  </div>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block leading-tight">Green Valley Heights</span>
<span className="font-body-sm text-body-sm text-outline">Sector 12, East Hub</span>
</div>
</div>
</td>
<td className="py-4 px-space-md font-medium text-on-surface">Dry Recyclables</td>
<td className="py-4 px-space-md font-medium text-on-surface">800 kg/mo</td>
<td className="py-4 px-space-md font-semibold text-secondary">$0.22/kg</td>
<td className="py-4 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Offered
                </span>
</td>
<td className="py-4 px-space-md text-outline font-label-md text-label-md">Pending Initial</td>
<td className="py-4 px-space-lg text-right">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant transition-colors" type="button">
<span>View Details</span>
<span className="material-symbols-outlined text-[16px]">edit_note</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-4 px-space-lg">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-headline-sm text-headline-sm">
                    SO
                  </div>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block leading-tight">Silver Oak Enclave</span>
<span className="font-body-sm text-body-sm text-outline">Ward 9, Central Corridor</span>
</div>
</div>
</td>
<td className="py-4 px-space-md font-medium text-on-surface">E-Waste</td>
<td className="py-4 px-space-md font-medium text-on-surface">150 kg/mo</td>
<td className="py-4 px-space-md font-semibold text-primary">$1.40/kg</td>
<td className="py-4 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]"></span>
                  Active
                </span>
</td>
<td className="py-4 px-space-md text-on-surface-variant font-label-md text-label-md">Oct 15, 2025</td>
<td className="py-4 px-space-lg text-right">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant transition-colors" type="button">
<span>Manage</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-4 px-space-lg">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-outline font-headline-sm text-headline-sm">
                    PH
                  </div>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block leading-tight">Palm Heights</span>
<span className="font-body-sm text-body-sm text-outline">Sector 31, North Block</span>
</div>
</div>
</td>
<td className="py-4 px-space-md font-medium text-on-surface">Paper &amp; Cardboard</td>
<td className="py-4 px-space-md font-medium text-on-surface">650 kg/mo</td>
<td className="py-4 px-space-md font-semibold text-on-surface">$0.18/kg</td>
<td className="py-4 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                  Completed
                </span>
</td>
<td className="py-4 px-space-md text-on-surface-variant font-label-md text-label-md">Sep 30, 2025</td>
<td className="py-4 px-space-lg text-right">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant transition-colors" type="button">
<span>View Details</span>
<span className="material-symbols-outlined text-[16px]">visibility</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-4 px-space-lg">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-error font-headline-sm text-headline-sm">
                    LR
                  </div>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block leading-tight">Lotus Residency</span>
<span className="font-body-sm text-body-sm text-outline">Ward 3, Western Industrial Arc</span>
</div>
</div>
</td>
<td className="py-4 px-space-md font-medium text-on-surface">Compost / Wet Waste</td>
<td className="py-4 px-space-md font-medium text-on-surface">900 kg/mo</td>
<td className="py-4 px-space-md font-semibold text-outline line-through">$0.14/kg</td>
<td className="py-4 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  Cancelled
                </span>
</td>
<td className="py-4 px-space-md text-outline font-label-md text-label-md">Aug 12, 2025</td>
<td className="py-4 px-space-lg text-right">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant transition-colors" type="button">
<span>View Details</span>
<span className="material-symbols-outlined text-[16px]">visibility</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>


<div className="fixed inset-0 z-40 bg-on-surface/40 backdrop-blur-sm transition-opacity duration-200" id="drawerBackdrop"></div>
<div className="fixed inset-y-0 right-0 z-50 w-full max-w-[480px] bg-surface-container-lowest shadow-2xl flex flex-col justify-between transition-transform duration-300 transform translate-x-0" id="contractDetailDrawer">

<div className="p-space-lg border-b border-surface-container flex items-start justify-between bg-surface">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Agreement Specification</span>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-label-sm text-label-sm font-semibold" id="drawerStatusBadge">Active</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight" id="drawerSocietyName">Crestview Towers - Compost Contract</h2>
<p className="font-body-sm text-body-sm text-outline mt-0.5" id="drawerSocietyWard">Sector 48, Urban Ward B</p>
</div>
<button aria-label="Close panel" className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[24px]">close</span>
</button>
</div>

<div className="p-space-lg flex-1 overflow-y-auto flex flex-col gap-space-lg">

<div className="bg-surface rounded-xl p-space-md flex flex-col gap-3">
<h3 className="font-label-lg text-label-lg text-on-surface font-semibold">Parameters Summary</h3>
<div className="grid grid-cols-2 gap-3 text-body-sm">
<div className="bg-surface-container-lowest p-3 rounded-lg">
<span className="text-outline block font-label-sm text-label-sm mb-1">Target Material</span>
<span className="font-headline-sm text-headline-sm text-on-surface" id="drawerMaterial">Compost / Wet Waste</span>
</div>
<div className="bg-surface-container-lowest p-3 rounded-lg">
<span className="text-outline block font-label-sm text-label-sm mb-1">Agreed Quantity</span>
<span className="font-headline-sm text-headline-sm text-on-surface" id="drawerAgreedQuantity">1,200 kg/mo</span>
</div>
<div className="bg-surface-container-lowest p-3 rounded-lg">
<span className="text-outline block font-label-sm text-label-sm mb-1">Agreed Settlement Rate</span>
<span className="font-headline-sm text-headline-sm text-primary" id="drawerAgreedRate">$0.15/kg</span>
</div>
<div className="bg-surface-container-lowest p-3 rounded-lg">
<span className="text-outline block font-label-sm text-label-sm mb-1">Last Logged Run</span>
<span className="font-headline-sm text-headline-sm text-on-surface" id="drawerLastRun">Oct 24, 2025</span>
</div>
</div>
</div>

<div className="hidden flex-col gap-3 bg-secondary-fixed/30 p-space-md rounded-xl" id="drawerEditFormSection">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">pending_actions</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Renegotiate Offer Terms</h4>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Update the proposed capacity allocation and procurement price before dispatching authorization sign-off.</p>
<form className="flex flex-col gap-3 mt-1">
<div>
<label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1" htmlFor="editQuantityInput">Proposed Monthly Volume (kg)</label>
<input className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" id="editQuantityInput" type="number" value="800"/>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1" htmlFor="editRateInput">Offered Unit Rate ($/kg)</label>
<input className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" id="editRateInput" step="0.01" type="number" value="0.22"/>
</div>
<button className="mt-2 w-full py-2.5 bg-secondary hover:bg-on-secondary-fixed text-on-secondary font-label-lg text-label-lg rounded-lg shadow-sm transition-colors text-center font-semibold" type="submit">
            Save Terms
          </button>
</form>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-3">
<span className="material-symbols-outlined text-outline text-[20px] mt-0.5">verified_user</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">ReWaste Smart Protocol #CTR-88402</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Changes execute on-chain verification upon signature authorization from both Municipal Society Trustees and NGO Facility Coordinators.</span>
</div>
</div>
</div>

<div className="p-space-lg border-t border-surface-container bg-surface flex flex-col sm:flex-row items-center justify-between gap-3">

<button className="w-full sm:w-auto px-4 py-2.5 rounded-lg border-[1.5px] border-error text-error hover:bg-error-container/40 font-label-lg text-label-lg transition-colors text-center" type="button">
        Cancel Contract
      </button>

<button className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-primary hover:bg-surface-tint text-on-primary font-label-lg text-label-lg shadow-sm transition-colors text-center font-semibold" type="button">
        Complete Contract
      </button>
</div>
</div>

</div></main><footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] py-space-lg mt-auto"><div className="max-w-[1440px] mx-auto px-margin flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><p className="font-label-sm text-label-sm text-outline">Operational Circular Network</p></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
