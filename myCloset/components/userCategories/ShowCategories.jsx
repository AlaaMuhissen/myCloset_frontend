import React, { useState, useEffect } from "react";
import { View, Alert ,StyleSheet } from 'react-native';
import axios from 'axios';
import { fabrics } from "../../assets/data/fabrics";
import { categories } from "../../assets/data/categories";
import CategoryList from './CategoryList'
import SubCategoryList from './SubCategoryList'
import ClothesGrid from "./ClothesGrid";
import ItemModal from "./ItemModel";
import EditClothingDetailsModal from "../AddClothes/ClothingDetailsModal";

const ShowCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tops');
  const [clothesData, setClothesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState("T-shirt");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [colorPalette, setColorPalette] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([0, 0, 0, 0]);
  const [allSeasonsChecked, setAllSeasonsChecked] = useState(true);
  const [selectedFabric, setSelectedFabric] = useState(fabrics[0].fabricName);
  const [selectedTags, setSelectedTags] = useState(['#Casual']);
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedItem) {
      setSelectedFabric(selectedItem.fabric);
      setSelectedSeasons(selectedItem.seasons);
      setSelectedTags(selectedItem.tags);
      setColorPalette(selectedItem.colors);
      console.log("categoryy", selectedCategory);
      console.log("subCategoryy", selectedSubCategory);
    }
  }, [selectedItem]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  };

  const handleCardPress = (category) => {
    setSelectedCategory(category);
    switch (category) {
      case "Tops":
        setSelectedSubCategory("T_shirt");
        break;
      case "Bottoms":
        setSelectedSubCategory("Jeans");
        break;
      case "Outwear":
        setSelectedSubCategory("Jacket");
        break;
      case "Shoes":
        setSelectedSubCategory("Casual_Shoes");
        break;
      case "Bags":
        setSelectedSubCategory("Shoulder_Bag");
        break;
      case "Head_wear":
        setSelectedSubCategory("Hat");
        break;
      case "Jewelry":
        setSelectedSubCategory("Necklace");
        break;
      case "Other_items":
        setSelectedSubCategory("others");
        break;
      default:
        setSelectedSubCategory("");
    }
  };

  const handleSubCategory = (subCategory) => {
  
    setSelectedSubCategory(subCategory);
  };

  const handleImagePress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleEditItem = () => {
    setEditingMode(true);
    setModalVisible(false); 
    setTimeout(() => setModalVisible(true), 0); 
  };

  const handleSave = async () => {
    if (!selectedSubCategory) {
      Alert.alert(
        'Warning',
        'Please select a subcategory before saving.',
        [{ text: 'OK' }]
      );
      setLoading(false);
      return;
    }
    if (selectedTags.length === 0) {
      Alert.alert(
        'Warning',
        'Please select a tag before saving.',
        [{ text: 'OK' }]
      );
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      console.log(selectedCategory);
      console.log(selectedSubCategory);
      const temp = {
        imgUrl: selectedItem.imgUrl,
        seasons: selectedSeasons,
        colors: colorPalette,
        fabric: selectedFabric,
        tags: selectedTags
      };
      console.log(temp);
      const response = await axios.put(`https://mycloset-backend-hnmd.onrender.com/api/closet/mohissen1234/${selectedCategory}/${selectedSubCategory}/${selectedItem._id}`, {
        seasons: selectedSeasons,
        colors: colorPalette,
        fabric: selectedFabric,
        tags: selectedTags
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN', 
        }
      });
      console.log(response.data);
      setModalVisible(false);
      Alert.alert(
        'Success',
        'Clothing item saved successfully!'
      );
      setEditingMode(false);
      fetchData(); 
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save clothing item');
    } finally {
      setLoading(false);
    }
  };
  const selectedCategoryData = categories.find((category) => category.label === selectedCategory);

  const handleCloseModal = () => {
    Alert.alert(
      "Discard Changes?",
      "Are you sure you want to close without saving?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => {
          setModalVisible(false);
          setEditingMode(false); // Exit editing mode
        }}
      ]
    );
  };
  const handleCloseItemModal = () => {
          setModalVisible(false);
          setEditingMode(false); 
  };

  const handleSeasonChange = (seasonIndex) => {
    setSelectedSeasons((prevSelectedSeasons) => {
      const updatedSeasons = [...prevSelectedSeasons];
      updatedSeasons[seasonIndex] = updatedSeasons[seasonIndex] === 1 ? 0 : 1;
      return updatedSeasons;
    });
  };

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAllSeasonsChange = () => {
    const newValue = allSeasonsChecked ? 1 : 0;
    setSelectedSeasons([newValue, newValue, newValue, newValue]);
    setAllSeasonsChecked(!allSeasonsChecked);
  };

  return (
    <>
      <CategoryList selectedCategory={selectedCategory} handleCardPress={handleCardPress} withIcon={true}/>
      <View>
        {selectedCategory && (
          <SubCategoryList subOptions={selectedCategoryData.subOptions} handleSubCategory={handleSubCategory} isSmall={false} />
        )}
      </View>
      <ClothesGrid
        loading={loading}
        clothesData={clothesData}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        handleImagePress={handleImagePress}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      {selectedItem && !editingMode && (
        <ItemModal
          visible={modalVisible}
          selectedItem={selectedItem}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          handleEditItem={handleEditItem}
          handleCloseModal={handleCloseItemModal}
        />
      )}
      {selectedItem && editingMode && (
        <EditClothingDetailsModal
          visible={modalVisible}
          result={selectedItem}
          editingMode={editingMode}
          colorPalette={colorPalette}
          setColorPalette={setColorPalette}
          selectedSeasons={selectedSeasons}
          handleSeasonChange={handleSeasonChange}
          onLabelChange={(itemValue) => setSelectedSubCategory(itemValue)}
          allSeasonsChecked={allSeasonsChecked}
          handleAllSeasonsChange={handleAllSeasonsChange}
          handleSave={handleSave}
          handleCloseModal={handleCloseModal}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          selectedFabric={selectedFabric}
          setSelectedFabric={setSelectedFabric}
          handleTagToggle={handleTagToggle}
          selectedTags={selectedTags}
        />
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
    aspectRatio: 1,
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
    marginRight: 20,
  },
  modalValue: {
    fontSize: 14,
    color: '#777',
  },
  seasonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    margin: 5,
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
  editIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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
