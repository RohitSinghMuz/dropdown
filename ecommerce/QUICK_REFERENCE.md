# 🚀 Quick Reference Guide

## Common Tasks

### Add Product to Cart
```tsx
import { useDispatch } from 'react-redux';
import { addToCart } from './ecommerce';

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

### Get Cart Items
```tsx
import { useSelector } from 'react-redux';
import { RootState } from './ecommerce/store';

const MyComponent = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  return <Text>{cartItems.length} items in cart</Text>;
};
```

### Calculate Cart Total
```tsx
import { useSelector } from 'react-redux';
import { RootState } from './ecommerce/store';
import { calculateTotal } from './ecommerce';

const MyComponent = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = calculateTotal(cartItems);
  
  return <Text>Total: ${total.toFixed(2)}</Text>;
};
```

### Navigate to Product Detail
```tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './ecommerce/navigation/EcommerceNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductList'>;

const MyComponent: React.FC<Props> = ({ navigation }) => {
  return (
    <Button
      onPress={() =>
        navigation.navigate('ProductDetail', { productId: 123 })
      }
    />
  );
};
```

### Fetch Products
```tsx
import { productService } from './ecommerce';

const loadProducts = async () => {
  try {
    const products = await productService.fetchProducts();
    console.log(products);
  } catch (error) {
    console.error('Failed to load products:', error);
  }
};
```

### Format Price
```tsx
import { formatPrice } from './ecommerce';

const price = formatPrice(99.99);
console.log(price); // "$99.99"
```

### Remove from Cart
```tsx
import { useDispatch } from 'react-redux';
import { removeFromCart } from './ecommerce';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  return (
    <Button
      onPress={() => dispatch(removeFromCart(productId))}
    />
  );
};
```

### Increase Quantity
```tsx
import { useDispatch } from 'react-redux';
import { increaseQuantity } from './ecommerce';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  return (
    <Button
      onPress={() => dispatch(increaseQuantity(productId))}
    />
  );
};
```

### Decrease Quantity
```tsx
import { useDispatch } from 'react-redux';
import { decreaseQuantity } from './ecommerce';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  return (
    <Button
      onPress={() => dispatch(decreaseQuantity(productId))}
    />
  );
};
```

### Clear Cart
```tsx
import { useDispatch } from 'react-redux';
import { clearCart } from './ecommerce';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  return (
    <Button
      onPress={() => dispatch(clearCart())}
    />
  );
};
```

---

## File Locations

| Task | File |
|------|------|
| Add cart actions | `store/cartSlice.ts` |
| Configure store | `store/index.ts` |
| Fetch products | `services/productService.ts` |
| Product card UI | `components/ProductCard.tsx` |
| Cart item UI | `components/CartItemComponent.tsx` |
| Product list | `screens/ProductListScreen.tsx` |
| Product detail | `screens/ProductDetailScreen.tsx` |
| Shopping cart | `screens/CartScreen.tsx` |
| Checkout | `screens/CheckoutScreen.tsx` |
| Navigation | `navigation/EcommerceNavigator.tsx` |
| Helpers | `utils/helpers.ts` |
| Types | `types/index.ts` |

---

## Redux Cheat Sheet

### Import Store
```tsx
import { store, RootState, AppDispatch } from './ecommerce/store';
```

### Import Actions
```tsx
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from './ecommerce';
```

### Use Dispatch
```tsx
const dispatch = useDispatch<AppDispatch>();
```

### Use Selector
```tsx
const items = useSelector((state: RootState) => state.cart.items);
```

---

## Navigation Cheat Sheet

### Import Navigator
```tsx
import { EcommerceNavigator } from './ecommerce/navigation/EcommerceNavigator';
```

### Import Types
```tsx
import { RootStackParamList } from './ecommerce/navigation/EcommerceNavigator';
```

### Navigate to Screen
```tsx
navigation.navigate('ProductList');
navigation.navigate('ProductDetail', { productId: 123 });
navigation.navigate('Cart');
navigation.navigate('Checkout');
```

### Go Back
```tsx
navigation.goBack();
```

---

## Component Cheat Sheet

### ProductCard
```tsx
<ProductCard
  product={product}
  onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
  onAddToCart={() => dispatch(addToCart(product))}
/>
```

### CartItemComponent
```tsx
<CartItemComponent
  item={cartItem}
  onRemove={() => dispatch(removeFromCart(cartItem.id))}
  onIncreaseQuantity={() => dispatch(increaseQuantity(cartItem.id))}
  onDecreaseQuantity={() => dispatch(decreaseQuantity(cartItem.id))}
/>
```

### SkeletonGrid
```tsx
{loading ? <SkeletonGrid /> : <ProductList />}
```

### EmptyCart
```tsx
{cartItems.length === 0 ? <EmptyCart /> : <CartList />}
```

---

## API Cheat Sheet

### Fetch All Products
```tsx
const products = await productService.fetchProducts();
```

### Fetch Single Product
```tsx
const product = await productService.fetchProductById(123);
```

### Handle Errors
```tsx
try {
  const products = await productService.fetchProducts();
} catch (error) {
  console.error('Error:', error);
}
```

---

## Styling Cheat Sheet

### Primary Color
```tsx
backgroundColor: '#2196F3'
color: '#2196F3'
```

### Success Color
```tsx
backgroundColor: '#4caf50'
color: '#4caf50'
```

### Error Color
```tsx
backgroundColor: '#ff6b6b'
color: '#ff6b6b'
```

### Text Colors
```tsx
color: '#333'      // Dark text
color: '#666'      // Medium text
color: '#999'      // Light text
```

### Background Colors
```tsx
backgroundColor: '#fff'      // White
backgroundColor: '#f5f5f5'   // Light gray
backgroundColor: '#e0e0e0'   // Medium gray
```

---

## Debugging

### Check Redux State
```tsx
import { store } from './ecommerce/store';
console.log(store.getState());
```

### Check Cart Items
```tsx
const state = store.getState();
console.log(state.cart.items);
```

### Check Cart Total
```tsx
const state = store.getState();
const total = state.cart.items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
console.log(total);
```

### Enable Redux DevTools
```tsx
// Already configured in store/index.ts
// Use Redux DevTools browser extension
```

---

## Common Errors & Solutions

### Error: "Cannot find module '@reduxjs/toolkit'"
**Solution**: Run `npm install @reduxjs/toolkit react-redux`

### Error: "Cannot find module '@react-navigation/native'"
**Solution**: Run `npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context`

### Error: "AsyncStorage not working"
**Solution**: Run `npm install @react-native-async-storage/async-storage` and link native modules

### Error: "Products not loading"
**Solution**: Check internet connection, verify API endpoint, check AsyncStorage permissions

### Error: "Cart not updating"
**Solution**: Verify Redux Provider is wrapping app, check dispatch calls, review Redux DevTools

---

## Performance Tips

1. Use `React.memo()` for expensive components
2. Use `useCallback()` for event handlers
3. Use `useMemo()` for expensive calculations
4. Implement pagination for large lists
5. Optimize images with proper dimensions
6. Use FlatList instead of ScrollView for lists

---

## Testing Checklist

- [ ] Products load correctly
- [ ] Pull-to-refresh works
- [ ] Add to cart works
- [ ] Cart updates correctly
- [ ] Remove from cart works
- [ ] Quantity controls work
- [ ] Total calculation is correct
- [ ] Checkout flow works
- [ ] Offline mode works
- [ ] Images load correctly
- [ ] Navigation works
- [ ] Error handling works

---

## Deployment Checklist

- [ ] All dependencies installed
- [ ] Redux store configured
- [ ] Navigation setup complete
- [ ] API endpoint verified
- [ ] Permissions added (Android)
- [ ] CocoaPods installed (iOS)
- [ ] Build tested on device
- [ ] Offline functionality tested
- [ ] Error handling tested
- [ ] Performance optimized

---

## Resources

- [React Native Docs](https://reactnative.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [React Navigation Docs](https://reactnavigation.org)
- [DummyJSON API](https://dummyjson.com)
- [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/)
- [NetInfo Docs](https://github.com/react-native-netinfo/react-native-netinfo)

---

## Quick Links

- [README.md](./README.md) - Main documentation
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Integration guide
- [FEATURES.md](./FEATURES.md) - Detailed features
- [SUMMARY.md](./SUMMARY.md) - Complete summary
- [EXAMPLE_APP.tsx](./EXAMPLE_APP.tsx) - Example implementation
