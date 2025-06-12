import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; // added MaterialCommunityIcons for more icon options
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Simulated logged-in user data
const loggedInUser = {
  name: 'John Doe',
  age: 29,
  email: 'john.doe@example.com',
  bio: 'Loves hiking and reading books.',
  details:
    'I’m an avid hiker and spend weekends exploring nature trails. I’m also working on my first mystery novel. Looking to meet someone who values curiosity and connection.',
  photo: null,
  location: '',
  interests: ['Hiking', 'Reading', 'Travel', 'Cooking'],
  social: {
    instagram: '@johndoe',
    twitter: '@doejohn',
  },
  karmaPoints: 128,
  thankYouNotes: 45,
  status: 'Active Premium User',
  loveLanguages: ['Words of Affirmation', 'Quality Time'], // new field
};

const loveLanguageIcons = {
  'Words of Affirmation': () => <AntDesign name="message1" size={20} color="white" />,
  'Quality Time': () => <MaterialCommunityIcons name="clock-time-four" size={20} color="white" />,
  'Receiving Gifts': () => <MaterialCommunityIcons name="gift" size={20} color="white" />,
  'Acts of Service': () => <MaterialCommunityIcons name="hand-heart" size={20} color="white" />,
  'Physical Touch': () => <MaterialCommunityIcons name="hand-wave" size={20} color="white" />,
};


export default function UserProfile() {
  const router = useRouter();

  const handleSettings = () => {
    router.push('/');
  };

  const handleEditProfile = () => {
    router.push('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {loggedInUser.photo ? (
        <Image source={{ uri: loggedInUser.photo }} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Add Photo</Text>
        </View>
      )}

      <View style={styles.profileCard}>
        <Text style={styles.name}>
          {loggedInUser.name}, {loggedInUser.age}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.text}>{loggedInUser.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Details</Text>
          <Text style={styles.text}>{loggedInUser.details}</Text>
        </View>

        {/* Love Languages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Love Languages</Text>
          <View style={styles.loveLanguagesContainer}>
            {loggedInUser.loveLanguages.map((lang, idx) => (
              <View key={idx} style={styles.loveLanguageItem}>
                {/* {loveLanguageIcons[lang] || <Text style={styles.loveLanguageIconFallback}>💖</Text>} */}
                <Text style={styles.loveLanguageText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.leftCol}>
            <Text style={styles.sectionTitle}>Would like to connect with someone similar to the person passed away</Text>
            <Text style={styles.text}>{loggedInUser.location}</Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.sectionTitle}>Status</Text>
            <Text style={styles.text}>{loggedInUser.status}</Text>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.leftCol}>
            <Text style={styles.sectionTitle}>Good Karma Points</Text>
            <Text style={styles.text}>{loggedInUser.karmaPoints}</Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.sectionTitle}>Thank You Notes</Text>
            <Text style={styles.text}>{loggedInUser.thankYouNotes}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <Text style={styles.text}>{loggedInUser.interests.join(', ')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Links</Text>
          <Text style={styles.text}>Instagram: {loggedInUser.social.instagram}</Text>
          <Text style={styles.text}>Twitter: {loggedInUser.social.twitter}</Text>
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
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>

      {/* Premium Upgrade Section */}
      <View style={styles.premiumContainer}>
        <Text style={styles.premiumTitle}>Premium Upgrade</Text>

        <View style={styles.featuresTable}>
          <View style={styles.featuresHeader}>
            <Text style={[styles.featuresCell, styles.headerCell]}>Feature</Text>
            <Text style={[styles.featuresCell, styles.headerCell]}>Regular</Text>
            <Text style={[styles.featuresCell, styles.headerCell]}>Premium</Text>
          </View>

          {[
            ['Profile Visibility', 'Limited', 'Unlimited'],
            ['Number of Matches', '5 per day', 'Unlimited'],
            ['Message History', '7 days', 'Forever'],
            ['Ad-free Experience', 'No', 'Yes'],
            ['Access to Premium Badges', 'No', 'Yes'],
            ['See Who Viewed Profile', 'No', 'Yes'],
            ['Advanced Search Filters', 'Basic', 'Advanced'],
            ['Priority Customer Support', 'No', 'Yes'],
            ['Exclusive Events Access', 'No', 'Yes'],
          ].map(([feature, regular, premium], idx) => (
            <View key={idx} style={styles.featuresRow}>
              <Text style={styles.featuresCell}>{feature}</Text>
              <Text style={styles.featuresCell}>{regular}</Text>
              <Text style={styles.featuresCell}>{premium}</Text>
            </View>
          ))}
        </View>
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
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#7C5B9D',
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
    borderWidth: 3,
    borderColor: '#7C5B9D',
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
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
  name: {
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
  editButton: {
    backgroundColor: '#7C5B9D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  settingsButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#7C5B9D',
  },
  settingsButtonText: {
    color: '#7C5B9D',
    fontWeight: '700',
    fontSize: 16,
  },
  premiumContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#7C5B9D',
    marginTop: 30,
    marginBottom: 40,
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7C5B9D',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresTable: {
    width: '100%',
  },
  featuresHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#7C5B9D',
    paddingBottom: 8,
    marginBottom: 10,
  },
  featuresRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  featuresCell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: '700',
    color: '#7C5B9D',
  },

  // New styles for Love Language
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
  loveLanguageIconFallback: {
    fontSize: 18,
    color: 'white',
    marginRight: 6,
  },
});
