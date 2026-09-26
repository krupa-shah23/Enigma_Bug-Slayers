import ProfileForm from '../../components/ProfileForm.jsx';
import { Toggle } from '../../components/ui.jsx';
import { useApp } from '../../state/AppState.jsx';

export default function Profile() {
  const { state, actions } = useApp();
  return (
    <ProfileForm role="Bhangarwala" title="Scrape Collector Partner Profile" subtitle="Manage collector identity, vehicle parameters, and dispatch availability."
      fields={[
        { key: 'name', label: 'Full Name', icon: 'person' },
        { key: 'phone', label: 'Phone Number', icon: 'call', type: 'tel' },
        { key: 'vehicle', label: 'Vehicle Type', icon: 'electric_rickshaw' },
        { key: 'area', label: 'Area Note', icon: 'location_on' },
      ]}
      extra={<div className="flex items-center justify-between rounded-lg bg-surface-container-low/60 p-space-md"><div><p className="font-label-lg text-label-lg">Available for Scrap Dispatches</p><p className="text-body-sm text-on-surface-variant">{state.bhang.online ? 'Online - Ready for pickups' : 'Offline - not receiving lots'}</p></div><Toggle checked={state.bhang.online} onChange={actions.setOnline} label="Toggle Dispatch Availability" /></div>}
    />
  );
}
