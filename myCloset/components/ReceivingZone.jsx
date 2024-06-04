import React, { forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DraxView } from 'react-native-drax';
import MovableAndResizableSquare from './MovableAndResizableSquare ';


const ReceivingZone = forwardRef(({ received, sizes, positions, handleResize, handleMove, handleRemove, addNewItem, resetPosition }, ref) => {
    return (
      <View style={styles.draxContainer}>
        <DraxView
          ref={ref}
          style={[styles.centeredContent, styles.receivingZone]}
          receivingStyle={styles.receiving}
          onReceiveDragDrop={(event) => {
            const newItem = event.dragged.payload;
            if (!received.some(item => item.id === newItem.id)) {
              addNewItem(newItem);
            }
          }}
          onReceiveDragExit={(event) => {
            console.log("exit!!")
            resetPosition(event.dragged.payload.id);
          }}
          renderContent={() => (
            <>
              <Text>Receiving Zone</Text>
              <View style={styles.receivedContainer}>
                {received.map((item, index) => {
                  const size = sizes[item.id] || { width: 60, height: 60 };
                  const position = positions[item.id] || { x: 0, y: 0 };
                  return (
                    <MovableAndResizableSquare
                      key={index}
                      item={item}
                      size={size}
                      position={position}
                      onResize={handleResize}
                      onMove={handleMove}
                      onRemove={handleRemove}
                    />
                  );
                })}
              </View>
            </>
          )}
        />
      </View>
    );
  });
  
  const styles = StyleSheet.create({
    draxContainer: {
      marginTop: 20,
    },
    centeredContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    receivingZone: {
      height: 300,
      borderRadius: 10,
      marginVertical: 10,
      backgroundColor: '#f0f0f0',
      borderWidth: 2,
      borderColor: '#ccc',
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