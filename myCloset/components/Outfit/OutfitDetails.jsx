import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { COLORS } from '../../constants';
import PreviewModal from '../PreviewModal';
import { useNavigation } from '@react-navigation/native';
import { Image as CachedImage } from 'react-native-expo-image-cache';

const OutfitDetails = ({ route }) => {
  const { item } = route.params;
  const [clotheItems, setClotheItems] = useState([]);
  const [inPreviewMode, setInPreviewMode] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsDetails = await Promise.all(item.itemsId.map(async (itemId) => {
          const category = item.itemsSource[itemId].category;
          const subCategory = item.itemsSource[itemId].subCategory;
          const response = await axios.get(`https://mycloset-backend-hnmd.onrender.com/api/closet/mohissen1234/${category}/${subCategory}/${itemId}`);
          return response.data;
        }));
        console.log(itemsDetails);
        setClotheItems(itemsDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [item.itemsId]);

  const handlePreview = (clotheItem) => {
    setPreviewItem(clotheItem);
    setInPreviewMode(true);
  };

  const handleEditOutfit = (outfit) => {
    navigation.navigate('EditOutfit', { season: 'Summer', outfit });
  };
  const handleAddToFav = async (outfit) => {
    try {
      setLoading(true);
      const data = {
        season : "Summer",
        outfitId: outfit._id
      }
      const response = await axios.post(`https://mycloset-backend-hnmd.onrender.com/api/outfit/addToFavorite/mohissen1234`, data,
         {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_AUTH_TOKEN', 
          }
        }
      );
      if (response.data) {
        Alert.alert(
          'Success',
          'Item add to the fav successfully!',
          [
            { text: 'Stay in this Page'},
            { text: 'Show the fav screen', onPress: () => {
              
              handleCancel();navigation.navigate('userCategory') }
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error fetching outfits:', error);
    } finally {
      setLoading(false);
    }

  };
  

  const handleAddOutfitToHistory = async (outfit) => {
    try {
      setLoading(true);
      const data = {
        isAIOutfit : true,
        outfitId: outfit._id
      }
      const response = await axios.post(`https://mycloset-backend-hnmd.onrender.com/api/outfit/logOutfitUsage/mohissen1234`, data,
         {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_AUTH_TOKEN', 
          }
        }
      );
      if (response.data) {
        Alert.alert(
          'Great Choice',
          'Enjoy your day!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('home')
            }
          ]
        );
      } else {
        
      }
    } catch (error) {
      console.error('Error fetching outfits:', error);
    
    } finally {
      setLoading(false);
    }

  };
  const handleDisLike = () =>{
    Alert.alert(
      'Feedback Received',
      'We appreciate your feedback and will strive to improve future outfit recommendations for you.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('home')
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <CachedImage
        uri={item.imgUrl}
        style={styles.image}
        resizeMode='contain'
      />
      <FlatList
        data={clotheItems}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePreview(item)}>
            <View style={styles.itemContainer}>
              <CachedImage
                uri={item.imgUrl}
                style={styles.itemImage}
                resizeMode='contain'
              />
            </View>
          </TouchableOpacity>
        )}
      />
      {inPreviewMode && previewItem && (
        <PreviewModal
          visible={inPreviewMode}
          imgURL={previewItem.imgUrl}
          content={null}
          onClose={() => setInPreviewMode(false)}
        />
      )}
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => handleAddOutfitToHistory(item)}>
          <View style={styles.btn}>
            <Text>I'll Wear It</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddToFav(item)}>
          <View style={styles.btn}>
            <Text>Save For Later</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDisLike(item)}>
          <View style={styles.btn}>
            <Text>I Don't Like It!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditOutfit(item)}>
          <View style={styles.btn}>
            <Text>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    padding: 20,
  },
  btnContainer: {
    gap: 10,
  },
  image: {
    height: 300,
    width: '100%',
  },
  itemContainer: {
    marginVertical: 10,
    alignItems: 'center',
    marginRight: 20,
  },
  btn: {
    padding: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  itemImage: {
    height: 100,
    width: 100,
  },
});

export default OutfitDetails;
