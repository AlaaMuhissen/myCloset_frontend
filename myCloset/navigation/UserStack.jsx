import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Dashboard from '../screens/Dashboard';
import TabNavigator from './TabNavigator';
import Category from '../app/CategoryClo/Category.js';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    // inside the specific screen
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={Dashboard} /> */}
        <Stack.Screen name="tab" component={TabNavigator} />
        <Stack.Screen name="Category" component={Category} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}