import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { COLORS, FONT } from '../../constants';
import PreviewModal from '../PreviewModal';
import { useNavigation } from '@react-navigation/native';
import { Image as CachedImage } from 'react-native-expo-image-cache';
import Header from '../Header';
import { Ionicons } from '@expo/vector-icons';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { useUser } from '@clerk/clerk-expo';

const OutfitDetails = ({ route }) => {
  const { item } = route.params;
  const [clotheItems, setClotheItems] = useState([]);
  const [inPreviewMode, setInPreviewMode] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { user } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(user){
        const itemsDetails = await Promise.all(item.itemsId.map(async (itemId) => {
          const category = item.itemsSource[itemId].category;
          const subCategory = item.itemsSource[itemId].subCategory;
          const response = await axios.get(`https://mycloset-backend-hnmd.onrender.com/api/closet/userUID/${category}/${subCategory}/${itemId}`);
          return response.data;
        }));
        console.log(itemsDetails);
        setClotheItems(itemsDetails);
      }
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [item.itemsId ,user]);

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
      };
      const response = await axios.post(`https://mycloset-backend-hnmd.onrender.com/api/outfit/addToFavorite/userUID`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN', 
        }
      });
      if (response.data) {
        Alert.alert(
          'Success',
          'Item added to the favorites successfully!',
          [
            { text: 'Stay on this Page' },
            { text: 'Show the favorites screen', onPress: () => navigation.navigate('favoriteOutfits') },
          ]
        );
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOutfitToHistory = async (outfit) => {
    try {
      setLoading(true);
      const data = {
        isAIOutfit: true,
        outfitId: outfit._id,
        season : "Summer"
      };
      console.log(data)
      console.log(user.uid)
      const response = await axios.post(`https://mycloset-backend-hnmd.onrender.com/api/outfit/logOutfitUsage/userUID`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN', 
        }
      });
      if (response.data) {
        Alert.alert(
          'Great Choice',
          'Enjoy your day!',
          [
            { text: 'OK', onPress: () => navigation.navigate('Home') }
          ]
        );
      }
    } catch (error) {
      console.error('Error logging outfit usage:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = () => {
    Alert.alert(
      'Feedback Received',
      'We appreciate your feedback and will strive to improve future outfit recommendations for you.',
      [
        { text: 'OK', onPress: () => navigation.navigate('home') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header name={'Outfit Details'} icon={'pencil-sharp'} onIconPress={() => handleEditOutfit(item)} />
      <CachedImage
        uri={item.imgUrl}
        style={styles.image}
        resizeMode='contain'
      />
      <View style = {styles.outfitItemContainer}>
      <Text  style={styles.outfitText}>Outfit Includes</Text>
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
      </View>
      {inPreviewMode && previewItem && (
        <PreviewModal
          visible={inPreviewMode}
          imgURL={previewItem.imgUrl}
          content={null}
          onClose={() => setInPreviewMode(false)}
        />
      )}
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => handleAddToFav(item)} style={styles.btn}>
        <View style={styles.inBtn}>
             <Ionicons name="bookmark-sharp" color={COLORS.white} size={18} />
             <Text style = {styles.btnText}>Save For Later</Text>
          </View>
         
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDislike()} style={styles.btn}>
        <View style={styles.inBtn}>
             <Ionicons name="sad-sharp" color={COLORS.white} size={18} />
             <Text style = {styles.btnText}>I Don't Like It!</Text>
          </View>
        </TouchableOpacity>
      </View>
        <TouchableOpacity onPress={() => handleAddOutfitToHistory(item)} style={styles.btn}>
        <View style={styles.inBtn}>
             <Ionicons name="happy-sharp" color={COLORS.white} size={20} />
             <Text style = {styles.btnText}>I'll Wear It</Text>
          </View>
      
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
  },
  outfitItemContainer : {
    paddingHorizontal: 12,
  },
  image: {
    height: 300,
    width: '100%',  
    borderRadius: 15,
    marginBottom: 20,
  },
  outfitText : {
    fontFamily: FONT.medium,
    fontSize: 18,
    color : COLORS.primary
  },
  btnText: { 
    color : COLORS.background ,
    fontFamily : FONT.regular
 },
 inBtn :{
  flexDirection : 'row',
  justifyContent :'center',
  alignItems: 'center',
  gap:10
},

  itemContainer: {
    marginVertical: 10,
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    padding: 10,
    shadowColor: COLORS.gray2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems : 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    // padding:18
  },
  btn: {
    backgroundColor: COLORS.tertiary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,

    shadowColor: COLORS.gray2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONT.medium,
    textAlign: 'center',
  },
});

export default OutfitDetails;
