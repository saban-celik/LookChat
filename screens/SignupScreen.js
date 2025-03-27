//screens\SignupScreen.js
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, firestore } from '../firebaseConfig';
import { colors } from './colors';

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (verificationSent) {
      const interval = setInterval(async () => {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          setVerified(true);
          clearInterval(interval);
          const userRef = doc(firestore, 'users', auth.currentUser.uid);
          await updateDoc(userRef, { emailVerified: true });
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [verificationSent]);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      await addDoc(collection(firestore, 'users'), {
        uid: user.uid,
        firstName,
        lastName,
        email,
        emailVerified: false,
      });
      await setDoc(doc(firestore, 'chats', user.uid), { conversations: [] });
      setVerificationSent(true);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <LinearGradient colors={[colors.black, colors.primary]} style={styles.gradient} start={[0, 0]} end={[0, 1]}>
      <View style={styles.container}>
        {!verificationSent ? (
          <>
            <Text style={styles.title}>Create a New Account</Text>
            <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstName} value={firstName} />
            <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastName} value={lastName} />
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
            <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
              {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.buttonText}>Sign Up</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backToLogin}>
              <Text style={styles.backToLoginText}>Back to Login</Text>
            </TouchableOpacity>
          </>
        ) : !verified ? (
          <View style={styles.verificationContainer}>
            <ActivityIndicator size="large" color={colors.white} />
            <Text style={styles.verificationText}>Please verify your email</Text>
          </View>
        ) : (
          <View style={styles.successContainer}>
            <Image source={require('../assets/check.png')} style={styles.checkIcon} />
            <Text style={styles.successText}>Email Verified! You can login now.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.buttonText}>Go to Login</Text>
            </TouchableOpacity>
          </View>
        )}
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
    marginBottom: 10,
    color: colors.white,
    textTransform: 'uppercase',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    color: colors.black,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    marginBottom: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  verificationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  verificationText: {
    color: colors.white,
    fontSize: 18,
    marginTop: 10,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  checkIcon: {
    width: 80,
    height: 80,
  },
  successText: {
    color: colors.white,
    fontSize: 18,
    marginTop: 10,
  },
  backToLogin: {
    marginTop: 20,
  },
  backToLoginText: {
    color: colors.white,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
