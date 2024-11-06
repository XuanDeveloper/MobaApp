import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import HomeScreen from '../screens/Home';
import ProductDetails from '../screens/ProductDetailsScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createStackNavigator<RootStackParamList>();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login"
        component={Login}
        options={{ title: 'Detalhes do Produto' }}
      />
      <Stack.Screen 
        name="Register"
        component={Register}
        options={{ title: 'Detalhes do Produto' }}
      />
      <Stack.Screen 
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductDetails"
        component={ProductDetails}
        options={{ title: 'Detalhes do Produto' }}
      /> 
    </Stack.Navigator>
  );
}