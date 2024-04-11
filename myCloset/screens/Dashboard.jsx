import React from 'react'
import { Text ,Button ,StyleSheet, View, ScrollView} from 'react-native'
import { useAuthentication } from '../utils/hooks/useAuthentication'
import { getAuth, signOut }from 'firebase/auth'
import Header from '../components/Header';
import { getIconComponent } from '../components/Logics/getIconComponent';
import InfoCard from '../components/InfoCard';

import ShowCategories from '../components/ShowCategories';
import GetWeather from '../components/Logics/GetWeather';
import SearchBar from '../components/SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AIOutfitSuggestions from '../components/AIOutfitSuggestions';
import AIOutfitCards from '../components/Cards/AIOutfitCards';

const auth = getAuth();
const Dashboard = () => {
  const IconComponent = getIconComponent('tshirt', 50, 'blue')
    const { user } = useAuthentication();
  return (
   <> 
     <ScrollView style= {styles.container}>
      <View style = {  {marginVertical:30 ,marginHorizontal: 15 ,gap :20}}>
      <InfoCard />
      <SearchBar />

      <View style={{gap:10 , flexDirection :'row' ,justifyContent: 'space-between' ,alignItems:'center'}}>
        <View>

      <Text style={{fontSize:18 , color:"#fff" , fontWeight:"bold"}}>Weather for this week</Text>
        </View>
        <View style={{flexDirection: 'row',alignItems:'center', justifyContent: 'flex-end' ,padding:10 }}>
      <Ionicons name="location" color="#D5D5D5" size={16} />
      <Text style={{fontSize:8, color:"#D5D5D5" , fontWeight:"bold"}}>Jerusalem</Text>
        </View>
      </View>
      <GetWeather />
      <View style={{gap:20}}>
        <Text style={{fontSize:18 , color:"#fff" , fontWeight:"bold"}}>We made these Outfits for you</Text>
        <View style={{flex:1 , justifyContent: 'center', alignItems:'center'}}>
        <AIOutfitSuggestions />
        </View>
      </View>
      
      </View>

     </ScrollView>
   
   </>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#090909',
      gap : 20,
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
