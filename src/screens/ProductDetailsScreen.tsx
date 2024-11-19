import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface Product {
  id_product: number;
  name_product: string;
  price_product: string;
  description_product: string;
  img_product: string;
  rating?: number;
  reviews_count?: number;
  materials?: string;
}

interface TabProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const Tab: React.FC<TabProps> = ({ title, isActive, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    style={[styles.tab, isActive && styles.activeTab]}
  >
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const Rating: React.FC<{ rating?: number, reviews_count?: number }> = ({ rating, reviews_count }) => {
  if (!rating) return null;

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
      {reviews_count && (
        <Text style={styles.reviewsCount}>{reviews_count} Reviews</Text>
      )}
    </View>
  );
};



export default function ProductDetailsScreen() {
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'materials' | 'reviews'>('description');

  // Simulated product data matching the image
  const simulatedProduct: Product = {
    id_product: 1,
    name_product: "Sofá Retrátil Reclinável Confortável",
    price_product: "1.495,99",
    description_product: "Sofá-cama Estofado Retrátil e Reclinável\nEstrutura em madeira reflorestada seca e imunizada",
    img_product: "https://a-static.mlcdn.com.br/800x560/sofa-retratil-reclinavel-confortavel-para-sala-200m-bege-fernandes/reido/251-b/fcbd449e8f4ec32deaab2a78f9e046bc.jpeg",
    rating: 4.6,
    reviews_count: 98,
    materials: "Estrutura: Madeira reflorestada\nRevestimento: Tecido suede\nPés: Metal cromado",
  };

  useEffect(() => {
    setProduct(simulatedProduct);
    setIsLoading(false);
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

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return <Text style={styles.contentText}>{product.description_product}</Text>;
      case 'materials':
        return <Text style={styles.contentText}>{product.materials}</Text>;
      case 'reviews':
        return <Rating rating={product.rating} reviews_count={product.reviews_count} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: product.img_product }} style={styles.productImage} />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.productName}>{product.name_product}</Text>
            <Text style={styles.price}>R${product.price_product}</Text>
          </View>
          <Rating rating={product.rating} reviews_count={product.reviews_count} />
          
          <View style={styles.tabContainer}>
            <Tab 
              title="Descrição" 
              isActive={activeTab === 'description'} 
              onPress={() => setActiveTab('description')}
            />
            <Tab 
              title="Materiais" 
              isActive={activeTab === 'materials'} 
              onPress={() => setActiveTab('materials')}
            />
            <Tab 
              title="Avaliação" 
              isActive={activeTab === 'reviews'} 
              onPress={() => setActiveTab('reviews')}
            />
          </View>
          
          <View style={styles.tabContent}>
            {renderContent()}
          </View>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6600',
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
  reviewsCount: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6600',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
  },
  activeTabText: {
    color: '#FF6600',
    fontWeight: '600',
  },
  tabContent: {
    minHeight: 100,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  addToCartButton: {
    backgroundColor: '#000',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
  },
});