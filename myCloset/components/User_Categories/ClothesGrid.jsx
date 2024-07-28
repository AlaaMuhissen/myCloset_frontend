import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, RefreshControl } from 'react-native';
import { Image as CachedImage } from 'react-native-expo-image-cache';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../../constants';

const ClothesGrid = ({ clothesData, selectedCategory, selectedSubCategory, handleImagePress, handleLongPress, loading, refreshing, onRefresh, selectedItems, isSelectionMode }) => {
  const selectedCategoryData = clothesData.size !== 0 && clothesData?.get(selectedCategory)[selectedSubCategory];
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View>
      {loading ? (
        <Text>Loading ...</Text>
      ) : (
        selectedCategoryData && (
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <View style={styles.gridContainer}>
              {Object.values(selectedCategoryData).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.imageContainer, selectedItems?.has(item._id) && styles.selectedImageContainer]}
                  onPress={() => isSelectionMode ? handleLongPress(item._id) : handleImagePress(item)}
                  onLongPress={() => isSelectionMode ? handleLongPress(item._id) : handleImagePress(item) }
                >
                  <CachedImage style={styles.clothesImage} uri={item.imgUrl} resizeMode="contain" />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
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
  selectedImageContainer: {
    borderColor: COLORS.tertiary,
    padding:8,
    borderWidth: 2,
    borderRadius :10
  },
});

export default ClothesGrid;
