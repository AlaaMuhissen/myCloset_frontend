import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AIOutfitCards = ({ item, index }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={styles.header}>{`Outfit ${index + 1}`}</Text>
      <View 
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity 
          style={styles.btnContainer}
          onPress={() => navigation.navigate('OutfitDetails', { item })}
        >
          <View style={styles.iconContainer}>
            <FontAwesome name="eye" size={24} color="#fff" />
          </View>
          <Text style={styles.text}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingBottom: 40,
    paddingTop: 20,
    gap: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    height: 300,
    width: '100%',
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#363636',
    backgroundColor: '#242424',
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal: 20,
    width: '100%'
  },
  iconContainer: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AIOutfitCards;
