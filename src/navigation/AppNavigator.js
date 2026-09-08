import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ListingDetailScreen from '../screens/ListingDetailScreen';
import OfferScreen from '../screens/OfferScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import ValueListScreen from '../screens/ValueListScreen';
import MostTradedScreen from '../screens/MostTradedScreen';
import TradingDemandScreen from '../screens/TradingDemandScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import OfferDetailScreen from '../screens/OfferDetailScreen';
import CreateListingScreen from '../screens/CreateListingScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={user ? 'Home' : 'Login'}
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#111111',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profil' }} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifikasi' }} />
          <Stack.Screen name="ListingDetail" component={ListingDetailScreen} options={{ title: 'Detail Barang' }} />
          <Stack.Screen name="Offer" component={OfferScreen} options={{ title: 'Penawaran Saya' }} />
          <Stack.Screen name="Calculator" component={CalculatorScreen} options={{ title: 'Kalkulator Tax' }} />
          <Stack.Screen name="ValueList" component={ValueListScreen} options={{ title: 'Value List' }} />
          <Stack.Screen name="MostTraded" component={MostTradedScreen} options={{ title: 'Most Traded' }} />
          <Stack.Screen name="TradingDemand" component={TradingDemandScreen} options={{ title: 'Trading Demand' }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
          <Stack.Screen name="OfferDetail" component={OfferDetailScreen} options={{ title: 'Detail Penawaran' }} />
          <Stack.Screen name="CreateListing" component={CreateListingScreen} options={{ title: 'Buat Listing Baru' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Daftar' }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;