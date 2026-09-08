import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TradingDemand = () => {
  const demandData = [
    { category: 'Elektronik', demand: 85 },
    { category: 'Furniture', demand: 40 },
    { category: 'Olahraga', demand: 65 },
    { category: 'Lainnya', demand: 30 },
  ];

  return (
    <View style={styles.container}>
      {demandData.map((item, index) => (
        <View key={index} style={styles.barContainer}>
          <Text style={styles.label}>{item.category}</Text>
          <View style={styles.barBackground}>
            <View style={[styles.barFill, { width: `${item.demand}%` }]} />
          </View>
          <Text style={styles.percent}>{item.demand}%</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    flex: 1,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    width: 80,
    fontSize: 14,
    color: '#333333',
  },
  barBackground: {
    flex: 1,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#333333',
  },
  percent: {
    width: 50,
    textAlign: 'right',
    marginLeft: 5,
    color: '#333333',
  },
});

export default TradingDemand;