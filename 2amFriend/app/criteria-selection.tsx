import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const options = [
  'Similar Struggles',
  'Similar Trauma',
  'Similar Mental Health State',
  'Similar Culture',
  'Similar Personality/Mindset',
  'Similar Life Experiences',
  'Have lost a family member or friend',
];

export default function CriteriaSelectionScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const toggleSelection = (item: string) => {
    setSelected(prev => (prev === item ? null : item));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Connect with a friend based on:</Text>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={options}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selected === item && styles.optionSelected,
            ]}
            onPress={() => toggleSelection(item)}
          >
            <Text
              style={[
                styles.optionText,
                selected === item && styles.optionTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Arrow Button */}
      <View style={styles.arrowContainer}>
        <TouchableOpacity
          onPress={() => router.push('/topic-selection')}
          disabled={!selected} // Optional: disable navigation unless one is selected
        >
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
    paddingTop: 90,
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
    backgroundColor: '#cce5ff',
    borderColor: '#3399ff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextSelected: {
    color: '#004080',
    fontWeight: 'bold',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 120,
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
