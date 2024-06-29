import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image as CachedImage } from 'react-native-expo-image-cache';

const ClothesGrid = ({ clothesData, selectedCategory, selectedSubCategory, handleImagePress, loading }) => {

  const selectedCategoryData = (clothesData.length !== 0 ) && clothesData.get(selectedCategory)[selectedSubCategory];

  return (
    <View>
      {loading ? (
        <Text>Loading ...</Text>
      ) : (
        selectedCategoryData && (
          <View style={styles.gridContainer}>
            {Object.values(selectedCategoryData).map((item, index) => (
              <TouchableOpacity key={index} style={styles.imageContainer} onPress={() => handleImagePress(item)}>
                <CachedImage style={styles.clothesImage} uri={item.imgUrl} resizeMode="contain" />
              </TouchableOpacity>
            ))}
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '30%',
    aspectRatio: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  clothesImage: {
    width: '100%',
    height: '100%',
  },
});

export default ClothesGrid;
