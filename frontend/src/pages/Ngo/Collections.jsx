import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Collections(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-lg"><Link className="flex items-center gap-space-sm" to="/ngo/dashboard"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W6N7O6ZgE2Tll6drrzyraadVHbqUPUs8qfNIeNKws4onwuYsxxdedp7BeTkIs0Txon3umt_QP8qOaEmZSI73-IZdcgoiddIyqPPoI3BmnPY5RLnNxVE2-Jq3nOjW7HpKVgbvuMfi79kkCrl4z176MqkLjcsk8ddgs1xFVpTIMFCOv0Zsk5iD1GqxWAiT4V7UoagrTSXG5WqIrbzsQSPHTF-dKjat2b_25Db6lusmuKF9auSZJEzc90UlGt"/><span className="font-headline-sm text-headline-sm text-primary tracking-tight">ReWaste</span></Link></div><Navbar variant="Ngo" className="hidden lg:flex items-center gap-space-xs"><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/dashboard">Dashboard</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/societies">Societies</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/contracts">Contracts</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/collections">Collections</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/events">Events</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/verification">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button className="relative p-space-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container"></span></button><div className="flex items-center gap-space-sm pl-space-xs"><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/><span className="hidden sm:inline-flex items-center px-space-sm py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-secondary font-semibold">NGO Partner</span></div></div></div></header><main className="w-full pt-16 bg-surface flex-1"><div className="flex flex-col w-full">
<div className="w-full max-w-[1440px] mx-auto px-margin py-space-xl">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
<div>
<div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider mb-space-xs">
<span className="material-symbols-outlined text-[16px]">verified</span>
<span>Audit &amp; Disbursement Protocol</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
          Month-End Collection &amp; Weigh-in Verification
        </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-xs">
          Verify collected batch weights against contractual promised thresholds and disburse society escrow credits.
        </p>
</div>
<div className="flex items-center gap-space-sm self-start md:self-auto bg-surface-container px-space-md py-space-xs rounded-full">
<span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">Verification Ledger Node #819 Online</span>
</div>
</div>

<div className="max-w-4xl mx-auto flex flex-col gap-space-lg">

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<label className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-space-xs" htmlFor="contractSelect">
<span className="material-symbols-outlined text-primary text-[20px]">assignment_turned_in</span>
              Select Finalized Collection Batch
            </label>
<span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
              Pending Weigh-in
            </span>
</div>
<div className="relative w-full">
<select className="w-full appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg px-space-md py-space-sm rounded-lg pr-10 focus:outline-none transition-colors" id="contractSelect">
<option defaultSelected value="WB-409">Crestview Towers — Compost/Wet Waste (Batch #WB-409)</option>
<option value="WB-410">Silverwood Enclave — Source-Segregated Dry Recyclables (Batch #WB-410)</option>
<option value="WB-411">Green Meadows Coop — High-Density Polyethylene &amp; Plastics (Batch #WB-411)</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              expand_more
            </span>
</div>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm bg-surface-container-low p-space-md rounded-lg">
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant">Society Committee Contact</span>
<p className="font-label-md text-label-md text-on-surface font-semibold mt-0.5 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-primary">person</span>
                Vikram Mehta (+91 98450 12093)
              </p>
</div>
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant">Collection Completion</span>
<p className="font-label-md text-label-md text-on-surface font-semibold mt-0.5 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
                October 31, 2025 • 18:40 IST
              </p>
</div>
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant">Contract Agreement Rate</span>
<p className="font-label-md text-label-md text-on-surface font-semibold mt-0.5 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-primary">payments</span>
                $0.15 / kg baseline rate
              </p>
</div>
</div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 gap-space-md">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Contract Baseline</span>
<span className="px-space-sm py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Committed</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Promised Weight</h3>
<div className="mt-space-md flex items-baseline gap-space-xs">
<span className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">1,200</span>
<span className="font-headline-sm text-headline-sm text-on-surface-variant">kg</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-md pt-space-md">
            Threshold stipulated in Section 4.2 of Schedule C for monthly residential compost pickups.
          </p>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">Weigh-bridge Telemetry</span>
<span className="flex items-center gap-1 font-label-sm text-label-sm text-primary">
<span className="material-symbols-outlined text-[14px]">sensors</span>
                Calibrated Oct 2025
              </span>
</div>
<label className="font-headline-sm text-headline-sm text-on-surface block" htmlFor="actualWeightInput">
              Actual Weight Received
            </label>
<div className="mt-space-md relative flex items-center">
<input className="w-full bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-headline-xl text-headline-xl px-space-md py-space-sm rounded-lg pr-16 focus:outline-none transition-all shadow-inner font-bold" id="actualWeightInput" placeholder="0" step="1" type="number" value="1020"/>
<div className="absolute right-4 font-headline-sm text-headline-sm text-on-surface-variant font-semibold pointer-events-none">
                kg
              </div>
</div>
</div>
<div className="flex items-center justify-between mt-space-md pt-space-md text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
              Scale Cert: 2025-10-31 18:42:04
            </span>
<span className="font-label-sm text-label-sm text-outline">Terminal ID: #WB-BLR-04</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md">
<div>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Confirm Weight Record</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Lock scale telemetry receipt to ReWaste verifiable ledger before triggering society escrow payout.</p>
</div>
<button className="w-full sm:w-auto px-space-xl py-space-md bg-primary hover:bg-tertiary text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm transition-all flex items-center justify-center gap-space-xs shrink-0 active:scale-95" id="submitWeighInBtn" type="button">
<span className="material-symbols-outlined text-[20px]">fact_check</span>
          Submit Weigh-in Record
        </button>
</section>

<div className="bg-error-container text-on-error-container rounded-xl p-space-lg shadow-sm" id="flagAlertBanner">
<div className="flex items-start gap-space-md">
<div className="p-space-xs rounded-full bg-error text-on-error flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[24px]">warning</span>
</div>
<div className="flex-1">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<h4 className="font-headline-sm text-headline-sm font-bold tracking-tight">Weight Variance Flag Logged</h4>
<span className="px-space-sm py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm self-start sm:self-auto font-bold">
                Deviation: -15.0%
              </span>
</div>
<p className="font-body-md text-body-md mt-space-xs text-on-error-container font-medium">
              Actual weight (<span className="font-bold">1,020 kg</span>) is <span className="font-bold">-15.0%</span> below promised weight (<span className="font-bold">1,200 kg</span>). Variance logged on ledger for Society Committee review.
            </p>
<div className="mt-space-sm text-body-sm text-on-error-container flex items-center gap-space-xs opacity-90">
<span className="material-symbols-outlined text-[16px]">info</span>
<span>The contractual shortfall flag requires committee acknowledgment, but pro-rata disbursement can proceed immediately.</span>
</div>
</div>
</div>
</div>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Approved Society Escrow Credit</span>
<div className="flex items-baseline gap-space-xs mt-1">
<span className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight" id="disbursementAmountDisplay">$153.00</span>
<span className="font-label-lg text-label-lg text-on-surface-variant font-semibold">USD</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1" id="calculationExplanation">
              Calculated based on 1,020 kg delivered @ $0.15/kg contractual wet-waste rate.
            </p>
</div>
<button className="w-full md:w-auto px-space-xl py-space-md bg-secondary-container hover:bg-secondary-fixed text-on-secondary-fixed font-headline-sm text-headline-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-space-sm active:scale-95 shrink-0" id="triggerPaymentBtn" type="button">
<span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
            Trigger Payment to Society Escrow
          </button>
</div>
</section>

<div className="hidden bg-surface-container-highest text-on-surface px-space-lg py-space-md rounded-lg shadow-md flex items-center justify-between" id="toastMessage">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[24px]">check_circle</span>
<span className="font-label-lg text-label-lg" id="toastText">Disbursement command queued to Escrow Smart Contract.</span>
</div>
<button className="text-on-surface-variant hover:text-on-surface" id="toastCloseBtn" type="button">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</div>
</div>

</div></main><footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] py-space-lg mt-auto"><div className="max-w-[1440px] mx-auto px-margin flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><p className="font-label-sm text-label-sm text-outline">Operational Circular Network</p></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
