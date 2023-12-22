import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Header from '../../components/SettingItem/header';
import { fontSizeMenuTitle } from '../../constant/fontSize';
import Input from '../../components/Input';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { useTranslation } from 'react-i18next';

export default function Support() {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorContent, setErrorContent] = useState(false);
    const { t } = useTranslation();

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
            <BackgroundImage>
                <Header title={t('common:support')} />
                <View style={styles.content_center}>
                    <Text style={styles.content_title}>{t('common:supportCenter')} </Text>
                    <Input
                        customStylesInput={styles.input}
                        customStylesContainer={styles.input_container}
                        customStylesTextValidate={styles.validate}
                        onChangeText={handleChangeTitle}
                        validateText={t('common:errSup')}
                        validate={errorTitle}
                        holder={t('common:topic')}
                        value={title}
                        text
                    />
                    <Input
                        customStylesInput={styles.input}
                        customStylesContainer={styles.input_container}
                        customStylesTextValidate={styles.validate}
                        onChangeText={handleChangeName}
                        validateText={t('common:errSup')}
                        validate={errorName}
                        holder={t('common:userSend')}
                        value={name}
                        text
                    />
                    <Input
                        customStylesInput={styles.textArea}
                        customStylesTextValidate={styles.validate}
                        customStylesContainer={styles.input_container}
                        underlineColorAndroid="transparent"
                        validateText={t('common:errSup')}
                        onChangeText={handleChangeContent}
                        validate={errorContent}
                        numberOfLines={15}
                        multiline={true}
                        holder={t('common:content')}
                        value={content}
                        text
                    />
                    {errorContent !== '' && <Text style={styles.errorText}>{errorContent}</Text>}
                </View>
                <View style={styles.content_botom}>
                    <Button onPress={handlePress} customStylesBtn={styles.send_btn} text={t('common:send')} />
                </View>
            </BackgroundImage>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    content_center: {
        flex: 4,
    },
    content_botom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_title: {
        fontSize: fontSizeMenuTitle,
        marginHorizontal: 10,
        marginVertical: 20,
    },
    send_btn: {
        width: '95%',
    },
    textArea: {
        flex: 1,
        height: '75%',
        backgroundColor: 'white',
        textAlignVertical: 'top',
        textAlign: 'left',
        paddingHorizontal: 10,
    },
    input: {
        width: '100%',
        textAlign: 'left',
        paddingHorizontal: 10,
    },
    input_container: {
        height: 60,
        marginTop: -5,
    },
    validate: {
        marginLeft: 10,
    },
});
