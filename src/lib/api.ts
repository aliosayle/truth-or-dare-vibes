import axios from 'axios';
import { Pack, Card } from '../contexts/GameContext';

const API_URL = 'http://161.97.177.233:3001/api';

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
    console.log('Login attempt with:', { email, password });
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      console.log('Login response:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (username: string, email: string, password: string, type?: string): Promise<AuthResponse> => {
    console.log('Register attempt with:', { username, email, type });
    try {
      const response = await api.post<AuthResponse>('/auth/register', { username, email, password, type });
      console.log('Register response:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
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