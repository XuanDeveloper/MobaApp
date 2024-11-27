import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: { productId: number };
};

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type ProductDetailsScreenProps = StackScreenProps<RootStackParamList, 'ProductDetails'>;

  
  export interface Product {
    imageUrl: string | undefined;
    id: number;
    name: string;
    price: number;
    rating: number;
    description: string;
    image: string;
  }