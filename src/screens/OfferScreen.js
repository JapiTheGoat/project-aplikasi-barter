import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useTrade } from '../context/TradeContext';

const OfferScreen = () => {
  const { outgoingOffers, updateOfferStatus, addNegotiationMessage } = useTrade();
  const [messageInputs, setMessageInputs] = useState({});

  const handleAccept = (offerId) => {
    updateOfferStatus(offerId, 'accepted', 'outgoing');
  };

  const handleReject = (offerId) => {
    updateOfferStatus(offerId, 'rejected', 'outgoing');
  };

  const handleSendMessage = (offerId) => {
    const text = messageInputs[offerId];
    if (!text || !text.trim()) return;
    const message = {
      from: 'me',
      text: text.trim(),
      time: new Date().toLocaleTimeString('id-ID'),
    };
    addNegotiationMessage(offerId, message, 'outgoing');
    setMessageInputs((prev) => ({ ...prev, [offerId]: '' }));
  };

  const renderOfferItem = ({ item }) => {
    const isPending = item.status === 'pending';
    const isAccepted = item.status === 'accepted';
    const isRejected = item.status === 'rejected';
    const isTrade = item.type === 'trade';

    return (
      <View style={styles.offerCard}>
        <Text style={styles.itemTitle}>{item.itemTargetTitle}</Text>
        <Text style={styles.offerType}>
          {isTrade ? 'Trade Offer' : 'Buy Request'}
        </Text>
        {isTrade ? (
          <>
            <Text style={styles.detail}>
              Barang ditawarkan: {item.offeredItemTitle}
            </Text>
            <Text style={styles.detail}>
              Estimasi nilai: Rp {item.estimatedValue.toLocaleString('id-ID')}
            </Text>
          </>
        ) : (
          <Text style={styles.detail}>
            Harga penawaran: Rp {item.offeredPrice.toLocaleString('id-ID')}
          </Text>
        )}
        {item.note ? <Text style={styles.detail}>Catatan: {item.note}</Text> : null}
        {item.message ? <Text style={styles.detail}>Pesan: {item.message}</Text> : null}
        <Text style={styles.status}>Status: {item.status}</Text>

        {isPending && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#333' }]}
              onPress={() => handleAccept(item.id)}
            >
              <Text style={styles.actionBtnText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#ccc' }]}
              onPress={() => handleReject(item.id)}
            >
              <Text style={styles.actionBtnText}>Tolak</Text>
            </TouchableOpacity>
          </View>
        )}

        {isAccepted && (
          <View style={styles.negotiationContainer}>
            <Text style={styles.negotiationTitle}>Negosiasi</Text>
            <View style={styles.chatArea}>
              {(item.negotiation || []).map((msg, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.chatBubble,
                    msg.from === 'me' ? styles.myBubble : styles.otherBubble,
                  ]}
                >
                  <Text style={styles.chatText}>{msg.text}</Text>
                  <Text style={styles.chatTime}>{msg.time}</Text>
                </View>
              ))}
            </View>
            <View style={styles.chatInputRow}>
              <TextInput
                style={styles.chatInput}
                placeholder="Ketik pesan..."
                placeholderTextColor="#999"
                value={messageInputs[item.id] || ''}
                onChangeText={(text) =>
                  setMessageInputs((prev) => ({ ...prev, [item.id]: text }))
                }
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => handleSendMessage(item.id)}
              >
                <Text style={styles.sendButtonText}>Kirim</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {isRejected && <Text style={styles.rejectedText}>Penawaran ditolak</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {outgoingOffers.length === 0 ? (
        <Text style={styles.empty}>Belum ada penawaran keluar.</Text>
      ) : (
        <FlatList
          data={outgoingOffers}
          keyExtractor={(item) => item.id}
          renderItem={renderOfferItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  empty: { textAlign: 'center', marginTop: 30, fontSize: 16, color: '#888' },
  offerCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#111' },
  offerType: { fontSize: 12, color: '#666', marginBottom: 5 },
  detail: { fontSize: 14, color: '#333', marginBottom: 3 },
  status: { fontSize: 12, color: '#888', marginTop: 5 },
  actionButtons: { flexDirection: 'row', marginTop: 10 },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  actionBtnText: { color: '#fff', fontWeight: 'bold' },
  negotiationContainer: { marginTop: 15, borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: 10 },
  negotiationTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#111' },
  chatArea: { maxHeight: 200, marginBottom: 10 },
  chatBubble: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 5,
    maxWidth: '80%',
  },
  myBubble: { alignSelf: 'flex-end', backgroundColor: '#333' },
  otherBubble: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0' },
  chatText: { color: '#fff', fontSize: 14 },
  chatTime: { fontSize: 10, color: '#ccc', marginTop: 2 },
  chatInputRow: { flexDirection: 'row', alignItems: 'center' },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
    color: '#111',
  },
  sendButton: { backgroundColor: '#333', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5 },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
  rejectedText: { color: 'red', marginTop: 5 },
});

export default OfferScreen;