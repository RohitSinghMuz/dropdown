import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addToCart } from '../store/cartSlice';
import { fetchProductDetailRequest, clearSelectedProduct } from '../store/productSlice';
import { RootState, AppDispatch } from '../store';
import { formatPrice } from '../utils/helpers';

type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: number };
  Cart: undefined;
  Checkout: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const product = useSelector((state: RootState) => state.products.selectedProduct);
  const loading = useSelector((state: RootState) => state.products.loading);
  const lastFetchTime = useSelector((state: RootState) => state.products.lastFetchTime);
  const isFromCache = useSelector((state: RootState) => state.products.isFromCache);

  useEffect(() => {
    dispatch(fetchProductDetailRequest(route.params.productId));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [route.params.productId, dispatch]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.thumbnail,
        })
      );
      navigation.navigate('Cart');
    }
  };

  if (loading && !product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  const displayImage = product.images?.[currentImageIndex] || product.thumbnail;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {isFromCache && lastFetchTime && (
        <View style={styles.cacheIndicator}>
          <Text style={styles.cacheText}>
            📦 Cached - Last updated: {lastFetchTime}
          </Text>
        </View>
      )}

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: displayImage }}
          style={styles.mainImage}
          resizeMode="cover"
        />
        {product.images && product.images.length > 1 && (
          <View style={styles.thumbnailContainer}>
            {product.images.map((img, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setCurrentImageIndex(idx)}
                style={[
                  styles.thumbnail,
                  currentImageIndex === idx && styles.activeThumbnail,
                ]}
              >
                <Image source={{ uri: img }} style={styles.thumbnailImage} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>⭐ {product.rating.toFixed(1)}</Text>
          <Text style={styles.stock}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </Text>
        </View>

        <Text style={styles.price}>{formatPrice(product.price)}</Text>

        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity
          style={[
            styles.addButton,
            product.stock === 0 && styles.disabledButton,
          ]}
          onPress={handleAddToCart}
          disabled={product.stock === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#333',
  },
  cacheIndicator: {
    backgroundColor: '#fff3cd',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ffc107',
  },
  cacheText: {
    fontSize: 11,
    color: '#856404',
    fontWeight: '500',
  },
  imageContainer: {
    backgroundColor: '#f5f5f5',
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  activeThumbnail: {
    borderColor: '#2196F3',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  stock: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '600',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2196F3',
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
