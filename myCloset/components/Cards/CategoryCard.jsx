import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { getIconComponent } from '../Logics/getIconComponent';
import { COLORS, FONT, SIZES, SHADOWS } from '../../constants';

const CategoryCard = ({ icon, title, selectedCategory, handleCardPress ,withIcon}) => {
  const iconColor = selectedCategory === title ? COLORS.tertiary : COLORS.primary;
  const IconComponent = getIconComponent(icon, 24, iconColor);
  const formatLabel = (label) => {
    return label.replace(/_/g, ' ');
  };

  return (
    <TouchableOpacity
      style={styles.container(withIcon, selectedCategory, title)}
      onPress={() => handleCardPress(title)}
    >
    { withIcon && <View style={styles.logoContainer(selectedCategory, title)}>
        <Image source = {icon} alt ={'icon'} style= {{width: 40 , height: 40}}/>
      </View>}
      <Text style={styles.categoryName(withIcon,selectedCategory, title)}>{formatLabel(title)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (withIcon, selectedCategory, title) => ({
    width: withIcon ? 100 : 80,
    height: withIcon ? 100 : 50,
    backgroundColor: selectedCategory === title ? COLORS.primary : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // padding: SIZES.xSmall,
    margin: SIZES.small,
    ...SHADOWS.medium,
    
  }),
  logoContainer: (selectedCategory, title) => ({
    width:  selectedCategory === title ? 60 : null,
    height: selectedCategory === title ? 60 : null,
    backgroundColor: selectedCategory === title ? COLORS.white : COLORS.lightGray,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
   
  }),
  categoryName: (withIcon,selectedCategory, title) => ({
    fontSize: withIcon? 14: SIZES.small,
    fontFamily: FONT.bold,
    color: selectedCategory === title ? COLORS.white : COLORS.lightGray,
  }),
});

export default CategoryCard;
