import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { connectSocket } from '../../services/socket';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [impact, setImpact] = useState(null);
  const [society, setSociety] = useState(null);
  const [events, setEvents] = useState([]);
  const [toastMsg, setToastMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch User Impact
        const impactRes = await api.get('/person/impact');
        if (impactRes.data.success) {
          setImpact(impactRes.data.data);
        }

        // Fetch My Society if enrolled
        if (user?.societyId) {
          const socRes = await api.get('/societies/my');
          if (socRes.data.success) {
            setSociety(socRes.data.data.society);
          }
        }

        // Fetch Events
        const eventsRes = await api.get('/events');
        if (eventsRes.data.success) {
          setEvents(eventsRes.data.data.events || []);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Setup Sockets
    const socket = connectSocket();
    if (socket) {
      socket.on('contribution:logged', (data) => {
        setToastMsg(`New contribution logged: ${data.category || 'waste'} (${data.promisedKg} kg)`);
      });
      socket.on('event:created', (data) => {
        setToastMsg(`New event created: ${data.event?.title || 'Community Event'}`);
      });
      socket.on('job:status', (data) => {
        setToastMsg(`Job update: Status changed to ${data.status}`);
      });
    }

    return () => {
      if (socket) {
        socket.off('contribution:logged');
        socket.off('event:created');
        socket.off('job:status');
      }
    };
  }, [user]);

  const handleRSVP = async (eventId) => {
    try {
      const res = await api.post(`/events/${eventId}/register`);
      if (res.data.success) {
        setToastMsg('RSVP successful!');
        setEvents((prev) =>
          prev.map((e) => (e._id === eventId ? { ...e, attendeesCount: (e.attendeesCount || 0) + 1 } : e))
        );
      }
    } catch (err) {
      setToastMsg(err.response?.data?.error?.message || 'RSVP failed');
    }
  };

  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">ReWaste</span>
          </div>
          <Navbar variant="Person" className="hidden md:flex items-center gap-gutter">
            <Link className="transition-colors py-1 text-primary-container font-headline-sm" to="/home">Home</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/societies">All Societies</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link>
            <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link>
          </Navbar>
          <div className="flex items-center gap-space-md">
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm">
              {user?.name || 'Person'} {user?.societyRole === 'officer' && '(Officer)'}
            </span>
          </div>
        </div>
      </header>

      <main className="w-full pt-16 bg-[#F5F7F6]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {toastMsg && (
            <div className="mb-6 max-w-sm ml-auto bg-surface-container-lowest shadow-xl rounded-xl p-4 flex items-center justify-between border-l-4 border-emerald-500">
              <p className="text-sm font-medium text-gray-800">{toastMsg}</p>
              <button onClick={() => setToastMsg(null)} className="text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md mb-space-xl">
            <button
              onClick={() => navigate('/log-contribution')}
              className="flex-1 inline-flex items-center justify-center gap-space-sm bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg h-12 px-6 rounded-xl shadow-sm transition-all duration-200 cursor-pointer"
            >
              <span className="material-symbols-outlined text-headline-md">add_circle</span>
              Log Contribution
            </button>
            <button
              onClick={() => navigate('/exchange')}
              className="flex-1 inline-flex items-center justify-center gap-space-sm bg-surface-container-lowest hover:bg-surface-container-low text-primary-container font-label-lg text-label-lg h-12 px-6 rounded-xl shadow-sm transition-all duration-200 cursor-pointer border border-gray-200"
            >
              <span className="material-symbols-outlined text-headline-md">hail</span>
              Request P2P Pickup
            </button>
          </div>

          {/* Impact & Society Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-lg">
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col justify-between">
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-label-lg text-label-lg text-on-surface-variant font-medium">Fee Credit / Impact</span>
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-headline-md">account_balance_wallet</span>
                </div>
              </div>
              <div>
                <div className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">
                  ₹{impact?.earningsTotal || 0}
                </div>
                <p className="font-body-sm text-body-sm text-primary mt-1">
                  Credited across {impact?.totalContributionsCount || 0} contributions
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col justify-between">
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-label-lg text-label-lg text-on-surface-variant font-medium">My Society</span>
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-headline-md">apartment</span>
                </div>
              </div>
              <div>
                <div className="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight truncate">
                  {society ? society.name : 'Not Joined'}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {society ? society.area : 'Browse all societies to join one'}
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col justify-between">
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-label-lg text-label-lg text-on-surface-variant font-medium">Society Trust Score</span>
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-headline-md">verified_user</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-space-md">
                <div>
                  <div className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">
                    {society?.trustScore || 0}<span className="font-headline-md text-headline-md text-outline font-normal">/100</span>
                  </div>
                  <span className="inline-flex items-center gap-1 mt-1 bg-surface-container-low text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full">
                    Verified Society
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <section className="w-full flex flex-col">
            <div className="flex items-center justify-between mb-space-md">
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Upcoming Events & Workshops</h2>
              <span className="font-label-md text-label-md text-primary-container font-semibold">{events.length} Available</span>
            </div>

            {events.length === 0 ? (
              <div className="bg-white p-8 rounded-xl text-center text-gray-500">
                No upcoming events scheduled right now.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {events.map((evt) => (
                  <div key={evt._id} className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between p-4 border border-gray-100">
                    <div>
                      <span className="bg-primary-container text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded-full uppercase tracking-wide">
                        {evt.category || 'Event'}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-2">{evt.title}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">{evt.description}</p>
                      <p className="font-body-sm text-body-sm text-emerald-700 mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">event</span>
                        {new Date(evt.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {evt.attendeesCount || 0} Attending
                      </span>
                      <button
                        onClick={() => handleRSVP(evt._id)}
                        className="bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        RSVP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
