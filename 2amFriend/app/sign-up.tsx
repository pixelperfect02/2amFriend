import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const router = useRouter();

  const handleGoogleSignUp = () => {
    Alert.alert('Google sign-up pressed');
  };

  const handlePhoneSignUp = () => {
    Alert.alert('Phone number sign-up pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to 2 A.M. Friend</Text>

      <TouchableOpacity style={styles.button} onPress={handleGoogleSignUp}>
        <AntDesign name="google" size={24} color="#EA4335" style={styles.icon} />
        <Text style={styles.buttonText}>Sign up with Google</Text>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePhoneSignUp}>
        <FontAwesome name="phone" size={24} color="#34A853" style={styles.icon} />
        <Text style={styles.buttonText}>Sign up with Phone Number</Text>
      </TouchableOpacity>

      <View style={styles.arrowContainer}>
      <TouchableOpacity onPress={() => router.push('/criteria-selection')}>
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
    paddingTop: 120, // ⬆️ Push content down while keeping title high
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 100,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    marginRight: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#999',
    fontWeight: '500',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 125, // Position it 40px from the bottom
    left: '60%', // Center the arrow horizontally
    marginLeft: -40, // Offset by half of the button width (40px) to center it
    alignItems: 'center'
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
