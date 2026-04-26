# Redux Saga - Quick Reference

## Installation

```bash
npm install redux-saga
```

## Updated Dependencies

```bash
npm install @reduxjs/toolkit react-redux redux-saga @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage @react-native-community/netinfo
```

---

## File Structure

```
store/
├── index.ts              # Store with Saga middleware
├── cartSlice.ts          # Cart reducer
├── productSlice.ts       # Product reducer (NEW)
└── productSaga.ts        # Product saga (NEW)
```

---

## Key Concepts

### 1. Actions

```typescript
// Trigger fetch
dispatch(fetchProductsRequest());

// Trigger detail fetch
dispatch(fetchProductDetailRequest(productId));
```

### 2. Saga

```typescript
// Handles side effects
function* fetchProductsSaga() {
  // Check network
  // Fetch from API or cache
  // Save to AsyncStorage
  // Dispatch success/failure
}
```

### 3. Selectors

```typescript
const products = useSelector(state => state.products.items);
const loading = useSelector(state => state.products.loading);
const lastFetchTime = useSelector(state => state.products.lastFetchTime);
const isFromCache = useSelector(state => state.products.isFromCache);
```

---

## Common Tasks

### Fetch Products

```typescript
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from './ecommerce/store/productSlice';
import { RootState } from './ecommerce/store';

const MyComponent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const loading = useSelector((state: RootState) => state.products.loading);
  const isFromCache = useSelector((state: RootState) => state.products.isFromCache);
  const lastFetchTime = useSelector((state: RootState) => state.products.lastFetchTime);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  if (loading && products.length === 0) return <LoadingSpinner />;
  if (isFromCache) return <OfflineIndicator time={lastFetchTime} />;

  return <ProductList products={products} />;
};
```

### Fetch Product Detail

```typescript
import { fetchProductDetailRequest } from './ecommerce/store/productSlice';

const MyComponent = ({ productId }) => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.products.selectedProduct);
  const loading = useSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProductDetailRequest(productId));
  }, [productId, dispatch]);

  if (loading && !product) return <LoadingSpinner />;
  return <ProductDetail product={product} />;
};
```

### Refresh Data

```typescript
const handleRefresh = () => {
  dispatch(fetchProductsRequest());
};
```

### Clear Cache

```typescript
import { clearCache } from './ecommerce/store/productSlice';

dispatch(clearCache());
```

---

## State Structure

```typescript
{
  products: {
    items: Product[],              // List of products
    selectedProduct: Product | null, // Current product
    loading: boolean,              // Loading state
    error: string | null,          // Error message
    lastFetchTime: string | null,  // Last fetch time
    isFromCache: boolean           // From cache flag
  }
}
```

---

## Offline Flow

```
1. User opens app
   ↓
2. Saga checks network
   ├─ Online: Fetch from API
   │  ├─ Save to AsyncStorage
   │  ├─ Save timestamp
   │  └─ Show fresh data
   │
   └─ Offline: Load from cache
      ├─ Get cached data
      ├─ Get timestamp
      └─ Show cached data + indicator

3. User pulls to refresh
   ↓
4. Saga checks network again
   ├─ Online: Fetch fresh data
   │  └─ Update cache & timestamp
   │
   └─ Offline: Show cached data
      └─ Keep offline indicator
```

---

## Caching Keys

```typescript
// Products
'products_cache'           // Cached products array
'products_timestamp'       // Last fetch timestamp

// Product Details
'product_detail_1'         // Cached product with ID 1
'product_detail_timestamp_1' // Timestamp for product 1
```

---

## Timestamp Format

```typescript
// Storage: Unix timestamp
1699564800000

// Display: Locale string
"Nov 10, 2023, 2:00:00 PM"

// Conversion
const date = new Date(timestamp);
const formatted = date.toLocaleString();
```

---

## Redux DevTools

### View State
```
Redux DevTools → State → products
```

### Track Actions
```
1. fetchProductsRequest
2. fetchProductsSuccess
3. fetchProductDetailRequest
4. fetchProductDetailSuccess
```

### Time Travel
- Step through actions
- See state changes
- Replay actions

---

## Error Handling

### Network Error
```typescript
// Saga catches error
// Loads from cache if available
// Shows error if no cache
```

### API Error
```typescript
// Saga catches API error
// Falls back to cache
// Displays error message
```

### No Cache
```typescript
// Shows: "No internet connection and no cached data available"
```

---

## Testing Offline

### Enable Offline
```
Settings → Airplane Mode → ON
```

### Test Flow
1. Open app → Shows cached data
2. Pull refresh → Shows cached data
3. Disable airplane mode
4. Pull refresh → Shows fresh data

---

## Debugging

### Check State
```typescript
import { store } from './ecommerce/store';
console.log(store.getState().products);
```

### Check Cache
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
const data = await AsyncStorage.getItem('products_cache');
console.log(JSON.parse(data || '[]'));
```

### Check Network
```typescript
import NetInfo from '@react-native-community/netinfo';
NetInfo.fetch().then(console.log);
```

---

## Performance Tips

1. **Use Selectors**: Prevent unnecessary re-renders
```typescript
const products = useSelector(state => state.products.items);
```

2. **Memoize Components**: Wrap expensive components
```typescript
export const ProductCard = React.memo(({ product }) => (...));
```

3. **Debounce Refresh**: Prevent rapid requests
```typescript
const [refreshing, setRefreshing] = useState(false);
const handleRefresh = () => {
  if (refreshing) return;
  setRefreshing(true);
  dispatch(fetchProductsRequest());
  setTimeout(() => setRefreshing(false), 1000);
};
```

---

## Common Issues

### Data Not Caching
- Check AsyncStorage permissions
- Verify saga is running
- Check Redux DevTools

### Timestamp Not Updating
- Verify fetchProductsSuccess is dispatched
- Check AsyncStorage.setItem calls
- Review saga logs

### Offline Mode Not Working
- Verify NetInfo is installed
- Test with airplane mode
- Check network detection

### Cache Not Clearing
- Use clearCache action
- Verify AsyncStorage.removeItem
- Check Redux state

---

## Migration Checklist

- [ ] Install redux-saga
- [ ] Add productSlice.ts
- [ ] Add productSaga.ts
- [ ] Update store/index.ts
- [ ] Update ProductListScreen.tsx
- [ ] Update ProductDetailScreen.tsx
- [ ] Update package.json
- [ ] Test offline mode
- [ ] Test online mode
- [ ] Test refresh
- [ ] Check Redux DevTools

---

## Resources

- [Redux Saga Docs](https://redux-saga.js.org/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/)
- [NetInfo Docs](https://github.com/react-native-netinfo/react-native-netinfo)

---

## Summary

Redux Saga provides:
- ✅ Centralized side effect management
- ✅ Automatic offline support
- ✅ Last fetch time tracking
- ✅ Network state detection
- ✅ Seamless caching
- ✅ Better error handling
- ✅ Redux DevTools integration

Your app now has enterprise-grade offline support! 🚀
