import React, { forwardRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { DraxView } from 'react-native-drax';
import MovableAndResizableSquare from './MovableAndResizableSquare'
import ViewShot from 'react-native-view-shot';
import { centerPoint } from '@mgcrea/react-native-dnd';
import { COLORS } from '../../constants';

const { height } = Dimensions.get('window');

const ReceivingZone = forwardRef(({ received, sizes, positions, setPositions, handleResize, handleMove, handleRemove, addNewItem, resetPosition, captureMode }, ref) => {
  const [zoneLayout, setZoneLayout] = useState({ yStart: 0, yEnd: 0 });
  
  const [isThereAnImg ,setIsThereAnImg] = useState (false)
  useEffect(() => {
    const initialPos = {};
    received.forEach(item => {
      if (!positions[item.id]) {
        initialPos[item.id] = { x: 0, y: 0 };
      }
    });
    setPositions(prev => ({ ...prev, ...initialPos }));
  }, [received, setPositions]);

  const handleLayout = (event) => {
    const { y, height } = event.nativeEvent.layout;
    setZoneLayout({ yStart: y, yEnd: y + height });
  };

  return (
    <View>
        <View style={[ !captureMode && styles.receivingZone]} onLayout={handleLayout}>
      <ViewShot ref={ref} style={[styles.centeredContent , captureMode &&styles.receivingZoneForScreenshot]} options={{ format: 'jpg', quality: 0.8 }}>
          <DraxView
            style={styles.receivingZoneInner}
            receivingStyle={styles.receiving}
            onReceiveDragDrop={(event) => {
              const newItem = event.dragged.payload;
              if (!received.some(item => item.id === newItem.id)) {
                addNewItem(newItem);
              }
            }}
            renderContent={() => (
              <>
                { !isThereAnImg && <Text style = {styles.receiveZone}>Receiving Zone</Text>}
                <View style={styles.receivedContainer}>
                  {received.map((item, index) => {
                    setIsThereAnImg(true);
                    const size = sizes[item.id] || { width: 60, height: 60 };
                    const position = positions[item.id] || { x: 0, y: 0 };
                    return (
                      <MovableAndResizableSquare
                        key={index}
                        item={item}
                        size={size}
                        position={position}
                        onResize={handleResize}
                        onMove={(id, x, y) => {
                          handleMove(id, x, y);
                          if (y < zoneLayout.yStart || y + size.height > zoneLayout.yEnd) {
                            resetPosition(id);
                          }
                        }}
                        onRemove={handleRemove}
                        captureMode={captureMode} // Pass the captureMode prop
                      />
                    );
                  })}
                </View>
              </>
            )}
          />
      </ViewShot>
        </View>
    </View>
  );
});

const styles = StyleSheet.create({
  draxContainer: {
    marginTop: 20,
  },
  receiveZone:{
    position : 'absolute',
    color: COLORS.gray,
    right : 110,
    margin: 15
    
  },

  receivingZone: {
    height: 400,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  receivingZoneForScreenshot: {
    height: 400,
    backgroundColor: '#f0f0f0',
    width:"100%"
  },
  receivingZoneInner: {
    flex: 1,
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  receivedContainer: {
    position: 'relative',
    flex: 1,
  },
});

export default ReceivingZone;