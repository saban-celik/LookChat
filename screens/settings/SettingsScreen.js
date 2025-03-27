//screens\settings\SettingsScreen.js
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Subheading } from 'react-native-paper';
import { firestore } from '../../firebaseConfig';
import { colors } from '../colors';

const SettingsScreen = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const usersRef = collection(firestore, 'users');
          const q = query(usersRef, where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      navigation.navigate("LoginScreen");
      await signOut(getAuth());
      alert('Logged Out');
    } catch (error) {
      console.error('An error occurred while signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {userDetails && (
        <View style={styles.userDetailsContainer}>
          <View style={styles.userInfo}>
            <Avatar.Icon size={56} icon={() => <Ionicons name="person" size={24} color={colors.black} />} style={{ backgroundColor: colors.gray }} />
            <View style={styles.nameContainer}>
              <Subheading style={styles.name}>{`${userDetails.firstName.toUpperCase()} ${userDetails.lastName.toUpperCase()}`}</Subheading>
              <Subheading style={styles.email}>{user.email || ''}</Subheading>
            </View>
          </View>
          <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Subheading style={styles.buttonText}>Sign Out</Subheading>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AccountScreen')}>
          <Ionicons name="person-circle" size={24} color={colors.black} style={styles.optionIcon} />
          <Subheading style={styles.optionText}>Accounts</Subheading>
          <Ionicons name="chevron-forward" size={24} color={colors.black} style={styles.optionArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('NotificationScreen')}>
          <Ionicons name="notifications" size={24} color={colors.black} style={styles.optionIcon} />
          <Subheading style={styles.optionText}>Notifications</Subheading>
          <Ionicons name="chevron-forward" size={24} color={colors.black} style={styles.optionArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PrivacyScreen')}>
          <MaterialIcons name="security" size={24} color={colors.black} style={styles.optionIcon} />
          <Subheading style={styles.optionText}>Privacy & Security</Subheading>
          <Ionicons name="chevron-forward" size={24} color={colors.black} style={styles.optionArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AboutScreen')}>
          <FontAwesome name="info-circle" size={24} color={colors.black} style={styles.optionIcon} />
          <Subheading style={styles.optionText}>About</Subheading>
          <Ionicons name="chevron-forward" size={24} color={colors.black} style={styles.optionArrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 30,
    backgroundColor: colors.white,
  },
  userDetailsContainer: {
    backgroundColor: colors.gray,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameContainer: {
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  email: {
    fontSize: 16,
    color: colors.black,
    marginTop: 5,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    backgroundColor: colors.gray,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
  },
  optionArrow: {
    marginLeft: 'auto',
  },
});

export default SettingsScreen;
