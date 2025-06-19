import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  // Privacy toggles
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [showOnlyLiked, setShowOnlyLiked] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/profile-detail')}
      >
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Privacy Settings */}
      <Text style={styles.sectionHeader}>Privacy Settings</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>
          Only people you've liked already, or like later, will see your profile
        </Text>
        <Switch
          value={showOnlyLiked}
          onValueChange={setShowOnlyLiked}
          trackColor={{ false: '#ccc', true: '#D6D3E9' }}
          thumbColor={showOnlyLiked ? '#7C5B9D' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Incognito Mode (Date)</Text>
        <Text style={styles.noteText}>
          If you turn on Incognito Mode for Date, this won't apply across Bizz or
          BFF.
        </Text>
        <Switch
          value={incognitoMode}
          onValueChange={setIncognitoMode}
          trackColor={{ false: '#ccc', true: '#D6D3E9' }}
          thumbColor={incognitoMode ? '#7C5B9D' : '#f4f3f4'}
        />
      </View>

      {/* App Preferences */}
      <Text style={styles.sectionHeader}>App Preferences</Text>

      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.linkText}>Notification Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.linkText}>Security and Privacy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.linkText}>Contact and FAQ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    color: '#7C5B9D',
    fontSize: 16,
    marginLeft: 8,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7C5B9D',
    marginTop: 20,
    marginBottom: 12,
  },
  settingItem: {
    backgroundColor: '#7C5B9D',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    position: 'relative',
  },
  settingLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginBottom: 6,
  },
  noteText: {
    fontSize: 14,
    color: '#EFE6FF',
    marginBottom: 8,
  },
  linkButton: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  linkText: {
    color: '#7C5B9D',
    fontSize: 16,
    fontWeight: '600',
  },
});
