import { useApp } from '../../state/AppState.jsx';
import { Icon, PageHeader, StatusBadge } from '../../components/ui.jsx';
import { inr } from '../../lib/format.js';

export default function History() {
  const { state } = useApp();
  const b = state.bhang;
  return (
    <main className="page stack">
      <PageHeader eyebrow="Ledger & Settlements" title="Collector Transaction Ledger" subtitle="Historical record of completed direct scrap pickups and digital payouts." />
      <section className="card flex items-center gap-space-lg"><span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-fixed/40 text-primary"><Icon name="account_balance_wallet" size={30} fill /></span>
        <div><p className="eyebrow">Total Earnings</p><p className="font-display-lg text-display-lg font-bold text-primary">{inr(b.earnings)}</p><p className="text-body-sm text-on-surface-variant">Across {b.runs} completed collection runs</p></div></section>
      <section className="card !p-0"><div className="overflow-x-auto"><table className="tbl">
        <thead><tr><th>Date</th><th>Item</th><th>Resident Name</th><th className="text-right">Price Earned</th><th>Status</th></tr></thead>
        <tbody>{b.history.map((h) => <tr key={h.id}><td className="whitespace-nowrap">{h.date}</td><td className="font-label-lg">{h.item}</td><td>{h.resident}</td><td className="text-right font-label-lg text-primary">+{inr(h.amount)}</td><td><StatusBadge status="Completed" /></td></tr>)}</tbody></table></div></section>
    </main>
  );
}
