import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { valueListData } from '../data/dummyData';

const ValueList = () => {
  return (
    <FlatList
      data={valueListData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.detail}>Demand: {item.demand}</Text>
          <Text style={styles.detail}>Kondisi: {item.condition}</Text>
          <Text style={styles.detail}>True Value: {item.trueValue}% dari harga baru</Text>
          <Text style={styles.detail}>Contoh: {item.example}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#111111',
  },
  detail: {
    fontSize: 14,
    color: '#555555',
  },
});

export default ValueList;