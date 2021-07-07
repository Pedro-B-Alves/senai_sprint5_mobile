import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/login';
import Listagem from './src/screens/listagem';

const AuthStack = createStackNavigator();

export default function Stack(){
  return(
    <NavigationContainer>
      <AuthStack.Navigator
        headerMode = 'none'
      >
        <AuthStack.Screen name = 'Listagem' component={Listagem} />
        <AuthStack.Screen name = 'Login' component={Login} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}
