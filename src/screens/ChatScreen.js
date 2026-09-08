import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const chatData = [
  { id: '1', name: 'Budi', lastMessage: 'Apakah laptop masih ada?', time: '10:00' },
  { id: '2', name: 'Ani', lastMessage: 'Saya tertarik dengan sepedanya', time: '09:30' },
  { id: '3', name: 'Candra', lastMessage: 'Bisa nego harga kamera?', time: 'Kemarin' },
];

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={styles.chatInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: { color: '#fff', fontWeight: 'bold' },
  chatInfo: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#111' },
  lastMessage: { fontSize: 14, color: '#555' },
  time: { fontSize: 12, color: '#888' },
});

export default ChatScreen;