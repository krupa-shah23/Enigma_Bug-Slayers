import { useState } from 'react';
import { useApp } from '../../state/AppState.jsx';
import { Badge, Field, Icon, PageHeader } from '../../components/ui.jsx';

const CATEGORIES = ['Dry Recyclables', 'Compost / Wet Waste', 'E-waste', 'Hazardous'];

export default function LogContribution() {
  const { state, actions } = useApp();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [weight, setWeight] = useState('');
  const [saved, setSaved] = useState(null);
  const value = Number(weight);
  const valid = value > 0 && value <= 500;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    actions.logContribution({ category, kg: value });
    setSaved({ category, kg: value });
    setWeight('');
  };

  return (
    <main className="page stack">
      <PageHeader eyebrow="Residential Portal • Doorstep Verification" title="Log Waste Contribution" subtitle="Record segregated waste weigh-in for residential maintenance credit offset." />
      <div className="grid items-start gap-space-lg lg:grid-cols-5">
        <section className="card stack !gap-space-md lg:col-span-2">
          <div className="flex items-center gap-space-md">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-container-low text-primary-container"><Icon name="scale" size={24} /></span>
            <div><h2 className="h-section">Weigh-in Submission</h2><p className="text-body-sm text-on-surface-variant">Instant ledger verification</p></div>
          </div>
          <form onSubmit={submit} className="flex flex-col gap-space-md">
            <Field label="Material Category"><select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
            <Field label="Weight" hint="Enter verified weight from doorstep scale (max 500 kg).">
              <div className="relative">
                <input className="input pr-12" type="number" inputMode="decimal" min="0" step="0.1" placeholder="0.0" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-label-md text-label-md text-outline">kg</span>
              </div>
            </Field>
            <button type="submit" className="btn-primary btn-lg" disabled={!valid}><Icon name="check_circle" size={20} />Submit Weigh-in Record</button>
          </form>
          {saved && (
            <p className="rise flex items-start gap-space-sm rounded-lg bg-primary-fixed/30 p-space-md text-body-md text-primary"><Icon name="task_alt" size={20} fill />Weigh-in captured: {saved.kg} kg of {saved.category} added to your ledger.</p>
          )}
        </section>

        <section className="card !p-0 lg:col-span-3">
          <div className="flex items-end justify-between gap-space-md p-space-lg pb-space-md">
            <div className="flex items-center gap-space-md"><Icon name="receipt_long" className="text-primary-container" size={26} /><div><h2 className="h-section">My Recent Logs</h2><p className="text-body-sm text-on-surface-variant">Validated doorstep collections</p></div></div>
            <Badge tone="neutral">{state.contributions.length} Entries</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="tbl">
              <thead><tr><th>Date</th><th>Category</th><th className="text-right">Weight (kg)</th><th>Status</th></tr></thead>
              <tbody>
                {state.contributions.slice(0, 8).map((c) => (
                  <tr key={c.id}>
                    <td>{c.date}</td><td className="font-label-lg">{c.category}</td><td className="text-right">{c.kg} kg</td>
                    <td><Badge tone="success" icon="verified">Verified</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
