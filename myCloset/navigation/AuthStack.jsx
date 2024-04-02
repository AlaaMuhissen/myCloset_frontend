import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen name="Sign In" component={Login} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="Sign Up" component={SignOutScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}