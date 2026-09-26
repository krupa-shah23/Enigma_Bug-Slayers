import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../state/AppState.jsx';
import { Avatar, Icon, Modal, PageHeader, Pills, StatusBadge } from '../../components/ui.jsx';
import { inr } from '../../lib/format.js';

export default function Contracts() {
  const { state, actions } = useApp();
  const [filter, setFilter] = useState('All');
  const [openId, setOpenId] = useState(null);
  const [qty, setQty] = useState('');
  const [rate, setRate] = useState('');
  const soc = (id) => state.societies.find((s) => s.id === id);
  const rows = state.contracts.filter((c) => filter === 'All' || c.status === filter);
  const count = (s) => (s === 'All' ? state.contracts.length : state.contracts.filter((c) => c.status === s).length);
  const c = state.contracts.find((x) => x.id === openId);
  const open = (x) => { setOpenId(x.id); setQty(String(x.qty)); setRate(String(x.rate)); };
  const live = c && (c.status === 'Active' || c.status === 'Offered');

  return (
    <main className="page stack">
      <PageHeader eyebrow="Operations Ledger • Institutional Agreements" title="Contract Management" actions={<Link to="/ngo/contracts/new" className="btn-primary"><Icon name="add" size={18} />Post New Contract</Link>} />
      <Pills value={filter} onChange={setFilter} options={['All', 'Offered', 'Active', 'Completed', 'Cancelled'].map((s) => ({ value: s, label: s, count: count(s) }))} />
      <section className="card !p-0"><div className="overflow-x-auto"><table className="tbl">
        <thead><tr><th>Society</th><th>Material</th><th className="text-right">Quantity</th><th className="text-right">Rate</th><th>Status</th><th>Last Collection</th><th>Actions</th></tr></thead>
        <tbody>{rows.map((x) => (
          <tr key={x.id}>
            <td><div className="flex items-center gap-space-sm"><Avatar name={soc(x.societyId).name} size={36} /><div><p className="font-label-lg text-label-lg">{soc(x.societyId).name}</p><p className="text-body-sm text-on-surface-variant">{soc(x.societyId).short}</p></div></div></td>
            <td>{x.material}</td><td className="whitespace-nowrap text-right">{x.qty.toLocaleString('en-IN')} kg/mo</td><td className="whitespace-nowrap text-right">{inr(x.rate, 2)}/kg</td>
            <td><StatusBadge status={x.status} /></td><td className="whitespace-nowrap">{x.last}</td>
            <td><button type="button" className="btn-secondary btn-sm" onClick={() => open(x)}>{x.status === 'Active' ? 'Manage' : 'View Details'}<Icon name="chevron_right" size={16} /></button></td>
          </tr>))}
          {rows.length === 0 && <tr><td colSpan={7} className="py-space-xl text-center text-on-surface-variant">No contracts in this state.</td></tr>}
        </tbody></table></div></section>

      <Modal open={!!c} onClose={() => setOpenId(null)} icon="description" wide title={c ? `${soc(c.societyId).name} - ${c.material.split(' /')[0]} Contract` : ''} subtitle={c && `${c.id} • ${soc(c.societyId).short}`}
        footer={c && live ? <><button type="button" className="btn-danger" onClick={() => { actions.setContractStatus(c.id, 'Cancelled'); setOpenId(null); }}>Cancel Contract</button><button type="button" className="btn-secondary" onClick={() => { actions.setContractStatus(c.id, 'Completed'); setOpenId(null); }}>Complete Contract</button></> : <button type="button" className="btn-primary" onClick={() => setOpenId(null)}>Close</button>}>
        {c && <div className="stack !gap-space-lg">
          <dl className="grid gap-space-md sm:grid-cols-2">{[['Status', <StatusBadge key="s" status={c.status} />], ['Target Material', c.material], ['Agreed Quantity', `${c.qty.toLocaleString('en-IN')} kg/mo`], ['Agreed Rate', `${inr(c.rate, 2)}/kg`], ['Est. Monthly Payout', inr(c.qty * c.rate)], ['Last Logged Run', c.last]].map(([k, v]) => <div key={k} className="rounded-lg bg-surface-container-low/60 p-space-md"><dt className="eyebrow">{k}</dt><dd className="mt-1 font-headline-sm text-headline-sm">{v}</dd></div>)}</dl>
          {live && <div><h3 className="h-card mb-space-sm flex items-center gap-1"><Icon name="pending_actions" size={20} />Renegotiate Offer Terms</h3>
            <div className="grid items-end gap-space-md sm:grid-cols-3"><label className="field"><span className="label">Proposed Monthly Volume (kg)</span><input className="input" type="number" value={qty} onChange={(e) => setQty(e.target.value)} /></label><label className="field"><span className="label">Offered Unit Rate (₹/kg)</span><input className="input" type="number" step="0.05" value={rate} onChange={(e) => setRate(e.target.value)} /></label><button type="button" className="btn-primary" disabled={!(Number(qty) > 0 && Number(rate) > 0)} onClick={() => { actions.updateContract(c.id, { qty: Number(qty), rate: Number(rate) }); }}>Save Terms</button></div>
            <p className="mt-space-sm flex items-center gap-1.5 text-body-sm text-on-surface-variant"><Icon name="verified_user" size={16} />ReWaste Smart Protocol #{c.id}: changes execute on signature by both parties.</p></div>}
        </div>}
      </Modal>
    </main>
  );
}
