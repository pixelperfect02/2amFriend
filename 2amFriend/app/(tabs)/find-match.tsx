import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = SCREEN_WIDTH * 0.8;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;

const profiles = [
  {
    id: '1',
    name: 'Maya Patel',
    username: '@maya_p',
    bio: 'Nature enthusiast and animal lover.',
    details: 'Vegan baker who enjoys hiking and connecting with fellow adventurers.',
    photo: require('../../assets/images/maya.jpg'),
    goodKarmaPoints: 200,
    thankYouNotes: 40,
    status: 'Premium Member',
    loveLanguages: ['Receiving Gifts', 'Acts of Service'],
    interests: ['Baking', 'Hiking', 'Animals'],
    location: '',
  },
  {
    id: '2',
    name: 'Liam Nguyen',
    username: '@liam_ng',
    bio: 'Avid reader and thoughtful conversationalist.',
    details: 'Software engineer with a passion for literature and meaningful discussions over coffee.',
    photo: require('../../assets/images/liam.jpg'),
    goodKarmaPoints: 120,
    thankYouNotes: 15,
    status: 'Active Member',
    loveLanguages: ['Words of Affirmation', 'Quality Time'],
    interests: ['Reading', 'Coffee', 'Technology'],
  },
];

export default function PotentialProfilesScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const prevProfile = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const profile = profiles[currentIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/criteria-selection')}>
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* <Text style={styles.pageTitle}>Find Matches</Text> */}

      <View style={[styles.imageWrapper, { width: IMAGE_WIDTH, height: IMAGE_HEIGHT }]}>
        {profiles.map((p, i) => {
          const isVisible = i === currentIndex;
          return (
            <Image
              key={p.id}
              source={p.photo}
              style={[
                styles.profilephoto,
                {
                  width: IMAGE_WIDTH * 1.1,
                  height: IMAGE_HEIGHT * 1.1,
                  position: 'absolute',
                  opacity: isVisible ? 1 : 0,
                },
              ]}
              resizeMode="cover"
              fadeDuration={0}
              importantForAccessibility={isVisible ? 'yes' : 'no-hide-descendants'}
              accessibilityElementsHidden={!isVisible}
              accessibilityIgnoresInvertColors={!isVisible}
            />
          );
        })}
      </View>

      <View style={styles.profileCard}>
        {profile.id === '2' ? (
          <Text style={styles.username}>
            {profile.name} ({profile.username})
          </Text>
        ) : (
          <Text style={styles.username}>{profile.username}</Text>
        )}

        <View style={styles.karmaContainer}>
          <View style={styles.karmaBox}>
            <Text style={styles.karmaLabel}>Good Karma Points</Text>
            <Text style={styles.karmaValue}>{profile.goodKarmaPoints}</Text>
          </View>
          <View style={styles.karmaBox}>
            <Text style={styles.karmaLabel}>Thank You Notes</Text>
            <Text style={styles.karmaValue}>{profile.thankYouNotes}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.text}>{profile.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Details</Text>
          <Text style={styles.text}>{profile.details}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Love Languages</Text>
          <View style={styles.loveLanguagesContainer}>
            {profile.loveLanguages.map((lang, idx) => (
              <View key={idx} style={styles.loveLanguageItem}>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <Text style={styles.text}>{profile.interests.join(', ')}</Text>
        </View>

        <TouchableOpacity style={styles.matchButton}>
          <Text style={styles.matchButtonText}>Connect with {profile.name.split(' ')[0]}</Text>
        </TouchableOpacity>
      </View>

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
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#7C5B9D',
    marginBottom: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
  backText: {
    color: '#7C5B9D',
    fontSize: 16,
    marginLeft: 6,
  },
  imageWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#7C5B9D',
    marginBottom: 12,
    overflow: 'hidden',
  },
  profilephoto: {
    borderRadius: 7,
    transform: [{ scale: 1.1 }],
  },
  profileCard: {
    backgroundColor: '#7C5B9D',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 500,
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
  karmaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  karmaBox: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  karmaLabel: {
    color: '#7C5B9D',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  karmaValue: {
    color: '#7C5B9D',
    fontSize: 16,
    fontWeight: '700',
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
    maxWidth: 500,
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
  matchButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  matchButtonText: {
    color: '#7C5B9D',
    fontSize: 16,
    fontWeight: '700',
  },
});

