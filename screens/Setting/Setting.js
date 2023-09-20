import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import SettingItem from '../../components/SettingItem';
import Header from '../../components/SettingItem/header';
import { backgroundColor, white } from '../../constant/color';

export default function Setting() {
    const [itemSetting, setItemSetting] = useState([
        {
            id: '1',
            title: 'Tài khoản',
            data: [
                { id: '1', icon: require('../../assets/icons/user-cicle.png'), title: 'Thông tin và liên hệ' },
                { id: '2', icon: require('../../assets/icons/key.png'), title: 'Mật khẩu' },
            ],
        },
        {
            id: '2',
            title: 'Ứng dụng',
            data: [
                { id: '1', icon: require('../../assets/icons/internet.png'), title: 'Đổi ngôn ngữ' },
                { id: '2', icon: require('../../assets/icons/notification.png'), title: 'Cài đặt thông báo' },
            ],
        },
        {
            id: '3',
            title: 'Hỗ trợ',
            data: [{ id: '1', icon: require('../../assets/icons/question.png'), title: 'Yêu cầu hỗ trợ' }],
        },
    ]);

    return (
        <View style={styles.container}>
            <Header title="Thiết lập" />
            <View style={styles.container_center}>
                <FlatList
                    data={itemSetting}
                    renderItem={({ item }) => {
                        if (itemSetting[itemSetting.length - 1] !== item) {
                            return <SettingItem data={item} key={item.id} />;
                        }
                        return (
                            <>
                                <SettingItem
                                    data={itemSetting[itemSetting.length - 1]}
                                    key={itemSetting[itemSetting.length - 1].id}
                                />
                                <Button customStylesBtn={styles.logout_btn} text="Đăng xuất" />
                            </>
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    container_center: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    logout_btn: {
        marginHorizontal: 10,
        width: '95%',
        borderRadius: 50,
        borderWidth: 0,
        backgroundColor: '#B7B7B7',
        elevation: 0,
    },
});
