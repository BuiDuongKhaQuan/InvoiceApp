import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { fontSizeDefault } from '../../constant/fontSize';
import { useUserContext } from '../UserContext';
import Loading from '../../components/Loading';
import Header from '../../components/SettingItem/header';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { instance } from '../../Service/api';
import { useTranslation } from 'react-i18next';
import { white } from '../../constant/color';
import { useNavigation } from '@react-navigation/native';

export default function CompanyInfo() {
    const { state } = useUserContext();
    const { user, company } = state;
    const { dispatch } = useUserContext();
    const [name, setName] = useState(company.name);
    const [email, setEmail] = useState(company.email);
    const [phone, setPhone] = useState(company.phone);
    const [address, setAddress] = useState(company.address);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handleChangeLogin = () => {
        // Hiển thị cảnh báo cho người dùng xác nhận
        Alert.alert(
            t('common:alert_success'),
            t('common:updateSuccess'),
            [
                {
                    text: t('common:alert_yes'),
                    onPress: () => navigation.navigate('ProfileCompany'),
                    cancelable: true,
                },
            ],
            { cancelable: false },
        );
    };

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
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('id', company.id);
        formData.append('logo', {
            uri: localUri,
            name: filename,
            type,
        });
        try {
            setLoading(true);
            const response = await instance.patch('/v1/companies', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch({
                type: 'SIGN_IN',
                payload: { user: user, company: response.data },
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlerSend = async () => {
        let formData = new FormData();
        formData.append('id', company.id);

        if (name) {
            formData.append('name', name);
        }
        if (email) {
            formData.append('email', email);
        }
        if (phone) {
            formData.append('phone', phone);
        }
        if (address) {
            formData.append('address', address);
        }
        try {
            setLoading(true);
            const response = await instance.patch('/v1/companies', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch({
                type: 'SIGN_IN',
                payload: { user: user, company: response.data },
            });
            handleChangeLogin();
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
                                company.logo == null
                                    ? require('../../assets/images/default-avatar.png')
                                    : { uri: company.logo }
                            }
                        />
                        <Button
                            text={t('common:changeLogo')}
                            customStylesText={{ ...styles.text, textAlign: 'center' }}
                            customStylesBtn={{ ...styles.change_btn, height: '37%' }}
                            onPress={takePhotoAndUpload}
                        />
                    </View>
                </View>

                <View>
                    <View style={styles.bottom}>
                        <View style={styles.bottom_item}>
                            <Text style={styles.text}>{t('common:name')}:</Text>
                            <Input
                                customStylesContainer={styles.container_input}
                                holder={company.name}
                                value={name}
                                onChangeText={(text) => setName(text)}
                            />
                        </View>
                        <View style={styles.bottom_item}>
                            <Text style={styles.text}>{t('common:email')}:</Text>
                            <Input
                                customStylesContainer={styles.container_input}
                                holder={company.email}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                        <View style={styles.bottom_item}>
                            <Text style={styles.text}>{t('common:phone')}:</Text>
                            <Input
                                customStylesContainer={styles.container_input}
                                holder={company.phone}
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                            />
                        </View>
                        <View style={styles.bottom_item}>
                            <Text style={styles.text}>{t('common:addressInvoice')}:</Text>
                            <Input
                                customStylesContainer={styles.container_input}
                                holder={company.address}
                                value={address}
                                onChangeText={(text) => setAddress(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.btn}>
                        <Button text={t('common:save')} onPress={handlerSend} />
                    </View>
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
    },
    bottom_item: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        width: '100%',
        textAlign: 'left',
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

    btn: {
        marginHorizontal: 10,
    },
});
