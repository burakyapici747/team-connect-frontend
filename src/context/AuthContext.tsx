"use client";

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await signOut({ redirect: false });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    login,
    logout,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading' || isLoading,
    user: session?.user ?? null,
  };

  return (
    <AuthContext.Provider value={value}>
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