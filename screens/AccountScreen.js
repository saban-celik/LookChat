import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import { colors } from './colors';

const AccountScreen = () => {
  const [displayName, setDisplayName] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  const handleUpdateDisplayName = () => {
    if (user) {
      updateProfile(user, { displayName: newDisplayName })
        .then(() => {
          setDisplayName(newDisplayName);
          Alert.alert('Success', 'Display name updated successfully');
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Display Name:</Text>
        <Text style={styles.displayName}>{displayName}</Text>
        <TextInput
          style={styles.input}
          placeholder="New Display Name"
          value={newDisplayName}
          onChangeText={(text) => setNewDisplayName(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdateDisplayName}>
          <Text style={styles.buttonText}>Update Display Name</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Other Account Tasks</Text>
        <TouchableOpacity style={styles.taskButton}>
          <Text style={styles.taskButtonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.taskButton}>
          <Text style={styles.taskButtonText}>Update Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.taskButton}>
          <Text style={styles.taskButtonText}>Manage Two-Factor Authentication</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 10,
  },
  displayName: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.blackblue,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  taskButton: {
    backgroundColor: colors.blackblue,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  taskButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
