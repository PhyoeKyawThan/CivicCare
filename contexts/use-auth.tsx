// hooks/useAuth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

type UserRole = 'citizen' | 'official' | 'admin';

interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  dateOfBirth?: string;
  avatar?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const STORAGE_KEYS = {
  USER: '@CivicCare:user',
  TOKEN: '@CivicCare:token',
};

export default function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const [error, setError] = useState<string | null>(null);

  // Load saved auth data on mount
  useEffect(() => {
    loadAuthData();
  }, []);

  const loadAuthData = async () => {
    try {
      const [userData, token] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
      ]);

      if (userData && token) {
        setAuthState({
          user: JSON.parse(userData),
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Failed to load auth data:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const saveAuthData = async (user: User, token: string) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
      ]);
    } catch (error) {
      console.error('Failed to save auth data:', error);
      throw error;
    }
  };

  const clearAuthData = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
      ]);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  };

  const login = useCallback(async (credentials: LoginCredentials) => {
    setError(null);
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.token && data.user) {
        await saveAuthData(data.user, data.token);
        
        setAuthState({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
          isLoading: false,
        });
        
        return data;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'An error occurred during login');
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setError(null);
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.token && result.user) {
        await saveAuthData(result.user, result.token);
        
        setAuthState({
          user: result.user,
          token: result.token,
          isAuthenticated: true,
          isLoading: false,
        });
        
        return result;
      } else {
        throw new Error(result.message || 'Signup failed');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'An error occurred during signup');
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await clearAuthData();
      
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError('Failed to logout');
      throw error;
    }
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    if (!authState.user) {
      throw new Error('Not authenticated');
    }

    try {
      const updatedUser = { ...authState.user, ...updates };
      await saveAuthData(updatedUser, authState.token!);
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
      
      return updatedUser;
    } catch (error: any) {
      console.error('Update user error:', error);
      setError(error.message || 'Failed to update user');
      throw error;
    }
  }, [authState.user, authState.token]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error,
    
    // Actions
    login,
    signup,
    logout,
    updateUser,
    clearError,
    
    // Quick check helpers
    isCitizen: authState.user?.role === 'citizen',
    isOfficial: authState.user?.role === 'official',
    isAdmin: authState.user?.role === 'admin',
  };
}