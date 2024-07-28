import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView ,Dimensions } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { categories } from '../../assets/data/categories';
import { fabrics } from '../../assets/data/fabrics';
import Collapsible from 'react-native-collapsible';
import ColorPickerModal from './ColorPickerModal'
import { COLORS, FONT, SIZES } from '../../constants';
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
const { width, height } = Dimensions.get('window');
const popularTags = ['#Casual', '#Formal', '#Business', '#Party', '#Sports', '#Wedding', '#Vacation', '#Beach', '#Date_Night', '#Festive'];
const EditClothingDetailsModal = ({
  visible,
  result,
  editingMode,
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
  selectedFabric,
  setSelectedFabric,
  handleTagToggle,
  selectedTags
}) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [isCategoryCollapsed, setCategoryCollapsed] = useState(true);
  const [isColorCollapsed, setColorCollapsed] = useState(true);
  const [isSeasonCollapsed, setSeasonCollapsed] = useState(true);
  const [isFabricCollapsed, setFabricCollapsed] = useState(true);
  const [fabricPreviewVisible, setFabricPreviewVisible] = useState(false);
const [previewFabric, setPreviewFabric] = useState(null);
const [isTagsCollapsed, setTagsCollapsed] = useState(true);

const handleLongPress = (fabric) => {
  setPreviewFabric(fabric);
  setFabricPreviewVisible(true);
};

const formatNames = (name) => {
  
  if (name?.includes('_')) {
    return name.replace(/_/g, ' ');
  }
  return name;
};



  useEffect(() => {
    const category = categories.find(cat =>
      cat.subOptions.some(sub => sub.label === selectedSubCategory)
    );

    if (category) {
      setSelectedCategory(category.label);
    }
  }, [selectedSubCategory]);

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
           {!editingMode &&
           <>
           <TouchableOpacity onPress={() => setCategoryCollapsed(!isCategoryCollapsed)} style={styles.header}>
              <View style={styles.collapsibleContainer}>
                <Text style={styles.headerText}>Category </Text>
                <Text style={styles.headerSelected}>
                  {isCategoryCollapsed
                    ? `${formatNames(selectedCategory) || 'Select Category'} / ${formatNames(selectedSubCategory) || 'Select Subcategory'}`
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
                    <Picker.Item key={category.label} label={formatNames(category.label)} value={category.label} />
                  ))}
                </Picker>
                <Picker
                  selectedValue={selectedSubCategory}
                  style={styles.picker}
                  onValueChange={handleSubCategoryChange}
                  itemStyle={styles.pickerItem}
                >
                  {selectedCategory && categories.find(cat => cat.label === selectedCategory).subOptions.map(subOption => (
                    <Picker.Item key={subOption.label} label={formatNames(subOption.label)} value={subOption.label} />
                  ))}
                </Picker>
              </View>
            </Collapsible>
            </> 
            }
            <TouchableOpacity onPress={() => setColorCollapsed(!isColorCollapsed)} style={styles.header}>
              <View style={styles.collapsibleContainer}>
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
              <View style={styles.collapsibleContainer}>
              <Text style={styles.headerTextSeason}>Seasons</Text>
                {isSeasonCollapsed && (
                  <Text style={styles.headerSelected}>
                    {selectedSeasons.map((value, index) => value === 1 ? seasons[index] : null).filter(Boolean).join(', ')}
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
                            {seasons.map((season, index) => (
                  <View key={season} style={styles.checkboxRow}>
                    <Checkbox
                      value={selectedSeasons[index] === 1}
                      onValueChange={() => handleSeasonChange(index)}
                    />
                    <Text style={{ fontSize: 12, margin: 10 }}>{season}</Text>
                  </View>
                ))}
              </View>
            </Collapsible>

            <TouchableOpacity onPress={() => setFabricCollapsed(!isFabricCollapsed)} style={styles.header}>
              <View style={styles.collapsibleContainer}>
                <Text style={styles.headerText}>Fabric</Text>
                <Text style={styles.headerSelected}>{isFabricCollapsed ? selectedFabric : ''}</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={isFabricCollapsed}>
              <View style={styles.fabricsContainer}>
                {fabrics.map(fabric => (
                  <TouchableOpacity
              key={fabric.fabricName}
              style={[
                styles.fabricItem,
                selectedFabric === fabric.fabricName && styles.selectedFabric
              ]}
              onPress={() => setSelectedFabric(fabric.fabricName)}
              onLongPress={() => handleLongPress(fabric)}
            >
              <Image source={fabric.fabricImg} style={styles.fabricImage} />
              <Text style={styles.fabricName}>{formatNames(fabric.fabricName)}</Text>
            </TouchableOpacity>

              
                ))}
              </View>
            </Collapsible>
            {previewFabric && (
              <Modal
                animationType="fade"
                transparent={true}
                visible={fabricPreviewVisible}
                onRequestClose={() => setFabricPreviewVisible(false)}
              >
                <View style={styles.previewContainer}>
                  <View>
                  <Image source={previewFabric.fabricImg} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.previewCloseButton}
                    onPress={() => setFabricPreviewVisible(false)}
                  >
                    <View style = {{flex :1 , justifyContent : 'center' , alignItems: 'center'  ,position: 'absolute', top: 0 }}>

                    <Text style={styles.previewCloseText}>×</Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.previewText}>{previewFabric.fabricName}</Text>
                  </View>
                </View>
              </Modal>
            )}
            <TouchableOpacity onPress={() => setTagsCollapsed(!isTagsCollapsed)} style={styles.header}>
              <View style={styles.collapsibleContainer}>
                <Text style={styles.headerText}>Occasions</Text>
                {isTagsCollapsed && (
                  <View style= { { maxWidth : width * 0.5}}>
                  <Text style={styles.headerSelected}>
                    {selectedTags.join(', ')}
                  </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={isTagsCollapsed}>
              <View style={styles.tagsContainer}>
                {popularTags.map(tag => (
                  <TouchableOpacity
                    key={tag} 
                    style={[
                      styles.tagItem,
                      selectedTags.includes(tag) && styles.selectedTag
                    ]}
                    onPress={() => handleTagToggle(tag)}
                  >
                    <Text style={styles.tagText}>{formatNames(tag)}</Text>
                  </TouchableOpacity>
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
    color: COLORS.primary,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily :FONT.bold,
    fontSize : SIZES.medium
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
    borderRadius : 10
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
    flexWrap : 'wrap',
    marginVertical: 10,
  },
  colorSquare: {
    width: 30,
    height: 30,
    margin: 5,
    borderRadius: 5
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
    backgroundColor: COLORS.tertiary,
    marginTop: 10,
    paddingHorizontal:20,
    paddingVertical : 12
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerColors: {
    flexDirection: 'row',
    flexWrap : 'wrap',
    maxWidth : width * 0.5,
  },
  headerColorSquare: {
    width: 15,
    height: 15,
    marginHorizontal: 2,
    borderRadius: 3,
    margin: 3

  },
  headerSeason: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius :10
  },
  headerTextSeason: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSelected: {
    fontSize: 11,
    color: '#ccc',
    maxWidth : width * 0.4,
  },
  collapsibleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  fabricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    marginVertical: 10,
  },
  fabricItem: {
    alignItems: 'center',
    margin: 10,
  },
  selectedFabric: {
    borderColor: '#2196F3',
    borderWidth: 2,
    borderRadius: 5,
  },
  fabricImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  fabricName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  previewImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  previewCloseButton: {
    position: 'absolute',
    top : -10,
    right: -5,
    backgroundColor: '#111',
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  previewCloseText: {
    fontSize: 25,
    color: '#fff',
    
  },
  previewText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      // justifyContent: 'space-around',
      width :'100%' ,
      marginVertical: 10,
    },
    tagItem: {
      padding: 10,
      margin: 5,
      borderRadius: 20,
      backgroundColor: '#ddd',
    },
    selectedTag: {
      backgroundColor: '#2196F3',
    },
    tagText: {
      color: '#fff',
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginRight :10
    },
    headerSelected: {
      fontSize: 12,
      color: '#777',
    },
    collapsibleContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      
    },
 
});

export default EditClothingDetailsModal;
