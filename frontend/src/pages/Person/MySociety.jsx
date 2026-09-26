import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function MySociety() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [society, setSociety] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMySociety = async () => {
    try {
      setLoading(true);
      const socRes = await api.get('/societies/my');
      if (socRes.data.success) {
        setSociety(socRes.data.data.society);

        // Fetch parallel data
        const [offRes, contribRes, leadRes] = await Promise.all([
          api.get('/societies/my/officers').catch(() => ({ data: {} })),
          api.get('/societies/my/contributions').catch(() => ({ data: {} })),
          api.get('/societies/my/leaderboard').catch(() => ({ data: {} })),
        ]);

        if (offRes.data?.success) setOfficers(offRes.data.data.officers || []);
        if (contribRes.data?.success) setContributions(contribRes.data.data.contributions || []);
        if (leadRes.data?.success) setLeaderboard(leadRes.data.data.leaderboard || []);
      }
    } catch (err) {
      console.error('Failed to load My Society:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMySociety();
  }, []);

  const handleVerifyContribution = async (id) => {
    try {
      const res = await api.post(`/societies/my/contributions/${id}/verify`, { verifiedKg: 10 });
      if (res.data.success) {
        fetchMySociety();
      }
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Verification failed');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center">Loading society dashboard...</div>;
  }

  if (!society) {
    return (
      <div className="min-h-screen bg-[#F5F7F6] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">You have not joined a society yet</h2>
        <p className="text-gray-600 mb-6">Browse available societies to join your residential hub.</p>
        <button
          onClick={() => navigate('/societies')}
          className="bg-primary-container text-on-primary px-6 py-3 rounded-lg font-bold hover:bg-primary"
        >
          Explore Societies
        </button>
      </div>
    );
  }

  const isOfficer = user?.societyRole === 'officer';

  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">ReWaste</span>
          <Navbar variant="Person" className="hidden md:flex items-center gap-gutter">
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/societies">All Societies</Link>
            <Link className="transition-colors py-1 text-primary-container font-headline-sm" to="/my-society">My Society</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link>
          </Navbar>
        </div>
      </header>

      <main className="w-full pt-16 bg-[#F5F7F6]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
          {/* Header */}
          <div className="w-full bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  {isOfficer ? 'Society Officer' : 'Resident Member'}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{society.name}</h1>
              <p className="text-gray-600 mt-1">{society.area}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-semibold text-gray-500 uppercase">Trust Score</span>
                <p className="text-2xl font-bold text-emerald-700">{society.trustScore || 80}/100</p>
              </div>
              {isOfficer && (
                <button
                  onClick={() => navigate('/my-society/settings')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">settings</span>
                  Settings
                </button>
              )}
            </div>
          </div>

          {/* Officers List */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Society Officers</h2>
            {officers.length === 0 ? (
              <p className="text-sm text-gray-500">No designated officers yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {officers.map((off) => (
                  <div key={off._id} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{off.name}</p>
                      <p className="text-xs text-gray-500">{off.email}</p>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Officer</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Society Contributions Verification (Officer Gated UI) */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Society Contributions Ledger</h2>
              {isOfficer && <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-1 rounded">Officer Actions Enabled</span>}
            </div>

            {contributions.length === 0 ? (
              <p className="text-sm text-gray-500">No member contributions logged yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600">
                      <th className="py-2.5 px-4">User</th>
                      <th className="py-2.5 px-4">Category</th>
                      <th className="py-2.5 px-4">Promised</th>
                      <th className="py-2.5 px-4">Status</th>
                      {isOfficer && <th className="py-2.5 px-4 text-right">Action</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {contributions.map((c) => (
                      <tr key={c._id}>
                        <td className="py-3 px-4 font-medium">{c.userId?.name || 'Member'}</td>
                        <td className="py-3 px-4 uppercase">{c.category}</td>
                        <td className="py-3 px-4">{c.promisedKg} kg</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${c.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {c.status}
                          </span>
                        </td>
                        {isOfficer && (
                          <td className="py-3 px-4 text-right">
                            {c.status === 'pending' && (
                              <button
                                onClick={() => handleVerifyContribution(c._id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1 rounded font-semibold"
                              >
                                Verify
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
