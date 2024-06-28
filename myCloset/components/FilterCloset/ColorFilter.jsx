import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text ,Button} from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { styles } from './styles';

const ColorFilter = ({ allColors, selectedColors, handleColorSelect, isColorCollapsed, setIsColorCollapsed }) => (
  <>
    <TouchableOpacity onPress={() => setIsColorCollapsed(!isColorCollapsed)}>
      <View style={styles.filterCapsule}>
        <Text style={styles.header}>Filter by Color</Text>
        {selectedColors.length !== 0 && <Button icon="filter"/>}
      </View>
    </TouchableOpacity>
    <Collapsible collapsed={isColorCollapsed}>
      <View style={styles.colorContainer}>
        {allColors.map((color) => (
          <View
            key={color}
            style={[
              styles.colorCircle,
              { backgroundColor: color },
              selectedColors.includes(color) && styles.selectedColorCircle,
            ]}
            onStartShouldSetResponder={() => true}
            onResponderRelease={() => handleColorSelect(color)}
          />
        ))}
      </View>
    </Collapsible>
  </>
);

export default ColorFilter;
