import { StyleSheet, Text, View, Image, Keyboard, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateEmail, isValidatePass, isValidateFullName, isValidatePhone } from '../utilies/validate';
import { fontSizeDefault } from '../constant/fontSize';
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { register } from '../Service/api';

export default function Register({ navigation }) {
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repass, setRePass] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [companyKey, setComapanyKey] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [errorRePass, setErrorRePass] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
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
            handleRegister();
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
    const handleChangeRePass = (pass) => {
        setErrorRePass(!isValidatePass(pass));
        setRePass(pass);
    };
    const handleChangeName = (name) => {
        setErrorName(!isValidateFullName(name));
        setName(name);
    };
    const handleChangeCompanyKey = (key) => {
        setErrorCompanyKey(!isValidateFullName(key));
        setComapanyKey(key);
    };
    const handleChangePhone = (number) => {
        setErrorPhone(!isValidatePhone(number));
        setPhone(number);
    };

    const handleRegister = () =>
        register(name, email, pass, (gender = 'Nam'), phone, (address = 'DC'), (role = 'ROLE_USER'), companyKey);

    return (
        <View style={styles.container}>
            <BackgroundImage>
                <ScrollView>
                    <View style={styles.container_top}>
                        <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                        <Text style={styles.title}>Invoice C</Text>
                    </View>
                    <View style={centerStyle}>
                        <Input
                            onChangeText={handleChangeEmail}
                            value={email}
                            validate={errorEmail}
                            validateText="Please enter the correct email format"
                            holder="example@example.com"
                            iconLeft={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
                        />
                        <Input
                            onChangeText={handleChangeName}
                            value={name}
                            validate={errorName}
                            validateText="Name cannot be blank"
                            holder="Full Name"
                            iconLeft={<SimpleLineIcons name="user" size={24} color="black" />}
                        />
                        <Input
                            onChangeText={handleChangePhone}
                            value={phone}
                            validate={errorPhone}
                            validateText="Phone number must have 10 digits"
                            holder="Phone Number"
                            iconLeft={<MaterialCommunityIcons name="phone-outline" size={24} color="black" />}
                        />
                        <Input
                            onChangeText={handleChangeCompanyKey}
                            value={companyKey}
                            validate={errorCompanyKey}
                            validateText="Business code cannot be left blank"
                            holder="Company Key"
                            iconLeft={
                                <MaterialCommunityIcons name="office-building-marker-outline" size={24} color="black" />
                            }
                        />
                        <Input
                            onChangeText={handleChangePass}
                            value={pass}
                            validate={errorPass}
                            validateText="Password must be 4 characters long"
                            pass
                            holder="Password"
                            iconLeft={<Ionicons name="lock-closed-outline" size={24} color="black" />}
                        />
                        <Input
                            onChangeText={handleChangeRePass}
                            value={repass}
                            validate={errorRePass}
                            validateText="Password must be 4 characters long"
                            pass
                            holder="Re Password"
                            iconLeft={<Ionicons name="lock-closed-outline" size={24} color="black" />}
                        />

                        {keyboardIsShow || (
                            <>
                                <Button onPress={handlePress} text="Signup" />
                                <View style={styles.register}>
                                    <Text style={styles.register_text}>Do you have an account? </Text>
                                    <Text onPress={() => navigation.navigate('Login')} style={styles.register_btn}>
                                        Login
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
                </ScrollView>
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
        flex: 3.5,
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
    title: {
        fontSize: 70,
        marginTop: -15,
        color: '#B3B70A',
        textShadowColor: '#2AA50B',
        textShadowRadius: 5,
        textShadowOffset: { width: 2, height: 2 },
    },
    container_center: {
        flex: 4.3,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginVertical: 15,
        fontSize: fontSizeDefault,
        color: '#26B819',
    },
});
