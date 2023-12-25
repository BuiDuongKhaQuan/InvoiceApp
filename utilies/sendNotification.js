import * as Notifications from 'expo-notifications';

export const handleNotification = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
};

export const sendNotification = async (title, body, time) => {
    // Gửi tin nhắn kiểm thử
    await Notifications.scheduleNotificationAsync({
        content: {
            autoDismiss: true,
            badge: 1,
            body: body,
            sound: 'default',
            sticky: false,
            title: title,
        },
        trigger: time, // Gửi ngay lập tức
    });
};
