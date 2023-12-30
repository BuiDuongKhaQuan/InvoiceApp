import { ScrollView, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/SettingItem/header';
import { useTranslation } from 'react-i18next';
import { buttonColor, defaultColor, white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';
import { useRoute } from '@react-navigation/native';
import { getNameCustomerByEmail, getProductById, getUserByEmail } from '../../Service/api';
import Loading from '../../components/Loading';
import Product from '../../components/Product';
import * as Print from 'expo-print';
import Button from '../../components/Button';
import { useUserContext } from '../UserContext';
import { layoutInvoice } from '../../layouts/InvoiceLayout';

export default function WatchBill() {
    const { t } = useTranslation();
    const { state } = useUserContext();
    const { company } = state;
    const route = useRoute();
    const invoice = route.params?.data;
    const [customer, setCustomer] = useState(null);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const emailUser = invoice.emailUser;
    const emailGuest = invoice.emailGuest;
    const listOrder = invoice.orders;
    const productIdList = listOrder.map((item) => item.productId);
    const idTemplate = invoice.key.split('-')[1];

    const getInfoCustomer = async () => {
        try {
            setLoading(true);
            const userData = await getUserByEmail(emailUser);
            setUser(userData);
            const customerData = await getNameCustomerByEmail(emailGuest);
            setCustomer(customerData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const [selectedPrinter, setSelectedPrinter] = useState();
    const print = async (html) => {
        if (html !== null) {
            await Print.printAsync({
                html,
                printerUrl: selectedPrinter?.url,
            });
        } else {
            Alert.alert('Error!!', 'Please provide complete information');
        }
    };
    const printToFile = async (html) => {
        if (html !== null) {
            const { uri } = await Print.printToFileAsync({ html });
            console.log('File has been saved to:', uri);
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } else {
            Alert.alert('Error!!', 'Please provide complete information');
        }
    };
    const getInfoProduct = async () => {
        try {
            const productPromises = productIdList.map(async (item) => {
                const product = await getProductById(item);
                const order = listOrder.find((orderItem) => orderItem.productId === item);
                if (order) {
                    const updatedProduct = { ...product, stock: order.quantity };
                    return updatedProduct;
                }
                return product;
            });
            const products = await Promise.all(productPromises);
            setProducts(products);
        } catch (error) {
            console.error('Error fetching product information:', error);
        }
    };

    useEffect(() => {
        console.log(idTemplate);
        getInfoCustomer();
        getInfoProduct();
    }, []);

    return (
        <View style={styles.wrapper}>
            <Loading loading={loading} isFullScreen />
            <View style={styles.container}>
                <Header title={t('common:bill')} />
                <ScrollView>
                    <View style={styles.invoicedate}>
                        <Text style={styles.code}>
                            {t('common:no')}: {invoice.key}
                        </Text>
                        <Text style={styles.code}>
                            {t('common:date')}: {invoice.createdAt}
                        </Text>
                    </View>
                    <View style={[styles.contact_title, styles.contact_content]}>
                        <Text style={[styles.text_default, styles.title]}> {t('common:creator')}:</Text>
                    </View>
                    <View style={styles.contact_content}>
                        <View style={styles.contact_row}>
                            <Text style={styles.text_default}>{t('common:name')}:</Text>
                            <Text style={styles.text_change}>{user ? user.name : ''}</Text>
                        </View>
                        <View style={styles.contact_row}>
                            <Text style={styles.text_default}>{t('common:email')}:</Text>
                            <Text style={styles.text_change}>{user ? user.email : ''}</Text>
                        </View>
                        <View style={styles.contact_row}>
                            <Text style={styles.text_default}>{t('common:phone')}:</Text>
                            <Text style={styles.text_change}>{user ? String(user.phone) : ''}</Text>
                        </View>
                    </View>
                    <View style={[styles.contact_title, styles.contact_content]}>
                        <Text style={[styles.text_default, styles.title]}> {t('common:customer')}:</Text>
                    </View>
                    <View style={styles.contact_content}>
                        <View style={styles.contact_row}>
                            <Text style={styles.text_default}>{t('common:name')}:</Text>
                            <Text style={styles.text_change}>{customer ? customer[0].name : ''}</Text>
                        </View>
                        <View style={styles.contact_row}>
                            <Text style={styles.text_default}>{t('common:email')}:</Text>
                            <Text style={styles.text_change}>{customer ? customer[0].email : ''}</Text>
                        </View>
                        <View style={styles.contact_row}>
                            <Text style={styles.text_default}>{t('common:phone')}:</Text>
                            <Text style={styles.text_change}>{customer ? customer[0].phone : ''}</Text>
                        </View>
                    </View>
                    <View style={[styles.contact_title, styles.contact_content]}>
                        <Text style={[styles.text_default, styles.title]}> {t('common:listProducts')}:</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>{products && <Product data={products} isList isReview />}</View>
                    <View style={styles.contact_number}>
                        <Text style={[styles.text_default, styles.title]}>{t('common:tax')}:</Text>
                        <Text style={styles.text_change}>{invoice.tax}%</Text>
                    </View>
                    <View style={styles.contact_number}>
                        <Text style={[styles.text_default, styles.title]}>{t('common:total')}:</Text>
                        <Text style={styles.text_change}>{invoice.totalPrice}đ</Text>
                    </View>
                    <View style={styles.contact_number}>
                        <Text style={[styles.text_default, styles.title]}>{t('common:inWords')}:</Text>
                        <Text style={styles.text_change}>{invoice.note}</Text>
                    </View>
                    <View style={styles.contact_number}>
                        <Image style={styles.qr} source={{ uri: invoice.image }} />
                    </View>
                    <Button
                        text={t('common:print')}
                        customStylesBtn={styles.btn_1}
                        onPress={() => print(layoutInvoice(t, idTemplate, invoice, products, company, customer[0]))}
                    />
                    <Button
                        customStylesBtn={styles.btn_1}
                        text={t('common:pdf')}
                        onPress={() =>
                            printToFile(layoutInvoice(t, idTemplate, invoice, products, company, customer[0]))
                        }
                    />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        flex: 10,
        backgroundColor: '#f4f4f4',
    },
    invoicedate: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: defaultColor,
        height: 50,
    },
    code: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    contact_content: {
        width: '100%',
        padding: 5,
        backgroundColor: '#f4f4f4',
        flexDirection: 'column',
    },
    contact_title: {
        marginBottom: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    contact_row: {
        flex: 1,
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    text_default: {
        fontSize: fontSizeDefault - 3,
        fontWeight: '700',
    },
    text_change: {
        flex: 10,
        fontSize: fontSizeDefault - 3,
        marginHorizontal: 10,
    },
    title: {
        fontSize: fontSizeDefault,
        marginHorizontal: 5,
    },
    contact_number: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qr: {
        width: 80,
        height: 80,
    },
    btn_1: {
        width: '100%',
        marginVertical: 2,
        borderRadius: 0,
        backgroundColor: buttonColor,
    },
});
