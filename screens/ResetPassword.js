import { StyleSheet, Text, View, Image, Keyboard, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidatePass } from '../utilies/validate';
import { fontSizeDefault } from '../constant/fontSize';
import { Ionicons } from '@expo/vector-icons';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { resetPassword } from '../Service/api';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function Login() {
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    const [pass, setPass] = useState('');
    const [repass, setRepass] = useState('');
    const [errorRepass, setErrorRepass] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const route = useRoute();
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

    const isValidateSubmit = () => repass.length > 0 && pass.length > 0 && errorRepass == false && errorPass == false;

    const handlePress = () => {
        if (!isValidateSubmit()) {
            return;
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        console.log(route.params?.data, pass, repass);
        try {
            await resetPassword(route.params?.data, pass, repass);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Alert.alert(t('common:errResetPassword'), error.response.data.message);
            } else {
                console.error(t('common:errResetPassword'), error.response);
            }
        }
    };
    const validateRepass = () => repass === pass;

    const handleChangePass = (pass) => {
        setErrorPass(!isValidatePass(pass));
        setPass(pass);
    };
    const handleChangeRepass = (text) => {
        setErrorRepass(!validateRepass);
        setRepass(text);
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
                        onChangeText={handleChangePass}
                        value={pass}
                        validate={errorPass}
                        validateText={t('common:format')}
                        pass
                        holder={t('common:newPass')}
                        iconLeft={<Ionicons name="lock-closed-outline" size={24} color="black" />}
                    />
                    <Input
                        onChangeText={handleChangeRepass}
                        value={repass}
                        validate={errorRepass}
                        validateText={t('common:errRenewPass')}
                        holder={t('common:newPass')}
                        iconLeft={<Ionicons name="lock-closed-outline" size={24} color="black" />}
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
    image: {
        flex: 1,
    },
    container_top: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 70,
        color: '#B3B70A',
        textShadowColor: '#2AA50B',
        textShadowRadius: 5,
        textShadowOffset: { width: 2, height: 2 },
    },
    container_center: {
        flex: 4,
        alignItems: 'center',
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
        color: '#26B819',
    },
    container_botom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    forgot: {
        marginBottom: 20,
        fontSize: fontSizeDefault,
        color: '#26B819',
    },
});
