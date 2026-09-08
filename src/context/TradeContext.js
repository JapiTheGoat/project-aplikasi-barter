import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dummyItems, dummyNotifications, myItems, dummyChats } from '../data/dummyData';
import { useAuth } from './AuthContext';

const TradeContext = createContext();

export const useTrade = () => useContext(TradeContext);

export const TradeProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState(dummyItems);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [userItems, setUserItems] = useState(myItems);
  const [outgoingOffers, setOutgoingOffers] = useState([]);
  const [incomingOffers, setIncomingOffers] = useState([
    {
      id: 'inc1',
      type: 'buy',
      itemTargetId: '1',
      itemTargetTitle: 'Laptop ASUS ROG',
      offeredPrice: 7000000,
      message: 'Apakah bisa nego?',
      fromUser: 'Andi',
      fromUserId: 'user2',
      status: 'pending',
      createdAt: '2025-04-01 10:00',
      negotiation: [],
    },
    {
      id: 'inc2',
      type: 'trade',
      itemTargetId: '2',
      itemTargetTitle: 'Sepeda Gunung Polygon',
      offeredItemTitle: 'Smartphone Samsung A52',
      estimatedValue: 3000000,
      note: 'Mau tukar dengan HP',
      fromUser: 'Budi',
      fromUserId: 'user3',
      status: 'pending',
      createdAt: '2025-04-02 09:30',
      negotiation: [],
    },
  ]);
  const [transactions, setTransactions] = useState([]);
  const [chats, setChats] = useState(dummyChats);

  // ... (kode lain tetap sama)

  // Fungsi mengirim pesan ke chat room
  const sendMessage = (chatId, message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: Date.now().toString(),
                  from: user ? user.username : 'me',
                  text: message,
                  time: new Date().toLocaleTimeString('id-ID'),
                },
              ],
            }
          : chat
      )
    );
  };

  return (
    <TradeContext.Provider
      value={{
        items,
        setItems,
        notifications,
        setNotifications,
        userItems,
        outgoingOffers,
        incomingOffers,
        addOutgoingOffer,
        addIncomingOffer,
        updateOfferStatus,
        addNegotiationMessage,
        transactions,
        addTransaction,
        markNotificationRead,
        createListing,
        chats,
        sendMessage,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};