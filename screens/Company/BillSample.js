import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import InvoiceList from '../../components/InvoiceList';
import Header from '../../components/SettingItem/header';
import Input from '../../components/Input';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { listInvoices } from '../../constant/listInvoice';

export default function BillSample({ navigation }) {
    const { t } = useTranslation();

    const [invoices, setInvoices] = useState(listInvoices);
    return (
        <View style={styles.container}>
            <Header title={t('common:billSample')} />
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
        height: 50,
        marginTop: StatusBar.currentHeight || 20,
        borderRadius: 0,
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
    },
});
