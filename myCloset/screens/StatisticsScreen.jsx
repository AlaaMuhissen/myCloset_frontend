import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Dimensions ,Image} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Card, Title, Paragraph } from 'react-native-paper';
import { COLORS, FONT } from '../constants';
import Carousel from 'react-native-snap-carousel';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import Header from '../components/Header';

const StatisticsScreen = () => {
  const [statistics, setStatistics] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const { user } = useAuthentication();
  useEffect(() => {
    // Fetch the statistics data from your API
    const fetchData = async () => {
      try {
        if(user){
          const response = await fetch(`https://mycloset-backend-hnmd.onrender.com/api/closet/user-statistics/${user.uid}/1`);
          const data = await response.json();
          setStatistics(data);

        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user]);

  if (!statistics) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Prepare data for charts
  const totalItemsData = {
    labels: Object.keys(statistics.totalItems),
    datasets: [
      {
        data: Object.values(statistics.totalItems),
      },
    ],
  };

  const seasonalWearData = Object.entries(statistics.seasonalWear).map(([key, value]) => ({
    name: key,
    population: value,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));



  const fabricDistributionData = Object.entries(statistics.fabricDistribution).map(([fabric, count]) => ({
    name: fabric,
    population: count,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  const tagUsageData = Object.entries(statistics.tagUsage).map(([tag, count]) => ({
    name: tag,
    population: count,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));
  
 
  const carouselItems = [
    {
      title: "Seasonal Wear",
      chart: (
        <PieChart
          data={seasonalWearData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )
    },
    {
      title: "Fabric Distribution",
      chart: (
        <PieChart
          data={fabricDistributionData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )
    },
    {
        title: "Tag Usage",
        chart: (
          <PieChart
            data={tagUsageData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        )
      }
  ];

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style = {styles.title}>{item.title}</Title>
        {item.chart}
      </Card.Content>
    </Card>
  );
  return (
    <ScrollView style={styles.container}>
     <Header name={'Wardrobe Statistics'} />
      <Card style={styles.card}>
        <Card.Content style={{paddingRight : 30, flexDirection: 'row' ,justifyContent: 'space-between' , alignItems : 'center' }}>

          <Title style = {styles.title} >New Additions</Title>
          <Text style= {{}}>{statistics.newAdditions}</Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title style = {styles.title}>Total Items</Title>
          <View style={{ flexDirection: 'row' }}>
         
            <ScrollView horizontal contentContainerStyle={{ width: (screenWidth ) * 2 }}>
              <BarChart
                data={totalItemsData}
                width={screenWidth * 2} 
                height={400}
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                style={{
                  marginVertical: 20,
                  borderRadius: 16,
                }}
              
         
                withHorizontalLabels ={false}
                showValuesOnTopOfBars = {true}
              />
            </ScrollView>
            </View>
        </Card.Content>
      </Card>

      <ScrollView >
      { Object.keys(statistics.fabricDistribution).length !== 0  && <Carousel
        data={carouselItems}
        renderItem={renderItem}
        sliderWidth={screenWidth -40}
        itemWidth={screenWidth - 40}
      />
}
    </ScrollView>

      {Object.keys(statistics.mostWornItems).length !== 0  &&<Text style={styles.subHeader}>Most Worn Items</Text>}
        <ScrollView horizontal>
        {Object.entries(statistics.mostWornItems).map(([key, item]) => (
            <Card style={styles.horizontalCard} key={item.itemId}>
            <Card.Content>
                <Image source={{ uri: item.item.imgUrl }} style={styles.cardImage}/>
                <Title>{key}</Title>
                <Paragraph>Fabric: {item.item.fabric}</Paragraph>
                <Paragraph>Tags: {item.item.tags.join(', ')}</Paragraph>
                <Paragraph>Worn Count: {item.count}</Paragraph>
            </Card.Content>
            </Card>
        ))}
        </ScrollView>

     { Object.keys(statistics.leastWornItems).length !== 0  &&<Text style={styles.subHeader}>Least Worn Items</Text>}
      <ScrollView horizontal>
            {Object.entries(statistics.leastWornItems).map(([key, item]) => (
                <Card style={styles.horizontalCard} key={item.itemId}>
              
                <Card.Content>
                <Image source={{ uri: item.item.imgUrl }} style={styles.cardImage}/>
                    <Title>{key}</Title>
                    <Paragraph>Fabric: {item.item.fabric}</Paragraph>
                    <Paragraph>Tags: {item.item.tags.join(', ')}</Paragraph>
                    <Paragraph>Worn Count: {item.count}</Paragraph>
                </Card.Content>
                </Card>
            ))}
            </ScrollView>

   { Object.keys(statistics.unusedItems).length !== 0  && <Text style={styles.subHeader}>Unused Items</Text>}
      <ScrollView horizontal>
      {Object.entries(statistics.unusedItems).map(([key, items]) =>
        items.map((item) => (
          <Card style={styles.horizontalCard} key={item.itemId}>
           
            <Card.Content>
            <Image source={{ uri: item.item.imgUrl }} style={styles.cardImage}/>
              <Title>{key}</Title>
              <Paragraph>Fabric: {item.item.fabric}</Paragraph>
              <Paragraph>Tags: {item.item.tags.join(', ')}</Paragraph>
            </Card.Content>
          </Card>
        ))
      )}
      </ScrollView>

    
    </ScrollView>
  );
};

const chartConfig = {
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
      padding:20
    },
    barPercentage: 0.7,
    barRadius: 5,
    
    fillShadowGradient: '#000', // Customize the gradient color for bars
    fillShadowGradientOpacity: 1,
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 20,
    fontFamily : FONT.bold,
    color : COLORS.primary
  },
  subHeader: {
    fontSize: 20,
    fontFamily : FONT.bold,
    marginTop: 20,
    marginBottom: 10,
    color : COLORS.primary
  },
  horizontalCard: {
    width: 250, // Set a fixed width for horizontal scrolling
    marginRight: 15, // Add some spacing between cards
    borderRadius: 16,
    marginBottom:30
  },
  cardImage: {
    height: 150, // Set a fixed height for images
    resizeMode: 'contain',
  },
  card: {
    marginBottom: 20,
    borderRadius: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yAxisLabel: {
    textAlign: 'center',
  },
});

export default StatisticsScreen;
