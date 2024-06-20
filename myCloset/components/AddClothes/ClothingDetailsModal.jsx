import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { categories } from '../../assets/data/categories'; 
import ColorPickerModal from './ColorPickerModal';
import Collapsible from 'react-native-collapsible';

const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

const EditClothingDetailsModal = ({
  visible,
  result,
  selectedLabel,
  setSelectedLabel,
  colorPalette,
  setColorPalette,
  selectedSeasons,
  handleSeasonChange,
  allSeasonsChecked,
  onLabelChange,
  handleAllSeasonsChange,
  handleSave,
  handleCloseModal,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  
}) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [isCategoryCollapsed, setCategoryCollapsed] = useState(true);
  const [isColorCollapsed, setColorCollapsed] = useState(true);
  const [isSeasonCollapsed, setSeasonCollapsed] = useState(true);

  useEffect(() => {
    const category = categories.find(cat =>
      cat.subOptions.some(sub => sub.label === selectedLabel)
    );
    if (category) {
      setSelectedCategory(category.label);
    }
  }, [selectedLabel]);

  const handleCategoryChange = (categoryLabel) => {
    setSelectedCategory(categoryLabel);
    setSelectedSubCategory(categories.find(cat => cat.label === categoryLabel).subOptions[0].label);
  };

  const handleSubCategoryChange = (subLabel) => {
    setSelectedSubCategory(subLabel);
    onLabelChange(subLabel);
  };

  const handleRemoveColor = (index) => {
    const newColorPalette = [...colorPalette];
    newColorPalette.splice(index, 1);
    setColorPalette(newColorPalette);
  };

  const handleAddColor = (color) => {
    setColorPalette([...colorPalette, color]);
    setColorPickerVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalText}>Edit Clothing Details</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {result.image_without_background_url && (
              <Image source={{ uri: result.image_without_background_url }} style={styles.image} />
            )}

            <TouchableOpacity onPress={() => setCategoryCollapsed(!isCategoryCollapsed)} style={styles.header}>
              <View style={styles.collapsibleContainer}>
            <Text style={styles.headerText}>Category </Text>
            <Text style={styles.headerSelected}>
              {isCategoryCollapsed 
                ? `${selectedCategory || 'Select Category'} / ${selectedSubCategory || 'Select Subcategory'}` 
                : ''}
            </Text>
            </View>
            </TouchableOpacity>
            <Collapsible collapsed={isCategoryCollapsed}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCategory}
                  style={styles.picker}
                  onValueChange={handleCategoryChange}
                  itemStyle={styles.pickerItem}
                >
                  {categories.map(category => (
                    <Picker.Item key={category.label} label={category.label} value={category.label} />
                  ))}
                </Picker>
                <Picker
                  selectedValue={selectedSubCategory}
                  style={styles.picker}
                  onValueChange={handleSubCategoryChange}
                  itemStyle={styles.pickerItem}
                >
                  {selectedCategory && categories.find(cat => cat.label === selectedCategory).subOptions.map(subOption => (
                    <Picker.Item key={subOption.label} label={subOption.label} value={subOption.label} />
                  ))}
                </Picker>
              </View>
            </Collapsible>

            <TouchableOpacity onPress={() => setColorCollapsed(!isColorCollapsed)} style={styles.header}>
              <View style= {styles.collapsibleContainer}>
              <Text style={styles.headerText}>Colors</Text>
              {isColorCollapsed && (
                <View style={styles.headerColors}>
                  {colorPalette.map((color, index) => (
                    <View key={index} style={[styles.headerColorSquare, { backgroundColor: color }]} />
                  ))}
                </View>
              )}
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={isColorCollapsed}>
              <View style={styles.colorContainer}>
                {colorPalette.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.colorSquare, { backgroundColor: color }]}
                    onPress={() => handleRemoveColor(index)}
                  />
                ))}
                <TouchableOpacity style={styles.addColorSquare} onPress={() => setColorPickerVisible(true)}>
                  <Text style={styles.addColorText}>+</Text>
                </TouchableOpacity>
              </View>
            </Collapsible>


            <TouchableOpacity onPress={() => setSeasonCollapsed(!isSeasonCollapsed)} style={styles.headerSeason}>
              <View style= {styles.collapsibleContainer}>
              <Text style={styles.headerTextSeason}>Seasons</Text>
              {isSeasonCollapsed && (
                <Text style={styles.headerSelected}>
                  {seasons.filter(season => selectedSeasons[season]).join(', ')}
                </Text>
              )}
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={isSeasonCollapsed}>
              <View style={styles.checkboxContainer}>
                <View style={styles.checkboxRow}>
                  <Checkbox
                    value={allSeasonsChecked}
                    onValueChange={handleAllSeasonsChange}
                  />
                  <Text style={{ fontSize: 12, margin: 5 }}>All Seasons</Text>
                </View>
                {seasons.map(season => (
                  <View key={season} style={styles.checkboxRow}>
                    <Checkbox
                      value={!!selectedSeasons[season]}
                      onValueChange={() => handleSeasonChange(season)}
                    />
                    <Text style={{ fontSize: 12, margin: 10 }}>{season}</Text>
                  </View>
                ))}
              </View>
            </Collapsible>

            <ColorPickerModal
              visible={colorPickerVisible}
              handleAddColor={handleAddColor}
              setColorPickerVisible={setColorPickerVisible}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleSave}
            >
              <Text style={styles.textStyle}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  header: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    width: '100%',
    marginTop: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  picker: {
    height: 'auto',
    width: '48%',
  },
  pickerItem: {
    fontSize: 14,
  },
  colorContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorSquare: {
    width: 30,
    height: 30,
    margin: 5,
  },
  addColorSquare: {
    width: 30,
    height: 30,
    margin: 5,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addColorText: {
    fontSize: 20,
    color: '#888',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerColors: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  headerColorSquare: {
    width: 15,
    height: 15,
    marginHorizontal: 2,
    borderRadius: 3,
  },
  headerSeason: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextSeason: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSelected :{
    fontSize: 11,
    color: '#ccc'
  },
  collapsibleContainer : {
    flex : 1,
    flexDirection :'row',
    justifyContent :'space-between',
    alignContent : 'center'
  }
});

export default EditClothingDetailsModal;
