import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';
import { safeJsonParse } from '../utils';

class StorageService {
  // Generic storage methods
  async setItem(key, value) {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
      return false;
    }
  }

  async getItem(key, defaultValue = null) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return defaultValue;
      return safeJsonParse(value, value);
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return defaultValue;
    }
  }

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      return false;
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  // Auth-specific methods
  async setAuthToken(token) {
    return this.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  async getAuthToken() {
    return this.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  async removeAuthToken() {
    return this.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  async setUserData(userData) {
    return this.setItem(STORAGE_KEYS.USER_DATA, userData);
  }

  async getUserData() {
    return this.getItem(STORAGE_KEYS.USER_DATA);
  }

  async removeUserData() {
    return this.removeItem(STORAGE_KEYS.USER_DATA);
  }

  // Language methods
  async setLanguage(language) {
    return this.setItem(STORAGE_KEYS.LANGUAGE, language);
  }

  async getLanguage() {
    return this.getItem(STORAGE_KEYS.LANGUAGE, 'en');
  }

  // Onboarding methods
  async setOnboardingSeen(seen = true) {
    return this.setItem(STORAGE_KEYS.ONBOARDING, seen.toString());
  }

  async getOnboardingSeen() {
    const seen = await this.getItem(STORAGE_KEYS.ONBOARDING);
    return seen === 'true';
  }

  // Clear all auth data
  async clearAuthData() {
    await this.removeAuthToken();
    await this.removeUserData();
  }
}

export default new StorageService();
