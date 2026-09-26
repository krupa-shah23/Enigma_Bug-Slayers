import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../../components/index.jsx';

export default function History() {
  const [notice, setNotice] = useState('');

  return (
    <div className="bg-[#f8faf9] font-body-md text-on-surface antialiased flex flex-col justify-between min-h-screen">
      <Navbar variant="Bhangarwala" />

      <main className="w-full pt-16 flex-1 bg-[#f8faf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col w-full space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <h1 className="font-headline-lg text-2xl font-bold text-on-surface">Bhangarwala Pickup History</h1>
                <p className="font-body-md text-xs text-on-surface-variant mt-1">
                  Completed residential scrap collections, batch weight verifications, and instant payout settlements.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                  12 Jobs Completed This Month
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-bold text-gray-400">
                  <tr>
                    <th className="py-3.5 px-6">Job Ref ID</th>
                    <th className="py-3.5 px-6">Location</th>
                    <th className="py-3.5 px-6">Material Category</th>
                    <th className="py-3.5 px-6">Weight Verified</th>
                    <th className="py-3.5 px-6 text-right">Settled Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/60">
                    <td className="py-4 px-6 font-bold text-gray-900">#JOB-104</td>
                    <td className="py-4 px-6 text-gray-700">Green Valley Heights, Tower B-402</td>
                    <td className="py-4 px-6 text-gray-700">Mixed Metal & Copper</td>
                    <td className="py-4 px-6 text-emerald-800 font-bold">18.5 kg</td>
                    <td className="py-4 px-6 text-right font-bold text-emerald-800">₹ 2,450.00</td>
                  </tr>
                  <tr className="hover:bg-gray-50/60">
                    <td className="py-4 px-6 font-bold text-gray-900">#JOB-098</td>
                    <td className="py-4 px-6 text-gray-700">Crestview Towers, Gate 2</td>
                    <td className="py-4 px-6 text-gray-700">Corrugated Paper & Cardboard</td>
                    <td className="py-4 px-6 text-emerald-800 font-bold">142.0 kg</td>
                    <td className="py-4 px-6 text-right font-bold text-emerald-800">₹ 1,700.00</td>
                  </tr>
                  <tr className="hover:bg-gray-50/60">
                    <td className="py-4 px-6 font-bold text-gray-900">#JOB-085</td>
                    <td className="py-4 px-6 text-gray-700">Palm Meadows Enclave, Hub A</td>
                    <td className="py-4 px-6 text-gray-700">PET Plastic Bottles</td>
                    <td className="py-4 px-6 text-emerald-800 font-bold">65.0 kg</td>
                    <td className="py-4 px-6 text-right font-bold text-emerald-800">₹ 980.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
