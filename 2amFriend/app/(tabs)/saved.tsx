import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const likedProfiles = [
  {
    id: 'user_001',
    bio: 'Coffee lover & deep thinker.',
    details: 'Engineer by day, philosopher by night. Always looking for the next great book and conversation.',
  },
  {
    id: 'user_002',
    bio: 'Dog mom & nature girl.',
    details: 'Vegan baker and weekend hiker. Bonus points if you love animals and campfires.',
  },
  {
    id: 'user_003',
    bio: 'Podcaster & mystery nerd.',
    details: 'I make cyber-sec boring stories sound cool. Ask me about the dark web… or tacos.',
  },
  {
    id: 'user_004',
    bio: 'Painter of walls & souls.',
    details: 'Traveling muralist. My love language is playlists and rooftop sunsets.',
  },
  {
    id: 'user_005',
    bio: 'Adrenaline junkie.',
    details: 'Rock climber, skydiver, deep thinker. Let’s chase sunrises together.',
  },
];

// Helper to randomly assign verified status
const getRandomVerifiedStatus = () => (Math.random() < 0.5 ? 'Verified' : 'Unverified');

export default function LikesYouScreen() {
  const router = useRouter();

  // Store verified status for each user id
  const [verificationStatuses, setVerificationStatuses] = useState<Record<string, 'Verified' | 'Unverified'>>({});

  useEffect(() => {
    // Assign random verified/unverified to each user once on mount
    const statuses: Record<string, 'Verified' | 'Unverified'> = {};
    likedProfiles.forEach(profile => {
      statuses[profile.id] = getRandomVerifiedStatus();
    });
    setVerificationStatuses(statuses);
  }, []);

  const handleProfileClick = (profileId: string) => {
    console.log(`Navigate to profile with id: ${profileId}`);
    // TODO: Navigate to detailed profile screen
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Likes You</Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/find-match')}>
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <FlatList
        data={likedProfiles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => {
          const status = verificationStatuses[item.id] || 'Unverified';
          const statusColor = status === 'Verified' ? '#4CAF50' : '#E53935'; // Green or Red

          return (
            <TouchableOpacity style={styles.card} onPress={() => handleProfileClick(item.id)}>
              <View style={styles.idRow}>
                <Text style={styles.name}>{item.id}</Text>
                <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
              </View>
              <Text style={styles.bio}>{item.bio}</Text>
              <Text style={styles.details}>{item.details}</Text>
            </TouchableOpacity>
          );
        }}
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
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
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
