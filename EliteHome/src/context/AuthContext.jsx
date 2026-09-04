import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      // If no token at all, user is definitely not logged in
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Set user from localStorage immediately so protected routes render
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // Try to verify token with the server
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem('user', JSON.stringify(currentUser));
        }
      } catch (err) {
        // Only clear the user if the server explicitly says the token is invalid (401)
        // If the server is unreachable (network error), keep the stored user
        if (err?.response?.status === 401) {
          setUser(null);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
        // For network errors or other issues: keep the user from localStorage
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateProfile = async (userData) => {
    const data = await authService.updateProfile(userData);
    setUser(data.user);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout, updateProfile }}>
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
