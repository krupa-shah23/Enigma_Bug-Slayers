import { useState } from 'react';
import { useApp } from '../../state/AppState.jsx';
import { Badge, EmptyState, Icon, PageHeader, Pills, SplitModal, StatusBadge } from '../../components/ui.jsx';
import { inr } from '../../lib/format.js';

const TYPE_ICON = { p2p: 'swap_horiz', contribution: 'local_shipping', payout: 'account_balance_wallet' };

export default function History() {
  const { state, me } = useApp();
  const [filter, setFilter] = useState('all');
  const [splitFor, setSplitFor] = useState(null);
  const rows = state.personHistory.filter((h) => filter === 'all' || h.type === filter);
  const count = (t) => state.personHistory.filter((h) => h.type === t).length;

  return (
    <main className="page stack">
      <PageHeader eyebrow="Audited Ledger • Synchronized Live" title="My Exchange History" subtitle="Consolidated audit trail of scrap trades, doorstep contributions, and credit disbursements."
        actions={<Badge tone="neutral" icon="home">Active Node: {me.flat}</Badge>} />
      <Pills value={filter} onChange={setFilter} options={[{ value: 'all', label: 'All', count: state.personHistory.length }, { value: 'p2p', label: 'P2P', count: count('p2p') }, { value: 'contribution', label: 'Contributions', count: count('contribution') }, { value: 'payout', label: 'Payouts', count: count('payout') }]} />
      <section className="card !p-0">
        {rows.length === 0 ? <EmptyState icon="find_in_page" title="No matching transactions" text="There are no records in this selected transaction category." /> : (
          <div className="overflow-x-auto">
            <table className="tbl">
              <thead><tr><th>Type</th><th>Date</th><th>Description</th><th className="text-right">Amount / Weight</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {rows.map((h) => (
                  <tr key={h.id}>
                    <td><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container-low text-primary-container"><Icon name={TYPE_ICON[h.type]} size={20} /></span></td>
                    <td className="whitespace-nowrap">{h.date}</td>
                    <td className="min-w-64"><p className="font-label-lg text-label-lg">{h.title}</p><p className="text-body-sm text-on-surface-variant">{h.sub}</p></td>
                    <td className={`whitespace-nowrap text-right font-label-lg ${h.amount.startsWith('+') ? 'text-primary' : ''}`}>{h.amount}</td>
                    <td><StatusBadge status={h.status} /></td>
                    <td>{h.paymentId ? <button type="button" className="btn-secondary btn-sm" onClick={() => setSplitFor(state.payments.find((p) => p.id === h.paymentId))}>View Split Details<Icon name="arrow_forward" size={16} /></button> : <span className="text-outline">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <SplitModal payment={splitFor} onClose={() => setSplitFor(null)} title="Payment Split Ledger" subtitle={splitFor && `Disbursement batch #${splitFor.batch} • Total escrow: ${inr(splitFor.amount, 2)}`} />
    </main>
  );
}
