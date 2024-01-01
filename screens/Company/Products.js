import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/SettingItem/header';
import Input from '../../components/Input';
import { getProductsByCompany, createProduct, deleteProductById, updateProduct, postProduct } from '../../Service/api';
import { useUserContext } from '../UserContext';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading';
import { buttonColor, white } from '../../constant/color';
import ImageBackground from '../../layouts/DefaultLayout/BackgroundImage';
import { fontSizeDefault } from '../../constant/fontSize';
import Button from '../../components/Button';

export default function Products() {
    const { t } = useTranslation();
    const { state } = useUserContext();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [nameModal, setNameModal] = useState('');
    const [stockModal, setStockModal] = useState('');
    const [priceModal, setPriceModal] = useState('');
    const [statusModal, setStatusModal] = useState();
    const [productModal, setProductModal] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddProduct = async () => {
        try {
            setLoading(true);
            const response = await createProduct(name, price, state.company.name, stock);
            setProducts((prevProduct) => [...prevProduct, response]);
            Alert.alert(t('common:alert_success'), t('common:addProductSuccess'));
        } catch (error) {
            console.error('Lỗi: ', error);
        } finally {
            setLoading(false);
        }
    };
    const handleExpulsionProduct = async (id) => {
        try {
            setLoadingModal(true);
            await deleteProductById(id);
            setStatusModal(2);
            setProducts((prevProducts) =>
                prevProducts.map((product) => (product.id === id ? { ...product, status: 2 } : product)),
            );

            // setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            Alert.alert(t('common:alert_success'), t('common:recall'));
        } catch (error) {
            if (error.response) {
                console.error('Server error:', error.response.data);
            } else {
                console.error('Unexpected error:', error.message);
            }
        } finally {
            setLoadingModal(false);
        }
    };
    const handlePostProduct = async (id, status) => {
        try {
            setLoadingModal(true);
            const response = await postProduct(id, status);
            setStatusModal(1);
            setProducts((prevProducts) =>
                prevProducts.map((product) => (product.id === id ? { ...product, status: response.status } : product)),
            );
            Alert.alert(t('common:alert_success'), t('common:postSuccess'));
        } catch (error) {
            if (error.response) {
                console.error('Server error:', error.response.data);
            } else {
                console.error('Unexpected error:', error.message);
            }
        } finally {
            setLoadingModal(false);
        }
    };
    const handleSubmit = () => {
        // Hiển thị cảnh báo cho người dùng xác nhận
        Alert.alert(
            t('common:questionCreate'),
            t('common:confimQuestionCreate'),
            [
                {
                    text: t('common:noAgree'),
                    cancelable: true,
                    style: 'cancel',
                },
                {
                    text: t('common:agree'),
                    onPress: async () => {
                        await handleAddProduct();
                    },
                    cancelable: true,
                },
            ],
            { cancelable: false },
        );
    };
    const getProducts = async (page) => {
        try {
            setLoading(true);
            const response = await getProductsByCompany(state.company.name, 20, page);
            setProducts((prevProduct) => [...prevProduct, ...response]);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts(page);
    }, [page]);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20; // Đặt một giá trị padding để xác định khi nào là cuối trang

        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            // Nếu đã cuộn đến cuối, tăng số trang lên 1 để fetch dữ liệu trang tiếp theo
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleShowProductModal = (product) => {
        setStatusModal(product.status);
        setProductModal(product);
        setIsModalVisible(true);
    };

    const handleUpdateProduct = async () => {
        try {
            setLoadingModal(true);
            const response = await updateProduct(productModal.id, nameModal, priceModal, stockModal);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productModal.id
                        ? { ...product, name: response.name, price: response.price, stock: response.stock }
                        : product,
                ),
            );

            Alert.alert(t('common:alert_success'), t('common:editInformationProduct'));
        } catch (error) {
            console.error('Lỗi: ', error);
        } finally {
            setLoadingModal(false);
        }
    };

    return (
        <ImageBackground style={styles.container}>
            <Header title={t('common:product')} />
            <View style={styles.container_input}>
                <Input
                    customStylesContainer={styles.input}
                    holder={t('common:searcchProduct')}
                    iconLeft={<Feather name="search" size={24} color="black" />}
                    iconRight={<Ionicons name="ios-qr-code-outline" size={24} color="black" />}
                    onPressIconRight={() => navigation.navigate('Scanner')}
                />
            </View>
            <ScrollView style={styles.list} onScroll={handleScroll} scrollEventThrottle={16}>
                <View style={styles.waper_add}>
                    <View>
                        <TextInput
                            style={styles.text_change}
                            placeholder={t('common:nameProduct')}
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />

                        <TextInput
                            style={styles.text_change}
                            placeholder={t('common:quantityProduct')}
                            value={stock}
                            onChangeText={(text) => setStock(text)}
                        />
                        <TextInput
                            style={styles.text_change}
                            placeholder={t('common:priceProduct')}
                            value={price}
                            onChangeText={(text) => setPrice(text)}
                        />
                    </View>
                    <Button
                        text={t('common:add')}
                        onPress={handleSubmit}
                        customStylesBtn={{ marginVertical: 0, flex: 0.3 }}
                        customStylesText={{ fontSize: fontSizeDefault }}
                    />
                </View>
                <Loading loading={loading}>
                    <View style={styles.table}>
                        <View style={styles.table_colum}>
                            <Text style={[styles.text_bold, styles.colum_name]}>{t('common:item')}</Text>
                            <Text style={[styles.text_bold, styles.colum_p]}>{t('common:name')}</Text>
                            <Text style={[styles.text_bold, styles.colum_name]}>{t('common:stock')}</Text>
                            <Text style={[styles.text_bold, styles.colum_name]}>{t('common:price')}</Text>
                            <Text style={[styles.text_bold, styles.colum_name]}>{t('common:status')}</Text>
                        </View>
                        {products.map((product, index) => {
                            let statusString = '';
                            if (product.status === 1) statusString = t('common:onSale');
                            if (product.status === 2) statusString = t('common:notSold');
                            return (
                                <TouchableOpacity
                                    style={styles.table_colum}
                                    key={index}
                                    onPress={() => handleShowProductModal(product)}
                                >
                                    <Text style={[styles.text_line, styles.colum_name]}>{index + 1}</Text>
                                    <Text style={[styles.text_line, styles.colum_p]}>{product.name}</Text>
                                    <Text style={[styles.text_line, styles.colum_name]}>{product.stock}</Text>
                                    <Text style={[styles.text_line, styles.colum_name]}>{product.price}</Text>
                                    <Text style={[styles.text_line, styles.colum_name]}>{statusString}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </Loading>
            </ScrollView>
            <Modal animationType="slide" transparent={false} visible={isModalVisible}>
                {productModal && (
                    <ScrollView style={styles.container}>
                        <Text style={styles.titleTable}>{t('common:informationProduct')}</Text>
                        <Loading loading={loadingModal}>
                            <View style={styles.modal_info}>
                                <View style={{ ...styles.contact_row, borderBottomWidth: 1 }}>
                                    <Text style={styles.text_default}>{t('common:name')}:</Text>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder={productModal.name}
                                        value={nameModal}
                                        onChangeText={(text) => setNameModal(text)}
                                    />
                                </View>
                                <View style={{ ...styles.contact_row, borderBottomWidth: 1 }}>
                                    <Text style={styles.text_default}>{t('common:stock')}:</Text>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder={String(productModal.stock)}
                                        value={stockModal}
                                        onChangeText={(text) => setStockModal(text)}
                                    />
                                </View>
                                <View style={styles.contact_row}>
                                    <Text style={styles.text_default}>{t('common:price')}:</Text>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder={String(productModal.price)}
                                        value={priceModal}
                                        onChangeText={(text) => setPriceModal(text)}
                                    />
                                </View>
                            </View>
                        </Loading>
                        <Button
                            customStylesBtn={styles.btn}
                            customStylesText={styles.btnClose}
                            text={statusModal === 2 ? t('common:postSale') : t('common:recallSale')}
                            onPress={() =>
                                productModal.status === 2
                                    ? handlePostProduct(productModal.id, 1)
                                    : handleExpulsionProduct(productModal.id)
                            }
                        />
                        <Button
                            customStylesBtn={styles.btn}
                            customStylesText={styles.btnClose}
                            text={t('common:save')}
                            onPress={() => handleUpdateProduct()}
                        />
                        <Button
                            customStylesBtn={styles.btn}
                            customStylesText={styles.btnClose}
                            text={t('common:close')}
                            onPress={() => setIsModalVisible(false)}
                        />
                    </ScrollView>
                )}
            </Modal>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    list: {
        marginHorizontal: 15,
    },
    container_input: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
    },
    input: {
        height: 50,
        borderWidth: 2,
        borderColor: white,
        backgroundColor: '#C9C9C9',
    },
    table: {
        marginTop: 10,
        flexDirection: 'column',
    },
    table_colum: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingVertical: 5,
    },
    colum_p: {
        flex: 3,
        textAlign: 'left',
        marginLeft: 0,
        marginRight: 5,
    },
    colum_name: {
        flex: 1.2,
        marginLeft: 0,
    },
    text_change: {
        flex: 10,
        fontSize: fontSizeDefault,
        marginHorizontal: 10,
    },
    text_input: {
        flex: 1,
    },
    waper_add: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: white,
        borderRadius: 10,
    },
    container: {
        flex: 10,
        backgroundColor: '#f4f4f4',
    },
    btn: {
        backgroundColor: buttonColor,
        height: 40,
        width: '100%',
        borderWidth: 0,
        borderRadius: 0,
        marginVertical: 1,
    },
    btnClose: {
        color: white,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: fontSizeDefault,
        marginHorizontal: 10,
    },
    titleTable: {
        fontSize: fontSizeDefault + 10,
        textAlign: 'center',
        padding: 10,
        backgroundColor: white,
    },
    modal_info: {
        flexDirection: 'column',
        margin: 10,
        flex: 0.15,
        backgroundColor: white,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, // Điều chỉnh vị trí bóng (đối với iOS)
        shadowOpacity: 0.5, // Điều chỉnh độ trong suốt của bóng (đối với iOS)
        shadowRadius: 5, // Điều chỉnh bán kính của bóng (đối với iOS)
        elevation: 3,
    },
    contact_row: {
        flex: 1,
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    text_default: {
        fontSize: fontSizeDefault,
        fontWeight: '700',
        marginRight: 10,
    },
});
