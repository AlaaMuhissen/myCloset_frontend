import React from 'react'
import { ScrollView, View , StyleSheet } from 'react-native'
import ShowCategories from '../components/User_Categories/ShowCategories'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../constants'

const UserCategory = () => {
  const navigation = useNavigation();
  const handleSearch = () => {
    navigation.navigate('FilterScreen');
  };

  return (
    <View  style={styles.container}>
         <View >
       <Header name={"My Wardrobe"} icon={'search'} onIconPress={handleSearch}/>
        <ScrollView>
            <ShowCategories />
    </ScrollView>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingHorizontal: 8,
    }
  });
export default UserCategory