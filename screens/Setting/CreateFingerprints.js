import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SwitchCustom from '../../components/Switch';
import Header from '../../components/SettingItem/header';
import { white } from '../../constant/color';
import { fontSizeMenuTitle } from '../../constant/fontSize';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateFingerprints() {
    const { t } = useTranslation();
    const [isEnabled, setIsEnabled] = useState(true);

    const toggleSwitch = async () => {
        // Lưu trạng thái thông báo vào AsyncStorage
        await AsyncStorage.setItem('biometricEnabledStatus', (!isEnabled).toString());
        // Bật/tắt thông báo
        setIsEnabled(!isEnabled);
    };

    useEffect(() => {
        const loadBiometricEnabledStatus = async () => {
            try {
                const storedStatus = await AsyncStorage.getItem('biometricEnabledStatus');
                if (storedStatus !== null) {
                    setIsEnabled(storedStatus === 'true');
                    console.log(storedStatus);
                }
            } catch (error) {
                console.error('Error loading biometric status:', error);
            }
        };

        loadBiometricEnabledStatus();
    }, []);

    return (
        <BackgroundImage>
            <Header title={t('common:Vâng tay')} />
            <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
                <Text style={{ paddingVertical: 15, paddingLeft: 10, fontSize: fontSizeMenuTitle }}>
                    {t('common:Cài đặt vâng tay')}
                </Text>
                <View style={{ paddingVertical: 10, backgroundColor: white, flexDirection: 'column' }}>
                    <View
                        style={{
                            paddingHorizontal: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>{t('common:Đăng nhập bằng vâng tay')}</Text>
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
