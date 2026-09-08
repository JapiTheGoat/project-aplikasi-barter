import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarText}>{user ? user.username.charAt(0).toUpperCase() : 'U'}</Text>
        </View>
        <Text style={styles.name}>{user ? user.username : 'User Trade'}</Text>
        <Text style={styles.email}>{user ? user.description || 'Belum ada deskripsi' : ''}</Text>
        {user && user.tags && (
          <Text style={styles.tags}>{user.tags.join(', ')}</Text>
        )}
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Barang</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Penawaran</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Transaksi</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.buttonText}>Edit Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonOutline} onPress={logout}>
        <Text style={styles.buttonOutlineText}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20 },
  header: { alignItems: 'center', marginBottom: 30 },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: { fontSize: 30, color: '#ffffff', fontWeight: 'bold' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#111111' },
  email: { fontSize: 14, color: '#666666' },
  tags: { fontSize: 12, color: '#888', marginTop: 5 },
  stats: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#111111' },
  statLabel: { fontSize: 14, color: '#666666' },
  button: { backgroundColor: '#333333', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  buttonOutline: { borderWidth: 1, borderColor: '#333333', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonOutlineText: { color: '#333333', fontSize: 16, fontWeight: 'bold' },
});

export default ProfileScreen;