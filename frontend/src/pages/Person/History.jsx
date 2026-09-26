import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';
import { api } from '../../services/api';

export default function History() {
  const navigate = useNavigate();

  const [p2pJobs, setP2pJobs] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Rating modal state
  const [selectedJob, setSelectedJob] = useState(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [submittingRating, setSubmittingRating] = useState(false);

  const fetchHistoryData = async () => {
    try {
      setLoading(true);
      const [jobsRes, contribRes] = await Promise.all([
        api.get('/p2p/jobs/my').catch(() => ({ data: {} })),
        api.get('/contributions/me').catch(() => ({ data: {} })),
      ]);

      if (jobsRes.data?.success) setP2pJobs(jobsRes.data.data.jobs || []);
      if (contribRes.data?.success) setContributions(contribRes.data.data.contributions || []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const handleRateJob = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    setSubmittingRating(true);
    try {
      const res = await api.post(`/p2p/jobs/${selectedJob._id}/rate`, {
        rating: Number(rating),
        feedback,
      });

      if (res.data.success) {
        setSelectedJob(null);
        fetchHistoryData();
      }
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Rating submission failed');
    } finally {
      setSubmittingRating(false);
    }
  };

  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">ReWaste</span>
          <Navbar variant="Person" className="hidden md:flex items-center gap-gutter">
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link>
            <Link className="transition-colors py-1 text-primary-container font-headline-sm" to="/history">History</Link>
          </Navbar>
        </div>
      </header>

      <main className="w-full pt-16 bg-[#F5F7F6]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
          <div>
            <h1 className="font-headline-xl text-headline-xl font-bold text-gray-900">Activity History & Audit Trail</h1>
            <p className="text-gray-500 text-sm mt-1">Consolidated view of your completed scrap pickups and logged contributions.</p>
          </div>

          {/* Rating Modal */}
          {selectedJob && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Rate Pickup Service</h3>
                <p className="text-sm text-gray-500 mb-4">Collector: {selectedJob.bhangarwalaId?.name || 'Collector'}</p>

                <form onSubmit={handleRateJob} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Rating (1 to 5 Stars)</label>
                    <select
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="5">5 Stars - Excellent</option>
                      <option value="4">4 Stars - Very Good</option>
                      <option value="3">3 Stars - Average</option>
                      <option value="2">2 Stars - Poor</option>
                      <option value="1">1 Star - Very Poor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Feedback Notes</label>
                    <textarea
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none resize-none"
                      rows="3"
                      placeholder="Punctual pickup, fair weighing..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingRating}
                      className="px-5 py-2 bg-primary-container hover:bg-primary text-on-primary font-bold text-sm rounded-lg"
                    >
                      {submittingRating ? 'Submitting...' : 'Submit Rating'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Section 1: P2P Jobs */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 text-xl mb-4">P2P Scrap Pickups (E26 & E27)</h2>

            {loading ? (
              <p className="text-gray-500 text-sm">Loading pickup history...</p>
            ) : p2pJobs.length === 0 ? (
              <p className="text-gray-500 text-sm">No P2P pickup jobs completed yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600">
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4">Collector</th>
                      <th className="py-2.5 px-4">Agreed Amount</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4 text-right">Rating Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {p2pJobs.map((job) => (
                      <tr key={job._id}>
                        <td className="py-3 px-4">{new Date(job.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4 font-medium">{job.bhangarwalaId?.name || 'Collector'}</td>
                        <td className="py-3 px-4 font-bold text-emerald-700">₹{job.agreedPrice}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${job.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {job.status === 'completed' && !job.rating ? (
                            <button
                              onClick={() => setSelectedJob(job)}
                              className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1.5 rounded font-bold shadow-sm"
                            >
                              Rate Pickup (E27)
                            </button>
                          ) : job.rating ? (
                            <span className="text-emerald-700 font-bold text-xs">★ {job.rating}/5 Rated</span>
                          ) : (
                            <span className="text-gray-400 text-xs">In Progress</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section 2: Contributions */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 text-xl mb-4">Doorstep Weigh-in Contributions (E12)</h2>

            {loading ? (
              <p className="text-gray-500 text-sm">Loading contribution history...</p>
            ) : contributions.length === 0 ? (
              <p className="text-gray-500 text-sm">No doorstep weigh-in contributions recorded.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600">
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4">Category</th>
                      <th className="py-2.5 px-4">Promised Mass</th>
                      <th className="py-2.5 px-4">Verified Mass</th>
                      <th className="py-2.5 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {contributions.map((c) => (
                      <tr key={c._id}>
                        <td className="py-3 px-4">{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4 uppercase font-semibold text-gray-800">{c.category}</td>
                        <td className="py-3 px-4">{c.promisedKg} kg</td>
                        <td className="py-3 px-4">{c.verifiedKg ? `${c.verifiedKg} kg` : 'Pending Verification'}</td>
                        <td className="py-3 px-4 text-right">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${c.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
