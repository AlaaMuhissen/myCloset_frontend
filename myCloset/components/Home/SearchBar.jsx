import React from 'react';
import { TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT } from '../../constants';

const SearchBar = ({ onSearch }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10, 
        width: '85%', 
        borderWidth: 1, 
        borderColor: COLORS.secondary, 
        padding: 15, 
        borderRadius: 10, 
        backgroundColor: COLORS.secondary 
      }}>
        <Ionicons name="search" color={COLORS.white} size={18} />
        <TextInput
          style={{ fontSize: 12, color: COLORS.white, flex: 1, fontFamily: FONT.regular }}
          placeholder="Search in your wardrobe"
          placeholderTextColor={COLORS.white}
          onChangeText={() => navigation.navigate('SearchResults')}
        />
      </View>
      <View style={{ 
        padding: 12, 
        backgroundColor: COLORS.secondary, 
        borderRadius: 10, 
        shadowColor: COLORS.white, 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
        elevation: 5 
      }}>
        <FontAwesome name="filter" size={28} color={COLORS.white} style={{ alignSelf: 'flex-end' }} />
      </View>
    </View>
  );
}

export default SearchBar;
