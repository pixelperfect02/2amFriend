import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';

export default function EditProfileScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [location, setLocation] = useState('Adelaide, Australia');

  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false);

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

      {/* QR Code Section */}
      <View style={styles.qrContainer}>
        <QRCode value={email} size={160} color="#7C5B9D" />
        <Text style={styles.qrTitle}>Met someone great?</Text>
        <Text style={styles.qrSubtitle}>Instant match</Text>
        <Text style={styles.qrInstruction}>
          Not ready to swap numbers just yet? Ask them to scan your code with
          their phone and you'll match instantly on the app.
        </Text>
      </View>

      <Text style={styles.sectionHeader}>Edit Profile</Text>

      {/* Username */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Username</Text>
        {editingUsername ? (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoFocus
          />
        ) : (
          <Text style={styles.settingValue}>{username}</Text>
        )}
        <TouchableOpacity
          onPress={() => setEditingUsername(!editingUsername)}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>
            {editingUsername ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Email */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Email</Text>
        {editingEmail ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus
          />
        ) : (
          <Text style={styles.settingValue}>{email}</Text>
        )}
        <TouchableOpacity
          onPress={() => setEditingEmail(!editingEmail)}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>
            {editingEmail ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Location */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Location</Text>
        {editingLocation ? (
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            autoFocus
          />
        ) : (
          <Text style={styles.settingValue}>{location}</Text>
        )}
        <TouchableOpacity
          onPress={() => setEditingLocation(!editingLocation)}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>
            {editingLocation ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>
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
  settingValue: {
    fontSize: 16,
    color: '#E6DFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    color: '#7C5B9D',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 8,
  },
  editButton: {
    position: 'absolute',
    right: 18,
    top: 18,
    backgroundColor: '#5A3F8B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7C5B9D',
    marginTop: 16,
  },
  qrSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C5B9D',
    marginTop: 4,
  },
  qrInstruction: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 12,
  },
});
