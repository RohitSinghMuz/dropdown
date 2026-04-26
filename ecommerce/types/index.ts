/**
 * Ecommerce Module Types
 * Central location for all TypeScript types and interfaces
 */

// Product Types
export interface Product {
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
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  reviews?: Review[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

// Cart Types
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

// Order Types
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
  updatedAt: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Filter & Sort Types
export interface ProductFilter {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  inStock?: boolean;
}

export interface SortOptions {
  field: 'price' | 'rating' | 'title' | 'newest';
  order: 'asc' | 'desc';
}

// Navigation Types
export interface NavigationParams {
  ProductList: undefined;
  ProductDetail: { productId: number };
  Cart: undefined;
  Checkout: undefined;
}

// Component Props Types
export interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
}

export interface CartItemProps {
  item: CartItem;
  onRemove: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}

// Service Response Types
export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Async State Types
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
