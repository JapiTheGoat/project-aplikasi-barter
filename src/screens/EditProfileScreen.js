import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

const EditProfileScreen = ({ navigation }) => {
  const { user, updateProfile } = useAuth();
  const [username, setUsername] = useState(user ? user.username : '');
  const [description, setDescription] = useState(user ? user.description || '' : '');
  const [tags, setTags] = useState(user && user.tags ? user.tags.join(', ') : '');
  const [profilePic, setProfilePic] = useState(user ? user.profilePic || '' : '');

  const handleSave = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Username tidak boleh kosong');
      return;
    }
    const tagsArray = tags.split(',').map((t) => t.trim()).filter(Boolean);
    const updated = {
      username: username.trim(),
      description: description.trim(),
      tags: tagsArray,
      profilePic: profilePic.trim(),
    };
    await updateProfile(updated);
    Alert.alert('Sukses', 'Profil berhasil diperbarui');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Username" placeholderTextColor="#999" />
      <Text style={styles.label}>Deskripsi</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Deskripsi singkat" placeholderTextColor="#999" multiline />
      <Text style={styles.label}>Tags (pisahkan dengan koma)</Text>
      <TextInput style={styles.input} value={tags} onChangeText={setTags} placeholder="contoh: elektronik, gadget" placeholderTextColor="#999" />
      <Text style={styles.label}>URL Foto Profil</Text>
      <TextInput style={styles.input} value={profilePic} onChangeText={setProfilePic} placeholder="https://..." placeholderTextColor="#999" />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#111' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#111',
  },
  saveButton: { backgroundColor: '#333', padding: 15, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default EditProfileScreen;