import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut }from 'firebase/auth'
import { useAuthentication } from '../utils/hooks/useAuthentication';

const auth = getAuth();

export default function Header({ name, icon }) {
    const { user } = useAuthentication();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.greetingText}>
          {name}
        </Text>
        <Ionicons name={icon} color={'#fff'} size={28} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    // flex:1,
    paddingHorizontal:10,
    paddingVertical :20,
    // borderWidth: 2,
    // borderColor: "#fff"
    // borderWidth: "1px",
    // borderColor: "#fff"

    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center'
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  greetingText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5
  }
});
