import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { Image as CachedImage } from 'react-native-expo-image-cache';

const PreviewModal = ({ visible, imgURL, content, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.previewContainer}>
          <TouchableWithoutFeedback>
            <View>
              <CachedImage uri={imgURL} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.previewCloseButton}
                onPress={onClose}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0 }}>
                  <Text style={styles.previewCloseText}>×</Text>
                </View>
              </TouchableOpacity>
              {content && <Text style={styles.previewText}>{content}</Text>}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  previewImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  previewCloseButton: {
    position: 'absolute',
    top: -10,
    right: -5,
    backgroundColor: '#111',
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  previewCloseText: {
    fontSize: 25,
    color: '#fff',
  },
  previewText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});

export default PreviewModal;
