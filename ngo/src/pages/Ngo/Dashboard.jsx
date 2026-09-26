import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../../components/index.jsx';

export default function Dashboard() {
  const navigate = useNavigate();
  const [hideToast1, setHideToast1] = useState(false);
  const [hideToast2, setHideToast2] = useState(false);

  return (
    <div className="bg-[#f8faf9] font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      <Navbar variant="Ngo" />

      <main className="w-full pt-16 bg-[#f8faf9] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col w-full relative">
            
            {/* Live Socket Event Toasts */}
            <div className="fixed top-20 right-6 z-40 flex flex-col gap-3 max-w-md w-full pointer-events-none">
              {!hideToast1 && (
                <div className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white shadow-xl border border-gray-100 animate-in fade-in duration-300">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-label-sm text-xs uppercase tracking-wider text-emerald-800 font-bold">Live Event S08</span>
                      <span className="font-body-sm text-[11px] text-outline">Just now</span>
                    </div>
                    <p className="font-label-md text-xs font-semibold text-on-surface">Crestview Towers accepted Compost contract (1,200 kg/mo)</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHideToast1(true)}
                    className="text-gray-400 hover:text-gray-600 p-1 shrink-0 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              )}

              {!hideToast2 && (
                <div className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white shadow-xl border border-gray-100 animate-in fade-in duration-300">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">warning</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-label-sm text-xs uppercase tracking-wider text-amber-800 font-bold">Live Event S09</span>
                      <span className="font-body-sm text-[11px] text-outline">2m ago</span>
                    </div>
                    <p className="font-label-md text-xs font-semibold text-on-surface">Weigh-in flag logged on batch #WB-409</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHideToast2(true)}
                    className="text-gray-400 hover:text-gray-600 p-1 shrink-0 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              )}
            </div>

            {/* Header Title */}
            <div className="flex flex-col gap-1 mb-8">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                Operations Console
              </div>
              <h1 className="font-headline-xl text-3xl font-bold text-on-surface tracking-tight">NGO Operations Dashboard</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
                Active material sourcing pipelines, society compliance, and scheduled collections.
              </p>
            </div>

            {/* Stat Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-label-lg text-sm text-on-surface-variant font-semibold">Active Contracts</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">description</span>
                  </div>
                </div>
                <div>
                  <div className="font-display-lg text-3xl font-bold text-on-surface">14 Societies</div>
                  <p className="font-body-sm text-xs text-primary mt-1 flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    +2 contracts pending approval
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-label-lg text-sm text-on-surface-variant font-semibold">Verified Volume This Month</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">inventory_2</span>
                  </div>
                </div>
                <div>
                  <div className="font-display-lg text-3xl font-bold text-on-surface">18,450 kg</div>
                  <p className="font-body-sm text-xs text-primary mt-1 flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    94.8% average purity score
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-label-lg text-sm text-on-surface-variant font-semibold">Grassroots Disbursements</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">payments</span>
                  </div>
                </div>
                <div>
                  <div className="font-display-lg text-3xl font-bold text-on-surface">₹ 1,42,800</div>
                  <p className="font-body-sm text-xs text-primary mt-1 flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px]">task_alt</span>
                    100% payout settlement rate
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                type="button"
                onClick={() => navigate('/ngo/contracts/new')}
                className="inline-flex items-center gap-2 bg-[#0d631b] hover:bg-[#0b4d16] text-white font-label-lg text-sm font-bold px-6 py-3 rounded-xl shadow-sm cursor-pointer transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>Issue New Contract</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/ngo/verification')}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-on-surface border border-gray-200 font-label-lg text-sm font-bold px-6 py-3 rounded-xl shadow-sm cursor-pointer transition-all"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">verified_user</span>
                <span>Statutory Verification</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/ngo/events')}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-on-surface border border-gray-200 font-label-lg text-sm font-bold px-6 py-3 rounded-xl shadow-sm cursor-pointer transition-all"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">event</span>
                <span>Manage Events</span>
              </button>
            </div>

            {/* Managed Societies List */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface">Contracted Recovery Hubs</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">Grassroots partner societies currently under active NGO supervision</p>
                </div>
                <Link to="/ngo/societies" className="font-label-md text-xs font-bold text-primary hover:underline">
                  View All Societies →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-md text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">Active</span>
                      <span className="font-body-sm text-xs text-gray-500">Tier A</span>
                    </div>
                    <h4 className="font-headline-sm text-base font-bold text-on-surface">Green Valley Heights</h4>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1">420 Resident Units • Sector 54</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                    <span className="font-body-sm text-xs text-gray-600 font-medium">Monthly: 3,400 kg</span>
                    <button onClick={() => navigate('/ngo/societies/1')} className="font-label-sm text-xs text-primary font-bold hover:underline cursor-pointer">
                      Manage →
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-md text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">Active</span>
                      <span className="font-body-sm text-xs text-gray-500">Tier A</span>
                    </div>
                    <h4 className="font-headline-sm text-base font-bold text-on-surface">Crestview Towers</h4>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1">280 Resident Units • Sector 62</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                    <span className="font-body-sm text-xs text-gray-600 font-medium">Monthly: 2,100 kg</span>
                    <button onClick={() => navigate('/ngo/societies/2')} className="font-label-sm text-xs text-primary font-bold hover:underline cursor-pointer">
                      Manage →
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-md text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">Review Pending</span>
                      <span className="font-body-sm text-xs text-gray-500">Tier B</span>
                    </div>
                    <h4 className="font-headline-sm text-base font-bold text-on-surface">Palm Meadows Enclave</h4>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1">150 Resident Units • Sector 48</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                    <span className="font-body-sm text-xs text-gray-600 font-medium">Monthly: 1,800 kg</span>
                    <button onClick={() => navigate('/ngo/societies/3')} className="font-label-sm text-xs text-primary font-bold hover:underline cursor-pointer">
                      Review →
                    </button>
                  </div>
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
