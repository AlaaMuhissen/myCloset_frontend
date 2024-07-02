import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AIOutfitCards from './Cards/AIOutfitCards';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import axios from 'axios';

const AIOutfitSuggestions = () => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mycloset-backend-hnmd.onrender.com/api/outfit/mohissen1234/Summer');
        console.log(response.data);
        
        // Transform the object into an array of outfits
        const outfitsArray = Object.values(response.data);
        console.log(outfitsArray)
        setOutfits(outfitsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();    
  }, []);

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
