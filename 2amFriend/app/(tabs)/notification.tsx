import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const notifications = [
  { id: '1', title: 'New Match!', message: 'You have a new match with Liam Nguyen.' },
  { id: '2', title: 'Message Received', message: 'Maya Patel sent you a message.' },
  { id: '3', title: 'Profile Update', message: 'Zara Ahmed has updated their profile.' },
  { id: '4', title: 'New Chat Request', message: 'Ethan Ross wants to chat with you.' },
  { id: '5', title: 'Saved Item', message: 'Chris Johnson has saved your profile.' },
];

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Alerts</Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
          </View>
        )}
      />
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
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 15,
    color: 'white',
  },
});
