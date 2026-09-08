import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useTrade } from '../context/TradeContext';

const ListingDetailScreen = ({ route }) => {
  const { itemId } = route.params;
  const { items, userItems = [], addOutgoingOffer } = useTrade();
  const item = items.find((i) => i.id === itemId);

  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeItemId, setTradeItemId] = useState('');
  const [tradeNote, setTradeNote] = useState('');

  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyPrice, setBuyPrice] = useState('');
  const [buyMessage, setBuyMessage] = useState('');

  if (!item) {
    return (
      <View style={styles.notFound}>
        <Text style={{ color: '#111' }}>Barang tidak ditemukan</Text>
      </View>
    );
  }

  const handleTradeSubmit = () => {
    if (!tradeItemId) {
      Alert.alert('Error', 'Pilih barang yang akan ditawarkan');
      return;
    }
    const offeredItem = userItems.find((i) => i.id === tradeItemId);
    if (!offeredItem) {
      Alert.alert('Error', 'Barang tidak valid');
      return;
    }
    const offer = {
      id: Date.now().toString(),
      type: 'trade',
      itemTargetId: item.id,
      itemTargetTitle: item.title,
      offeredItemId: offeredItem.id,
      offeredItemTitle: offeredItem.title,
      estimatedValue: offeredItem.estimatedValue,
      note: tradeNote,
      status: 'pending',
      negotiation: [],
      createdAt: new Date().toLocaleString('id-ID'),
    };
    addOutgoingOffer(offer);
    setShowTradeModal(false);
    setTradeItemId('');
    setTradeNote('');
    Alert.alert(
      'Penawaran Terkirim',
      `Anda menawarkan ${offeredItem.title} untuk ${item.title}`
    );
  };

  const handleBuySubmit = () => {
    const price = parseFloat(buyPrice);
    if (isNaN(price) || price <= 0) {
      Alert.alert('Error', 'Masukkan harga yang valid');
      return;
    }
    const offer = {
      id: Date.now().toString(),
      type: 'buy',
      itemTargetId: item.id,
      itemTargetTitle: item.title,
      offeredPrice: price,
      message: buyMessage,
      status: 'pending',
      negotiation: [],
      createdAt: new Date().toLocaleString('id-ID'),
    };
    addOutgoingOffer(offer);
    setShowBuyModal(false);
    setBuyPrice('');
    setBuyMessage('');
    Alert.alert(
      'Permintaan Terkirim',
      `Anda mengajukan beli ${item.title} seharga Rp ${price.toLocaleString('id-ID')}`
    );
  };

  return (
    <View style={styles.container}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Tambah Gambar', 'Fitur upload gambar belum tersedia.')
            }
          >
            <Text style={styles.placeholderPlus}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.detail}>Kategori: {item.category}</Text>
        <Text style={styles.detail}>Kondisi: {item.condition}</Text>
        <Text style={styles.detail}>Demand: {item.demand}</Text>
        <Text style={styles.detail}>
          True Value: Rp {item.trueValue.toLocaleString('id-ID')}
        </Text>
        <Text style={styles.detail}>Penjual: {item.seller}</Text>
        <Text style={styles.detail}>Lokasi: {item.location}</Text>

        <TouchableOpacity
          style={styles.tradeButton}
          onPress={() => setShowTradeModal(true)}
        >
          <Text style={styles.tradeButtonText}>
            Ajukan Trade Offer (Tukar Barang)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => setShowBuyModal(true)}
        >
          <Text style={styles.buyButtonText}>Ajukan Buy Request (Beli)</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Trade Offer */}
      <Modal
        visible={showTradeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTradeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Barang untuk Ditawarkan</Text>
            <ScrollView style={{ maxHeight: 200 }}>
              {userItems.length === 0 ? (
                <Text style={{ color: '#888', textAlign: 'center', marginVertical: 10 }}>
                  Anda belum memiliki barang untuk ditawarkan.
                </Text>
              ) : (
                userItems.map((ui) => (
                  <TouchableOpacity
                    key={ui.id}
                    style={[
                      styles.itemOption,
                      tradeItemId === ui.id && styles.itemOptionSelected,
                    ]}
                    onPress={() => setTradeItemId(ui.id)}
                  >
                    <Text style={styles.itemOptionTitle}>{ui.title}</Text>
                    <Text style={styles.itemOptionValue}>
                      Estimasi nilai: Rp {ui.estimatedValue.toLocaleString('id-ID')}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
            <TextInput
              style={styles.modalInput}
              placeholder="Catatan (opsional)"
              placeholderTextColor="#999"
              value={tradeNote}
              onChangeText={setTradeNote}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setShowTradeModal(false)}
              >
                <Text style={styles.modalButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#333' }]}
                onPress={handleTradeSubmit}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>Kirim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Buy Request */}
      <Modal
        visible={showBuyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowBuyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Masukkan Harga Penawaran</Text>
            <Text style={styles.modalSubtitle}>
              Harga awal: Rp {item.price.toLocaleString('id-ID')}
            </Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              placeholder="Contoh: 7000000"
              placeholderTextColor="#999"
              value={buyPrice}
              onChangeText={setBuyPrice}
            />
            <TextInput
              style={[styles.modalInput, { height: 80 }]}
              placeholder="Pesan untuk penjual (opsional)"
              placeholderTextColor="#999"
              value={buyMessage}
              onChangeText={setBuyMessage}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setShowBuyModal(false)}
              >
                <Text style={styles.modalButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#333' }]}
                onPress={handleBuySubmit}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>Kirim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  notFound: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 250, resizeMode: 'cover', backgroundColor: '#f0f0f0' },
  placeholderImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  placeholderPlus: { fontSize: 60, color: '#aaa' },
  info: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#111' },
  price: { fontSize: 20, color: '#000', fontWeight: '600', marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 10, color: '#333' },
  detail: { fontSize: 14, color: '#555', marginBottom: 4 },
  tradeButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  tradeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  buyButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '90%', backgroundColor: '#fff', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#111' },
  modalSubtitle: { fontSize: 14, color: '#666', marginBottom: 10 },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#111',
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  modalButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginLeft: 10 },
  modalButtonText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 8,
  },
  itemOptionSelected: { borderColor: '#333', backgroundColor: '#f0f0f0' },
  itemOptionTitle: { fontSize: 16, fontWeight: 'bold', color: '#111' },
  itemOptionValue: { fontSize: 14, color: '#555' },
});

export default ListingDetailScreen;