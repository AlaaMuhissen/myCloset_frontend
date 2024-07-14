import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import RegistrationScreen from '../screens/RegistrationScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
 
      <Stack.Navigator>
      
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="registration" component={RegistrationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  
  );
}