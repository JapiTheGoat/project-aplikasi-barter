// TradingDemandScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TradingDemand from '../components/TradingDemand';

const TradingDemandScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trading Demand</Text>
      <TradingDemand />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', padding: 15, textAlign: 'center' },
});

export default TradingDemandScreen;