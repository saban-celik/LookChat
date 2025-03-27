//screens\settings\PrivacyScreen.js
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../colors';

const PrivacyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.text}>
        At LookChat, we take your privacy seriously. This Privacy Policy outlines how we collect,
        use, and protect your information when you use our messaging app.
      </Text>
      <Text style={styles.sectionTitle}>Information We Collect</Text>
      <Text style={styles.text}>
        - **Account Information:** When you create a LookChat account, we collect your phone number,
        profile name, and profile picture.
      </Text>
      <Text style={styles.text}>
        - **Messages:** LookChat uses end-to-end encryption to ensure your messages are private
        and secure. We do not store your messages on our servers.
      </Text>
      <Text style={styles.text}>
        - **Contacts:** With your permission, we access your phone contacts to connect you with your
        friends and family who are also using LookChat.
      </Text>
      <Text style={styles.text}>
        - **Usage Data:** We collect information about how you use LookChat, such as features you
        use and interactions with other users, to improve our services.
      </Text>
      <Text style={styles.sectionTitle}>How We Use Your Information</Text>
      <Text style={styles.text}>
        - **To Provide Services:** We use your information to provide and improve LookChat's features
        and functionality.
      </Text>
      <Text style={styles.text}>
        - **Customer Support:** We use your information to provide customer support and respond to your
        inquiries.
      </Text>
      <Text style={styles.text}>
        - **Security:** We use your information to enhance the security of LookChat and protect against
        misuse.
      </Text>
      <Text style={styles.sectionTitle}>Sharing Your Information</Text>
      <Text style={styles.text}>
        We do not share your personal information with third parties except as necessary to provide
        our services or comply with legal obligations.
      </Text>
      <Text style={styles.sectionTitle}>Your Choices</Text>
      <Text style={styles.text}>
        - **Profile Information:** You can update your profile information at any time through the LookChat app.
      </Text>
      <Text style={styles.text}>
        - **Contacts:** You can manage your contact permissions through your device settings.
      </Text>
      <Text style={styles.text}>
        - **Account Deletion:** You can delete your LookChat account at any time. Upon deletion, your
        information will be removed from our servers.
      </Text>
      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.text}>
        If you have any questions or concerns about our Privacy Policy, please contact us at
        privacy@lookchat.com.
      </Text>
    </ScrollView>
  );
};

export default PrivacyScreen;

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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
});
