import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import InvoiceList from '../../components/InvoiceList';
import Header from '../../components/SettingItem/header';
import Input from '../../components/Input';
import { getInvoiceByCompany, getInvoiceByKey } from '../../Service/api';
import { useUserContext } from '../UserContext';
import Invoice from '../../layouts/Invoice/Invoice0123';
import { Feather, Ionicons } from '@expo/vector-icons';
import Invoice2 from '../../layouts/Invoice/Invoice2';
import Invoice10 from '../../layouts/Invoice/Invoice10';

export default function Bills({ navigation }) {
    const { state } = useUserContext();
    const [invoices, setIncoices] = useState([]);
    const [invoiceKey, setInvoiceKey] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getInvoi = async () => {
            try {
                const response = await getInvoiceByCompany(state.company.name);
                // console.log(state.company.name);
                setIncoices(response);
                const response1 = await getInvoiceByKey(key);
                setInvoiceKey(response1);

                // console.log(response);
            } catch (error) {
                setError(error);
            }
        };

        getInvoi();
        // getInvoiceByKey();
    });

    return (
        <View style={styles.container}>
            <Header title={'Hóa đơn'} />
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
                        <Text style={{ ...styles.text_bold, ...styles.colum_name }}>STT</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_name }}>ID</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_p }}>KH</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_name }}>T.T</Text>
                    </View>
                    {invoices.map((invoice, index) => (
                        <TouchableOpacity
                            style={styles.table_colum}
                            key={invoice.id}
                            onPress={() =>
                                navigation.navigate(`Invoice${invoice.key}`, { invoice: invoice }, { data: state.user })
                            }
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
