import { StyleSheet, Text, View, StatusBar, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Header from '../components/SettingItem/header';
import { backgroundColor } from '../constant/color';

export default function Support() {
    const [title, setTitle] = useState('');
    const [sender, setSender] = useState('');
    const [content, setContent] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [errorSender, setErrorSender] = useState('');
    const [errorContent, setErrorContent] = useState('');

    const handlePress = () => {
        let hasError = false;

        if (title.trim() === '') {
            setErrorTitle('Vui lòng không để trống trường nhập liệu');
            hasError = true;
        } else {
            setErrorTitle('');
        }

        if (sender.trim() === '') {
            setErrorSender('Vui lòng không để trống trường nhập liệu');
            hasError = true;
        } else {
            setErrorSender('');
        }

        if (content.trim() === '') {
            setErrorContent('Vui lòng không để trống trường nhập liệu');
            hasError = true;
        } else {
            setErrorContent('');
        }

        if (!hasError) {
            alert('Gửi thành công');
        }
    };

    const handleChangeTitle = (text) => {
        setTitle(text);
    };

    const handleChangeSender = (text) => {
        setSender(text);
    };
    const handleChangeContent = (text) => {
        setContent(text);
    };

    const handleBlur = () => {
        if (content.trim() === '' && !errorContent) {
            setErrorContent('Vui lòng không để trống trường nhập liệu');
        } else if (content.trim() !== '' && errorContent) {
            setErrorContent('');
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Hỗ trợ" />
            <View style={styles.content_center}>
                <Text style={styles.content_title}>Trung tâm hỗ trợ</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập dữ liệu"
                    onChangeText={handleChangeTitle}
                    value={title}
                />
                {errorTitle !== '' && <Text style={styles.errorText}>{errorTitle}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="Tên người gửi"
                    onChangeText={handleChangeSender}
                    underlineColorAndroid="transparent"
                    value={sender}
                />
                {errorSender !== '' && <Text style={styles.errorText}>{errorSender}</Text>}
                <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Nội dung"
                    placeholderTextColor="grey"
                    numberOfLines={20}
                    multiline={true}
                    onChangeText={handleChangeContent}
                />
                {errorContent !== '' && <Text style={styles.errorText}>{errorContent}</Text>}
                <Button onPress={handlePress} customStylesBtn={styles.send_btn} text="Gửi" />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    content_center: {
        backgroundColor: backgroundColor,
        height: 1000,
    },
    content_title: {
        fontSize: 20,
        marginTop: 30,
        marginLeft: 10,
        marginBottom: 10,
    },

    send_btn: {
        marginHorizontal: 10,
        width: '95%',
        borderRadius: 50,
        borderWidth: 0,
        elevation: 0,
        marginTop: 200,
    },
    textArea: {
        height: 200,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        paddingTop: 16,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
    },
    input: {
        height: 40,
        marginTop: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
});
