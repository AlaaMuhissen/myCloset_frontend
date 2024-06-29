import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DraxView } from 'react-native-drax';
function DraggableImg({urlImg}) {
  return (
    <DraxView
          style={[styles.centeredContent, styles.draggableBox]}
          draggingStyle={styles.dragging}
          dragReleasedStyle={styles.dragging}
          hoverDraggingStyle={styles.hoverDragging}
          dragPayload={{ label: 'Blue', image: require(urlImg) }}
          longPressDelay={0}
        >
          <Image source={require(urlImg)} style={styles.image} />
   </DraxView>
  )
};
const styles = StyleSheet.create({

  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  draggableBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  dragging: {
    opacity: 0.2,
  },
  image: {
    width: 60,
    height: 60,
  },
});

export default DraggableImg