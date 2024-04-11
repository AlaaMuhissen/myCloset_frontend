import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { categories } from '../assets/data/categories';
import CategoryCard from './Cards/CategoryCard';
import SubCategoryList from './SubCategoryList';
import { FlatList } from 'react-native-gesture-handler';
import { SIZES } from '../constants';
import { useNavigation } from '@react-navigation/native';

const ShowCategories = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Tops');
  const handleCardPress = (category) => {
    setSelectedCategory(category);
  };

  const selectedCategoryData = categories.find((category) => category.label === selectedCategory);
  
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
    <View>
      {selectedCategoryData && (
        <SubCategoryList subOptions={selectedCategoryData.subOptions} /> 
      )}
      </View>
      {/* <View>
      {selectedCategoryData && (
        <SubCategoryList subOptions={selectedCategoryData.subOptions} /> 
      )}
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ShowCategories;
