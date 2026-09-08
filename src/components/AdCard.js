import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const AdCard = ({ ad }) => {
  return (
    <TouchableOpacity style={styles.adContainer}>
      <Image source={{ uri: ad.image }} style={styles.adImage} />
      <View style={styles.adTextContainer}>
        <Text style={styles.adTitle}>{ad.title}</Text>
        <Text style={styles.adDescription}>{ad.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
    alignItems: 'center',
  },
  adImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  adTextContainer: {
    flex: 1,
  },
  adTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000000',
  },
  adDescription: {
    fontSize: 12,
    color: '#666666',
  },
});

export default AdCard;