import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, Keyboard, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';
import { AntDesign } from '@expo/vector-icons';
import Input from '../Input';
import { createCompany, deleteCompany, updateCompany } from '../../Service/api';
import * as ImagePicker from 'expo-image-picker';
import Loading from '../Loading';
import { useTranslation } from 'react-i18next';

export default function Popup({ visible, onClose, data, create }) {
    const { t } = useTranslation();
    const [company, setCompany] = useState(data);
    const [name, setName] = useState(data ? company.name : '');
    const [email, setEmail] = useState(data ? company.email : '');
    const [phone, setPhone] = useState(data ? company.phone : '');
    const [address, setAddress] = useState(data ? company.address : '');
    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = useState(null);
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);

    const newStyle = keyboardIsShow ? { ...styles.container, height: '100%' } : { ...styles.container };

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShow(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShow(false);
        });
    }, [data]);
    const handleSelectedLogo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }
        setLogo(result.assets[0].uri);
    };
    const handleRestore = async () => {
        setLoading(true);
        try {
            await updateCompany(data.id, name, logo, '1', email, address, phone);
            Alert.alert('', t('common:success'));
        } catch (error) {
            Alert.alert('', t('common:error'));
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteCompany(data.id);
            Alert.alert('', t('common:success'));
        } catch (error) {
            Alert.alert('', t('common:error'));
        } finally {
            setLoading(false);
        }
    };

    const handlerSend = async () => {
        setLoading(true);
        try {
            const response = await updateCompany(data.id, name, logo, '1', email, address, phone);
            setCompany(response);
            Alert.alert(t('common:notification'), t('common:success'));
        } catch (error) {
            console.error(' error:', error.response.data);
        } finally {
            setLoading(false);
        }
    };
    const handleCreate = async () => {
        setLoading(true);
        try {
            const response = await createCompany(name, logo, '1', email, address, phone);
            setCompany(response);
            Alert.alert(t('common:notification'), t('common:success'));
        } catch (error) {
            console.error(' error:', error.response.data);
        } finally {
            setLoading(false);
        }
    };
    const newLogo = () => {
        if (data) {
            if (logo == null) {
                return { uri: data.logo };
            }
            if (logo != null) {
                return { uri: logo };
            }
            if (data.logo == null) {
                return require('../../assets/images/default-avatar.png');
            }
        }
    };
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={newStyle}>
                <Loading loading={loading} isFullScreen />
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.header}>
                        <View style={styles.header_item}></View>
                        <View style={styles.header_item}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{t('common:information')}</Text>
                        </View>
                        <TouchableOpacity
                            style={{ ...styles.header_item, alignItems: 'flex-end', marginRight: 20 }}
                            onPress={onClose}
                        >
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.avartar}>
                        <TouchableOpacity onPress={handleSelectedLogo}>
                            <Image source={newLogo()} style={styles.img} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.input_item}>
                            <Text style={styles.title}>{t('common:name')}</Text>
                            <Input
                                value={name}
                                onChangeText={(name) => setName(name)}
                                customStylesContainer={styles.input}
                                holder={data ? data.name : t('common:enterValue')}
                            />
                        </View>
                        <View style={styles.input_item}>
                            <Text style={styles.title}>Email</Text>
                            <Input
                                value={email}
                                onChangeText={(email) => setEmail(email)}
                                customStylesContainer={styles.input}
                                holder={data ? data.email : t('common:enterValue')}
                            />
                        </View>
                        <View style={styles.input_item}>
                            <Text style={styles.title}>{t('common:address')}</Text>
                            <Input
                                value={address}
                                onChangeText={(address) => setAddress(address)}
                                customStylesContainer={styles.input}
                                holder={data ? data.address : 'Enter value'}
                            />
                        </View>
                        <View style={styles.input_item}>
                            <Text style={styles.title}>{t('common:phone')}</Text>
                            <Input
                                value={phone}
                                onChangeText={(phone) => setPhone(phone)}
                                customStylesContainer={styles.input}
                                holder={data ? data.phone : t('common:address')}
                            />
                        </View>
                    </View>

                    <View style={styles.bottom}>
                        <Button
                            onPress={create ? handleCreate : handlerSend}
                            customStylesText={styles.text}
                            customStylesBtn={styles.btn}
                            text={data ? t('common:saveChanges') : t('common:create')}
                        />

                        {data && (
                            <Button
                                onPress={data.status == 1 ? handleDelete : handleRestore}
                                customStylesText={styles.text}
                                customStylesBtn={styles.btn}
                                text={data.status == 1 ? t('common:delete') : t('common:restore')}
                            />
                        )}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        height: 'auto',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: 'black',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    header_item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avartar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    img: {
        resizeMode: 'stretch',
        width: 90,
        height: 90,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'gray',
    },

    text: {
        fontSize: fontSizeDefault,
        textAlign: 'center',
    },

    input_item: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: fontSizeDefault,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 10,
        width: '100%',
    },
    input: {
        width: '95%',
        height: '45%',
        paddingLeft: 10,
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        elevation: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    center_item: {
        flex: 1,
        flexDirection: 'row',
    },
    bottom: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: -5,
    },
    btn: {
        flex: 1,
        height: 35,
        borderRadius: 5,
        marginHorizontal: 5,
    },
});
