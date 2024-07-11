import React, { useEffect, useState } from 'react';
import { View, StyleSheet ,Text, Image ,TouchableOpacity} from 'react-native';
import AIOutfitCards from './Cards/AIOutfitCards';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/native';
import placeholder from '../assets/default-image-clothe.jpg'
const AIOutfitSuggestions = () => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [outfits, setOutfits] = useState([]);
  const navigation = useNavigation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mycloset-backend-hnmd.onrender.com/api/outfit/mohissen1234/Summer');
        console.log(response.data);
        
        // Transform the object into an array of outfits
        const outfitsArray = Object.values(response.data);
        setOutfits(outfitsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();    
  }, []);

  return (
  <>
    {outfits.length !== 0 ? (
      <>
      <View style= {styles.textContainer}>
      <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold", marginBottom: 10 }}>
         We made these Outfits for you
       </Text>
     </View>
      <View style={styles.container}>
         
          <Carousel
            layout="tinder"
            layoutCardOffset={9}
            ref={isCarousel}
            data={outfits}
            renderItem={({ item, index }) => <AIOutfitCards item={item} index={index} />}
            sliderWidth={350}
            itemWidth={350}
            inactiveSlideShift={0}
            useScrollView={true}
            onSnapToItem={(index) => setIndex(index)}
          />
          <Pagination
            dotsLength={outfits.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
        </>
      ) : (
      <>
       <View style= {styles.textContainer}>
      <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold", marginBottom: 10 }}>
      Welcome to Your Virtual Closet
       </Text>
     </View>
        <View style={styles.container}>
        <View style={styles.emptyStateContainer}>
            <Image
            source={placeholder}
            style={styles.illustration}
          />
          <Text style={styles.emptyStateText}>
            Start adding your clothes to create your personalized outfits!
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddClothes')}>
            <Icon name="camera" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Add Clothes</Text>
          </TouchableOpacity>
        </View>
    </View>
    </>
      )}
      </>
  );
};

const styles = StyleSheet.create({

textContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius : 10
},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius : 10
  },
  emptyStateContainer: {
    flex: 1,
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
    color: "#000",
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6f61',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: '#fff',
  },
});

export default AIOutfitSuggestions;
