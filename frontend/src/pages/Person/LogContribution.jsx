import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function LogContribution() {
  const { user } = useAuth();

  const [category, setCategory] = useState('');
  const [promisedKg, setPromisedKg] = useState('');
  const [societyId, setSocietyId] = useState(user?.societyId || '');
  const [societies, setSocieties] = useState([]);
  const [myLogs, setMyLogs] = useState([]);
  
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchLogsAndSocieties = async () => {
    try {
      // Fetch societies list to allow picking if not set
      const socRes = await api.get('/societies');
      if (socRes.data.success) {
        setSocieties(socRes.data.data.societies || []);
        if (!societyId && socRes.data.data.societies?.length > 0) {
          setSocietyId(socRes.data.data.societies[0]._id);
        }
      }

      // Fetch my contributions
      const logsRes = await api.get('/contributions/me');
      if (logsRes.data.success) {
        setMyLogs(logsRes.data.data.contributions || []);
      }
    } catch (err) {
      console.error('Failed to load logs/societies:', err);
    }
  };

  useEffect(() => {
    fetchLogsAndSocieties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!category || !promisedKg || !societyId) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/contributions', {
        societyId,
        category,
        promisedKg: Number(promisedKg),
      });

      if (res.data.success) {
        setSuccessMsg('Contribution logged successfully!');
        setCategory('');
        setPromisedKg('');
        fetchLogsAndSocieties();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error?.message || 'Failed to submit weigh-in record.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">ReWaste</span>
          </div>
          <Navbar variant="Person" className="hidden md:flex items-center gap-gutter">
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/societies">All Societies</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link>
          </Navbar>
        </div>
      </header>

      <main className="w-full pt-16 bg-[#F5F7F6] flex-1">
        <div className="max-w-7xl mx-auto w-full px-6 py-8">
          <div className="mb-8">
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">Log Waste Contribution</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Record segregated waste weigh-in for residential maintenance credit offset.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-4">Weigh-in Submission</h2>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>{successMsg}</span>
                </div>
              )}

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-label-lg text-on-surface" htmlFor="societyId">Target Society</label>
                  <select
                    className="w-full bg-surface-container-low text-on-surface font-body-md rounded-lg p-3 outline-none"
                    id="societyId"
                    value={societyId}
                    onChange={(e) => setSocietyId(e.target.value)}
                    required
                  >
                    <option value="">Select a society</option>
                    {societies.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.area})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-label-lg text-on-surface" htmlFor="wasteCategory">Material Category</label>
                  <select
                    className="w-full bg-surface-container-low text-on-surface font-body-md rounded-lg p-3 outline-none"
                    id="wasteCategory"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="dry">Dry Recyclables (Paper/Plastic)</option>
                    <option value="wet">Compost / Wet Waste</option>
                    <option value="ewaste">E-waste</option>
                    <option value="hazardous">Hazardous / Glass</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-label-lg text-on-surface" htmlFor="weightInput">Promised Weight (kg)</label>
                  <input
                    className="w-full bg-surface-container-low font-body-lg text-on-surface p-3 rounded-lg outline-none"
                    id="weightInput"
                    min="0.1"
                    placeholder="0.0"
                    required
                    step="0.1"
                    type="number"
                    value={promisedKg}
                    onChange={(e) => setPromisedKg(e.target.value)}
                  />
                </div>

                <button
                  className="w-full mt-4 h-11 bg-primary-container hover:bg-primary text-on-primary font-label-lg rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  disabled={submitting}
                  type="submit"
                >
                  <span className="material-symbols-outlined text-headline-sm">check_circle</span>
                  <span>{submitting ? 'Submitting...' : 'Submit Weigh-in Record'}</span>
                </button>
              </form>
            </div>

            {/* Table Column */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">My Logged Contributions</h2>
                <span className="font-label-sm text-label-sm text-primary bg-emerald-50 px-3 py-1 rounded-full">{myLogs.length} Entries</span>
              </div>

              {myLogs.length === 0 ? (
                <p className="text-gray-500 text-sm py-8 text-center">No contributions logged yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-body-md text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Promised</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {myLogs.map((log) => (
                        <tr key={log._id}>
                          <td className="py-3 px-4">{new Date(log.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-4 font-medium uppercase">{log.category}</td>
                          <td className="py-3 px-4">{log.promisedKg} kg</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${log.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
