import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Simulated saved profiles data
const savedProfiles = [
  {
    id: '1',
    name: 'Liam Nguyen',
    age: 28,
    bio: 'Coffee lover & deep thinker.',
    details: 'Engineer by day, philosopher by night. Always looking for the next great book and conversation.',
  },
  {
    id: '2',
    name: 'Maya Patel',
    age: 25,
    bio: 'Dog mom & nature girl.',
    details: 'Vegan baker and weekend hiker. Bonus points if you love animals and campfires.',
  },
  {
    id: '3',
    name: 'Ethan Ross',
    age: 32,
    bio: 'Podcaster & mystery nerd.',
    details: 'I make cyber-sec boring stories sound cool. Ask me about the dark web… or tacos.',
  },
  {
    id: '4',
    name: 'Zara Ahmed',
    age: 29,
    bio: 'Painter of walls & souls.',
    details: 'Traveling muralist. My love language is playlists and rooftop sunsets.',
  },
  {
    id: '5',
    name: 'Chris Johnson',
    age: 30,
    bio: 'Adrenaline junkie.',
    details: 'Rock climber, skydiver, deep thinker. Let’s chase sunrises together.',
  },
];

export default function SavedProfilesScreen() {
  const handleProfileClick = (profileId: string) => {
    console.log(`Navigate to profile with id: ${profileId}`);
    // Navigate to the profile details screen when clicked (you can use a navigation library here)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💖 Saved Profiles</Text>
      <FlatList
        data={savedProfiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleProfileClick(item.id)}>
            <Text style={styles.name}>
              {item.name}, {item.age}
            </Text>
            <Text style={styles.bio}>{item.bio}</Text>
            <Text style={styles.details}>{item.details}</Text>
          </TouchableOpacity>
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
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: '#777',
    lineHeight: 20,
  },
});
