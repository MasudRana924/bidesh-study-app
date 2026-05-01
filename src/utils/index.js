// Utility functions
import { VALIDATION_RULES } from '../constants';

// Validation utilities
export const validateEmail = (email) => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

export const validatePassword = (password) => {
  return password.length >= VALIDATION_RULES.MIN_PASSWORD_LENGTH;
};

// String utilities
export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Date utilities
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString();
};

// Number utilities
export const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

// Array utilities
export const removeDuplicates = (array, key) => {
  return array.filter((item, index, self) => 
    index === self.findIndex(t => t[key] === item[key])
  );
};

// Object utilities
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Async storage utilities
export const safeJsonParse = (jsonString, fallback = null) => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
};

// Error handling
export const getErrorMessage = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
