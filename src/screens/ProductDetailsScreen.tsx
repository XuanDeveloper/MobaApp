import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList, Product } from "../../types/navigation";
import api from "../../services/api"; // Import da instância do axios

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

export default function ProductDetailsScreen() {
  const [activeTab, setActiveTab] = useState("Descrição");
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get<Product>(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do produto:", error);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Feather
          key={i}
          name={i < Math.floor(rating) ? "star" : "star"}
          size={16}
          color={i < rating ? "#FFD700" : "#E0E0E0"}
        />
      ));
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.contentContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.price}>R${product.price}</Text>
          <View style={styles.ratingContainer}>
            {renderStars(product.rating)}
            <Text>{product.rating}</Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6600",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 8,
    color: "#666",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF6600",
  },
  tabText: {
    color: "#666",
  },
  activeTabText: {
    color: "#FF6600",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  similarProducts: {
    flexDirection: "row",
  },
  similarProductItem: {
    marginRight: 16,
  },
  similarProductImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarProductPrice: {
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#000",
    padding: 16,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
