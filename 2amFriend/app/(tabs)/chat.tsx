import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Simulated matched user chat data
const matchedChats = [
  {
    id: '1',
    name: 'Maya Patel',
    lastMessage: 'Had a great time chatting!',
    timestamp: '2h ago',
  },
  {
    id: '2',
    name: 'Liam Nguyen',
    lastMessage: 'You read Murakami too? 👀',
    timestamp: '1d ago',
  },
  {
    id: '3',
    name: 'Aria Chen',
    lastMessage: 'Let’s plan that tea date soon ☕',
    timestamp: '3d ago',
  },
];

export default function ChatScreen() {
  const router = useRouter();

  const handleChatPress = (chatId: string) => {
    router.push(`/`); // Route to detailed chat view
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💬 Your Matches</Text>
      {matchedChats.length === 0 ? (
        <Text style={styles.noChatsText}>You haven’t matched with anyone yet 😢</Text>
      ) : (
        <FlatList
          data={matchedChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.chatItem} onPress={() => handleChatPress(item.id)}>
              <View style={styles.chatInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message}>{item.lastMessage}</Text>
              </View>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#cc3366',
  },
  noChatsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginTop: 50,
  },
  chatItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  chatInfo: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
});
