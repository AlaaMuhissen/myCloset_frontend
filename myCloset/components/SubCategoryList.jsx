import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const SubCategoryList = ({ subOptions, handleSubCategory }) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState(subOptions[0].label);

  useEffect(() => {
    handleSubCategory(selectedSubCategory);
  }, [selectedSubCategory]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedSubCategory(item.label);
        handleSubCategory(item.label);
      }}
      style={styles.btn(selectedSubCategory, item.label)}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: 'bold' }}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={subOptions}
      renderItem={renderItem}
      keyExtractor={(item) => item.label}
      horizontal
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginLeft: 10,
  },
  btn: (selectedCategory, title) => ({
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: selectedCategory === title ? '#FFC700' : '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  })
});

export default SubCategoryList;
