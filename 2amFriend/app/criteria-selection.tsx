import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
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

  return ( 
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.replace('/sign-up')}
        activeOpacity={0.7}
      >
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
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

      <View style={styles.arrowContainer}>
        <TouchableOpacity
          onPress={() => router.push('/topic-selection')}
          disabled={!selected}
          activeOpacity={0.7}
        >
          <View style={styles.circle}>
            <AntDesign name="arrowright" size={28} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const baseFontSize = width < 375 ? 14 : width < 430 ? 16 : 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 60,
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
    paddingBottom: height * 0.18,
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
    borderWidth: 1,
  },
  optionText: {
    fontSize: 18,
    color: 'white',
  },
  optionTextSelected: {
    fontWeight: 'bold',
    color: 'white',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: height * 0.06,
    left: '50%',
    marginLeft: 1,
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#7C5B9D',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
