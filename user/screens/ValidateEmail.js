import { StyleSheet, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateOTP } from '../utilies/validate';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { validateRegister } from '../Service/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { statusBarHeight } from '../constant/dimistion';
import Loading from '../components/Loading';

export default function ForgotPassword() {
    const [code, setCode] = useState('');
    const [errorCode, setErrorCode] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            await validateRegister(route.params?.data, code);
            navigation.navigate('Login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Alert.alert(t('common:loginerror'), error.response.data.message);
            } else {
                console.error(t('common:loginerror'), error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChangeCode = (text) => {
        setErrorCode(!isValidateOTP(text));
        setCode(text);
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
                        onChangeText={handleChangeCode}
                        value={code}
                        validate={errorCode}
                        validateText={t('common:charactorOTP')}
                        customStylesInput={{ marginLeft: 10 }}
                        holder={t('common:otpCode')}
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
