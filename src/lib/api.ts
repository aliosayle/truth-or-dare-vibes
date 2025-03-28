import axios from 'axios';
import { Pack, Card } from '../contexts/GameContext';

interface User {
  id: number | string;
  username: string;
  email: string;
  type?: string;
}

interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

const isDev = import.meta.env.DEV;
const API_URL = isDev 
  ? 'http://localhost:3005/api' 
  : 'http://161.97.177.233:3005/api';

console.log('API URL set to:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization header if token exists
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
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
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
    try {
      const response = await api.post<AuthResponse>('/auth/register', { username, email, password, type });
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
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  setCurrentUser: (user: User, token: string): User => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },
  isAuthenticated: (): boolean => {
    return localStorage.getItem('token') !== null;
  }
};

// Packs API
export const packsApi = {
  getAllPacks: async (): Promise<Pack[]> => {
    try {
      const response = await api.get<Pack[]>('/packs');
      return response.data;
    } catch (error) {
      console.error('Get all packs error:', error);
      throw error;
    }
  },
  getPackById: async (id: string): Promise<Pack> => {
    try {
      const response = await api.get<Pack>(`/packs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get pack ${id} error:`, error);
      throw error;
    }
  },
  createPack: async (packData: Omit<Pack, 'id' | 'created_at' | 'updated_at' | 'cards'>): Promise<Pack> => {
    const response = await api.post<Pack>('/packs', packData);
    return response.data;
  },
  updatePack: async (id: string, packData: Partial<Pack>): Promise<Pack> => {
    const response = await api.put<Pack>(`/packs/${id}`, packData);
    return response.data;
  },
  deletePack: async (id: string): Promise<void> => {
    await api.delete(`/packs/${id}`);
  }
};

// Cards API
export const cardsApi = {
  getCardsForPack: async (packId: string | number): Promise<Card[]> => {
    try {
      const response = await api.get<Card[]>(`/packs/${packId}/cards`);
      return response.data;
    } catch (error) {
      console.error(`Get cards for pack ${packId} error:`, error);
      throw error;
    }
  },
  createCard: async (cardData: Omit<Card, 'id' | 'created_at' | 'updated_at'>): Promise<Card> => {
    const response = await api.post<Card>('/cards', cardData);
    return response.data;
  },
  deleteCard: async (id: string): Promise<void> => {
    await api.delete(`/cards/${id}`);
  }
};

export default api;