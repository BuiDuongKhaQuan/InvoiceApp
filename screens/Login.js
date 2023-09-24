import { StyleSheet, Text, View, Image, Keyboard, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateEmail, isValidatePass } from '../utilies/validate';
import { fontSizeDefault } from '../constant/fontSize';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { login } from '../Service/api';
import { useUserContext } from './UserContext'; // Đảm bảo thay đổi đường dẫn đúng
import Loading from '../components/Loading';

export default function Login({ navigation }) {
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const { dispatch } = useUserContext();
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

    const isValidateLogin = () => email.length > 0 && pass.length > 0 && errorEmail == false && errorPass == false;

    const handlePress = () => {
        if (!isValidateLogin()) {
            return;
        } else {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const userData = await login(email, pass);
            dispatch({
                type: 'SIGN_IN',
                payload: userData,
            });
            navigation.navigate('TabNavigator');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Alert.alert('Login error!', error.response.data.message);
            } else if (error.response && error.response.status === 404) {
                Alert.alert('Login error!', error.response.data.message);
            } else {
                Alert.alert('Login error', 'Transmission error, please try again later!!');
            }
        } finally {
            setLoading(false);
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

    return (
        <View style={styles.container}>
            <BackgroundImage>
                <Loading loading={loading} />
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
                        holder="example@example.com"
                        iconLeft={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
                    />
                    <Input
                        onChangeText={handleChangePass}
                        value={pass}
                        validate={errorPass}
                        validateText="Mật khẩu phải đủ 6 đến 8 ký tự"
                        pass
                        holder="Password"
                        iconLeft={<Ionicons name="lock-closed-outline" size={24} color="black" />}
                    />

                    {keyboardIsShow || (
                        <>
                            <Button onPress={handlePress} text="Login" />
                            <View style={styles.register}>
                                <Text style={styles.register_text}>Do not have an account? </Text>
                                <Text onPress={() => navigation.navigate('Register')} style={styles.register_btn}>
                                    Signup
                                </Text>
                            </View>
                        </>
                    )}
                </View>
                {keyboardIsShow || (
                    <View style={styles.container_botom}>
                        <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgot}>
                            Forgot Password?
                        </Text>
                    </View>
                )}
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
        fontWeight: 'bold',
    },
});
