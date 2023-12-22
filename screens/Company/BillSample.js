import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import InvoiceList from '../../components/InvoiceList';
import Header from '../../components/SettingItem/header';
import Input from '../../components/Input';
import { Ionicons, Feather } from '@expo/vector-icons';
export default function BillSample({ navigation }) {
    const [invoices, setInvoices] = useState([
        {
            id: '1',
            image: require('../../assets/images/Invoices/Bill_1.png'),
        },
        {
            id: '2',
            image: require('../../assets/images/Invoices/Bill_2.png'),
        },
        {
            id: '3',
            image: require('../../assets/images/Invoices/Bill_3.png'),
        },
        {
            id: '4',
            image: require('../../assets/images/Invoices/Bill_4.png'),
        },
        {
            id: '5',
            image: require('../../assets/images/Invoices/Bill_5.png'),
        },
        {
            id: '6',
            image: require('../../assets/images/Invoices/Bill_6.png'),
        },
        {
            id: '7',
            image: require('../../assets/images/Invoices/Bill_7.png'),
        },
        {
            id: '8',
            image: require('../../assets/images/Invoices/Bill_8.png'),
        },
        {
            id: '9',
            image: require('../../assets/images/Invoices/Bill_9.png'),
        },
        {
            id: '10',
            image: require('../../assets/images/Invoices/Bill_10.png'),
        },
        {
            id: '11',
            image: require('../../assets/images/Invoices/Bill_11.png'),
        },
    ]);
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Input
                    customStylesContainer={styles.input}
                    iconLeft={<Feather name="search" size={24} color="black" />}
                    iconRight={<Ionicons name="ios-qr-code-outline" size={24} color="black" />}
                    onPressIconRight={() => navigation.navigate('Scanner')}
                    customStylesIcon={styles.icon1}
                />
            </View>
            <View style={styles.list}>
                <InvoiceList data={invoices} />
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
});
