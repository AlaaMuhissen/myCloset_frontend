import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getIconComponent } from '../Logics/getIconComponent';
import { COLORS, FONT, SIZES, SHADOWS } from '../../constants';

const CategoryCard = ({ icon, title, selectedCategory, handleCardPress }) => {
  const iconColor = selectedCategory === title ? COLORS.tertiary : COLORS.primary;
  const IconComponent = getIconComponent(icon, 24, iconColor);

  return (
    <TouchableOpacity
      style={styles.container(selectedCategory, title)}
      onPress={() => handleCardPress(title)}
    >
      <View style={styles.logoContainer(selectedCategory, title)}>
        {IconComponent}
      </View>
      <Text style={styles.companyName(selectedCategory, title)}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (selectedCategory, title) => ({
    width: 100,
    height: 100,
    backgroundColor: selectedCategory === title ? COLORS.primary : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // padding: SIZES.xSmall,
    margin: SIZES.small,
    ...SHADOWS.medium,
    
  }),
  logoContainer: (selectedCategory, title) => ({
    width:  selectedCategory === title ? 50 : null,
    height: selectedCategory === title ? 50 : null,
    backgroundColor: selectedCategory === title ? COLORS.white : COLORS.lightGray,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
   
  }),
  companyName: (selectedCategory, title) => ({
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: selectedCategory === title ? COLORS.white : COLORS.lightGray,
  }),
});

export default CategoryCard;
