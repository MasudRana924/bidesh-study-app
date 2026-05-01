import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES, SCREEN_OPTIONS } from '../config';

// Import auth screens
import {
  SignInScreen,
  SignUpScreen,
  OTPVerificationScreen,
  ForgotPasswordEmailScreen,
  ForgotPasswordOTPScreen,
  ForgotPasswordResetScreen,
} from '../features/auth';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.AUTH.SIGN_IN}
      screenOptions={SCREEN_OPTIONS.DEFAULT}
    >
      <Stack.Screen name={ROUTES.AUTH.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={ROUTES.AUTH.SIGN_UP} component={SignUpScreen} />
      <Stack.Screen name={ROUTES.AUTH.OTP_VERIFICATION} component={OTPVerificationScreen} />
      <Stack.Screen 
        name={ROUTES.AUTH.FORGOT_PASSWORD_EMAIL} 
        component={ForgotPasswordEmailScreen} 
        options={SCREEN_OPTIONS.DEFAULT} 
      />
      <Stack.Screen 
        name={ROUTES.AUTH.FORGOT_PASSWORD_OTP} 
        component={ForgotPasswordOTPScreen} 
        options={SCREEN_OPTIONS.DEFAULT} 
      />
      <Stack.Screen 
        name={ROUTES.AUTH.FORGOT_PASSWORD_RESET} 
        component={ForgotPasswordResetScreen} 
        options={SCREEN_OPTIONS.DEFAULT} 
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
