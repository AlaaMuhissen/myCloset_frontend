import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Modal, Text, TouchableOpacity, ScrollView } from 'react-native';
import { categories } from '../assets/data/categories';
import CategoryCard from './Cards/CategoryCard';
import SubCategoryList from './SubCategoryList';
import { SIZES } from '../constants';
import axios from 'axios';
import { Image as CachedImage } from 'react-native-expo-image-cache';

const ShowCategories = () => {
  
  const [selectedCategory, setSelectedCategory] = useState('Tops');
  const [clothesData, setClothesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardPress = (category) => {
    setSelectedCategory(category);
    if(category === "Tops") {setSelectedSubCategory("T_shirt");}
    if(category === "Bottoms") {setSelectedSubCategory("Jeans");}
    if(category === "Outwear") {setSelectedSubCategory("Jacket");}
    if(category === "Shoes") {setSelectedSubCategory("Casual_Shoes");}
    if(category === "Bags") {setSelectedSubCategory("Shoulder_Bag");}
    if(category === "Head_wear") {setSelectedSubCategory("Hat");}
    if(category === "Jewelry") {setSelectedSubCategory("Necklace");}
    if(category === "Other_items") {setSelectedSubCategory("others");}
  };

  const handleSubCategory = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const handleImagePress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://mycloset-backend-hnmd.onrender.com/api/closet/mohissen1234'); 
        setClothesData(new Map(Object.entries(response.data.categories)));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  const selectedCategoryData = categories.find((category) => category.label === selectedCategory);

  const renderSeasons = (seasons) => {
    const seasonNames = {
      spring: 'Spring',
      summer: 'Summer',
      fall: 'Fall',
      winter: 'Winter',
    };

    return (
      <View style={styles.seasonsContainer}>
        {Object.keys(seasons)?.map((season) => (
          seasons[season] === 1 && (
            <Text key={season} style={[styles.seasonText, styles.activeSeason]}>
              {seasonNames[season]}
            </Text>
          )
        ))}
      </View>
    );
  };

  const renderColors = (colors) => {
    return (
      <View style={styles.colorsContainer}>
        {colors?.map((color, index) => (
          <View key={index} style={[styles.colorBox, { backgroundColor: color }]} />
        ))}
      </View>
    );
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
              withIcon= {true}
            />
          )}
          keyExtractor={(item) => item.label}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal
        />
      </View>
      <View>
        {selectedCategoryData && (
          <SubCategoryList subOptions={selectedCategoryData.subOptions} handleSubCategory={handleSubCategory} isSmall= {false} /> 
        )}
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          selectedCategoryData && clothesData.length !== 0 && selectedSubCategory && (
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.gridContainer}>
              {(clothesData.length!== 0) && Object.values(clothesData.get(selectedCategory)[selectedSubCategory])?.map((item, index) => (
                <TouchableOpacity key={index} style={styles.imageContainer} onPress={() => handleImagePress(item)}>
                  <CachedImage
                    style={styles.image}
                    uri={item.imgUrl}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          
          )
        )}
      </View>
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>
              <CachedImage
                style={styles.modalImage}
                uri={selectedItem.imgUrl}
                resizeMode="contain"
              />
              <Text style={styles.modalText}>Category: {selectedCategory}</Text>
              <Text style={styles.modalText}>SubCategory: {selectedSubCategory}</Text>
            
              <Text style={styles.modalText}>Seasons:</Text>
              {renderSeasons(selectedItem.seasons)}
              <Text style={styles.modalText}>Colors:</Text>
              {renderColors(selectedItem.colors)}
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
 
    width: '30%',

    aspectRatio: 1, // This maintains the aspect ratio
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, // Set the width of the border
    borderColor: '#fff', // Set the color of the border
  },
  image: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalImage: {
    width: '100%',
    height: 300,
  },
  modalText: {
    fontSize: 18,
    marginVertical: 10,
  },
  seasonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  seasonText: {
    fontSize: 16,
    marginRight: 10,
    color: 'gray',
  },
  activeSeason: {
    color: 'black',
    fontWeight: 'bold',
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

});

export default ShowCategories;
