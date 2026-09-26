import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function History(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest border-b border-outline-variant"><div className="h-16 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-sm shrink-0"><img alt="Clean minimalist geometric logo for ReWaste featuring a modern circular loop recycling leaf icon with bold typography 'ReWaste' in emerald forest green #2E7D32, vector style, flat design, white background. Design context: - Primary color: #2e7d32 - Font: epilogue - Mode: light - Roundness: rounded-md . The logo should be visually consistent with these brand tokens." className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W6N7O6ZgE2Tll6drrzyraadVHbqUPUs8qfNIeNKws4onwuYsxxdedp7BeTkIs0Txon3umt_QP8qOaEmZSI73-IZdcgoiddIyqPPoI3BmnPY5RLnNxVE2-Jq3nOjW7HpKVgbvuMfi79kkCrl4z176MqkLjcsk8ddgs1xFVpTIMFCOv0Zsk5iD1GqxWAiT4V7UoagrTSXG5WqIrbzsQSPHTF-dKjat2b_25Db6lusmuKF9auSZJEzc90UlGt"/><span className="font-headline-sm text-headline-sm text-primary tracking-tight">ReWaste</span></div><Navbar variant="Bhangarwala" className="hidden md:flex items-center gap-space-sm"><Link className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" to="/bhangarwala/requests">Requests</Link><Link className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" to="/bhangarwala/active-job">Active Job<span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container">LIVE</span></Link><Link className="px-space-md py-space-xs rounded-lg transition-colors bg-primary-container text-on-primary font-label-lg" to="/bhangarwala/history">History</Link><Link className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" to="/bhangarwala/profile">Profile</Link></Navbar><div className="flex items-center gap-space-md shrink-0"><button aria-label="Notifications" className="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary-container"></span></button><span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant font-semibold">Bhangarwala</span><img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/></div></div></header><main className="w-full pt-16 flex-1 bg-surface"><div className="flex flex-col w-full">
<div className="w-full max-w-7xl mx-auto px-gutter py-space-xl flex flex-col gap-space-xl">
<div className="flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs text-primary">
<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>receipt_long</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">Ledger &amp; Settlements</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface">Collector Transaction Ledger</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Historical record of completed direct scrap pickups and digital payouts.</p>
</div>
<div className="w-full grid grid-cols-1 md:grid-cols-3">
<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col justify-between relative overflow-hidden">
<div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary-fixed/30 pointer-events-none"></div>
<div className="flex items-center justify-between mb-space-md relative z-10">
<span className="font-label-lg text-label-lg text-on-surface-variant">Total Earnings</span>
<div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[24px]" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
</div>
</div>
<div className="flex flex-col gap-space-xs relative z-10">
<span className="font-display-lg text-display-lg text-primary tracking-tight">$1,485.50</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Across 62 completed collection runs</span>
</div>
</div>
</div>
<div className="w-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
<th className="py-space-md px-space-lg font-semibold" scope="col">Date</th>
<th className="py-space-md px-space-lg font-semibold" scope="col">Item</th>
<th className="py-space-md px-space-lg font-semibold" scope="col">Resident Name</th>
<th className="py-space-md px-space-lg font-semibold" scope="col">Price Earned</th>
<th className="py-space-md px-space-lg font-semibold" scope="col">Status</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md text-on-surface">
<tr className="hover:bg-surface-container-lowest/80 transition-colors">
<td className="py-space-lg px-space-lg text-on-surface-variant whitespace-nowrap font-medium">Oct 24, 2025</td>
<td className="py-space-lg px-space-lg font-medium text-on-surface">Household E-Waste (18 kg)</td>
<td className="py-space-lg px-space-lg text-on-surface">Ananya Sharma</td>
<td className="py-space-lg px-space-lg font-headline-sm text-headline-sm text-primary whitespace-nowrap">+$26.50</td>
<td className="py-space-lg px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed/40 text-primary">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Completed / Settled
                </span>
</td>
</tr>
<tr className="bg-surface-container-low/40 hover:bg-surface-container-lowest/80 transition-colors">
<td className="py-space-lg px-space-lg text-on-surface-variant whitespace-nowrap font-medium">Oct 22, 2025</td>
<td className="py-space-lg px-space-lg font-medium text-on-surface">Copper Pipes &amp; Fittings (12 kg)</td>
<td className="py-space-lg px-space-lg text-on-surface">Vikram Malhotra</td>
<td className="py-space-lg px-space-lg font-headline-sm text-headline-sm text-primary whitespace-nowrap">+$19.00</td>
<td className="py-space-lg px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed/40 text-primary">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Completed / Settled
                </span>
</td>
</tr>
<tr className="hover:bg-surface-container-lowest/80 transition-colors">
<td className="py-space-lg px-space-lg text-on-surface-variant whitespace-nowrap font-medium">Oct 19, 2025</td>
<td className="py-space-lg px-space-lg font-medium text-on-surface">Cardboard Shipping Cartons (35 kg)</td>
<td className="py-space-lg px-space-lg text-on-surface">Priya Sen</td>
<td className="py-space-lg px-space-lg font-headline-sm text-headline-sm text-primary whitespace-nowrap">+$24.00</td>
<td className="py-space-lg px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed/40 text-primary">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Completed / Settled
                </span>
</td>
</tr>
<tr className="bg-surface-container-low/40 hover:bg-surface-container-lowest/80 transition-colors">
<td className="py-space-lg px-space-lg text-on-surface-variant whitespace-nowrap font-medium">Oct 15, 2025</td>
<td className="py-space-lg px-space-lg font-medium text-on-surface">Assorted Plastic Crates (22 kg)</td>
<td className="py-space-lg px-space-lg text-on-surface">Rahul Mehta</td>
<td className="py-space-lg px-space-lg font-headline-sm text-headline-sm text-primary whitespace-nowrap">+$16.50</td>
<td className="py-space-lg px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed/40 text-primary">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Completed / Settled
                </span>
</td>
</tr>
<tr className="hover:bg-surface-container-lowest/80 transition-colors">
<td className="py-space-lg px-space-lg text-on-surface-variant whitespace-nowrap font-medium">Oct 11, 2025</td>
<td className="py-space-lg px-space-lg font-medium text-on-surface">Aluminium Scrap &amp; Cans (15 kg)</td>
<td className="py-space-lg px-space-lg text-on-surface">Amit Verma</td>
<td className="py-space-lg px-space-lg font-headline-sm text-headline-sm text-primary whitespace-nowrap">+$31.00</td>
<td className="py-space-lg px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed/40 text-primary">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Completed / Settled
                </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div></main><footer className="w-full bg-surface-container-low border-t border-outline-variant py-space-lg"><div className="max-w-7xl mx-auto px-gutter text-center font-body-sm text-body-sm text-on-surface-variant">© 2025 ReWaste Materials Ledger. All rights reserved. | Operational Circular Network</div></footer><div aria-live="polite">{notice}</div></div></div>;
}
