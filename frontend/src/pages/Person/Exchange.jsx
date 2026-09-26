import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';
import { api } from '../../services/api';

export default function Exchange() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('ewaste');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get('/p2p/requests');
      if (res.data.success) {
        setRequests(res.data.data.requests || []);
      }
    } catch (err) {
      console.error('Failed to fetch P2P requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!description.trim()) {
      setErrorMsg('Description is required');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/p2p/requests', {
        description,
        category,
      });

      if (res.data.success) {
        setDescription('');
        fetchRequests();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error?.message || 'Failed to post request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await api.patch(`/p2p/requests/${id}/cancel`);
      if (res.data.success) {
        fetchRequests();
      }
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Cancel failed');
    }
  };

  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">ReWaste</span>
          <Navbar variant="Person" className="hidden md:flex items-center gap-gutter">
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/societies">All Societies</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link>
            <Link className="transition-colors py-1 text-primary-container font-headline-sm" to="/exchange">Exchange</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link>
          </Navbar>
        </div>
      </header>

      <main className="w-full pt-16 bg-[#F5F7F6]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold">P2P Waste Exchange</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Post recyclable lots directly to local licensed bhangarwalas.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Create Form */}
            <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold mb-4">Create New Scrap Listing</h2>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{errorMsg}</div>
              )}

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-label-lg text-on-surface">Category</label>
                  <select
                    className="w-full bg-surface-container-low text-on-surface font-body-md rounded-lg p-3 outline-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="ewaste">E-waste & Appliances</option>
                    <option value="cardboard">Bulk Cardboard / Paper</option>
                    <option value="metal">Scrap Metal & Iron</option>
                    <option value="plastic">Mixed Plastics</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-label-lg text-on-surface">Description & Details</label>
                  <textarea
                    className="w-full bg-surface-container-low text-on-surface font-body-md rounded-lg p-3 outline-none resize-none"
                    placeholder="e.g. Old CRT monitor, copper wiring, approx 15kg"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <button
                  className="w-full h-11 bg-primary-container hover:bg-primary text-on-primary font-label-lg rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  disabled={submitting}
                  type="submit"
                >
                  <span className="material-symbols-outlined text-headline-sm">send</span>
                  <span>{submitting ? 'Posting...' : 'Post Request to Network'}</span>
                </button>
              </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">My Active Listings</h2>

              {loading ? (
                <p className="text-gray-500 text-sm">Loading listings...</p>
              ) : requests.length === 0 ? (
                <div className="bg-white p-6 rounded-xl text-center text-gray-500 border border-gray-100">
                  No active scrap listings found.
                </div>
              ) : (
                requests.map((req) => (
                  <div key={req._id} className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-xs font-bold text-gray-400 uppercase">{req.category}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${req.status === 'open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {req.status}
                      </span>
                    </div>

                    <p className="font-body-md text-gray-800 font-medium">{req.description}</p>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <Link className="text-primary font-semibold text-sm hover:underline" to={`/exchange/${req._id}/quotes`}>
                        View Quotes &rarr;
                      </Link>

                      {req.status === 'open' && (
                        <button
                          onClick={() => handleCancel(req._id)}
                          className="text-red-600 hover:text-red-800 text-xs font-semibold"
                        >
                          Cancel Request
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
