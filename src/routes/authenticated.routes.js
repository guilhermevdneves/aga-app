import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Home } from '../Screens/Home';

const Stack = createNativeStackNavigator();

export const AuthenticatedRoutes = () => {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
  );
};