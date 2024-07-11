import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/SettingItem/header';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import ImageBackground from '../../layouts/DefaultLayout/BackgroundImage';
import { getUserByCompanyName1, getProductsByCompany, getInvoiceByCompany } from '../../Service/api';
import { useUserContext } from '../UserContext';
import Loading from '../../components/Loading';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

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
            title: t('common:revenue'),
            numberStatistic: 0 + ' VND',
            icon: <MaterialCommunityIcons name="calendar-month" size={24} color="black" />,
        },
    ]);
    const [chartData, setChartData] = useState({
        labels: [t('common:employee'), t('common:bill'), t('common:countProduct')],
        datasets: [
            {
                data: [0, 0, 0], // Initial values, you can update these after fetching data
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const userData = await getUserByCompanyName1(companyName);
                const billDataResponse = await getInvoiceByCompany(companyName, 10000, page);
                const productData = await getProductsByCompany(companyName, 10000, page);

                // Lấy độ dài của danh sách hóa đơn từ API response

                const totalBillData = billDataResponse.length;
                const totalProductData = productData.length;
                const billData = billDataResponse || [];
                const totalRevenue = billData.reduce((total, invoice) => total + (invoice.totalPrice || 0), 0);
                console.log(totalRevenue);
                const formattedRevenue = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(totalRevenue);
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
                    if (statistic.title === t('common:revenue')) {
                        return { ...statistic, numberStatistic: formattedRevenue };
                    }
                    return statistic;
                });

                setItem(updatedItem);
                const updatedChartData = {
                    labels: [t('common:employee'), t('common:bill'), t('common:countProduct')],
                    datasets: [
                        {
                            data: [userData.length, totalBillData, totalProductData],
                        },
                    ],
                };

                setChartData(updatedChartData);
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
            <Loading loading={loading} isFullScreen />
            <View style={styles.container_center}>
                <View>
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
                </View>

                <View style={{ paddingHorizontal: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LineChart
                        data={chartData}
                        width={Dimensions.get('window').width - 16}
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=""
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: '6',
                                strokeWidth: '2',
                                stroke: '#ffa726',
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container_center: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    flatListContent: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    itemContainer: {
        flex: 1,
        width: '48%', // Adjusted width to accommodate 2 columns with a small gap
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 8,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    list: {
        flex: 1,
    },
    items: {
        alignItems: 'center',
    },
});
