import React from 'react';
import { View, Modal, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image as CachedImage } from 'react-native-expo-image-cache';
import { Ionicons } from "@expo/vector-icons";

const ItemModal = ({ visible, selectedItem, selectedCategory, selectedSubCategory, handleEditItem, handleCloseModal }) => {
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={handleCloseModal}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 10 }}>
          <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }} onPress={handleEditItem}>
            <Ionicons name="pencil-outline" size={24} color="#333" />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <CachedImage style={{ width: '100%', height: 300, borderRadius: 20, marginBottom: 20 }} uri={selectedItem.imgUrl} resizeMode="contain" />
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 }}>Item Details</Text>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555', marginRight: 20 }}>Category</Text>
              <Text style={{ fontSize: 14, color: '#777' }}>{selectedCategory}</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555', marginRight: 20 }}>SubCategory</Text>
              <Text style={{ fontSize: 14, color: '#777' }}>{selectedSubCategory}</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555', marginRight: 20 }}>Fabric</Text>
              <Text style={{ fontSize: 14, color: '#777' }}>{selectedItem.fabric}</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555', marginRight: 20 }}>Seasons</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Text style={{ fontSize: 14, marginRight: 10, color: '#888' }}>
                  {selectedItem.seasons.map((season, index) => (season === 1 ? seasons[index] : null)).filter(Boolean).join(', ')}
                </Text>
              </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555', marginRight: 20 }}>Colors</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {selectedItem.colors.map((color, index) => (
                  <View key={index} style={{ width: 24, height: 24, marginRight: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ddd', backgroundColor: color }} />
                ))}
              </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555', marginRight: 20 }}>Tags</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 5 }}>
                {selectedItem.tags.map((tag, index) => (
                  <Text key={index} style={{ marginRight: 5, marginBottom: 5, fontSize: 14, color: '#777' }}>{tag}</Text>
                ))}
              </View>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#FD3A69', padding: 15, borderRadius: 30, alignItems: 'center', marginTop: 20, width: '100%' }} onPress={handleCloseModal}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ItemModal;
