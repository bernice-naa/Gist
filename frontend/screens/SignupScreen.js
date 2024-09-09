import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorUsername, setErrorUsername] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignup = () => {
    setLoading(true);
    setErrorUsername('');
    setErrorEmail('');
    setErrorPassword('');
    setErrorConfirmPassword('');

    let isValid = true;

    if (!username) {
      setErrorUsername('Username is required');
      setIsUsernameValid(false);
      isValid = false;
    } else {
      setIsUsernameValid(true);
    }

    if (!email) {
      setErrorEmail('Email is required');
      setIsEmailValid(false);
      isValid = false;
    } else if (!validateEmail(email)) {
      setErrorEmail('Invalid email address');
      setIsEmailValid(false);
      isValid = false;
    } else {
      setIsEmailValid(true);
    }

    if (!password) {
      setErrorPassword('Password is required');
      setIsPasswordValid(false);
      isValid = false;
    } else {
      setIsPasswordValid(true);
    }

    if (password !== confirmPassword) {
      setErrorConfirmPassword('Passwords do not match');
      setIsConfirmPasswordValid(false);
      isValid = false;
    } else {
      setIsConfirmPasswordValid(true);
    }

    if (isValid) {
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Home'); // Redirect to HomeScreen
      }, 2000);
    } else {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Reset validation and error states when screen comes into focus
      setIsUsernameValid(true);
      setIsEmailValid(true);
      setIsPasswordValid(true);
      setIsConfirmPasswordValid(true);
      setErrorUsername('');
      setErrorEmail('');
      setErrorPassword('');
      setErrorConfirmPassword('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      return () => {
        // Clean-up logic if needed
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/register.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={[styles.input, { borderColor: errorUsername ? 'red' : (username && isUsernameValid) ? 'green' : 'gray' }]}
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          if (text) {
            setIsUsernameValid(true);
            setErrorUsername('');
          } else {
            setIsUsernameValid(false);
            setErrorUsername('Username is required');
          }
        }}
      />
      {errorUsername ? <Text style={styles.error}>{errorUsername}</Text> : null}
      <TextInput
        style={[styles.input, { borderColor: errorEmail ? 'red' : (email && isEmailValid) ? 'green' : 'gray' }]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (validateEmail(text)) {
            setIsEmailValid(true);
            setErrorEmail('');
          } else {
            setIsEmailValid(false);
            setErrorEmail('Invalid email address');
          }
        }}
        keyboardType="email-address"
      />
      {errorEmail ? <Text style={styles.error}>{errorEmail}</Text> : null}
      <TextInput
        style={[styles.input, { borderColor: errorPassword ? 'red' : (password && isPasswordValid) ? 'green' : 'gray' }]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (text) {
            setIsPasswordValid(true);
            setErrorPassword('');
          } else {
            setIsPasswordValid(false);
            setErrorPassword('Password is required');
          }
        }}
      />
      {errorPassword ? <Text style={styles.error}>{errorPassword}</Text> : null}
      <TextInput
        style={[styles.input, { borderColor: errorConfirmPassword ? 'red' : (confirmPassword === password && isConfirmPasswordValid) ? 'green' : 'gray' }]}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          if (text === password) {
            setIsConfirmPasswordValid(true);
            setErrorConfirmPassword('');
          } else {
            setIsConfirmPasswordValid(false);
            setErrorConfirmPassword('Passwords do not match');
          }
        }}
      />
      {errorConfirmPassword ? <Text style={styles.error}>{errorConfirmPassword}</Text> : null}
      <Button title="Sign Up" onPress={handleSignup} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 2,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
