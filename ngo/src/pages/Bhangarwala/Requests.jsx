import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../../components/index.jsx';

export default function Requests() {
  const navigate = useNavigate();
  const [hideToast, setHideToast] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [quoteNotice, setQuoteNotice] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [quotePrice, setQuotePrice] = useState('');

  const handleAcceptJob = (jobId) => {
    navigate('/bhangarwala/active-job');
  };

  const handleSendQuote = (e) => {
    e.preventDefault();
    setQuoteNotice(`Quote of ₹${quotePrice} submitted successfully for Listing #${selectedRequest?.id || 'EX-4092'}.`);
    setSelectedRequest(null);
    setQuotePrice('');
    setTimeout(() => setQuoteNotice(''), 4000);
  };

  return (
    <div className="bg-[#f8faf9] font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      <Navbar variant="Bhangarwala" />

      <main className="w-full pt-16 bg-[#f8faf9] flex-1">
        <div className="flex flex-col w-full relative">
          
          {/* Live Broadcast Toast */}
          {!hideToast && (
            <div className="fixed top-20 right-6 z-40 flex flex-col gap-2 max-w-sm w-full">
              <div className="bg-white text-on-surface shadow-xl rounded-2xl p-4 border border-gray-100 flex items-start gap-3 animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">cell_tower</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-label-sm text-xs text-emerald-800 uppercase tracking-wider font-bold">Live Broadcast</span>
                    <span className="font-body-sm text-[11px] text-outline">Just now</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface font-semibold leading-snug">New P2P scrap request broadcasted: E-Waste Lot #EX-4092 nearby</p>
                </div>
                <button
                  type="button"
                  aria-label="Dismiss notification"
                  onClick={() => setHideToast(true)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            
            {quoteNotice && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>{quoteNotice}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Map View Column */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[680px] relative">
                  
                  {/* Top Map Controls */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                    <div className="pointer-events-auto bg-white/95 backdrop-blur shadow-md px-4 py-2 rounded-xl flex items-center gap-3 border border-gray-100">
                      <span className="relative flex h-3 w-3">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-gray-400'} opacity-75`}></span>
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-emerald-600' : 'bg-gray-400'}`}></span>
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] uppercase text-outline font-bold">Status</span>
                        <span className="font-label-lg text-xs text-on-surface font-bold">{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsOnline(!isOnline)}
                        className={`ml-2 w-10 h-6 rounded-full relative transition-colors cursor-pointer flex items-center p-0.5 ${isOnline ? 'bg-emerald-600' : 'bg-gray-300'}`}
                      >
                        <span className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${isOnline ? 'translate-x-4' : 'translate-x-0'}`}></span>
                      </button>
                    </div>

                    <div className="pointer-events-auto bg-white/95 backdrop-blur shadow-md px-4 py-2 rounded-xl flex items-center gap-2 border border-gray-100">
                      <span className="material-symbols-outlined text-primary text-[18px]">share_location</span>
                      <span className="font-label-sm text-xs text-on-surface font-bold">Sector 54 Hub</span>
                    </div>
                  </div>

                  {/* Map Visual Container */}
                  <div className="relative w-full flex-1 bg-emerald-900/10 overflow-hidden flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-[#0a4213] to-[#0d631b] opacity-95"></div>
                    
                    <div className="relative z-10 text-center text-white max-w-sm">
                      <div className="w-16 h-16 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center mx-auto mb-4 border border-emerald-400/30 animate-pulse">
                        <span className="material-symbols-outlined text-[32px]">radar</span>
                      </div>
                      <h3 className="font-headline-md text-xl font-bold">Real-time Scrap Radar Active</h3>
                      <p className="font-body-md text-xs text-emerald-100/80 mt-1">
                        Scanning 3.5 km radius around Sector 54 for verified residential scrap listings.
                      </p>

                      <div className="mt-6 flex flex-col gap-2">
                        <div className="p-3 rounded-xl bg-white/10 backdrop-blur border border-white/15 text-left flex items-center justify-between">
                          <div>
                            <p className="font-label-sm text-xs font-bold text-white">Green Valley Heights</p>
                            <p className="font-body-sm text-[11px] text-emerald-200">120 kg Metal & PET • 1.2 km</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAcceptJob('EX-4092')}
                            className="px-3 py-1.5 rounded-lg bg-white text-[#0d631b] font-bold text-xs hover:bg-emerald-50 transition-colors"
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Scrap Requests List Column */}
              <div className="lg:col-span-6 flex flex-col space-y-6">
                
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-headline-lg text-2xl font-bold text-on-surface">Available Scrap Requests</h2>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">Nearby listings awaiting aggregator quote or spot pickup</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                    3 Listings Live
                  </span>
                </div>

                {/* Request Card 1 */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-label-md text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">High Priority</span>
                      <span className="font-body-sm text-xs text-outline font-semibold">1.2 km away</span>
                    </div>
                    <h3 className="font-headline-sm text-lg font-bold text-on-surface">E-Waste & Mixed Metal Lot #EX-4092</h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                      Green Valley Heights, Tower B-402 • Contact: Ananya Sharma
                    </p>
                    <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                      <span>Weight Est: <strong>85 kg</strong></span>
                      <span>Quote Target: <strong>₹ 2,400</strong></span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRequest({ id: 'EX-4092', target: '2400' })}
                      className="flex-1 py-2.5 rounded-xl border border-gray-200 text-on-surface hover:bg-gray-50 font-label-md text-xs font-bold transition-colors cursor-pointer"
                    >
                      Submit Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAcceptJob('EX-4092')}
                      className="flex-1 py-2.5 rounded-xl bg-[#0d631b] hover:bg-[#0b4d16] text-white font-label-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      Accept Instant Pickup
                    </button>
                  </div>
                </div>

                {/* Request Card 2 */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-label-md text-xs font-bold text-blue-800 bg-blue-100 px-3 py-0.5 rounded-full">Paper & Cardboard</span>
                      <span className="font-body-sm text-xs text-outline font-semibold">2.4 km away</span>
                    </div>
                    <h3 className="font-headline-sm text-lg font-bold text-on-surface">Baled Corrugated Boxes #EX-4093</h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                      Crestview Towers, Gate 2 Collection Point
                    </p>
                    <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                      <span>Weight Est: <strong>150 kg</strong></span>
                      <span>Quote Target: <strong>₹ 1,800</strong></span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRequest({ id: 'EX-4093', target: '1800' })}
                      className="flex-1 py-2.5 rounded-xl border border-gray-200 text-on-surface hover:bg-gray-50 font-label-md text-xs font-bold transition-colors cursor-pointer"
                    >
                      Submit Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAcceptJob('EX-4093')}
                      className="flex-1 py-2.5 rounded-xl bg-[#0d631b] hover:bg-[#0b4d16] text-white font-label-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      Accept Instant Pickup
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Quote Submission Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-headline-sm text-lg font-bold">Submit Price Quote</h3>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendQuote} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Listing Ref ID</label>
                <input
                  type="text"
                  readOnly
                  value={`#${selectedRequest.id}`}
                  className="w-full h-10 px-3 bg-gray-100 rounded-xl text-sm font-semibold text-gray-800 border border-gray-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="quote-price">Your Quote Amount (₹)</label>
                <input
                  id="quote-price"
                  type="number"
                  required
                  placeholder={`e.g. ${selectedRequest.target}`}
                  value={quotePrice}
                  onChange={(e) => setQuotePrice(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0d631b] hover:bg-[#0b4d16] shadow-sm"
                >
                  Send Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
