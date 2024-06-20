import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import { DraxProvider } from 'react-native-drax';
import * as FileSystem from 'expo-file-system';
import ReceivingZone from '../components/ReceivingZone';
import CategoryList from '../components/CategotyList';
import SubCategoryList from '../components/SubCategoryList';
import ClothesGrid from '../components/ClothesGrid';
import { categories } from '../assets/data/categories';
import { uploadImage } from '../config/cloudinary';
import { COLORS } from '../constants';
import Header from '../components/Header';
const { height } = Dimensions.get('window');

const AddOutfit = () => {
  const [received, setReceived] = useState([]);
  const [sizes, setSizes] = useState({});
  const [positions, setPositions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('Tops');
  const [clothesData, setClothesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [captureMode, setCaptureMode] = useState(false);
  const receivingZoneRef = useRef();

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

  const captureAndUpload = async () => {
    setCaptureMode(true); // Enable capture mode
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
          'https://mycloset-backend-hnmd.onrender.com/api/outfit/mohissen1234/Summer',
          state,
          { headers: { 'Content-Type': 'application/json' } }
        );

        Alert.alert('Success', 'State saved with image successfully!');
      } catch (error) {
        console.error('Error capturing and uploading image:', error);
        Alert.alert('Error', 'Failed to capture and upload image');
      } finally {
        setCaptureMode(false); // Disable capture mode
      }
    }, 100); // Delay to ensure the UI updates
  };

  return (
    <View style={styles.container}> 
    
        <Header name={"Make your magic!"} icon={'save'}/>
     
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={captureAndUpload}>
              <Text style={styles.saveButtonText}>Capture & Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <CategoryList selectedCategory={selectedCategory} handleCardPress={handleCardPress} withIcon= {false} />
          {selectedCategoryData && (
            <SubCategoryList subOptions={selectedCategoryData.subOptions} handleSubCategory={handleSubCategory} isSmall= {true}/>
          )}
          <ScrollView>
            <ClothesGrid
              clothesData={clothesData}
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              handleImagePress={handleImagePress}
              loading={loading}
            />
          </ScrollView>
        </View>
      </View>
    </DraxProvider>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal : 10,
    backgroundColor: COLORS.background
  },
  receivingZoneContainer: {
    // height: height * 0.4,
    // borderWidth: 10,
    // borderColor: "#fff"
  },
  scrollContainer: {
    // height: height * 0.4,
    width: "100%",
    // borderWidth:2,
    // borderColor: "#fff",

    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadButton: {
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
  },
  loadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  captureButton: {
    padding: 10,
    backgroundColor: '#ffc107',
    borderRadius: 5,
    alignItems: 'center',
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddOutfit;