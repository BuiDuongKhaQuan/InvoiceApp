import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import SettingItem from '../components/SettingItem';
import Header from '../components/SettingItem/header';
import { backgroundColor } from '../constant/color';

export default function Setting() {
    const [itemString, setItemString] = useState([
        {
            id: '1',
            title: 'Tài khoản',
            data: [
                { id: '1', icon: require('../assets/icons/user-cicle.png'), title: 'Thông tin và liên hệ' },
                { id: '2', icon: require('../assets/icons/key.png'), title: 'Mật khẩu' },
            ],
        },
        {
            id: '2',
            title: 'Ứng dụng',
            data: [
                { id: '1', icon: require('../assets/icons/internet.png'), title: 'Đỗi ngôn ngữ' },
                { id: '2', icon: require('../assets/icons/notification.png'), title: 'Cài đặt thông báo' },
            ],
        },
        {
            id: '3',
            title: 'Hỗ trợ',
            data: [{ id: '1', icon: require('../assets/icons/question.png'), title: 'Yêu cầu hỗ trợ' }],
        },
    ]);

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={itemString}
                renderItem={({ item }) => <SettingItem data={item} key={item.id} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
});
