import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserOutfits = () => {
  const [outfits, setOutfits] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('Summer');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://mycloset-backend-hnmd.onrender.com/api/outfit/mohissen1234/${selectedSeason}`);
        console.log(response.data)
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
    console.log(outfits)
  }, [selectedSeason]);

  const handleEditOutfit = (outfitId) => {
    navigation.navigate('EditOutfit', { season: selectedSeason, outfitId });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Outfits for {selectedSeason}</Text>
        {loading ? (
          <Text>Loading ...</Text>
        ) : (
          outfits.length > 0 ? (
            outfits.map((outfit, index) => (
              <View key={index} style={styles.outfitContainer}>
                <TouchableOpacity style={styles.editIcon} onPress={() => handleEditOutfit(outfit._id)}>
                  <FontAwesome name="edit" size={24} color="black" />
                </TouchableOpacity>
                {outfit.itemsId.map((itemId, idx) => {
                  const item = outfit.itemsId.find((i) => i === itemId); // Assuming you have a way to get the item details by itemId
                  return item ? <Image key={idx} source={{ uri: item.imgUrl }} style={styles.outfitImage} /> : null;
                })}
              </View>
            ))
          ) : (
            <Text>No outfits found for {selectedSeason}</Text>
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  outfitContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
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
});

export default UserOutfits;
