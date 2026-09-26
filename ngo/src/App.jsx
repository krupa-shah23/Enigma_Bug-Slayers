import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';

import Home from './pages/Person/Home.jsx'; 
import PersonSocieties from './pages/Person/Societies.jsx'; 
import PersonSocietyDetail from './pages/Person/SocietyDetail.jsx'; 
import MySociety from './pages/Person/MySociety.jsx'; 
import SocietySettings from './pages/Person/SocietySettings.jsx'; 
import LogContribution from './pages/Person/LogContribution.jsx'; 
import Exchange from './pages/Person/Exchange.jsx'; 
import Quotes from './pages/Person/Quotes.jsx'; 
import Tracking from './pages/Person/Tracking.jsx'; 
import PersonHistory from './pages/Person/History.jsx'; 
import PersonProfile from './pages/Person/Profile.jsx';

import NgoDashboard from './pages/Ngo/Dashboard.jsx'; 
import Verification from './pages/Ngo/Verification.jsx'; 
import NgoSocieties from './pages/Ngo/Societies.jsx'; 
import NgoSocietyDetail from './pages/Ngo/SocietyDetail.jsx'; 
import NewContract from './pages/Ngo/NewContract.jsx'; 
import Contracts from './pages/Ngo/Contracts.jsx'; 
import Collections from './pages/Ngo/Collections.jsx'; 
import Payments from './pages/Ngo/Payments.jsx'; 
import Events from './pages/Ngo/Events.jsx';

import Requests from './pages/Bhangarwala/Requests.jsx'; 
import ActiveJob from './pages/Bhangarwala/ActiveJob.jsx'; 
import BHistory from './pages/Bhangarwala/History.jsx'; 
import BProfile from './pages/Bhangarwala/Profile.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Single Unified Login Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/person/login" element={<Login defaultRole="Person" />} />
        <Route path="/ngo/login" element={<Login defaultRole="NGO" />} />
        <Route path="/bhangarwala/login" element={<Login defaultRole="Bhangarwala" />} />

        {/* Person Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/societies" element={<PersonSocieties />} />
        <Route path="/societies/:id" element={<PersonSocietyDetail />} />
        <Route path="/my-society" element={<MySociety />} />
        <Route path="/my-society/settings" element={<SocietySettings />} />
        <Route path="/log-contribution" element={<LogContribution />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/exchange/:requestId/quotes" element={<Quotes />} />
        <Route path="/exchange/:jobId/tracking" element={<Tracking />} />
        <Route path="/history" element={<PersonHistory />} />
        <Route path="/profile" element={<PersonProfile />} />

        {/* NGO Routes */}
        <Route path="/ngo/dashboard" element={<NgoDashboard />} />
        <Route path="/ngo/verification" element={<Verification />} />
        <Route path="/ngo/societies" element={<NgoSocieties />} />
        <Route path="/ngo/societies/:id" element={<NgoSocietyDetail />} />
        <Route path="/ngo/contracts/new" element={<NewContract />} />
        <Route path="/ngo/contracts" element={<Contracts />} />
        <Route path="/ngo/collections" element={<Collections />} />
        <Route path="/ngo/payments" element={<Payments />} />
        <Route path="/ngo/events" element={<Events />} />

        {/* Bhangarwala Routes */}
        <Route path="/bhangarwala/requests" element={<Requests />} />
        <Route path="/bhangarwala/active-job" element={<ActiveJob />} />
        <Route path="/bhangarwala/history" element={<BHistory />} />
        <Route path="/bhangarwala/profile" element={<BProfile />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
