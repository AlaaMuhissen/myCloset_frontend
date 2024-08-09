import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Skeleton } from 'moti/skeleton';

const auth = getAuth();
const SettingsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [clothesNumber, setClothesNumber] = useState(0);
  const { user } = useAuthentication();
  console.log(user);
  
  useEffect(() => {
    const fetchClothesNumber = async () => {
      try {
        if (user) {
          setLoading(true);
          const response = await axios.get(`https://mycloset-backend-hnmd.onrender.com/api/closet/${user.uid}/clothesNumber`);
          if (response.data) {
            setClothesNumber(response.data.clothesNumber);
          } else {
            setClothesNumber(0);
          }
        }
      } catch (error) {
        // console.error('Error fetching outfits:', error);
        setClothesNumber(0);
      } finally {
        setLoading(false);
      }
    };
    fetchClothesNumber();
  }, [user]);

  const logOut = () => {
    signOut(auth);
  };

  const handleOptionPress = (screenName) => {
    if (screenName === "Sign Out") {
      logOut();
    } else {
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
      <View style={{marginVertical:30 ,marginHorizontal: 15 ,gap :10}}>
        <View style={styles.userSection}>
          <View style={styles.rightSection}> 
            {loading ? (
              <Skeleton colorMode="light" height={70} width={70}  radius="round" />
            ) : (
              user && <Image source={user.photoURL ? { uri: user.photoURL } : require('../assets/images/defultAvatar.png')} style={styles.userPic} />
            )}
            <View style={{gap:5}}>
              {loading ? (
                <>
                  <Skeleton colorMode="light" height={20} width={200} />
                </>
              ) : (
                user && <Text style={styles.userName}>Welcome {user?.displayName ? user.displayName : user?.email},</Text>
              )}
              {loading ? (
                <Skeleton colorMode="light" height={20} width={150} />
              ) : (
                clothesNumber !== 0 ? (<Text style={styles.itemsNum}>{clothesNumber} items in your wardrobe</Text>)  : (<Text style={styles.itemsNum}>Start to add your clothes!</Text>)
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('EditProfileScreen')}>
            <Ionicons name="create-outline" size={32} color={COLORS.tertiary} />
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
            
            <View style={styles.skeletonContainer}>
        
            <Skeleton colorMode="light" height={150} width= '100%' />
            <Skeleton colorMode="light" height={200} width= '100%' />
            </View>
               
              ) : (
                <>
      {renderSection('Section 2', [
        { text: 'My Favorite Outfits', icon: 'heart-sharp', screen: 'favoriteOutfits' },
        { text: 'Statics', icon: 'bar-chart', screen: 'StatisticsScreen' }
      ])}
      {renderSection('Section 3', [
        { text: 'Terms And Conditions', icon: 'document-text-outline', screen: 'TermsScreen' },
        { text: 'Support', icon: 'help-circle-outline', screen: 'SupportScreen' },
        { text: 'Sign Out', icon: 'log-out-outline', screen: 'Sign Out' }
      ])}
      </>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    justifyContent: 'space-between',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userPic: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
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
    justifyContent: 'center',
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
  skeletonContainer: {
    alignContent :'center',
    gap : 30
  }
});

export default SettingsScreen;
