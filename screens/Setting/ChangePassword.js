import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { isValidatePass } from '../../utilies/validate';
import Input from '../../components/Input';
import Header from '../../components/SettingItem/header';
import { fontSizeDefault, fontSizeMenuTitle } from '../../constant/fontSize';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { useNavigation } from '@react-navigation/native';
import { changePassword } from '../../Service/api';
import { useUserContext } from '../UserContext';
import Loading from '../../components/Loading';
import { useTranslation } from 'react-i18next';
import { textColor } from '../../constant/color';

export default function ChangePassword() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const { state } = useUserContext();
    const [passOld, setPassOld] = useState('');
    const [passNew, setPassNew] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorPassOld, setErrorPassOld] = useState(false);
    const [errorPassNew, setErrorPassNew] = useState(false);
    const [errorConfirmPass, setErrorConfirmPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const isValidateContrinute = () =>
        passOld.length > 0 &&
        errorPassOld == false &&
        passNew.length > 0 &&
        errorPassNew == false &&
        confirmPass > 0 &&
        errorConfirmPass == false &&
        confirmPass == passNew;
    const handlePress = () => {
        if (!isValidateContrinute()) {
            return;
        } else {
            setLoading(true);
            changePass();
        }
    };
    const changePass = async () => {
        try {
            await changePassword(state.user.email, passOld, passNew, confirmPass);
            Alert.alert('Success', 'common:changePasswordSuccess');
        } catch (error) {
            Alert.alert('Error', error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassOld = (text) => {
        setErrorPassOld(!isValidatePass(text));
        setPassOld(text);
    };
    const handleChangePassNew = (text) => {
        setErrorPassNew(!isValidatePass(text));
        setPassNew(text);
    };
    const handleChangeConfirm = (text) => {
        setErrorConfirmPass(passNew != text ? true : false);
        setConfirmPass(text);
    };
    return (
        <BackgroundImage>
            <Loading loading={loading} isFullScreen />
            <Header title={t('common:password')} />
            <ScrollView style={styles.container}>
                <View style={styles.content_center}>
                    <Text style={styles.content_title}>{t('common:changePassword')}</Text>
                    <Input
                        text
                        customStylesInput={styles.input}
                        customStylesContainer={styles.inputContainer}
                        customStylesTextValidate={styles.textValidate}
                        validate={errorPassOld}
                        validateText={t('common:passwordIncorrect')}
                        onChangeText={handleChangePassOld}
                        holder={t('common:oldPass')}
                        value={passOld}
                    />
                    <Input
                        text
                        customStylesInput={styles.input}
                        customStylesContainer={styles.inputContainer}
                        customStylesTextValidate={styles.textValidate}
                        validate={errorPassNew}
                        validateText={t('common:format')}
                        onChangeText={handleChangePassNew}
                        holder={t('common:newPass')}
                        value={passNew}
                    />

                    <Input
                        text
                        customStylesInput={styles.input}
                        customStylesContainer={styles.inputContainer}
                        customStylesTextValidate={styles.textValidate}
                        validate={errorConfirmPass}
                        validateText={t('common:passwordIncorrect')}
                        onChangeText={handleChangeConfirm}
                        holder={t('common:renewPass')}
                        value={confirmPass}
                    />

                    <Button onPress={handlePress} customStylesBtn={{ borderRadius: 0 }} text={t('common:confirm')} />

                    <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgot}>
                        {t('common:forgotPass')}
                    </Text>
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content_center: {
        flex: 1,
    },
    content_title: {
        fontSize: fontSizeMenuTitle,
        marginTop: 15,
        marginLeft: 10,
        marginBottom: 20,
    },
    input: {
        marginLeft: 20,
        textAlign: 'left',
    },
    inputContainer: {
        marginTop: -5,
        alignItems: 'flex-start',
    },
    textValidate: {
        marginLeft: 20,
    },
    forgot: {
        marginBottom: 20,
        fontSize: fontSizeDefault,
        fontWeight: 'bold',
        color: textColor,
        alignItems: 'center',
        textAlign: 'center',
    },
});
