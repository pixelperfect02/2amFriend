import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    router.push(`/`); // Change to specific chat route if needed
  };

  return (
    <View style={styles.container}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {matchedChats.length === 0 ? (
        <Text style={styles.noChatsText}>No connections yet. Your people are out there 💫</Text>
      ) : (
        <FlatList
          data={matchedChats}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleChatPress(item.id)}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.lastMessage}</Text>
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
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginBottom: 12,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7C5B9D',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backText: {
    color: '#7C5B9D',
    fontSize: 16,
    marginLeft: 6,
  },
  card: {
    backgroundColor: '#7C5B9D',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  message: {
    fontSize: 15,
    color: 'white',
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
  },
  noChatsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7C5B9D',
    marginTop: 50,
  },
});
