import React from 'react'
import { ScrollView, View , StyleSheet } from 'react-native'
import ShowCategories from '../components/User_Categories/ShowCategories'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native'

const UserCategory = () => {
  const navigation = useNavigation();
  const handleSearch = () => {
    navigation.navigate('FilterScreen');
  };

  return (
    <View  style={styles.container}>
         <View style = {{ marginVertical:30 ,marginHorizontal: 15 ,gap :20}}>
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
      backgroundColor: '#090909',
      gap : 20,
    }
  });
export default UserCategory