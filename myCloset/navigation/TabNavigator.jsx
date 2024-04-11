import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';



import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Dashboard from '../screens/Dashboard';
import AddClothes from '../screens/AddClothes';
import AddOutfit from '../screens/AddOutfit';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#363636',
          borderTopColor: '#363636', // Same as background color
          borderTopWidth: 1, // Optional: Adjust border width as needed
        },
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#ffb845',
        
      }}>
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#363636',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Calendar"
        component={AddClothes}
        options={{
          // tabBarBadge: 3,
          // tabBarBadgeStyle: {backgroundColor: 'yellow'},
          tabBarIcon: ({color, size}) => (
            <Ionicons name="calendar-outline" color={color} size={size}/>
          ),
        }}
      />
    
      <Tab.Screen
        name="AddClothes"
        component={AddOutfit}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: 'absolute', flex:1 , alignItems: 'center',justifyContent:'flex-end' , top: -40,  zIndex: 10 ,  padding:10 , width:70 , height:70 , backgroundColor: "#090909" ,borderRadius:"40%" }}>
            <View style={{  flex:1 , alignItems: 'center',justifyContent:'center', width:50 , height:50 , backgroundColor:"#242424" , borderRadius:"50%", }}>
              <Ionicons name="add-outline" color={color} size={size * 1.7} />
            </View>
            </View>
          ),
        }}
      />
    
       <Tab.Screen
        name="Categories"
        component={AddOutfit}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="shirt-outline" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Settings"
        component={AddOutfit}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="cog-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if( routeName == 'GameDetails' ) {
    return 'none';
  }
  return 'flex';
};

export default TabNavigator;