import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getIconComponent } from './Logics/getIconComponent';
import { COLORS, FONT, SIZES ,SHADOWS} from '../constants';


const CategoryCard = ({ icon, title ,selectedCategory ,handleCardPress}) => {
  const IconComponent = getIconComponent(icon, 24, '#704F38'); // Adjust the size and color as needed


  return (
    <TouchableOpacity
    style={styles.container(selectedCategory, title)}
    onPress={() => handleCardPress(title)}
  >
      <View style={styles.iconContainer}>{IconComponent}</View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    maxWidth: 30,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 5,
    marginBottom: 10,
    elevation: 3, // For shadow on Android
    shadowColor: 'red', // For shadow on iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    aligntitles: 'center',
  },
  textContainer: {
    padding: 10,
    aligntitles: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#704F38',
  },

    container: (selectedCategory, title) => ({
      width: 250,
      padding: SIZES.xLarge,
      backgroundColor: selectedCategory === title.label ? COLORS.primary : "#FFF",
      borderRadius: SIZES.medium,
      justifyContent: "space-between",
      ...SHADOWS.medium,
      shadowColor: COLORS.white,
    }),
    logoContainer: (selectedCategory, title) => ({
      width: 50,
      height: 50,
      backgroundColor: selectedCategory === title.label ? "#FFF" : COLORS.white,
      borderRadius: SIZES.medium,
      justifyContent: "center",
      aligntitles: "center",
    }),
    logoImage: {
      width: "70%",
      height: "70%",
    },
    companyName: {
      fontSize: SIZES.medium,
      fontFamily: FONT.regular,
      color: "#B3AEC6",
      marginTop: SIZES.small / 1.5,
    },
    infoContainer: {
      marginTop: SIZES.large,
    },
    jobName: (selectedCategory, title) => ({
      fontSize: SIZES.large,
      fontFamily: FONT.medium,
      color: selectedCategory === title.label ? COLORS.white : COLORS.primary,
    }),
    infoWrapper: {
      flexDirection: "row",
      marginTop: 5,
      justifyContent: "flex-start",
      aligntitles: "center",
    },
    publisher: (selectedCategory, title) => ({
      fontSize: SIZES.medium - 2,
      fontFamily: FONT.regular,
      color: selectedCategory === title.label ? COLORS.white : COLORS.primary,
    }),
    location: {
      fontSize: SIZES.medium - 2,
      fontFamily: FONT.regular,
      color: "#B3AEC6",
    },
 
});

export default CategoryCard;
