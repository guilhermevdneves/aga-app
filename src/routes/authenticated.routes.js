import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Home } from '../Screens/Home';

const Stack = createNativeStackNavigator();

export const AuthenticatedRoutes = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Welcome'}}
        />
      </Stack.Navigator>
  );
};