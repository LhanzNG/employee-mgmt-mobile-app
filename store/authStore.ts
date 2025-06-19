import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  position: string;
  photoUrl?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
  
  initializeAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, position: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
  
  initializeAuth: async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      
      if (userData) {
        const user = JSON.parse(userData);
        set({ isAuthenticated: true, user, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isLoading: false, error: 'Failed to initialize authentication' });
    }
  },
  
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock login - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if mock credentials match
      if (email === 'admin@company.com' && password === 'password123') {
        const user: User = {
          id: '1',
          name: 'John Smith',
          email: 'admin@company.com',
          position: 'HR Director',
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(user));
        set({ isAuthenticated: true, user, isLoading: false });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      });
      throw error;
    }
  },
  
  register: async (name: string, email: string, password: string, position: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock registration - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
        position,
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ isAuthenticated: true, user, isLoading: false });
    } catch (error) {
      console.error('Registration error:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      });
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await AsyncStorage.removeItem('user');
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error('Logout error:', error);
      set({ error: 'Failed to logout' });
    }
  },
}));