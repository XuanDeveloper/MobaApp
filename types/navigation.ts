export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    ProductDetails: { productId: number };
  };
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    description: string;
    image: string;
  }