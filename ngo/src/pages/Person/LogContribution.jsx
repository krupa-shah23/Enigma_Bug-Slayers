import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../../components/index.jsx';

export default function LogContribution() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');
  const [category, setCategory] = useState('Dry Recyclables (Paper/Plastic)');
  const [weight, setWeight] = useState('8.5');

  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice(`Waste contribution of ${weight} kg (${category}) logged successfully! Maintenance credit updated.`);
    setTimeout(() => {
      setNotice('');
      navigate('/home');
    }, 2000);
  };

  return (
    <div className="bg-[#f8faf9] font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      <Navbar variant="Person" />

      <main className="w-full pt-16 bg-[#f8faf9] flex-1">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[18px]">recycling</span>
              <span>Residential Portal • Doorstep Verification</span>
            </div>
            <h1 className="font-headline-xl text-3xl font-bold text-on-surface tracking-tight">Log Waste Contribution</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              Record segregated waste weigh-in for residential maintenance credit offset.
            </p>
          </div>

          {notice && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>{notice}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Box */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-primary flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">scale</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-base font-bold text-on-surface">Weigh-in Submission</h2>
                  <p className="font-body-sm text-xs text-on-surface-variant">Instant ledger verification</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5" id="wasteContributionForm">
                
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-sm font-semibold text-on-surface" htmlFor="wasteCategory">Material Category</label>
                  <select
                    id="wasteCategory"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-on-surface font-body-md text-sm rounded-xl py-3 px-4 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-colors cursor-pointer font-medium"
                  >
                    <option value="Compost / Wet Waste">Compost / Wet Waste</option>
                    <option value="Dry Recyclables (Paper/Plastic)">Dry Recyclables (Paper/Plastic)</option>
                    <option value="E-waste">E-waste</option>
                    <option value="Hazardous / Bio Medical">Hazardous / Bio Medical</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-sm font-semibold text-on-surface" htmlFor="weightKg">Weigh-in Weight (kg)</label>
                  <input
                    id="weightKg"
                    type="number"
                    step="0.1"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-on-surface focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-[#0d631b] hover:bg-[#0b4d16] text-white font-label-lg text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span className="material-symbols-outlined text-[20px]">check</span>
                  <span>Submit Weigh-in Record</span>
                </button>
              </form>
            </div>

            {/* History Table Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-4">Recent Verified Weigh-ins</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-xs uppercase font-bold text-gray-400">
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4 text-right">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/60">
                      <td className="py-3 px-4 font-medium">Oct 21, 2025</td>
                      <td className="py-3 px-4 text-gray-700">Compost / Wet Waste</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-800">14.2 kg</td>
                    </tr>
                    <tr className="hover:bg-gray-50/60">
                      <td className="py-3 px-4 font-medium">Oct 17, 2025</td>
                      <td className="py-3 px-4 text-gray-700">E-waste</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-800">3.5 kg</td>
                    </tr>
                    <tr className="hover:bg-gray-50/60">
                      <td className="py-3 px-4 font-medium">Oct 12, 2025</td>
                      <td className="py-3 px-4 text-gray-700">Dry Recyclables</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-800">6.8 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
