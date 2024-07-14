import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, SIZES ,FONT} from '../../constants';

const SubCategoryList = ({ subOptions, handleSubCategory ,isSmall}) => {

  const [selectedSubCategory, setSelectedSubCategory] = useState(subOptions[0].label);
  const formatLabel = (label) => {
  return label.replace(/_/g, ' ');
};
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
      <Text style={styles.textStyle(isSmall)}>{formatLabel(item.label)}</Text>
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
    borderColor: selectedSubCategory === title ? COLORS.tertiary : COLORS.gray2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  }),
  textStyle: (isSmall) => ({
    color: COLORS.primary,
    fontSize: isSmall ? SIZES.xSmall : 14,
    fontWeight: 'bold',
    fontFamily: FONT.bold,
  }),
});

export default SubCategoryList;
