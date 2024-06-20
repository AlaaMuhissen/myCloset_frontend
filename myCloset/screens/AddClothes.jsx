import React, { useState } from 'react';
import { View, StyleSheet, Button, ActivityIndicator, Image, Modal, ScrollView ,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { categories } from '../assets/data/categories'; 
import ColorPickerModal from '../components/AddClothes/ColorPickerModal';
import EditClothingDetailsModal from '../components/AddClothes/ClothingDetailsModal';


const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

const AddClothes = () => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [label, setLabel] = useState('');
  const [colorPalette, setColorPalette] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState({});
  const [selectedLabel, setSelectedLabel] = useState(categories[0].subOptions[0].label);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].label);
  const [selectedSubCategory, setSelectedSubCategory] = useState(categories[0].subOptions[0].label);
  const [allSeasonsChecked, setAllSeasonsChecked] = useState(false);
  

  const requestPermission = async (permissionFunc) => {
    const permissionResult = await permissionFunc();
    if (permissionResult.status !== 'granted') {
      alert("You've refused to allow this app to access your photos or camera!");
      return false;
    }
    return true;
  };

  const handleChoosePhoto = async () => {
    const hasPermission = await requestPermission(ImagePicker.requestMediaLibraryPermissionsAsync);
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.assets[0]);
    }
  };

  const handleOpenCamera = async () => {
    const hasPermission = await requestPermission(ImagePicker.requestCameraPermissionsAsync);
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.assets[0]);
    }
  };

  const handleUploadPhoto = async () => {
    if (photo) {
      setLoading(true);
      try {
        const cloudinaryUrl = "https://res.cloudinary.com/depgto6ws/image/upload/v1718708768/ppbyspzdmeecgrq8k18l.jpg";
        console.log("url is == ", cloudinaryUrl);

        const apiResponse = {
          "color_palette": ["#2c2d32", "#e2ddd2", "#9b9c93", "#97919d", "#a48c84"],
          "image_without_background_url": "https://res.cloudinary.com/depgto6ws/image/upload/v1718806821/60b13905-a294-4983-9822-26f647bd958e.png",
          "label": "T_Shirts"
        };
        setResult(apiResponse);
        setSelectedSubCategory(apiResponse.label)
        setColorPalette(apiResponse.color_palette);
        setModalVisible(true);
      } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload and process photo');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      console.log(selectedCategory)
      console.log(selectedSubCategory)
      const temp = {  imgUrl: result.image_without_background_url,
      seasons: Object.keys(selectedSeasons).filter(season => selectedSeasons[season]).map(season => seasons.indexOf(season)),
      colors: colorPalette,
      fabric: 'cotton'}
      console.log(temp)
      const response = await axios.post(`https://mycloset-backend-hnmd.onrender.com/api/closet/mohissen1234/${selectedCategory}/${selectedSubCategory}`, {
        imgUrl: result.image_without_background_url,
        seasons: Object.keys(selectedSeasons).filter(season => selectedSeasons[season]).map(season => seasons.indexOf(season)),
        colors: colorPalette,
        fabric: 'cotton' 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN', // ===Replace with MY actual auth token
        }
      });
      console.log(response.data);
      setModalVisible(false);
      alert('Clothing item saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save clothing item');
    } finally {
      setLoading(false);
    }
  };


  const handleSeasonChange = (season) => {
    setSelectedSeasons({
      ...selectedSeasons,
      [season]: !selectedSeasons[season],
    });
  };

  const handleAllSeasonsChange = () => {
    const newSelectedSeasons = {};
    seasons.forEach(season => {
      newSelectedSeasons[season] = !allSeasonsChecked;
    });
    setSelectedSeasons(newSelectedSeasons);
    setAllSeasonsChecked(!allSeasonsChecked);
  };

  const handleCloseModal = () => {
    Alert.alert(
      "Discard Changes?",
      "Are you sure you want to close without saving?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => setModalVisible(false) }
      ]
    );
  };

 
  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button onPress={handleChoosePhoto} title="Select an image" />
        <Button onPress={handleOpenCamera} title="Open camera" />
      </View>

      <View style={styles.imageContainer}>
        {photo && (
          <>
            <Image source={{ uri: photo.uri }} style={styles.image} />
            <Button title="Upload Photo" onPress={handleUploadPhoto} />
          </>
        )}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {result && (
          <EditClothingDetailsModal
            visible={modalVisible}
            result={result}
            selectedLabel={selectedLabel}
            setSelectedLabel={setSelectedLabel}
            colorPalette={colorPalette}
            setColorPalette= {setColorPalette}
            selectedSeasons={selectedSeasons}
            handleSeasonChange={handleSeasonChange}
            onLabelChange={(itemValue) => setSelectedLabel(itemValue)}
            allSeasonsChecked={allSeasonsChecked}
            handleAllSeasonsChange={handleAllSeasonsChange}
            handleSave={handleSave}
            handleCloseModal={handleCloseModal}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        )}
    
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover',
  },
});

export default AddClothes;
