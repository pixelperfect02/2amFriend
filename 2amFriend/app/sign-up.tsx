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
  View
} from 'react-native';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignUp = () => {
    Alert.alert('Google sign-up pressed');
  };

  const handlePhoneSignUp = () => {
    Alert.alert('Phone number sign-up pressed');
  };

  const handleCreateAccount = () => {
    Alert.alert('Creating account for:', `${name}, ${email}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity 
            style={styles.createAccountButton} 
            onPress={handleCreateAccount}
            activeOpacity={0.8}
          >
            <Text style={styles.createAccountText}>Create Account</Text>
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
          >
            <AntDesign name="google" size={20} color="#EA4335" style={styles.icon} />
            <Text style={styles.socialButtonText}>Sign up with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.socialButton, styles.phoneButton]} 
            onPress={handlePhoneSignUp}
            activeOpacity={0.8}
          >
            <FontAwesome name="phone" size={20} color="#34A853" style={styles.icon} />
            <Text style={styles.socialButtonText}>Sign up with Phone</Text>
          </TouchableOpacity>
        </View>

       

        {/* Already have an account */}
        <TouchableOpacity 
          style={styles.loginContainer} 
          onPress={() => router.push('/')}
          activeOpacity={0.7}
        >
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Log in</Text>
          </Text>
        </TouchableOpacity>

         {/* Continue Arrow */}
         <TouchableOpacity 
          style={styles.arrowContainer} 
          onPress={() => router.push('/criteria-selection')}
          activeOpacity={0.7}
        >
          <View style={styles.circle}>
            <AntDesign name="arrowright" size={28} color="black" />
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
    backgroundColor: '#003B8B',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 40,
    paddingTop: height * 0.05,
    marginTop: 50,
  },
  headerContainer: {
    marginBottom: height * 0.04,
    alignItems: 'center',
  },
  header: {
    fontSize: isSmallDevice ? 24 : 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: isSmallDevice ? 14 : 16,
    color: 'rgba(255, 255, 255, 0.8)',
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  createAccountButton: {
    backgroundColor: '#FFD700',
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
  createAccountText: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '600',
    color: '#003B8B',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    marginHorizontal: 10,
    color: 'rgba(255, 255, 255, 0.7)',
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    backgroundColor: '#FFD700',
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
  },
  loginText: {
    color: 'white',
    fontSize: isSmallDevice ? 14 : 16,
  },
  loginLink: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
