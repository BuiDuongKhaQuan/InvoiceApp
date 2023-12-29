import { StyleSheet, Text, View, Image, Keyboard, ImageBackground, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateEmail, isValidateOTP } from '../utilies/validate';
import { fontSizeDefault } from '../constant/fontSize';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { forgotPassword, validateReset } from '../Service/api';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';
import { textColor } from '../constant/color';

export default function ForgotPassword({ navigation }) {
    const { t } = useTranslation();
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorCode, setErrorCode] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShow(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShow(false);
        });
    });

    const centerStyle = keyboardIsShow
        ? { ...styles.container_center, flex: 2, justifyContent: 'center' }
        : { ...styles.container_center };

    const isValidateConfirm = () => code.length > 0 && errorCode == false;

    const handlePress = () => {
        if (!isValidateConfirm()) {
            return;
        } else {
            handleSendOTP();
        }
    };

    const handleChangeEmail = (text) => {
        setErrorEmail(!isValidateEmail(text));
        setEmail(text);
    };
    const handleChangeCode = (text) => {
        setErrorCode(!isValidateOTP(text));
        setCode(text);
    };

    const handleSend = () => {
        // setLoading(true);
        handleSendEmail();
    };

    const handleSendEmail = async () => {
        setLoading(true);
        try {
            await forgotPassword(email);
            Alert.alert(t('common:alert_success'), t('common:Đã gửi mã OTP thành công'));
        } catch (error) {
            if (error.response && error.response.status === 404) {
                Alert.alert(t('common:error'), error.response.data.message);
            } else {
                Alert.alert(t('common:error'), t('common:transmissionError'));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSendOTP = async () => {
        setLoading(true);
        try {
            const re = await validateReset(email, code);
            navigation.navigate('ResetPassword', { data: email });
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 404) {
                Alert.alert(t('common:error'), error.response.data.message);
            } else {
                Alert.alert(t('common:error'), t('common:transmissionError'));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <BackgroundImage>
            <Loading loading={loading} isFullScreen />
            <View style={styles.container_top}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
            </View>

            <View style={centerStyle}>
                <Input
                    onChangeText={handleChangeEmail}
                    value={email}
                    onPressSend={handleSend}
                    validate={errorEmail}
                    validateText={t('common:formatEmail')}
                    holder="example@example.com"
                    iconLeft={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
                    btnSend
                />
                <Input
                    onChangeText={handleChangeCode}
                    value={code}
                    validate={errorCode}
                    validateText={t('common:verifyCode')}
                    customStylesInput={{ marginLeft: 50 }}
                    holder={t('common:otpCode')}
                />

                {keyboardIsShow || (
                    <>
                        <Button onPress={handlePress} text={t('common:confirm')} />
                        <View style={styles.register}>
                            <Text style={styles.register_text}>{t('common:haveAccount')}</Text>
                            <Text onPress={() => navigation.navigate('Login')} style={styles.register_btn}>
                                {t('common:login')}
                            </Text>
                        </View>
                    </>
                )}
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    container_top: {
        flex: 4,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        marginTop: 100,
        width: 400,
        height: 400,
    },
    title: {
        fontSize: 70,
        marginTop: -10,
        marginBottom: 10,
        color: '#B3B70A',
        textShadowColor: '#2AA50B',
        textShadowRadius: 5,
        textShadowOffset: { width: 2, height: 2 },
    },

    container_center: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 10,
    },

    register: {
        flexDirection: 'row',
    },
    register_text: {
        fontSize: fontSizeDefault,
    },
    register_btn: {
        fontSize: fontSizeDefault,
        fontWeight: '700',
        color: textColor,
    },
});
