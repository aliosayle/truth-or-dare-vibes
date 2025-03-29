import axios from 'axios';
import { Pack, Card } from '../contexts/GameContext';

// Use local server for development
const API_URL = 'http://127.0.0.1:3001/api';

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

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    console.log('Login API call with:', { email, password: password ? '[PASSWORD PROVIDED]' : 'missing' });
    
    if (!email || !password) {
      console.error('Login failed: Missing email or password');
      throw new Error('Email and password are required');
    }
    
    const loginData = { email, password };
    console.log('Request payload:', JSON.stringify(loginData));
    
    try {
      // Try login with explicit content type header
      const response = await api.post<AuthResponse>('/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Login API response:', {
        status: response.status,
        hasToken: !!response.data.token,
        hasUser: !!response.data.user
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      console.error('Login API error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      });
      throw error;
    }
  },

  register: async (username: string, email: string, password: string, type?: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', { username, email, password, type });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/auth/users');
    return response.data;
  },

  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/auth/users/${id}`, updates);
    return response.data;
  },

  deleteUser: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/auth/users/${id}`);
    return response.data;
  },
};

// Packs API
export const packsApi = {
  getAllPacks: async (): Promise<Pack[]> => {
    const response = await api.get<Pack[]>('/packs');
    return response.data;
  },

  getPackById: async (id: string): Promise<Pack> => {
    const response = await api.get<Pack>(`/packs/${id}`);
    return response.data;
  },

  createPack: async (packData: Omit<Pack, 'id' | 'created_at' | 'updated_at'>): Promise<Pack> => {
    const response = await api.post<Pack>('/packs', packData);
    return response.data;
  },

  updatePack: async (id: string, packData: Partial<Pack>): Promise<Pack> => {
    const response = await api.put<Pack>(`/packs/${id}`, packData);
    return response.data;
  },

  deletePack: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/packs/${id}`);
    return response.data;
  },
};

// Cards API
export const cardsApi = {
  getAllCards: async (): Promise<Card[]> => {
    const response = await api.get<Card[]>('/cards');
    return response.data;
  },

  getCardById: async (id: string): Promise<Card> => {
    const response = await api.get<Card>(`/cards/${id}`);
    return response.data;
  },

  createCard: async (cardData: Omit<Card, 'id' | 'created_at' | 'updated_at'>): Promise<Card> => {
    const response = await api.post<Card>('/cards', cardData);
    return response.data;
  },

  updateCard: async (id: string, cardData: Partial<Card>): Promise<Card> => {
    const response = await api.put<Card>(`/cards/${id}`, cardData);
    return response.data;
  },

  deleteCard: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/cards/${id}`);
    return response.data;
  },
}; 