import { StyleSheet, View, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateEmail, isValidateOTP } from '../utilies/validate';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { forgotPassword, validateReset } from '../Service/api';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';
import { statusBarHeight } from '../constant/dimistion';
import { ScrollView } from 'react-native';

export default function ForgotPassword({ navigation }) {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorCode, setErrorCode] = useState(false);
    const [loading, setLoading] = useState(false);

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
            Alert.alert(t('common:alert_success'), t('common:OPTSuccess'));
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
            const re = await validateReset(email.trim(), code);
            navigation.navigate('ResetPassword', { data: email.trim() });
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
                        holder="Email"
                        iconLeft={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
                        btnSend
                        onPressSend={handleSend}
                    />
                    <Input
                        onChangeText={handleChangeCode}
                        value={code}
                        validate={errorCode}
                        validateText={t('common:verifyCode')}
                        customStylesInput={{ marginLeft: 50 }}
                        holder={t('common:verify')}
                    />

                    <View style={styles.view_login}>
                        <View style={styles.btn_login}>
                            <Button onPress={handlePress} text={t('common:confirm')} />
                        </View>
                    </View>
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
});
