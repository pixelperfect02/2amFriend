import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const options = [
  { text: 'Similar Struggles', emoji: '🤝' },
  { text: 'Similar Trauma', emoji: '💔' },
  { text: 'Similar Mental Health State', emoji: '🧠' },
  { text: 'Similar Culture', emoji: '🌍' },
  { text: 'Similar Mindset', emoji: '💡' },
  { text: 'Similar Life Experiences', emoji: '📖' },
  { text: 'Have lost a family member or friend', emoji: '👼' },
];

export default function CriteriaSelectionScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const toggleSelection = (item: string) => {
    setSelected(prev => (prev === item ? null : item));
  };

  const handleForward = () => {
    if (!selected) return;

    if (selected === 'Have lost a family member or friend') {
      // Directly go to grief-form.tsx
      router.push('/grief-form');
    } else {
      // Usual flow to topic-selection with selected category
      router.push({ pathname: '/topic-selection', params: { category: selected } });
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow - Top Left */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/sign-up')}
        activeOpacity={0.7}
      >
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
      </TouchableOpacity>

      {/* Forward Arrow - Top Right */}
      <TouchableOpacity
        style={styles.forwardButton}
        onPress={handleForward}
        disabled={!selected}
        activeOpacity={0.7}
      >
        <AntDesign
          name="arrowright"
          size={24}
          color={selected ? '#7C5B9D' : '#ccc'}
        />
      </TouchableOpacity>

      <Text style={styles.header}>Find Your Connection:</Text>
      <Text style={styles.subheader}>What brings you here?</Text>
      <Text style={styles.subsubheader}>Choose 1 to continue</Text>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={options}
        keyExtractor={(item) => item.text}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selected === item.text && styles.optionSelected,
            ]}
            onPress={() => toggleSelection(item.text)}
          >
            <Text
              style={[
                styles.optionText,
                selected === item.text && styles.optionTextSelected,
              ]}
            >
              {item.emoji}  {item.text}
            </Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 90,
  },
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
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#7C5B9D',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7C5B9D',
    marginBottom: 24,
  },
  subsubheader: {
    fontSize: 14,
    textAlign: 'center',
    color: '#7C5B9D',
    marginTop: -15,
    marginBottom: 32,
  },
  listContainer: {
    paddingBottom: height * 0.1,
  },
  option: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: '#7C5B9D',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#7C5B9D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  optionSelected: {
    backgroundColor: '#D6D3E9',
    borderColor: '#7C5B9D',
  },
  optionText: {
    fontSize: 18,
    color: 'white',
  },
  optionTextSelected: {
    fontWeight: 'bold',
    color: 'white',
  },
});
