import React, { useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const POPULAR_PRODUCTS = [
    { 
      id: 1, 
      name: 'Sofá-cama', 
      price: 599,
      rating: 4.5,
      description: 'Sofá-cama funcional e estiloso, perfeito para relaxar durante o dia e acomodar convidados à noite.',
      image: 'https://v0.dev/placeholder.svg'
    },
    { 
      id: 2, 
      name: 'Poltrona', 
      price: 250,
      rating: 4.2,
      description: 'Poltrona confortável com design moderno.',
      image: 'https://v0.dev/placeholder.svg'
    },
    { 
      id: 3, 
      name: 'Mesa de centro', 
      price: 300,
      rating: 4.0,
      description: 'Mesa de centro elegante para sua sala.',
      image: 'https://v0.dev/placeholder.svg'
    },
    { 
      id: 4, 
      name: 'Estante', 
      price: 599,
      rating: 4.7,
      description: 'Estante moderna e espaçosa para seus livros e decoração.',
      image: 'https://v0.dev/placeholder.svg'
    }
  ];


export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToProductDetails = (productId: number) => {
    navigation.navigate('ProductDetails', { productId });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MobApp</Text>
          <TouchableOpacity>
            <Feather name="log-out" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cadeiras, mesas e sofás"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {['Cadeiras', 'Sofá', 'Mesas'].map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryItem}>
                <View style={styles.categoryImagePlaceholder} />
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.promotionBanner}>
          <Text style={styles.promotionText}>Sofás em promoção</Text>
          <Text style={styles.discountText}>70%</Text>
          <Text style={styles.promotionSubtext}>Ver mais</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.popularGrid}>
    {POPULAR_PRODUCTS.map((item) => (
      <TouchableOpacity 
        key={item.id} 
        style={styles.popularItem}
        onPress={() => navigateToProductDetails(item.id)}
      >
        <View style={styles.popularImagePlaceholder} />
        <Text >{item.name}</Text>
        <Text style={styles.priceText}>R${item.price}</Text>
        <TouchableOpacity style={styles.heartButton}>
          <Feather name="heart" size={18} color="gray" />
        </TouchableOpacity>
      </TouchableOpacity>
    ))}
  </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Para salas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.roomsScroll}>
            {['Copa', 'Quarto', 'Escritório'].map((room, index) => (
              <TouchableOpacity key={index} style={styles.roomItem}>
                <View style={styles.roomImagePlaceholder} />
                <Text style={styles.roomText}>{room}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={24} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="heart" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="user" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: 'orange',
  },
  categoriesScroll: {
    paddingLeft: 16,
  },
  categoryItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  categoryImagePlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryText: {
    textAlign: 'center',
  },
  promotionBanner: {
    backgroundColor: '#FFF0E6',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  promotionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  discountText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'orange',
  },
  promotionSubtext: {
    color: 'orange',
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  popularItem: {
    width: '48%',
    marginBottom: 16,
  },
  popularImagePlaceholder: {
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  priceText: {
    fontWeight: 'bold',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
  },
  roomsScroll: {
    paddingLeft: 16,
  },
  roomItem: {
    marginRight: 16,
  },
  roomImagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  roomText: {
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 12,
  },
  navItem: {
    alignItems: 'center',
  },
});