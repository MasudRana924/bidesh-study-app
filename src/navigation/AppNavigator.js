import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../shared';
import { ROUTES, SCREEN_OPTIONS } from '../config/routes';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import MainScreen from '../screens/MainScreen';
import InstituteDetailsScreen from '../screens/InstituteDetailsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ApplicationForm from '../screens/ApplicationForm';
import AdviserChat from '../screens/AdviserChat';
import EventsScreen from '../screens/EventsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SupportScreen from '../screens/SupportScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ForgotPasswordEmailScreen from '../screens/ForgotPasswordEmailScreen';
import ForgotPasswordOTPScreen from '../screens/ForgotPasswordOTPScreen';
import ForgotPasswordResetScreen from '../screens/ForgotPasswordResetScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [showOnboarding, setShowOnboarding] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem('hasSeenOnboarding');
        setShowOnboarding(!v);
      } catch {
        setShowOnboarding(true);
      }
    })();
  }, []);

  // Show loading screen while checking authentication
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? ROUTES.MAIN.MAIN : (showOnboarding ? ROUTES.ONBOARDING.ONBOARDING : ROUTES.AUTH.SIGN_IN)}
        screenOptions={SCREEN_OPTIONS.DEFAULT}
      >
        {!isAuthenticated && showOnboarding && (
          <Stack.Screen name={ROUTES.ONBOARDING.ONBOARDING} component={OnboardingScreen} />
        )}
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name={ROUTES.AUTH.SIGN_IN} component={SignInScreen} />
            <Stack.Screen name={ROUTES.AUTH.SIGN_UP} component={SignUpScreen} />
            <Stack.Screen name={ROUTES.AUTH.OTP_VERIFICATION} component={OTPVerificationScreen} />
            <Stack.Screen name={ROUTES.AUTH.FORGOT_PASSWORD_EMAIL} component={ForgotPasswordEmailScreen} options={SCREEN_OPTIONS.DEFAULT} />
            <Stack.Screen name={ROUTES.AUTH.FORGOT_PASSWORD_OTP} component={ForgotPasswordOTPScreen} options={SCREEN_OPTIONS.DEFAULT} />
            <Stack.Screen name={ROUTES.AUTH.FORGOT_PASSWORD_RESET} component={ForgotPasswordResetScreen} options={SCREEN_OPTIONS.DEFAULT} />
          </>
        ) : (
          // Main App Stack
          <>
            <Stack.Screen name={ROUTES.MAIN.MAIN} component={MainScreen} />
            <Stack.Screen
              name={ROUTES.MAIN.INSTITUTION_DETAILS}
              component={InstituteDetailsScreen}
              options={SCREEN_OPTIONS.DEFAULT}
            />
            <Stack.Screen
              name={ROUTES.MAIN.NOTIFICATIONS}
              component={NotificationsScreen}
              options={SCREEN_OPTIONS.DEFAULT}
            />
            <Stack.Screen
              name={ROUTES.MAIN.APPLICATION_FORM}
              component={ApplicationForm}
              options={SCREEN_OPTIONS.DEFAULT}
            />
            <Stack.Screen
              name={ROUTES.MAIN.ADVISER_CHAT}
              component={AdviserChat}
              options={SCREEN_OPTIONS.DEFAULT}
            />
            <Stack.Screen
              name={ROUTES.MAIN.EVENTS}
              component={EventsScreen}
              options={SCREEN_OPTIONS.DEFAULT}
            />
            <Stack.Screen
              name={ROUTES.MAIN.SUPPORT}
              component={SupportScreen}
              options={SCREEN_OPTIONS.DEFAULT}
            />
            <Stack.Screen
              name={ROUTES.MAIN.CHANGE_PASSWORD}
              component={ChangePasswordScreen}
              options={SCREEN_OPTIONS.DEFAULT}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
