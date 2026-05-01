// Navigation utilities and helpers
import { ROUTES } from '../config';

export const navigationRef = {
  current: null,
};

export const navigate = (routeName, params = {}) => {
  if (navigationRef.current) {
    navigationRef.current.navigate(routeName, params);
  }
};

export const goBack = () => {
  if (navigationRef.current) {
    navigationRef.current.goBack();
  }
};

export const reset = (routeName, params = {}) => {
  if (navigationRef.current) {
    navigationRef.current.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    });
  }
};

// Navigation helpers for specific flows
export const NavigationHelpers = {
  // Auth flow
  toSignIn: () => navigate(ROUTES.AUTH.SIGN_IN),
  toSignUp: () => navigate(ROUTES.AUTH.SIGN_UP),
  toForgotPassword: () => navigate(ROUTES.AUTH.FORGOT_PASSWORD_EMAIL),
  toOTPVerification: (email) => navigate(ROUTES.AUTH.OTP_VERIFICATION, { email }),

  // Main app flow
  toHome: () => navigate(ROUTES.MAIN.MAIN),
  toProfile: () => navigate(ROUTES.MAIN.PROFILE),
  toNotifications: () => navigate(ROUTES.MAIN.NOTIFICATIONS),
  toChat: () => navigate(ROUTES.MAIN.ADVISER_CHAT),
  toInstitutions: () => navigate(ROUTES.MAIN.INSTITUTION_DETAILS),
  toEvents: () => navigate(ROUTES.MAIN.EVENTS),
  toSupport: () => navigate(ROUTES.MAIN.SUPPORT),
  toApplicationForm: () => navigate(ROUTES.MAIN.APPLICATION_FORM),
  toChangePassword: () => navigate(ROUTES.MAIN.CHANGE_PASSWORD),

  // Reset to main app
  resetToMain: () => reset(ROUTES.MAIN.MAIN),
  resetToAuth: () => reset(ROUTES.AUTH.SIGN_IN),
};

export default NavigationHelpers;
