import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Chip, Text ,Button } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { styles } from './styles';

const popularTags = ['#Casual', '#Formal', '#Business', '#Party', '#Sports', '#Wedding', '#Vacation', '#Beach', '#Date_Night', '#Festive'];

const TagFilter = ({ selectedTags, handleTagSelect, isTagCollapsed, setIsTagCollapsed }) => (
  <>
    <TouchableOpacity onPress={() => setIsTagCollapsed(!isTagCollapsed)}>
      <View style={styles.filterCapsule}>
        <Text style={styles.header}>Filter by Tag</Text>
        {selectedTags.length !== 0 && <Button icon="filter"/>}
      </View>
    </TouchableOpacity>
    <Collapsible collapsed={isTagCollapsed}>
      <View style={styles.chipContainer}>
        {popularTags.map((tag) => (
          <Chip
            key={tag}
            mode={selectedTags.includes(tag) ? 'outlined' : 'flat'}
            selected={selectedTags.includes(tag)}
            onPress={() => handleTagSelect(tag)}
            style={styles.chip}
          >
            {tag}
          </Chip>
        ))}
      </View>
    </Collapsible>
  </>
);

export default TagFilter;
