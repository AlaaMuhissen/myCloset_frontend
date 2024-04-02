import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';



export default function SignupWithEmail() {


  return (
    <Pressable style={styles.button}>
      <FontAwesome name="google" size={32} color="#704F38" style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row', // Align icon and text horizontally
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#704F38',
    fontSize: 16,
    marginLeft: 10, // Add some space between icon and text
  },
  icon: {
    marginRight: 10, // Add some space between icon and text
  },
});
