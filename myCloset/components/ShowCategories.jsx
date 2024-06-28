import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Modal, Text, TouchableOpacity, ScrollView } from 'react-native';
import { categories } from '../assets/data/categories';
import CategoryCard from './Cards/CategoryCard';
import SubCategoryList from './SubCategoryList';
import { SIZES } from '../constants';
import axios from 'axios';
import { Image as CachedImage } from 'react-native-expo-image-cache';
import { Ionicons } from "@expo/vector-icons";
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

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
  
  const handleEditItem = () =>{

  }
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
      <View style={styles.modalContent}>
          <TouchableOpacity style={styles.editIconContainer} onPress={() => {handleEditItem}}>
              <Ionicons name="md-create" size={24} color="#333" />
            </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <CachedImage
            style={styles.modalImage}
            uri={selectedItem.imgUrl}
            resizeMode="contain"
          />
          <Text style={styles.modalTitle}>Item Details</Text>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.modalLabel}>Category:</Text>
            <Text style={styles.modalValue}>{selectedCategory}</Text>
          </View>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.modalLabel}>SubCategory:</Text>
            <Text style={styles.modalValue}>{selectedSubCategory}</Text>
          </View>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.modalLabel}>Fabric:</Text>
            <Text style={styles.modalValue}>{selectedItem.fabric}</Text>
          </View>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.modalLabel}>Seasons:</Text>
            <View style={styles.seasonsContainer}>
            <Text style={styles.seasonText}>
                {selectedItem.seasons
                  .map((season, index) => (season === 1 ? seasons[index] : null))
                  .filter(Boolean)
                  .join(', ')}
              </Text>
            </View>
          </View>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.modalLabel}>Colors:</Text>
            <View style={styles.colorsContainer}>
              {selectedItem.colors.map((color, index) => (
                <View key={index} style={[styles.colorBox, { backgroundColor: color }]} />
              ))}
            </View>
          </View>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.modalLabel}>Tags:</Text>
            <View style={styles.tagsContainer}>
              {selectedItem.tags.map((tag, index) => (
                <Text key={index} style={styles.tag}>
                  {tag}
                </Text>
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15, 
    overflow: 'hidden', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
  image: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  modalDetailContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  modalValue: {
    fontSize: 14,
    color: '#777',
  },
  seasonsContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    flexWrap: 'wrap',
  },
  seasonText: {
    fontSize: 14,
    marginRight: 10,
    color: '#888',
  },
  activeSeason: {
    color: '#333',
    fontWeight: 'bold',
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorBox: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 5,
    marginBottom: 5,
    fontSize: 14,
    color: '#777',
  },
  closeButton: {
    backgroundColor: '#FD3A69',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
