import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES, SCREEN_OPTIONS } from '../config';
import TabNavigator from './TabNavigator';

// Import main screens
import {
  ProfileScreen,
  InstitutionDetailsScreen,
  NotificationsScreen,
  ApplicationFormScreen,
  AdviserChatScreen,
  SupportScreen,
  ChangePasswordScreen,
} from '../features';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TabNavigator"
      screenOptions={SCREEN_OPTIONS.DEFAULT}
    >
      <Stack.Screen 
        name="TabNavigator" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name={ROUTES.MAIN.PROFILE} 
        component={ProfileScreen} 
        options={SCREEN_OPTIONS.DEFAULT} 
      />
      <Stack.Screen 
        name={ROUTES.MAIN.INSTITUTION_DETAILS} 
        component={InstitutionDetailsScreen} 
        options={SCREEN_OPTIONS.DEFAULT} 
      />
      <Stack.Screen 
        name={ROUTES.MAIN.NOTIFICATIONS} 
        component={NotificationsScreen} 
        options={SCREEN_OPTIONS.DEFAULT} 
      />
      <Stack.Screen 
        name={ROUTES.MAIN.APPLICATION_FORM} 
        component={ApplicationFormScreen} 
        options={SCREEN_OPTIONS.DEFAULT} 
      />
      <Stack.Screen 
        name={ROUTES.MAIN.ADVISER_CHAT} 
        component={AdviserChatScreen} 
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
    </Stack.Navigator>
  );
};

export default MainNavigator;
