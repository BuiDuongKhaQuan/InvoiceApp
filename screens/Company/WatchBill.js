import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/SettingItem/header';
import { useTranslation } from 'react-i18next';
import { buttonColor, defaultColor, white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';
import { useRoute } from '@react-navigation/native';
import { getNameCustomerByEmail, getProductById, getUserByEmail } from '../../Service/api';
import Loading from '../../components/Loading';
import Product from '../../components/Product';

export default function WatchBill() {
    const { t } = useTranslation();
    const route = useRoute();
    const invoice = route.params?.data;
    const [customer, setCustomer] = useState(null);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState(null);
    const emailUser = invoice.emailUser;
    const emailGuest = invoice.emailGuest;
    const [loading, setLoading] = useState(false);
    const listOrder = invoice.orders;
    const productIdList = listOrder.map((item) => item.productId);

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
    const getInfoProduct = async () => {
        try {
            const productPromises = productIdList.map(async (item) => {
                const product = await getProductById(item);

                // Tìm order tương ứng trong listOrder
                const order = listOrder.find((orderItem) => orderItem.productId === item);

                // Nếu tìm thấy order, cập nhật thuộc tính stock
                if (order) {
                    const updatedProduct = { ...product, stock: order.quantity };
                    return updatedProduct;
                }

                // Nếu không tìm thấy order, trả về product không thay đổi
                return product;
            });

            const products = await Promise.all(productPromises);
            setProducts(products);
            console.log(products);
        } catch (error) {
            console.error('Error fetching product information:', error);
        }
    };

    useEffect(() => {
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
                    {/* <View style={styles.qrcode}>
                        <ViewShot
                            style={{
                                width: 90,
                                height: 90,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: white,
                            }}
                            ref={viewShotRef}
                            options={{ format: 'jpg', quality: 1 }}
                        >
                            {IDBill && <QRCode value={IDBill} size={80} />}
                        </ViewShot>
                    </View> */}
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
});
