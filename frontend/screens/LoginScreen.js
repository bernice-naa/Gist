import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    setLoading(true);
    setUsernameError('');
    setPasswordError('');

    let isValid = true;

    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid) {
      if (username === 'Admin' && password === 'password') {
        // Successful login
        setLoading(false);
        // Navigate to another screen or perform other actions
        navigation.navigate('Home');
      } else {
        // Login failed
        setLoading(false);
        setPasswordError('Invalid username or password');
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, { borderColor: usernameError ? 'red' : 'green' }]}
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          if (text) {
            setUsernameError('');
          }
        }}
      />
      {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}

      <TextInput
        style={[styles.input, { borderColor: passwordError ? 'red' : 'green' }]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (text) {
            setPasswordError('');
          }
        }}
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      <Button title="Login" onPress={handleLogin} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
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
});
