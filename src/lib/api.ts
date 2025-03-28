import axios from 'axios';
import { Pack, Card } from '../contexts/GameContext';

// Determine the API base URL based on environment
const isProduction = import.meta.env.PROD;
const SERVER_URL = isProduction 
  ? 'http://161.97.177.233/api' // Remote server in production
  : 'http://localhost:3001';    // Local development

interface User {
  id: string;
  username: string;
  email: string;
  type: 'admin' | 'premium' | 'normal';
}

interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

// Create an axios instance with default config
const api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API service methods
export const apiService = {
  // Auth
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  // Packs
  getAllPacks: async () => {
    const response = await api.get('/packs');
    return response.data;
  },

  getPackById: async (id: string) => {
    const response = await api.get(`/packs/${id}`);
    return response.data;
  },

  createPack: async (packData: { name: string; description: string }) => {
    const response = await api.post('/packs', packData);
    return response.data;
  },

  updatePack: async (id: string, packData: { name: string; description: string }) => {
    const response = await api.put(`/packs/${id}`, packData);
    return response.data;
  },

  deletePack: async (id: string) => {
    const response = await api.delete(`/packs/${id}`);
    return response.data;
  },

  // Cards
  getAllCards: async () => {
    const response = await api.get('/cards');
    return response.data;
  },

  getCardsByPackId: async (packId: string) => {
    const response = await api.get(`/packs/${packId}/cards`);
    return response.data;
  },

  createCard: async (cardData: { pack_id: string; type: 'truth' | 'dare'; content: string }) => {
    const response = await api.post('/cards', cardData);
    return response.data;
  },

  updateCard: async (id: string, cardData: { type?: 'truth' | 'dare'; content?: string }) => {
    const response = await api.put(`/cards/${id}`, cardData);
    return response.data;
  },

  deleteCard: async (id: string) => {
    const response = await api.delete(`/cards/${id}`);
    return response.data;
  },

  // Users
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Error handler helper
  handleError: (error: any) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Status:', error.response.status);
      
      // Handle 401 Unauthorized errors (token expired, etc)
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page
      }
      
      return error.response.data.message || 'An error occurred';
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request:', error.request);
      return 'No response from server. Please try again later.';
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message || 'An unexpected error occurred';
    }
  }
};

export default apiService; 