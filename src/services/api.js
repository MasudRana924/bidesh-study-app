import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Resolve base URL once
const DEFAULT_BASE_URL = 'https://admission-backend-1-xsai.onrender.com/api';
const API_BASE_URL = process.env.API_BASE_URL || DEFAULT_BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Request interceptor to add auth token (skips when x-skip-auth is true)
api.interceptors.request.use(
  async (config) => {
    try {
      const skipAuth = config?.headers && config.headers['x-skip-auth'] === 'true';
      if (!skipAuth) {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage
      try {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userData');
      } catch (storageError) {
        console.error('Error clearing storage:', storageError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
