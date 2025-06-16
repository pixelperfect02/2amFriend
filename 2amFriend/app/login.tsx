import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = () => {
    Alert.alert('Google login pressed');
  };

  const handlePhoneLogin = () => {
    Alert.alert('Phone number login pressed');
  };

  const handleLogin = () => {
    Alert.alert('Login pressed', `Email: ${email}\nPassword: ${password}`);
    // Uncomment and implement actual login logic when ready
    // if (!email.trim() || !password.trim()) {
    //   Alert.alert('Please fill all fields');
    //   return;
    // }
    // try {
    //   await signInWithEmailAndPassword(auth, email.trim(), password);
    //   Alert.alert('Login successful!');
    //   router.push('/welcome');
    // } catch (error: any) {
    //   Alert.alert('Login Error', error.message);
    // }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/sign-up')}
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
          <Text style={styles.header}>Welcome back to 2 A.M. Friend</Text>
          <Text style={styles.subHeader}>Your understanding companion awaits</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          {/* Login Button - Added back */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => router.push('/')}
          activeOpacity={0.7}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Third-party Login */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
          >
            <AntDesign name="google" size={20} color="#EA4335" style={styles.icon} />
            <Text style={styles.socialButtonText}>Log in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, styles.phoneButton]}
            onPress={handlePhoneLogin}
            activeOpacity={0.8}
          >
            <FontAwesome name="phone" size={20} color="#34A853" style={styles.icon} />
            <Text style={styles.socialButtonText}>Log in with Phone</Text>
          </TouchableOpacity>
        </View>

        {/* Continue Arrow - Currently commented out */}
        {/* <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => router.push('/welcome')}
          activeOpacity={0.7}
        >
          <View style={styles.circle}>
            <AntDesign name="arrowright" size={28} color="white" />
          </View>
        </TouchableOpacity> */}

        {/* Don't have an account - Currently commented out */}
        {/* <TouchableOpacity
          style={styles.signUpContainer}
          onPress={() => router.push('/sign-up')}
          activeOpacity={0.7}
        >
          <Text style={styles.signUpText}>
            Don't have an account? <Text style={styles.signUpLink}>Sign up</Text>
          </Text>
        </TouchableOpacity> */}
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
    marginBottom: height * 0.03,  // Matches sign-up spacing
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
  loginButton: {
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
  loginButtonText: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '600',
    color: 'white',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: height * 0.03,
  },
  forgotPasswordText: {
    color: '#7C5B9D',
    fontSize: isSmallDevice ? 14 : 16,
    textDecorationLine: 'underline',
    left: -118,
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
    marginTop: height * 0.02,
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
  signUpContainer: {
    alignItems: 'center',
  },
  signUpText: {
    color: '#7C5B9D',
    fontSize: isSmallDevice ? 14 : 16,
  },
  signUpLink: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
