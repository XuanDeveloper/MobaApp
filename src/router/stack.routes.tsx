import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';
import HomeScreen from '../screens/Home';
import ProductDetails from '../screens/ProductDetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register"
        component={Register}
      />
      <Stack.Screen 
        name="Home"
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