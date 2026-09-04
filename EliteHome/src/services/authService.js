import axios from 'axios';

// Use JSON strictly
axios.defaults.headers.common['Accept'] = 'application/json';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';
const API_URL = `${BACKEND_URL}/api`;

const authService = {
  register: async (userData) => {
    // Sanctum CSRF protection is generally needed if not pure API tokens, 
    // but the backend exception and setup uses pure tokens.
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    // Let errors propagate so callers can distinguish 401 vs network errors
    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateProfile: async (userData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/user/update`, userData, {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }
};

export default authService;
