import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import SettingItem from '../../components/SettingItem';
import Header from '../../components/SettingItem/header';
import { AntDesign } from '@expo/vector-icons';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';

export default function Language() {
    const [itemSetting, setItemSetting] = useState([
        {
            id: '1',
            title: 'Change language',
            data: [
                { id: '1', title: 'Tiếng Việt' },
                { id: '2', title: 'American' },
            ],
        },
    ]);

    return (
        <BackgroundImage>
            <Header title="Language" />
            <View style={styles.container}>
                <FlatList
                    data={itemSetting}
                    renderItem={({ item }) => (
                        <SettingItem
                            data={item}
                            key={item.id}
                            iconRight={<AntDesign name="check" size={24} color="black" />}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
