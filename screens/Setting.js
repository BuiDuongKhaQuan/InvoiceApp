import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import SettingItem from '../components/SettingItem';

export default function Setting() {
    const [itemString, setItemString] = useState([
        {
            id: '1',
            title: 'Tài khoản',
            data: [
                { id: '1', title: 'Thông tin và liên hệ' },
                { id: '2', title: 'Mật khẩu' },
            ],
        },
        {
            id: '2',
            title: 'Ứng dụng',
            data: [
                { id: '1', title: 'Đỗi ngôn ngữ' },
                { id: '2', title: 'Cài đặt thông báo' },
            ],
        },
        {
            id: '3',
            title: 'Hỗ trợ',
            data: [{ id: '1', title: 'Yêu cầu hỗ trợ' }],
        },
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.back}>
                <Button
                    customStylesText={{ color: 'red' }}
                    customStylesBtn={{}}
                    iconLeft={require('../assets/icons/left-arrow.png')}
                />
                <Text style={styles.title}>Thiết lập</Text>
            </View>
            <SettingItem />
        </View>
    );
}

const styles = StyleSheet.create({});
