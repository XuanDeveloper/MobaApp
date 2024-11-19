import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import HomeScreen from "../screens/Home";
import ProductDetails from "../screens/ProductDetailsScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ title: "Detalhes do Produto" }}
      />
    </Stack.Navigator>
  );
}
