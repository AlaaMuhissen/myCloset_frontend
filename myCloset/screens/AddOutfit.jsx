import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { DraxProvider } from 'react-native-drax';
import * as FileSystem from 'expo-file-system';
import ReceivingZone from '../components/Outfit/ReceivingZone';
import CategoryList from '../components/User_Categories/CategoryList';
import SubCategoryList from '../components/User_Categories/SubCategoryList';
import ClothesGrid from '../components/User_Categories/ClothesGrid.jsx';
import { categories } from '../assets/data/categories';
import { uploadImage } from '../config/cloudinary';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useAuthentication } from '../utils/hooks/useAuthentication.js';
const { height } = Dimensions.get('window');

const AddOutfit = () => {

  const navigation = useNavigation(); 
  const [received, setReceived] = useState([]);
  const [sizes, setSizes] = useState({});
  const [positions, setPositions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('Tops');
  const [clothesData, setClothesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [captureMode, setCaptureMode] = useState(false);
  const receivingZoneRef = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuthentication();
  const resetPosition = (id) => {
    setPositions(prevPositions => ({
      ...prevPositions,
      [id]: { x: 0, y: 0 }
    }));
  };

  const handleCardPress = (category) => {
    setSelectedCategory(category);
  };


  const handleSubCategory = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const handleImagePress = (item) => {
    addNewItem(item);
  };

  const fetchData = async () => {
    try {
      if(user){

        setLoading(true);
        const response = await axios.get(`https://mycloset-backend-hnmd.onrender.com/api/closet/${user.uid}`);
        setClothesData(new Map(Object.entries(response.data.categories)));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedCategory, user]);

  const selectedCategoryData = categories.find((category) => category.label === selectedCategory);

  const handleResize = (id, width, height) => {
    setSizes(prevSizes => ({
      ...prevSizes,
      [id]: { width, height }
    }));
  };

  const handleMove = (id, x, y) => {
    setPositions(prevPositions => ({
      ...prevPositions,
      [id]: { x, y }
    }));
  };

  const handleRemove = (id) => {
    setReceived(prevReceived => prevReceived.filter(item => item.id !== id));
    setSizes(prevSizes => {
      const { [id]: _, ...remainingSizes } = prevSizes;
      return remainingSizes;
    });
    setPositions(prevPositions => {
      const { [id]: _, ...remainingPositions } = prevPositions;
      return remainingPositions;
    });
  };

  const addNewItem = (item) => {
    const newItem = {
      id: `${item._id}`,
      ...item,
      category: selectedCategory,
      subCategory: selectedSubCategory,
    };
    setReceived([...received, newItem]);
  };
  const onRefresh = () => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  };
  const captureAndUpload = async () => {
    setCaptureMode(true); // Enable capture mode
    setLoading(true);
    setTimeout(async () => { // Allow some time for the UI to update
      try {
        const uri = await receivingZoneRef.current.capture();
        const uploadResponse = await uploadImage(uri);
        const imgUrl = uploadResponse.secure_url;
        const itemsId = received.map((item) => item._id);
        const colorPalette = Array.from(new Set(received.flatMap((item) => item.colors)));
        const itemsSource = received.reduce((acc, item) => {
          acc[item._id] = {
            category: item.category,
            subCategory: item.subCategory
          };
          return acc;
        }, {});
        
        const state = {
          itemsId,
          colorPalette,
          sizes,
          positions,
          itemsSource,
          imgUrl    
        };

        const response = await axios.post(
          `https://mycloset-backend-hnmd.onrender.com/api/outfit/${user.uid}/Summer`,
          state,
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(response.data)
        Alert.alert(
          'Success',
          'Your Outfit saved with image successfully!',
          [
            { text: 'Add Another Outfit', onPress: () => resetState() },
            { text: 'Show All Outfits', onPress: () => {
              
              resetState();navigation.navigate('ShowOutfits') }
            },
          ]
        );
      } catch (error) {
        console.error('Error capturing and uploading image:', error);
        Alert.alert('Error', 'Failed to capture and upload image');
      } finally {
        setLoading(false);
        setCaptureMode(false); // Disable capture mode
      }
    }, 100); // Delay to ensure the UI updates
  };
  const resetState = () => {
    setReceived([]);
    setSizes({});
    setPositions({});
  };
  return (
    <View style={styles.container}> 
      <Header name={"Make your magic!"} icon={'bookmark-sharp'} onIconPress={captureAndUpload} />
      <DraxProvider>
        <View>
          <View style={styles.receivingZoneContainer}>
            <ReceivingZone
              ref={receivingZoneRef}
              received={received}
              sizes={sizes}
              positions={positions}
              setPositions={setPositions}
              handleResize={handleResize}
              handleMove={handleMove}
              handleRemove={handleRemove}
              addNewItem={addNewItem}
              resetPosition={resetPosition}
              captureMode={captureMode}
            />
          </View>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            ) : (
          <View style={styles.scrollContainer}>
            <CategoryList selectedCategory={selectedCategory} handleCardPress={handleCardPress} withIcon={false} />
            {selectedCategoryData && (
              <SubCategoryList subOptions={selectedCategoryData.subOptions} handleSubCategory={handleSubCategory} isSmall={true} />
            )}
              <ScrollView style={styles.clothesGridContainer}>
                <ClothesGrid
                  clothesData={clothesData}
                  selectedCategory={selectedCategory}
                  selectedSubCategory={selectedSubCategory}
                  handleImagePress={handleImagePress}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  isSelectionMode= {false}
                />
              </ScrollView>
          </View>
            )}
        </View>
      </DraxProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: COLORS.background,
  },
  receivingZoneContainer: {
    // height: height * 0.4,
    // borderWidth: 10,
    // borderColor: "#fff"
  },
  scrollContainer: {
    // height: height * 0.4,
    width: "100%",
    // borderWidth: 2,
    // borderColor: "#fff",
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  clothesGridContainer: {
    height: height * 0.18, // Adjust this value as needed
  },
});

export default AddOutfit;
