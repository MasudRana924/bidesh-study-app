// Type definitions and interfaces
// Note: In a TypeScript project, these would be .ts files with proper interfaces

export const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
  ADVISER: 'adviser',
};

export const APPLICATION_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

export const LANGUAGES = {
  ENGLISH: 'en',
  BENGALI: 'bn',
};

// Common data structures
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  total: 0,
};

export const API_RESPONSE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
};
