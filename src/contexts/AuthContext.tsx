
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";

type Role = 'user' | 'admin' | null;

interface AuthContextType {
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(null);

  const login = (role: Role) => {
    setRole(role);
    toast.success(`Logged in as ${role}`);
  };

  const logout = () => {
    setRole(null);
    toast.info("Logged out successfully");
  };

  const value = {
    role,
    login,
    logout,
    isAuthenticated: role !== null,
    isAdmin: role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
