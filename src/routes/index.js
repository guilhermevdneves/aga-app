import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {UnauthenticatedRoutes} from './unathenticated.routes';
import { useAuthContext } from '../context/authContext';
import { AuthenticatedRoutes } from './authenticated.routes';

function Routes(props) {
  const { authToken } = useAuthContext()
  return (
    <NavigationContainer>
    {authToken 
      ? <AuthenticatedRoutes />
      : <UnauthenticatedRoutes />
    }
    </NavigationContainer>
  );
}
export default Routes;