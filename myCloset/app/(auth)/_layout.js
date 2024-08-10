import React from 'react';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { SafeAreaView ,StatusBar , TouchableOpacity ,StyleSheet} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme.js';



export default function UserStack() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background , color: '#000' }}>
        <StatusBar barStyle='dark-content' backgroundColor="#6a51ae" />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        {/* <Stack.Screen name="(tabs)/(dashboard)" options={{ headerShown: false}} /> */}
        {/* <Stack.Screen name="(outfits)/favoriteOutfit" options={{ headerShown: false}}/> */}
        {/* <Stack.Screen name="(calender)/history" options={{ headerShown: false}}  /> */}
        {/* <Stack.Screen name="(statistics)/statisticsScreen" options={{ headerShown: false}}  /> */}
        {/* <Stack.Screen name="(clothes)/addClothes" options={{ headerShown: false}}  /> */}
        {/* <Stack.Screen name="(tabs)/(categories)/index" options={{ headerShown: false}}  /> */}
        {/* <Stack.Screen name="(outfits)/addOutfit" options={{ headerShown: false}}  /> */}
        {/* <Stack.Screen name="Category" component={Category} /> */}
        {/* <Stack.Screen name="(tabs)/settings)/index" options={{ headerShown: true }}  /> */}
        {/* <Stack.Screen name="(tabs)/(outfit)/index" options={{ headerShown: false}}   /> */}
        {/* <Stack.Screen name="(outfits)/editOutfit" options={{ headerShown: false}}/>
        <Stack.Screen name="(filter)/filterScreen"  options={{ headerShown: false}}/> */}
        {/* <Stack.Screen name="OutfitDetails" component={OutfitDetails} options={{ headerShown: false}}/> */}
        {/* <Stack.Screen name="OutfitDetails" component={OutfitDetails}  options={({ navigation }) => ({
            headerTitle: '',
            headerStyle: { backgroundColor: COLORS.background , borderBottomColor: "red" },
            headerLeft: () => (
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          })}  /> */}
        {/* <Stack.Screen name="AIOutfitSuggestions" component={AIOutfitSuggestions} options={{ headerShown: false}}/> */}
        {/* <Stack.Screen name="(profile)/index"  options={{ headerShown: false}}/> */}
      </Stack>

    </SafeAreaView>
      
  );
}
const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
  },
});