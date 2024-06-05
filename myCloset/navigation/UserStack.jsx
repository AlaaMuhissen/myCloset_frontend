import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import TabNavigator from './TabNavigator';
import Category from '../app/CategoryClo/Category.js';
import AddClothes from '../screens/AddClothes.jsx';
import AddOutfit from '../screens/AddOutfit.jsx';
import { SafeAreaView } from 'react-native';
import SettingsScreen from '../screens/SettingsScreen.jsx';
import TakePic from '../components/TakePic.jsx';
import UserOutfits from '../screens/UserOutfits.jsx';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#090909' }}>
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={Dashboard} /> */}
        <Stack.Screen name="tab" options={{ headerShown: false,}} component={TabNavigator} />
        <Stack.Screen name="AddClothes" component={AddClothes} />
        <Stack.Screen name="AddOutfit" component={AddOutfit} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Settings" options={{ headerShown: true }} component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
      
  );
}