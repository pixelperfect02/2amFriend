import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Type for list items
type OptionItem = {
  text: string;
  emoji: string;
  suggested?: boolean;
};

// Main category list
const fullOptions: OptionItem[] = [
  { text: 'Similar Struggles', emoji: '🤝' },
  { text: 'Similar Trauma', emoji: '💔' },
  { text: 'Similar Mental Health State', emoji: '🧠' },
  { text: 'Similar Culture', emoji: '🌍' },
  { text: 'Similar Mindset', emoji: '💡' },
  { text: 'Similar Life Experiences', emoji: '📖' },
  { text: 'Have lost a family member or friend', emoji: '👼' },
];

// Subcategory mapping
const subcategoryMap: Record<string, OptionItem[]> = {
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

export default function CriteriaSelectionScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const toggleSelection = (item: string) => {
    setSelected(prev => (prev === item ? null : item));
  };

  const handleForward = () => {
    if (!selected) return;

    if (selected === 'Have lost a family member or friend') {
      router.push('/grief-form');
    } else {
      router.push({ pathname: '/topic-selection', params: { category: selected } });
    }
  };

  const filteredOptions = (): OptionItem[] => {
    const lowerSearch = search.toLowerCase();

    const directMatches = fullOptions.filter(option =>
      option.text.toLowerCase().includes(lowerSearch)
    );

    const suggestedFromSub = Object.entries(subcategoryMap)
      .filter(([_, subOptions]) =>
        subOptions.some(sub => sub.text.toLowerCase().includes(lowerSearch))
      )
      .map(([category]) => ({
        text: category,
        emoji: fullOptions.find(o => o.text === category)?.emoji || '✨',
        suggested: true,
      }));

    return [
      ...directMatches,
      ...suggestedFromSub.filter(
        s => !directMatches.some(d => d.text === s.text)
      ),
    ];
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/sign-up')}
        activeOpacity={0.7}
      >
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
      </TouchableOpacity>

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

      <TextInput
        style={styles.searchInput}
        placeholder="Search your reason for being here..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={filteredOptions()}
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
              {item.emoji} {item.text}
              {item.suggested && (
                <Text style={{ fontSize: 14, color: 'white' }}> (Suggested)</Text>
              )}
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
    marginBottom: 8,
  },
  subsubheader: {
    fontSize: 14,
    textAlign: 'center',
    color: '#7C5B9D',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
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
