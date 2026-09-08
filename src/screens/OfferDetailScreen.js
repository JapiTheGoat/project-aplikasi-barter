import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTrade } from '../context/TradeContext';

const OfferDetailScreen = ({ route }) => {
  const { offerId, direction } = route.params;
  const { incomingOffers, outgoingOffers } = useTrade();
  const offer =
    direction === 'incoming'
      ? incomingOffers.find((o) => o.id === offerId)
      : outgoingOffers.find((o) => o.id === offerId);

  if (!offer) {
    return (
      <View style={styles.container}>
        <Text>Offer tidak ditemukan</Text>
      </View>
    );
  }

  const isTrade = offer.type === 'trade';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detail Penawaran</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Barang Target:</Text>
        <Text style={styles.value}>{offer.itemTargetTitle}</Text>

        {isTrade ? (
          <>
            <Text style={styles.label}>Barang yang Ditawarkan:</Text>
            <Text style={styles.value}>{offer.offeredItemTitle}</Text>
            <Text style={styles.label}>Estimasi Nilai:</Text>
            <Text style={styles.value}>Rp {offer.estimatedValue?.toLocaleString('id-ID')}</Text>
            {offer.note ? (
              <>
                <Text style={styles.label}>Catatan:</Text>
                <Text style={styles.value}>{offer.note}</Text>
              </>
            ) : null}
          </>
        ) : (
          <>
            <Text style={styles.label}>Harga Penawaran:</Text>
            <Text style={styles.value}>Rp {offer.offeredPrice?.toLocaleString('id-ID')}</Text>
            {offer.message ? (
              <>
                <Text style={styles.label}>Pesan:</Text>
                <Text style={styles.value}>{offer.message}</Text>
              </>
            ) : null}
          </>
        )}

        <Text style={styles.label}>Dari Pengguna:</Text>
        <Text style={styles.value}>{offer.fromUser || 'Anda'}</Text>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{offer.status}</Text>
        <Text style={styles.label}>Waktu:</Text>
        <Text style={styles.value}>{offer.createdAt}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#111',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#555',
  },
  value: {
    fontSize: 16,
    marginBottom: 4,
    color: '#111',
  },
});

export default OfferDetailScreen;