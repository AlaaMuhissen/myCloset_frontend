import React from 'react'
import { Text ,Button ,StyleSheet, View} from 'react-native'
import { useAuthentication } from '../utils/hooks/useAuthentication'
import { getAuth, signOut }from 'firebase/auth'
import Header from '../components/Header';
import { getIconComponent } from '../components/Logics/getIconComponent';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ShowCategories from '../components/ShowCategories';
import GetWeather from '../components/Logics/GetWeather';

// import Nav from '../components/NavigateBar';
const auth = getAuth();
const Dashboard = () => {
  const IconComponent = getIconComponent('tshirt', 50, 'blue')
    const { user } = useAuthentication();
  return (
   <> 
     <View style= {styles.container}>
    {/* <View >{IconComponent}</View>
    <Header name={user?.displayName || 'User'} title="Dashboard" /> */}
    <GetWeather />
    <View>
      {/* <ShowCategories /> */}
    </View>

     </View>
   
   </>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#090909',
    
     
    },
    button: {
      marginTop: 10
    }
  });
export default Dashboard

// import React from 'react';
// import { View, Text, Pressable, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// const Stack = createNativeStackNavigator();

// function HomeScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Home Screen</Text>
//       <Pressable onPress={() => navigation.navigate('Add')}>
//         <MaterialCommunityIcons name="plus-circle" size={50} color="#704F38" />
//       </Pressable>
//     </View>
//   );
// }

// function AddScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Add Screen</Text>
//     </View>
//   );
// }

// function OutfitsScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Outfits Screen</Text>
//     </View>
//   );
// }

// export default function Dashboard() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           headerStyle: { backgroundColor: '#704F38' },
//           headerTintColor: '#fff',
//           headerTitleStyle: { fontWeight: 'bold' },
//           headerRight: () => (
//             <Pressable
//               style={{ marginRight: 10 }}
//               onPress={() => alert('This is a custom header button')}
//             >
//               <MaterialCommunityIcons name="bell" size={24} color="#fff" />
//             </Pressable>
//           ),
//         }}
//       >
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Add" component={AddScreen} />
//         <Stack.Screen name="Outfits" component={OutfitsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
// });
