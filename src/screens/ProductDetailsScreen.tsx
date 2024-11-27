import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { ProductDetailsScreenProps } from '../../types/navigation';
import api from '../../services/api';
import WhatsAppButton from '../components/whatsappButton';
import { Feather } from '@expo/vector-icons';

interface Product {
  id_product: number;
  name_product: string;
  price_product: string;
  description_product: string;
  img_product: string;
}

type TabType = 'description' | 'materials' | 'reviews';

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('description');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`api/products/search/${productId}`);
        setProduct(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Feather
        key={index}
        name={index < Math.floor(rating) ? "star" : "star"}
        size={16}
        color={index < Math.floor(rating) ? "#FFB800" : "#E0E0E0"}
        style={{ marginRight: 2 }}
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return <Text style={styles.tabContent}>{product?.description_product}</Text>;
      case 'materials':
        return <Text style={styles.tabContent}>Informações sobre materiais não disponíveis</Text>;
      case 'reviews':
        return (
          <View style={styles.reviewsContainer}>
            <View style={styles.ratingContainer}>
              {renderStars(4.5)}
              <Text style={styles.ratingText}>4.5</Text>
            </View>
            <Text style={styles.reviewsText}>86 reviews</Text>
          </View>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF8C00" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: `data:image/jpeg;base64,${product.img_product}` }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.productName}>{product.name_product}</Text>
          <Text style={styles.priceText}>R$ {product.price_product}</Text>
          
          <View style={styles.ratingContainer}>
            {renderStars(4.5)}
            <Text style={styles.ratingCount}>86 reviews</Text>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'description' && styles.activeTab]}
              onPress={() => setActiveTab('description')}
            >
              <Text style={[styles.tabText, activeTab === 'description' && styles.activeTabText]}>
                Descrição
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'materials' && styles.activeTab]}
              onPress={() => setActiveTab('materials')}
            >
              <Text style={[styles.tabText, activeTab === 'materials' && styles.activeTabText]}>
                Materiais
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
                Avaliação
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContentContainer}>
            {renderTabContent()}
          </View>
        </View>
      </ScrollView>
      
      <WhatsAppButton 
        phoneNumber="5517981788401"
        message={`Olá! Estou interessado no produto: ${product.name_product}. Pode me dar mais informações?`}
      />
    </View>
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
    fontSize: 18,
    color: 'red',
  },
  productImage: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  contentContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF8C00',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingCount: {
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
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF8C00',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#FF8C00',
    fontWeight: '600',
  },
  tabContentContainer: {
    paddingVertical: 16,
  },
  tabContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  reviewsContainer: {
    marginTop: 8,
  },
  reviewsText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default ProductDetailsScreen;

