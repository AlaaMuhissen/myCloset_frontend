import React, { useState } from 'react';
import { View, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, ImageBackground, Image ,Text , TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';
import { uploadImage } from '../config/cloudinary';
import axios from 'axios';
const bgImg = require('../assets/images/apparel-choosing-clothing-fashion.jpg');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 20,
    paddingVertical: 70,
    paddingHorizontal: 40,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupText: {
    color: 'black',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  signupLink: {
    color: 'black',
    textDecorationLine: 'underline',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10,

  },
  title: {
    padding:20
  },
  orText : {
    textAlign : 'center'
  }
});

export default function RegistrationScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    setLoading(true);

    try {
      const auth = getAuth();
      // Register the user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = userCredential.user.uid;

      // Update the user's profile with additional details
      await updateProfile(user, {
        displayName,
        phoneNumber,
        photoURL,
      });
       // Add the new user to the MongoDB database
       await axios.post('https://mycloset-backend-hnmd.onrender.com/api/closet/newUser', {
        userId
      });


      Alert.alert('Success', 'Registration successful');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
      Keyboard.dismiss(); // Dismiss the keyboard
    }
  };

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
  
  const handleChoosePhoto = async () => {
    const hasPermission = await requestPermission(ImagePicker.requestMediaLibraryPermissionsAsync);
    if (!hasPermission) return;
  
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
  
      if (!result.cancelled && result.assets && result.assets.length > 0) {
        setImage({ ...result.assets[0], uri: result.assets[0].uri });
        await handleUploadPhoto({ ...result.assets[0], uri: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Image picker error:', error);
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
  
      if (!result.cancelled && result.assets && result.assets.length > 0) {
        setImage({ ...result.assets[0], uri: result.assets[0].uri });
        await handleUploadPhoto({ ...result.assets[0], uri: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Camera error:', error);
      alert('Failed to take a photo');
    }
  };
  
  const handleUploadPhoto = async (photo) => {
    if (photo && photo.uri) {
      setLoading(true);
      try {
        const cloudinaryResponse = await uploadImage(photo.uri);
        const cloudinaryUrl = cloudinaryResponse.secure_url;
        setPhotoURL(cloudinaryUrl);
      } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload and process photo');
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Invalid photo object:', photo);
      alert('No photo to upload');
    }
  };
  
  return (
    <ImageBackground source={bgImg} style={styles.backgroundImage}>
      <View style={styles.containerImg}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Card style={styles.formContainer}>
                <Title style={styles.title}>Create a new account</Title>
              <Card.Content>
                {/* <Paragraph style={styles.paragraph}></Paragraph> */}
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    autoCapitalize="none"
                    onBlur={Keyboard.dismiss} // Dismiss the keyboard on blur
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                    autoCapitalize="none"
                    onBlur={Keyboard.dismiss} // Dismiss the keyboard on blur
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Display Name"
                    value={displayName}
                    onChangeText={text => setDisplayName(text)}
                    style={styles.input}
                    autoCapitalize="none"
                    onBlur={Keyboard.dismiss} // Dismiss the keyboard on blur
                  />
                </View>
               

                <View style={styles.inputContainer}>
                  {image && <Image source={image} style={styles.image} />}
                  <TouchableOpacity style={styles.uploadButton} onPress={handleChoosePhoto}>
                    <Text style={styles.buttonText}>Choose Photo</Text>
                  </TouchableOpacity>
                  <Text style= {styles.orText}>--------- OR ---------</Text>
                  <TouchableOpacity style={styles.uploadButton} onPress={handleOpenCamera}>
                    <Text style={styles.buttonText}>Take Photo</Text>
                  </TouchableOpacity>
                </View>
                <Button
                  mode="contained"
                  onPress={handleRegister}
                  loading={loading}
                  disabled={loading}
                  style={styles.button}
                >
                  Register
                </Button>
                <Text style={styles.signupText}>
                  Already have an account?{' '}
                  <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={styles.signupLink}>Login</Text>
                  </TouchableOpacity>
                </Text>
              </Card.Content>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
}
