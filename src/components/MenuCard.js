import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuCard = ({ title, icon, screen }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(screen)}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
  },
  icon: {
    fontSize: 30,
    marginBottom: 8,
    color: '#333333',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111111',
  },
});

export default MenuCard;