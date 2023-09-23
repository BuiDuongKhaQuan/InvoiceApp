import { StyleSheet, Text, View, Image, Keyboard, ImageBackground, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateEmail, isValidateOTP } from '../utilies/validate';
import { fontSizeDefault } from '../constant/fontSize';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { forgotPassword, validateReset } from '../Service/api';
import Spinner from 'react-native-loading-spinner-overlay';

export default function ForgotPassword({ navigation }) {
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
        try {
            const response = await forgotPassword(email);
            if (response.status === 200) {
                setLoading(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setLoading(false);
                Alert.alert('Error', error.response.data.message);
            } else {
                setLoading(false);
                console.error('Send email error:', error);
            }
        }
    };

    const handleSendOTP = async () => {
        try {
            await validateReset(email, code);
            navigation.navigate('ResetPassword', { data: email });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setLoading(false);
                Alert.alert('Error', error.response.data.message);
            } else {
                setLoading(false);
                console.error('Send email error:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <BackgroundImage>
                <Spinner visible={loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
                <View style={styles.container_top}>
                    <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                    <Text style={styles.title}>Invoice C</Text>
                </View>

                <View style={centerStyle}>
                    <Input
                        onChangeText={handleChangeEmail}
                        value={email}
                        onPressSend={handleSend}
                        validate={errorEmail}
                        validateText="Please enter the correct email format"
                        holder="example@example.com"
                        iconLeft={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
                        btnSend
                    />
                    <Input
                        onChangeText={handleChangeCode}
                        value={code}
                        validate={errorCode}
                        validateText="Verification code must be 6 characters long!"
                        customStylesInput={{ marginLeft: 50 }}
                        holder="Enter OTP code"
                    />

                    {keyboardIsShow || (
                        <>
                            <Button onPress={handlePress} text="Confirm" />
                            <View style={styles.register}>
                                <Text style={styles.register_text}>Do you have an account? </Text>
                                <Text onPress={() => navigation.navigate('Login')} style={styles.register_btn}>
                                    Login
                                </Text>
                            </View>
                        </>
                    )}
                </View>
            </BackgroundImage>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    spinnerTextStyle: {
        color: '#FFF',
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
});
