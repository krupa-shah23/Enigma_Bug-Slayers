import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function SocietySettings() {
  const { user } = useAuth();

  const [society, setSociety] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [collectionFrequency, setCollectionFrequency] = useState('Bi-weekly');

  // Register Society form state
  const [newSocName, setNewSocName] = useState('');
  const [newSocArea, setNewSocArea] = useState('');
  const [newSocFreq, setNewSocFreq] = useState('Bi-weekly');
  const [newOfficerEmail, setNewOfficerEmail] = useState('');

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const [socRes, offRes] = await Promise.all([
        api.get('/societies/my').catch(() => ({ data: {} })),
        api.get('/societies/my/officers').catch(() => ({ data: {} })),
      ]);

      if (socRes.data?.success) {
        setSociety(socRes.data.data.society);
        setCollectionFrequency(socRes.data.data.society?.collectionFrequency || 'Bi-weekly');
      }
      if (offRes.data?.success) {
        setOfficers(offRes.data.data.officers || []);
      }
    } catch (err) {
      console.error('Failed to load society settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await api.patch('/societies/my/settings', {
        collectionFrequency,
      });
      if (res.data.success) {
        setMsg({ type: 'success', text: 'Society parameters updated successfully!' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error?.message || 'Update failed' });
    }
  };

  const handleAddOfficer = async (e) => {
    e.preventDefault();
    if (!newOfficerEmail) return;
    setMsg(null);
    try {
      const res = await api.post('/societies/my/officers', { email: newOfficerEmail });
      if (res.data.success) {
        setNewOfficerEmail('');
        setMsg({ type: 'success', text: 'Officer added successfully!' });
        fetchSettings();
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error?.message || 'Failed to add officer' });
    }
  };

  const handleRemoveOfficer = async (officerId) => {
    if (!confirm('Remove this officer?')) return;
    setMsg(null);
    try {
      const res = await api.delete(`/societies/my/officers/${officerId}`);
      if (res.data.success) {
        setMsg({ type: 'success', text: 'Officer removed.' });
        fetchSettings();
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error?.message || 'Failed to remove officer' });
    }
  };

  const handleCreateSociety = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await api.post('/societies', {
        name: newSocName,
        area: newSocArea,
        collectionFrequency: newSocFreq,
      });

      if (res.data.success) {
        setMsg({ type: 'success', text: 'New society created successfully!' });
        setNewSocName('');
        setNewSocArea('');
        fetchSettings();
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error?.message || 'Failed to create society' });
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center">Loading settings...</div>;
  }

  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">ReWaste</span>
          <Navbar variant="Person" className="hidden md:flex items-center gap-gutter">
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link>
            <Link className="transition-colors py-1 text-primary-container font-headline-sm" to="/my-society/settings">Settings</Link>
          </Navbar>
        </div>
      </header>

      <main className="w-full pt-16 bg-[#F5F7F6]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
          <div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold">Society Settings & Governance</h1>
            <p className="text-gray-500 text-sm mt-1">Officer Portal • E08, E13, E15, E16, E17 Integration</p>
          </div>

          {msg && (
            <div className={`p-4 rounded-xl text-sm font-semibold ${msg.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
              {msg.text}
            </div>
          )}

          {/* Section 1: Update Society Settings (E13) */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Collection Frequency Settings (E13)</h2>
            <form onSubmit={handleUpdateSettings} className="flex flex-col sm:flex-row gap-4 items-center">
              <select
                className="flex-1 w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none"
                value={collectionFrequency}
                onChange={(e) => setCollectionFrequency(e.target.value)}
              >
                <option value="Weekly">Weekly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-primary-container hover:bg-primary text-on-primary font-bold rounded-lg cursor-pointer"
              >
                Save Settings
              </button>
            </form>
          </div>

          {/* Section 2: Officer Management (E15, E16, E17) */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Manage Officers (E15, E16, E17)</h2>

            {/* Add Officer */}
            <form onSubmit={handleAddOfficer} className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none"
                placeholder="User Email Address to promote to Officer"
                type="email"
                value={newOfficerEmail}
                onChange={(e) => setNewOfficerEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg cursor-pointer"
              >
                Promote Officer
              </button>
            </form>

            {/* Officers List */}
            <div className="divide-y divide-gray-100">
              {officers.map((off) => (
                <div key={off._id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{off.name}</p>
                    <p className="text-xs text-gray-500">{off.email}</p>
                  </div>

                  {off._id !== user?._id && (
                    <button
                      onClick={() => handleRemoveOfficer(off._id)}
                      className="text-red-600 hover:text-red-800 text-xs font-bold"
                    >
                      Remove Officer
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Register New Society (E08) */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Create / Register New Society (E08)</h2>
            <form onSubmit={handleCreateSociety} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Society Name</label>
                <input
                  className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none"
                  placeholder="e.g. Green Valley Towers"
                  value={newSocName}
                  onChange={(e) => setNewSocName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Area / Location</label>
                <input
                  className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none"
                  placeholder="e.g. Sector 42, Gurugram"
                  value={newSocArea}
                  onChange={(e) => setNewSocArea(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Default Frequency</label>
                <select
                  className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none"
                  value={newSocFreq}
                  onChange={(e) => setNewSocFreq(e.target.value)}
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary-container hover:bg-primary text-on-primary font-bold rounded-lg cursor-pointer"
                >
                  Register Society
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
