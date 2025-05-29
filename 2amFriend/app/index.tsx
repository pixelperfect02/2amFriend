import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function MainScreen() {
  const router = useRouter();

  // Temporary dummy function for navigation
  const handlePress = () => {
    console.log("Sign Up pressed");
    // For now, replace with a dummy action or real navigation once the page is set
    router.replace('/sign-up');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/home.png')}  // Use home.png
        style={styles.background}
        resizeMode="contain" // 'contain' will scale the image to fit within the box without stretching
      >
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={handlePress} style={styles.touchableOpacity}>
            <View style={styles.circle}>
              <AntDesign name="arrowright" size={40} color="black" />
              {/* <Text style={styles.buttonText}>Sign Up</Text> */}
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
    backgroundColor: 'white', // Set the background color to white
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',  // Align the content to the top
    width: '100%', // Full width
    height: '100%', // Full height
    position: 'relative', // Allow absolute positioning of image within the container
    top: -90, // Move the image upwards by 90 units
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 40, // Position it 40px from the bottom
    left: '52%', // Center the arrow horizontally
    marginLeft: -40, // Offset by half of the button width (40px) to center it
    alignItems: 'center', // Align children to the center
  },
  touchableOpacity: {
    flexDirection: 'row', // Arrange the arrow and text horizontally
    alignItems: 'center', // Align the arrow and text vertically
  },
  circle: {
    backgroundColor: 'white',
    borderRadius: 30, // Make it a circle
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
    color: 'black',
  },
});
