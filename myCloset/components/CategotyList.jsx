import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { categories } from '../assets/data/categories';
import CategoryCard from './Cards/CategoryCard';
import { SIZES } from '../constants';


const CategoryList = ({ selectedCategory, handleCardPress }) => {
  return (
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
        horizontal
        contentContainerStyle={{ paddingHorizontal: SIZES.medium }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default CategoryList;
