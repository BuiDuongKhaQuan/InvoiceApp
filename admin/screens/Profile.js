import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Input from '../components/Input';
import { useUserContext } from './UserContext';
import * as ImagePicker from 'expo-image-picker';
import Loading from '../components/Loading';
import { white } from '../constant/color';
import { useTranslation } from 'react-i18next';
import { instance } from '../Service/api';

export default function Profile({ navigation }) {
    const { state, dispatch } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(state.user.name);
    const { t } = useTranslation();
    const takePhotoAndUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        let localUri = result.assets[0].uri;
        let filename = localUri.split('/').pop();
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
                payload: response.data,
            });
            Alert.alert('Thông báo', 'Đổi ảnh đại diện thành công');
        } catch (error) {
            console.error('Lỗi:', error);
        } finally {
            setLoading(false);
        }
    };
    const handlerSend = async () => {
        let formData = new FormData();
        formData.append('id', state.user.id);
        if (name) {
            formData.append('name', name);
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
                payload: response.data,
            });
            Alert.alert('Thông báo', 'Lưu thông tin thành công');
        } catch (error) {
            console.error(' error:', error.response);
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <Loading loading={loading} isFullScreen />
            <View style={styles.container_top}>
                <View style={styles.top_avatar}>
                    <View style={styles.top_}>
                        <Image
                            style={styles.avatar}
                            source={
                                state.user.image == null
                                    ? require('../assets/images/default-avatar.png')
                                    : { uri: state.user.image }
                            }
                        />
                        <TouchableOpacity onPress={takePhotoAndUpload}>
                            <MaterialIcons
                                name="add-a-photo"
                                size={24}
                                color="black"
                                style={{
                                    marginTop: -33,
                                    marginLeft: 60,
                                    backgroundColor: '#FD6D6D',
                                    borderRadius: 30,
                                    padding: 4,
                                }}
                            />
                        </TouchableOpacity>

                        <Text style={{ ...styles.name, textAlign: 'center' }}>{name}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container_center}>
                <View style={styles.input_center}>
                    <Text style={styles.name}>{t('common:name')}</Text>
                    <Input
                        validateText={t('common:formatEmail')}
                        holder={t('common:enterName')}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        customStylesContainer={styles.input}
                        customStylesInput={styles.input1}
                        iconLeft={<MaterialCommunityIcons name="account" size={24} color="black" />}
                    />
                </View>
                <View style={styles.input_center}>
                    <Text style={styles.name}>Email</Text>
                    <Input
                        editable={false}
                        holder={state.user.email}
                        customStylesContainer={styles.input}
                        customStylesInput={styles.input1}
                        iconLeft={<MaterialIcons name="email" size={24} color="black" />}
                    />
                </View>
                <View style={styles.input_center}>
                    <Text style={styles.name}>{t('common:password')}</Text>
                    <Button
                        text={t('common:changePassword')}
                        onPress={() => navigation.navigate('ChangePassword')}
                        customStylesBtn={{ ...styles.btn, backgroundColor: white, borderWidth: 0 }}
                        customStylesText={{ ...styles.text_btn, color: 'gray', fontSize: 15 }}
                        iconLeft={<MaterialCommunityIcons name="key-variant" size={24} color="black" />}
                        iconRight={<FontAwesome5 name="chevron-right" size={24} color="black" />}
                    />
                </View>
            </View>
            <View style={styles.container_bottom}>
                <Button text={t('common:save')} customStylesBtn={styles.btn} onPress={handlerSend} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#E4E8E5',
    },
    container_top: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        flex: 2.3,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    img_default: {
        flex: 2,
        width: 10,
        resizeMode: 'stretch',
    },
    top_avatar: {
        flex: 1,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'gray',
        resizeMode: 'stretch',
    },
    top_: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    container_center: {
        flex: 3,
        marginHorizontal: 10,
        marginVertical: 10,
        marginTop: 40,
    },
    backgroundIcon: {
        height: 30,
        backgroundColor: 'blue',
    },
    name: {
        marginHorizontal: 10,
        color: '#806969',
        width: '100%',
    },
    input: {
        flexDirection: 'column',
        width: '100%',
        height: 50,
        elevation: 0,
        borderRadius: 5,
    },
    input1: {
        fontSize: 15,
    },
    input_center: {
        width: '100%',
        alignItems: 'center',
    },
    container_bottom: {
        marginVertical: 10,
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 40,
    },
    btn: {
        width: '100%',
        height: 50,
        borderRadius: 5,
    },
});
