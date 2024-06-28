import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Chip, Text ,Button } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { styles } from './styles';
import {fabrics} from '../../assets/data/fabrics'
const FabricFilter = ({ selectedFabric, handleFabricSelect, isFabricCollapsed, setIsFabricCollapsed }) => (
  <>
    <TouchableOpacity onPress={() => setIsFabricCollapsed(!isFabricCollapsed)}>
      <View style={styles.filterCapsule}>
        <Text style={styles.header}>Filter by Fabric</Text>
        {selectedFabric && <Button icon="filter"/>}
      </View>
    </TouchableOpacity>
    <Collapsible collapsed={isFabricCollapsed}>
      <View style={styles.chipContainer}>
        {fabrics.map((fabric) => (
          <Chip
            key={fabric.fabricName}
            mode={selectedFabric === fabric.fabricName ? 'outlined' : 'flat'}
            selected={selectedFabric === fabric.fabricName}
            onPress={() => handleFabricSelect(fabric.fabricName)}
            style={styles.chip}
            avatar={<Avatar.Image size={24} source={fabric.fabricImg} />}
          >
            {fabric.fabricName}
          </Chip>
        ))}
      </View>
    </Collapsible>
  </>
);

export default FabricFilter;
