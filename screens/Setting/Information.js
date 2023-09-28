import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { fontSizeDefault } from '../../constant/fontSize';
import { useUserContext } from '../UserContext';
import Loading from '../../components/Loading';
import SelectDropdown from 'react-native-select-dropdown';
import { StatusBar } from 'expo-status-bar';
import Header from '../../components/SettingItem/header';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
export default function Information() {
    const genders = ['Male', 'Female'];
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const { state } = useUserContext();
    const { dispatch } = useUserContext();
    const [photoShow, setPhotoShow] = useState(null);
    const [photoShowWallpaper, setPhotoShowWallpaper] = useState(null);
    const [loading, setLoading] = useState(false);
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
            const response = await axios.patch(
                'http://bill-rest.ap-southeast-2.elasticbeanstalk.com/api/v1/auth/users',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            dispatch({
                type: 'SIGN_IN',
                payload: response.data,
            });
            console.log('Cập nhật thành công:', response.data);
        } catch (error) {
            console.error('Lỗi:', error);
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
        console.log(localUri);
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
            const response = await axios.patch(
                'http://bill-rest.ap-southeast-2.elasticbeanstalk.com/api/v1/auth/users',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            dispatch({
                type: 'SIGN_IN',
                payload: response.data,
            });
            console.log('Cập nhật thành công:', response.data);
        } catch (error) {
            console.error('Lỗi:', error);
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
            const response = await axios.patch(
                'http://bill-rest.ap-southeast-2.elasticbeanstalk.com/api/v1/auth/users',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            dispatch({
                type: 'SIGN_IN',
                payload: response.data,
            });
            console.log(response.data);
        } catch (error) {
            console.error(' error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BackgroundImage>
            <Header title="Information" />
            <ScrollView style={styles.container}>
                <Loading loading={loading} />
                <View style={styles.top}>
                    <View style={styles.image}>
                        <Image
                            style={styles.avatar_img}
                            source={{
                                uri: state.user.image,
                            }}
                        />

                        <Button
                            text="Change avatar"
                            customStylesText={styles.text}
                            customStylesBtn={{ ...styles.change_btn, height: '37%' }}
                            onPress={takePhotoAndUpload}
                        />
                    </View>
                    <View style={styles.image}>
                        <Image
                            style={styles.wallpaper_img}
                            source={{
                                uri: state.user.wallpaper,
                            }}
                        />
                        <Button
                            text="Change wallpaper"
                            customStylesText={styles.text}
                            customStylesBtn={styles.change_btn}
                            onPress={uploadWallpaper}
                        />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Name:</Text>
                        <Input
                            customStylesContainer={styles.container_input}
                            holder={state.user.name}
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Email:</Text>
                        <Input
                            customStylesContainer={styles.container_input}
                            holder={state.user.email}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Phone:</Text>
                        <Input
                            customStylesContainer={styles.container_input}
                            holder={state.user.phone}
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                        />
                    </View>
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Gender:</Text>
                        <View style={styles.dropdown}>
                            <SelectDropdown
                                data={genders}
                                onSelect={(selectedItem, index) => {
                                    setSelectedGender(selectedItem);
                                }}
                                buttonStyle={styles.dropdown_btn}
                                defaultButtonText="Gender"
                                renderDropdownIcon={() => <Entypo name="chevron-small-down" size={24} color="black" />}
                                dropdownIconPosition="right"
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item;
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.btn}>
                    <Button text="Save" onPress={handlerSend} />
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
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
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom_item: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text: {
        fontWeight: 'bold',
        fontSize: fontSizeDefault,
    },
    container_input: {
        height: '50%',
        paddingHorizontal: 10,
        marginBottom: 0,
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
