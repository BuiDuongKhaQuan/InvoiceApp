import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SwitchCustom from '../../components/Switch';
import Header from '../../components/SettingItem/header';
import { white } from '../../constant/color';
import { fontSizeMenuTitle } from '../../constant/fontSize';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { useTranslation } from 'react-i18next';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import { sendNotification } from '../../utilies/sendNotification';

export default function Notification() {
    const { t } = useTranslation();
    const [isEnabled, setIsEnabled] = useState(true);

    const toggleSwitch = async () => {
        // Lưu trạng thái thông báo vào AsyncStorage
        await AsyncStorage.setItem('notificationStatus', (!isEnabled).toString());
        // Bật/tắt thông báo
        setIsEnabled(!isEnabled);
        // Hiển thị thông báo xác nhận cho người dùng (có thể thay đổi tùy ý)
        const message = isEnabled ? 'Notifications are now disabled' : 'Notifications are now enabled';
        alert(message);
    };

    // Gọi khi component được hiển thị
    useEffect(() => {
        loadNotificationStatus();
        registerForPushNotificationsAsync();
    }, []);

    const loadNotificationStatus = async () => {
        const status = await AsyncStorage.getItem('notificationStatus');
        setIsEnabled(status === 'true');
    };

    const registerForPushNotificationsAsync = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        const tokenData = await Notifications.getExpoPushTokenAsync({
            projectId: '6543f9e9-7465-4329-9d6a-396c9e14511f',
        });
        const expoPushToken = tokenData.data;
        // console.log('Expo Push Token:', expoPushToken);
    };

    return (
        <BackgroundImage>
            <Header title={t('common:notification')} />
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
                    <Text style={{ paddingVertical: 15, paddingLeft: 10, fontSize: fontSizeMenuTitle }}>
                        {t('common:notify')}
                    </Text>
                    <View style={{ paddingVertical: 10, backgroundColor: white, flexDirection: 'column' }}>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>{t('common:notification')}</Text>
                            <SwitchCustom isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
                        </View>
                        <Text style={{ color: 'gray', paddingHorizontal: 10 }}>{t('common:note')}</Text>
                        {isEnabled && (
                            <Button
                                onPress={() => sendNotification('Thông báo tin nhắn', 'Bạn có 1 tin nhắn mới!', null)}
                                text={'test'}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
