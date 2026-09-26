import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [impact, setImpact] = useState(null);

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        const res = await api.get('/person/impact');
        if (res.data.success) {
          setImpact(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch impact:', err);
      }
    };
    fetchImpact();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/person/login');
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
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link>
            <Link className="transition-colors py-1 text-primary-container font-headline-sm" to="/profile">Profile</Link>
          </Navbar>
        </div>
      </header>

      <main className="w-full pt-16 bg-[#F5F7F6]">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold">Resident Profile</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1 mb-8">Account information & circular impact metrics.</p>

          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 sm:p-8 flex flex-col gap-6 border border-gray-100">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-semibold uppercase">Full Name</span>
                <p className="text-lg font-bold text-gray-900">{user?.name}</p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-semibold uppercase">Email Address</span>
                <p className="text-lg font-bold text-gray-900">{user?.email}</p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-semibold uppercase">Phone Number</span>
                <p className="text-lg font-bold text-gray-900">{user?.phone || 'Not provided'}</p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-semibold uppercase">Role & Society Status</span>
                <p className="text-lg font-bold text-emerald-800 uppercase">
                  {user?.role} {user?.societyRole ? `(${user.societyRole})` : ''}
                </p>
              </div>
            </div>

            {/* Impact Metrics (E40) */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Personal Impact Summary (E40)</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-xl">
                  <span className="text-xs text-emerald-700 font-bold uppercase">Contributions Count</span>
                  <p className="text-2xl font-bold text-emerald-900 mt-1">{impact?.totalContributionsCount || 0}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl">
                  <span className="text-xs text-emerald-700 font-bold uppercase">Earned Credits</span>
                  <p className="text-2xl font-bold text-emerald-900 mt-1">₹{impact?.earningsTotal || 0}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
