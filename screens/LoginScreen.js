//screens\LoginScreen.js
import { LinearGradient } from 'expo-linear-gradient';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig';
import { colors } from './colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('aban.elik27@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleLogin = () => {
    setLoading(true); // Set loading to true when login starts
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        if (user.emailVerified) {
          navigation.navigate('BottomNavigator');
          setEmail('');
          setPassword('');
        } else {
          // Kullanıcı eğer e-posta doğrulamamışsa doğrulama e-postası gönder
          await sendEmailVerification(user);
          Alert.alert(
            'E-posta Doğrulaması Gerekli',
            'Hesabınızı kullanabilmek için e-posta adresinize gelen doğrulama linkine tıklayın.',
            [{ text: 'Tamam' }]
          );
        }
      })
      .catch((error) => {
        console.error('Giriş hatası:', error);
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Hata', 'Geçerli bir e-posta adresi giriniz.');
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert('Hata', 'Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Hata', 'Yanlış şifre girdiniz.');
        } else {
          Alert.alert('Hata', 'Bir hata oluştu, lütfen tekrar deneyin.');
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the authentication process
      });
  };

  return (
    <LinearGradient colors={[colors.black, colors.primary]} style={styles.gradient} start={[0, 0]} end={[0, 1]}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="@example.com"
            placeholderTextColor={colors.black}
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
            placeholderTextColor={colors.black}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="white" /> // Show loading spinner
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('SignupScreen')}>Sign Up</Text>
        </Text>
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
    backgroundColor: colors.white,
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
