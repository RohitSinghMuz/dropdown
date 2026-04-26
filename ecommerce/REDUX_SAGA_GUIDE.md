# Redux Saga - Offline Support with Last Fetch Time

## Overview

The ecommerce module now uses **Redux Saga** for advanced state management with:
- ✅ Automatic offline data caching
- ✅ Last fetch time tracking
- ✅ Network state detection
- ✅ Automatic fallback to cached data
- ✅ Seamless sync when online

---

## Architecture

### Redux Saga Flow

```
User Action (Pull to Refresh)
    ↓
fetchProductsRequest() action
    ↓
Redux Saga Middleware
    ↓
Check Network Status
    ↓
├─ Online: Fetch from API
│   ├─ Save to AsyncStorage
│   ├─ Save Timestamp
│   └─ Dispatch Success
│
└─ Offline: Load from Cache
    ├─ Get Cached Data
    ├─ Get Last Fetch Time
    └─ Dispatch Success with Cache Flag
```

---

## Files Added/Updated

### New Files

#### 1. `store/productSlice.ts`
Redux slice for product state management with:
- `fetchProductsRequest` - Trigger product fetch
- `fetchProductsSuccess` - Handle successful fetch
- `fetchProductsFailure` - Handle fetch errors
- `fetchProductDetailRequest` - Trigger detail fetch
- `fetchProductDetailSuccess` - Handle detail success
- `fetchProductDetailFailure` - Handle detail errors

#### 2. `store/productSaga.ts`
Redux Saga for handling side effects:
- `fetchProductsSaga` - Manages product list fetching
- `fetchProductDetailSaga` - Manages product detail fetching
- Network detection and caching logic
- Last fetch time tracking

### Updated Files

#### 1. `store/index.ts`
- Added Redux Saga middleware
- Integrated product reducer
- Configured saga middleware

#### 2. `screens/ProductListScreen.tsx`
- Uses Redux Saga for data fetching
- Displays offline indicator with last fetch time
- Shows cache status

#### 3. `screens/ProductDetailScreen.tsx`
- Uses Redux Saga for detail fetching
- Displays cache indicator
- Shows last fetch time

#### 4. `package.json`
- Added `redux-saga` dependency

---

## State Structure

### Product State

```typescript
interface ProductState {
  items: Product[];                    // List of products
  selectedProduct: Product | null;     // Currently selected product
  loading: boolean;                    // Loading state
  error: string | null;                // Error message
  lastFetchTime: string | null;        // Last fetch timestamp
  isFromCache: boolean;                // Whether data is from cache
}
```

### Redux Store

```typescript
{
  cart: {
    items: CartItem[]
  },
  products: {
    items: Product[],
    selectedProduct: Product | null,
    loading: boolean,
    error: string | null,
    lastFetchTime: string,
    isFromCache: boolean
  }
}
```

---

## How It Works

### 1. Initial Load

```typescript
// Component mounts
useEffect(() => {
  dispatch(fetchProductsRequest());
}, [dispatch]);
```

**Saga Flow:**
1. Check network connectivity
2. If online: Fetch from API
3. If offline: Load from cache
4. Save timestamp with data
5. Dispatch success with metadata

### 2. Pull to Refresh

```typescript
const handleRefresh = () => {
  setRefreshing(true);
  dispatch(fetchProductsRequest());
  setTimeout(() => setRefreshing(false), 1000);
};
```

**Saga Flow:**
1. Same as initial load
2. Always attempts fresh fetch
3. Falls back to cache if offline

### 3. Offline Mode

When device is offline:
1. Saga detects no connection
2. Loads cached data from AsyncStorage
3. Retrieves last fetch timestamp
4. Displays offline indicator
5. Shows "Last updated: [timestamp]"

### 4. Online Sync

When connection is restored:
1. User pulls to refresh
2. Saga fetches fresh data
3. Updates cache
4. Updates timestamp
5. Removes offline indicator

---

## Caching Strategy

### Storage Keys

```typescript
// Products list
PRODUCTS_CACHE_KEY = 'products_cache'
PRODUCTS_TIMESTAMP_KEY = 'products_timestamp'

// Product details
PRODUCT_DETAIL_CACHE_KEY = 'product_detail_{id}'
PRODUCT_DETAIL_TIMESTAMP_KEY = 'product_detail_timestamp_{id}'
```

### Data Saved

```typescript
{
  // AsyncStorage
  'products_cache': JSON.stringify(products),
  'products_timestamp': '1699564800000',
  
  // Timestamp converted to readable format
  lastFetchTime: 'Nov 10, 2023, 2:00:00 PM'
}
```

---

## Usage Examples

### Fetch Products

```typescript
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from './ecommerce/store/productSlice';
import { RootState } from './ecommerce/store';

const MyComponent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const loading = useSelector((state: RootState) => state.products.loading);
  const lastFetchTime = useSelector((state: RootState) => state.products.lastFetchTime);
  const isFromCache = useSelector((state: RootState) => state.products.isFromCache);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  return (
    <View>
      {isFromCache && <Text>Offline Mode - Last: {lastFetchTime}</Text>}
      {loading && <ActivityIndicator />}
      {/* Render products */}
    </View>
  );
};
```

### Fetch Product Detail

```typescript
import { fetchProductDetailRequest } from './ecommerce/store/productSlice';

const MyComponent = ({ productId }) => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.products.selectedProduct);
  const lastFetchTime = useSelector((state: RootState) => state.products.lastFetchTime);

  useEffect(() => {
    dispatch(fetchProductDetailRequest(productId));
  }, [productId, dispatch]);

  return (
    <View>
      {lastFetchTime && <Text>Last updated: {lastFetchTime}</Text>}
      {/* Render product */}
    </View>
  );
};
```

### Refresh Data

```typescript
const handleRefresh = () => {
  dispatch(fetchProductsRequest());
};
```

---

## Offline Indicator UI

### ProductListScreen

```typescript
{isFromCache && lastFetchTime && (
  <View style={styles.cacheIndicator}>
    <Text style={styles.cacheText}>
      📦 Offline Mode - Last updated: {lastFetchTime}
    </Text>
  </View>
)}
```

### ProductDetailScreen

```typescript
{isFromCache && lastFetchTime && (
  <View style={styles.cacheIndicator}>
    <Text style={styles.cacheText}>
      📦 Cached - Last updated: {lastFetchTime}
    </Text>
  </View>
)}
```

---

## Error Handling

### Network Error

```typescript
// Saga detects network error
// Attempts to load from cache
// If cache exists: Shows cached data
// If no cache: Shows error message
```

### API Error

```typescript
// Saga catches API error
// Attempts to load from cache
// If cache exists: Shows cached data with cache flag
// If no cache: Shows error message
```

### No Cache Available

```typescript
// Offline and no cache
// Shows error: "No internet connection and no cached data available"
```

---

## Timestamp Format

### Storage Format
```typescript
// Unix timestamp in milliseconds
1699564800000
```

### Display Format
```typescript
// Converted to locale string
"Nov 10, 2023, 2:00:00 PM"
```

### Conversion
```typescript
const timestamp = parseInt(timestampString, 10);
const date = new Date(timestamp);
const lastFetchTime = date.toLocaleString();
```

---

## Redux DevTools Integration

### View State

```typescript
// In Redux DevTools
{
  products: {
    items: [...],
    selectedProduct: {...},
    loading: false,
    error: null,
    lastFetchTime: "Nov 10, 2023, 2:00:00 PM",
    isFromCache: true
  }
}
```

### Track Actions

```typescript
// Actions dispatched
1. fetchProductsRequest
2. fetchProductsSuccess
3. fetchProductDetailRequest
4. fetchProductDetailSuccess
```

---

## Performance Optimization

### Saga Optimization

```typescript
// Efficient network detection
const netState = yield call(() => NetInfo.fetch());

// Parallel AsyncStorage operations
yield call(AsyncStorage.setItem, key, data);
yield call(AsyncStorage.setItem, timestampKey, timestamp);

// Selective re-renders with selectors
const products = useSelector(state => state.products.items);
```

### Caching Strategy

- **Products List**: Cached globally
- **Product Details**: Cached per product ID
- **Timestamps**: Stored separately for easy access
- **Automatic Cleanup**: Old cache can be cleared manually

---

## Testing Offline Mode

### Step 1: Enable Airplane Mode
```
Settings → Airplane Mode → ON
```

### Step 2: Navigate to Products
- App loads cached products
- Shows offline indicator
- Displays last fetch time

### Step 3: Pull to Refresh
- Shows cached data
- No network error

### Step 4: Disable Airplane Mode
```
Settings → Airplane Mode → OFF
```

### Step 5: Pull to Refresh
- Fetches fresh data
- Updates cache
- Updates timestamp
- Removes offline indicator

---

## Clearing Cache

### Manual Cache Clear

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const clearCache = async () => {
  try {
    await AsyncStorage.removeItem('products_cache');
    await AsyncStorage.removeItem('products_timestamp');
    // Clear product details
    for (let i = 1; i <= 100; i++) {
      await AsyncStorage.removeItem(`product_detail_${i}`);
      await AsyncStorage.removeItem(`product_detail_timestamp_${i}`);
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};
```

### Using Redux Action

```typescript
import { clearCache } from './ecommerce/store/productSlice';

dispatch(clearCache());
```

---

## Debugging

### Check Redux State

```typescript
import { store } from './ecommerce/store';

console.log(store.getState().products);
// Output:
// {
//   items: [...],
//   loading: false,
//   error: null,
//   lastFetchTime: "Nov 10, 2023, 2:00:00 PM",
//   isFromCache: true
// }
```

### Check AsyncStorage

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const checkCache = async () => {
  const products = await AsyncStorage.getItem('products_cache');
  const timestamp = await AsyncStorage.getItem('products_timestamp');
  console.log('Cached Products:', JSON.parse(products || '[]'));
  console.log('Timestamp:', timestamp);
};
```

### Monitor Network State

```typescript
import NetInfo from '@react-native-community/netinfo';

NetInfo.addEventListener(state => {
  console.log('Network State:', state);
  // {
  //   isConnected: true,
  //   isInternetReachable: true,
  //   type: 'wifi'
  // }
});
```

---

## Best Practices

### 1. Always Check Loading State
```typescript
if (loading && products.length === 0) {
  return <SkeletonGrid />;
}
```

### 2. Display Cache Indicator
```typescript
{isFromCache && <CacheIndicator lastFetchTime={lastFetchTime} />}
```

### 3. Handle Errors Gracefully
```typescript
if (error && products.length === 0) {
  return <ErrorScreen error={error} />;
}
```

### 4. Cleanup on Unmount
```typescript
useEffect(() => {
  return () => {
    dispatch(clearSelectedProduct());
  };
}, [dispatch]);
```

### 5. Debounce Refresh
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

## Troubleshooting

### Issue: Data Not Caching

**Solution**: Check AsyncStorage permissions
```bash
# Android: Add to AndroidManifest.xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### Issue: Timestamp Not Updating

**Solution**: Verify saga is running
```typescript
// Check Redux DevTools for actions
// Verify fetchProductsSuccess action is dispatched
```

### Issue: Offline Mode Not Working

**Solution**: Check NetInfo setup
```typescript
import NetInfo from '@react-native-community/netinfo';

// Verify NetInfo is properly installed
// Test with: NetInfo.fetch().then(console.log)
```

### Issue: Cache Not Clearing

**Solution**: Use clearCache action
```typescript
dispatch(clearCache());
```

---

## Migration from Old Service

### Before (Direct Service Call)
```typescript
const data = await productService.fetchProducts();
```

### After (Redux Saga)
```typescript
dispatch(fetchProductsRequest());
const products = useSelector(state => state.products.items);
```

---

## Summary

Redux Saga provides:
- ✅ Centralized side effect management
- ✅ Automatic offline support
- ✅ Last fetch time tracking
- ✅ Network state detection
- ✅ Seamless caching
- ✅ Better error handling
- ✅ Improved testability
- ✅ Redux DevTools integration

Your ecommerce module now has enterprise-grade offline support! 🚀
