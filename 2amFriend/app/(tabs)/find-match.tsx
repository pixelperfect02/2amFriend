import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const profiles = [
  {
    id: '1',
    name: 'Liam Nguyen',
    username: '@liam_ng',
    bio: 'Avid reader and thoughtful conversationalist.',
    details: 'Software engineer with a passion for literature and meaningful discussions over coffee.',
    photo: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=500&q=80',
    goodKarmaPoints: 120,
    thankYouNotes: 15,
    status: 'Active Member',
    loveLanguages: ['Words of Affirmation', 'Quality Time'],
    interests: ['Reading', 'Coffee', 'Technology'],
  },
  {
    id: '2',
    name: 'Maya Patel',
    username: '@maya_p',
    bio: 'Nature enthusiast and animal lover.',
    details: 'Vegan baker who enjoys hiking and connecting with fellow adventurers.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
    goodKarmaPoints: 200,
    thankYouNotes: 40,
    status: 'Premium Member',
    loveLanguages: ['Receiving Gifts', 'Acts of Service'],
    interests: ['Baking', 'Hiking', 'Animals'],
    location: '',
  },
];

const loveLanguageIcons = {
  'Words of Affirmation': () => <AntDesign name="message1" size={20} color="white" />,
  'Quality Time': () => <MaterialCommunityIcons name="clock-time-four" size={20} color="white" />,
  'Receiving Gifts': () => <MaterialCommunityIcons name="gift" size={20} color="white" />,
  'Acts of Service': () => <MaterialCommunityIcons name="hand-heart" size={20} color="white" />,
  'Physical Touch': () => <MaterialCommunityIcons name="hand-wave" size={20} color="white" />,
};

export default function PotentialProfilesScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const profile = profiles[currentIndex];

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const prevProfile = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Large Square Profile Image */}
      <Image
        source={{ uri: profile.photo }}
        style={styles.profileImage}
        resizeMode="cover"
      />

      <View style={styles.profileCard}>
        <Text style={styles.username}>{profile.username}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.text}>{profile.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Details</Text>
          <Text style={styles.text}>{profile.details}</Text>
        </View>

        {/* Love Languages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Love Languages</Text>
          <View style={styles.loveLanguagesContainer}>
            {profile.loveLanguages.map((lang, idx) => (
              <View key={idx} style={styles.loveLanguageItem}>
                {/* {loveLanguageIcons[lang]()} */}
                <Text style={styles.loveLanguageText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.leftCol}>
            <Text style={styles.sectionTitle}>
              Would like to connect with someone similar to the person passed away
            </Text>
            <Text style={styles.text}>{profile.location}</Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.sectionTitle}>Status</Text>
            <Text style={styles.text}>{profile.status}</Text>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.leftCol}>
            <Text style={styles.sectionTitle}>Good Karma Points</Text>
            <Text style={styles.text}>{profile.goodKarmaPoints}</Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.sectionTitle}>Thank You Notes</Text>
            <Text style={styles.text}>{profile.thankYouNotes}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <Text style={styles.text}>{profile.interests.join(', ')}</Text>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          onPress={prevProfile}
          disabled={currentIndex === 0}
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
        >
          <AntDesign name="left" size={24} color="#7C5B9D" />
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={nextProfile}
          disabled={currentIndex === profiles.length - 1}
          style={[styles.navButton, currentIndex === profiles.length - 1 && styles.navButtonDisabled]}
        >
          <Text style={styles.navButtonText}>Next</Text>
          <AntDesign name="right" size={24} color="#7C5B9D" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: 'white',
    flexGrow: 1,
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  backText: {
    color: '#7C5B9D',
    fontSize: 16,
    marginLeft: 6,
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#7C5B9D',
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: '#7C5B9D',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 25,
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 18,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  leftCol: {
    flex: 1,
    paddingRight: 10,
  },
  rightCol: {
    flex: 1,
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    color: 'white',
    lineHeight: 20,
  },
  loveLanguagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  loveLanguageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  loveLanguageText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '600',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    fontSize: 16,
    color: '#7C5B9D',
    marginHorizontal: 6,
  },
});
