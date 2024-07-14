import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT } from '../../constants';

const AddDropdown = ({ onSelect }) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.option} onPress={() => { navigation.navigate("AddClothes"); onSelect(null) }}>
            <Ionicons name="shirt-outline" color={COLORS.primary} size={24} style={styles.icon} />
            <Text style={styles.optionText}>Add clothes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => { navigation.navigate("AddOutfit"); onSelect(null) }}>
            <Ionicons name="person-outline" color={COLORS.primary} size={24} style={styles.icon} />
            <Text style={styles.optionText}>Add outfit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => onSelect(null)} // Close the dropdown when close button is pressed
      >
        <Ionicons name="close" color={COLORS.white} size={46} />
      </TouchableOpacity>
    </>
  );
};

export default AddDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'flex-end',
    top: -70,
  },
  dropdownContainer: {
    zIndex: 1000,
  },
  dropdown: {
    width: 200,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 3,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    borderBottomColor: COLORS.gray2,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 10,
    fontFamily: FONT.regular,
  },
  icon: {
    marginRight: 10,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    top: -40,
  },
});
