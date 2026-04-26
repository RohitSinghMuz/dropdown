import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './ecommerce/store';
import { EcommerceNavigator } from './ecommerce/navigation/EcommerceNavigator';

/**
 * Example App.tsx showing how to integrate the ecommerce module
 * 
 * This is a minimal setup. You can extend this with:
 * - Multiple navigators (tabs, drawers, etc.)
 * - Authentication flows
 * - Additional screens
 * - Custom themes
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
