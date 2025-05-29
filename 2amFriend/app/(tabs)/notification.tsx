import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Simulated notification data
const notifications = [
  { id: '1', title: 'New Match!', message: 'You have a new match with Liam Nguyen.' },
  { id: '2', title: 'Message Received', message: 'Maya Patel sent you a message.' },
  { id: '3', title: 'Profile Update', message: 'Zara Ahmed has updated their profile.' },
  { id: '4', title: 'New Chat Request', message: 'Ethan Ross wants to chat with you.' },
  { id: '5', title: 'Saved Item', message: 'Chris Johnson has saved your profile.' },
];

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
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
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fdf8f6',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#cc3366',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  notificationMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
});
