import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const options = [
  'Job related',
  'Love Life related',
  'Passion following related',
  'Loneliness in a foreign place/country',
  'Business not doing well',
  'Marriage related',
  'Sexuality and Sexual Orientation related',
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
      // Navigate to the find-match screen
      router.push('/find-match');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose minimum one, maximum three:</Text>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={options}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selected.includes(item) && styles.optionSelected,
            ]}
            onPress={() => toggleSelection(item)}
          >
            <Text
              style={[
                styles.optionText,
                selected.includes(item) && styles.optionTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={handleNext}>
          <View style={styles.circle}>
            <AntDesign name="arrowright" size={35} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  listContainer: {
    paddingBottom: 150,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#f2f2f2',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  optionSelected: {
    backgroundColor: '#ffe5cc',
    borderColor: '#ff9900',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextSelected: {
    color: '#994d00',
    fontWeight: 'bold',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 100,
    left: '60%',
    marginLeft: -40,
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 40,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
