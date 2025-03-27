//screens\ContactRow.js
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Dialog, Divider, FAB, Portal, TextInput } from 'react-native-paper';
import { auth, firestore, serverTimestamp } from '../firebaseConfig';
import { colors } from './colors';

const ContactRow = () => {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [addedUsers, setAddedUsers] = useState([]);
    const [newDisplayName, setNewDisplayName] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchContacts = async () => {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                return;
            }

            const docRef = doc(firestore, "contacts", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setAddedUsers(docSnap.data().contacts || []);
            } else {
                setAddedUsers([]);
            }
        };

        fetchContacts();
    }, []);

    const handleSave = async () => {
        const q = query(
            collection(firestore, "users"),
            where("email", "==", userEmail)
        );
        const querySnapshot = await getDocs(q);
        const otherUserExists = querySnapshot.docs.length !== 0;

        if (otherUserExists) {
            const userData = querySnapshot.docs[0].data();
            const currentUser = auth.currentUser;
            const otherUserId = userData.uid;

            const currentUserChatRef = doc(firestore, 'chats', currentUser.uid);
            const otherUserChatRef = doc(firestore, 'chats', otherUserId);

            const currentUserUpdateData = {
                conversations: arrayUnion({ email: userEmail, displayName: newDisplayName })
            };

            const otherUserUpdateData = {
                conversations: arrayUnion({ email: currentUser.email })
            };

            await updateDoc(currentUserChatRef, currentUserUpdateData);
            await updateDoc(otherUserChatRef, otherUserUpdateData);

            const contactsRef = doc(firestore, 'contacts', currentUser.uid);
            const contactsDoc = await getDoc(contactsRef);

            if (contactsDoc.exists()) {
                await updateDoc(contactsRef, {
                    contacts: arrayUnion({ displayName: newDisplayName, email: userEmail })
                });
            } else {
                await setDoc(contactsRef, {
                    contacts: [{ displayName: newDisplayName, email: userEmail }]
                });
            }

            // Karşı tarafa güncelleme ekleme
            const otherUserContactsRef = doc(firestore, 'contacts', otherUserId);
            const otherUserContactsDoc = await getDoc(otherUserContactsRef);

            if (otherUserContactsDoc.exists()) {
                await updateDoc(otherUserContactsRef, {
                    contacts: arrayUnion({ email: currentUser.email })
                });
            } else {
                await setDoc(otherUserContactsRef, {
                    contacts: [{ email: currentUser.email }]
                });
            }

            setAddedUsers(prevUsers => [{ displayName: newDisplayName, email: userEmail }, ...prevUsers]);

            const messageCollectionRef = collection(firestore, "messages");
            const messageData = {
                senderId: currentUser.uid,
                receiverId: otherUserId,
                createdAt: serverTimestamp(),
                text: `New chat started with ${newDisplayName}`,
            };
            await addDoc(messageCollectionRef, messageData);
        } else {
            alert("User not found!");
        }

        setUserEmail('');
        setNewDisplayName('');
        setIsDialogVisible(false);
    };

    const handleUserPress = (user) => {
        navigation.navigate('Messages', { userEmail: user.email, displayName: user.displayName });
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {addedUsers.map((user, index) => (
                <TouchableOpacity key={index} onPress={() => handleUserPress(user)}>
                    <View style={styles.rowContainer}>
                        <Divider />
                        <View style={styles.row}>
                            <Avatar.Icon size={56} icon={() => <Ionicons name="person" size={24} color={colors.black} />} style={{ backgroundColor: colors.gray }} />
                            <View style={styles.textContainer}>
                                <Text style={styles.displayName}>{user.displayName}</Text>
                                <Text style={styles.email}>{user.email}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color={colors.black} style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            <Divider inset />
            <Portal>
                <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)} style={styles.dialog}>
                    <Dialog.Title style={styles.dialogTitle}>New Person</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Enter user email"
                            value={userEmail}
                            onChangeText={(value) => { setUserEmail(value) }}
                            style={styles.input}
                            underlineColor={colors.gray}
                            activeUnderlineColor={colors.primary}
                        />
                        <TextInput  
                            label="Enter display name"
                            value={newDisplayName}
                            onChangeText={(value) => { setNewDisplayName(value) }}
                            style={styles.input}
                            underlineColor={colors.gray}
                            activeUnderlineColor={colors.primary}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsDialogVisible(false)} labelStyle={{ color: colors.primary }}>Cancel</Button>
                        <Button onPress={handleSave} labelStyle={{ color: colors.primary }}>Save</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <FAB 
                icon="plus" 
                style={[styles.fab, { backgroundColor: colors.primary }]}  // Button background color
                color={colors.white}  // Icon color
                onPress={() => setIsDialogVisible(true)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray,
        marginVertical: 5,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.blackblue,
        padding: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    displayName: {
        fontWeight: 'bold',
        color: colors.black,
        fontSize: 16,
    },
    email: {
        color: colors.gray,
        fontSize: 14,
    },
    icon: {
        marginLeft: 10,
    },
    fab: {
        position: "absolute",
        bottom: 16,
        right: 16,
    },
    dialog: {
        borderRadius: 10,
        padding: 10,
    },
    dialogTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
    },
    input: {
        marginBottom: 10,
    },
    dialogButton: {
        marginHorizontal: 10,
    },
});

export default ContactRow;