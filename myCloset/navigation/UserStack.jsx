import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import TabNavigator from './TabNavigator';
import Category from '../app/CategoryClo/Category.js';
import AddClothes from '../screens/AddClothes.jsx';
import AddOutfit from '../screens/AddOutfit.jsx';
import { SafeAreaView ,StatusBar } from 'react-native';
import SettingsScreen from '../screens/SettingsScreen.jsx';


import EditOutfit from '../screens/EditOutfit.jsx';
import ShowOutfits from '../screens/ShowOutfits.jsx';
import UserCategory from '../screens/UserCategory.jsx';
import FilterScreen from '../screens/FilterScreen.jsx';
import { Provider as PaperProvider } from 'react-native-paper';
const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#090909' , color: '#fff' }}>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={Dashboard} /> */}
        <Stack.Screen name="tab" options={{ headerShown: false}} component={TabNavigator} />
        <Stack.Screen name="AddClothes" options={{ headerShown: false}} component={AddClothes} />
        <Stack.Screen name="userCategory" options={{ headerShown: false}} component={UserCategory} />
        <Stack.Screen name="AddOutfit" options={{ headerShown: false}} component={AddOutfit} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Settings" options={{ headerShown: true }} component={SettingsScreen} />
        <Stack.Screen name="ShowOutfits" options={{ headerShown: false}} component={ShowOutfits}  />
        <Stack.Screen name="EditOutfit" component={EditOutfit} options={{ headerShown: false}}/>
        <Stack.Screen name="FilterScreen" component={FilterScreen} options={{ headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
      
  );
}