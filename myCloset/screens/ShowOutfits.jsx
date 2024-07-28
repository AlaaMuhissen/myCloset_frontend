import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, Button } from 'react-native';
import axios from 'axios';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS ,FONT} from '../constants';
import Header from '../components/Header';
import outfitPlaceHolder from '../assets/outfitPlaceHolder.jpg'
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Skeleton } from 'moti/skeleton';

const ShowOutfits = () => {
  const [outfits, setOutfits] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('Summer');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const { user } = useAuthentication();

  const getSeasonIcon = (season) => {
    switch (season) {
      case 'Summer':
        return { name: 'sunny-sharp', color: '#FFD700' }; // Gold
      case 'Winter':
        return { name: 'snow-sharp', color: '#00BFFF' }; // DeepSkyBlue
      case 'Spring':
        return { name: 'flower-sharp', color: '#32CD32' }; // LimeGreen
      case 'Autumn':
        return { name: 'leaf', color: '#FF8C00' }; // DarkOrange
      default:
        return { name: 'circle', color: COLORS.black };
    }
  };
  const fetchOutfits = async () => {
    try {
      if(user){
        setLoading(true);
        const response = await axios.get(`https://mycloset-backend-hnmd.onrender.com/api/outfit/${user.uid}/${selectedSeason}`);
        if (response.data) {
          const fetchedOutfits = Object.values(response.data).flat();
          setOutfits(fetchedOutfits);
        } else {
          setOutfits([]);
        }
      }
    } catch (error) {
      console.error('Error fetching outfits:', error);
      setOutfits([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOutfits();
  }, [selectedSeason , user]);

  const toggleSelectItem = (itemId) => {
    setSelectedItems(prevSelectedItems => {
      const updatedSelectedItems = new Set(prevSelectedItems);
      if (updatedSelectedItems.has(itemId)) {
        updatedSelectedItems.delete(itemId);
      } else {
        updatedSelectedItems.add(itemId);
      }
      return updatedSelectedItems;
    });
  };
  
  const handleLongPress = (itemId) => {
    setIsSelectionMode(true);
    toggleSelectItem(itemId);
  };
  
  const handleItemPress = (outfit) => {
    if (isSelectionMode) {
      toggleSelectItem(outfit._id);
    } else {
      navigation.navigate('EditOutfit', { season: selectedSeason, outfit });
    }
  };
  
  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedItems(new Set());
  };
  
  
  const handleDeletedItems = async ()  => {

    try{
      setLoading(true);
      const response = await axios.delete(`https://mycloset-backend-hnmd.onrender.com/api/outfit/${user.uid}/${selectedSeason}`, {
        data: { itemsId: Array.from(selectedItems) }
      });
      if (response.status === 200) {
        Alert.alert('Success', 'Selected outfits deleted successfully!');
        setIsSelectionMode(false);
        setIsSelectedAll(false);
        setSelectedItems(new Set());
        fetchOutfits();
        setLoading(true);
      } else {
        Alert.alert('Error', 'Failed to delete selected outfits.');
      }
    }catch(error){
      console.error('Error in deleting: ' , error)
      Alert.alert('Error', 'An error occurred while deleting outfits.');
    }
  };
  const renderSeasonButton = (season) => {
    const isSelected = selectedSeason === season;
    const { name: iconName, color: iconColor } = getSeasonIcon(season);

    return (
      <TouchableOpacity
        key={season}
        style={[styles.seasonButton, isSelected && styles.selectedSeasonButton]}
        onPress={() => setSelectedSeason(season)}
      >
        <View style= {{flexDirection : 'row' , justifyContent:'center' , alignItems : 'center' }}> 
        <Ionicons name={iconName} size={24} color={isSelected ? iconColor : iconColor} style={styles.icon} />
        <Text style={[styles.seasonButtonText, isSelected && styles.selectedSeasonButtonText]}>{season}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleEnableSelectionMode = () => {
    setIsSelectionMode(true);
  };

  return (
    <View style={styles.container}>
    <Header name={"Show them ur attractive"} icon={''} />
     <ScrollView horizontal style={styles.seasonSelector}>
              {['Summer', 'Autumn' ,'Winter', 'Spring'].map(season => renderSeasonButton(season))}
          </ScrollView>
    <ScrollView>
      <View>
      <View style={styles.seasonOutfit}>
          <Text style={styles.title}>Outfits for {selectedSeason}</Text>
          <View style={styles.outfitNumContainer}>
              <Text style={styles.outfitNum}>{outfits.length}</Text>
          </View>
      </View>
      {outfits.length > 0 && !isSelectionMode && <Button title="Select" onPress={handleEnableSelectionMode} />}
      {isSelectionMode && <View style={styles.buttonContainer}>
      { isSelectedAll ? <Button title="Select All" onPress={() => {setSelectedItems(new Set(outfits.map(outfit => outfit._id))); setIsSelectedAll(false)}} />: 
     <Button title="Deselect All" onPress={() => { setIsSelectedAll(true) ;setSelectedItems(new Set())}} />
      }
       <TouchableOpacity onPress={handleDeletedItems}>
        <Ionicons name="trash-outline" color={'red'} size={24} style={styles.icon} />
        </TouchableOpacity>
        
        {isSelectedAll && <Button title="Cancel" onPress={handleCancelSelection} />} 
       
      </View>
}
{loading ? (
            <View style={styles.skeletonContainer}>
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} colorMode="light" height={100} width={100}/>
              ))} 
            </View>
          ) : (
            outfits.length > 0 ? (
              <View style={styles.outfitsSection}>
                {outfits.map((outfit, index) => (
                  <TouchableOpacity key={index} onLongPress={() => handleLongPress(outfit._id)} onPress={() => handleItemPress(outfit)}>
                    <View style={[styles.outfitContainer, selectedItems.has(outfit._id) && styles.selectedOutfitContainer]}>
                      <TouchableOpacity style={styles.editIcon} onPress={() => handleItemPress(outfit)}>
                        <FontAwesome name="edit" size={24} color={COLORS.secondary} />
                      </TouchableOpacity>
                      <Image source={{ uri: outfit.imgUrl }} style={styles.outfitImage} />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.emptyStateContainer}>
                <Image
                  source={outfitPlaceHolder}
                  style={styles.illustration}
                />
                <Text style={styles.noOutfitsText}>
                  You haven't added any favorite outfits yet. Start adding your favorite looks!
                </Text>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddOutfit')}>
                  <Ionicons name="camera" size={24} color="#fff" />
                  <Text style={styles.addButtonText}>Add Outfit</Text>
                </TouchableOpacity>
              </View>
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
    borderRadius: 10,
    shadowColor: COLORS.gray2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 10,
  },
  emptyStateContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  illustration: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: FONT.regular,
  },
  noOutfitsText: {
    fontSize: 18,
    color: COLORS.primary,
    textAlign: 'center',
    margin: 20,
    fontFamily: FONT.regular,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.tertiary,
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 10,
    fontFamily: FONT.bold,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  outfitNumContainer: {
    backgroundColor: COLORS.tertiary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.gray2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  outfitNum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
  outfitsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 5,
  },
  outfitContainer: {
    flexDirection: 'row',
    marginVertical: 10,
   
    position: 'relative',
    margin: 5,
  },
  editIcon: {
    position: 'absolute',
    right: -10,
    zIndex: 10,
    backgroundColor: COLORS.white,
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
    maxHeight :80,
  },
  seasonButton: {
    minWidth: 50,
    maxHeight: 50,
    padding : 10,
    backgroundColor: COLORS.gray2,
    borderRadius: 5,
    margin: 10,
    justifyContent:'space-between' , alignItems : 'center'
  },
  selectedSeasonButton: {
    backgroundColor: COLORS.primary,
  },
  seasonButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: FONT.bold,
    color: COLORS.black,
    marginLeft :7
  },
  selectedSeasonButtonText: {
    color: COLORS.white,
  },
  selectedOutfitContainer: {
    borderColor: COLORS.tertiary,
    padding :5,
    borderWidth: 2,
    borderRadius: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  skeletonContainer: {
    padding: 4,
    marginTop : 30,
    justifyContent: 'space-between',
    alignItems : 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap :10
  },
});


export default ShowOutfits;
