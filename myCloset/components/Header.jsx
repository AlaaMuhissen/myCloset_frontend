import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut }from 'firebase/auth'
import { useAuthentication } from '../utils/hooks/useAuthentication';
const auth = getAuth();
const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textContainer: {
    marginBottom: 10
  },
  greetingText: {
    fontSize: 24,
    color: '#704F38',
    fontWeight: 'bold',
    marginBottom: 5
  },
  titleText: {
    fontSize: 18,
    color: '#704F38',
    fontWeight: 'bold'
  },
  logoutButton: {
    marginLeft: 10
  }
});

export default function Header({ name, title, onLogout }) {
    const { user } = useAuthentication();
    console.log('User:', user);
  const logOut = () => {
    signOut(auth);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.greetingText}>
          Hi {name}
        </Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <TouchableOpacity onPress={logOut} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" color='#704F38' size={30} />
      </TouchableOpacity>
    </View>
  );
}
