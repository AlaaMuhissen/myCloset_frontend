import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { categories } from '../../assets/data/categories';
import CategoryCard from '../Cards/CategoryCard';
import { SIZES } from '../../constants';


const CategoryList = ({ selectedCategory, handleCardPress ,withIcon }) => {
  return (
    <View style={styles.container}>
      {withIcon ? <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryCard
            icon={item.icons}
            title={item.label}
            selectedCategory={selectedCategory}
            handleCardPress={handleCardPress}
            withIcon = {true}
          />
        )}
        keyExtractor={(item) => item.label}
        horizontal
        contentContainerStyle={{ paddingHorizontal: SIZES.medium }}
      /> : <FlatList
      data={categories}
      renderItem={({ item }) => (
        <CategoryCard
          icon={item.icons}
          title={item.label}
          selectedCategory={selectedCategory}
          handleCardPress={handleCardPress}
          withIcon = {false}
        />
      )}
      keyExtractor={(item) => item.label}
      horizontal
      contentContainerStyle={{ paddingHorizontal: SIZES.medium }}
    />
      
      
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
    // borderWidth:2,
    // borderColor: "#fff"
  },
});

export default CategoryList;
