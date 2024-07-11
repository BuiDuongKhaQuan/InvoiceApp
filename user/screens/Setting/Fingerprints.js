import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwitchCustom from '../../components/Switch';
import Header from '../../components/SettingItem/header';
import { white } from '../../constant/color';
import { fontSizeMenuTitle } from '../../constant/fontSize';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Fingerprints() {
    const { t } = useTranslation();
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = async () => {
        try {
            const isSupported = await LocalAuthentication.hasHardwareAsync();

            if (isSupported) {
                // Lưu trạng thái thông báo vào AsyncStorage
                await AsyncStorage.setItem('biometricEnabledStatus', (!isEnabled).toString());
                console.log('Trạng thái đã được lưu:', !isEnabled);
                // Bật/tắt thông báo
                setIsEnabled(!isEnabled);
            } else {
                // Thiết bị không hỗ trợ xác thực vân tay
                Alert.alert(t('common:notification'), t('common:noSupportFingerprint'));
                // Thực hiện các xử lý khác nếu cần
            }
        } catch (error) {
            console.error('Lỗi kiểm tra hỗ trợ xác thực hoặc thiết lập mục:', error);
        }
    };
    useEffect(() => {
        const loadBiometricStatus = async () => {
            try {
                const storedStatus = await AsyncStorage.getItem('biometricEnabledStatus');
                if (storedStatus !== null) {
                    setIsEnabled(storedStatus === 'true');
                }
            } catch (error) {
                console.error('Lỗi khi đọc trạng thái từ AsyncStorage:', error);
            }
        };

        loadBiometricStatus();
    }, []);
    return (
        <BackgroundImage>
            <Header title={t('common:fingerprint')} />
            <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
                <Text style={{ paddingVertical: 15, paddingLeft: 10, fontSize: fontSizeMenuTitle }}>
                    {t('common:editFingerprint')}
                </Text>
                <View style={{ paddingVertical: 10, backgroundColor: white, flexDirection: 'column' }}>
                    <View
                        style={{
                            paddingHorizontal: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>{t('common:loginFingerprint')}</Text>
                        <SwitchCustom isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
                    </View>
                </View>
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
