import { useState } from 'react';
import { useApp } from '../../state/AppState.jsx';
import { Icon, PageHeader, SplitModal, StatCard, StatusBadge } from '../../components/ui.jsx';
import { inr } from '../../lib/format.js';

export default function Payments() {
  const { state, actions } = useApp();
  const [split, setSplit] = useState(null);
  const soc = (id) => state.societies.find((s) => s.id === id).name;
  const paid = state.payments.filter((p) => p.status === 'Paid' || p.status === 'Disbursed');
  const due = state.payments.filter((p) => p.status === 'Pending Payment' || p.status === 'Unpaid');

  return (
    <main className="page stack">
      <PageHeader eyebrow="Institutional Ledger & Escrow" title="NGO Payment Ledger" subtitle="Audited escrow disbursements, settlement records, and pending society off-take payments." />
      <section className="grid gap-space-lg md:grid-cols-3">
        <StatCard label="Total Disbursed" icon="payments" value={inr(paid.reduce((a, p) => a + p.amount, 0))} note={`${paid.length} settled payouts`} />
        <StatCard label="Pending Payments" icon="hourglass_top" tone="danger" value={inr(due.reduce((a, p) => a + p.amount, 0))} note={`${due.length} awaiting release`} />
        <StatCard label="Escrow Protocol" icon="lock" value="Smart" note="Split by household weigh-in" />
      </section>
      <section className="card !p-0"><div className="overflow-x-auto"><table className="tbl">
        <thead><tr><th>Date</th><th>Society</th><th>Contract</th><th className="text-right">Amount</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>{state.payments.map((p) => (
          <tr key={p.id}>
            <td className="whitespace-nowrap">{p.date}</td><td className="font-label-lg">{soc(p.societyId)}</td><td>{p.label}</td><td className="text-right font-label-lg">{inr(p.amount, 2)}</td><td><StatusBadge status={p.status} /></td>
            <td>{p.status === 'Paid' || p.status === 'Disbursed' ? <button type="button" className="btn-secondary btn-sm" onClick={() => setSplit(p)}>View Split<Icon name="chevron_right" size={16} /></button> : <button type="button" className="btn-primary btn-sm" onClick={() => actions.payUnpaid(p.id)}><Icon name="payments" size={16} />Pay Unpaid Collection</button>}</td>
          </tr>))}</tbody></table></div></section>
      <SplitModal payment={split} onClose={() => setSplit(null)} title={split && `Communal Escrow Split — ${soc(split.societyId)}`} subtitle={split && `Batch #${split.batch} • ${inr(split.amount, 2)} total`} />
    </main>
  );
}
