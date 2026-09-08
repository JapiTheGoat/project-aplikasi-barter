import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListingCard = ({ item }) => {
  const navigation = useNavigation();
  const formattedPrice = item.price ? item.price.toLocaleString('id-ID') : '0';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ListingDetail', { itemId: item.id })}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : null}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Rp {formattedPrice}</Text>
        <Text style={styles.condition}>Kondisi: {item.condition}</Text>
        <Text style={styles.demand}>Demand: {item.demand}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#111111',
  },
  price: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '600',
  },
  condition: {
    fontSize: 12,
    color: '#555',
  },
  demand: {
    fontSize: 12,
    color: '#888888',
  },
  location: {
    fontSize: 12,
    color: '#888888',
  },
});

export default ListingCard;