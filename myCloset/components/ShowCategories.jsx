import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { categories } from '../assets/data/categories';
import CategoryCard from './CategoryCard';
import { FlatList } from 'react-native-gesture-handler';
import { SIZES } from '../constants';
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
const ShowCategories = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState();
    const handleCardPress = (category) => {
        console.log(category);
        navigation.navigate('Category', { category });
        setSelectedCategory(category);
      };
  return (
   <>
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryCard
            icon={item.icons}
            title={item.label}
            selectedCategory={selectedCategory}
            handleCardPress={handleCardPress}
          />
        )}
        keyExtractor={(item) => item.label}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        horizontal
       
      />
    </View>
          </>
    // <ScrollView contentContainerStyle={styles.container} horizontal={true}>
    //   {categories.map((category, index) => (
    //     <CategoryCard key={index} icon={category.icons} title={category.label} />
    //   ))}
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
  },
});

export default ShowCategories;
