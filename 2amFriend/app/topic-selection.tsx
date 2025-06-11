import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const options = [
  { text: 'Job related', emoji: '💼' },
  { text: 'Love Life related', emoji: '💔' },
  { text: 'Passion following related', emoji: '🔥' },
  { text: 'Loneliness in a foreign place/country', emoji: '🌏' },
  { text: 'Business not doing well', emoji: '📉' },
  { text: 'Marriage related', emoji: '💍' },
  { text: 'Sexuality and Sexual Orientation related', emoji: '🏳️‍🌈' },
];

export default function TopicSelectionScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleSelection = (item: string) => {
    if (selected.includes(item)) {
      setSelected(prev => prev.filter(i => i !== item));
    } else {
      if (selected.length >= 3) {
        Alert.alert('Limit Reached', 'You can select a maximum of 3 topics.');
        return;
      }
      setSelected(prev => [...prev, item]);
    }
  };

  const handleNext = () => {
    if (selected.length === 0) {
      Alert.alert('Selection Required', 'Please select at least one topic.');
    } else {
      router.push('/find-match');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.replace('/criteria-selection')}
        activeOpacity={0.7}
      >
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
      </TouchableOpacity>
      
      <Text style={styles.header}>Choose Your Struggles</Text>
      <Text style={styles.subheader}>Choose 1–3 that resonate most or at least 1 to continue</Text>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={options}
        keyExtractor={(item) => item.text}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selected.includes(item.text) && styles.optionSelected,
            ]}
            onPress={() => toggleSelection(item.text)}
          >
            <Text
              style={[
                styles.optionText,
                selected.includes(item.text) && styles.optionTextSelected,
              ]}
            >
              {item.emoji}  {item.text}
            </Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={handleNext}>
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
