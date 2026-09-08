import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Calculator from '../components/Calculator';

const CalculatorScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kalkulator Tax Midman</Text>
      <Calculator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#111111' },
});

export default CalculatorScreen;