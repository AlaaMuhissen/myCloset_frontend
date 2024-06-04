import React, { forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DraxView } from 'react-native-drax';
import MovableAndResizableSquare from './MovableAndResizableSquare ';


const { width, height } = Dimensions.get('window');

const ReceivingZone = forwardRef(({ received, sizes, positions, handleResize, handleMove, handleRemove, addNewItem, resetPosition }, ref) => {
  const [initialPositions, setInitialPositions] = useState({});

  useEffect(() => {
    const initialPos = {};
    received.forEach(item => {
      if (!initialPositions[item.id]) {
        initialPos[item.id] = { x: positions[item.id]?.x || 0, y: positions[item.id]?.y || 0 };
      }
    });
    setInitialPositions(initialPos);
  }, [received]);

  const checkBoundsAndReset = (id, x, y) => {
    const zoneX = 0;
    const zoneY = 0;
    const zoneWidth = width;
    const zoneHeight = height * 0.5;

    if (x < zoneX || x > zoneWidth || y < zoneY || y > zoneHeight) {
      const initialPosition = initialPositions[id];
      if (initialPosition) {
        handleMove(id, initialPosition.x, initialPosition.y);
      }
    }
  };

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
                    onMove={(id, x, y) => {
                      handleMove(id, x, y);
                      checkBoundsAndReset(id, x, y);
                    }}
                    onRemove={handleRemove}
                    resetPosition={resetPosition}
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
    height: height * 0.5,
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