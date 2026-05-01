import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../core/api';
import { API_ENDPOINTS } from '../../config/endpoints';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUser = await AsyncStorage.getItem('userData');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const normalizedEmail = (email || '').trim().toLowerCase();
      const payload = { email: normalizedEmail, password };
      const loginPath = API_ENDPOINTS.AUTH.LOGIN;
      const { data } = await api.post(loginPath, payload, {
        headers: { 'Content-Type': 'application/json', 'x-skip-auth': 'true' },
      });
      console.log('Login success response:', JSON.stringify(data));
      const authToken = data?.token || data?.accessToken || data?.access_token;
      const userData = data?.user || data?.data?.user || null;
      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setToken(authToken);
      setUser(userData);
      return { success: true, data };
    } catch (error) {
      console.log('Login error status:', error?.response?.status);
      console.log('Login error data:', JSON.stringify(error?.response?.data));
      // Fallback: try alternate path if 404/405
      const status = error?.response?.status;
      const data = error?.response?.data;
      const isPathIssue = status === 404 || status === 405;
      if (isPathIssue) {
        try {
          const current = API_ENDPOINTS.AUTH.LOGIN;
          const alternate = current === '/api/login' ? '/api/auth/login' : '/api/login';
          const normalizedEmail = (email || '').trim().toLowerCase();
          const payload = { email: normalizedEmail, password };
          const res2 = await api.post(alternate, payload, {
            headers: { 'Content-Type': 'application/json', 'x-skip-auth': 'true' },
          });
          const d2 = res2?.data || {};
          const authToken = d2?.token || d2?.accessToken || d2?.access_token;
          const userData = d2?.user || d2?.data?.user || null;
          await AsyncStorage.setItem('authToken', authToken);
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          setToken(authToken);
          setUser(userData);
          return { success: true, data: d2 };
        } catch (e2) {
          console.log('Alternate login error status:', e2?.response?.status);
          console.log('Alternate login error data:', JSON.stringify(e2?.response?.data));
        }
      }
      const message = data?.message || 'Login failed';
      return { success: false, error: message };
    }
  };

  const register = async (email, password) => {
    try {
      const { data } = await api.post(
        API_ENDPOINTS.AUTH.REGISTER,
        { email, password },
        { headers: { 'Content-Type': 'application/json', 'x-skip-auth': 'true' } }
      );
      return { success: true, data };
    } catch (error) {
      const message = error?.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const { data } = await api.post(
        API_ENDPOINTS.AUTH.VERIFY_OTP,
        { email, otp },
        { headers: { 'Content-Type': 'application/json', 'x-skip-auth': 'true' } }
      );
      const { token: authToken, user: userData } = data;
      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setToken(authToken);
      setUser(userData);
      return { success: true, data };
    } catch (error) {
      const message = error?.response?.data?.message || 'OTP verification failed';
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    verifyOTP,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
