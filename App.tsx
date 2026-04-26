import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './ecommerce/store';
import { EcommerceNavigator } from './ecommerce/navigation/EcommerceNavigator';

/**
 * Main App Component
 * 
 * This is the root component that:
 * 1. Wraps the app with Redux Provider for state management
 * 2. Sets up React Navigation for screen navigation
 * 3. Initializes the ecommerce module
 */

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <EcommerceNavigator />
      </NavigationContainer>
    </Provider>
  );
}
