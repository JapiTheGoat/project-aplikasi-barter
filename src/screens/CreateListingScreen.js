import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useTrade } from '../context/TradeContext';

const CreateListingScreen = ({ navigation }) => {
  const { createListing } = useTrade();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Elektronik');
  const [condition, setCondition] = useState('Baik');
  const [price, setPrice] = useState('');
  const [demand, setDemand] = useState('Sedang');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !price.trim() || !location.trim()) {
      Alert.alert('Error', 'Judul, harga, dan lokasi wajib diisi');
      return;
    }
    const priceNum = parseFloat(price.replace(/[^0-9]/g, ''));
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Harga tidak valid');
      return;
    }

    const listingData = {
      title: title.trim(),
      description: description.trim(),
      category,
      condition,
      price: priceNum,
      demand,
      location: location.trim(),
      trueValue: priceNum,
    };

    createListing(listingData);
    Alert.alert('Sukses', 'Listing berhasil ditambahkan');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Judul Barang *</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: Laptop ASUS ROG"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Deskripsi singkat"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Kategori</Text>
      <View style={styles.pickerContainer}>
        {['Elektronik', 'Furniture', 'Olahraga', 'Lainnya'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.pickerChip, category === cat && styles.pickerChipActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.pickerText, category === cat && styles.pickerTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Kondisi</Text>
      <View style={styles.pickerContainer}>
        {['Sangat Baik', 'Baik', 'Cukup Baik'].map((cond) => (
          <TouchableOpacity
            key={cond}
            style={[styles.pickerChip, condition === cond && styles.pickerChipActive]}
            onPress={() => setCondition(cond)}
          >
            <Text style={[styles.pickerText, condition === cond && styles.pickerTextActive]}>
              {cond}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Harga (Rp) *</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Contoh: 7500000"
        placeholderTextColor="#999"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Demand</Text>
      <View style={styles.pickerContainer}>
        {['Tinggi', 'Sedang', 'Rendah'].map((dem) => (
          <TouchableOpacity
            key={dem}
            style={[styles.pickerChip, demand === dem && styles.pickerChipActive]}
            onPress={() => setDemand(dem)}
          >
            <Text style={[styles.pickerText, demand === dem && styles.pickerTextActive]}>
              {dem}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Lokasi *</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: Jakarta"
        placeholderTextColor="#999"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Tambahkan Listing</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#111',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#111',
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  pickerChip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  pickerChipActive: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  pickerText: {
    fontSize: 14,
    color: '#333',
  },
  pickerTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateListingScreen;