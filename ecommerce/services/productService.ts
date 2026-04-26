import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
}

const CACHE_KEY = 'products_cache';
const API_URL = 'https://dummyjson.com/products';

export const productService = {
  async fetchProducts(): Promise<Product[]> {
    try {
      const netState = await NetInfo.fetch();
      
      if (!netState.isConnected) {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          return JSON.parse(cached);
        }
        throw new Error('No internet connection and no cached data');
      }

      const response = await fetch(`${API_URL}?limit=100`);
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const data = await response.json();
      const products = data.products || [];
      
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(products));
      return products;
    } catch (error) {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
      throw error;
    }
  },

  async fetchProductById(id: number): Promise<Product> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
