import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignUp = () => {
    Alert.alert('Google sign-up pressed');
  };

  const handlePhoneSignUp = () => {
    Alert.alert('Phone number sign-up pressed');
  };

  const handleCreateAccount = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    if (!password) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: name.trim(), 
          email: email.trim().toLowerCase(), 
          password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      Alert.alert('Success', 'Account created successfully!');
      router.push('/login');
    } catch (error) {
      console.error('Signup error:', error);
      // Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.replace('/')}
        activeOpacity={0.7}
      >
        <AntDesign name="arrowleft" size={24} color="#7C5B9D" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome to 2 A.M. Friend</Text>
          <Text style={styles.subHeader}>Find your understanding companion</Text>
        </View>

        {/* Create Account Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />
          <TouchableOpacity 
            style={[styles.createAccountButton, isLoading && styles.disabledButton]} 
            onPress={handleCreateAccount}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.createAccountText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Third-party Sign Up */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity 
            style={[styles.socialButton, styles.googleButton]} 
            onPress={handleGoogleSignUp}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <AntDesign name="google" size={20} color="#EA4335" style={styles.icon} />
            <Text style={styles.socialButtonText}>Sign up with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.socialButton, styles.phoneButton]} 
            onPress={handlePhoneSignUp}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <FontAwesome name="phone" size={20} color="#34A853" style={styles.icon} />
            <Text style={styles.socialButtonText}>Sign up with Phone</Text>
          </TouchableOpacity>
        </View>

        {/* Already have an account */}
        <TouchableOpacity 
          style={styles.loginContainer} 
          onPress={() => !isLoading && router.push('/login')}
          activeOpacity={0.7}
          disabled={isLoading}
        >
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Log in</Text>
          </Text>
        </TouchableOpacity>

        {/* Continue Arrow */}
        <TouchableOpacity 
          style={styles.arrowContainer} 
          onPress={() => !isLoading && router.push('/welcome')}
          activeOpacity={0.7}
          disabled={isLoading}
        >
          <View style={styles.circle}>
            <AntDesign name="arrowright" size={28} color="white" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: height * 0.04,
    left: 8,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 40,
    paddingTop: height * 0.1,
  },
  headerContainer: {
    marginBottom: height * 0.04,
    alignItems: 'center',
  },
  header: {
    fontSize: isSmallDevice ? 24 : 28,
    fontWeight: 'bold',
    color: '#7C5B9D',
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: isSmallDevice ? 14 : 16,
    color: '#7C5B9D',
    opacity: 0.8,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: height * 0.03,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: isSmallDevice ? 12 : 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: isSmallDevice ? 14 : 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#7C5B9D',
    color: '#7C5B9D',
  },
  createAccountButton: {
    backgroundColor: '#7C5B9D',
    paddingVertical: isSmallDevice ? 14 : 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    opacity: 0.7,
  },
  createAccountText: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '600',
    color: 'white',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#7C5B9D',
    opacity: 0.3,
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#7C5B9D',
    opacity: 0.7,
    fontWeight: '500',
    fontSize: isSmallDevice ? 14 : 16,
  },
  socialButtonsContainer: {
    marginBottom: height * 0.04,
  },
  socialButton: {
    flexDirection: 'row',
    paddingVertical: isSmallDevice ? 12 : 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#7C5B9D',
  },
  googleButton: {
    backgroundColor: 'white',
  },
  phoneButton: {
    backgroundColor: 'white',
  },
  socialButtonText: {
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '500',
    marginLeft: 10,
    color: '#7C5B9D',
  },
  icon: {
    marginRight: 10,
  },
  arrowContainer: {
    alignItems: 'center',
    marginTop: height * 0.07,
    marginBottom: height * 0.04,
  },
  circle: {
    backgroundColor: '#7C5B9D',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: -30,
  },
  loginText: {
    color: '#7C5B9D',
    fontSize: isSmallDevice ? 14 : 16,
  },
  loginLink: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
