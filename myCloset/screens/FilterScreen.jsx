import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import axios from 'axios';
import Header from '../components/Header';
import CategoryFilter from '../components/FilterCloset/CategoryFilter';
import FabricFilter from '../components/FilterCloset/FabricFilter ';
import SeasonFilter from '../components/FilterCloset/SeasonFilter';
import TagFilter from '../components/FilterCloset/TagFilter';
import ColorFilter from '../components/FilterCloset/ColorFilter';
import FilterModal from '../components/FilterCloset/FilterModal';
import { styles } from '../components/FilterCloset/styles';
import { useAuthentication } from '../utils/hooks/useAuthentication';

const FilterScreen = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [selectedSeasons, setSelectedSeasons] = useState([0, 0, 0, 0]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [isCategoryCollapsed, setIsCategoryCollapsed] = useState(true);
  const [isFabricCollapsed, setIsFabricCollapsed] = useState(true);
  const [isSeasonCollapsed, setIsSeasonCollapsed] = useState(true);
  const [isTagCollapsed, setIsTagCollapsed] = useState(true);
  const [isColorCollapsed, setIsColorCollapsed] = useState(true);
  const { user } = useAuthentication();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(user){

          setLoading(true);
          const response = await axios.get(`https://mycloset-backend-hnmd.onrender.com/api/closet/getAllColors/${user.uid}`);
          setAllColors(response.data);
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategorySelect = (label) => {
    setSelectedCategories((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleFabricSelect = (fabricName) => {
    setSelectedFabric(prev => prev === fabricName ? null : fabricName);
  };

  const handleSeasonSelect = (index) => {
    setSelectedSeasons((prev) => {
      const newSeasons = [...prev];
      newSeasons[index] = newSeasons[index] === 1 ? 0 : 1;
      return newSeasons;
    });
  };
  

  const handleTagSelect = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const handleColorSelect = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((item) => item !== color) : [...prev, color]
    );
  };

  const handleResetFiltering = () => {
    setFilteredItems([]);
    setSelectedColors([]);
    setSelectedCategories([]);
    setSelectedFabric(null);
    setSelectedTags([]);
    setSelectedSeasons([0, 0, 0, 0]);
  };

  const applyFilters = async () => {
    try {
      const data = {
        subCategories: selectedCategories,
        colors: selectedColors,
        seasons: selectedSeasons,
        tags: selectedTags,
        fabric: selectedFabric
      }
      const response = await axios.post(`https://mycloset-backend-hnmd.onrender.com/api/closet/filter/${user.uid}`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.data.length === 0) {
        handleResetFiltering();
        Alert.alert('OPPSSS!', 'There is No items like this!');
      } else {
        setFilteredItems(response.data);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header name={"Find Your Missing Items!"} icon={"refresh-outline"} onIconPress={handleResetFiltering} />
      <ScrollView style={styles.container}>
        <CategoryFilter
          selectedCategories={selectedCategories}
          handleCategorySelect={handleCategorySelect}
          isCategoryCollapsed={isCategoryCollapsed}
          setIsCategoryCollapsed={setIsCategoryCollapsed}
        />
        <Divider style={styles.divider} />
        <FabricFilter
          selectedFabric={selectedFabric}
          handleFabricSelect={handleFabricSelect}
          isFabricCollapsed={isFabricCollapsed}
          setIsFabricCollapsed={setIsFabricCollapsed}
        />
        <Divider style={styles.divider} />
        <SeasonFilter
          selectedSeasons={selectedSeasons}
          handleSeasonSelect={handleSeasonSelect}
          isSeasonCollapsed={isSeasonCollapsed}
          setIsSeasonCollapsed={setIsSeasonCollapsed}
        />
        <Divider style={styles.divider} />
        <TagFilter
          selectedTags={selectedTags}
          handleTagSelect={handleTagSelect}
          isTagCollapsed={isTagCollapsed}
          setIsTagCollapsed={setIsTagCollapsed}
        />
        <Divider style={styles.divider} />
        <ColorFilter
          allColors={allColors}
          selectedColors={selectedColors}
          handleColorSelect={handleColorSelect}
          isColorCollapsed={isColorCollapsed}
          setIsColorCollapsed={setIsColorCollapsed}
        />
      </ScrollView>
      <Button
        mode="contained"
        onPress={applyFilters}
        style={styles.applyButton}
        icon="filter"
      >
        Apply Filters
      </Button>
      <FilterModal
        filteredItems={filteredItems}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default FilterScreen;
