import { StyleSheet, Text, View, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateEmail, isValidatePass } from '../utilies/validate';
import { fontSizeDefault } from '../constant/fontSize';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { getCompaniesById, login } from '../Service/api';
import { useUserContext } from './UserContext'; // Đảm bảo thay đổi đường dẫn đúng
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';
import { buttonColor, textColor } from '../constant/color';
import { statusBarHeight } from '../constant/dimistion';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login({ navigation }) {
    const { t } = useTranslation();
    const { dispatch } = useUserContext();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bioSupport, setBioSupport] = useState(false);
    const [preLog, setPreLog] = useState(false);

    useEffect(() => {
        const checkBiome = async () => {
            const storedStatus = await AsyncStorage.getItem('biometricEnabledStatus');
            if (storedStatus && storedStatus === 'true') {
                checkBiometricSupport();
            }
        };
        checkBiome();
    }, []);

    useEffect(() => {
        if (bioSupport) {
            authenticateWithBiometrics();
        }
    }, [bioSupport]);

    useEffect(() => {
        if (preLog) {
            handleLogin();
        }
    }, [preLog]);

    const checkBiometricSupport = async () => {
        try {
            const storedStatus = await AsyncStorage.getItem('biometricEnabledStatus');

            if (storedStatus && storedStatus === 'true') {
                const isSupported = await LocalAuthentication.hasHardwareAsync();

                if (isSupported) {
                    setBioSupport(true);
                } else {
                    Alert.alert('Thông báo!', 'Thiết bị không hỗ trợ xác thực vân tay.');
                }
            } else {
                Alert.alert('Thông báo!', 'Bạn vui lòng bật xác thực vâng tay trong phần "Cài đặt" của ứng dụng.');
            }
        } catch (error) {
            console.error('Error checking biometric support:', error);
        }
    };

    const authenticateWithBiometrics = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate with your biometrics',
            });

            if (result.success) {
                getUserData(); // Proceed to get user data if authentication is successful
            } else {
                setBioSupport(false);
            }
        } catch (error) {
            console.log("Biometrics couldn't be accessed!", error);
        }
    };

    const getUserData = async () => {
        try {
            const storedEmail = await SecureStore.getItemAsync('email');
            const storedPassword = await SecureStore.getItemAsync('password');

            if (storedEmail && storedPassword) {
                setEmail(storedEmail);
                setPass(storedPassword);
                setPreLog(true);
            } else {
                Alert.alert('Notification', 'Chưa có thông tin trong hệ thống');
            }
        } catch (error) {
            console.log("SecureStore couldn't be accessed!", error);
            // Handle the error
        }
    };

    const isValidateLogin = () => email.length > 0 && pass.length > 0 && errorEmail == false;

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
            const userData = await login(email.trim(), pass);
            const companyData = await getCompaniesById(userData.companyId);
            dispatch({
                type: 'SIGN_IN',
                payload: { user: userData, company: companyData },
            });
            await SecureStore.setItemAsync('email', email.trim());
            await SecureStore.setItemAsync('password', pass);
            navigation.navigate('TabNavigator');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                Alert.alert(t('common:error'), error.response.data.message);
            } else {
                console.log(t('common:error'), error);
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
        setPass(pass);
    };

    return (
        <BackgroundImage>
            <ScrollView style={styles.container}>
                <Loading loading={loading} isFullScreen />
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
                        iconLeft={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
                    />
                    <Input
                        onChangeText={handleChangePass}
                        value={pass}
                        pass
                        holder={t('common:password')}
                        iconLeft={<Ionicons name="lock-closed-outline" size={24} color="black" />}
                    />

                    <View style={styles.view_login}>
                        <View style={styles.btn_login}>
                            <Button onPress={handlePress} text={t('common:login')} />
                        </View>
                        <TouchableOpacity style={styles.fingerprint} onPress={checkBiometricSupport}>
                            <MaterialIcons name="fingerprint" size={43} color={buttonColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.register}>
                        <Text style={styles.register_text}>{t('common:noAccount')} </Text>
                        <Text onPress={() => navigation.navigate('Register')} style={styles.register_btn}>
                            {t('common:signup')}
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
    image: {
        flex: 1,
    },
    container_top: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        marginTop: statusBarHeight,
        width: 400,
        height: 400,
    },
    container_center: {
        flex: 4,
        alignItems: 'center',
    },
    view_login: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn_login: {
        flex: 1,
    },
    fingerprint: {
        flex: 0.18,
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    forgot: {
        marginVertical: 20,
        fontSize: fontSizeDefault,
        color: textColor,
        fontWeight: 'bold',
    },
});
