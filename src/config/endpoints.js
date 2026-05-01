// API Endpoints Configuration
// This file contains all API endpoints used throughout the application

export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_OTP: '/auth/verify-otp',
    FORGOT_PASSWORD_EMAIL: '/api/auth/forgot-password/email',
    FORGOT_PASSWORD_OTP: '/api/auth/forgot-password/verify-otp',
    RESET_PASSWORD: '/api/auth/forgot-password/reset',
    CHANGE_PASSWORD: '/api/auth/change-password',
    LOGOUT: '/api/auth/logout',
    REFRESH_TOKEN: '/api/auth/refresh',
  },

  // User endpoints
  USER: {
    ME: '/api/users/me',
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    DELETE_ACCOUNT: '/api/users/account',
  },

  // Institution endpoints
  INSTITUTIONS: {
    LIST: '/institutions',
    DETAILS: (id) => `/institutions/${id}`,
    CREATE: '/institutions',
    UPDATE: (id) => `/institutions/${id}`,
    DELETE: (id) => `/institutions/${id}`,
    SEARCH: '/institutions/search',
    FILTER: '/institutions/filter',
  },

  // Application endpoints
  APPLICATIONS: {
    LIST: '/api/applications',
    CREATE: '/api/applications',
    DETAILS: (id) => `/api/applications/${id}`,
    UPDATE: (id) => `/api/applications/${id}`,
    DELETE: (id) => `/api/applications/${id}`,
    STATUS: (id) => `/api/applications/${id}/status`,
  },

  // Events endpoints
  EVENTS: {
    LIST: '/api/events',
    DETAILS: (id) => `/api/events/${id}`,
    CREATE: '/api/events',
    UPDATE: (id) => `/api/events/${id}`,
    DELETE: (id) => `/api/events/${id}`,
    REGISTER: (id) => `/api/events/${id}/register`,
  },

  // Chat/Support endpoints
  CHAT: {
    MESSAGES: '/api/chat/messages',
    SEND_MESSAGE: '/api/chat/messages',
    ADVISERS: '/api/chat/advisers',
    CONVERSATIONS: '/api/chat/conversations',
  },

  // Notifications endpoints
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    MARK_READ: (id) => `/api/notifications/${id}/read`,
    MARK_ALL_READ: '/api/notifications/read-all',
    DELETE: (id) => `/api/notifications/${id}`,
  },

  // File upload endpoints
  UPLOAD: {
    IMAGE: '/api/upload/image',
    DOCUMENT: '/api/upload/document',
    AVATAR: '/api/upload/avatar',
  },
};

// Helper function to build dynamic endpoints
export const buildEndpoint = (endpoint, ...params) => {
  if (typeof endpoint === 'function') {
    return endpoint(...params);
  }
  return endpoint;
};

export default API_ENDPOINTS;
