/**
 * BideshStudy App
 * React Native Application for Admission Management
 *
 * @format
 */

import React from 'react';
import { enableScreens } from 'react-native-screens';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, LanguageProvider } from './src/shared';
import AppNavigator from './src/navigation/AppNavigator';

enableScreens(true);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <SafeAreaProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#fff"
          />
          <AppNavigator />
          </SafeAreaProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
