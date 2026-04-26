import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../services/productService';

export interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  lastFetchTime: string | null;
  isFromCache: boolean;
}

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
  lastFetchTime: null,
  isFromCache: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Fetch products
    fetchProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (
      state,
      action: PayloadAction<{
        products: Product[];
        lastFetchTime: string;
        isFromCache: boolean;
      }>
    ) => {
      state.loading = false;
      state.items = action.payload.products;
      state.lastFetchTime = action.payload.lastFetchTime;
      state.isFromCache = action.payload.isFromCache;
      state.error = null;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch product detail
    fetchProductDetailRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductDetailSuccess: (
      state,
      action: PayloadAction<{
        product: Product;
        lastFetchTime: string;
        isFromCache: boolean;
      }>
    ) => {
      state.loading = false;
      state.selectedProduct = action.payload.product;
      state.lastFetchTime = action.payload.lastFetchTime;
      state.isFromCache = action.payload.isFromCache;
      state.error = null;
    },
    fetchProductDetailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear selected product
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    // Clear cache
    clearCache: (state) => {
      state.items = [];
      state.selectedProduct = null;
      state.lastFetchTime = null;
      state.isFromCache = false;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductDetailRequest,
  fetchProductDetailSuccess,
  fetchProductDetailFailure,
  clearSelectedProduct,
  clearCache,
} = productSlice.actions;

export default productSlice.reducer;
