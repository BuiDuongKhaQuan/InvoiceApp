import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import SettingItem from '../../components/SettingItem';
import Header from '../../components/SettingItem/header';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { AntDesign, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useUserContext } from '../UserContext';
import { useNavigation } from '@react-navigation/native';

export default function Setting() {
    const { dispatch } = useUserContext();
    const navigation = useNavigation();
    const [itemSetting, setItemSetting] = useState([
        {
            id: '1',
            title: 'Account',
            data: [
                {
                    id: '1',
                    icon: <AntDesign name="user" size={24} color="black" />,
                    title: 'Information and contact',
                    router: 'Information',
                },
                {
                    id: '2',
                    icon: <Ionicons name="key-outline" size={24} color="black" />,
                    title: 'Password',
                    router: 'ChangePassword',
                },
            ],
        },
        {
            id: '2',
            title: 'Application',
            data: [
                {
                    id: '1',
                    icon: <MaterialIcons name="language" size={24} color="black" />,
                    title: 'Language',
                    router: 'Language',
                },
                {
                    id: '2',
                    icon: <Ionicons name="notifications-outline" size={24} color="black" />,
                    title: 'Notification',
                    router: 'Notification',
                },
            ],
        },
        {
            id: '3',
            title: 'Support',
            data: [
                {
                    id: '1',
                    icon: <AntDesign name="questioncircleo" size={24} color="black" />,
                    title: 'Support',
                    router: 'Support',
                },
            ],
        },
    ]);

    return (
        <View style={styles.container}>
            <BackgroundImage>
                <Header title="Settings" />
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
                                        onPress={() => {
                                            dispatch({
                                                type: 'SIGN_OUT',
                                            });
                                            navigation.navigate('Login');
                                        }}
                                        text="Logout"
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
