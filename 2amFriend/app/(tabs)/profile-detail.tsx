import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Simulated logged-in user data
const loggedInUser = {
  name: 'John Doe',
  age: 29,
  email: 'john.doe@example.com',
  bio: 'Loves hiking and reading books.',
  details: 'I’m an avid hiker and spend weekends exploring nature trails. I’m also working on my first mystery novel. Looking to meet someone who values curiosity and connection.',
  photo: null, // Replace with a real photo URL if added
};

export default function UserProfile() {
  const router = useRouter();

  const handleSettings = () => {
    router.push('/'); // Make sure this route exists
  };

  const handleEditProfile = () => {
    router.push('/'); // Optional: implement edit-profile
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💖 My Profile</Text>

      {loggedInUser.photo ? (
        <Image source={{ uri: loggedInUser.photo }} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Add Photo</Text>
        </View>
      )}

      <View style={styles.profileCard}>
        <Text style={styles.name}>{loggedInUser.name}, {loggedInUser.age}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.text}>{loggedInUser.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Details</Text>
          <Text style={styles.text}>{loggedInUser.details}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Info</Text>
          <Text style={styles.text}>{loggedInUser.email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff0f5',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#cc3366',
    marginBottom: 20,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
  },
  placeholderImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    color: '#444',
    lineHeight: 20,
  },
  editButton: {
    backgroundColor: '#ff6699',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 25,
    width: '100%',
    alignItems: 'center',
  },
  settingsButton: {
    backgroundColor: '#3399ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
