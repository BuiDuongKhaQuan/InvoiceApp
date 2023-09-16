import { StyleSheet, Text, View, Image, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateEmail, isValidateCode } from '../utilies/validate';
import { fontSizeDefault } from '../constant/fontSize';

export default function ForgotPassword({ navigation }) {
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorCode, setErrorCode] = useState(false);

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
            alert(isValidateConfirm());
        }
    };

    const handleChangeEmail = (text) => {
        setErrorEmail(!isValidateEmail(text));
        setEmail(text);
    };
    const handleChangeCode = (text) => {
        setErrorCode(!isValidateCode(text));
        setCode(text);
    };
    return (
        <View style={styles.container}>
            <View style={styles.container_top}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                <Text style={styles.title}>Invoice C</Text>
                <Text style={styles.titleForgotPass}>QUÊN MẬT KHẨU</Text>
            </View>

            <View style={centerStyle}>
                <Input
                    onChangeText={handleChangeEmail}
                    value={email}
                    validate={errorEmail}
                    validateText="Vui lòng nhập đúng định dạng email"
                    holder="Email"
                    iconLeft={require('../assets/icons/email.png')}
                    btnSend
                />
                <Input
                    onChangeText={handleChangeCode}
                    value={code}
                    validate={errorCode}
                    validateText="Mã xác nhận phải đủ 4 kí tự!"
                    customStylesInput={{ marginLeft: 50, fontSize: 20 }}
                    holder="Mã xác nhận"
                />

                {keyboardIsShow || (
                    <>
                        <Button onPress={handlePress} customStylesBtn={{ width: 340, height: 50 }} text="Xác nhận" />
                        <View style={styles.register}>
                            <Text style={styles.register_text}>Bạn đã có tài khoản! </Text>
                            <Text onPress={() => navigation.navigate('Login')} style={styles.register_btn}>
                                Đăng nhập
                            </Text>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4E8E5',
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
    titleForgotPass: {
        fontSize: 25,
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
    forgot: {
        marginBottom: 20,
        fontSize: fontSizeDefault,
        color: '#26B819',
    },
    forgotPassword: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
