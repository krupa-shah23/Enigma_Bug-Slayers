import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../../components/index.jsx';

export default function NewContract() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');
  const [society, setSociety] = useState('Green Valley Heights');
  const [material, setMaterial] = useState('Compost / Organic Waste');
  const [volume, setVolume] = useState('1200');

  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice(`New Contract issued successfully for ${society} (${volume} kg/mo)!`);
    setTimeout(() => {
      setNotice('');
      navigate('/ngo/contracts');
    }, 2000);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased flex flex-col justify-between min-h-screen">
      <Navbar variant="Ngo" />
      <main className="w-full pt-16 bg-surface flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs mb-6">
            <Link to="/ngo/contracts" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to Contracts</span>
            </Link>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-gray-100">
              <h1 className="font-headline-lg text-2xl font-bold text-on-surface">Draft New Collection Contract</h1>
              <p className="font-body-md text-xs text-on-surface-variant mt-1">
                Establish institutional governance and material recovery terms with a partner society.
              </p>
            </div>

            {notice && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>{notice}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="societySelect">Target Partner Society</label>
                <select
                  id="societySelect"
                  value={society}
                  onChange={(e) => setSociety(e.target.value)}
                  className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:bg-white focus:outline-none"
                >
                  <option value="Green Valley Heights">Green Valley Heights (Sector 54)</option>
                  <option value="Crestview Towers">Crestview Towers (Sector 62)</option>
                  <option value="Palm Meadows Enclave">Palm Meadows Enclave (Sector 48)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="materialType">Primary Material Stream</label>
                <select
                  id="materialType"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:bg-white focus:outline-none"
                >
                  <option value="Compost / Organic Waste">Compost / Organic Waste</option>
                  <option value="Dry Recyclables (Paper/Plastic)">Dry Recyclables (Paper/Plastic)</option>
                  <option value="E-Waste & Metals">E-Waste & Metals</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="volCommitment">Monthly Guaranteed Volume (kg)</label>
                <input
                  id="volCommitment"
                  type="number"
                  required
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <Link
                  to="/ngo/contracts"
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0d631b] hover:bg-[#0b4d16] shadow-sm cursor-pointer"
                >
                  Issue Contract Proposal
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
