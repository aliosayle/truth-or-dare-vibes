import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiService from '../lib/api';

export type UserType = 'admin' | 'premium' | 'normal';

export interface User {
  id: string;
  username: string;
  email: string;
  type: UserType;
  created_at: string;
}

interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const userData = await apiService.getCurrentUser() as User;
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Failed to fetch current user:', err);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.login(email, password) as AuthResponse;
      
      // Store token
      localStorage.setItem('token', response.token);
      
      // Set user and auth state
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(apiService.handleError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.register(username, email, password) as AuthResponse;
      
      // Store token
      localStorage.setItem('token', response.token);
      
      // Set user and auth state
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(apiService.handleError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
