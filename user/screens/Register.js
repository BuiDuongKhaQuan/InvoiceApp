import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import {
    isValidateEmail,
    isValidatePass,
    isValidateFullName,
    isValidatePhone,
    isValidateRePass,
} from '../utilies/validate';
import { fontSizeDefault } from '../constant/fontSize';
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons, Feather, Fontisto } from '@expo/vector-icons';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { register } from '../Service/api';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';
import { textColor } from '../constant/color';
import * as Clipboard from 'expo-clipboard';

export default function Register() {
    const [loading, setLoading] = useState(false);
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
    const [showPass, setShowPass] = useState('eye-off');
    const [showRePass, setShowRePass] = useState('eye-off');
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const { t } = useTranslation();
    const navigation = useNavigation();

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
    const handleChangeRePass = (repass) => {
        setErrorRePass(!isValidateRePass(pass, repass));
        setRePass(repass);
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

    const togglePasswordShow = () => {
        setShowPassword(!showPassword);
        showPassword ? setShowPass('eye-off') : setShowPass('eye');
    };
    const toggleRePasswordShow = () => {
        setShowRePassword(!showRePassword);
        showRePassword ? setShowRePass('eye-off') : setShowRePass('eye');
    };

    const handleRegister = async () => {
        setLoading(true);
        try {
            await register(
                name,
                email,
                pass,
                (gender = t('common:male')),
                phone,
                (address = 'DC'),
                (role = 'ROLE_USER'),
                companyKey,
            );
            navigation.navigate('ValidateEmail', { data: email });
        } catch (error) {
            Alert.alert(t('common:loginerror'), error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BackgroundImage>
            <Loading loading={loading} isFullScreen />
            <ScrollView style={styles.container}>
                <View style={styles.container_top}>
                    <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                </View>
                <View style={styles.container_center}>
                    <Input
                        onChangeText={handleChangeEmail}
                        value={email}
                        validate={errorEmail}
                        validateText={t('common:formatEmail')}
                        holder="example@example.com"
                        keyboardType="email-address"
                        iconLeft={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
                    />
                    <Input
                        onChangeText={handleChangeName}
                        value={name}
                        validate={errorName}
                        validateText={t('common:nobankName')}
                        holder={t('common:fullName')}
                        iconLeft={<SimpleLineIcons name="user" size={24} color="black" />}
                    />
                    <Input
                        onChangeText={handleChangePhone}
                        value={phone}
                        validate={errorPhone}
                        validateText={t('common:formatPhone')}
                        holder={t('common:phoneNumber')}
                        keyboardType="phone-pad"
                        iconLeft={<MaterialCommunityIcons name="phone-outline" size={24} color="black" />}
                    />
                    <Input
                        onChangeText={handleChangeCompanyKey}
                        value={companyKey}
                        validate={errorCompanyKey}
                        validateText={t('common:nobankCompany')}
                        holder={t('common:companyKey')}
                        iconLeft={
                            <MaterialCommunityIcons name="office-building-marker-outline" size={24} color="black" />
                        }
                        iconRight={<Fontisto name="paste" size={24} color="black" />}
                        onPressIconRight={async () => {
                            const value = await Clipboard.getStringAsync();
                            setComapanyKey(value);
                            setErrorCompanyKey(!isValidateFullName(value));
                        }}
                    />
                    <Input
                        onChangeText={handleChangePass}
                        value={pass}
                        validate={errorPass}
                        validateText={t('common:format')}
                        pass={!showPassword}
                        holder={t('common:password')}
                        onPressIconRight={togglePasswordShow}
                        iconLeft={<Ionicons name="lock-closed-outline" size={24} color="black" />}
                        iconRight={<Feather name={showPass} size={24} color="black" />}
                    />
                    <Input
                        onChangeText={handleChangeRePass}
                        value={repass}
                        validate={errorRePass}
                        validateText={t('common:passwordIncorrect')}
                        pass={!showRePassword}
                        holder={t('common:rePassword')}
                        onPressIconRight={toggleRePasswordShow}
                        iconLeft={<Ionicons name="lock-closed-outline" size={24} color="black" />}
                        iconRight={<Feather name={showRePass} size={24} color="black" />}
                    />

                    <Button onPress={handlePress} text={t('common:signup')} />
                    <View style={styles.register}>
                        <Text style={styles.register_text}>{t('common:haveAccount')}</Text>
                        <Text onPress={() => navigation.navigate('Login')} style={styles.register_btn}>
                            {t('common:login')}
                        </Text>
                    </View>
                </View>

                <View style={styles.container_botom}>
                    <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgot}>
                        {t('common:forgotPass')}?
                    </Text>
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    container_top: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 300,
        height: 300,
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
        color: textColor,
    },
    container_botom: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    forgot: {
        marginVertical: 15,
        fontSize: fontSizeDefault,
        color: textColor,
    },
});
