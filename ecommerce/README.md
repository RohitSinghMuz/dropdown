# Ecommerce Module for React Native

A complete, production-ready ecommerce module with modern UI, offline support, and full cart functionality.

## Features

✅ **Product Management**
- Grid layout with product cards
- Product detail view with image gallery
- Pull-to-refresh functionality
- Loading skeletons

✅ **Cart System**
- Add/remove products
- Quantity management
- Real-time total calculation
- Cart badge with item count

✅ **Checkout Flow**
- Order summary
- Order confirmation
- Success screen

✅ **Offline Support**
- AsyncStorage caching
- Automatic sync when online
- Fallback to cached data

✅ **State Management**
- Redux Toolkit integration
- Centralized cart state

✅ **UI/UX**
- Clean, modern design
- Responsive layouts
- Loading states
- Error handling
- Empty states

## Installation

### 1. Install Dependencies

```bash
npm install @reduxjs/toolkit react-redux @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage @react-native-community/netinfo
```

Or with Yarn:

```bash
yarn add @reduxjs/toolkit react-redux @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage @react-native-community/netinfo
```

### 2. Link Native Dependencies (if needed)

```bash
cd ios && pod install && cd ..
```

## Setup

### 1. Configure Redux Store

In your main `App.tsx`:

```tsx
import { Provider } from 'react-redux';
import { store } from './ecommerce/store';
import { EcommerceNavigator } from './ecommerce/navigation/EcommerceNavigator';
import { NavigationContainer } from '@react-navigation/native';

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

### 2. Permissions (Android)

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## Folder Structure

```
ecommerce/
├── components/          # Reusable UI components
│   ├── ProductCard.tsx
│   ├── CartItemComponent.tsx
│   ├── SkeletonLoader.tsx
│   └── EmptyCart.tsx
├── screens/            # Screen components
│   ├── ProductListScreen.tsx
│   ├── ProductDetailScreen.tsx
│   ├── CartScreen.tsx
│   └── CheckoutScreen.tsx
├── services/           # API services
│   └── productService.ts
├── store/              # Redux store
│   ├── index.ts
│   └── cartSlice.ts
├── navigation/         # Navigation setup
│   └── EcommerceNavigator.tsx
├── utils/              # Helper functions
│   └── helpers.ts
├── assets/             # Images, icons, etc.
└── index.ts            # Main export file
```

## Usage

### Using the Ecommerce Module

```tsx
import { EcommerceNavigator } from './ecommerce';

// Use in your navigation structure
<EcommerceNavigator />
```

### Accessing Cart State

```tsx
import { useSelector } from 'react-redux';
import { RootState } from './ecommerce/store';

const MyComponent = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => 
    state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  
  return <Text>{cartItems.length} items - ${total.toFixed(2)}</Text>;
};
```

### Dispatching Cart Actions

```tsx
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from './ecommerce';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
    }));
  };
  
  return <Button onPress={() => handleAddToCart(product)} />;
};
```

### Fetching Products

```tsx
import { productService } from './ecommerce';

const loadProducts = async () => {
  try {
    const products = await productService.fetchProducts();
    // Works offline with cached data
  } catch (error) {
    console.error('Failed to load products:', error);
  }
};
```

## API Integration

The module uses the DummyJSON API:
- **Base URL**: `https://dummyjson.com/products`
- **Endpoints**:
  - `GET /products?limit=100` - Fetch all products
  - `GET /products/{id}` - Fetch single product

## Offline Support

The module automatically:
1. Caches product data on first fetch
2. Detects internet connectivity
3. Serves cached data when offline
4. Syncs with API when connection is restored

## Customization

### Change Colors

Update the color values in component styles:

```tsx
// In components/ProductCard.tsx
backgroundColor: '#2196F3', // Change primary color
```

### Add More Screens

1. Create new screen in `screens/`
2. Add to `EcommerceNavigator.tsx`
3. Update `RootStackParamList` type

### Extend Cart Functionality

Edit `store/cartSlice.ts` to add new actions:

```tsx
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add your custom actions here
  },
});
```

## Performance Optimization

- FlatList with `numColumns` for efficient grid rendering
- Image optimization with proper dimensions
- Skeleton loaders for better UX
- Memoized components for re-render prevention

## Error Handling

The module includes:
- Network error handling
- API failure fallback to cache
- User-friendly error messages
- Empty state UI

## Browser Support

- iOS 11+
- Android 5.0+

## License

MIT

## Support

For issues or questions, refer to the React Native documentation:
- [React Native Docs](https://reactnative.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [React Navigation Docs](https://reactnavigation.org)
