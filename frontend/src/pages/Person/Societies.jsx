import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';
import { api } from '../../services/api';

export default function Societies() {
  const navigate = useNavigate();
  const [societies, setSocieties] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSocieties = async () => {
    try {
      setLoading(true);
      const res = await api.get('/societies');
      if (res.data.success) {
        setSocieties(res.data.data.societies || []);
      }
    } catch (err) {
      console.error('Failed to fetch societies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocieties();
  }, []);

  const filtered = societies.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">ReWaste</span>
          </div>
          <Navbar variant="Person" className="hidden md:flex items-center gap-gutter">
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link>
            <Link className="transition-colors py-1 text-primary-container font-headline-sm" to="/societies">All Societies</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link>
          </Navbar>
        </div>
      </header>

      <main className="w-full pt-16 bg-[#F5F7F6]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="w-full mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-xl shadow-sm">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container-low font-body-md text-on-surface outline-none"
                placeholder="Search societies by name or area..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading registered societies...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No societies found matching your search.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {filtered.map((soc) => (
                <div
                  key={soc._id}
                  onClick={() => navigate(`/societies/${soc._id}`)}
                  className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between border border-gray-100"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="font-headline-md text-headline-md text-on-surface font-semibold hover:text-primary-container">{soc.name}</h2>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#E8F5E9] text-[#2E7D32]">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        {soc.trustScore || 80} Trust
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mb-4">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {soc.area}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                    <span>{soc.memberCount || 0} Members</span>
                    <span className="text-primary font-semibold">View Details &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
