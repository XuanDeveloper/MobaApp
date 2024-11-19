export type RootStackParamList = {
  HomeScreen: undefined;
  ProductDetails: { productId: number };
};
  
  export interface Product {
    imageUrl: string | undefined;
    id: number;
    name: string;
    price: number;
    rating: number;
    description: string;
    image: string;
  }