import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import api from '../../services/api';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface Product {
  id_product: number;
  name_product: string;
  price_product: string;
  description_product: string;
  img_product: string;
  rating?: number; // Make rating optional
}

const Rating: React.FC<{ rating?: number }> = ({ rating }) => {
  if (rating === undefined) {
    return null; // Don't render anything if rating is undefined
  }

  return (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Feather
          key={star}
          name="star"
          size={16}
          color={star <= rating ? '#FFD700' : '#E0E0E0'}
        />
      ))}
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  );
};

const ProductInfo: React.FC<{ product: Product }> = ({ product }) => (
  <View>
    <Text style={styles.productName}>{product.name_product}</Text>
    <Text style={styles.price}>R${product.price_product}</Text>
  </View>
);

export default function ProductDetailsScreen() {
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get<{ data: Product }>(`api/products/${productId}`);
        setProduct(response.data.data);
      } catch (err: any) {
        console.error('Erro ao buscar detalhes do produto:', err);
        if (err.response && err.response.status === 404) {
          setError('Produto não encontrado');
        } else {
          setError('Erro ao carregar detalhes do produto. Por favor, tente novamente.');
        }
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do produto.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6600" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Produto não encontrado'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: product.img_product }} style={styles.productImage} />
        <View style={styles.contentContainer}>
          <ProductInfo product={product} />
          <Rating rating={product.rating} />
          <Text style={styles.description}>{product.description_product}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 8,
    color: '#666',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
  },
});