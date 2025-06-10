import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function MainScreen() {
  const router = useRouter();

  const handlePress = () => {
    console.log("Sign Up pressed");
    router.replace('/sign-up');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/home.png')}
        style={styles.background}
        resizeMode="contain"
      >
        <View style={styles.arrowContainer}>
          <TouchableOpacity 
            onPress={handlePress} 
            style={styles.touchableOpacity}
            activeOpacity={0.7}
          >
            <View style={styles.circle}>
              <AntDesign name="arrowright" size={35} color="#003B8B" />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003B8B', // Navy blue background
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    marginTop: -80, // Negative margin to move image up
  },
  arrowContainer: {
    position: 'absolute',
    bottom: '10%', // Adjusted for better positioning
    left: '50%',
    marginLeft: -30,
    alignItems: 'center',
  },
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#FFD700', // Gold color to match SignUpScreen
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#003B8B', // Navy blue border
    elevation: 5, // Added shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
