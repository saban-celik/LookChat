import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { colors } from './colors';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('a@gmail.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('BottomNavigator');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.error('Hata:', error);
        if (error.code === 'auth/invalid-email') {
          alert('Geçerli bir e-posta adresi giriniz.');
        } else if (error.code === 'auth/user-not-found') {
          alert('Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.');
        } else if (error.code === 'auth/wrong-password') {
          alert('Yanlış şifre girdiniz.');
        } else {
          console.error('Giriş hatası:', error);
        }
      });
  };

  const handleSignup = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <LinearGradient
      colors={['black', '#0080FF']}
      style={styles.gradient}
      start={[0, 0]}
      end={[0, 1]}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="@example.gmail.com"
            placeholderTextColor={colors.black} // Placeholder rengi siyah
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="******"
            placeholderTextColor={colors.black} // Placeholder rengi siyah
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink} onPress={handleSignup}>Sign Up</Text></Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.white,
    textTransform: 'uppercase',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  inputTitle: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.gray,
    color: colors.black,
    fontSize: 16,
  },
  buttonContainer: {
    width: '80%',
    paddingTop: 10,
    marginBottom: 20,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  signupText: {
    color: colors.white,
  },
  signupLink: {
    color: colors.black,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
