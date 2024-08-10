// import React, { useState } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { View, Modal, TouchableOpacity } from 'react-native';
// import AddDropdown from '../components/Home/AddDropdown';
// import Dashboard from '../screens/Dashboard';
// import AddClothes from '../app/(clothes)/addClothes';
// import AddOutfit from '../screens/AddOutfit';
// import UserCategory from '../screens/UserCategory';
// import SettingsScreen from '../screens/SettingsScreen';
// import ShowOutfits from '../screens/ShowOutfits';
// import { COLORS } from '../constants';

// const Tab = createBottomTabNavigator();

// const TabNavigator = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedComponent, setSelectedComponent] = useState(null);

//   const handleComponentSelect = (component) => {
//     setSelectedComponent(component);
//     setShowDropdown(false);
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: COLORS.background }}>
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={showDropdown}
//         onRequestClose={() => setShowDropdown(false)}
//       >
//         <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
//           <AddDropdown onSelect={handleComponentSelect} />
//         </View>
//       </Modal>

//       <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarStyle: {
//             backgroundColor: COLORS.primary,
//             borderRadius: 40,
//             marginTop:35,
//             zIndex:100
//           },
//           tabBarInactiveTintColor: COLORS.white,
//           tabBarActiveTintColor: COLORS.tertiary,
//         }}
//       >
//         <Tab.Screen
//           name="Dashboard"
//           component={Dashboard}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="home" color={color} size={size} />
//             ),
//             headerShown: false,
//           }}
//         />
//         <Tab.Screen
//           name="Categories"
//           component={UserCategory}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="shirt" color={color} size={size} />
//             ),
//             headerShown: false,
//           }}
//         />
//         <Tab.Screen
//           name="AddTab"
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => setShowDropdown(true)}
//               >
//                 <View style={styles.addIconContainer}>
//                   <Ionicons name="add-outline" color={color} size={size * 1.8} />
//                 </View>
//               </TouchableOpacity>
//             ),
//             headerShown: false,
//           }}
//         >
//           {() => null}
//         </Tab.Screen>
//         <Tab.Screen
//           name="Calendar"
//           component={ShowOutfits}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="body-sharp" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Settings"
//           component={SettingsScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="cog" color={color} size={size} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </View>
//   );
// };

// export default TabNavigator;

// const styles = {
//   addButton: {
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 100,
//     padding: 10,
//     width: 75,
//     height: 75,
//     top: -35,
//     backgroundColor: COLORS.background,
//     borderRadius: 40,
//   },
//   addIconContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 60,
//     height: 60,
//     backgroundColor: COLORS.secondary,
//     borderRadius: 50,
//   },
// };
