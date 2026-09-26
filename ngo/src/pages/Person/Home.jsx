import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../../components/index.jsx';

export default function Home() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');
  const [hideToast, setHideToast] = useState(false);
  const [rsvpState, setRsvpState] = useState({ 1: false, 2: false, 3: false });

  const toggleRsvp = (id) => {
    setRsvpState(prev => ({ ...prev, [id]: !prev[id] }));
    setNotice(!rsvpState[id] ? 'RSVP confirmed for event!' : 'RSVP cancelled.');
    setTimeout(() => setNotice(''), 3000);
  };

  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      <Navbar variant="Person" />

      <main className="w-full pt-16 bg-[#F5F7F6] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col w-full relative">
            
            {notice && (
              <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>{notice}</span>
              </div>
            )}

            {/* Live Dispatch Toast */}
            {!hideToast && (
              <div className="fixed top-20 right-6 z-40 max-w-sm w-full bg-white shadow-xl rounded-2xl p-4 border border-gray-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="p-2 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-label-sm text-xs text-emerald-800 uppercase tracking-wider font-bold">Live Dispatch</span>
                    <span className="font-body-sm text-[11px] text-outline">Just now</span>
                  </div>
                  <p className="font-body-md text-sm text-on-surface mt-0.5 leading-snug">
                    <span className="font-bold text-primary">S05:</span> Bhangarwala Ramesh has updated pickup status to <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold text-xs">Arrived</span>
                  </p>
                </div>
                {/* FIXED: Working Dismiss button */}
                <button
                  aria-label="Dismiss toast"
                  onClick={() => setHideToast(true)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            )}

            {/* Active Dispatch Card */}
            <div className="w-full mb-6">
              <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0d631b]"></div>
                <div className="flex items-center gap-4 pl-2">
                  <div className="relative shrink-0">
                    <img
                      className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-emerald-600/30"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhhZitNYlppv5xZOz4jHI-OnvlD7HcJsYyHrR2elMY1Yw2Z2VvF9SEcGHatJOrqJzhiCnWwpfKFedF9aN5EW7RVnTGxTbI3HKW1EtMQ1VhsgdMJ4ojl1-h4FIgMG7yzfu9gvic4GfVVe96PXEPWtGOr1vCK1Kn8Zg28o3r_4EAPsj_yvHrorQEfa815yG2ClDdlCPpxDaeX25dqgMdReTzNtY4KvOPcua06NiGXXT1oQzwT9YPI_0RVA"
                      alt="Driver"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-headline-sm text-base text-on-surface font-bold">Ramesh Kumar</h2>
                      <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-label-sm text-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        Driver En Route
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">Assigned Collector • Electric Trike Route #A-14</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto self-end md:self-center">
                  <Link
                    to="/exchange"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#0d631b] hover:bg-[#0b4d16] text-white font-label-lg text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200"
                  >
                    <span className="material-symbols-outlined text-[18px]">near_me</span>
                    <span>Track Pickup</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-lg text-sm text-on-surface-variant font-semibold">Fee Credit This Cycle</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                  </div>
                </div>
                <div>
                  <div className="font-display-lg text-3xl font-bold text-on-surface tracking-tight">₹ 3,450.00</div>
                  <p className="font-body-sm text-xs text-primary mt-1 flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    Credited toward next maintenance fee
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-lg text-sm text-on-surface-variant font-semibold">Next Collection Date</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  </div>
                </div>
                <div>
                  <div className="font-headline-xl text-2xl font-bold text-on-surface tracking-tight">Oct 28, 2025</div>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1 flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[16px] text-amber-600">schedule</span>
                    Morning Slot: 08:30 AM – 11:00 AM
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-lg text-sm text-on-surface-variant font-semibold">Society Trust Score</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-display-lg text-3xl font-bold text-on-surface tracking-tight">92<span className="text-base text-gray-400 font-normal">/100</span></div>
                    <span className="inline-flex items-center gap-1 mt-1 bg-emerald-100 text-emerald-800 font-label-sm text-xs px-2.5 py-0.5 rounded-full font-bold">
                      Tier A Verified
                    </span>
                  </div>

                  <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                      <path className="text-emerald-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="92, 100" strokeLinecap="round" strokeWidth="3.5"></path>
                    </svg>
                    <span className="absolute font-label-md text-xs text-primary font-bold">92%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FIXED: Working Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                type="button"
                onClick={() => navigate('/log-contribution')}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0d631b] hover:bg-[#0b4d16] text-white font-label-lg text-base h-12 px-6 rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>Log Contribution</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/exchange')}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-[#0d631b] font-label-lg text-base h-12 px-6 rounded-xl shadow-sm transition-all duration-200 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[20px]">hail</span>
                <span>Request Pickup</span>
              </button>
            </div>

            {/* Events Section */}
            <section className="w-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-headline-lg text-2xl text-on-surface font-bold">Events & Workshops</h2>
                  <span className="font-label-sm text-xs text-outline uppercase tracking-wider hidden sm:inline font-semibold">Society Circular Calendar</span>
                </div>
                <span className="font-label-md text-xs font-bold text-primary bg-emerald-100 px-3 py-1 rounded-full">3 Upcoming</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Event 1 */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div>
                    <div className="relative h-36 w-full overflow-hidden bg-gray-100">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80" alt="Drive" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#0d631b] text-white font-label-sm text-xs px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wide font-bold">Drive</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-headline-sm text-base text-on-surface font-bold line-clamp-1">E-Waste Clearance Drive</h3>
                      <div className="mt-2 space-y-1">
                        <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-primary">event</span>
                          Nov 02, 2025 • 09:00 AM
                        </p>
                        <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                          Central Clubhouse Gate
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center justify-between gap-2 mt-2">
                    <span className="font-label-sm text-xs text-on-surface-variant font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                      {rsvpState[1] ? '49 Attending' : '48 Attending'}
                    </span>
                    {/* FIXED: Working RSVP Button */}
                    <button
                      type="button"
                      onClick={() => toggleRsvp(1)}
                      className={`font-label-md text-xs px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
                        rsvpState[1] ? 'bg-emerald-800 text-white' : 'bg-[#0d631b] hover:bg-[#0b4d16] text-white'
                      }`}
                    >
                      {rsvpState[1] ? 'RSVPed ✓' : 'RSVP'}
                    </button>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div>
                    <div className="relative h-36 w-full overflow-hidden bg-gray-100">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=400&q=80" alt="Gala" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-emerald-100 text-emerald-800 font-label-sm text-xs px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wide font-bold">Green Event</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-headline-sm text-base text-on-surface font-bold line-clamp-1">Compost Distribution Gala</h3>
                      <div className="mt-2 space-y-1">
                        <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-primary">event</span>
                          Nov 09, 2025 • 10:30 AM
                        </p>
                        <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                          Community Rooftop Plot
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center justify-between gap-2 mt-2">
                    <span className="font-label-sm text-xs text-on-surface-variant font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                      {rsvpState[2] ? '33 Attending' : '32 Attending'}
                    </span>
                    {/* FIXED: Working RSVP Button */}
                    <button
                      type="button"
                      onClick={() => toggleRsvp(2)}
                      className={`font-label-md text-xs px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
                        rsvpState[2] ? 'bg-emerald-800 text-white' : 'bg-[#0d631b] hover:bg-[#0b4d16] text-white'
                      }`}
                    >
                      {rsvpState[2] ? 'RSVPed ✓' : 'RSVP'}
                    </button>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div>
                    <div className="relative h-36 w-full overflow-hidden bg-gray-100">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80" alt="Masterclass" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-amber-100 text-amber-800 font-label-sm text-xs px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wide font-bold">Workshop</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-headline-sm text-base text-on-surface font-bold line-clamp-1">Plastic Grading Masterclass</h3>
                      <div className="mt-2 space-y-1">
                        <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-primary">event</span>
                          Nov 15, 2025 • 04:00 PM
                        </p>
                        <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                          Eco Lab Room 2B
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center justify-between gap-2 mt-2">
                    <span className="font-label-sm text-xs text-on-surface-variant font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                      {rsvpState[3] ? '20 Attending' : '19 Attending'}
                    </span>
                    {/* FIXED: Working RSVP Button */}
                    <button
                      type="button"
                      onClick={() => toggleRsvp(3)}
                      className={`font-label-md text-xs px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
                        rsvpState[3] ? 'bg-emerald-800 text-white' : 'bg-[#0d631b] hover:bg-[#0b4d16] text-white'
                      }`}
                    >
                      {rsvpState[3] ? 'RSVPed ✓' : 'RSVP'}
                    </button>
                  </div>
                </div>

                {/* FIXED: Working Create Event Card Button */}
                <button
                  type="button"
                  onClick={() => navigate('/ngo/events')}
                  className="bg-white hover:bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary p-6 flex flex-col items-center justify-center text-center group cursor-pointer transition-all min-h-[260px] shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-primary flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                    <span className="material-symbols-outlined text-[24px] font-bold">add</span>
                  </div>
                  <span className="font-headline-sm text-base text-on-surface font-bold">Create Event</span>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1 max-w-[180px]">
                    Schedule a collection drive or sustainability workshop
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-primary font-label-sm text-xs font-bold">
                    Officer Portal
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </span>
                </button>

              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
