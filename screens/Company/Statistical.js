import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/SettingItem/header';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import ImageBackground from '../../layouts/DefaultLayout/BackgroundImage';
import { getUserByCompanyName1, getProductsByCompany, getInvoiceByCompany } from '../../Service/api';
import { useUserContext } from '../UserContext';
import Loading from '../../components/Loading';
export default function Statistical() {
    const { t } = useTranslation();
    const { state } = useUserContext();
    const { company } = state;
    const companyName = company.name;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [item, setItem] = useState([
        {
            id: 1,
            title: t('common:employee'),
            numberStatistic: 0,
            icon: <MaterialCommunityIcons name="account-group" size={24} color="black" />,
        },
        {
            id: 2,
            title: t('common:bill'),
            numberStatistic: 0,
            icon: <FontAwesome5 name="file-invoice" size={24} color="black" />,
        },
        {
            id: 3,
            title: t('common:countProduct'),
            numberStatistic: 0,
            icon: <MaterialCommunityIcons name="calendar-month" size={24} color="black" />,
        },
        {
            id: 4,
            title: t('common:countSampleInvoice'),
            numberStatistic: 11,
            icon: <MaterialCommunityIcons name="calendar-month" size={24} color="black" />,
        },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const userData = await getUserByCompanyName1(companyName);
                const billDataResponse = await getInvoiceByCompany(companyName, 10000, page);
                const productData = await getProductsByCompany(companyName, 10000, page);

                // Lấy độ dài của danh sách hóa đơn từ API response
                const billData = billDataResponse.invoices;
                const totalBillData = billDataResponse.length;
                const totalProductData = productData.length;
                console.log(totalBillData);

                const updatedItem = item.map((statistic) => {
                    if (statistic.title === t('common:employee')) {
                        return { ...statistic, numberStatistic: userData.length };
                    }
                    if (statistic.title === t('common:bill')) {
                        return { ...statistic, numberStatistic: totalBillData };
                    }
                    if (statistic.title === t('common:countProduct')) {
                        return { ...statistic, numberStatistic: totalProductData };
                    }

                    return statistic;
                });

                setItem(updatedItem);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [companyName, t]);

    return (
        <ImageBackground>
            <Header title={t('common:statisticals')} />
            <View style={styles.container_center}>
                <Loading loading={loading}>
                    <FlatList
                        data={item}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <View style={styles.items}>
                                    {item.icon}
                                    <Text>{item.numberStatistic}</Text>
                                    <Text>{item.title}</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.flatListContent}
                    />
                </Loading>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container_center: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    flatListContent: {
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    flatListContent: {
        paddingHorizontal: 16,
    },
    itemContainer: {
        flex: 1,
        width: '40%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 8,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },

    items: {
        alignItems: 'center',
    },
});
