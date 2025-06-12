import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function MainScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.replace('/sign-up');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={require('../assets/images/home.png')}
          style={styles.background}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7C5B9D',
    // backgroundColor: 'white',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: -10, // slightly more lift
    transform: [{ scale: 0.9 }], // increased scale for bigger image
  },
});
