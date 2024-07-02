import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { COLORS } from '../../constants';
import PreviewModal from '../PreviewModal';

const OutfitDetails = ({ route }) => {
  const { item } = route.params;
  const [clotheItems, setClotheItems] = useState([]);
  const [inPreviewMode, setInPreviewMode] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsDetails = await Promise.all(item.itemsId.map(async (itemId) => {
          const category = item.itemsSource[itemId].category;
          const subCategory = item.itemsSource[itemId].subCategory;
          const response = await axios.get(`https://mycloset-backend-hnmd.onrender.com/api/closet/mohissen1234/${category}/${subCategory}/${itemId}`);
          return response.data;
        }));
        console.log(itemsDetails);
        setClotheItems(itemsDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [item.itemsId]);

  const handlePreview = (clotheItem) => {
    setPreviewItem(clotheItem);
    setInPreviewMode(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
        resizeMode='contain'
      />
      <FlatList
        data={clotheItems}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePreview(item)}>
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.imgUrl }}
                style={styles.itemImage}
                resizeMode='contain'
              />
            </View>
          </TouchableOpacity>
        )}
      />
      {inPreviewMode && previewItem && (
        <PreviewModal
          visible={inPreviewMode}
          imgURL={previewItem.imgUrl}
          content={null}
          onClose={() => setInPreviewMode(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    height: 300,
    width: '100%',
  },
  itemContainer: {
    marginVertical: 10,
    alignItems: 'center',
    marginRight: 20,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  itemImage: {
    height: 100,
    width: 100,
  },
});

export default OutfitDetails;
