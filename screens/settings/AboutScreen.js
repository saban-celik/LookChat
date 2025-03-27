//screens\settings\AboutScreen.js
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../colors';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About LookChat</Text>
      <Text style={styles.text}>
        LookChat is an innovative messaging app designed to make communication
        seamless and enjoyable. With LookChat, you can easily connect with friends,
        family, and colleagues through instant messaging, voice calls, and video calls.
        Our app offers a user-friendly interface and a variety of features to enhance your
        messaging experience.
      </Text>
      <Text style={styles.text}>
        Key Features:
      </Text>
      <Text style={styles.feature}>
        - Instant Messaging: Send and receive messages in real-time.
      </Text>
      <Text style={styles.feature}>
        - Voice and Video Calls: Connect with your contacts through high-quality voice and video calls.
      </Text>
      <Text style={styles.feature}>
        - Group Chats: Create groups and stay connected with multiple friends at once.
      </Text>
      <Text style={styles.feature}>
        - Media Sharing: Share photos, videos, and documents with ease.
      </Text>
      <Text style={styles.feature}>
        - Customizable Profiles: Personalize your profile with a photo, status, and more.
      </Text>
      <Text style={styles.feature}>
        - End-to-End Encryption: Your conversations are private and secure.
      </Text>
      <Text style={styles.text}>
        We are constantly working to improve LookChat and bring you the best messaging experience.
        Thank you for choosing LookChat!
      </Text>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  text: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
  feature: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
