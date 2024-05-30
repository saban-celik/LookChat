import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Avatar, Divider, FAB, Portal, Dialog, Button, TextInput } from 'react-native-paper';
import { auth, firestore, serverTimestamp } from '../firebaseConfig';
import { collection, doc, query, where, getDocs, updateDoc, arrayUnion, addDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { colors } from './colors';
import { Ionicons } from '@expo/vector-icons';

const ContactRow = () => {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [addedUsers, setAddedUsers] = useState([]);
    const [newDisplayName, setNewDisplayName] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchConversations = async () => {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                return;
            }
            
            const q = query(
                collection(firestore, "chats"),
                where("conversations", "array-contains", currentUser.email)
            );
            const querySnapshot = await getDocs(q);
            const conversations = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const usersData = Object.values(data).filter(val => typeof val === 'object');
                const users = usersData.map(userData => ({
                    displayName: userData.displayName,
                    email: userData.email
                }));
                return users;
            });
    
            const currentUserConversations = conversations.find(users => users.some(user => user.email === currentUser.email));
            if (currentUserConversations) {
                setAddedUsers(currentUserConversations);
            } else {
                setAddedUsers([]);
            }
        };
        
        fetchConversations();
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
                conversations: arrayUnion({ email: currentUser.email, displayName: currentUser.displayName })
            };
    
            await updateDoc(currentUserChatRef, currentUserUpdateData);
            await updateDoc(otherUserChatRef, otherUserUpdateData);
    
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
