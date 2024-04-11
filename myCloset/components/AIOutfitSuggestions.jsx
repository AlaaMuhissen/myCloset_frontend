import React from 'react'
import { View } from 'react-native'
import AIOutfitCards from './Cards/AIOutfitCards'
import { outfits } from '../assets/data/outfits'
import Carousel , { Pagination }from 'react-native-snap-carousel'
const AIOutfitSuggestions = () => {
    const isCarousel = React.useRef(null)
    const [index, setIndex] = React.useState(0);
   
    return (
      <View>
        <Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={isCarousel}
          data={outfits}
          renderItem={AIOutfitCards}
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
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: '#fff'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
      </View>
    )
}

export default AIOutfitSuggestions