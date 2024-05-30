import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { colors } from './colors';

const NotificationScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.text}>
        LookChat provides notifications to keep you updated with new messages and activities in the app. 
        Our notification system ensures that you never miss an important message or update.
      </Text>
      <Text style={styles.sectionTitle}>Notification Types</Text>
      <Text style={styles.text}>
        - **Message Notifications:** Get notified instantly when you receive a new message.
      </Text>
      <Text style={styles.text}>
        - **Activity Notifications:** Stay informed about activities and updates from your contacts.
      </Text>
      <Text style={styles.sectionTitle}>Managing Notifications</Text>
      <Text style={styles.text}>
        You can manage your notification settings in the LookChat app to ensure you only receive the notifications that matter to you.
      </Text>
      <Text style={styles.text}>
        - **Enable/Disable Notifications:** Toggle notifications on or off as per your preference.
      </Text>
      <Text style={styles.text}>
        - **Notification Tone:** Customize the sound of your notifications to distinguish LookChat alerts from other apps.
      </Text>
      <Text style={styles.text}>
        - **Do Not Disturb:** Use the Do Not Disturb mode to silence notifications during specific times or activities.
      </Text>
      <Text style={styles.sectionTitle}>Privacy and Security</Text>
      <Text style={styles.text}>
        Your privacy is important to us. LookChat ensures that your notifications are secure and private, showing only the necessary information on your device's lock screen.
      </Text>
    </ScrollView>
  );
};

export default NotificationScreen;

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
