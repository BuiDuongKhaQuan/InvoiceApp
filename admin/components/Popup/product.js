import { StyleSheet, Text, View, Modal, TouchableOpacity, Keyboard, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';
import { AntDesign } from '@expo/vector-icons';
import Input from '../Input';
import { deleteProductById, updateProduct } from '../../Service/api';
import Loading from '../Loading';
import { useTranslation } from 'react-i18next';

export default function Popup({ visible, onClose, data }) {
    const { t } = useTranslation();
    const [product, setProduct] = useState(data);
    const [name, setName] = useState(data ? product.name : '');
    const [price, setPrice] = useState(data ? product.price : '');
    const [stock, setStock] = useState(data ? product.stock : '');
    const [description, setDesciption] = useState(data ? product.description : '');
    const [loading, setLoading] = useState(false);
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    const newStyle = keyboardIsShow ? { ...styles.container, height: '100%' } : { ...styles.container };

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShow(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShow(false);
        });
    });

    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await deleteProductById(data.id);
            Alert.alert(t('common:notification'), t('common:success'));
        } catch (error) {
            console.error('error:', error.response);
        } finally {
            setLoading(false);
        }
    };

    const handlerSend = async () => {
        setLoading(true);
        try {
            const response = await updateProduct(data.id, name, '1', price, description, '1');
            setProduct(response);
            Alert.alert(t('common:notification'), t('common:success'));
        } catch (error) {
            console.error(' error:', error.response.data.message);
        } finally {
            setLoading(false);
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
                    <View style={styles.center}>
                        <View style={styles.input_item}>
                            <Text style={styles.title}>{t('common:name')}</Text>
                            <Input
                                value={name}
                                onChangeText={(name) => setName(name)}
                                customStylesContainer={styles.input}
                                holder={data ? data.name : 'common:enterName'}
                            />
                        </View>
                        <View style={styles.input_item}>
                            <Text style={styles.title}>{t('common:price')}</Text>
                            <Input
                                value={String(price)}
                                onChangeText={(price) => setPrice(price)}
                                customStylesContainer={styles.input}
                                holder={data ? data.price.toString() : 'common:enterValue'}
                            />
                        </View>
                        <View style={styles.input_item}>
                            <Text style={styles.title}>{t('common:stock')}</Text>
                            <Input
                                value={String(stock)}
                                onChangeText={(stock) => setStock(stock)}
                                customStylesContainer={styles.input}
                                holder={data ? data.price.toString() : 'common:enterValue'}
                            />
                        </View>
                        <View style={styles.input_item}>
                            <Text style={styles.title}>{t('common:description')}</Text>
                            <Input
                                value={description}
                                onChangeText={(description) => setDesciption(description)}
                                customStylesContainer={styles.input}
                                holder={data ? data.description : 'common:enterValue'}
                            />
                        </View>
                    </View>

                    <View style={styles.bottom}>
                        <Button
                            onPress={handlerSend}
                            customStylesText={styles.text}
                            customStylesBtn={styles.btn}
                            text={t('common:saveChanges')}
                        />

                        <Button
                            onPress={handleDelete}
                            customStylesText={styles.text}
                            customStylesBtn={styles.btn}
                            text={t('common:delete')}
                        />
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
    top: {
        flex: 2,
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
    content: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },
    avartar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    img: {
        resizeMode: 'stretch',
        width: 90,
        height: 90,

        borderWidth: 1,
        borderColor: 'gray',
    },
    text: {
        fontSize: fontSizeDefault,
        textAlign: 'center',
    },
    information: {
        flex: 1,
        marginTop: 10,
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
        alignItems: 'flex-start',
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
    dropdown_btn: {
        marginTop: 10,
        height: 35,
        width: '90%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginHorizontal: 10,
        marginBottom: 10,
    },
});
