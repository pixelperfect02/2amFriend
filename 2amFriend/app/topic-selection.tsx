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
    { text: 'Community Violence', emoji: '⚔️' },
    { text: 'Racial Discrimination', emoji: '✊🏾' },
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
    { text: 'Family-oriented Cultures', emoji: '👨‍👩‍👧‍👦' },
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

const definitions: Record<string, string> = {
  'Job related': 'Issues related to your employment or workplace.',
  'Love life related': 'Concerns about romantic relationships.',
  'Passion following related': 'Challenges related to pursuing your passions or dreams.',
  'Loneliness in a foreign place/Country': 'Feeling isolated or disconnected while living abroad.',
  'Marriage related': 'Topics involving marriage or partnership.',
  'Sexuality & sexual orientation': 'Topics concerning your sexual identity and preferences.',
  'Career/Business not going well': 'Difficulties with your career or business.',
  'Physical disability': 'Living with or managing a physical disability.',
  'Debt related': 'Financial difficulties caused by debt.',
  'Bullying': 'Being subjected to repeated aggressive behavior or harassment.',
  'Community Violence': 'Experiences of violence community conflicts.',
  'Racial Discrimination': 'Experiences of discrimination due to race.',
  'Natural Disasters': 'Trauma related to events like floods, earthquakes, or storms.',
  'Partner violence': 'Experiences of violence or abuse by a partner.',
  'Physical abuse': 'Experiencing bodily harm inflicted by others.',
  'Sexual abuse/assault': 'Experiencing unwanted sexual contact or assault.',
  'Military combat': 'Trauma related to military service and combat situations.',
  'Emotional abuse': 'Psychological maltreatment or manipulation.',
  'Prenatal/Postnatal trauma': 'Trauma before or after birth.',
  'Intergenerational trauma': 'Trauma passed down from previous generations.',
  'Childhood abuse/Neglect': 'Abuse or neglect experienced during childhood.',
  'Parents’ separation': 'Impact of parents divorcing or separating.',
  'Depressed': 'Feeling very sad, hopeless, or lacking energy.',
  'Stressed all the time': 'Constant feelings of stress and overwhelm.',
  'Anxiety & Panic attacks': 'Episodes of intense fear and physical symptoms of anxiety.',
  'PTSD': 'Post-Traumatic Stress Disorder, a condition triggered by traumatic events.',
  'Grief phase': 'Stages of grieving a loss.',
  'Healed & in good state': 'Feeling recovered and mentally well.',
  'Addiction (Alcohol / Drug / Sex)': 'Dependence on substances or behaviors.',
  'Self-harm thoughts': 'Thoughts of intentionally causing self-injury.',
  'Phobias': 'Irrational fears of specific things or situations.',
  'Individualistic Cultures': 'Cultures that emphasize individual goals and independence.',
  'Family-oriented': 'Cultures that emphasize family and group goals.',
  'Optimistic': 'Having a positive outlook on life.',
  'Pessimistic': 'Tending to see the worst aspect of things.',
  'Proactive': 'Taking initiative and controlling situations.',
  'Reactive': 'Responding to events after they happen.',
  'Entrepreneurial': 'Having a mindset to start and run businesses.',
  'Victim': 'Feeling powerless or oppressed.',
  'Creator': 'Someone who makes or innovates things.',
  'Analytical': 'Using logical reasoning and data analysis.',
  'Intuitive': 'Relying on gut feelings and instincts.',
  'Competitive': 'Driven to outperform others.',
  'Collaborative': 'Preferring to work with others.',
  'A traumatic event': 'An experience causing severe emotional distress.',
  'Falling In Love': 'Developing strong romantic feelings.',
  'Heartbreak': 'Emotional pain from lost love.',
  'Having children': 'Experiencing parenthood.',
  'Travelling': 'Visiting new places and cultures.',
  'Personal goal achieved': 'Accomplishing personal ambitions.',
  'Professional goal achieved': 'Achieving career milestones.',
  'Major health issue': 'Facing serious health challenges.',
  'Life-threatening events': 'Events that threaten your life.',
  'Spiritual Awakening': 'A profound shift in spiritual awareness.',
  'Rejection': 'Being refused or excluded.',
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

  const showDefinition = (item: string) => {
    const definition = definitions[item] || 'No definition available.';
    Alert.alert(item, definition);
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

      {category === 'Similar Life Experiences' && (
        <Text style={styles.lifeExperienceSubheading}>
          A life experience that changed your life:
        </Text>
      )}

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={options}
        keyExtractor={item => item.text}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.option, selected.includes(item.text) && styles.optionSelected]}
            onPress={() => toggleSelection(item.text)}
          >
            <View style={styles.optionRow}>
              <Text
                style={[styles.optionText, selected.includes(item.text) && styles.optionTextSelected]}
              >
                {item.emoji}  {item.text}
              </Text>

              <TouchableOpacity
                onPress={() => showDefinition(item.text)}
                style={styles.infoButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.infoButtonText}>i</Text>
              </TouchableOpacity>
            </View>
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
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: 'white',
  },
  optionTextSelected: {
    fontWeight: 'bold',
    color: 'white',
  },
  infoButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    color: '#7C5B9D',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16,
  },
});
