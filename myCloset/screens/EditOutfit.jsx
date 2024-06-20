import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView ,Dimensions } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import { DraxProvider } from 'react-native-drax';
import MovableAndResizableSquare from '../components/MovableAndResizableSquare';
import { uploadImage } from '../config/cloudinary';
import ClothesGrid from '../components/ClothesGrid';
import CategoryList from '../components/CategotyList';
import SubCategoryList from '../components/SubCategoryList';
import { categories } from '../assets/data/categories';
const { height } = Dimensions.get('window');


const EditOutfit = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { season, outfit } = route.params;

    const [selectedCategory, setSelectedCategory] = useState('Tops');
    const [clothesData, setClothesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [itemsId, setItemsId] = useState([]);
    const [outfitItem, setOutfitItem] = useState([]);
    const [colorPalette, setColorPalette] = useState([]);
    const [sizes, setSizes] = useState(new Map());
    const [positions, setPositions] = useState(new Map());
    const [imgUrl, setImgUrl] = useState('');
    const [itemsSource, setItemsSource] = useState(new Map());
    const viewShotRef = useRef(null);

    const handleCardPress = (category) => {
        setSelectedCategory(category);
    };

    const handleSubCategory = (subCategory) => {
        setSelectedSubCategory(subCategory);
    };

    const handleImagePress = (item) => {
        addNewItem(item);
    };
    const selectedCategoryData = categories.find((category) => category.label === selectedCategory);
    useEffect(() => {
        if (outfit) {
            setItemsId(outfit.itemsId);
            setColorPalette(outfit.colorPalette);
            setSizes(new Map(Object.entries(outfit.sizes)));
            setPositions(new Map(Object.entries(outfit.positions)));
            setImgUrl(outfit.imgUrl);
            setItemsSource(new Map(Object.entries(outfit.itemsSource)));
            setLoading(false);
        }
    }, [outfit]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://mycloset-backend-hnmd.onrender.com/api/closet/mohissen1234');
                setClothesData(new Map(Object.entries(response.data.categories)));

                const newOutfitItems = itemsId.map((itemId) => {
                    const itemSource = itemsSource.get(itemId);
                    if (itemSource) {
                        const { category, subCategory } = itemSource;
                        if (response.data.categories[category] && response.data.categories[category][subCategory]) {
                            return response.data.categories[category][subCategory][itemId];
                        }
                    }
                    return null;
                }).filter(item => item !== null); // Filter out any null values

                setOutfitItem(newOutfitItems);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedCategory, itemsId, itemsSource]);

    const handleSave = async (saveAsNew = false) => {
        try {
            const uri = await viewShotRef.current.capture();
            const uploadResponse = await uploadImage(uri);
            const imgUrl = uploadResponse.secure_url;

            const updatedOutfit = {
                itemsId,
                colorPalette,
                sizes: Object.fromEntries(sizes),
                positions: Object.fromEntries(positions),
                itemsSource: Object.fromEntries(itemsSource),
                imgUrl,
            };

            if (saveAsNew) {
                await axios.post(`https://mycloset-backend-hnmd.onrender.com/api/outfit/mohissen1234/${season}`, updatedOutfit, {
                    headers: { 'Content-Type': 'application/json' }
                });
                Alert.alert('Success', 'New outfit created successfully!');
            } else {
                await axios.put(`https://mycloset-backend-hnmd.onrender.com/api/outfit/mohissen1234/${season}/${outfit._id}`, updatedOutfit, {
                    headers: { 'Content-Type': 'application/json' }
                });
                Alert.alert('Success', 'Outfit updated successfully!');
            }

            navigation.goBack();
        } catch (error) {
            console.error('Error saving outfit:', error);
            Alert.alert('Error', 'Failed to save outfit');
        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Edit Outfit</Text>
            <DraxProvider>
                <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.8 }}>
                    <View style={styles.receivingZone}>
                        {outfitItem.map((item, index) => (
                            <MovableAndResizableSquare
                                key={index}
                                item={item}
                                size={sizes.get(item._id) || { width: 100, height: 100 }} // default size if not set
                                position={positions.get(item._id) || { x: 50, y: 50 }} // default position if not set
                                onResize={(id, newSize) => {
                                    setSizes(prevSizes => new Map(prevSizes).set(id, newSize));
                                }}
                                onMove={(id, x, y) => {
                                    setPositions(prevPositions => new Map(prevPositions).set(id, { x, y }));
                                }}
                                onRemove={(id) => {
                                    setItemsId(prevItemsId => prevItemsId.filter(itemId => itemId !== id));
                                    setSizes(prevSizes => {
                                        const newSizes = new Map(prevSizes);
                                        newSizes.delete(id);
                                        return newSizes;
                                    });
                                    setPositions(prevPositions => {
                                        const newPositions = new Map(prevPositions);
                                        newPositions.delete(id);
                                        return newPositions;
                                    });
                                    setItemsSource(prevItemsSource => {
                                        const newItemsSource = new Map(prevItemsSource);
                                        newItemsSource.delete(id);
                                        return newItemsSource;
                                    });
                                }}
                            />
                        ))}
                    </View>
                </ViewShot>
            </DraxProvider>
            <Button title="Save Changes" onPress={() => handleSave(false)} />
            <Button title="Save as New Outfit" onPress={() => handleSave(true)} />
            <View style={styles.scrollContainer}>
                <CategoryList selectedCategory={selectedCategory} handleCardPress={handleCardPress} />
                {selectedCategoryData && (
                    <SubCategoryList subOptions={selectedCategoryData.subOptions} handleSubCategory={handleSubCategory} />
                )}
                <ScrollView>
                    <ClothesGrid
                        clothesData={clothesData}
                        selectedCategory={selectedCategory}
                        selectedSubCategory={selectedSubCategory}
                        handleImagePress={handleImagePress}
                        loading={loading}
                    />
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    receivingZone: {
        height: 400,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    scrollContainer: {
        height: height * 0.5,
    },
});

export default EditOutfit;
