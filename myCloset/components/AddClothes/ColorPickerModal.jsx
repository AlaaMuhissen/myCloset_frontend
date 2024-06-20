import React from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import { TriangleColorPicker } from 'react-native-color-picker';

const ColorPickerModal = ({ visible, handleAddColor, setColorPickerVisible }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={() => setColorPickerVisible(false)}
  >
    <View style={styles.colorPickerContainer}>
      <Text style={styles.modalTitle}>Select a Color</Text>
      <TriangleColorPicker 
        onColorSelected={handleAddColor}
        style={styles.triangleColorPicker}
      />
      <View style={styles.modalButtonContainer}>
        <Button title="Close" onPress={() => setColorPickerVisible(false)} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  colorPickerContainer: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 100,
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  triangleColorPicker: {
    flex: 1,
    width: '100%',
  },
  modalButtonContainer: {
    marginTop: 20,
  },
});

export default ColorPickerModal;
