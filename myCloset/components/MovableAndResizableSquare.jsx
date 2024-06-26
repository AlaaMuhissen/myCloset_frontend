import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, PanResponder, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const MovableAndResizableSquare = ({ item, size, position, onResize, onMove, onRemove, captureMode }) => {
  const [currentSize, setCurrentSize] = useState(size);
  const [currentPosition, setCurrentPosition] = useState(position);
  // console.log('item => ' , item)
  // console.log('position => ' ,position )
  useEffect(() => {
    setCurrentSize(size);
  }, [size]);

  useEffect(() => {
    console.log("positiom =>" ,position)
    setCurrentPosition(position);
  }, [position]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const newX = currentPosition.x + gestureState.dx;
      const newY = currentPosition.y + gestureState.dy;
      setCurrentPosition({ x: newX, y: newY });
      onMove(item.id, newX, newY);
    },
    onPanResponderRelease: (e, gestureState) => {
      const newX = currentPosition.x + gestureState.dx;
      const newY = currentPosition.y + gestureState.dy;
      if (newY < 0 || newY + currentSize.height > height * 0.5) {
        console.log("exit");
        setCurrentPosition({ x: 50, y: 50 });
      } else {
        setCurrentPosition({ x: newX, y: newY });
      }
    },
  });

  const resizeResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const newWidth = Math.max(60, currentSize.width + gestureState.dx);
      const newHeight = Math.max(60, currentSize.height + gestureState.dy);
      setCurrentSize({ width: newWidth, height: newHeight });
      onResize(item.id, newWidth, newHeight);
    },
    onPanResponderRelease: (e, gestureState) => {
      const newWidth = Math.max(60, currentSize.width + gestureState.dx);
      const newHeight = Math.max(60, currentSize.height + gestureState.dy);
      setCurrentSize({ width: newWidth, height: newHeight });
      onResize(item.id, newWidth, newHeight);
    },
  });

  return (
    <View style={{ position: 'absolute', left: currentPosition.x, top: currentPosition.y }}>
      <View
        {...panResponder.panHandlers}
        style={[
          styles.receivedSquare,
          { width: currentSize.width, height: currentSize.height }
        ]}
      >
        <Image source={{ uri: item.imgUrl }} style={{ width: currentSize.width, height: currentSize.height }} />
        {!captureMode && (
          <>
            <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
              <Text>X</Text>
            </TouchableOpacity>
            <View
              {...resizeResponder.panHandlers}
              style={styles.resizeHandle}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  receivedSquare: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  resizeHandle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
});

export default MovableAndResizableSquare;
