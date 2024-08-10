import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import { DraxProvider } from 'react-native-drax';
import MovableAndResizableSquare from '../../../components/Outfit/MovableAndResizableSquare.jsx';
import { uploadImage } from '../../../config/cloudinary.js';
import ClothesGrid from '../../../components/User_Categories/ClothesGrid.jsx';
import CategoryList from '../../../components/User_Categories/CategoryList.jsx';
import SubCategoryList from '../../../components/User_Categories/SubCategoryList.jsx';
import { Ionicons } from '@expo/vector-icons';
import { categories } from '../../../assets/data/categories.js';
import { COLORS } from '../../../constants/index.js';
import Header from '../../../components/Header.jsx';
import { useAuthentication } from '../../../utils/hooks/useAuthentication.js';
import { useUser } from '@clerk/clerk-expo';

const { height } = Dimensions.get('window');

const EditOutfit = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { season, outfit } = route.params;
    // console.log(season , outfit)
    
    const [selectedCategory, setSelectedCategory] = useState('Tops');
    const [clothesData, setClothesData] = useState(new Map());
    const [loading, setLoading] = useState(true);
    const [selectedSubCategory, setSelectedSubCategory] = useState('T_shirt');
    const [itemsId, setItemsId] = useState([]);
    const [outfitItem, setOutfitItem] = useState([]);
    const [colorPalette, setColorPalette] = useState([]);
    const [sizes, setSizes] = useState(new Map());
    const [positions, setPositions] = useState(new Map());
    const [imgUrl, setImgUrl] = useState('');
    const [itemsSource, setItemsSource] = useState(new Map());
    const [captureMode, setCaptureMode] = useState(false);
    const viewShotRef = useRef(null);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useUser();
    useEffect(() => {
      if (outfit) {
        setItemsId(outfit.itemsId);
        setColorPalette(outfit.colorPalette);
        setSizes(new Map(Object.entries(outfit.sizes)));
        setPositions(new Map(Object.entries(outfit.positions)));
        setImgUrl(outfit.imgUrl);
        setItemsSource(new Map(Object.entries(outfit.itemsSource)));
        setLoading(false);
      }
    }, [outfit]);
  
    const fetchData = async () => {
      try {
        if(user){
        setLoading(true);
        const response = await axios.get(`https://mycloset-backend-hnmd.onrender.com/api/closet/userUID`);
        setClothesData(new Map(Object.entries(response.data.categories)));
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };


    // useEffect(() => {
    //   fetchData();
    // }, []);
    useEffect(() => {
      fetchData();
    }, [user]);
  
    useEffect(() => {
      const newOutfitItems = itemsId?.map((itemId) => {
        const itemSource = itemsSource.get(itemId);
        if (itemSource) {
          const { category, subCategory } = itemSource;
          if (clothesData.get(category) && clothesData.get(category)[subCategory]) {
            return clothesData.get(category)[subCategory][itemId];
          }
        }
        return null;
      }).filter(item => item !== null); // Filter out any null values
  
      setOutfitItem(newOutfitItems);
    }, [clothesData, itemsId, itemsSource]);
  
    const handleCardPress = (category) => {
      setSelectedCategory(category);
    };
  
    const handleSubCategory = (subCategory) => {
      setSelectedSubCategory(subCategory);
    };
    const onRefresh = () => {
      setRefreshing(true);
      fetchData().finally(() => setRefreshing(false));
    };
    const addNewItem = (item) => {
            // Check if the item ID already exists in outfitItem
        if (outfitItem.some(existingItem => existingItem._id === item._id)) {
            alert('Item already exists in the outfit');
            return;
        }

      const newItem = {
        id: `${item._id}`,
        ...item,
        category: selectedCategory,
        subCategory: selectedSubCategory,
      };
      setOutfitItem([...outfitItem, newItem]);
    };
  
    const handleImagePress = (item) => {
      addNewItem(item);
    };
    const handleMove = (id, x, y) => {
        setPositions(prevPositions => {
            const newPositions = new Map(prevPositions);
            newPositions.set(id, { x, y });
            console.log('Updated Positions:', newPositions);
            return newPositions;
        });
    };
    const handleSave = async (saveAsNew = false) => {
      try {
        setCaptureMode(true);
        const uri = await viewShotRef.current.capture();
        setCaptureMode(false);
  
        const uploadResponse = await uploadImage(uri);
        const imgUrl = uploadResponse.secure_url;
  
        // Update itemsId according to outfitItem
        const updatedItemsId = outfitItem.map(item => item._id);
  
        // Update colorPalette based on the current outfitItem colors
        const updatedColorPalette = Array.from(new Set(outfitItem.flatMap(item => item.colors)));
  
        // Create new maps for sizes and positions that only include items in outfitItem
        const updatedSizes = new Map();
        const updatedPositions = new Map();
        const updatedItemsSource = new Map();
  
        outfitItem.forEach(item => {
          if (sizes.has(item._id)) {
            updatedSizes.set(item._id, sizes.get(item._id));
          }
          if (positions.has(item._id)) {
            updatedPositions.set(item._id, positions.get(item._id));
          }
          if (item.category && item.subCategory) {
            updatedItemsSource.set(item._id, {
              category: item.category,
              subCategory: item.subCategory,
            });
          }
        });
       
        // Integrate updatedItemsSource into the original itemsSource and delete removed IDs
        const finalItemsSource = new Map(itemsSource);
        updatedItemsId.forEach(id => {
          if (updatedItemsSource.has(id)) {
            finalItemsSource.set(id, updatedItemsSource.get(id));
          }
        });
        itemsSource.forEach((value, key) => {
          if (!updatedItemsId.includes(key)) {
            finalItemsSource.delete(key);
          }
        });
  
        const updatedOutfit = {
          itemsId: updatedItemsId,
          colorPalette: updatedColorPalette,
          sizes: Object.fromEntries(updatedSizes),
          positions: Object.fromEntries(updatedPositions),
          itemsSource: Object.fromEntries(finalItemsSource),
          imgUrl,
        };
        console.log(updatedOutfit)
        if (saveAsNew) {
          await axios.post(`https://mycloset-backend-hnmd.onrender.com/api/outfit/userUID/${season}`, updatedOutfit, {
            headers: { 'Content-Type': 'application/json' }
          });
          Alert.alert('Success', 'New outfit created successfully!');
        } else {
          await axios.put(`https://mycloset-backend-hnmd.onrender.com/api/outfit/userUID/${season}/${outfit._id}`, updatedOutfit, {
            headers: { 'Content-Type': 'application/json' }
          });
          Alert.alert('Success', 'Outfit updated successfully!');
        }
  
        navigation.navigate('ShowOutfits');
      } catch (error) {
        console.error('Error saving outfit:', error);
        Alert.alert('Error', 'Failed to save outfit');
      }
    };
  
    const selectedCategoryData = categories.find((category) => category.label === selectedCategory);
  
    const removeItem = (id) => {
      setOutfitItem(prevItems => prevItems.filter(item => item._id !== id));
    };
  
    useEffect(() => {
    //   console.log('Updated outfit items:', outfitItem);
    }, [outfitItem]);
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
    const saveAlert = () => {
        Alert.alert(
          'Save Outfit',
          'Do you want to save this as a new outfit?',
          [
            { text: 'Save as New', onPress: () => handleSave(true) },
            { text: 'Save Changes', onPress: () => handleSave(false) },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
      };
      
    return (
        <View style={styles.container}>
            <Header name={"Edit Outfit!"} icon={'save'} onIconPress={saveAlert} />
        <DraxProvider>
          <View style={{ position: 'relative'}}>
            <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.8 }}>
              <View style={[!captureMode && styles.receivingZone]}>
                {outfitItem.length !== 0 && outfitItem?.map((item, index) => (
                  <MovableAndResizableSquare
                    key={index}
                    item={item}
                    size={sizes.get(item._id) || { width: 100, height: 100 }}
                    position={positions.get(item._id) || { x: 50, y: 50 }}
                    onResize={(id,width, height) => {
                      setSizes(prevSizes => new Map(prevSizes).set(item._id, { width, height }));
                    }}
                    onMove={(id, x, y) => {
                      setPositions(prevPositions => new Map(prevPositions).set(item._id, { x, y }));
                    }}
                    onRemove={(_id) => removeItem(item._id)}
                    captureMode={captureMode}
                  />
                ))}
              </View>
            </ViewShot>
          </View>
        </DraxProvider>
       
        <View >
          <CategoryList selectedCategory={selectedCategory} handleCardPress={handleCardPress} />
          {selectedCategoryData && (
            <SubCategoryList subOptions={selectedCategoryData.subOptions} handleSubCategory={handleSubCategory} />
          )}
          <ScrollView style={styles.clothesGridContainer}>
            {clothesData.size !== 0 && <ClothesGrid
              clothesData={clothesData}
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              handleImagePress={handleImagePress}
              loading={loading}
              refreshing={refreshing}
              onRefresh={onRefresh}
              isSelectionMode= {false}
            />}
          </ScrollView>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        paddingHorizontal: 10,
        backgroundColor: COLORS.background,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
      },
    receivingZone: {
      height: 400,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  clothesGridContainer: {
    height: height * 0.18, 
  },
});

export default EditOutfit;
