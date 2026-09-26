import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const submitDestinations = {
  '/person/login': '/home',
  '/ngo/login': '/ngo/dashboard',
  '/bhangarwala/login': '/bhangarwala/requests',
  '/log-contribution': '/my-society',
  '/exchange': '/exchange/demo-request/quotes',
  '/ngo/contracts/new': '/ngo/contracts',
  '/ngo/collections': '/ngo/payments',
};

const actions = [
  [/^person$/i, '/person/login'],
  [/^ngo$/i, '/ngo/login'],
  [/^bhangarwala$/i, '/bhangarwala/login'],
  [/log contribution/i, '/log-contribution'],
  [/request (pickup|quote)|new request/i, '/exchange'],
  [/view quotes|quotes?/i, '/exchange/demo-request/quotes'],
  [/select (quote|offer)|track pickup/i, '/exchange/demo-job/tracking'],
  [/offer contract|create contract/i, '/ngo/contracts/new'],
  [/create event/i, '/ngo/events'],
  [/active job/i, '/bhangarwala/active-job'],
  [/logout/i, '/'],
];

export default function InteractionLayer({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [message, setMessage] = useState('');

  const show = useCallback((next) => {
    setMessage(next);
    window.setTimeout(() => setMessage(''), 2600);
  }, []);

  const handleClick = (event) => {
    const link = event.target.closest('a');
    if (link && /track pickup/i.test(link.innerText)) {
      event.preventDefault();
      navigate('/exchange/demo-job/tracking');
      return;
    }
    const button = event.target.closest('button');
    if (!button || button.type === 'submit' || button.disabled || button.getAttribute('role') === 'tab') return;
    const label = button.innerText.trim().replace(/\s+/g, ' ');
    const action = actions.find(([pattern]) => pattern.test(label));
    if (action) {
      navigate(action[1]);
      return;
    }
    if (/rsvp/i.test(label)) {
      button.textContent = label.includes('Going') ? 'RSVP' : 'Going ✓';
      show(label.includes('Going') ? 'RSVP removed.' : 'You are on the attendee list.');
      return;
    }
    if (/notifications/i.test(label)) show('No new notifications. Live socket events will appear here after backend connection.');
    else if (/flag material mismatch/i.test(label)) show('Mismatch workflow is ready for the E34/E42 backend decision flow.');
    else if (/check location/i.test(label)) show('Location is inside the demo service area.');
    else if (/simulate approval/i.test(label)) show('Verification approved in demo mode.');
    else if (/accept|pay|trigger payment|complete|cancel|save|update|send/i.test(label)) show('Saved locally. It will call the matching backend endpoint when the API base URL is configured.');
  };

  const handleSubmit = (event) => {
    const destination = submitDestinations[pathname];
    if (!destination) {
      show('Saved locally. It will sync to the backend when connected.');
      return;
    }
    event.preventDefault();
    show('Saved locally. Opening the next step…');
    window.setTimeout(() => navigate(destination), 350);
  };

  return <div onClick={handleClick} onSubmitCapture={handleSubmit}>
    {children}
    {message && <div aria-live="polite" className="fixed bottom-5 right-5 z-[100] max-w-sm rounded-xl border border-lime-200 bg-[#123c20] px-4 py-3 text-sm font-semibold text-[#f7f3de] shadow-xl">{message}</div>}
  </div>;
}
