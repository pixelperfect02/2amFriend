import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
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
      <Text style={styles.header}>Find Your Connection:</Text>
      <Text style={styles.subheader}>What brings you here?</Text>

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
    fontSize: baseFontSize + 2,
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
  arrowContainer: {
    position: 'absolute',
    bottom: height * 0.08,
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
