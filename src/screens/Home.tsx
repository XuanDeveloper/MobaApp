import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";


import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../services/api";
import { RootStackParamList } from "../../types/navigation";
import WhatsAppButton from "../components/whatsappButton";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

interface APIProduct {
  id_product: number;
  name_product: string;
  price_product: string;
  description_product: string;
  img_product: string;
}

const HomeScreen: React.FC = () => {
  const [apiProducts, setApiProducts] = useState<APIProduct[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("api/products/8");
        setApiProducts(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const navigateToProductDetails = (productId: number): void => {
    navigation.navigate("ProductDetails", { productId });
  };

  const categories = [
    { id: 1, name: "Cadeiras", icon: "🪑" },
    { id: 2, name: "Sofá", icon: "🛋️" },
    { id: 3, name: "Mesas", icon: "🪑" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MobApp</Text>
        </View>

        <View style={styles.searchBar}>
          <Feather
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Cadeira, mesas e sofás"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.promotionBanner}>
          <Text style={styles.promotionSubtext}>Sofás em promoção</Text>
          <Text style={styles.discountText}>70%</Text>
          <Text style={styles.promotionSubtext}>off</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.popularGrid}>
            {apiProducts.map((item) => (
              <TouchableOpacity
                key={item.id_product}
                style={styles.popularItem}
                onPress={() => navigateToProductDetails(item.id_product)}
              >
                <Image
                  source={{ uri: `data:image/png;base64,${item.img_product}` }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <TouchableOpacity style={styles.heartButton}>
                  <Feather name="heart" size={18} color="#999" />
                </TouchableOpacity>
                <Text style={styles.productName}>{item.name_product}</Text>
                <Text style={styles.priceText}>R${item.price_product}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <WhatsAppButton phoneNumber="17981788401"/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  logoutButton: {
    padding: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  seeAllText: {
    color: "#FF8C00",
    fontSize: 14,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryItem: {
    marginRight: 20,
    alignItems: "center",
  },
  categoryIcon: {
    width: 64,
    height: 64,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  promotionBanner: {
    backgroundColor: "#FFF5EC",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  promotionSubtext: {
    color: "#FF8C00",
    fontSize: 14,
  },
  discountText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF8C00",
    marginVertical: 4,
  },
  popularGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 16,
  },
  popularItem: {
    width: "47%",
  },
  productImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default HomeScreen;
