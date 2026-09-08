import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { calculateTax } from '../utils/taxCalculator';

const Calculator = () => {
  const [price, setPrice] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const numericPrice = parseFloat(price.replace(/[^0-9]/g, ''));
    if (!isNaN(numericPrice)) {
      setResult(calculateTax(numericPrice));
    } else {
      alert('Masukkan harga yang valid');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Harga Barang (Rp)</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: 7500000"
        placeholderTextColor="#999999"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Hitung Tax</Text>
      </TouchableOpacity>
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Tax Rate: {result.taxRate}%</Text>
          <Text style={styles.resultText}>Biaya Admin: Rp {result.adminFee.toLocaleString('id-ID')}</Text>
          <Text style={styles.resultText}>Total Tax: Rp {result.tax.toLocaleString('id-ID')}</Text>
          <Text style={styles.resultText}>Total Harga: Rp {result.total.toLocaleString('id-ID')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#111111',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    color: '#111111',
  },
  button: {
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333333',
  },
});

export default Calculator;