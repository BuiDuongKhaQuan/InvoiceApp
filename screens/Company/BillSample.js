import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import InvoiceList from '../../components/InvoiceList';
import Header from '../../components/SettingItem/header';
import Input from '../../components/Input';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { listInvoices } from '../../constant/listInvoice';
import { white } from '../../constant/color';
import ImageBackground from '../../layouts/DefaultLayout/BackgroundImage';
import { useNavigation } from '@react-navigation/native';

export default function BillSample() {
    const { t } = useTranslation();
    const [invoices, setInvoices] = useState(listInvoices);
    const navigation = useNavigation();
    return (
        <ImageBackground>
            <Header title={t('common:billSample')} />
            <View style={styles.container_input}>
                <Input
                    iconLeft={<Feather name="search" size={24} color="black" />}
                    customStylesContainer={styles.input}
                    holder={'Tìm kím mẫu hóa đơn'}
                    onPressIconRight={() => navigation.navigate('Scanner')}
                    iconRight={<Ionicons name="ios-qr-code-outline" size={24} color="black" />}
                    customStylesIcon={styles.icon1}
                />
            </View>
            <View style={styles.list}>
                <InvoiceList data={invoices} navigation={navigation} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
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
    icon1: {
        marginHorizontal: 0,
    },
});
