
import React ,{useEffect, useState} from 'react';
import { View, Text, StyleSheet ,Image ,TouchableOpacity} from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import PreviewModal from '../PreviewModal';
import { COLORS } from '../../constants';

const HistoryCalendar = () => {
  const [inPreviewMode, setInPreviewMode] = useState(false);
  const [history,setHistory] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://mycloset-backend-hnmd.onrender.com/api/outfit/history/mohissen1234`);
        if (response.data) {
          setHistory(response.data);
        } else {
          setHistory([]);
        }
      } catch (error) {
        console.error('Error fetching outfits:', error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
   // Convert the history array to a dictionary for easier access
   const outfits = history.reduce((acc, record) => {
    const date = record.date.split('T')[0]; // Extract date part from ISO string
    if (record.outfits && record.outfits.length > 0) {
      acc[date] = record.outfits[0].outfitImg; // Assuming one outfit per date for simplicity
    }
    return acc;
  }, {});

  const onDayPress = (day) => {
    console.log('selected day', day);
  };
  const handlePreview = () => {
   
    setInPreviewMode(true);
  };

  const renderDay = ({ date, state }) => {
    const outfitImg = outfits[date.dateString];

    return (
      <View style={styles.dayContainer}>
        <Text style={[styles.dayText, state === 'disabled' ? styles.disabledText : {}]}>
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
        markedDates={Object.keys(outfits).reduce((acc, date) => {
          acc[date] = { customStyles: { container: { backgroundColor: 'pink' } } };
          return acc;
        }, {})}
        dayComponent={renderDay}
        theme={{
          calendarBackground: COLORS.background,
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#ff6f61',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#ff6f61',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: '#fff',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  calendar: {
    marginBottom: 10,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 16,
    color: "#fff",
  },
  disabledText: {
    color: '#d9e1e8',
  },
  outfitImage: {
    width: 40,
    height: 40,
    marginTop: 5,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#888',
  },
  summaryValue: {
    fontSize: 18,
    color: '#000',
  },
});

export default HistoryCalendar;
