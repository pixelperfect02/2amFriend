import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// Simulated logged-in user data
const loggedInUser = {
  name: 'John Doe',
  username: '@john_doe',
  email: 'john.doe@example.com',
  bio: 'Loves hiking and reading books.',
  details:
    'I’m an avid hiker and spend weekends exploring nature trails. I’m also working on my first mystery novel. Looking to meet someone who values curiosity and connection.',
  photo: null,
  location: '',
  interests: ['Hiking', 'Reading', 'Travel', 'Cooking'],
  // social: {
  //   instagram: '@johndoe',
  //   twitter: '@doejohn',
  // },
  karmaPoints: 128,
  thankYouNotes: 45,
  status: 'Active Premium User',
  loveLanguages: ['Words of Affirmation', 'Quality Time'],
  showName: true,
  isVerified: false, // Added verification status
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
  const [showName, setShowName] = useState(loggedInUser.showName);
  const [verificationAlertVisible, setVerificationAlertVisible] = useState(!loggedInUser.isVerified);
  const [userData, setUserData] = useState(loggedInUser);

  const handleSettings = () => {
    router.push('/');
  };

  const handleEditProfile = () => {
    router.push('/');
  };

  const toggleShowName = () => {
    setShowName(previousState => !previousState);
  };

  const handleUploadID = () => {
    Alert.alert(
      "Verify Your Identity",
      "Please upload a clear photo of your government-issued ID for verification. This helps us ensure a safe community.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Upload ID", 
          onPress: () => {
            // Simulate successful verification after upload
            setTimeout(() => {
              setUserData(prev => ({ ...prev, isVerified: true }));
              setVerificationAlertVisible(false);
              Alert.alert("Verification Submitted", "Your ID has been submitted for verification. We'll notify you once it's approved.");
            }, 1500);
          } 
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Verification Alert */}
      {verificationAlertVisible && (
        <View style={styles.verificationAlert}>
          <View style={styles.alertContent}>
            <FontAwesome name="exclamation-triangle" size={20} color="#FFD700" />
            <Text style={styles.alertText}>Please verify your identity by uploading a government-issued ID</Text>
            <TouchableOpacity onPress={handleUploadID} style={styles.alertButton}>
              <Text style={styles.alertButtonText}>Upload ID</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={() => setVerificationAlertVisible(false)} 
            style={styles.alertCloseButton}
          >
            <AntDesign name="close" size={16} color="#FFD700" />
          </TouchableOpacity>
        </View>
      )}

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {userData.photo ? (
        <Image source={{ uri: userData.photo }} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Add Photo</Text>
        </View>
      )}

      {/* Verification Status */}
      <View style={styles.verificationStatus}>
        {userData.isVerified ? (
          <View style={styles.verifiedBadge}>
            <AntDesign name="checkcircle" size={16} color="#4CAF50" />
            <Text style={styles.verifiedText}>Verified Profile</Text>
          </View>
        ) : (
          <View style={styles.unverifiedBadge}>
            <AntDesign name="exclamationcircle" size={16} color="#FFC107" />
            <Text style={styles.unverifiedText}>Unverified Profile</Text>
          </View>
        )}
      </View>

      <View style={styles.profileCard}>
        <View style={styles.nameToggleContainer}>
          <Text style={styles.username}>{userData.username}</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Show Name</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#D6D3E9' }}
              thumbColor={showName ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleShowName}
              value={showName}
            />
          </View>
        </View>

        {showName && <Text style={styles.name}>{userData.name}</Text>}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.text}>{userData.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Details</Text>
          <Text style={styles.text}>{userData.details}</Text>
        </View>

        {/* Love Languages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Love Languages</Text>
          <View style={styles.loveLanguagesContainer}>
            {userData.loveLanguages.map((lang, idx) => (
              <View key={idx} style={styles.loveLanguageItem}>
                {/* {loveLanguageIcons[lang] && loveLanguageIcons[lang]()} */}
                <Text style={styles.loveLanguageText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.leftCol}>
            <Text style={styles.sectionTitle}>Would like to connect with someone similar to the person passed away</Text>
            <Text style={styles.text}>{userData.location}</Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.sectionTitle}>Status</Text>
            <Text style={styles.text}>{userData.status}</Text>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.leftCol}>
            <Text style={styles.sectionTitle}>Good Karma Points</Text>
            <Text style={styles.text}>{userData.karmaPoints}</Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.sectionTitle}>Thank You Notes</Text>
            <Text style={styles.text}>{userData.thankYouNotes}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <Text style={styles.text}>{userData.interests.join(', ')}</Text>
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Links</Text>
          <Text style={styles.text}>Instagram: {userData.social.instagram}</Text>
          <Text style={styles.text}>Twitter: {userData.social.twitter}</Text>
        </View> */}
{/* 
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Info</Text>
          <Text style={styles.text}>{userData.email}</Text>
        </View> */}
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
  nameToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    color: 'white',
    marginRight: 8,
    fontSize: 14,
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
  verificationAlert: {
    backgroundColor: '#FFF9C4',
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  alertText: {
    marginLeft: 8,
    marginRight: 8,
    color: '#795548',
    flex: 1,
  },
  alertButton: {
    backgroundColor: '#7C5B9D',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  alertButtonText: {
    color: 'white',
    fontSize: 14,
  },
  alertCloseButton: {
    padding: 4,
  },
  verificationStatus: {
    marginBottom: 15,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'center',
  },
  verifiedText: {
    color: '#2E7D32',
    marginLeft: 6,
    fontSize: 14,
  },
  unverifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'center',
  },
  unverifiedText: {
    color: '#FF8F00',
    marginLeft: 6,
    fontSize: 14,
  },
});
