import React from 'react'
import { Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center' ,justifyContent:'center',gap :10}}>
        <View style={{flexDirection: 'row', alignItems: 'center',gap :10 , width:'85%' ,borderWidth:1, borderColor: '#363636' , padding: 15 ,borderRadius:10 , backgroundColor:'#242424'}}>
        <Ionicons name="search" color="#fff" size={18} />
        <Text style = {{fontSize:12 , color: "#fff"}}>Search in your wardrobe</Text>
        </View>
        <View style = {{padding:12 , backgroundColor: "#242424",borderRadius:10 ,shadowColor: '#fff',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5}}>
        <FontAwesome name="filter" size={28} color="#fff" style={{alignSelf: 'flex-end'}}/>
        </View>
    </View>
  )
}

export default SearchBar