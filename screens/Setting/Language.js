import { StyleSheet, Text, View, StatusBar, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/SettingItem/header';
import { AntDesign } from '@expo/vector-icons';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { useTranslation } from 'react-i18next';
import { backgroundColor } from '../../constant/color';
export default function Language() {
    const { t, i18n } = useTranslation();
    const selectLanguageCode = i18n.language;
    const LANGUAGES = [
        { code: 'en', label: 'English' },
        { code: 'vi', label: 'Vietnamese' },
    ];
    const setLanguage = (code) => {
        return i18n.changeLanguage(code);
    };

    return (
        <BackgroundImage>
            <Header title={t('common:language')} />
            <View style={styles.container}>
                {LANGUAGES.map((language) => {
                    const selectLanguage = language.code === selectLanguageCode;
                    return (
                        <Pressable
                            style={{ marginTop: 10, backgroundColor: '#ccc' }}
                            disabled={selectLanguage}
                            onPress={() => setLanguage(language.code)}
                        >
                            <Text style={[selectLanguage ? styles.SelectedText : styles.text]}>{language.label}</Text>
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
    logout_btn: {
        marginHorizontal: 10,
        width: '95%',
        borderRadius: 50,
        borderWidth: 0,
        backgroundColor: '#B7B7B7',
        elevation: 0,
    },
    SelectedText: {
        padding: 10,
        fontSize: 18,
        fontWeight: '500',
        color: 'green',
        paddingVertical: 5,
    },
    text: {
        padding: 10,
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
        paddingVertical: 5,
    },
});
