// Navigation Routes Configuration
// This file contains all route names and screen configurations used throughout the application

export const ROUTES = {
  // Authentication Routes
  AUTH: {
    SIGN_IN: 'SignIn',
    SIGN_UP: 'SignUp',
    OTP_VERIFICATION: 'OTPVerification',
    FORGOT_PASSWORD_EMAIL: 'ForgotPasswordEmail',
    FORGOT_PASSWORD_OTP: 'ForgotPasswordOTP',
    FORGOT_PASSWORD_RESET: 'ForgotPasswordReset',
  },

  // Main App Routes
  MAIN: {
    MAIN: 'Main',
    PROFILE: 'Profile',
    INSTITUTION_DETAILS: 'InstitutionDetails',
    NOTIFICATIONS: 'Notifications',
    APPLICATION_FORM: 'Apply',
    ADVISER_CHAT: 'Chat',
    EVENTS: 'Events',
    SUPPORT: 'Support',
    CHANGE_PASSWORD: 'ChangePassword',
  },

  // Onboarding Routes
  ONBOARDING: {
    ONBOARDING: 'Onboarding',
  },

  // Splash Route
  SPLASH: {
    SPLASH: 'Splash',
  },
};

// Screen options configuration
export const SCREEN_OPTIONS = {
  DEFAULT: {
    headerShown: false,
  },
  WITH_HEADER: {
    headerShown: true,
  },
  MODAL: {
    presentation: 'modal',
    headerShown: false,
  },
  FULLSCREEN: {
    headerShown: false,
    gestureEnabled: false,
  },
};

// Route groups for easier navigation
export const AUTH_ROUTES = [
  ROUTES.AUTH.SIGN_IN,
  ROUTES.AUTH.SIGN_UP,
  ROUTES.AUTH.OTP_VERIFICATION,
  ROUTES.AUTH.FORGOT_PASSWORD_EMAIL,
  ROUTES.AUTH.FORGOT_PASSWORD_OTP,
  ROUTES.AUTH.FORGOT_PASSWORD_RESET,
];

export const MAIN_ROUTES = [
  ROUTES.MAIN.MAIN,
  ROUTES.MAIN.INSTITUTION_DETAILS,
  ROUTES.MAIN.NOTIFICATIONS,
  ROUTES.MAIN.APPLICATION_FORM,
  ROUTES.MAIN.ADVISER_CHAT,
  ROUTES.MAIN.EVENTS,
  ROUTES.MAIN.SUPPORT,
  ROUTES.MAIN.CHANGE_PASSWORD,
];

export default ROUTES;
