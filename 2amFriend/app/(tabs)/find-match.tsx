import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Simulated dating profiles
const profiles = [
  {
    id: '1',
    name: 'Liam Nguyen',
    age: 28,
    emoji: '📚',
    bio: 'Coffee lover & deep thinker.',
    details: 'Engineer by day, philosopher by night. Always looking for the next great book and conversation.',
  },
  {
    id: '2',
    name: 'Maya Patel',
    age: 25,
    emoji: '🐶',
    bio: 'Dog mom & nature girl.',
    details: 'Vegan baker and weekend hiker. Bonus points if you love animals and campfires.',
  },
  {
    id: '3',
    name: 'Ethan Ross',
    age: 32,
    emoji: '🎧',
    bio: 'Podcaster & mystery nerd.',
    details: 'I make cyber-sec boring stories sound cool. Ask me about the dark web… or tacos.',
  },
  {
    id: '4',
    name: 'Zara Ahmed',
    age: 29,
    emoji: '🎨',
    bio: 'Painter of walls & souls.',
    details: 'Traveling muralist. My love language is playlists and rooftop sunsets.',
  },
  {
    id: '5',
    name: 'Chris Johnson',
    age: 30,
    emoji: '⛰️',
    bio: 'Adrenaline junkie.',
    details: 'Rock climber, skydiver, deep thinker. Let’s chase sunrises together.',
  },
  {
    id: '6',
    name: 'Aria Chen',
    age: 26,
    emoji: '🕯️',
    bio: 'Candle maker & journaler.',
    details: 'I believe in slow mornings, warm tea, and heartfelt talks under fairy lights.',
  },
];

export default function PotentialProfilesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💞 People You Might Like</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.name}>
                {item.emoji} {item.name}, {item.age}
              </Text>
              <Text style={styles.bio}>{item.bio}</Text>
              <Text style={styles.details}>{item.details}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#cc3366',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  placeholderImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bio: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#777',
  },
});
