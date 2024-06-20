import React from 'react';
import { View, Button, StyleSheet} from 'react-native';


const ImgPicker= ({ onChoosePhoto, onOpenCamera }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button onPress={onChoosePhoto} title="Select an image" />
      <Button onPress={onOpenCamera} title="Open camera" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ImgPicker;
