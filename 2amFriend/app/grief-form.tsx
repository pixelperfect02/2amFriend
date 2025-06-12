import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function GriefForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    userGender: '',
    userAge: '',
    userQualities: '',
    deceasedName: '',
    deceasedAge: '',
    deceasedGender: '',
    relationship: '',
    deceasedQualities: '',
  });

  const handleInput = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      form.userGender.trim() !== '' &&
      form.userAge.trim() !== '' &&
      form.deceasedName.trim() !== '' &&
      form.relationship.trim() !== ''
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      Alert.alert('Please fill in all required fields marked with *');
      return;
    }
    router.push('/find-match');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Back Arrow - Top Left */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
      </TouchableOpacity>

      {/* Forward Arrow - Top Right */}
      <TouchableOpacity
        style={styles.forwardButton}
        onPress={handleSubmit}
        disabled={!isFormValid()}
        activeOpacity={0.7}
      >
        <AntDesign
          name="arrowright"
          size={24}
          color={isFormValid() ? '#7C5B9D' : '#ccc'}
        />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Tell us about your experience</Text>

        <TextInput
          placeholder="🧍 Your gender (Male/Female/Other) *"
          placeholderTextColor="#999"
          value={form.userGender}
          onChangeText={text => handleInput('userGender', text)}
          style={styles.input}
          autoCapitalize="words"
          returnKeyType="next"
        />

        <TextInput
          placeholder="📅 Your age *"
          placeholderTextColor="#999"
          value={form.userAge}
          onChangeText={text => handleInput('userAge', text)}
          style={styles.input}
          keyboardType="numeric"
          returnKeyType="next"
        />

        <TextInput
          placeholder="⭐ 3 qualities you have"
          placeholderTextColor="#999"
          value={form.userQualities}
          onChangeText={text => handleInput('userQualities', text)}
          style={styles.input}
          autoCapitalize="sentences"
          multiline
          numberOfLines={2}
        />

        <TextInput
          placeholder="🕊️ Name of the person who passed *"
          placeholderTextColor="#999"
          value={form.deceasedName}
          onChangeText={text => handleInput('deceasedName', text)}
          style={styles.input}
          autoCapitalize="words"
          returnKeyType="next"
        />

        <TextInput
          placeholder="🎂 Their age"
          placeholderTextColor="#999"
          value={form.deceasedAge}
          onChangeText={text => handleInput('deceasedAge', text)}
          style={styles.input}
          keyboardType="numeric"
          returnKeyType="next"
        />

        <TextInput
          placeholder="⚧️ Their gender (Male/Female/Other)"
          placeholderTextColor="#999"
          value={form.deceasedGender}
          onChangeText={text => handleInput('deceasedGender', text)}
          style={styles.input}
          autoCapitalize="words"
        />

        <TextInput
          placeholder="👨‍👩‍👧‍👦 Your relationship with them (Mother/Father/Sibling/Friend) *"
          placeholderTextColor="#999"
          value={form.relationship}
          onChangeText={text => handleInput('relationship', text)}
          style={styles.input}
          autoCapitalize="words"
          returnKeyType="next"
        />

        <TextInput
          placeholder="💫 3 qualities they had"
          placeholderTextColor="#999"
          value={form.deceasedQualities}
          onChangeText={text => handleInput('deceasedQualities', text)}
          style={styles.input}
          autoCapitalize="sentences"
          multiline
          numberOfLines={2}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 55,
    left: 10,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  forwardButton: {
    position: 'absolute',
    top: 55,
    right: 10,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  container: {
    padding: 20,
    paddingTop: 100,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#7C5B9D',
  },
  input: {
    borderColor: '#7C5B9D',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
});
