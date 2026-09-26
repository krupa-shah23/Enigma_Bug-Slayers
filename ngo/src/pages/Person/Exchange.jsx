import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../../components/index.jsx';

export default function Exchange() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');
  const [category, setCategory] = useState('E-Waste');
  const [weight, setWeight] = useState('15');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice(`Scrap Listing created successfully for ${category} (${weight}kg)! Local Bhangarwalas notified.`);
    setDescription('');
    setTimeout(() => setNotice(''), 4000);
  };

  return (
    <div className="bg-[#f8faf9] font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      <Navbar variant="Person" />

      <main className="w-full pt-16 bg-[#f8faf9] flex-1">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-label-sm text-xs text-primary uppercase tracking-wider font-bold">Direct Material Transfer</span>
            </div>
            <h1 className="font-headline-xl text-3xl font-bold text-on-surface tracking-tight">P2P Waste Exchange</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Post recyclable lots directly to local licensed bhangarwalas & collectors.</p>
          </div>

          {notice && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>{notice}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Create Listing Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[24px]">post_add</span>
                  <h2 className="font-headline-md text-xl font-bold text-on-surface">Create New Scrap Listing</h2>
                </div>
                <span className="font-label-sm text-xs text-on-surface-variant bg-gray-100 px-3 py-1 rounded-full font-semibold">Network Verified</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">Select Scrap Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['E-Waste', 'Metal Scrap', 'Paper / Cardboard', 'Plastic Batch', 'Batteries', 'Glass / Bottles'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          category === cat
                            ? 'bg-[#0d631b] text-white border-[#0d631b] shadow-xs'
                            : 'bg-gray-50 border-gray-200 text-on-surface-variant hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1" htmlFor="weight">Estimated Weight (kg)</label>
                    <input
                      id="weight"
                      type="number"
                      required
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1" htmlFor="preferredTime">Preferred Pickup Window</label>
                    <select id="preferredTime" className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:bg-white focus:outline-none cursor-pointer">
                      <option>Today Afternoon (2 PM - 5 PM)</option>
                      <option>Tomorrow Morning (9 AM - 12 PM)</option>
                      <option>Weekend Slot</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1" htmlFor="desc">Item Description / Condition</label>
                  <textarea
                    id="desc"
                    rows={3}
                    required
                    placeholder="e.g. Old CRT monitor, copper wiring, small appliances..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-[#0d631b] hover:bg-[#0b4d16] text-white font-label-lg text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">publish</span>
                  <span>Publish Scrap Listing to Network</span>
                </button>
              </form>
            </div>

            {/* Active Listings Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-xl font-bold text-on-surface">Your Active Listings</h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">3 Open</span>
              </div>

              {/* Listing Card 1 */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-400 font-bold">REQ-2025-0914</span>
                    <h4 className="font-headline-sm text-base font-bold text-on-surface mt-0.5">E-Waste & Electronics (18kg)</h4>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-label-sm text-xs font-bold px-2.5 py-0.5 rounded-full">3 Quotes Received</span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-600">Top Quote: <strong>₹ 2,400</strong></span>
                  <Link to="/exchange/1/quotes" className="text-xs font-bold text-primary hover:underline">
                    View Quotes →
                  </Link>
                </div>
              </div>

              {/* Listing Card 2 */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-400 font-bold">REQ-2025-0899</span>
                    <h4 className="font-headline-sm text-base font-bold text-on-surface mt-0.5">Copper Pipes & Brass (12kg)</h4>
                  </div>
                  <span className="bg-amber-100 text-amber-800 font-label-sm text-xs font-bold px-2.5 py-0.5 rounded-full">Under Review</span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-600">1 Quote Received</span>
                  <Link to="/exchange/1/quotes" className="text-xs font-bold text-primary hover:underline">
                    View Details →
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
