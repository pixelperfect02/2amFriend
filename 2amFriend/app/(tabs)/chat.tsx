import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const matchedChats = [
  {
    id: '1',
    username: 'maya_patel',
    lastMessage: 'Had a great time chatting!',
    timestamp: '2h ago',
  },
  {
    id: '2',
    username: 'liam_nguyen',
    lastMessage: 'You read Murakami too? 👀',
    timestamp: '1d ago',
  },
  {
    id: '3',
    username: 'aria_chen',
    lastMessage: 'Let’s plan that tea date soon ☕',
    timestamp: '3d ago',
  },
];

// Randomly assign verified/unverified
const getRandomVerifiedStatus = () => (Math.random() < 0.5 ? 'Verified' : 'Unverified');

export default function ChatScreen() {
  const router = useRouter();

  const [verificationStatuses, setVerificationStatuses] = useState<Record<string, 'Verified' | 'Unverified'>>({});

  useEffect(() => {
    const statuses: Record<string, 'Verified' | 'Unverified'> = {};
    matchedChats.forEach(chat => {
      statuses[chat.id] = getRandomVerifiedStatus();
    });
    setVerificationStatuses(statuses);
  }, []);

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
          renderItem={({ item }) => {
            const status = verificationStatuses[item.id] || 'Unverified';
            const statusColor = status === 'Verified' ? '#4CAF50' : '#E53935';

            return (
              <TouchableOpacity style={styles.card} onPress={() => handleChatPress(item.id)}>
                <View style={styles.nameRow}>
                  <Text style={styles.username}>@{item.username}</Text>
                  <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
                </View>
                <Text style={styles.message}>{item.lastMessage}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </TouchableOpacity>
            );
          }}
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
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
