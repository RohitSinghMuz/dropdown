import { call, put, takeEvery, SagaReturnType } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { productService, Product } from '../services/productService';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductDetailRequest,
  fetchProductDetailSuccess,
  fetchProductDetailFailure,
} from './productSlice';

const PRODUCTS_CACHE_KEY = 'products_cache';
const PRODUCTS_TIMESTAMP_KEY = 'products_timestamp';
const PRODUCT_DETAIL_CACHE_KEY = 'product_detail_';
const PRODUCT_DETAIL_TIMESTAMP_KEY = 'product_detail_timestamp_';

// Type for cached data
interface CachedData<T> {
  data: T;
  timestamp: number;
  lastFetchTime: string;
}

// Helper function to save data with timestamp
function* saveDataWithTimestamp(key: string, data: unknown, timestampKey: string) {
  try {
    const timestamp = new Date().getTime();
    yield call(AsyncStorage.setItem, key, JSON.stringify(data));
    yield call(AsyncStorage.setItem, timestampKey, timestamp.toString());
  } catch (error) {
    console.error('Error saving data to AsyncStorage:', error);
  }
}

// Helper function to get cached data with timestamp
function* getCachedDataWithTimestamp<T>(
  key: string,
  timestampKey: string
): Generator<any, CachedData<T> | null, any> {
  try {
    const cachedData: string | null = yield call(AsyncStorage.getItem, key);
    const timestamp: string | null = yield call(AsyncStorage.getItem, timestampKey);

    if (cachedData && timestamp) {
      return {
        data: JSON.parse(cachedData) as T,
        timestamp: parseInt(timestamp, 10),
        lastFetchTime: new Date(parseInt(timestamp, 10)).toLocaleString(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error retrieving cached data:', error);
    return null;
  }
}

// Saga for fetching products
function* fetchProductsSaga() {
  try {
    // Check network connectivity
    const netState: SagaReturnType<typeof NetInfo.fetch> = yield call(() =>
      NetInfo.fetch()
    );

    if (netState.isConnected) {
      // Fetch from API
      const products: Product[] = yield call(productService.fetchProducts);

      // Save to cache with timestamp
      yield call(
        saveDataWithTimestamp,
        PRODUCTS_CACHE_KEY,
        products,
        PRODUCTS_TIMESTAMP_KEY
      );

      // Get timestamp for display
      const cachedData: CachedData<Product[]> | null = yield call(
        getCachedDataWithTimestamp<Product[]>,
        PRODUCTS_CACHE_KEY,
        PRODUCTS_TIMESTAMP_KEY
      );

      yield put(
        fetchProductsSuccess({
          products,
          lastFetchTime: cachedData?.lastFetchTime || new Date().toLocaleString(),
          isFromCache: false,
        })
      );
    } else {
      // Load from cache when offline
      const cachedData: CachedData<Product[]> | null = yield call(
        getCachedDataWithTimestamp<Product[]>,
        PRODUCTS_CACHE_KEY,
        PRODUCTS_TIMESTAMP_KEY
      );

      if (cachedData) {
        yield put(
          fetchProductsSuccess({
            products: cachedData.data,
            lastFetchTime: cachedData.lastFetchTime,
            isFromCache: true,
          })
        );
      } else {
        yield put(
          fetchProductsFailure('No internet connection and no cached data available')
        );
      }
    }
  } catch (error) {
    // Try to load from cache on error
    const cachedData: CachedData<Product[]> | null = yield call(
      getCachedDataWithTimestamp<Product[]>,
      PRODUCTS_CACHE_KEY,
      PRODUCTS_TIMESTAMP_KEY
    );

    if (cachedData) {
      yield put(
        fetchProductsSuccess({
          products: cachedData.data,
          lastFetchTime: cachedData.lastFetchTime,
          isFromCache: true,
        })
      );
    } else {
      yield put(
        fetchProductsFailure(
          error instanceof Error ? error.message : 'Failed to fetch products'
        )
      );
    }
  }
}

// Saga for fetching product detail
function* fetchProductDetailSaga(
  action: ReturnType<typeof fetchProductDetailRequest>
) {
  try {
    const productId = action.payload;
    const cacheKey = `${PRODUCT_DETAIL_CACHE_KEY}${productId}`;
    const timestampKey = `${PRODUCT_DETAIL_TIMESTAMP_KEY}${productId}`;

    // Check network connectivity
    const netState: SagaReturnType<typeof NetInfo.fetch> = yield call(() =>
      NetInfo.fetch()
    );

    if (netState.isConnected) {
      // Fetch from API
      const product: Product = yield call(productService.fetchProductById, productId);

      // Save to cache with timestamp
      yield call(saveDataWithTimestamp, cacheKey, product, timestampKey);

      // Get timestamp for display
      const cachedData: CachedData<Product> | null = yield call(
        getCachedDataWithTimestamp<Product>,
        cacheKey,
        timestampKey
      );

      yield put(
        fetchProductDetailSuccess({
          product,
          lastFetchTime: cachedData?.lastFetchTime || new Date().toLocaleString(),
          isFromCache: false,
        })
      );
    } else {
      // Load from cache when offline
      const cachedData: CachedData<Product> | null = yield call(
        getCachedDataWithTimestamp<Product>,
        cacheKey,
        timestampKey
      );

      if (cachedData) {
        yield put(
          fetchProductDetailSuccess({
            product: cachedData.data,
            lastFetchTime: cachedData.lastFetchTime,
            isFromCache: true,
          })
        );
      } else {
        yield put(
          fetchProductDetailFailure('No internet connection and no cached data available')
        );
      }
    }
  } catch (error) {
    // Try to load from cache on error
    const productId = action.payload;
    const cacheKey = `${PRODUCT_DETAIL_CACHE_KEY}${productId}`;
    const timestampKey = `${PRODUCT_DETAIL_TIMESTAMP_KEY}${productId}`;
    const cachedData: CachedData<Product> | null = yield call(
      getCachedDataWithTimestamp<Product>,
      cacheKey,
      timestampKey
    );

    if (cachedData) {
      yield put(
        fetchProductDetailSuccess({
          product: cachedData.data,
          lastFetchTime: cachedData.lastFetchTime,
          isFromCache: true,
        })
      );
    } else {
      yield put(
        fetchProductDetailFailure(
          error instanceof Error ? error.message : 'Failed to fetch product'
        )
      );
    }
  }
}

// Root saga
export function* productSaga() {
  yield takeEvery(fetchProductsRequest.type, fetchProductsSaga);
  yield takeEvery(fetchProductDetailRequest.type, fetchProductDetailSaga);
}
