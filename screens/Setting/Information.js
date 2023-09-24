import { StyleSheet, Text, View, Image, Keyboard, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidateEmail, isValidatePass } from '../utilies/validate';
import { backgroundColor } from '../constant/color';
import { fontSizeDefault } from '../constant/fontSize';

import SettingItem from '../components/SettingItem';
import Header from '../components/SettingItem/header';

import * as ImagePicker from 'expo-image-picker';

export default function InformationSetting({ navigation }) {
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [selectedImage, setSelectedImage] = useState();

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShow(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShow(false);
        });
    });

    const TopStyle = keyboardIsShow
        ? { ...styles.container_top, flex: 1, justifyContent: 'top' }
        : { ...styles.container_top };

    const centerStyle = keyboardIsShow
        ? { ...styles.container_center, flex: 1, justifyContent: 'center' }
        : { ...styles.container_center };

    const bottomStyle = keyboardIsShow
        ? { ...styles.container_bottom, flex: 1, justifyContent: 'center' }
        : { ...styles.container_bottom };

    const isValidateLogin = () => email.length > 0 && pass.length > 0 && errorEmail == false && errorPass == false;

    // const handlePress = () => {
    //     if (!isValidateLogin()) {
    //         return;
    //     } else {
    //         navigation.navigate('TabNavigator');
    //     }
    // };

    const handleChangeEmail = (text) => {
        setErrorEmail(!isValidateEmail(text));
        setEmail(text);
    };

    const [itemSetting, setItemSetting] = useState([
        {
            id: '1',
            data: [
                { id: '1', icon: require('../assets/icons/user-cicle.png'), title: 'Ảnh đại diện' },
                { id: '2', icon: require('../assets/images/avatar.png'), title: 'Ảnh nền' },
            ],
        },
    ]);

    const openImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access the gallery is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            // Handle the selected image (e.g., display it)
            setSelectedImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Thông tin liên hệ" />
            <View style={styles.container_top}></View>
            <View style={TopStyle}>
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
                            </>
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.container_bottom}>
                <Button title="Open Gallery" onPress={openImagePicker} />
                {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
            </View>
            {/* 
            <View style={TopStyle}>
                <Input
                    customStylesContainer={styles.input}
                    holder="Ảnh đại diện"
                    iconLeft={require('../assets/icons/account.png')}
                />
                <Input
                    customStylesContainer={styles.input}
                    holder="Ảnh nền"
                    iconLeft={require('../assets/icons/account.png')}
                />
            </View> */}

            <View style={centerStyle}>
                <Input customStylesContainer={styles.input} holder="Tên" />
                <Input
                    customStylesContainer={styles.input}
                    onChangeText={handleChangeEmail}
                    value={email}
                    validate={errorEmail}
                    validateText="Vui lòng nhập đúng định dạng email"
                    holder="Email"
                />
                <Input customStylesContainer={styles.input} value={Number} holder="Số điện thoại" />
                <Input customStylesContainer={styles.input} holder="Ngày sinh" />
                <Input customStylesContainer={styles.input} valua holder="Giới tính" />
            </View>
            <View style={styles.container_bottom}>
                <Button title="Open Gallery" onPress={openImagePicker} />
                {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'left',
        alignItems: 'left',
        backgroundColor: backgroundColor,
    },
    container_top: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        marginVertical: 0,
        marginTop: -20,
    },
    input: {
        borderRadius: 0,
        width: '100%',
        marginVertical: 0,
    },
    container_center: {
        flex: 2,
        alignItems: 'center',
    },
    container_bottom: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
    },
});
