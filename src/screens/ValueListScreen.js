// ValueListScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ValueList from '../components/ValueList';

const ValueListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Value List</Text>
      <ValueList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', padding: 15, textAlign: 'center' },
});

export default ValueListScreen;