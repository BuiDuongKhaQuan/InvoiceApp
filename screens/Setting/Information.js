import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { fontSizeDefault } from '../../constant/fontSize';
import { useUserContext } from '../UserContext';
import Loading from '../../components/Loading';
import SelectDropdown from 'react-native-select-dropdown';
import Header from '../../components/SettingItem/header';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { instance } from '../../Service/api';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function Information() {
    const navigation = useNavigation();
    const route = useRoute();
    const { state } = useUserContext();
    const { user, company } = state;
    const { dispatch } = useUserContext();
    const genders = ['Male', 'Female'];
    const userData = route.params?.data ? route.params.data : user;
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [phone, setPhone] = useState(userData.phone);
    const [selectedGender, setSelectedGender] = useState('');
    const [photoShow, setPhotoShow] = useState(null);
    const [photoShowWallpaper, setPhotoShowWallpaper] = useState(null);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const takePhotoAndUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        let localUri = result.assets[0].uri;
        setPhotoShow(localUri);
        let filename = localUri.split('/').pop();
        console.log(localUri);
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('id', state.user.id);
        formData.append('avartar', {
            uri: localUri,
            name: filename,
            type,
        });
        setLoading(true);
        try {
            const response = await instance.patch('/v1/auth/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch({
                type: 'SIGN_IN',
                payload: { user: response.data, company: state.company },
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    const uploadWallpaper = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 2],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        let localUri = result.assets[0].uri;
        setPhotoShowWallpaper(localUri);
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('id', state.user.id);
        formData.append('wallpaper', {
            uri: localUri,
            name: filename,
            type,
        });
        setLoading(true);
        try {
            const response = await instance.patch('/v1/auth/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch({
                type: 'SIGN_IN',
                payload: { user: response.data, company: state.company },
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    const handlerSend = async () => {
        let formData = new FormData();
        formData.append('id', state.user.id);
        // Kiểm tra và thêm tên nếu đã nhập
        if (name) {
            formData.append('name', name);
        }

        // Kiểm tra và thêm email nếu đã nhập
        if (email) {
            formData.append('email', email);
        }
        if (phone) {
            formData.append('phone', phone);
        }
        if (selectedGender) {
            formData.append('gender', selectedGender);
        }
        setLoading(true);
        try {
            const response = await instance.patch('/v1/auth/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch({
                type: 'SIGN_IN',
                payload: { user: response.data, company: state.company },
            });
            Alert.alert(t('common:updateSuccess'));
            console.log(response.data);
        } catch (error) {
            console.error(' error:', error.response);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BackgroundImage>
            <Header title={t('common:information')} />
            <ScrollView style={styles.container}>
                <Loading loading={loading} isFullScreen />
                <View style={styles.top}>
                    <View style={styles.image}>
                        <Image
                            style={styles.avatar_img}
                            source={
                                userData.image == null
                                    ? require('../../assets/images/default-avatar.png')
                                    : { uri: userData.image }
                            }
                        />
                        {route.params?.data === undefined ? (
                            <Button
                                text={t('common:changeAvt')}
                                customStylesText={styles.text}
                                customStylesBtn={{ ...styles.change_btn, height: '37%' }}
                                onPress={takePhotoAndUpload}
                            />
                        ) : (
                            <Text>{t('common:avatar')}</Text>
                        )}
                    </View>
                    <View style={styles.image}>
                        <Image
                            style={styles.wallpaper_img}
                            source={
                                userData.wallpaper == null
                                    ? require('../../assets/images/default-wallpaper.png')
                                    : { uri: userData.wallpaper }
                            }
                        />
                        {route.params?.data === undefined ? (
                            <Button
                                text={t('common:changeWallet')}
                                customStylesText={styles.text}
                                customStylesBtn={styles.change_btn}
                                onPress={uploadWallpaper}
                            />
                        ) : (
                            <Text>{t('common:wallpaper')}</Text>
                        )}
                    </View>
                </View>

                <View>
                    <View style={styles.bottom}>
                        <View style={styles.bottom_item}>
                            <View style={styles.container_text}>
                                <Text style={styles.text}>{t('common:name')}:</Text>
                            </View>
                            {route.params?.data === undefined ? (
                                <Input
                                    customStylesContainer={styles.container_input}
                                    holder={userData.name}
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                />
                            ) : (
                                <Text style={styles.name}>{userData.name}</Text>
                            )}
                        </View>
                        <View style={styles.bottom_item}>
                            <View style={styles.container_text}>
                                <Text style={styles.text}>{t('common:email')}:</Text>
                            </View>
                            {route.params?.data === undefined ? (
                                <Input
                                    customStylesContainer={styles.container_input}
                                    holder={userData.email}
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                />
                            ) : (
                                <Text style={styles.name}>{userData.email}</Text>
                            )}
                        </View>
                        <View style={styles.bottom_item}>
                            <View style={styles.container_text}>
                                <Text style={styles.text}>{t('common:phone')}:</Text>
                            </View>
                            {route.params?.data === undefined ? (
                                <Input
                                    customStylesContainer={styles.container_input}
                                    holder={userData.phone}
                                    value={phone}
                                    onChangeText={(text) => setPhone(text)}
                                />
                            ) : (
                                <Text style={styles.name}>{userData.phone}</Text>
                            )}
                        </View>
                        <View style={styles.bottom_item}>
                            <View style={styles.container_text}>
                                <Text style={styles.text}>{t('common:gender')}:</Text>
                            </View>
                            {route.params?.data === undefined ? (
                                <View style={styles.dropdown}>
                                    <SelectDropdown
                                        data={genders}
                                        onSelect={(selectedItem, index) => {
                                            setSelectedGender(selectedItem);
                                        }}
                                        buttonStyle={styles.dropdown_btn}
                                        defaultButtonText={userData.gender}
                                        renderDropdownIcon={() => (
                                            <Entypo name="chevron-small-down" size={24} color="black" />
                                        )}
                                        dropdownIconPosition="right"
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem;
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item;
                                        }}
                                    />
                                </View>
                            ) : (
                                <Text style={styles.name}>{userData.gender}</Text>
                            )}
                        </View>
                    </View>
                    {route.params?.data == undefined && (
                        <View style={styles.btn}>
                            <Button text="Save" onPress={handlerSend} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        marginHorizontal: 10,
    },
    top: {
        flex: 2,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    image: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex--start',
        alignItems: 'center',
    },
    avatar_img: {
        width: 100,
        height: 100,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'gray',
        resizeMode: 'stretch',
        marginHorizontal: 10,
    },
    wallpaper_img: {
        width: 100,
        height: 70,
        borderWidth: 1,
        borderColor: 'gray',
        resizeMode: 'stretch',
        marginHorizontal: 10,
    },
    change_btn: {
        flex: 0.6,
        width: '70%',
        height: '54%',
        borderRadius: 5,
    },
    bottom: {
        flex: 3,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom_item: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_text: {
        width: '100%',
        alignItems: 'flex-start',
    },
    text: {
        fontWeight: 'bold',
        fontSize: fontSizeDefault,
    },
    name: {
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        lineHeight: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        backgroundColor: 'white',
    },
    container_input: {
        height: '50%',
        paddingHorizontal: 10,
        elevation: 0,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
    },
    dropdown: {
        marginHorizontal: 10,
    },
    dropdown_btn: {
        height: '70%',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    btn: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
