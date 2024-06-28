import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { List, Checkbox, Text , Button } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { styles } from './styles';
import { categories } from '../../assets/data/categories';
import { COLORS } from '../../constants';

const CategoryFilter = ({ selectedCategories, handleCategorySelect, isCategoryCollapsed, setIsCategoryCollapsed }) => (
  <>
    <TouchableOpacity onPress={() => setIsCategoryCollapsed(!isCategoryCollapsed)}>
      <View style={styles.filterCapsule}>
        <Text style={styles.header}>Filter by Category</Text>
        {selectedCategories.length !== 0 && <Button icon="filter"/>} 
      </View>
    </TouchableOpacity>
    <Collapsible collapsed={isCategoryCollapsed}>
      <View style={{ backgroundColor: '#fff', paddingHorizontal: 10, borderRadius: 10 }}>
        {categories.map((category) => (
          <List.Accordion
            key={category.label}
            title={category.label}
            titleStyle={styles.accordionTitle}
            left={(props) => <List.Icon {...props} icon="folder" style={styles.accordionIcon} />}
            style={styles.accordion}
          >
            {category.subOptions.map((subOption) => (
              <Checkbox.Item
                key={subOption.label}
                label={subOption.label}
                status={selectedCategories.includes(subOption.label) ? 'checked' : 'unchecked'}
                onPress={() => handleCategorySelect(subOption.label)}
                style={styles.checkboxItem}
                labelStyle={styles.checkboxLabel}
                color={COLORS.primary}
              />
            ))}
          </List.Accordion>
        ))}
      </View>
    </Collapsible>
  </>
);

export default CategoryFilter;
