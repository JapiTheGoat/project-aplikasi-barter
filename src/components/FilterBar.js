import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const categories = ['Semua', 'Elektronik', 'Furniture', 'Olahraga', 'Lainnya'];
const conditions = ['Semua', 'Sangat Baik', 'Baik', 'Cukup Baik'];

const FilterBar = ({ selectedCategory, selectedCondition, onCategoryChange, onConditionChange }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterChip,
                selectedCategory === cat && styles.filterChipActive,
              ]}
              onPress={() => onCategoryChange(cat)}
            >
              <Text style={[styles.filterText, selectedCategory === cat && styles.filterTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 5 }}>
        <View style={styles.filterRow}>
          {conditions.map((cond) => (
            <TouchableOpacity
              key={cond}
              style={[
                styles.filterChip,
                selectedCondition === cond && styles.filterChipActive,
              ]}
              onPress={() => onConditionChange(cond)}
            >
              <Text style={[styles.filterText, selectedCondition === cond && styles.filterTextActive]}>
                {cond}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  filterChip: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  filterChipActive: {
    backgroundColor: '#333333',
    borderColor: '#333333',
  },
  filterText: {
    fontSize: 14,
    color: '#333333',
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default FilterBar;