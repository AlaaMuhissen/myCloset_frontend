import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';
import Header from '../components/Header';

const ShowOutfits = () => {
  const [outfits, setOutfits] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('Summer');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://mycloset-backend-hnmd.onrender.com/api/outfit/mohissen1234/${selectedSeason}`);
        if (response.data) {
          const fetchedOutfits = Object.values(response.data).flat();
          setOutfits(fetchedOutfits);
        } else {
          setOutfits([]);
        }
      } catch (error) {
        console.error('Error fetching outfits:', error);
        setOutfits([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOutfits();
  }, [selectedSeason]);

  const handleEditOutfit = (outfit) => {
    // console.log(outfit)
    navigation.navigate('EditOutfit', { season: selectedSeason, outfit });
  };

  const renderSeasonButton = (season) => {
    return (
      <TouchableOpacity
        key={season}
        style={[styles.seasonButton, selectedSeason === season && styles.selectedSeasonButton]}
        onPress={() => setSelectedSeason(season)}
      >
        <Text style={styles.seasonButtonText}>{season}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
    <Header name={"Show them ur attractive"} icon={''} />
    <View style={styles.seasonSelector}>
      {['Summer', 'Winter', 'Spring', 'Autumn'].map(season => renderSeasonButton(season))}
    </View>
    <ScrollView>
      <View>
      <View style={styles.seasonOutfit}>
          <Text style={styles.title}>Outfits for {selectedSeason}</Text>
          <View style={styles.outfitNumContainer}>
              <Text style={styles.outfitNum}>{outfits.length}</Text>
          </View>
      </View>

        {loading ? (
          <Text>Loading ...</Text>
        ) : (
          outfits.length > 0 ? (
            <View style={styles.outfitsSection}>
              {outfits.map((outfit, index) => (
                <View key={index} style={styles.outfitContainer}>
                  <TouchableOpacity style={styles.editIcon} onPress={() => handleEditOutfit(outfit)}>
                    <FontAwesome name="edit" size={24} color="black" />
                  </TouchableOpacity> 
                  <Image source={{ uri: outfit.imgUrl }} style={styles.outfitImage} />
                </View>
              ))}
            </View>
          ) : (
            <Text>No outfits found for {selectedSeason}</Text>
          )
        )}
      </View>
    </ScrollView>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: COLORS.background,
  },
  seasonOutfit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    // backgroundColor: '#f8f9fa',
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 10,
},
title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
},
outfitNumContainer: {
    backgroundColor: '#4caf50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
},
outfitNum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
},
 
  outfitsSection : {
    flexDirection: 'row',
    flexWrap : 'wrap',
    justifyContent : 'space-between',
    padding : 5
  },
  
  outfitContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    maxWidth: 100,
    position: 'relative',
    margin : 5
    // backgroundColor: "#ccc",
  },
  editIcon: {
    position: 'absolute',
    // top: 10,
    right: -10,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
  },
  outfitImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  seasonSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  seasonButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  selectedSeasonButton: {
    backgroundColor: '#aaa',
  },
  seasonButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShowOutfits;
