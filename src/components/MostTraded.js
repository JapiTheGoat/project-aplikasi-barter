import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { mostTraded } from '../data/dummyData';

const MostTraded = () => {
  return (
    <FlatList
      data={mostTraded}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.icon}>{item.icon}</Text>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.count}>{item.count} kali ditradingkan</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
  },
  icon: {
    fontSize: 30,
    marginRight: 15,
    color: '#333333',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
  count: {
    fontSize: 14,
    color: '#666666',
  },
});

export default MostTraded;