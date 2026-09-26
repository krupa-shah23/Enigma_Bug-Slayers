import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Payments(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-lg"><Link className="flex items-center gap-space-sm" to="/ngo/dashboard"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W6N7O6ZgE2Tll6drrzyraadVHbqUPUs8qfNIeNKws4onwuYsxxdedp7BeTkIs0Txon3umt_QP8qOaEmZSI73-IZdcgoiddIyqPPoI3BmnPY5RLnNxVE2-Jq3nOjW7HpKVgbvuMfi79kkCrl4z176MqkLjcsk8ddgs1xFVpTIMFCOv0Zsk5iD1GqxWAiT4V7UoagrTSXG5WqIrbzsQSPHTF-dKjat2b_25Db6lusmuKF9auSZJEzc90UlGt"/><span className="font-headline-sm text-headline-sm text-primary tracking-tight">ReWaste</span></Link></div><Navbar variant="Ngo" className="hidden lg:flex items-center gap-space-xs"><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/dashboard">Dashboard</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/societies">Societies</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/contracts">Contracts</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/collections">Collections</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/events">Events</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/verification">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button className="relative p-space-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container"></span></button><div className="flex items-center gap-space-sm pl-space-xs"><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/><span className="hidden sm:inline-flex items-center px-space-sm py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-secondary font-semibold">NGO Partner</span></div></div></div></header><main className="w-full pt-16 bg-surface flex-1"><div className="flex flex-col w-full">
<div className="max-w-[1440px] w-full mx-auto px-margin py-space-xl flex flex-col gap-space-lg">

<div className="flex flex-col gap-space-xs">
<div className="flex items-center gap-space-sm text-primary">
<span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">Institutional Ledger &amp; Escrow</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface">NGO Payment Ledger</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
        Audited institutional escrow disbursements, settlement records, and pending society off-take payments.
      </p>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
<th className="py-space-md px-space-lg" scope="col">Date</th>
<th className="py-space-md px-space-lg" scope="col">Society</th>
<th className="py-space-md px-space-lg" scope="col">Contract</th>
<th className="py-space-md px-space-lg" scope="col">Amount</th>
<th className="py-space-md px-space-lg" scope="col">Status</th>
<th className="py-space-md px-space-lg text-right" scope="col">Action</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md text-on-surface divide-y divide-surface-container">

<tr className="hover:bg-surface-container-low/70 cursor-pointer transition-colors group">
<td className="py-space-md px-space-lg whitespace-nowrap font-medium text-on-surface">
                Oct 24, 2025
              </td>
<td className="py-space-md px-space-lg font-label-lg text-label-lg text-on-surface">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[18px] text-primary">apartment</span>
<span>Crestview Towers</span>
</div>
</td>
<td className="py-space-md px-space-lg text-on-surface-variant">
                #CTR-2025-01 (Compost)
              </td>
<td className="py-space-md px-space-lg font-label-lg text-label-lg text-on-surface whitespace-nowrap">
                $180.00
              </td>
<td className="py-space-md px-space-lg">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#E8F5E9] text-[#2E7D32]">
<span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]"></span>
                  Paid
                </span>
</td>
<td className="py-space-md px-space-lg text-right">
<button className="inline-flex items-center gap-1 px-space-sm py-1 rounded text-primary hover:bg-surface-container transition-colors font-label-sm text-label-sm" type="button">
                  View Split
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 cursor-pointer transition-colors group">
<td className="py-space-md px-space-lg whitespace-nowrap font-medium text-on-surface">
                Oct 15, 2025
              </td>
<td className="py-space-md px-space-lg font-label-lg text-label-lg text-on-surface">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[18px] text-primary">apartment</span>
<span>Green Valley Heights</span>
</div>
</td>
<td className="py-space-md px-space-lg text-on-surface-variant">
                #CTR-2025-04 (Dry Recyclables)
              </td>
<td className="py-space-md px-space-lg font-label-lg text-label-lg text-on-surface whitespace-nowrap">
                $176.00
              </td>
<td className="py-space-md px-space-lg">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#FFF8E1] text-[#F9A825]">
<span className="w-1.5 h-1.5 rounded-full bg-[#F9A825]"></span>
                  Pending Payment
                </span>
</td>
<td className="py-space-md px-space-lg text-right">
<button className="inline-flex items-center gap-1 px-space-md py-1.5 rounded-lg bg-primary text-on-primary hover:bg-[#256628] font-label-sm text-label-sm transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[16px]">payments</span>
                  Pay Unpaid Collection
                </button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 cursor-pointer transition-colors group">
<td className="py-space-md px-space-lg whitespace-nowrap font-medium text-on-surface">
                Sep 30, 2025
              </td>
<td className="py-space-md px-space-lg font-label-lg text-label-lg text-on-surface">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[18px] text-primary">apartment</span>
<span>Palm Heights</span>
</div>
</td>
<td className="py-space-md px-space-lg text-on-surface-variant">
                #CTR-2025-08 (E-Waste)
              </td>
<td className="py-space-md px-space-lg font-label-lg text-label-lg text-on-surface whitespace-nowrap">
                $210.00
              </td>
<td className="py-space-md px-space-lg">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#E8F5E9] text-[#2E7D32]">
<span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]"></span>
                  Disbursed
                </span>
</td>
<td className="py-space-md px-space-lg text-right">
<button className="inline-flex items-center gap-1 px-space-sm py-1 rounded text-primary hover:bg-surface-container transition-colors font-label-sm text-label-sm" type="button">
                  View Split
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 cursor-pointer transition-colors group">
<td className="py-space-md px-space-lg whitespace-nowrap font-medium text-on-surface">
                Sep 15, 2025
              </td>
<td className="py-space-md px-space-lg font-label-lg text-label-lg text-on-surface">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[18px] text-primary">apartment</span>
<span>Silver Oak Enclave</span>
</div>
</td>
<td className="py-space-md px-space-lg text-on-surface-variant">
                #CTR-2025-01 (Compost)
              </td>
<td className="py-space-md px-space-lg font-label-lg text-label-lg text-on-surface whitespace-nowrap">
                $95.50
              </td>
<td className="py-space-md px-space-lg">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#FFF8E1] text-[#F9A825]">
<span className="w-1.5 h-1.5 rounded-full bg-[#F9A825]"></span>
                  Unpaid
                </span>
</td>
<td className="py-space-md px-space-lg text-right">
<button className="inline-flex items-center gap-1 px-space-md py-1.5 rounded-lg bg-primary text-on-primary hover:bg-[#256628] font-label-sm text-label-sm transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[16px]">payments</span>
                  Pay Unpaid Collection
                </button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<div className="fixed inset-0 z-50 flex items-center justify-center p-margin bg-on-surface/40 backdrop-blur-sm transition-opacity duration-200" id="payment-split-modal">
<div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">

<div className="px-space-lg py-space-md bg-surface-container-low flex items-start justify-between gap-space-md">
<div className="flex flex-col gap-0.5">
<div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[18px]">verified</span>
<span>Escrow Allocation Verification</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface" id="modal-title">
            Communal Escrow Split — Crestview Towers (Batch #WB-409)
          </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant" id="modal-subtitle">
            Disbursement breakdown for 1,200 kg Compost Collection ($180.00 Total)
          </p>
</div>
<button aria-label="Close modal" className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[22px]">close</span>
</button>
</div>

<div className="overflow-y-auto px-space-lg py-space-md">
<table className="w-full text-left border-collapse">
<thead>
<tr className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider bg-surface-container-low/50">
<th className="py-space-sm px-space-md rounded-l" scope="col">Resident Name</th>
<th className="py-space-sm px-space-md" scope="col">Weight (kg)</th>
<th className="py-space-sm px-space-md text-right rounded-r" scope="col">Share Amount</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container font-body-md text-body-md text-on-surface" id="split-table-body">
<tr>
<td className="py-space-sm px-space-md font-medium text-on-surface">Ananya Sharma</td>
<td className="py-space-sm px-space-md text-on-surface-variant">280 kg</td>
<td className="py-space-sm px-space-md text-right font-label-lg text-label-lg text-on-surface">$42.00</td>
</tr>
<tr>
<td className="py-space-sm px-space-md font-medium text-on-surface">Vikram Malhotra</td>
<td className="py-space-sm px-space-md text-on-surface-variant">240 kg</td>
<td className="py-space-sm px-space-md text-right font-label-lg text-label-lg text-on-surface">$36.00</td>
</tr>
<tr>
<td className="py-space-sm px-space-md font-medium text-on-surface">Rahul Mehta</td>
<td className="py-space-sm px-space-md text-on-surface-variant">210 kg</td>
<td className="py-space-sm px-space-md text-right font-label-lg text-label-lg text-on-surface">$31.50</td>
</tr>
<tr>
<td className="py-space-sm px-space-md font-medium text-on-surface">Priya Sen</td>
<td className="py-space-sm px-space-md text-on-surface-variant">260 kg</td>
<td className="py-space-sm px-space-md text-right font-label-lg text-label-lg text-on-surface">$39.00</td>
</tr>
<tr>
<td className="py-space-sm px-space-md font-medium text-on-surface">Amit Verma</td>
<td className="py-space-sm px-space-md text-on-surface-variant">210 kg</td>
<td className="py-space-sm px-space-md text-right font-label-lg text-label-lg text-on-surface">$31.50</td>
</tr>
</tbody>
<tfoot>
<tr className="bg-surface-container font-label-lg text-label-lg text-on-surface">
<td className="py-space-md px-space-md font-bold">Total:</td>
<td className="py-space-md px-space-md font-semibold text-primary" id="modal-total-weight">1,200 kg</td>
<td className="py-space-md px-space-md text-right font-bold text-primary" id="modal-total-share">$180.00 Escrow Disbursed</td>
</tr>
</tfoot>
</table>
</div>

<div className="px-space-lg py-space-sm bg-surface-container-low flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-primary">lock</span>
          Smart contract verified ledger
        </span>
<button className="px-space-md py-1.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-label-sm text-label-sm transition-colors" type="button">
          Dismiss
        </button>
</div>
</div>
</div>

</div></main><footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] py-space-lg mt-auto"><div className="max-w-[1440px] mx-auto px-margin flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><p className="font-label-sm text-label-sm text-outline">Operational Circular Network</p></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
