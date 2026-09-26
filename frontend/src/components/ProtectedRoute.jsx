import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles, requireOfficer = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to matching login depending on path
    if (location.pathname.startsWith('/ngo')) {
      return <Navigate to="/ngo/login" state={{ from: location }} replace />;
    }
    if (location.pathname.startsWith('/bhangarwala')) {
      return <Navigate to="/bhangarwala/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/person/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to user's home dashboard if role mismatch
    if (user.role === 'ngo') return <Navigate to="/ngo/dashboard" replace />;
    if (user.role === 'bhangarwala') return <Navigate to="/bhangarwala/requests" replace />;
    return <Navigate to="/home" replace />;
  }

  if (requireOfficer && user.societyRole !== 'officer') {
    return <Navigate to="/my-society" replace />;
  }

  return children;
};
