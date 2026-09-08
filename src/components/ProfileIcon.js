import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const ProfileIcon = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Profile')}
    >
      {user?.profilePic ? (
        <Image source={{ uri: user.profilePic }} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user ? user.username.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222222',
  },
  avatarImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 1,
    borderColor: '#222222',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ProfileIcon;