import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn} from '../Screens/SignIn';
import {SignUp} from '../Screens/SignUp';


const Stack = createNativeStackNavigator();

export const UnauthenticatedRoutes = () => {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Signin"
          component={SignIn}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
        />
      </Stack.Navigator>
  );
};