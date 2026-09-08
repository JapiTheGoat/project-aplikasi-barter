import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTrade } from '../context/TradeContext';

const NotificationsScreen = ({ navigation }) => {
  const { notifications, markNotificationRead } = useTrade();

  const handlePress = (item) => {
    markNotificationRead(item.id);
    if (item.offerId && item.direction) {
      navigation.navigate('OfferDetail', {
        offerId: item.offerId,
        direction: item.direction,
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notification, !item.read && styles.unread]}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  notification: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: '#333333',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#111111',
  },
  message: {
    fontSize: 14,
    color: '#333333',
  },
  time: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
});

export default NotificationsScreen;