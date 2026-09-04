import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api` || 'http://127.0.0.1:8000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Accept': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

const messageService = {
  sendMessage: async (messageData) => {
    const response = await axios.post(`${API_URL}/messages`, messageData, {
      headers: getHeaders()
    });
    return response.data;
  }
};

export default messageService;
