import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const WeatherCard = ({ weatherData }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {weatherData.forecast.forecastday.map((day, index) => (
        <View
         key={index}
          style={{
            backgroundColor: 'white',
            padding: 16,
           
            flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 8,
            marginHorizontal: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
        
        <View>
   
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>
            {day.date}
          </Text>
        
          <Text style={{ color: 'gray', fontSize:10 , marginBottom: 5 }}>
            {day.day.maxtemp_c}°C / {day.day.mintemp_c}°C
          </Text>
         
          </View>
          <View >

          <Image
                style={{ width: 40, height: 40 , marginLeft: 4}}
                source={{ uri: `https:${day.day.condition.icon}` }}
                resizeMode="contain"
            />
            </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default WeatherCard;
