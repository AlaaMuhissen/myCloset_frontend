
import React ,{useEffect, useState} from 'react';
import { View, Text, StyleSheet ,Image ,TouchableOpacity} from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import PreviewModal from '../PreviewModal';
import { COLORS ,FONT } from '../../constants';
import { useAuthentication } from '../../utils/hooks/useAuthentication';

import moment from 'moment';

const HistoryCalendar = () => {
  const [inPreviewMode, setInPreviewMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));
  const [loading, setLoading] = useState(true);
  const { user } = useAuthentication();
  const today = moment().format('YYYY-MM-DD');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          setLoading(true);
          const response = await axios.get(`https://mycloset-backend-hnmd.onrender.com/api/outfit/history/${user.uid}`);
          if (response.data) {
            setHistory(response.data);
          } else {
            setHistory([]);
          }
        }
      } catch (error) {
        // console.error('Error fetching outfits:', error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Convert the history array to a dictionary for easier access
  const outfits = history.reduce((acc, record) => {
    const date = record.date.split('T')[0]; // Extract date part from ISO string
    if (record.outfits && record.outfits.length > 0) {
      acc[date] = record.outfits[0].outfitImg; // Assuming one outfit per date for simplicity
    }
    return acc;
  }, {});

  const onDayPress = (day) => {
    setSelectedDay(day.dateString);
    console.log('Selected day', day.dateString);
  };

  const handlePreview = () => {
    setInPreviewMode(true);
  };

  const renderDay = ({ date, state }) => {
    const outfitImg = outfits[date.dateString];

    return (
      <View style={[styles.dayContainer, state === 'disabled' && { backgroundColor: COLORS.lightGray }]}>
        <Text style={[styles.dayText, state === 'disabled' && styles.disabledText]}>
          {date.day}
        </Text>
        {outfitImg && (
          <TouchableOpacity onPress={() => handlePreview()}>
            <Image source={{ uri: outfitImg }} style={styles.outfitImage} />
          </TouchableOpacity>
        )}
        {outfitImg && inPreviewMode && (
          <PreviewModal
            visible={inPreviewMode}
            imgURL={outfitImg}
            content={null}
            onClose={() => setInPreviewMode(false)}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        style={styles.calendar}
        hideExtraDays
        markingType={'custom'}
        markedDates={{
          [today]: { selected: true, selectedColor: COLORS.tertiary },
          [selectedDay]: { selected: true, selectedColor: COLORS.primary },
          ...Object.keys(outfits).reduce((acc, date) => {
            acc[date] = { customStyles: { container: { backgroundColor: 'pink' } } };
            return acc;
          }, {}),
        }}
        dayComponent={renderDay}
        theme={{
          calendarBackground: COLORS.white,
          textSectionTitleColor: COLORS.gray2,
          selectedDayBackgroundColor: COLORS.tertiary,
          selectedDayTextColor: COLORS.white,
          todayTextColor: COLORS.primary,
          dayTextColor: COLORS.primary,
          textDisabledColor: COLORS.gray2,
          dotColor: COLORS.secondary,
          selectedDotColor: COLORS.white,
          arrowColor: COLORS.primary,
          monthTextColor: COLORS.primary,
          textDayFontFamily: FONT.regular,
          textMonthFontFamily: FONT.bold,
          textDayHeaderFontFamily: FONT.regular,
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 10,
  },
  calendar: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 20,
    height: 450, // Increase height for a larger calendar
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    // backgroundColor: COLORS.white,
    borderRadius: 5,
    margin: 2,
  },
  dayText: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONT.regular,
  },
  disabledText: {
    color: COLORS.gray2,
  },
  outfitImage: {
    width: 40,
    height: 40,
    marginTop: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 10,
    marginTop: 20,
    elevation: 4, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.gray,
    fontFamily: FONT.regular,
  },
  summaryValue: {
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
});





export default HistoryCalendar;
