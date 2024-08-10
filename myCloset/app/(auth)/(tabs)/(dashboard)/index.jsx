import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';


import Header from '../../../../components/Header';
import { getIconComponent } from '../../../../components/Logics/getIconComponent';
import InfoCard from '../../../../components/Home/InfoCard';
import ShowCategories from '../../../../components/User_Categories/ShowCategories';
import GetWeather from '../../../../components/Logics/GetWeather';
import SearchBar from '../../../../components/Home/SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AIOutfitSuggestions from '../../../../components/AIOutfitSuggestions';
import { COLORS } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';
import { cities } from '../../../../assets/data/cities';
import { Dropdown } from 'react-native-element-dropdown';
import { Skeleton } from 'moti/skeleton';


const Dashboard = () => {
  //
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        setIsLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Fetch city and country using reverse geocoding here
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        setCity(reverseGeocode[0].city);
      }

      setIsLoading(false);
    })();
  }, []);

  const handleSearch = () => {
    navigation.navigate('FilterScreen');
  };

  const handleShowCalendar = () => {
    navigation.navigate('historyScreen');
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Header name={"Hi Fashionista"} icon={'calendar'} onIconPress={handleShowCalendar}/>
        <View style={{  marginHorizontal: 15, gap: 20 }}>
          {isLoading ? (
            <Skeleton height={80} width="100%" colorMode="light" />
          ) : (
            <InfoCard />
          )}
          <TouchableOpacity onPress={() => handleSearch()}>
          {isLoading ? (
            <Skeleton height={40} width="100%" colorMode="light" />
          ) : (
            <SearchBar />
          )}
           
          </TouchableOpacity>
          <View style={{ gap: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 18, color: COLORS.primary, fontWeight: "bold" }}>Weather for this week</Text>
            </View>
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: 10 }}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="location" color={COLORS.secondary} size={16} />
              <Text style={{ fontSize: 8, color: COLORS.secondary, fontWeight: "bold" }}>{city || 'Fetching...'}</Text>
            </TouchableOpacity>
          </View>
          <GetWeather city={city} />
          <View style={{ gap: 20 }}>
            {isLoading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
                <Skeleton width="100%" height={400} colorMode="light" />
              </View>
            ) : (
              <AIOutfitSuggestions />
            )}
          </View>
        </View>
      </ScrollView>

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Dropdown
            style={styles.dropdown}
            data={cities}
            search
            labelField="label"
            valueField="value"
            placeholder="Type or select a city"
            searchPlaceholder="Search..."
            value={city}
            onChange={item => {
              setCity(item.value);
              setModalVisible(false);
            }}
          />
          <Button 
            mode="contained" 
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            Close
          </Button>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 10
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 4,
    color: COLORS.primary,
    paddingRight: 30, 
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    borderRadius: 8,
    color: COLORS.primary,
    paddingRight: 30, 
  },
});

export default Dashboard;
