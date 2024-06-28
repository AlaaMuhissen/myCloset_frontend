import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Chip, Text ,Button} from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { styles } from './styles';

const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

const SeasonFilter = ({ selectedSeasons, handleSeasonSelect, isSeasonCollapsed, setIsSeasonCollapsed }) => (
  <>
    <TouchableOpacity onPress={() => setIsSeasonCollapsed(!isSeasonCollapsed)}>
      <View style={styles.filterCapsule}>
        <Text style={styles.header}>Filter by Season</Text>
        {selectedSeasons.some(season => season === 1) && <Button icon="filter"/>}
      </View>
    </TouchableOpacity>
    <Collapsible collapsed={isSeasonCollapsed}>
      <View style={styles.chipContainer}>
        {seasons.map((season, index) => (
          <Chip
            key={season}
            mode={selectedSeasons[index] === 1 ? 'outlined' : 'flat'}
            selected={selectedSeasons[index] === 1}
            onPress={() => handleSeasonSelect(index)}
            style={styles.chip}
          >
            {season}
          </Chip>
        ))}
      </View>
    </Collapsible>
  </>
);

export default SeasonFilter;
