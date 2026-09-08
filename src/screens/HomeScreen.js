import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileIcon from '../components/ProfileIcon';
import NotificationIcon from '../components/NotificationIcon';
import ChatIcon from '../components/ChatIcon';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import AdCard from '../components/AdCard';
import ListingCard from '../components/ListingCard';
import MenuCard from '../components/MenuCard';
import { useTrade } from '../context/TradeContext';

const adData = {
  id: 'ad1',
  title: 'Iklan: Jual Cepat Laptop',
  description: 'Dapatkan diskon 10% untuk trade-in laptop bekas Anda!',
};

const HomeScreen = ({ navigation }) => {
  const { items } = useTrade();
  const [category, setCategory] = useState('Semua');
  const [condition, setCondition] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) => {
    const matchCategory = category === 'Semua' || item.category === category;
    const matchCondition = condition === 'Semua' || item.condition === condition;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchCondition && matchSearch;
  });

  const handleSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trade Barang Bekas</Text>
        <View style={styles.headerIcons}>
          <ChatIcon />
          <NotificationIcon />
          <ProfileIcon />
        </View>
      </View>
      <ScrollView>
        <AdCard ad={adData} />
        <SearchBar onSearch={handleSearch} />
        <FilterBar
          selectedCategory={category}
          selectedCondition={condition}
          onCategoryChange={setCategory}
          onConditionChange={setCondition}
        />
        <View style={styles.menuContainer}>
          <MenuCard title="Most Traded Item" icon="📊" screen="MostTraded" />
          <MenuCard title="Kalkulator Tax" icon="🧮" screen="Calculator" />
          <MenuCard title="Value List" icon="📋" screen="ValueList" />
          <MenuCard title="Trading Demand" icon="📈" screen="TradingDemand" />
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateListing')}
        >
          <Text style={styles.createButtonText}>+ Buat Listing Baru</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Listing Trade</Text>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <ListingCard key={item.id} item={item} />)
        ) : (
          <Text style={styles.emptyText}>Tidak ada barang ditemukan.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  createButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    color: '#111111',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888888',
  },
});

export default HomeScreen;