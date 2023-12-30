import { StyleSheet, Text, View, Image, Keyboard, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateOTP } from '../utilies/validate';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { validateRegister } from '../Service/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword() {
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    const [code, setCode] = useState('');
    const [errorCode, setErrorCode] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();
    const { t } = useTranslation();
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
            handleValidateRegister();
        }
    };

    const handleValidateRegister = async () => {
        try {
            await validateRegister(route.params?.data, code);
            navigation.navigate('Login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Alert.alert(t('common:loginerror'), error.response.data.message);
            } else {
                console.error(t('common:loginerror'), error);
            }
        }
    };

    const handleChangeCode = (text) => {
        setErrorCode(!isValidateOTP(text));
        setCode(text);
    };
    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={styles.container_top}>
                    <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                    <Text style={styles.title}>Invoice C</Text>
                </View>

                <View style={centerStyle}>
                    <Input
                        onChangeText={handleChangeCode}
                        value={code}
                        validate={errorCode}
                        validateText={t('common:charactorOTP')}
                        customStylesInput={{ marginLeft: 10 }}
                        holder={t('common:otpCode')}
                    />
                    {keyboardIsShow || <Button onPress={handlePress} text={t('common:confirm')} />}
                </View>
            </BackgroundImage>
        </View>
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
        width: 200,
        height: 200,
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
    },
});
