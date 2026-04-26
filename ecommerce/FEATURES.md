# Ecommerce Module - Features & API Documentation

## 📋 Table of Contents

1. [Features Overview](#features-overview)
2. [Screens](#screens)
3. [Components](#components)
4. [Redux Store](#redux-store)
5. [Services](#services)
6. [Utilities](#utilities)
7. [Types](#types)

---

## Features Overview

### ✅ Product Management
- Fetch products from DummyJSON API
- Grid layout display (2 columns)
- Product detail view with image gallery
- Pull-to-refresh functionality
- Loading skeleton UI
- Error handling with fallback

### ✅ Shopping Cart
- Add products to cart
- Remove products from cart
- Increase/decrease quantity
- Real-time total calculation
- Cart badge with item count
- Persistent cart state

### ✅ Checkout Flow
- Order summary display
- Product list review
- Total price calculation
- Order confirmation
- Success screen with order details

### ✅ Offline Support
- AsyncStorage caching
- Network state detection
- Automatic fallback to cached data
- Sync when connection restored

### ✅ UI/UX
- Modern, clean design
- Responsive layouts
- Loading states
- Error messages
- Empty states
- Smooth animations

---

## Screens

### ProductListScreen

**Location**: `screens/ProductListScreen.tsx`

**Features**:
- Grid layout with 2 columns
- Pull-to-refresh
- Loading skeleton
- Error handling
- Product cards with add to cart button

**Props**:
```tsx
type Props = NativeStackScreenProps<RootStackParamList, 'ProductList'>;
```

**Usage**:
```tsx
<Stack.Screen
  name="ProductList"
  component={ProductListScreen}
  options={{ title: 'Products' }}
/>
```

---

### ProductDetailScreen

**Location**: `screens/ProductDetailScreen.tsx`

**Features**:
- Large product image
- Image gallery with thumbnails
- Product title, description, price
- Rating and stock information
- Add to cart button
- Out of stock handling

**Props**:
```tsx
type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;
// route.params.productId: number
```

**Usage**:
```tsx
navigation.navigate('ProductDetail', { productId: 123 });
```

---

### CartScreen

**Location**: `screens/CartScreen.tsx`

**Features**:
- List of cart items
- Quantity controls
- Remove item button
- Total price calculation
- Proceed to checkout button
- Empty cart state

**Usage**:
```tsx
navigation.navigate('Cart');
```

---

### CheckoutScreen

**Location**: `screens/CheckoutScreen.tsx`

**Features**:
- Order summary
- Product list review
- Subtotal, shipping, total
- Place order button
- Order confirmation screen
- Continue shopping button

**Usage**:
```tsx
navigation.navigate('Checkout');
```

---

## Components

### ProductCard

**Location**: `components/ProductCard.tsx`

**Props**:
```tsx
interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
}
```

**Features**:
- Product image
- Title (2 lines max)
- Price
- Rating
- Add to cart button

**Example**:
```tsx
<ProductCard
  product={product}
  onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
  onAddToCart={() => dispatch(addToCart(product))}
/>
```

---

### CartItemComponent

**Location**: `components/CartItemComponent.tsx`

**Props**:
```tsx
interface CartItemProps {
  item: CartItem;
  onRemove: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}
```

**Features**:
- Product image
- Title and price
- Quantity selector (+/-)
- Remove button
- Subtotal calculation

**Example**:
```tsx
<CartItemComponent
  item={cartItem}
  onRemove={() => dispatch(removeFromCart(cartItem.id))}
  onIncreaseQuantity={() => dispatch(increaseQuantity(cartItem.id))}
  onDecreaseQuantity={() => dispatch(decreaseQuantity(cartItem.id))}
/>
```

---

### SkeletonLoader

**Location**: `components/SkeletonLoader.tsx`

**Components**:
- `SkeletonLoader`: Single skeleton card
- `SkeletonGrid`: Grid of skeleton cards

**Usage**:
```tsx
{loading ? <SkeletonGrid /> : <ProductList />}
```

---

### EmptyCart

**Location**: `components/EmptyCart.tsx`

**Features**:
- Empty state icon
- Message
- Subtitle

**Usage**:
```tsx
{cartItems.length === 0 ? <EmptyCart /> : <CartList />}
```

---

## Redux Store

### Store Configuration

**Location**: `store/index.ts`

```tsx
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

### Cart Slice

**Location**: `store/cartSlice.ts`

**State**:
```tsx
interface CartState {
  items: CartItem[];
}
```

**Actions**:

#### addToCart
```tsx
dispatch(addToCart({
  id: number;
  title: string;
  price: number;
  image: string;
}));
```

#### removeFromCart
```tsx
dispatch(removeFromCart(productId));
```

#### increaseQuantity
```tsx
dispatch(increaseQuantity(productId));
```

#### decreaseQuantity
```tsx
dispatch(decreaseQuantity(productId));
```

#### clearCart
```tsx
dispatch(clearCart());
```

**Selectors**:
```tsx
// Get all items
const items = useSelector((state: RootState) => state.cart.items);

// Get item count
const count = useSelector((state: RootState) => state.cart.items.length);

// Get total price
const total = useSelector((state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
```

---

## Services

### Product Service

**Location**: `services/productService.ts`

#### fetchProducts()
```tsx
const products = await productService.fetchProducts();
// Returns: Product[]
// Features: Offline support, caching, error handling
```

#### fetchProductById(id)
```tsx
const product = await productService.fetchProductById(123);
// Returns: Product
// Features: Single product fetch
```

**Offline Support**:
- Automatically caches products on first fetch
- Detects internet connectivity
- Serves cached data when offline
- Syncs with API when connection restored

**Error Handling**:
```tsx
try {
  const products = await productService.fetchProducts();
} catch (error) {
  console.error('Failed to load products:', error);
  // Falls back to cached data if available
}
```

---

## Utilities

### Helpers

**Location**: `utils/helpers.ts`

#### formatPrice(price: number)
```tsx
formatPrice(99.99); // Returns: "$99.99"
```

#### calculateTotal(items)
```tsx
const total = calculateTotal([
  { price: 10, quantity: 2 },
  { price: 20, quantity: 1 },
]); // Returns: 40
```

#### showToast(message)
```tsx
showToast('Product added to cart');
```

---

## Types

**Location**: `types/index.ts`

### Product
```tsx
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  category?: string;
  brand?: string;
}
```

### CartItem
```tsx
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
```

### CartState
```tsx
interface CartState {
  items: CartItem[];
}
```

---

## Navigation

### EcommerceNavigator

**Location**: `navigation/EcommerceNavigator.tsx`

**Stack Structure**:
```
ProductList
├── ProductDetail
├── Cart
└── Checkout
```

**Features**:
- Cart badge with item count
- Header navigation
- Stack-based navigation

**Usage**:
```tsx
import { EcommerceNavigator } from './ecommerce';

<NavigationContainer>
  <EcommerceNavigator />
</NavigationContainer>
```

---

## Performance Optimization

### Implemented Optimizations

1. **FlatList Optimization**
   - `numColumns` for grid layout
   - `keyExtractor` for unique keys
   - `columnWrapperStyle` for spacing

2. **Image Optimization**
   - Proper dimensions
   - `resizeMode="cover"`
   - Thumbnail caching

3. **Loading States**
   - Skeleton loaders
   - Smooth transitions
   - Better UX

4. **Memoization**
   - Component memoization ready
   - Selector optimization

---

## Best Practices

### State Management
```tsx
// ✅ Good: Use selectors
const items = useSelector(state => state.cart.items);

// ❌ Avoid: Direct state access
const state = useSelector(state => state);
```

### Navigation
```tsx
// ✅ Good: Type-safe navigation
navigation.navigate('ProductDetail', { productId: 123 });

// ❌ Avoid: String-based navigation
navigation.navigate('ProductDetail', { id: 123 });
```

### Error Handling
```tsx
// ✅ Good: Comprehensive error handling
try {
  const data = await productService.fetchProducts();
} catch (error) {
  setError(error.message);
}

// ❌ Avoid: Silent failures
const data = await productService.fetchProducts();
```

---

## Troubleshooting

### Products Not Loading
1. Check internet connection
2. Verify API endpoint
3. Check AsyncStorage permissions
4. Review error logs

### Cart Not Persisting
1. Verify Redux store setup
2. Check Provider wrapper
3. Review Redux DevTools

### Images Not Displaying
1. Verify image URLs
2. Check HTTPS requirement
3. Review network permissions

---

## Future Enhancements

- [ ] Search functionality
- [ ] Product filtering
- [ ] Wishlist feature
- [ ] User authentication
- [ ] Payment integration
- [ ] Order history
- [ ] Product reviews
- [ ] Notifications
- [ ] Analytics tracking
- [ ] Multi-language support

---

## Support

For issues or questions:
- Check the README.md
- Review SETUP_GUIDE.md
- Check component examples
- Review TypeScript types
