import React from 'react'
import { ScrollView, View , StyleSheet } from 'react-native'

import ShowCategories from '../components/ShowCategories'
import Header from '../components/Header'
const UserCategory = () => {
  return (
    <ScrollView style={styles.container}>
        <View style = {{ marginVertical:30 ,marginHorizontal: 15 ,gap :20}}>
          <Header name={"My Wardrobe"} icon={'search'}/>
        <ShowCategories />
        </View>
    </ScrollView>
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