import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import SettingItem from '../components/SettingItem';
import Header from '../components/SettingItem/header';
import { backgroundColor } from '../constant/color';

export default function Language() {
    const [itemSetting, setItemSetting] = useState([
        {
            id: '1',
            title: 'Ngôn Ngữ',
            data: [
                { id: '1', title: 'Tiếng Viết' },
                { id: '2', title: 'Tiếng Anh' },
            ],
        },
    ]);

    return (
        <View style={styles.container}>
            <Header title=" Đỗi Ngôn Ngữ" />
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
                                iconRight={require('../assets/icons/check.png')}
                            />
                            {/* <Button customStylesBtn={styles.logout_btn} text="Đăng xuất" /> */}
                        </>
                    );
                }}
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
    logout_btn: {
        marginHorizontal: 10,
        width: '95%',
        borderRadius: 50,
        borderWidth: 0,
        backgroundColor: '#B7B7B7',
        elevation: 0,
    },
});
