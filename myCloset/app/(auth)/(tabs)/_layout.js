import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Modal, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { COLORS } from '../../../constants';
import {AddDropdown} from '../../../components/Home/AddDropdown'

const TabNavigator = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDropdown}
        onRequestClose={() => setShowDropdown(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <AddDropdown onSelect={() => setShowDropdown(false)} />
        </View>
      </Modal>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: COLORS.primary,
            borderRadius: 40,
            marginTop: 35,
            zIndex: 100,
          },
          tabBarInactiveTintColor: COLORS.white,
          tabBarActiveTintColor: COLORS.tertiary,
        }}
      >
        <Tabs.Screen
          name="(dashboard)/index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="(categories)/index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="shirt" color={color} size={size} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="add"
          options={{
              href: null,
            tabBarIcon: ({ color, size }) => (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowDropdown(true)}
              >
                <View style={styles.addIconContainer}>
                  <Ionicons name="add-outline" color={color} size={size * 1.8} />
                </View>
              </TouchableOpacity>
            ),
          }}
        /> */}
        {/* <Tabs.Screen
          name="(categories)/history"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="body-sharp" color={color} size={size} />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="(settings)/index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabNavigator;
