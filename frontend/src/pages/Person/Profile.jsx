import ProfileForm from '../../components/ProfileForm.jsx';
import { Badge } from '../../components/ui.jsx';

export default function Profile() {
  return (
    <ProfileForm role="Person" title="Resident Profile" subtitle="Manage your account credentials and contact details."
      fields={[
        { key: 'name', label: 'Full Name', icon: 'person' },
        { key: 'phone', label: 'Phone Number', icon: 'call', type: 'tel' },
        { key: 'email', label: 'Email Address', icon: 'mail', readOnly: true, hint: 'Email is linked to your society record and cannot be changed.' },
      ]}
      extra={<div className="flex flex-wrap gap-space-sm"><Badge tone="success" icon="verified">Verified Identity</Badge><Badge tone="neutral" icon="home">Flat C-402 • Green Valley Heights</Badge><Badge tone="info">Committee President</Badge></div>}
    />
  );
}
