// MostTradedScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MostTraded from '../components/MostTraded';

const MostTradedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Traded Items</Text>
      <MostTraded />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', padding: 15, textAlign: 'center' },
});

export default MostTradedScreen;