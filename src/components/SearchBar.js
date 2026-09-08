import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cari barang bekas..."
        placeholderTextColor="#999999"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchIcon}>🔍</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#111111',
  },
  searchButton: {
    padding: 5,
  },
  searchIcon: {
    fontSize: 18,
    color: '#333333',
  },
});

export default SearchBar;