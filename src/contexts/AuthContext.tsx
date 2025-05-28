import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types/User';
import { sampleUsers } from '../data/sampleUsers';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        setLoading(true);
        // For demo purposes, let's auto-login as the first user
        // In a real app, you'd check localStorage/cookies for a token
        // and then validate it with your backend
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Auto-login for demo
        // Comment this out to start with logged out state
        // setUser(sampleUsers[0]);
        
        setLoading(false);
      } catch (err) {
        setError('Authentication check failed');
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call for login
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = sampleUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') { // Simplified auth for demo
        setUser(foundUser);
        setLoading(false);
        return true;
      } else {
        setError('Invalid email or password');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError('Login failed');
      setLoading(false);
      return false;
    }
  };

  const signup = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call for signup
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email is already in use
      if (sampleUsers.some(u => u.email === userData.email)) {
        setError('Email already in use');
        setLoading(false);
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        ...userData,
      };
      
      // In a real app, you'd send this to your backend
      // For demo, we'll just set the user as logged in
      setUser(newUser);
      setLoading(false);
      return true;
    } catch (err) {
      setError('Signup failed');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    // Clear user state and any tokens
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        loading, 
        error, 
        login, 
        signup, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};