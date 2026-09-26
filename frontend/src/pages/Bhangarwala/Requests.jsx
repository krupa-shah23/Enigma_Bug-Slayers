import { useState } from 'react';
import { useApp, useLiveOnce } from '../../state/AppState.jsx';
import { Badge, EmptyState, Icon, MapCanvas, Pin, Toggle } from '../../components/ui.jsx';
import { CATEGORY_ICON } from '../Person/Exchange.jsx';
import { inr } from '../../lib/format.js';

const SPOTS = [[62, 30], [30, 62], [72, 68], [42, 22], [82, 44]];

function LotCard({ lot, quote, onQuote }) {
  const [price, setPrice] = useState(String(lot.suggested));
  return (
    <article className="card card-hover rise stack !gap-space-md !p-space-md">
      <div className="flex items-start gap-space-md">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-surface-container-low text-primary-container"><Icon name={CATEGORY_ICON[lot.category]} size={32} fill /></span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-space-xs"><Badge tone="neutral">{lot.category}</Badge><span className="text-body-sm text-on-surface-variant">{quote ? `Bidded just now` : lot.expires}</span></div>
          <h3 className="h-card mt-1">Lot #{lot.id}: {lot.title}</h3>
          <p className="mt-0.5 flex flex-wrap gap-x-space-md text-body-sm text-on-surface-variant"><span className="flex items-center gap-1"><Icon name="near_me" size={14} />{lot.dist} km • {lot.address}</span><span className="flex items-center gap-1"><Icon name="scale" size={14} />{lot.kg} kg</span></p>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-surface-container-low/60 px-space-md py-space-sm text-body-sm"><span>{lot.items}</span><span className="font-label-md text-label-md text-primary">{lot.grade}</span></div>
      {quote ? (
        <p className="flex items-center gap-space-sm rounded-lg bg-primary-fixed/30 px-space-md py-space-sm font-label-lg text-label-lg text-primary"><Icon name="check_circle" size={20} fill />Quote Submitted ({inr(quote.price)}) — Awaiting Resident Selection</p>
      ) : (
        <form className="flex gap-space-sm" onSubmit={(e) => { e.preventDefault(); if (Number(price) > 0) onQuote(lot.id, Number(price)); }}>
          <div className="relative flex-1"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">₹</span><input className="input pl-8" type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} aria-label="Quote amount" /></div>
          <button type="submit" className="btn-primary" disabled={!(Number(price) > 0)}>Submit Quote<Icon name="arrow_forward" size={18} /></button>
        </form>
      )}
    </article>
  );
}

export default function Requests() {
  const { state, actions } = useApp();
  const online = state.bhang.online;
  const lots = state.lots.filter((l) => l.status === 'open');
  const quoteOf = (id) => state.quotes.find((q) => q.lotId === id && q.collectorId === 'ramesh');
  useLiveOnce('bh-broadcast', 6000, () => actions.broadcastLot(), online);

  return (
    <main className="page grid items-start gap-space-lg lg:grid-cols-5">
      <section className="stack !gap-space-md lg:sticky lg:top-24 lg:col-span-2">
        <MapCanvas className="h-[28rem]">
          <div className="absolute left-space-md top-space-md z-20 flex items-center gap-space-md rounded-lg bg-white px-space-md py-space-sm shadow"><div><p className="eyebrow">Status</p><p className={`font-label-lg text-label-lg ${online ? 'text-primary' : 'text-outline'}`}>{online ? 'ONLINE' : 'OFFLINE'}</p></div><Toggle checked={online} onChange={actions.setOnline} label="Toggle Online Status" /></div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary-container/50 bg-primary-container/5" />
          <Pin x={50} y={50} icon="local_shipping" label="You (Scrape Collector Hub)" tone="primary" pulse={online} />
          {online && lots.slice(0, 5).map((l, i) => <Pin key={l.id} x={SPOTS[i][0]} y={SPOTS[i][1]} icon={CATEGORY_ICON[l.category]} tone={quoteOf(l.id) ? 'warn' : 'accent'} label={`Lot #${l.id} (${l.kg} kg)`} />)}
        </MapCanvas>
        <p className="flex items-center gap-1.5 text-body-sm text-on-surface-variant"><Icon name="share_location" size={16} />Coverage: Sector 5 Riverside, Sector 54 &amp; Golf Course Rd</p>
      </section>
      <section className="stack !gap-space-md lg:col-span-3">
        <div className="flex items-end justify-between gap-space-md"><div><h1 className="h-title">Nearby Scrap Requests</h1><p className="muted">{online ? `${lots.length} Active in your zone • Live dispatch stream` : 'You are offline'}</p></div>
          <button type="button" className="btn-secondary btn-sm" onClick={() => actions.toast('Feed refreshed. You are up to date.', { tone: 'info' })}><Icon name="sync" size={16} />Refresh</button></div>
        {!online ? <div className="card"><EmptyState icon="wifi_off" title="You're offline" text="Go online to receive scrap lots broadcast near you." /></div>
          : lots.map((l) => <LotCard key={l.id} lot={l} quote={quoteOf(l.id)} onQuote={actions.submitQuote} />)}
      </section>
    </main>
  );
}
