import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SIZES } from '../../constants';

const SubCategoryList = ({ subOptions, handleSubCategory ,isSmall}) => {

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
      <Text style={styles.textStyle(isSmall)}>{item.label}</Text>
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
  btn: (selectedSubCategory, title) => ({
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: selectedSubCategory === title ? '#FFC700' : '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  }),
  textStyle: (isSmall) => ( {
    color: "#fff", 
    fontSize: isSmall? SIZES.xSmall : SIZES.medium,
    fontWeight: 'bold'
  })
});

export default SubCategoryList;
