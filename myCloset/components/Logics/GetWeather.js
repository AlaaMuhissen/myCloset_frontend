import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import WeatherCard from '../Cards/WeatherCard';

export default function GetWeather({city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=8f3dd32daa694e7f9b4150045231512&q=${city}&days=7&aqi=no&alerts=no`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.log(error);
          setError('Error fetching weather data');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [city]);

  return (
    <View style={{ marginBottom: 5 }}>
      {weatherData && <WeatherCard weatherData={weatherData} />}
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
    </View>
  );
}
