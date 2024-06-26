import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';

import { getAuth, signOut }from 'firebase/auth'

const auth = getAuth();
const SettingsScreen = () => {
    const navigation = useNavigation();
    const logOut = () => {
        signOut(auth);
      };
    const handleOptionPress = (screenName) => {
        if(screenName === "Sign Out") {
            logOut();
        }
    else{

        navigation.navigate(screenName);
    }
    };
  const renderSection = (title, options) => (
   
    <View style={styles.section}>
      {options.map((option, index) => (
        <TouchableOpacity 
          key={index}
          style={[styles.option, index === options.length - 1 && styles.lastOption]}
          onPress={() => handleOptionPress(option.screen)}
          >
            <View style={{flex:1, flexDirection: 'row',justifyContent: 'center', alignItems:'center',paddingBottom: 10}}>
                <Ionicons name={option.icon} size={20} color={COLORS.white} style={styles.optionIcon} />
                <Text style={styles.optionText}>{option.text}</Text>
            </View>
            <View>
          <Ionicons name="chevron-forward-outline" size={20} color={COLORS.white} />
            </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
        <View style = {{marginVertical:30 ,marginHorizontal: 15 ,gap :10}}>
         <View style={styles.userSection}>
            <View style={styles.rightSection}> 
             <Image source={require('../assets/images/avatar.jpg')} style={styles.userPic} />
                <View style={{gap:5}}>
                    <Text style={styles.userName}>Alaa Muhissen</Text>
                    <Text style={styles.itemsNum}>18 item in your wardrobe</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="create-outline" size={32} color={COLORS.white} />
            </TouchableOpacity>

            </View>
        </View>
     
      
      {renderSection('Section 2', [
        { text: 'My Style', icon: 'shirt-outline', screen: 'MyStyleScreen' },
        { text: 'Alerts', icon: 'notifications-outline', screen: 'AlertsScreen' },
        { text: 'Visuals', icon: 'eye-outline', screen: 'VisualsScreen' }
      ])}
      {renderSection('Section 3', [
        { text: 'Terms And Conditions', icon: 'document-text-outline', screen: 'TermsScreen' },
        { text: 'Support', icon: 'help-circle-outline', screen: 'SupportScreen' },
        { text: 'Sign Out', icon: 'log-out-outline', screen: 'Sign Out' }
      ])}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090909',
    gap: 20,
    paddingHorizontal: 20,
  
  },
  section: {
    marginBottom: 20,
    borderWidth: 1,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.secondary,
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    // marginBottom: 10,
  },
  rightSection :{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  userPic: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,

  },
  itemsNum: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.tertiary,
    
  },
  editIcon: {
    padding: 5,
  },
  option: {
    flexDirection: 'row',
    justifyContent :'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
    paddingVertical: 5,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.white,
    
    flex: 1,
  },
  lastOption: {
    borderBottomWidth: 0,
  },
});

export default SettingsScreen;
