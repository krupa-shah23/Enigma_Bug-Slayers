import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function History(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased flex flex-col justify-between min-h-screen"><Navbar variant="Person"/><main className="w-full pt-16 bg-[#F5F7F6] flex-1"><div className="flex flex-col w-full">
<div className="w-full max-w-7xl mx-auto px-6 py-8">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="font-label-sm text-label-sm text-primary uppercase tracking-widest bg-surface-container-high px-2.5 py-1 rounded-full">Audited Ledger</span>
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span> Synchronized Live
          </span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">My Exchange History</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
          Consolidated audit trail of scrap trades, doorstep contributions, and credit disbursements.
        </p>
</div>
<div className="flex items-center gap-3 self-start md:self-auto">
<div className="bg-surface-container-low px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
<div className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></div>
<span className="font-label-md text-label-md text-on-surface-variant">Active Node: <span className="font-label-lg text-on-surface">Flat C-402</span></span>
</div>
</div>
</div>

<div className="flex items-center gap-2 mb-6 p-1.5 bg-surface-container-low rounded-xl w-fit shadow-sm" id="filter-tabs">
<button className="tab-btn px-5 py-2 rounded-lg font-label-lg text-label-lg transition-all bg-primary-container text-on-primary shadow-sm" type="button">
        All
      </button>
<button className="tab-btn px-5 py-2 rounded-lg font-label-lg text-label-lg transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container" type="button">
        P2P
      </button>
<button className="tab-btn px-5 py-2 rounded-lg font-label-lg text-label-lg transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container" type="button">
        Contributions
      </button>
<button className="tab-btn px-5 py-2 rounded-lg font-label-lg text-label-lg transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container" type="button">
        Payouts
      </button>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden mb-12">
<div className="overflow-x-auto">
<table className="w-full text-left" id="transaction-table">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md tracking-wider">
<th className="py-4 px-6 w-16" scope="col">Type</th>
<th className="py-4 px-6 w-36" scope="col">Date</th>
<th className="py-4 px-6" scope="col">Description</th>
<th className="py-4 px-6 text-right w-44" scope="col">Amount / Weight</th>
<th className="py-4 px-6 text-center w-36" scope="col">Status</th>
<th className="py-4 px-6 text-right w-44" scope="col">Action</th>
</tr>
</thead>
<tbody className="text-on-surface font-body-md text-body-md" id="table-body">

<tr className="hover:bg-surface-container-lowest/60 transition-colors group">
<td className="py-5 px-6 align-middle">
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-headline-sm">swap_horiz</span>
</div>
</td>
<td className="py-5 px-6 font-label-md text-label-md text-on-surface-variant align-middle whitespace-nowrap">
                Oct 24, 2025
              </td>
<td className="py-5 px-6 align-middle">
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Lot #EX-4092: Household E-Waste (Sold to Ramesh Kumar)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Direct peer trade • Handover confirmed at Block C hub</span>
</div>
</td>
<td className="py-5 px-6 text-right align-middle whitespace-nowrap">
<span className="font-headline-sm text-headline-sm text-primary">+$26.50</span>
</td>
<td className="py-5 px-6 text-center align-middle whitespace-nowrap">
<span className="inline-flex items-center px-3 py-1 rounded-full font-label-sm text-label-sm bg-surface-container-low text-primary">
                  Completed
                </span>
</td>
<td className="py-5 px-6 text-right align-middle whitespace-nowrap">
<span className="font-label-md text-label-md text-outline">—</span>
</td>
</tr>

<tr className="bg-surface-container-low/40 hover:bg-surface-container-lowest transition-colors group">
<td className="py-5 px-6 align-middle">
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-headline-sm">local_shipping</span>
</div>
</td>
<td className="py-5 px-6 font-label-md text-label-md text-on-surface-variant align-middle whitespace-nowrap">
                Oct 20, 2025
              </td>
<td className="py-5 px-6 align-middle">
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Doorstep Weigh-in: Compost / Wet Waste</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Daily municipal green bin collection • Route #04</span>
</div>
</td>
<td className="py-5 px-6 text-right align-middle whitespace-nowrap">
<span className="font-headline-sm text-headline-sm text-on-surface">14.2 kg</span>
</td>
<td className="py-5 px-6 text-center align-middle whitespace-nowrap">
<span className="inline-flex items-center px-3 py-1 rounded-full font-label-sm text-label-sm bg-surface-container-low text-primary">
                  Verified
                </span>
</td>
<td className="py-5 px-6 text-right align-middle whitespace-nowrap">
<span className="font-label-md text-label-md text-outline">—</span>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="py-5 px-6 align-middle">
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
<span className="material-symbols-outlined text-headline-sm">account_balance_wallet</span>
</div>
</td>
<td className="py-5 px-6 font-label-md text-label-md text-on-surface-variant align-middle whitespace-nowrap">
                Oct 15, 2025
              </td>
<td className="py-5 px-6 align-middle">
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Q3 Society Maintenance Credit Payout</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Batch #DISB-2025-1015 • Shared communal recyclable fund</span>
</div>
</td>
<td className="py-5 px-6 text-right align-middle whitespace-nowrap">
<span className="font-headline-sm text-headline-sm text-primary">+$18.50 Credit</span>
</td>
<td className="py-5 px-6 text-center align-middle whitespace-nowrap">
<span className="inline-flex items-center px-3 py-1 rounded-full font-label-sm text-label-sm bg-surface-container-low text-primary">
                  Disbursed
                </span>
</td>
<td className="py-5 px-6 text-right align-middle whitespace-nowrap">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-label-md text-label-md text-primary bg-surface-container-low hover:bg-primary hover:text-on-primary transition-all shadow-sm" type="button">
<span>View Split Details</span>
<span className="material-symbols-outlined text-body-sm">arrow_forward</span>
</button>
</td>
</tr>

<tr className="bg-surface-container-low/40 hover:bg-surface-container-lowest transition-colors group">
<td className="py-5 px-6 align-middle">
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-headline-sm">inventory_2</span>
</div>
</td>
<td className="py-5 px-6 font-label-md text-label-md text-on-surface-variant align-middle whitespace-nowrap">
                Oct 08, 2025
              </td>
<td className="py-5 px-6 align-middle">
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Doorstep Weigh-in: Dry Recyclables</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Cardboard &amp; HDPE containers certified</span>
</div>
</td>
<td className="py-5 px-6 text-right align-middle whitespace-nowrap">
<span className="font-headline-sm text-headline-sm text-on-surface">8.4 kg</span>
</td>
<td className="py-5 px-6 text-center align-middle whitespace-nowrap">
<span className="inline-flex items-center px-3 py-1 rounded-full font-label-sm text-label-sm bg-surface-container-low text-primary">
                  Verified
                </span>
</td>
<td className="py-5 px-6 text-right align-middle whitespace-nowrap">
<span className="font-label-md text-label-md text-outline">—</span>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="py-5 px-6 align-middle">
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
<span className="material-symbols-outlined text-headline-sm">payments</span>
</div>
</td>
<td className="py-5 px-6 font-label-md text-label-md text-on-surface-variant align-middle whitespace-nowrap">
                Sep 30, 2025
              </td>
<td className="py-5 px-6 align-middle">
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Bi-weekly Society Scrap Escrow Share</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">September settlement cycle #ESC-902</span>
</div>
</td>
<td className="py-5 px-6 text-right align-middle whitespace-nowrap">
<span className="font-headline-sm text-headline-sm text-primary">+$15.20 Credit</span>
</td>
<td className="py-5 px-6 text-center align-middle whitespace-nowrap">
<span className="inline-flex items-center px-3 py-1 rounded-full font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed">
                  Disbursed
                </span>
</td>
<td className="py-5 px-6 text-right align-middle whitespace-nowrap">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-label-md text-label-md text-primary bg-surface-container-low hover:bg-primary hover:text-on-primary transition-all shadow-sm" type="button">
<span>View Split Details</span>
<span className="material-symbols-outlined text-body-sm">arrow_forward</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="hidden py-16 text-center" id="no-results-msg">
<span className="material-symbols-outlined text-headline-xl text-outline-variant">find_in_page</span>
<p className="font-headline-sm text-headline-sm text-on-surface mt-2">No matching transactions</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">There are no records in this selected transaction category.</p>
</div>
</div>
</div>

<div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm hidden p-4" id="payment-split-modal">
<div className="bg-surface-container-lowest rounded-xl shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-150">

<div className="px-6 py-5 bg-surface-container flex items-start justify-between">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">Proportional Reconciliation</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Payment Split Ledger — Q3 Maintenance Credit</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Disbursement batch #DISB-2025-1015 • Total Escrow: $240.00
          </p>
</div>
<button aria-label="Close dialog" className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-headline-sm">close</span>
</button>
</div>

<div className="p-6">
<div className="rounded-xl overflow-hidden bg-surface-container-low">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-high text-on-surface-variant font-label-md text-label-md tracking-wider">
<th className="py-3 px-4" scope="col">Resident Name</th>
<th className="py-3 px-4" scope="col">Flat / Node</th>
<th className="py-3 px-4 text-right" scope="col">Weight Contributed (kg)</th>
<th className="py-3 px-4 text-right" scope="col">Net Share Amount</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md text-on-surface">

<tr className="bg-surface-container-lowest font-semibold">
<td className="py-3 px-4 flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span className="text-primary">Ananya Sharma (You)</span>
</td>
<td className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant">Flat C-402</td>
<td className="py-3 px-4 text-right font-headline-sm text-headline-sm">114.5 kg</td>
<td className="py-3 px-4 text-right font-headline-sm text-headline-sm text-primary">$18.50</td>
</tr>

<tr className="hover:bg-surface-container transition-colors">
<td className="py-3 px-4">Rajesh Gupta</td>
<td className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant">Flat A-101</td>
<td className="py-3 px-4 text-right">96.0 kg</td>
<td className="py-3 px-4 text-right">$15.50</td>
</tr>

<tr className="bg-surface-container-lowest/50 hover:bg-surface-container transition-colors">
<td className="py-3 px-4">Sunita Verma</td>
<td className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant">Flat B-204</td>
<td className="py-3 px-4 text-right">142.0 kg</td>
<td className="py-3 px-4 text-right">$23.00</td>
</tr>

<tr className="hover:bg-surface-container transition-colors">
<td className="py-3 px-4">Vikram Malhotra</td>
<td className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant">Flat C-102</td>
<td className="py-3 px-4 text-right">108.0 kg</td>
<td className="py-3 px-4 text-right">$17.40</td>
</tr>

<tr className="bg-surface-container-lowest/50 hover:bg-surface-container transition-colors">
<td className="py-3 px-4 text-on-surface-variant italic">Remaining 18 Residents</td>
<td className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant">Various</td>
<td className="py-3 px-4 text-right">1,023.5 kg</td>
<td className="py-3 px-4 text-right">$165.60</td>
</tr>
</tbody>

<tfoot>
<tr className="bg-surface-container-high font-headline-sm text-headline-sm text-on-surface">
<td className="py-4 px-4 font-bold text-primary">Total Reconciled</td>
<td className="py-4 px-4 font-label-md text-label-md text-on-surface-variant">22 Households</td>
<td className="py-4 px-4 text-right font-bold">1,484.0 kg</td>
<td className="py-4 px-4 text-right font-bold text-primary">$240.00</td>
</tr>
</tfoot>
</table>
</div>
<div className="mt-4 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm px-1">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-label-md text-primary">verified</span>
<span>Allocated based on weigh-in proportion to total society mass collected</span>
</div>
<span className="font-label-sm text-label-sm">Audited by ReWaste Circular Ledger</span>
</div>
</div>

<div className="px-6 py-4 bg-surface-container-low flex justify-end">
<button className="px-6 py-2 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary transition-all shadow-sm" type="button">
          Close Ledger
        </button>
</div>
</div>
</div>

</div></main><footer className="w-full bg-white border-t border-gray-200 mt-auto"><div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><div className="flex items-center gap-gutter"><span className="font-label-md text-label-md text-outline">Operational Circular Network</span></div></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
