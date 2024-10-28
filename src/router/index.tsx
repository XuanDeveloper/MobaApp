import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';
import React from 'react';

export default function Routes() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}