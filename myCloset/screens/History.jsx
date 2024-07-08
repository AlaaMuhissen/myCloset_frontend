
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import HistoryCalendar from '../components/Home/HistoryCalendar';

export const History = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HistoryCalendar/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


