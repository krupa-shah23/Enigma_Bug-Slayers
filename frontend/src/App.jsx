import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InteractionLayer from './components/InteractionLayer.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import './index.css';
import Landing from './pages/Landing.jsx';
import PersonLogin from './pages/Person/Login.jsx'; import Home from './pages/Person/Home.jsx'; import PersonSocieties from './pages/Person/Societies.jsx'; import PersonSocietyDetail from './pages/Person/SocietyDetail.jsx'; import MySociety from './pages/Person/MySociety.jsx'; import SocietySettings from './pages/Person/SocietySettings.jsx'; import LogContribution from './pages/Person/LogContribution.jsx'; import Exchange from './pages/Person/Exchange.jsx'; import Quotes from './pages/Person/Quotes.jsx'; import Tracking from './pages/Person/Tracking.jsx'; import PersonHistory from './pages/Person/History.jsx'; import PersonProfile from './pages/Person/Profile.jsx';
import NgoLogin from './pages/Ngo/Login.jsx'; import NgoDashboard from './pages/Ngo/Dashboard.jsx'; import Verification from './pages/Ngo/Verification.jsx'; import NgoSocieties from './pages/Ngo/Societies.jsx'; import NgoSocietyDetail from './pages/Ngo/SocietyDetail.jsx'; import NewContract from './pages/Ngo/NewContract.jsx'; import Contracts from './pages/Ngo/Contracts.jsx'; import Collections from './pages/Ngo/Collections.jsx'; import Payments from './pages/Ngo/Payments.jsx'; import Events from './pages/Ngo/Events.jsx';
import BLogin from './pages/Bhangarwala/Login.jsx'; import Requests from './pages/Bhangarwala/Requests.jsx'; import ActiveJob from './pages/Bhangarwala/ActiveJob.jsx'; import BHistory from './pages/Bhangarwala/History.jsx'; import BProfile from './pages/Bhangarwala/Profile.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InteractionLayer>
          <Routes>
            <Route path="/" element={<Landing />} />
            
            {/* Person Routes */}
            <Route path="/person/login" element={<PersonLogin />} />
            <Route path="/home" element={<ProtectedRoute allowedRoles={['person']}><Home /></ProtectedRoute>} />
            <Route path="/societies" element={<ProtectedRoute allowedRoles={['person']}><PersonSocieties /></ProtectedRoute>} />
            <Route path="/societies/:id" element={<ProtectedRoute allowedRoles={['person']}><PersonSocietyDetail /></ProtectedRoute>} />
            <Route path="/my-society" element={<ProtectedRoute allowedRoles={['person']}><MySociety /></ProtectedRoute>} />
            <Route path="/my-society/settings" element={<ProtectedRoute allowedRoles={['person']} requireOfficer={true}><SocietySettings /></ProtectedRoute>} />
            <Route path="/log-contribution" element={<ProtectedRoute allowedRoles={['person']}><LogContribution /></ProtectedRoute>} />
            <Route path="/exchange" element={<ProtectedRoute allowedRoles={['person']}><Exchange /></ProtectedRoute>} />
            <Route path="/exchange/:requestId/quotes" element={<ProtectedRoute allowedRoles={['person']}><Quotes /></ProtectedRoute>} />
            <Route path="/exchange/:jobId/tracking" element={<ProtectedRoute allowedRoles={['person']}><Tracking /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute allowedRoles={['person']}><PersonHistory /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute allowedRoles={['person']}><PersonProfile /></ProtectedRoute>} />

            {/* NGO Routes */}
            <Route path="/ngo/login" element={<NgoLogin />} />
            <Route path="/ngo/dashboard" element={<ProtectedRoute allowedRoles={['ngo']}><NgoDashboard /></ProtectedRoute>} />
            <Route path="/ngo/verification" element={<ProtectedRoute allowedRoles={['ngo']}><Verification /></ProtectedRoute>} />
            <Route path="/ngo/societies" element={<ProtectedRoute allowedRoles={['ngo']}><NgoSocieties /></ProtectedRoute>} />
            <Route path="/ngo/societies/:id" element={<ProtectedRoute allowedRoles={['ngo']}><NgoSocietyDetail /></ProtectedRoute>} />
            <Route path="/ngo/contracts/new" element={<ProtectedRoute allowedRoles={['ngo']}><NewContract /></ProtectedRoute>} />
            <Route path="/ngo/contracts" element={<ProtectedRoute allowedRoles={['ngo']}><Contracts /></ProtectedRoute>} />
            <Route path="/ngo/collections" element={<ProtectedRoute allowedRoles={['ngo']}><Collections /></ProtectedRoute>} />
            <Route path="/ngo/payments" element={<ProtectedRoute allowedRoles={['ngo']}><Payments /></ProtectedRoute>} />
            <Route path="/ngo/events" element={<ProtectedRoute allowedRoles={['ngo']}><Events /></ProtectedRoute>} />

            {/* Bhangarwala Routes */}
            <Route path="/bhangarwala/login" element={<BLogin />} />
            <Route path="/bhangarwala/requests" element={<ProtectedRoute allowedRoles={['bhangarwala']}><Requests /></ProtectedRoute>} />
            <Route path="/bhangarwala/active-job" element={<ProtectedRoute allowedRoles={['bhangarwala']}><ActiveJob /></ProtectedRoute>} />
            <Route path="/bhangarwala/history" element={<ProtectedRoute allowedRoles={['bhangarwala']}><BHistory /></ProtectedRoute>} />
            <Route path="/bhangarwala/profile" element={<ProtectedRoute allowedRoles={['bhangarwala']}><BProfile /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </InteractionLayer>
      </AuthProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
export default App;

