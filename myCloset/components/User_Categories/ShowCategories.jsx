import React, { useState, useEffect } from "react";
import { View, Alert ,StyleSheet ,Button ,TouchableOpacity ,Image ,Text} from 'react-native';
import axios from 'axios';
import { fabrics } from "../../assets/data/fabrics";
import { categories } from "../../assets/data/categories";
import CategoryList from './CategoryList'
import SubCategoryList from './SubCategoryList'
import ClothesGrid from "./ClothesGrid.jsx";
import ClothePlaceHolder from '../../assets/default-image-clothe.jpg'
import EditClothingDetailsModal from "../AddClothes/ClothingDetailsModal";
import { Ionicons } from "@expo/vector-icons";
import ItemModal from "./ItemModel"
import OutfitModal from "./OutfitModel.jsx";
import { useNavigation } from "@react-navigation/native";


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
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [outfit, setOutfit] = useState([]);
  const [outfitsImg, setOutfitsImg] = useState([]);
  const [modalOutfitVisible, setModalOutfitVisible] = useState(false);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://mycloset-backend-hnmd.onrender.com/api/closet/mohissen1234');
      setClothesData(new Map(Object.entries(response.data.categories)));
      console.log("clothe data " , clothesData)
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
    }
  }, [selectedItem]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  };
  const toggleSelectItem = (itemId) => {
    setSelectedItems(prevSelectedItems => {
      const updatedSelectedItems = new Set(prevSelectedItems);
      if (updatedSelectedItems.has(itemId)) {
        updatedSelectedItems.delete(itemId);
      } else {
        updatedSelectedItems.add(itemId);
      }
      return updatedSelectedItems;
    });
  };
  
  
  const selectAllItems = () => {
    const allItemIds = Object.values(clothesData.get(selectedCategory)[selectedSubCategory]).map(item => item._id);
    setSelectedItems(new Set(allItemIds));
    setIsSelectedAll(false)
  };
  
  const deselectAllItems = () => {
    setSelectedItems(new Set());
    setIsSelectedAll(true)
  };

  const handleCardPress = (category) => {
    setSelectedCategory(category);
    setIsSelectionMode(false)
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
    setIsSelectionMode(false)
  };


  const handleImagePress = (item) => {
    if (isSelectionMode) {
      toggleSelectItem(item._id);
    } else {
      setSelectedItem(item);
      setModalVisible(true);
    }
  };
  
  const handleLongPress = (itemId) => {
    setIsSelectionMode(true);
    toggleSelectItem(itemId);
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
     
      const temp = {
        imgUrl: selectedItem.imgUrl,
        seasons: selectedSeasons,
        colors: colorPalette,
        fabric: selectedFabric,
        tags: selectedTags
      };
  
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
          setEditingMode(false); 
        }}
      ]
    );
  };
  const handleCloseItemModal = () => {
          setModalVisible(false);
          setEditingMode(false); 
  };
  const handleCloseOutfitModal = () => {
    setModalOutfitVisible(false);
    setLoading(false);
    setIsSelectionMode(false);
    setIsSelectedAll(false)
    setSelectedItems(new Set());
    
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

  const checkItemsInOutfit = async () => {
    try{
      setLoading(true);
      const data = {
        itemsId: Array.from(selectedItems)
      }
      const response = await axios.post(`https://mycloset-backend-hnmd.onrender.com/api/outfit/mohissen1234/getOutfitIdsContainingItems`, data);
    

        setOutfitsImg(response.data.outfitImg)
        setOutfit(response.data.outfitData)
        if(response.data.outfitImg.length === 0){
   
          handleConfirmDelete();
        }
        else{
       
          setModalOutfitVisible(true);
        }
     
    }catch(error){
      console.error('Error in deleting: ' , error)
      Alert.alert('Error', 'An error occurred while deleting outfits.');
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      if(outfit.length !== 0) { 
      
        // Loop through the outfit array to delete each outfit by season and outfitsId
          for (const outfitItem of outfit) {
            const { season, outfitsId } = outfitItem;
            const response = await axios.delete(`https://mycloset-backend-hnmd.onrender.com/api/outfit/mohissen1234/${season}`, {
              data: { itemsId: outfitsId }
            });
          }}

    
      const clotheDataForDelete = { 
        itemsId: Array.from(selectedItems)
      }
   
      // After deleting outfits, delete the clothing items
      const response = await axios.delete(`https://mycloset-backend-hnmd.onrender.com/api/closet/mohissen1234/${selectedCategory}/${selectedSubCategory}`, {
        data: { itemsId: Array.from(selectedItems) }
      });
  
      Alert.alert('Success', 'Selected items and outfits deleted successfully!');
      setIsSelectionMode(false);
      setIsSelectedAll(false);
      setSelectedItems(new Set());
      setOutfitsImg([]);
      setOutfit([])
      fetchData(); 
   
    } catch (error) {
      console.error('Error in deleting: ', error);
      Alert.alert('Error', 'An error occurred while deleting items and outfits.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedItems(new Set());
  };

  const handleEnableSelectionMode = () => {
    setIsSelectionMode(true);
  };
 

  return (
    <>
      <CategoryList selectedCategory={selectedCategory} handleCardPress={handleCardPress} withIcon={true}/>
      <View>
        {selectedCategory && (
          <SubCategoryList subOptions={selectedCategoryData.subOptions} handleSubCategory={handleSubCategory} isSmall={false} />
        )}
      </View>

      {clothesData.length !== 0 && Object.keys(clothesData.get(selectedCategory)[selectedSubCategory]).length !== 0 ? (
  <>
    {!isSelectionMode && <Button title="Select" onPress={handleEnableSelectionMode} />}
    {isSelectionMode && (
      <View style={styles.buttonContainer}>
        {isSelectedAll ? (
          <Button title="Select All" onPress={() => selectAllItems()} />
        ) : (
          <Button title="Deselect All" onPress={() => deselectAllItems()} />
        )}
        <TouchableOpacity onPress={checkItemsInOutfit}>
          <Ionicons name="trash-outline" color={'red'} size={24} style={styles.icon} />
        </TouchableOpacity>
        {isSelectedAll && <Button title="Cancel" onPress={handleCancelSelection} />}
      </View>
    )}
    <ClothesGrid
      loading={loading}
      clothesData={clothesData}
      selectedCategory={selectedCategory}
      selectedSubCategory={selectedSubCategory}
      handleImagePress={handleImagePress}
      handleLongPress={handleLongPress}
      refreshing={refreshing}
      onRefresh={onRefresh}
      selectedItems={selectedItems}
      isSelectionMode={isSelectionMode}
    />
  </>
) : (
  <View style={styles.emptyStateContainer}>
    <Image 
     source = {ClothePlaceHolder}
     style={styles.illustration} />
    <Text style={styles.emptyStateText}> Your wardrobe is empty. Add your first item to start building your collection!</Text>
    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddClothes')}>
      <Ionicons name="add" size={24} color="#fff" />
      <Text style={styles.addButtonText}>Add Clothes</Text>
    </TouchableOpacity>
  </View>
)}


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

    {modalOutfitVisible && (
            <OutfitModal
              visible={modalOutfitVisible}
              outfitImgArray={outfitsImg}
              handleCloseModal={handleCloseOutfitModal}
              handleConfirmDelete = {handleConfirmDelete}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
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
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#fff",
    borderRadius :10,
    padding: 20,
   
  },
  illustration: {
    width : 150,
    height :150,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: "#000",
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6f61',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ShowCategories;
