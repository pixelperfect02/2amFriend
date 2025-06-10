import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
      <Text style={styles.header}>Choose Your Struggles</Text>
      <Text style={styles.subheader}>Choose 1–3 that resonate most or atleast 1 to continue</Text>

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
            <AntDesign name="arrowright" size={28} color="#003B8B" />
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
    backgroundColor: '#003B8B',
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.12,
  },
  header: {
    fontSize: baseFontSize + 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 8,
  },
  subheader: {
    fontSize: baseFontSize - 3,
    textAlign: 'center',
    color: 'white',
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: height * 0.18,
  },
  option: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 59, 139, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  optionSelected: {
    backgroundColor: '#FFD700',
    borderColor: '#003B8B',
    borderWidth: 2,
  },
  optionText: {
    fontSize: baseFontSize,
    color: '#003B8B',
  },
  optionTextSelected: {
    fontWeight: '600',
  },
  noteText: {
    color: 'white',
    fontSize: baseFontSize - 2,
    textAlign: 'center',
    marginTop: 10,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: height * 0.06,
    left: '50%',
    marginLeft: 1,
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#FFD700',
    borderColor: '#003B8B',
    borderWidth: 2,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
