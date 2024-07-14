import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, FONT } from '../../constants';

const InfoCard = () => {
  return (
    <View style={{
      backgroundColor: COLORS.secondary,
      padding: 20,
      borderRadius: 6,
      gap: 10,
      shadowColor: COLORS.white,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.white, fontFamily: FONT.bold }}>3 outfits planned this week!</Text>
      <Text style={{ fontSize: 14, color: COLORS.white, fontFamily: FONT.regular }}>75% of your outfit goals achieved</Text>
    </View>
  )
}

export default InfoCard;
