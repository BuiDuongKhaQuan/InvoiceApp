import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/SettingItem/header';
import Input from '../../components/Input';
import { getInvoiceByCompany, getInvoiceByKey } from '../../Service/api';
import { useUserContext } from '../UserContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading';
import { white } from '../../constant/color';
import ImageBackground from '../../layouts/DefaultLayout/BackgroundImage';

export default function Bills() {
    const { t } = useTranslation();
    const { state } = useUserContext();
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [keySearch, setKeySearch] = useState('');

    const getInvoice = async (page) => {
        try {
            setLoading(true);
            const response = await getInvoiceByCompany(state.company.name, 20, page);
            setInvoices((prevInvoices) => [...prevInvoices, ...response]);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getInvoice(page);
    }, [page]);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20; // Đặt một giá trị padding để xác định khi nào là cuối trang

        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            // Nếu đã cuộn đến cuối, tăng số trang lên 1 để fetch dữ liệu trang tiếp theo
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await getInvoiceByKey(keySearch);
            navigation.navigate(`WatchBill`, { data: response });
        } catch (error) {
            Alert.alert(t('common:error'), error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground style={styles.container}>
            <Header title={t('common:bill')} />
            <View style={styles.container_input}>
                <Input
                    value={keySearch}
                    onChangeText={(name) => setKeySearch(name)}
                    onSubmitEditing={handleSearch}
                    customStylesContainer={styles.input}
                    holder={t('common:titileSearch')}
                    iconLeft={<Feather name="search" size={24} color="black" />}
                    iconRight={<Ionicons name="ios-qr-code-outline" size={24} color="black" />}
                    onPressIconRight={() => navigation.navigate('Scanner')}
                />
            </View>
            <ScrollView style={styles.list} onScroll={handleScroll} scrollEventThrottle={16}>
                <View style={styles.table}>
                    <View style={styles.table_colum}>
                        <Text style={{ ...styles.text_bold, ...styles.colum_id }}>{t('common:item')}</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_no }}>{t('common:no')}</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_p }}>{t('common:cus')}</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_name }}>{t('common:totalBill')}</Text>
                    </View>
                    {invoices.map((invoice, index) => (
                        <TouchableOpacity
                            style={styles.table_colum}
                            key={index}
                            onPress={() => navigation.navigate(`WatchBill`, { data: invoice })}
                        >
                            <Text style={{ ...styles.text_line, ...styles.colum_id }}>{index + 1}</Text>
                            <Text style={{ ...styles.text_line, ...styles.colum_no }}>{invoice.key}</Text>
                            <Text style={{ ...styles.text_line, ...styles.colum_p }}>{invoice.emailGuest}</Text>
                            <Text style={{ ...styles.text_line, ...styles.colum_name }}>{invoice.totalPrice}</Text>
                        </TouchableOpacity>
                    ))}
                    <Loading loading={loading} isFooter></Loading>
                </View>
            </ScrollView>
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
        marginHorizontal: 10,
    },
    input: {
        height: 50,
        borderWidth: 2,
        borderColor: white,
        backgroundColor: '#C9C9C9',
    },
    table: {
        flexDirection: 'column',
    },
    table_colum: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'black',
    },
    colum_id: {
        flex: 0.7,
        marginLeft: 0,
    },
    colum_p: {
        flex: 3,
        textAlign: 'left',
        marginLeft: 0,
        marginRight: 5,
    },
    colum_no: {
        flex: 1.2,
        marginLeft: 0,
        marginRight: 5,
    },
    colum_name: {
        flex: 1,
        marginLeft: 0,
    },
});
