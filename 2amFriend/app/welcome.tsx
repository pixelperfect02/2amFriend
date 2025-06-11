import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

export default function WelcomeScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/welcome2');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.replace('/sign-up')}
        activeOpacity={0.7}
      >
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
      </TouchableOpacity>

      {/* Text Section */}
      <View style={[styles.textContainer, { paddingHorizontal: width * 0.08 }]}>
        <Text style={[
          styles.title,
          {
            fontSize: isSmallDevice ? 30 : 36,
            lineHeight: isSmallDevice ? 36 : 42,
            marginTop: height * 0.02
          }
        ]}>
          Meet new people who share your interests
        </Text>
      </View>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/welcome.png')}
          style={[
            styles.image,
            {
              width: width * 1,
              height: height * 0.5,
              maxHeight: 500,
              minHeight: 350
            }
          ]}
          resizeMode="contain"
        />
      </View>

      {/* Button Section */}
      <View style={[styles.buttonContainer, { marginBottom: height * 0.05 }]}>
        <TouchableOpacity 
          onPress={handlePress} 
          style={[
            styles.button,
            {
              paddingHorizontal: width * 0.15,
              paddingVertical: height * 0.022,
              minWidth: width * 0.7
            }
          ]}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.03,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.1,
    left: 25,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.05,
  },
  title: {
    color: '#7C5B9D',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#7C5B9D',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
