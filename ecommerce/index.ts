// Store
export { store } from './store';
export type { RootState, AppDispatch } from './store';
export { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from './store/cartSlice';

// Services
export { productService } from './services/productService';
export type { Product } from './services/productService';

// Screens
export { ProductListScreen } from './screens/ProductListScreen';
export { ProductDetailScreen } from './screens/ProductDetailScreen';
export { CartScreen } from './screens/CartScreen';
export { CheckoutScreen } from './screens/CheckoutScreen';

// Components
export { ProductCard } from './components/ProductCard';
export { CartItemComponent } from './components/CartItemComponent';
export { SkeletonLoader, SkeletonGrid } from './components/SkeletonLoader';
export { EmptyCart } from './components/EmptyCart';

// Navigation
export { EcommerceNavigator } from './navigation/EcommerceNavigator';
export type { RootStackParamList } from './navigation/EcommerceNavigator';

// Utils
export { formatPrice, calculateTotal } from './utils/helpers';
