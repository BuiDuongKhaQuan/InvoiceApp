import { StyleSheet, Text, View, Image, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateEmail, isValidatePass, isValidateFullName } from '../utilies/validate';
import { backgroundColor } from '../constant/color';
import { fontSizeDefault } from '../constant/fontSize';

export default function Register({ navigation }) {
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [companyKey, setComapanyKey] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorCompanyKey, setErrorCompanyKey] = useState(false);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShow(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShow(false);
        });
    });

    const centerStyle = keyboardIsShow
        ? { ...styles.container_center, flex: 3, justifyContent: 'center' }
        : { ...styles.container_center };

    const isValidateLogin = () =>
        email.length > 0 && pass.length > 0 && name.length > 0 && errorEmail == false && errorPass == false;

    const handlePress = () => {
        if (!isValidateLogin()) {
            return;
        } else {
            alert(isValidateLogin());
        }
    };

    const handleChangeEmail = (text) => {
        setErrorEmail(!isValidateEmail(text));
        setEmail(text);
    };

    const handleChangePass = (pass) => {
        setErrorPass(!isValidatePass(pass));
        setPass(pass);
    };

    const handleChangeName = (name) => {
        setErrorName(!isValidateFullName(name));
        setName(name);
    };
    const handleChangeCompanyKey = (key) => {
        setErrorCompanyKey(!isValidateFullName(key));
        setComapanyKey(key);
    };
    return (
        <View style={styles.container}>
            <View style={styles.container_top}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                <Text style={styles.title}>Invoice C</Text>
            </View>
            <View style={centerStyle}>
                <Input
                    onChangeText={handleChangeEmail}
                    value={email}
                    validate={errorEmail}
                    validateText="Vui lòng nhập đúng định dạng email"
                    holder="G-mail"
                    iconLeft={require('../assets/icons/email.png')}
                />
                <Input
                    onChangeText={handleChangeName}
                    value={name}
                    validate={errorName}
                    validateText="Tên không được để trống"
                    holder="Họ và tên"
                    iconLeft={require('../assets/icons/user.png')}
                />
                <Input
                    onChangeText={handleChangePass}
                    value={pass}
                    validate={errorPass}
                    validateText="Mật khẩu phải đủ 4 ký tự"
                    pass
                    holder="Mật khẩu"
                    iconLeft={require('../assets/icons/lock.png')}
                />
                <Input
                    onChangeText={handleChangeCompanyKey}
                    value={companyKey}
                    validate={errorCompanyKey}
                    validateText="Mã doanh nghiệp không được để trống"
                    holder="Mã doanh nghiệp"
                    iconLeft={require('../assets/icons/lock.png')}
                />
                {keyboardIsShow || (
                    <>
                        <Button onPress={handlePress} customStylesBtn={{ width: 340, height: 50 }} text="Đăng ký" />
                        <View style={styles.register}>
                            <Text style={styles.register_text}>Bạn đã có tài khoản? </Text>
                            <Text onPress={() => navigation.navigate('Login')} style={styles.register_btn}>
                                Đăng nhập
                            </Text>
                        </View>
                    </>
                )}
            </View>
            {keyboardIsShow || (
                <View style={styles.container_botom}>
                    <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgot}>
                        Quên mật khẩu?
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
    },
    container_top: {
        flex: 3.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
    title: {
        fontSize: 70,
        marginTop: -10,
        color: '#B3B70A',
        textShadowColor: '#2AA50B',
        textShadowRadius: 5,
        textShadowOffset: { width: 2, height: 2 },
    },
    container_center: {
        flex: 4.3,
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
