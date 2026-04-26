# Ecommerce Module - Setup Guide

## Quick Start

### Step 1: Install Dependencies

```bash
npm install @reduxjs/toolkit react-redux @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage @react-native-community/netinfo
```

### Step 2: Update Your App.tsx

Replace your current `App.tsx` with:

```tsx
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './ecommerce/store';
import { EcommerceNavigator } from './ecommerce/navigation/EcommerceNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <EcommerceNavigator />
      </NavigationContainer>
    </Provider>
  );
}
```

### Step 3: Run Your App

```bash
# iOS
npm run ios

# Android
npm run android
```

## Integration with Existing Navigation

If you already have a navigation structure, integrate the ecommerce module as a tab or drawer:

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EcommerceNavigator } from './ecommerce/navigation/EcommerceNavigator';
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Shop" component={EcommerceNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
```

## File Structure After Integration

```
your-project/
├── ecommerce/                    # Ecommerce module (copy entire folder)
│   ├── components/
│   ├── screens/
│   ├── services/
│   ├── store/
│   ├── navigation/
│   ├── utils/
│   ├── index.ts
│   ├── package.json
│   └── README.md
├── App.tsx                       # Updated with Redux Provider
├── package.json                  # Updated with dependencies
└── ...
```

## Customization

### Change API Endpoint

Edit `ecommerce/services/productService.ts`:

```tsx
const API_URL = 'https://your-api.com/products';
```

### Customize Colors

Update color values in component files:

```tsx
// Primary color
backgroundColor: '#2196F3'  // Change to your brand color

// Success color
backgroundColor: '#4caf50'  // Change to your brand color

// Error color
backgroundColor: '#ff6b6b'  // Change to your brand color
```

### Add Custom Screens

1. Create new screen in `ecommerce/screens/`
2. Add to `EcommerceNavigator.tsx`:

```tsx
<Stack.Screen
  name="YourScreen"
  component={YourScreenComponent}
  options={{ title: 'Your Screen' }}
/>
```

### Extend Redux Store

Add new slices to `ecommerce/store/index.ts`:

```tsx
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import yourReducer from './yourSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    your: yourReducer,  // Add your slice
  },
});
```

## Troubleshooting

### Issue: "Cannot find module '@react-navigation/native'"

**Solution**: Install all dependencies:
```bash
npm install
```

### Issue: "AsyncStorage not working"

**Solution**: Ensure `@react-native-async-storage/async-storage` is installed and linked:
```bash
npm install @react-native-async-storage/async-storage
cd ios && pod install && cd ..
```

### Issue: "Network requests failing"

**Solution**: Check internet permissions in `AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### Issue: "Images not loading"

**Solution**: Ensure image URLs are valid and HTTPS. Check network tab in debugger.

## Performance Tips

1. **Optimize Images**: Use appropriately sized images
2. **Lazy Loading**: Implement pagination for large product lists
3. **Memoization**: Use `React.memo()` for expensive components
4. **Redux DevTools**: Install for debugging state changes

## Testing

### Test Cart Functionality

```tsx
import { store } from './ecommerce/store';
import { addToCart, removeFromCart } from './ecommerce';

const testCart = () => {
  store.dispatch(addToCart({
    id: 1,
    title: 'Test Product',
    price: 99.99,
    image: 'https://example.com/image.jpg',
  }));
  
  console.log(store.getState().cart.items);
};
```

### Test Offline Mode

1. Enable airplane mode on device/emulator
2. Navigate to product list
3. Should display cached products
4. Disable airplane mode
5. Pull to refresh
6. Should fetch fresh data

## API Reference

### productService

```tsx
// Fetch all products (with offline support)
const products = await productService.fetchProducts();

// Fetch single product
const product = await productService.fetchProductById(1);
```

### Redux Actions

```tsx
// Add product to cart
dispatch(addToCart({ id, title, price, image }));

// Remove product from cart
dispatch(removeFromCart(productId));

// Increase quantity
dispatch(increaseQuantity(productId));

// Decrease quantity
dispatch(decreaseQuantity(productId));

// Clear entire cart
dispatch(clearCart());
```

### Selectors

```tsx
// Get all cart items
const items = useSelector(state => state.cart.items);

// Get cart total
const total = useSelector(state => 
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
```

## Support & Resources

- [React Native Documentation](https://reactnative.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [React Navigation Documentation](https://reactnavigation.org)
- [DummyJSON API](https://dummyjson.com)

## License

MIT - Feel free to use in your projects!
