import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { colors } from './colors';
import { auth, firestore, serverTimestamp } from '../firebaseConfig';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const Chats = ({ route }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { userEmail, displayName } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text>{displayName}</Text>,
        });
        fetchMessages();
    }, [displayName, navigation]);

    const fetchMessages = async () => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                console.error("User not authenticated.");
                return;
            }

            const q = query(
                collection(firestore, "messages"),
                where("senderId", "in", [currentUser.uid, userEmail]),
                where("receiverId", "in", [currentUser.uid, userEmail])
            );

            const querySnapshot = await getDocs(q);
            const messagesData = querySnapshot.docs.map(doc => doc.data());
            setMessages(messagesData);
        } catch (error) {
            console.error("Error fetching messages: ", error);
        }
    };

    const handleMessageSend = async () => {
        if (message.trim() === '') {
            return;
        }

        try {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                console.error("User not authenticated.");
                return;
            }

            const messageData = {
                senderId: currentUser.uid,
                receiverId: userEmail,
                createdAt: serverTimestamp(),
                text: message,
            };

            await addDoc(collection(firestore, "messages"), messageData);

            setMessage('');
            fetchMessages();
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text>{item.text}</Text>
                    </View>
                )}
                keyExtractor={(_, index) => index.toString()}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={text => setMessage(text)}
                    placeholder="Type your message..."
                />
                <TouchableOpacity style={styles.button} onPress={handleMessageSend}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-end',
    },
    messageContainer: {
        backgroundColor: colors.gray,
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        maxWidth: '80%',
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: colors.white,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.blackblue,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
});

export default Chats;