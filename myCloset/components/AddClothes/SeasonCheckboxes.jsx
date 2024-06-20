import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

const SeasonCheckboxes = ({ selectedSeasons, allSeasonsChecked, onAllSeasonsChange, onSeasonChange }) => {
  return (
    <View style={styles.checkboxContainer}>
      <View style={styles.checkboxRow}>
        <Checkbox
          value={allSeasonsChecked}
          onValueChange={onAllSeasonsChange}
        />
        <Text>All Seasons</Text>
      </View>
      {seasons.map(season => (
        <View key={season} style={styles.checkboxRow}>
          <Checkbox
            value={!!selectedSeasons[season]}
            onValueChange={() => onSeasonChange(season)}
          />
          <Text>{season}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SeasonCheckboxes;
