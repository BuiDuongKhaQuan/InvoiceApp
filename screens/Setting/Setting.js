import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import SettingItem from '../../components/SettingItem';
import Header from '../../components/SettingItem/header';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { AntDesign, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

export default function Setting() {
    const [itemSetting, setItemSetting] = useState([
        {
            id: '1',
            title: 'Tài khoản',
            data: [
                { id: '1', icon: <AntDesign name="user" size={24} color="black" />, title: 'Thông tin và liên hệ' },
                { id: '2', icon: <Ionicons name="key-outline" size={24} color="black" />, title: 'Mật khẩu' },
            ],
        },
        {
            id: '2',
            title: 'Ứng dụng',
            data: [
                { id: '1', icon: <MaterialIcons name="language" size={24} color="black" />, title: 'Đổi ngôn ngữ' },
                {
                    id: '2',
                    icon: <Ionicons name="notifications-outline" size={24} color="black" />,
                    title: 'Cài đặt thông báo',
                },
            ],
        },
        {
            id: '3',
            title: 'Hỗ trợ',
            data: [
                {
                    id: '1',
                    icon: <AntDesign name="questioncircleo" size={24} color="black" />,
                    title: 'Yêu cầu hỗ trợ',
                },
            ],
        },
    ]);

    return (
        <View style={styles.container}>
            <BackgroundImage>
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
                                    <Button
                                        iconLeft={<SimpleLineIcons name="logout" size={24} color="black" />}
                                        customStylesBtn={styles.logout_btn}
                                        text="Đăng xuất"
                                    />
                                </>
                            );
                        }}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </BackgroundImage>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_center: {
        flex: 1,
    },
    logout_btn: {
        marginHorizontal: 10,
        width: '95%',
        borderRadius: 5,
        borderWidth: 0,
        backgroundColor: '#B7B7B7',
        elevation: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
