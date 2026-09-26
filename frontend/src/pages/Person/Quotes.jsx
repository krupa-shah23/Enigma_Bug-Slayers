import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';
import { api } from '../../services/api';
import { connectSocket } from '../../services/socket';

export default function Quotes() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState(null);

  const fetchRequestAndQuotes = async () => {
    try {
      setLoading(true);
      const [reqRes, quotesRes] = await Promise.all([
        api.get(`/p2p/requests/${requestId}`).catch(() => ({ data: {} })),
        api.get(`/p2p/requests/${requestId}/quotes`).catch(() => ({ data: {} })),
      ]);

      if (reqRes.data?.success) setRequest(reqRes.data.data.request);
      if (quotesRes.data?.success) setQuotes(quotesRes.data.data.quotes || []);
    } catch (err) {
      console.error('Failed to fetch request details or quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestAndQuotes();

    const socket = connectSocket();
    if (socket) {
      socket.on('quote:received', (data) => {
        if (data.requestId === requestId) {
          setToastMsg(`New quote received: ₹${data.quote?.offeredPrice}`);
          fetchRequestAndQuotes();
        }
      });
      socket.on('quote:rejected', (data) => {
        setToastMsg('A quote was updated or rejected.');
      });
    }

    return () => {
      if (socket) {
        socket.off('quote:received');
        socket.off('quote:rejected');
      }
    };
  }, [requestId]);

  const handleAcceptQuote = async (quoteId) => {
    try {
      const res = await api.post(`/p2p/requests/${requestId}/quotes/${quoteId}/accept`);
      if (res.data.success) {
        const jobId = res.data.data.job?._id;
        navigate(`/exchange/${jobId}/tracking`);
      }
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Accept quote failed');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center">Loading quotes...</div>;
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

          <Link className="inline-flex items-center gap-2 text-primary font-semibold" to="/exchange">
            &larr; Back to Exchange Listings
          </Link>

          {/* Request Header */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-gray-100">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
              {request?.category || 'Category'}
            </span>
            <h1 className="font-headline-lg text-headline-lg font-bold text-gray-900 mt-2">{request?.description}</h1>
            <p className="text-gray-500 text-sm mt-1">Status: <strong className="uppercase">{request?.status}</strong></p>
          </div>

          {/* Quotes List */}
          <h2 className="font-headline-md text-headline-md font-bold text-gray-900 mt-4">Available Collector Quotes ({quotes.length})</h2>

          {quotes.length === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center text-gray-500 border border-gray-100">
              No quotes submitted for this request yet.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {quotes.map((q) => (
                <div key={q._id} className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{q.bhangarwalaId?.name || 'Collector Partner'}</h3>
                    <p className="text-sm text-gray-500">Phone: {q.bhangarwalaId?.phone || 'N/A'}</p>
                    <p className="text-sm text-gray-500">Pickup Note: {q.notes || 'Ready for immediate pickup'}</p>
                  </div>

                  <div className="flex items-center gap-6 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="text-xs text-gray-400 font-semibold uppercase">Offered Price</span>
                      <p className="text-2xl font-bold text-emerald-700">₹{q.offeredPrice}</p>
                    </div>

                    <button
                      onClick={() => handleAcceptQuote(q._id)}
                      className="bg-primary-container hover:bg-primary text-on-primary font-bold px-5 py-2.5 rounded-lg shadow-sm cursor-pointer"
                    >
                      Accept Quote
                    </button>
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
