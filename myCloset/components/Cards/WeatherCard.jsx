import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { COLORS, FONT } from '../../constants';

const WeatherCard = ({ weatherData }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {weatherData.forecast.forecastday.map((day, index) => (
        <View
          key={index}
          style={styles.card}
        >
          <View>
            <Text style={styles.dateText}>
              {day.date}
            </Text>
            <Text style={styles.tempText}>
              {day.day.maxtemp_c}°C / {day.day.mintemp_c}°C
            </Text>
          </View>
          <View>
            <Image
              style={styles.weatherIcon}
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

const styles = {
  card: {
    backgroundColor: COLORS.lightWhite,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginRight: 8,
    shadowColor: COLORS.gray2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  tempText: {
    color: COLORS.gray,
    fontSize: 10,
    marginBottom: 5,
    fontFamily: FONT.regular,
  },
  weatherIcon: {
    width: 40,
    height: 40,
    marginLeft: 4,
  },
};
