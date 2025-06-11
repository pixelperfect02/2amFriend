import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  const router = useRouter();

  const handleProfileClick = (profileId: string) => {
    console.log(`Navigate to profile with id: ${profileId}`);
    // TODO: Navigate to detailed profile screen
  };

  return (
    <View style={styles.container}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Saved Profiles</Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <FlatList
        data={savedProfiles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  bio: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
  },
});
