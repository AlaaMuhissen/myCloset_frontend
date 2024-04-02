import React, { useState, useEffect } from 'react';
import {Alert, View, TextInput, Button, Text ,StyleSheet , TouchableOpacity ,Keyboard, TouchableWithoutFeedback , ImageBackground} from 'react-native';
import { signInWithEmailAndPassword ,getAuth } from 'firebase/auth';
import SignupWithEmail from './SignupWithEmail';
const bgImg = require('../assets/images/clothes-background.png');
const auth = getAuth();
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
        // backgroundColor: '#704F38', // Background color
      },
      formContainer: {
        // width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white background
        borderRadius: 20,
        paddingVertical: 70,
        paddingHorizontal: 40,
      },
      inputContainer: {
        marginBottom: 20,
        width: '1000px'
      },
      input: {
        height: 40,
        width:"100%",
        backgroundColor: 'white', // Input background color
        borderRadius: 10,
        paddingHorizontal: 10,
      },
      button: {
        backgroundColor: '#704F38', // Button background color
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white', // Button text color
        fontWeight: 'bold',
        fontSize: 16,
      },
      signupText: {
        color: 'white', // Signup text color
        marginTop: 10,
        fontSize: 14,
        textAlign: 'center',
      },
      signupLink: {
        color: 'white', // Signup link color
        textDecorationLine: 'underline',
      },
  });

export default function LoginWithEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setIsAuthenticated(true);
      console.log('User signed in successfully!');
    } catch (error) {
        Alert.alert('Please try again!', 'Your emai/password is incorrect', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard or navigate to another screen
    }
  }, [isAuthenticated]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <ImageBackground source={bgImg} style={styles.backgroundImage}>
         <View style={styles.containerImg}>
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink}>Sign up</Text></Text>
        <View>
      <SignupWithEmail/>
      
      </View>
      </View>
    
      
    </View>
  </TouchableWithoutFeedback>
  </View>
  </ImageBackground>
  );
}
