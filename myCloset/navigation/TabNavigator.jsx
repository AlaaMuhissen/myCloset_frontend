import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Modal, TouchableOpacity } from 'react-native';
import AddDropdown from '../components/AddDropdown';
import Dashboard from '../screens/Dashboard';
import AddClothes from '../screens/AddClothes';
import AddOutfit from '../screens/AddOutfit';
import UserCategory from '../screens/UserCategory';
import SettingsScreen from '../screens/SettingsScreen';
import { FontAwesome } from '@expo/vector-icons';
import ShowOutfits from '../screens/ShowOutfits';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
    setShowDropdown(false);
  };

  return (
    <View style={{ flex: 1 , backgroundColor: '#090909'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDropdown}
        onRequestClose={() => setShowDropdown(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <AddDropdown onSelect={handleComponentSelect} />
        </View>
      </Modal>

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#363636',
            borderRadius:40
          },
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: '#ffb845',
          
        }}
      >
        
        <Tab.Screen
          name="dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      <Tab.Screen
          name="Categories"
          component={UserCategory}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="shirt" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
       
        <Tab.Screen
          name="AddTab"
          options={{
            tabBarIcon: ({ color, size }) => (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  padding: 10,
                  width: 75,
                  height: 75,
                  top: -35,
                  backgroundColor: "#090909",
                  borderRadius: 40,
                }}
                onPress={() => setShowDropdown(true)}
              >
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    backgroundColor: "#242424",
                    borderRadius: 50
                  }}
                >
                <Ionicons name="add-outline" color={color} size={size * 1.8} />
                </View>
              </TouchableOpacity>
            ),
            headerShown: false,
          }}
        >
          {() => null}
        </Tab.Screen>
        <Tab.Screen
          name="Calendar"
          component={ShowOutfits}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart" color={color} size={size} />
            ),
          }}
        />
        
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="cog" color={color} size={size} />
            ),
            
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;
