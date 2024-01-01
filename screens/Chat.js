import React, { useState, useEffect, useCallback } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { GiftedChat } from 'react-native-gifted-chat';
import { useUserContext } from './UserContext';
import { ref, push, set, onValue } from 'firebase/database';
import { fireDatabase } from '../config/firebaseConfig';
import { statusBarHeight } from '../constant/dimistion';

export default function Chat({ navigation }) {
    const { state } = useUserContext();
    const { user, company } = state;
    const [messages, setMessages] = useState([]);
    const databaseRef = ref(fireDatabase, `/rooms/${company.id}`);

    const sendMessage = async (newMessage) => {
        const messagesRef = ref(fireDatabase, `/rooms/${company.id}/messages`);
        try {
            const newMessageRef = push(messagesRef);
            const messageId = newMessageRef.key;

            await set(newMessageRef, {
                _id: messageId,
                text: newMessage.text,
                createdAt: new Date().getTime(), // Hoặc sử dụng new Date().getTime()
                user: {
                    _id: user.id,
                    name: user.name,
                    avatar: user.image,
                },
            });
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
        }
    };

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        sendMessage(messages[0]);
    }, []);

    useEffect(() => {
        onValue(
            databaseRef,
            (snapshot) => {
                const data = snapshot.val();
                if (data && data.messages) {
                    // Chuyển đổi dữ liệu tin nhắn thành mảng và thêm thuộc tính _id
                    const messagesArray = Object.values(data.messages).map((message) => {
                        const convertedMessage = {
                            _id: message._id || '', // Kiểm tra _id và đặt giá trị mặc định nếu không tồn tại
                            text: message.text || '', // Kiểm tra text và đặt giá trị mặc định nếu không tồn tại
                            createdAt: message.createdAt ? new Date(message.createdAt) : new Date(), // Kiểm tra createdAt và đặt giá trị mặc định nếu không tồn tại
                            user: {
                                _id: message.user ? message.user._id || '' : '', // Kiểm tra _id của user và đặt giá trị mặc định nếu không tồn tại
                                name: message.user ? message.user.name || '' : '', // Kiểm tra name của user và đặt giá trị mặc định nếu không tồn tại
                                avatar: message.user ? message.user.avatar || '' : '', // Kiểm tra avatar của user và đặt giá trị mặc định nếu không tồn tại
                            },
                        };

                        return convertedMessage;
                    });

                    setMessages(messagesArray.reverse());
                }
            },
            (error) => {
                console.error('Lỗi kết nối đến Firebase:', error);
            },
        );
    }, [company.id]);

    return (
        <BackgroundImage>
            <View style={styles.header}>
                <Header navigation={navigation} data={company} />
            </View>
            <View style={styles.container}>
                <GiftedChat
                    messages={messages}
                    onSend={(newMessages) => onSend(newMessages)}
                    user={{
                        _id: user.id,
                    }}
                />
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 0.1,
    },
    container: {
        flex: Platform.OS === 'ios' ? 1.15 : 1.09,
        marginTop: statusBarHeight,
    },
});
