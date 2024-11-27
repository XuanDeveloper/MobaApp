import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import HomeScreen from "../screens/Home";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ title: "Detalhes do Produto" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
