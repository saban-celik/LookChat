import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebaseConfig'; 
import { colors } from './colors';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'; // Firestore fonksiyonları ekleniyor

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Yeni kullanıcı kaydedilirken, aynı zamanda bir chats koleksiyonuna da ekleniyor
      const usersCollectionRef = collection(firestore, 'users');
      await addDoc(usersCollectionRef, {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      // Yeni kullanıcının chats koleksiyonuna eklenmesi
      const chatsCollectionRef = collection(firestore, 'chats');
      await setDoc(doc(chatsCollectionRef, user.uid), { conversations: [] });
  
      alert('New user successfully registered.');
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <LinearGradient
      colors={['black', '#0080FF']}
      style={styles.gradient}
      start={[0, 0]}
      end={[0, 1]}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create a New</Text>
        <Text style={styles.title}>Account</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="..."
            placeholderTextColor={colors.black}
            onChangeText={(text) => setFirstName(text)} 
            value={firstName}  />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="..."
            placeholderTextColor={colors.black}
            onChangeText={(text) => setLastName(text)} 
            value={lastName}   />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="@example.gmail.com"
            placeholderTextColor={colors.black}
            onChangeText={(text) => setEmail(text)}
            value={email}  />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="******"
            placeholderTextColor={colors.black}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginLink} onPress={navigateToLogin}>
            <Text style={styles.loginText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 10,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
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
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    color: colors.black,
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;

