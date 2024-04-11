import React from 'react'
import { ScrollView, View , StyleSheet } from 'react-native'

import ShowCategories from '../components/ShowCategories'
const UserCategory = () => {
  return (
    <ScrollView style={styles.container}>
        <View style = {{ marginVertical:30 ,marginHorizontal: 15 ,gap :20}}>
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
    },
    button: {
      marginTop: 10
    }
  });
export default UserCategory