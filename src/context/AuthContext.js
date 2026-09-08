import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dummyUsers } from '../data/dummyData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await seedUsers();
      await loadUser();
      setLoading(false);
    };
    initialize();
  }, []);

  // Seed dummy users jika belum ada
  const seedUsers = async () => {
    try {
      const stored = await AsyncStorage.getItem('@users');
      let users = stored ? JSON.parse(stored) : [];

      // Jika belum ada user sama sekali, pakai dummyUsers
      if (users.length === 0) {
        users = [...dummyUsers];
      } else {
        // Jika sudah ada, tambahkan dummy users yang belum terdaftar
        dummyUsers.forEach((dummy) => {
          const exists = users.some((u) => u.username === dummy.username);
          if (!exists) {
            users.push(dummy);
          }
        });
      }

      await AsyncStorage.setItem('@users', JSON.stringify(users));
    } catch (e) {
      console.log(e);
    }
  };

  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem('@currentUser');
      if (stored) setUser(JSON.parse(stored));
    } catch (e) {
      console.log(e);
    }
  };

  const register = async (userData) => {
    const allUsers = await AsyncStorage.getItem('@users');
    let users = allUsers ? JSON.parse(allUsers) : [];
    if (users.find((u) => u.username === userData.username)) {
      throw new Error('Username sudah terdaftar');
    }
    users.push(userData);
    await AsyncStorage.setItem('@users', JSON.stringify(users));
    await AsyncStorage.setItem('@currentUser', JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (username, password) => {
    const allUsers = await AsyncStorage.getItem('@users');
    if (!allUsers) throw new Error('Belum ada pengguna terdaftar');
    const users = JSON.parse(allUsers);
    const found = users.find((u) => u.username === username && u.password === password);
    if (!found) throw new Error('Username atau password salah');
    await AsyncStorage.setItem('@currentUser', JSON.stringify(found));
    setUser(found);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@currentUser');
    setUser(null);
  };

  const updateProfile = async (updated) => {
    const allUsers = await AsyncStorage.getItem('@users');
    if (!allUsers) return;
    const users = JSON.parse(allUsers);
    const idx = users.findIndex((u) => u.username === user.username);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updated };
      await AsyncStorage.setItem('@users', JSON.stringify(users));
      await AsyncStorage.setItem('@currentUser', JSON.stringify(users[idx]));
      setUser(users[idx]);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};