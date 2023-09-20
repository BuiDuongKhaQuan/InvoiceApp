import { StyleSheet, Text, View, StatusBar, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Header from '../../components/SettingItem/header';
import { backgroundColor, white } from '../../constant/color';
import { fontSizeMenuTitle } from '../../constant/fontSize';
import Input from '../../components/Input';

export default function Support() {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorContent, setErrorContent] = useState(false);

    const checkError = () =>
        title.length > 0 &&
        name.length > 0 &&
        content.length > 0 &&
        errorTitle == false &&
        errorName == false &&
        errorContent == false;

    const handlePress = () => {
        if (!checkError()) return;
        alert(checkError());
    };

    const handleChangeTitle = (text) => {
        setErrorTitle(text.trim() === '' ? true : false);
        setTitle(text);
    };

    const handleChangeName = (text) => {
        setErrorName(text.trim() === '' ? true : false);
        setName(text);
    };
    const handleChangeContent = (text) => {
        setErrorContent(text.trim() === '' ? true : false);
        setContent(text);
    };

    return (
        <View style={styles.container}>
            <Header title="Hỗ trợ" />
            <View style={styles.content_center}>
                <Text style={styles.content_title}>Trung tâm hỗ trợ</Text>
                <Input
                    customStylesInput={styles.input}
                    customStylesContainer={styles.input_container}
                    customStylesTextValidate={styles.validate}
                    onChangeText={handleChangeTitle}
                    validateText="Vui lòng không để trống"
                    validate={errorTitle}
                    holder="Chủ đề"
                    value={title}
                    text
                />
                <Input
                    customStylesInput={styles.input}
                    customStylesContainer={styles.input_container}
                    customStylesTextValidate={styles.validate}
                    onChangeText={handleChangeName}
                    validateText="Vui lòng không để trống"
                    validate={errorName}
                    holder="Tên người gửi"
                    value={name}
                    text
                />
                <Input
                    customStylesInput={styles.textArea}
                    customStylesTextValidate={styles.validate}
                    underlineColorAndroid="transparent"
                    validateText="Vui lòng không để trống"
                    onChangeText={handleChangeContent}
                    validate={errorContent}
                    numberOfLines={20}
                    multiline={true}
                    holder="Nội dung"
                    value={content}
                    text
                />
                {errorContent !== '' && <Text style={styles.errorText}>{errorContent}</Text>}
            </View>
            <View style={styles.content_botom}>
                <Button onPress={handlePress} customStylesBtn={styles.send_btn} text="Gửi" />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: white,
    },
    content_center: {
        flex: 4,
        backgroundColor: backgroundColor,
    },
    content_botom: {
        flex: 1,
        backgroundColor: backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_title: {
        fontSize: fontSizeMenuTitle,
        marginHorizontal: 10,
        marginTop: 10,
    },
    send_btn: {
        width: '95%',
    },
    textArea: {
        flex: 1,
        height: '75%',
        backgroundColor: 'white',
        textAlignVertical: 'top',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    input: {
        width: '100%',
        marginHorizontal: 10,
    },
    input_container: {
        height: 60,
    },
    validate: {
        marginLeft: 10,
    },
});
