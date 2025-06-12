import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

const subcategoryMap: Record<string, { text: string; emoji: string }[]> = {
  'Similar Struggles': [
    { text: 'Job related', emoji: '💼' },
    { text: 'Love life related', emoji: '💔' },
    { text: 'Passion following related', emoji: '🔥' },
    { text: 'Loneliness in a foreign place/Country', emoji: '🌏' },
    { text: 'Marriage related', emoji: '💍' },
    { text: 'Sexuality & sexual orientation', emoji: '🏳️‍🌈' },
    { text: 'Career/Business not going well', emoji: '📉' },
    { text: 'Physical disability', emoji: '🦽' },
    { text: 'Debt related', emoji: '💸' },
  ],
  'Similar Trauma': [
    { text: 'Bullying', emoji: '😢' },
    { text: 'Community Violence / Racial Discrimination', emoji: '✊🏾' },
    { text: 'Natural Disasters', emoji: '🌪️' },
    { text: 'Partner violence', emoji: '💔' },
    { text: 'Physical abuse', emoji: '👊' },
    { text: 'Sexual abuse/assault', emoji: '🚫' },
    { text: 'Military combat', emoji: '🎖️' },
    { text: 'Emotional abuse', emoji: '🧠' },
    { text: 'Prenatal/Postnatal trauma', emoji: '👶' },
    { text: 'Intergenerational trauma', emoji: '🧬' },
    { text: 'Childhood abuse/Neglect', emoji: '🧸' },
    { text: 'Parents’ separation', emoji: '🏚️' },
  ],
  'Similar Mental Health State': [
    { text: 'Depressed', emoji: '😞' },
    { text: 'Stressed all the time', emoji: '😰' },
    { text: 'Anxiety & Panic attacks', emoji: '😨' },
    { text: 'PTSD', emoji: '🧠' },
    { text: 'Grief phase', emoji: '🕊️' },
    { text: 'Healed & in good state', emoji: '🌈' },
    { text: 'Addiction (Alcohol / Drug / Sex)', emoji: '🍷' },
    { text: 'Self-harm thoughts', emoji: '⚠️' },
    { text: 'Phobias', emoji: '🕷️' },
  ],
  'Similar Culture': [
    { text: 'Individualistic Cultures', emoji: '👤' },
    { text: 'Family-oriented / Collectivistic Cultures', emoji: '👨‍👩‍👧‍👦' },
  ],
  'Similar Mindset': [
    { text: 'Optimistic', emoji: '😊' },
    { text: 'Pessimistic', emoji: '☹️' },
    { text: 'Proactive', emoji: '⚡' },
    { text: 'Reactive', emoji: '🔁' },
    { text: 'Entrepreneurial', emoji: '💼' },
    { text: 'Victim', emoji: '🙇' },
    { text: 'Creator', emoji: '🎨' },
    { text: 'Analytical', emoji: '📊' },
    { text: 'Intuitive', emoji: '🌙' },
    { text: 'Competitive', emoji: '🏁' },
    { text: 'Collaborative', emoji: '🤝' },
  ],
  'Similar Life Experiences': [
    { text: 'A traumatic event', emoji: '⚡' },
    { text: 'Falling In Love', emoji: '❤️' },
    { text: 'Heartbreak', emoji: '💔' },
    { text: 'Having children', emoji: '👶' },
    { text: 'Travelling', emoji: '✈️' },
    { text: 'Personal goal achieved', emoji: '🏅' },
    { text: 'Professional goal achieved', emoji: '💼' },
    { text: 'Major health issue', emoji: '🏥' },
    { text: 'Life-threatening events', emoji: '🚨' },
    { text: 'Spiritual Awakening', emoji: '🧘‍♀️' },
    { text: 'Rejection', emoji: '🚫' },
  ],
};

export default function TopicSelectionScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const options = subcategoryMap[category as string] || [];

  const toggleSelection = (item: string) => {
    if (category === 'Similar Culture') {
      setSelected(prev => (prev.includes(item) ? [] : [item]));
    } else {
      if (selected.includes(item)) {
        setSelected(prev => prev.filter(i => i !== item));
      } else {
        if (selected.length >= 3) {
          Alert.alert('Limit Reached', 'You can select a maximum of 3 topics.');
          return;
        }
        setSelected(prev => [...prev, item]);
      }
    }
  };

  const handleNext = () => {
    if (selected.length === 0) {
      Alert.alert('Selection Required', 'Please select at least one topic.');
    } else {
      if (category === 'Have lost a family member or friend') {
        router.push('/grief-form');
      } else {
        router.push('/find-match');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/criteria-selection')}
      >
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forwardButton}
        onPress={handleNext}
        disabled={selected.length === 0}
      >
        <AntDesign
          name="arrowright"
          size={24}
          color={selected.length === 0 ? '#ccc' : '#7C5B9D'}
        />
      </TouchableOpacity>

      <Text style={styles.header}>Choose: {category}</Text>
      <Text style={styles.subheader}>
        {category === 'Similar Culture'
          ? 'Pick one that describes you best'
          : category === 'Have lost a family member or friend'
          ? 'Fill out the next form to continue'
          : 'Pick 1–3 topics to continue'}
      </Text>

      {/* Conditionally render subheading ONLY for "Similar Life Experiences" */}
      {category === 'Similar Life Experiences' && (
        <Text style={styles.lifeExperienceSubheading}>
          A life experience that changed your life:
        </Text>
      )}

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={options}
        keyExtractor={(item) => item.text}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.option, selected.includes(item.text) && styles.optionSelected]}
            onPress={() => toggleSelection(item.text)}
          >
            <Text
              style={[styles.optionText, selected.includes(item.text) && styles.optionTextSelected]}
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
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 10,
  },
  forwardButton: {
    position: 'absolute',
    top: 26,
    right: 5,
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
  lifeExperienceSubheading: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#7C5B9D',
    marginBottom: 20,
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
