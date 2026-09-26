import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';
import { api } from '../../services/api';
import { connectSocket } from '../../services/socket';

export default function Tracking() {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [bhangarwalaLocation, setBhangarwalaLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState(null);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/p2p/jobs/${jobId}`);
      if (res.data.success) {
        setJob(res.data.data.job);
      }
    } catch (err) {
      console.error('Failed to fetch job details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();

    const socket = connectSocket();
    if (socket) {
      socket.on('job:status', (data) => {
        if (data.jobId === jobId) {
          setToastMsg(`Job status updated to: ${data.status}`);
          fetchJob();
        }
      });

      socket.on('bhangarwala:location', (data) => {
        if (job && data.bhangarwalaId === job.bhangarwalaId?._id) {
          setBhangarwalaLocation(data.location);
          setToastMsg(`Collector live position updated: Lat ${data.location?.lat}, Lng ${data.location?.lng}`);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('job:status');
        socket.off('bhangarwala:location');
      }
    };
  }, [jobId]);

  if (loading) {
    return <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center">Loading job tracking...</div>;
  }

  if (!job) {
    return <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center">Job not found.</div>;
  }

  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">ReWaste</span>
          <Navbar variant="Person" className="hidden md:flex items-center gap-gutter">
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link>
          </Navbar>
        </div>
      </header>

      <main className="w-full pt-16 bg-[#F5F7F6]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
          {toastMsg && (
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-between">
              <span>{toastMsg}</span>
              <button onClick={() => setToastMsg(null)} className="font-bold">&times;</button>
            </div>
          )}

          <Link className="inline-flex items-center gap-2 text-primary font-semibold" to="/history">
            &larr; Back to History
          </Link>

          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-headline-lg text-headline-lg font-bold text-gray-900">Pickup Job Tracking</h1>
                <p className="text-gray-500 text-sm mt-1">Collector: <strong>{job.bhangarwalaId?.name || 'Assigned Collector'}</strong></p>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-400 font-semibold uppercase">Current Status</span>
                <p className="text-2xl font-bold text-emerald-700 uppercase">{job.status}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Job Details</h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Agreed Price:</strong> ₹{job.agreedPrice}</p>
                <p><strong>Pickup Note:</strong> {job.notes || 'None'}</p>
                <p><strong>Collector Phone:</strong> {job.bhangarwalaId?.phone || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Live Location Ping</h2>
              {bhangarwalaLocation ? (
                <div className="bg-emerald-50 p-4 rounded-xl text-emerald-900">
                  <p className="font-bold">Coordinates Received:</p>
                  <p className="text-sm font-mono mt-1">Lat: {bhangarwalaLocation.lat}, Lng: {bhangarwalaLocation.lng}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Awaiting live location ping (S05) from collector...</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
