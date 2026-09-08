import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { TradeProvider } from './src/context/TradeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <TradeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </TradeProvider>
    </AuthProvider>
  );
}