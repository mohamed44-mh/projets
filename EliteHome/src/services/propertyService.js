import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api` || 'http://127.0.0.1:8000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Accept': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

const propertyService = {
  // Public: Get all properties from all users
  getAllProperties: async () => {
    const response = await axios.get(`${API_URL}/properties/all`);
    return response.data;
  },

  // Private: Get properties of the authenticated user
  getUserProperties: async () => {
    const response = await axios.get(`${API_URL}/properties`, {
      headers: getHeaders()
    });
    return response.data;
  },

  // Private: Create a new property
  createProperty: async (formData) => {
    const response = await axios.post(`${API_URL}/properties`, formData, {
      headers: {
        ...getHeaders(),
        // Axios sets multipart/form-data automatically for FormData
      }
    });
    return response.data;
  },

  // Private: Get a single property details
  getProperty: async (id) => {
    const response = await axios.get(`${API_URL}/properties/${id}`, {
      headers: getHeaders()
    });
    return response.data;
  },

  // Private: Update an existing property
  // Note: We use POST with _method=PUT because Laravel doesn't handle multipart/form-data with PUT natively
  updateProperty: async (id, formData) => {
    if (formData instanceof FormData) {
      formData.append('_method', 'PUT');
    }
    const response = await axios.post(`${API_URL}/properties/${id}`, formData, {
      headers: {
        ...getHeaders(),
      }
    });
    return response.data;
  },

  // Private: Delete a property
  deleteProperty: async (id) => {
    const response = await axios.delete(`${API_URL}/properties/${id}`, {
      headers: getHeaders()
    });
    return response.data;
  },

  // Private: Rate a property
  rateProperty: async (id, score) => {
    const response = await axios.post(`${API_URL}/properties/${id}/rate`, { score }, {
      headers: getHeaders()
    });
    return response.data;
  }
};

export default propertyService;
