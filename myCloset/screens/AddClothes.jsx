import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ActivityIndicator, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function AddClothes() {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
      const data = new FormData();
      data.append('file', {
        name: photo.uri.split('/').pop(),
        type: 'image/jpeg',
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
  
      // Log the form data parts for debugging
      data._parts.forEach(part => {
        //console.log(part);
      });
  
      try {
        console.log(data._parts);
        const response = await axios.post('https://mycloset.jce.ac/recognize-clothes-and-colors', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response)
        setResult(response.message);
        return response.message;
      } catch (error) {
        console.error('Upload error:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    }
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
          <View>
            <Text>Label: {result.label}</Text>
            <Text>Color Palette: {result.color_palette.join(', ')}</Text>
            <Image
              source={{ uri: `data:image/png;base64,${result.image_without_background}` }}
              style={styles.image}
            />
          </View>
        )}
      </View>
    </View>
  );
}

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
