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
const { height } = Dimensions.get('window');

const AddOutfit = () => {
  const [received, setReceived] = useState([]);
  const [sizes, setSizes] = useState({});
  const [positions, setPositions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('Tops');
  const [clothesData, setClothesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

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
        setClothesData(response.data);
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
    };
    setReceived([...received, newItem]);
  };

  const saveState = async () => {
    try {
      const itemsId = received.map(item => item._id);
      const colorPalette = Array.from(new Set(received.flatMap(item => item.colors)));
      const state = {
        itemsId,
        colorPalette,
        sizes,
        positions,
      };
      const stateJson = JSON.stringify(state);

      const response = await axios.post('https://mycloset-backend-hnmd.onrender.com/api/outfit/mohissen1234/Summer', stateJson, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response);
      Alert.alert('Success', 'State saved successfully!');
    } catch (error) {
      console.error('Error saving state:', error);
      Alert.alert('Error', 'Failed to save state');
    }
  };

  const loadState = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'receivedZoneState.json';
      const stateJson = await FileSystem.readAsStringAsync(fileUri);
      const state = JSON.parse(stateJson);
      setReceived(state.received);
      setSizes(state.sizes);
      setPositions(state.positions);
      Alert.alert('Success', 'State loaded successfully!');
      console.log(state);
    } catch (error) {
      console.error('Error loading state:', error);
      Alert.alert('Error', 'Failed to load state');
    }
  };

  return (
    <DraxProvider>
      <View style={styles.container}>
        <View style={styles.receivingZoneContainer}>
          <ReceivingZone
            ref={receivingZoneRef}
            received={received}
            sizes={sizes}
            positions={positions}
            handleResize={handleResize}
            handleMove={handleMove}
            handleRemove={handleRemove}
            addNewItem={addNewItem}
            resetPosition={resetPosition}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={saveState}>
              <Text style={styles.saveButtonText}>Save State</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loadButton} onPress={loadState}>
              <Text style={styles.loadButtonText}>Load State</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <CategoryList selectedCategory={selectedCategory} handleCardPress={handleCardPress} />
          {selectedCategoryData && (
            <SubCategoryList subOptions={selectedCategoryData.subOptions} handleSubCategory={handleSubCategory} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  receivingZoneContainer: {
    height: height * 0.5,
  },
  scrollContainer: {
    height: height * 0.5,
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
});

export default AddOutfit;