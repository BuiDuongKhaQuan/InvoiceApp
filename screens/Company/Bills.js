import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/SettingItem/header';
import Input from '../../components/Input';
import { getInvoiceByCompany, getInvoiceByKey } from '../../Service/api';
import { useUserContext } from '../UserContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading';

export default function Bills() {
    const { t } = useTranslation();
    const { state } = useUserContext();
    const [invoices, setIncoices] = useState([]);
    const [invoiceKey, setInvoiceKey] = useState();
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const getLayout = (key) => key.match(/^(\d+)-/)[1];
    useEffect(() => {
        const getInvoice = async () => {
            try {
                setLoading(true);
                const response = await getInvoiceByCompany(state.company.name);
                setIncoices(response);
                const response1 = await getInvoiceByKey(key);
                setInvoiceKey(response1);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getInvoice();
    }, []);

    return (
        <View style={styles.container}>
            <Header title={t('common:bill')} />
            <Loading loading={loading} />
            <View style={{ flexDirection: 'row' }}>
                <Input
                    customStylesContainer={styles.input}
                    holder="Tìm theo mã hóa đơn, tên khách hàng"
                    iconLeft={<Feather name="search" size={24} color="black" />}
                    iconRight={<Ionicons name="ios-qr-code-outline" size={24} color="black" />}
                    onPressIconRight={() => navigation.navigate('Scanner')}
                />
            </View>
            <View style={styles.list}>
                <View style={styles.table}>
                    <View style={styles.table_colum}>
                        <Text style={{ ...styles.text_bold, ...styles.colum_name }}>{t('common:item')}</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_name }}>{t('common:no')}</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_p }}>{t('common:cus')}</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_name }}>{t('common:totalBill')}</Text>
                    </View>
                    {invoices.map((invoice, index) => (
                        <TouchableOpacity
                            style={styles.table_colum}
                            key={invoice.id}
                            onPress={() => navigation.navigate(`Invoice${getLayout(invoice.key)}`, { data: invoice })}
                        >
                            <Text style={{ ...styles.text_line, ...styles.colum_name }}>{index + 1}</Text>
                            <Text style={{ ...styles.text_line, ...styles.colum_name }}>{invoice.id}</Text>
                            <Text style={{ ...styles.text_line, ...styles.colum_p }}>{invoice.emailGuest}</Text>
                            <Text style={{ ...styles.text_line, ...styles.colum_name }}>{invoice.totalPrice}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    list: {
        flex: 1,
    },
    input: {
        flex: 6,
        width: '100%',
        marginTop: StatusBar.currentHeight || 20,
        borderRadius: 0,
        marginHorizontal: 0,
        marginVertical: 0,
        borderRadius: 50,
        elevation: 0,
        borderColor: 'gray',
        borderWidth: 1,
    },
    icon1: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    input: {
        flex: 6,
        // width: '100%',
        height: 50,
        marginTop: StatusBar.currentHeight || 20,
        borderRadius: 0,
        // marginHorizontal: 30,\
        marginVertical: 30,
        borderRadius: 50,
        elevation: 0,
        borderColor: 'gray',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon1: {
        marginHorizontal: 0,
        // backgroundColor
    },
    table: {
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
});
