import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/SettingItem/header';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { textColor, white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';
import { useNavigation } from '@react-navigation/native';

export default function Language() {
    const { t, i18n } = useTranslation();
    const selectLanguageCode = i18n.language;
    const navigation = useNavigation();
    const LANGUAGES = [
        { code: 'chi', label: 'China' },
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'France' },
        { code: 'jp', label: 'Japan' },
        { code: 'ru', label: 'Russia' },
        { code: 'vi', label: 'VietNamese' },
    ];
    const setLanguage = (code) => {
        return i18n.changeLanguage(code);
    };
    const handleSubmit = (code) => {
        // Hiển thị cảnh báo cho người dùng xác nhận
        Alert.alert(
            t('common:alert_lan'),

            '',
            [
                {
                    text: t('common:alert_no'),
                    cancelable: true,
                    style: 'cancel',
                },
                {
                    text: t('common:alert_yes'),
                    onPress: () => {
                        setLanguage(code);
                        navigation.navigate('TabNavigator');
                    },
                    cancelable: true,
                },
            ],
            { cancelable: false },
        );
    };
    return (
        <BackgroundImage>
            <Header title={t('common:language')} />
            <View style={styles.container}>
                {LANGUAGES.map((language) => {
                    const selectLanguage = language.code === selectLanguageCode;
                    return (
                        <Pressable
                            key={language.code}
                            style={styles.btn}
                            disabled={selectLanguage}
                            onPress={() => handleSubmit(language.code)}
                        >
                            <Text style={[selectLanguage ? styles.selectedText : styles.text]}>{language.label}</Text>
                        </Pressable>
                    );
                })}
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        backgroundColor: white,
        marginVertical: 1,
        padding: 5,
    },
    selectedText: {
        padding: 10,
        color: textColor,
        fontWeight: '500',
        fontWeight: 'bold',
        paddingVertical: 5,
        fontSize: fontSizeDefault + 2,
    },
    text: {
        padding: 10,
        color: 'black',
        paddingVertical: 5,
        fontSize: fontSizeDefault + 2,
    },
});
