import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../state/AppState.jsx';
import { LOT_CATEGORIES } from '../../data/seed.js';
import { Badge, EmptyState, Field, Icon, PageHeader } from '../../components/ui.jsx';

export const CATEGORY_ICON = { 'E-waste': 'devices', 'Metals & Brass': 'plumbing', 'Paper & Cardboard': 'inventory_2', Plastics: 'water_bottle', 'Glass & Bottles': 'liquor', 'Other Scrap': 'recycling' };
const STEP_STATUS = ['Collector En Route', 'Collector Arrived', 'Lot Picked Up'];

export function lotStatus(lot, quotes, job) {
  if (lot.status === 'completed') return { label: 'Completed', tone: 'success' };
  if (lot.status === 'accepted') return { label: job ? STEP_STATUS[job.step] : 'Scheduled', tone: 'info' };
  if (quotes === 0) return { label: 'Awaiting Quotes', tone: 'neutral' };
  return quotes === 1 ? { label: 'Pending Review', tone: 'warn' } : { label: 'Receiving Quotes', tone: 'success' };
}

export default function Exchange() {
  const { state, actions } = useApp();
  const [desc, setDesc] = useState('Old CRT monitor, vintage radio, blender, assorted copper wiring and chargers. Approx 18kg.');
  const [category, setCategory] = useState('E-waste');
  const [photo, setPhoto] = useState(null);
  const mine = state.lots.filter((l) => l.ownerId === 'ananya');

  useEffect(() => () => photo && URL.revokeObjectURL(photo.url), [photo]);

  const pickPhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhoto({ name: file.name, size: `${(file.size / 1048576).toFixed(1)} MB`, url: URL.createObjectURL(file) });
    e.target.value = '';
  };
  const submit = (e) => {
    e.preventDefault();
    if (!desc.trim()) return;
    actions.postRequest({ desc: desc.trim(), category, photoName: photo?.name });
    setDesc('');
    setPhoto(null);
  };

  return (
    <main className="page stack">
      <PageHeader eyebrow="Direct Material Transfer" title="P2P Waste Exchange" subtitle="Post recyclable lots directly to local licensed scrape collectors & collectors." />
      <div className="grid items-start gap-space-lg lg:grid-cols-5">
        <section className="card stack !gap-space-md lg:col-span-3">
          <div className="flex items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-container-low text-primary-container"><Icon name="post_add" size={24} /></span><h2 className="h-section">Create New Scrap Listing</h2></div>
            <Badge tone="success" icon="verified">Network Verified</Badge>
          </div>
          <form onSubmit={submit} className="flex flex-col gap-space-md">
            <div className="field">
              <div className="flex items-center justify-between"><span className="label">Lot Photography</span><span className="text-body-sm text-on-surface-variant">{photo ? '1 file attached' : 'Optional'}</span></div>
              {photo ? (
                <div className="flex items-center gap-space-md rounded-lg border border-outline-variant/50 p-space-sm">
                  <img src={photo.url} alt="Lot preview" className="h-14 w-14 rounded-md object-cover" />
                  <div className="min-w-0 flex-1"><p className="truncate font-label-lg text-label-lg">{photo.name}</p><p className="text-body-sm text-on-surface-variant">{photo.size} • Uploaded ready</p></div>
                  <button type="button" aria-label="Remove photo" className="btn-ghost btn-sm !px-1.5" onClick={() => setPhoto(null)}><Icon name="delete" size={20} /></button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed border-outline-variant bg-surface-container-low/50 px-space-md py-space-lg text-center transition-colors hover:bg-surface-container-low">
                  <Icon name="cloud_upload" size={28} className="text-primary-container" />
                  <span className="font-label-lg text-label-lg">Drag &amp; drop photos of scrap materials or <span className="text-primary underline">Browse files</span></span>
                  <span className="text-body-sm text-on-surface-variant">(PNG, JPG)</span>
                  <input type="file" accept="image/*" className="sr-only" onChange={pickPhoto} />
                </label>
              )}
            </div>
            <Field label="Description" hint="Include items & approximate weight in kg."><textarea className="input" rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. Old CRT monitor, vintage radio, blender, assorted copper wiring and chargers. Approx 18kg." /></Field>
            <Field label="Material Category"><select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>{LOT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
            <button type="submit" className="btn-primary btn-lg" disabled={!desc.trim()}><Icon name="send" size={18} />Post Request to Network</button>
          </form>
        </section>

        <section className="stack !gap-space-md lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm"><h2 className="h-section">My Active Requests</h2><Badge tone="neutral">{mine.length}</Badge></div>
            <span className="flex items-center gap-1.5 font-label-md text-label-md text-primary"><span className="h-2 w-2 animate-pulse rounded-full bg-primary-container" />Real-time Feed</span>
          </div>
          {mine.length === 0 && <div className="card"><EmptyState icon="inventory_2" title="No requests yet" text="Post your first scrap lot to start receiving quotes." /></div>}
          {mine.map((lot) => {
            const quotes = state.quotes.filter((q) => q.lotId === lot.id).length;
            const job = state.jobs.find((j) => j.id === lot.jobId);
            const status = lotStatus(lot, quotes, job);
            return (
              <article key={lot.id} className="card card-hover rise flex flex-col gap-space-md !p-space-md">
                <div className="flex items-start gap-space-md">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-surface-container-low text-primary-container"><Icon name={CATEGORY_ICON[lot.category]} size={28} fill /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-space-xs"><span className="font-label-md text-label-md text-outline">{lot.reqId}</span><Badge tone={status.tone}>{status.label}</Badge></div>
                    <h3 className="h-card mt-0.5 line-clamp-1">{lot.title}</h3>
                    <p className="line-clamp-2 text-body-sm text-on-surface-variant">{lot.desc} ({lot.kg} kg)</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-space-sm border-t border-outline-variant/40 pt-space-md">
                  {lot.status === 'open' && <span className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant"><Icon name="local_offer" size={16} className="text-primary" />{quotes} {quotes === 1 ? 'Quote' : 'Quotes'} Received</span>}
                  {lot.status === 'accepted' && <span className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant"><Icon name="task_alt" size={16} className="text-primary" />Quote Accepted{job?.step === 0 ? ' • Pickup: Today, 4 PM' : ''}</span>}
                  {lot.status === 'completed' && <span className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant"><Icon name="verified" size={16} className="text-primary" />Settled to your ledger</span>}
                  {lot.status === 'open' && <Link className="btn-primary btn-sm" to={`/exchange/${lot.reqId}/quotes`}>View Quotes<Icon name="arrow_forward" size={16} /></Link>}
                  {lot.status === 'accepted' && <Link className="btn-primary btn-sm" to={`/exchange/${lot.jobId}/tracking`}><Icon name="near_me" size={16} />Track Pickup</Link>}
                  {lot.status === 'completed' && <Link className="btn-secondary btn-sm" to="/history">View in History</Link>}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
