import React, { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthContextType {
  user: { email: string } | null;
  isLoading: boolean;
  isSignout: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreToken: () => Promise<void>;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isSignout: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  restoreToken: async () => {},
  error: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

const API_URL = 'API_URL'; // Replace with your backend URL

// Demo mode: use mock authentication if API_URL is not set
const USE_DEMO_MODE = API_URL === 'API_URL';

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useState({
    isLoading: true,
    isSignout: false,
    user: null as { email: string } | null,
    userToken: null as string | null,
  });
  const [error, setError] = useState<string | null>(null);

  // Restore token on app load
  const restoreToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const email = await AsyncStorage.getItem('userEmail');

      dispatch({
        isLoading: false,
        isSignout: false,
        user: token && email ? { email } : null,
        userToken: token,
      });
    } catch (e) {
      console.log('Failed to restore token:', e);
      dispatch({
        isLoading: false,
        isSignout: false,
        user: null,
        userToken: null,
      });
    }
  }, []);

  useEffect(() => {
    restoreToken();
  }, [restoreToken]);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);

    // Validation
    if (!email || !password) {
      setError('Email and password are required');
      throw new Error('Email and password are required');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      throw new Error('Invalid email format');
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      throw new Error('Password must be at least 6 characters');
    }

    try {
      // Demo mode: simulate successful login
      if (USE_DEMO_MODE) {
        const mockToken = `mock-token-${Date.now()}`;
        await AsyncStorage.setItem('userToken', mockToken);
        await AsyncStorage.setItem('userEmail', email);

        dispatch({
          isLoading: false,
          isSignout: false,
          user: { email },
          userToken: mockToken,
        });
        return;
      }

      // Replace with your actual API endpoint
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorMessage = 'Login failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Response is not JSON (e.g., HTML error page)
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const { token } = data;

      // Store token and user info
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userEmail', email);

      dispatch({
        isLoading: false,
        isSignout: false,
        user: { email },
        userToken: token,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, confirmPassword: string) => {
    setError(null);

    // Validation
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      throw new Error('All fields are required');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      throw new Error('Invalid email format');
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      throw new Error('Password must be at least 6 characters');
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      throw new Error('Passwords do not match');
    }

    try {
      // Demo mode: simulate successful registration
      if (USE_DEMO_MODE) {
        const mockToken = `mock-token-${Date.now()}`;
        await AsyncStorage.setItem('userToken', mockToken);
        await AsyncStorage.setItem('userEmail', email);

        dispatch({
          isLoading: false,
          isSignout: false,
          user: { email },
          userToken: mockToken,
        });
        return;
      }

      // Replace with your actual API endpoint
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorMessage = 'Registration failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Response is not JSON (e.g., HTML error page)
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const { token } = data;

      // Store token and user info
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userEmail', email);

      dispatch({
        isLoading: false,
        isSignout: false,
        user: { email },
        userToken: token,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during registration';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userEmail');
      setError(null);

      dispatch({
        isLoading: false,
        isSignout: true,
        user: null,
        userToken: null,
      });
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        isSignout: state.isSignout,
        login,
        register,
        logout,
        restoreToken,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
