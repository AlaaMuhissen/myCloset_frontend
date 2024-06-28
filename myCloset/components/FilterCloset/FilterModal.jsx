import React from 'react';
import { View, ScrollView, Modal, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { styles } from './styles';

const FilterModal = ({ filteredItems, modalVisible, setModalVisible }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.resultsHeader}>Filtered Results:</Text>
        <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            {filteredItems.map((item, key) => (
              <View key={key} style={styles.resultItem}>
                <Image source={{ uri: item.imgUrl }} style={styles.resultImage} />
              </View>
            ))}
          </View>
        </ScrollView>
        <Button
          mode="contained"
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.closeButton}
        >
          Close
        </Button>
      </View>
    </View>
  </Modal>
);

export default FilterModal;
