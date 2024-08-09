import React, { useState } from 'react';
import { View, StyleSheet, Button, ActivityIndicator, Image, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { categories } from '../assets/data/categories';
import EditClothingDetailsModal from '../components/AddClothes/ClothingDetailsModal';
import { uploadImage } from '../config/cloudinary';
import Header from '../components/Header';
import { COLORS, FONT } from '../constants';
import * as ImageManipulator from 'expo-image-manipulator';
import { fabrics } from '../assets/data/fabrics';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import clotheHolder from '../assets/default-image-clothe.jpg'
import { Ionicons } from '@expo/vector-icons';
import { useAuthentication } from '../utils/hooks/useAuthentication';
const popularTags = ['#Casual', '#Formal', '#Business', '#Party', '#Sports', '#Wedding', '#Vacation', '#Beach', '#Date_Night', '#Festive'];
const AddClothes = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [colorPalette, setColorPalette] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([0, 0, 0, 0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].label);
  const [selectedSubCategory, setSelectedSubCategory] = useState(categories[0].subOptions[0].label);
  const [allSeasonsChecked, setAllSeasonsChecked] = useState(true);
  const [selectedFabric, setSelectedFabric] = useState(fabrics[0].fabricName);
  const [selectedTags, setSelectedTags] = useState([popularTags[0]]);
  const { user } = useAuthentication();
  console.log(user)


  const requestPermission = async (permissionFunc) => {
  try {
    const permissionResult = await permissionFunc();
    if (permissionResult.status !== 'granted') {
      alert("You've refused to allow this app to access your photos or camera!");
      return false;
    }
    return true;
  } catch (error) {
    console.error('Permission error:', error);
    alert('Failed to get permission');
    return false;
  }
};

const adjustImageQuality = async (uri) => {
  try {
    const adjustedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1080 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    return adjustedImage.uri;
  } catch (err) {
    // console.error('Justed Img error:', err);
    alert('Failed to upload and process photo');
    return null;
  }
};

const handleChoosePhoto = async () => {
  const hasPermission = await requestPermission(ImagePicker.requestMediaLibraryPermissionsAsync);
  if (!hasPermission) return;

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled && result.assets) {
      const adjustedUri = await adjustImageQuality(result.assets[0].uri);
      if (adjustedUri) {
        setPhoto({ ...result.assets[0], uri: adjustedUri });
        handleUploadPhoto({ ...result.assets[0], uri: adjustedUri });
      }
    }
  } catch (error) {
    // console.error('Image picker error:', error);
    alert('Failed to pick an image');
  }
};

const handleOpenCamera = async () => {
  const hasPermission = await requestPermission(ImagePicker.requestCameraPermissionsAsync);
  if (!hasPermission) return;

  try {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled && result.assets) {
      const adjustedUri = await adjustImageQuality(result.assets[0].uri);
      if (adjustedUri) {
        setPhoto({ ...result.assets[0], uri: adjustedUri });
        handleUploadPhoto({ ...result.assets[0], uri: adjustedUri });
      }
    }
  } catch (error) {
    console.error('Camera error:', error);
    alert('Failed to take a photo');
  }
};

const handleUploadPhoto = async (photo) => {
  if (photo) {
    setLoading(true);
    setUploadProgress(0);
    try {
      const cloudinaryResponse = await uploadImage(photo.uri);
      const cloudinaryUrl = cloudinaryResponse.secure_url;
      console.log("Now we have link === ," , cloudinaryUrl);
    
      const apiResponse = await axios.post('https://mycloset.jce.ac/recognize-clothes-and-colors/', {
        image_url: cloudinaryUrl,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Replace with your actual auth token
        }
      });     
      console.log(apiResponse.data);  
      setResult(apiResponse.data);
      setSelectedSubCategory(apiResponse.data.label);
      setColorPalette(apiResponse.data.color_palette);
      setModalVisible(true);
    } catch (error) {
      // console.error('Upload error:', error);
      alert('Failed to upload and process photo');
    } finally {
      setLoading(false);
    }
  }
};
  
  const handleSave = async () => {
    if(!selectedSubCategory){
      Alert.alert(
        'Warning',
        'Please select a subcategory before saving.',
        [{ text: 'OK' }]
      );
      setLoading(false);
      return;
    }
    if(selectedTags.length === 0){
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
        imgUrl: result.image_without_background_url,
        seasons: selectedSeasons,
        colors: colorPalette,
        fabric: selectedFabric,
        tags : selectedTags
      }
      // console.log('========== uid: "user.uid)
      const response = await axios.post(`https://mycloset-backend-hnmd.onrender.com/api/closet/${user.uid}/${selectedCategory}/${selectedSubCategory}`, {
        imgUrl: result.image_without_background_url,
        seasons: selectedSeasons,
        colors: colorPalette,
        fabric: selectedFabric,
        tags : selectedTags
      },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_AUTH_TOKEN', // ===Replace with MY actual auth token
          }
        });
      console.log(response.data);
      setModalVisible(false);
      Alert.alert(
        'Success',
        'Clothing item saved successfully!',
        [
          { text: 'Add Another Clothing item', onPress: () => handleCancel() },
          { text: 'Show Your Wardrobe', onPress: () => {
            
            handleCancel();navigation.navigate('userCategory') }
          },
        ]
      );
     
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save clothing item');
    } finally {
      setLoading(false);
    }
  };


  const handleSeasonChange = (seasonIndex) => {
    setSelectedSeasons((prevSelectedSeasons) => {
      const updatedSeasons = [...prevSelectedSeasons];
      updatedSeasons[seasonIndex] = updatedSeasons[seasonIndex] === 0 ? 1 : 0;
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
    const newValue = allSeasonsChecked ? 0 : 1;
    setSelectedSeasons([newValue, newValue, newValue, newValue]);
    setAllSeasonsChecked(!allSeasonsChecked);
  };
  

  const handleCloseModal = () => {
    Alert.alert(
      "Discard Changes?",
      "Are you sure you want to close without saving?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => {
          setModalVisible(false)
          setPhoto(null)} }
      ]
    );
  };


  const handleCancel = () => {
    setPhoto(null);
    setResult(null);
  };
  
  return (
    <View style={styles.screen}>
      <Header name={"Add Your Item!"} icon={''} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleChoosePhoto} title="Select an image" style = {styles.btn} >
          <View style={styles.inBtn}>
             <Ionicons name="image-sharp" color={COLORS.white} size={25} />
             <Text style = {styles.btnText}> Select an image</Text>
          </View>
          </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenCamera} title="Open camera" style = {styles.btn} >
        <View style={styles.inBtn}>
        <Ionicons name="camera-sharp" color={COLORS.white} size={25} />
        <Text style = {styles.btnText}> Open camera</Text>
        </View>
        </TouchableOpacity>
      </View>
  
      <View style={styles.imageContainer}>
        {photo ? (
          <>
            <Image source={{ uri: photo.uri }} style={styles.image} />
            <Button title="Cancel" onPress={handleCancel} color={'red'} />
          </>
        ) : (
          <View style={styles.imageHolderContainer}>

          <Image source={clotheHolder} style={styles.image} />
          </View>
        )}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={'pink'} />
            <Text style={styles.loadingText}>{`Uploading: ${uploadProgress}%`}</Text>
          </View>
        )}
        {result && (
          <EditClothingDetailsModal
            visible={modalVisible}
            result={result}
            editingMode= {false}
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
            selectedFabric = {selectedFabric}
            setSelectedFabric = {setSelectedFabric}
            handleTagToggle= {handleTagToggle}
            selectedTags = {selectedTags}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    gap: 20,
    marginVertical: 20,
  },
  inBtn :{
    flexDirection : 'row',
    justifyContent :'center',
    alignItems: 'center',
    gap:10
  },
  btn : {
    backgroundColor : COLORS.primary,
    padding : 20,
    borderRadius :10,
    color: COLORS.white
  },
  btnText: { 
     color : COLORS.background ,
     fontFamily : FONT.regular
  },
  imageHolderContainer:{
    borderWidth : 1,
    borderRadius :10 ,
    borderColor : COLORS.lightWhite
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft :20,
    marginVertical: 20,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#f0f0',
  },
});

export default AddClothes;
