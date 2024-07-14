import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, Image, ScrollView, ActivityIndicator } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { getAuth, updateProfile } from 'firebase/auth';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';
import * as ImagePicker from 'expo-image-picker';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { uploadImage } from '../config/cloudinary';

const EditProfileScreen = () => {
  const { user } = useAuthentication();
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhoneNumber(user.phoneNumber || '');
      setPhotoURL(user.photoURL || '');
      setImage(user.photoURL ? { uri: user.photoURL } : null);
      setLoading(false);
    }
  }, [user]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName,
        phoneNumber,
        photoURL,
      });
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

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
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.cancelled && result.assets) {
      setImage({ uri: result.assets[0].uri });
      handleUploadPhoto(result.assets[0].uri); // Assuming handleUploadPhoto expects a URI
    }
  };
  
  const handleOpenCamera = async () => {
    const hasPermission = await requestPermission(ImagePicker.requestCameraPermissionsAsync);
    if (!hasPermission) return;
  
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.cancelled && result.assets) {
      setImage({ uri: result.assets[0].uri });
      handleUploadPhoto(result.assets[0].uri); // Assuming handleUploadPhoto expects a URI
    }
  };
  
  const handleUploadPhoto = async (uri) => {
    setLoading(true);
    try {
      const cloudinaryResponse = await uploadImage(uri); 
      if (cloudinaryResponse.secure_url) {
        setPhotoURL(cloudinaryResponse.secure_url);
      } else {
        throw new Error('Failed to get a valid URL from the server');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Edit Profile</Title>
              <Paragraph style={styles.paragraph}>Update your profile information</Paragraph>
              <View style={styles.inputContainer}>
                {image && <Image source={image} style={styles.image} />}
                <Button mode="outlined" onPress={handleChoosePhoto} style={styles.uploadButton}  labelStyle={styles.buttonText}>
                  Choose Photo
                </Button>
                <Button mode="outlined" onPress={handleOpenCamera} style={styles.uploadButton}  labelStyle={styles.buttonText}>
                  Take Photo
                </Button>
              </View>
              <TextInput
                label="Display Name"
                value={displayName}
                onChangeText={text => setDisplayName(text)}
                style={styles.input}
                autoCapitalize="none"
                onBlur={Keyboard.dismiss}
              />
              <TextInput
                label="Phone Number"
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
                style={styles.input}
                autoCapitalize="none"
                onBlur={Keyboard.dismiss}
              />
              <Button
                mode="contained"
                onPress={handleUpdate}
                loading={loading}
                disabled={loading}
                style={styles.button}
              >
                Update Profile
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: COLORS.lightWhite
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  paragraph: {
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  button: {
    backgroundColor: COLORS.tertiary,
    borderRadius: 10,
    paddingVertical: 10,

  },
  buttonText: {
    color: COLORS.primary, // Change this to your desired color
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  uploadButton: {
    marginBottom: 10,
    borderColor: COLORS.primary,
    color : COLORS.white
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light,
  },
});

export default EditProfileScreen;
