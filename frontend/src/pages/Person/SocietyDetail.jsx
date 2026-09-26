import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function PersonSocietyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const [society, setSociety] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/societies/${id}`);
        if (res.data.success) {
          setSociety(res.data.data.society);
        }
      } catch (err) {
        console.error('Failed to load society detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleJoin = async () => {
    try {
      setJoining(true);
      setMsg(null);
      const res = await api.post(`/societies/${id}/join`);
      if (res.data.success) {
        setMsg({ type: 'success', text: 'Successfully joined society!' });
        await refreshUser();
        setTimeout(() => navigate('/my-society'), 1000);
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error?.message || 'Failed to join society.' });
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center">Loading society details...</div>;
  }

  if (!society) {
    return <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center">Society not found.</div>;
  }

  const isMySociety = user?.societyId === society._id;

  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">ReWaste</span>
          <Navbar variant="Person" className="hidden md:flex items-center gap-gutter">
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/societies">All Societies</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link>
          </Navbar>
        </div>
      </header>

      <main className="w-full pt-16 bg-[#F5F7F6]">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
          <Link className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary-container font-label-lg transition-colors" to="/societies">
            <span className="material-symbols-outlined text-headline-sm">arrow_back</span>
            <span>Back to All Societies</span>
          </Link>

          <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-8 flex flex-col gap-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold">{society.name}</h1>
                <p className="inline-flex items-center gap-1.5 text-on-surface-variant font-body-md mt-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {society.area}
                </p>
              </div>

              <div className="bg-emerald-50 px-4 py-2 rounded-xl text-emerald-800 font-bold">
                Trust Score: {society.trustScore || 80}/100
              </div>
            </div>

            {msg && (
              <div className={`p-4 rounded-lg text-sm ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                {msg.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <span className="text-gray-500 text-xs font-semibold uppercase">Members</span>
                <p className="text-xl font-bold mt-1">{society.memberCount || 0} Registered</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <span className="text-gray-500 text-xs font-semibold uppercase">Collection Schedule</span>
                <p className="text-xl font-bold mt-1">Weekly Segregated Pickup</p>
              </div>
            </div>

            {!isMySociety ? (
              <button
                onClick={handleJoin}
                disabled={joining}
                className="w-full bg-primary-container hover:bg-primary text-on-primary font-label-lg h-12 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined">how_to_reg</span>
                <span>{joining ? 'Joining...' : 'Join This Society'}</span>
              </button>
            ) : (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-center font-semibold">
                You are currently a member of this society.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
