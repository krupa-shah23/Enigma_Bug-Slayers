import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // E04 Restore session on app mount
  const checkAuth = async () => {
    const token = localStorage.getItem('rewaste_access_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get('/auth/me');
      if (res.data.success) {
        setUser(res.data.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
      localStorage.removeItem('rewaste_access_token');
      localStorage.removeItem('rewaste_refresh_token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // E02 Login
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success) {
      const { user: userData, accessToken, refreshToken } = res.data.data;
      localStorage.setItem('rewaste_access_token', accessToken);
      localStorage.setItem('rewaste_refresh_token', refreshToken);
      setUser(userData);
      return userData;
    }
    throw new Error(res.data?.error?.message || 'Login failed');
  };

  // E01 Signup
  const signup = async (payload) => {
    const res = await api.post('/auth/signup', payload);
    if (res.data.success) {
      const { user: userData, accessToken, refreshToken } = res.data.data;
      localStorage.setItem('rewaste_access_token', accessToken);
      localStorage.setItem('rewaste_refresh_token', refreshToken);
      setUser(userData);
      return userData;
    }
    throw new Error(res.data?.error?.message || 'Signup failed');
  };

  // E03 Logout
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Ignore errors on logout
    } finally {
      localStorage.removeItem('rewaste_access_token');
      localStorage.removeItem('rewaste_refresh_token');
      setUser(null);
    }
  };

  // Helper to refresh user context manually (e.g. after joining society or verifying)
  const refreshUser = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.data.success) {
        setUser(res.data.data.user);
      }
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
