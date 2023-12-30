import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/SettingItem/header';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import ImageBackground from '../../layouts/DefaultLayout/BackgroundImage';
import { getInvoiceByCompany1, getUserByCompanyName1 } from '../../Service/api';
import { useUserContext } from '../UserContext';
import Loading from '../../components/Loading';
export default function Statistical() {
    const { t } = useTranslation();
    const { state } = useUserContext();
    const { company } = state;
    const companyName = company.name;
    const [loadingHistory, setLoadingHistory] = useState(false);

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
            title: t('common:billWeek'),
            numberStatistic: 0,
            icon: <MaterialCommunityIcons name="calendar-month" size={24} color="black" />,
        },
        {
            id: 4,
            title: t('common:billMonth'),
            numberStatistic: 0,
            icon: <MaterialCommunityIcons name="calendar-month" size={24} color="black" />,
        },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserByCompanyName1(companyName);
                const billData = await getInvoiceByCompany1(companyName);
                const updatedItem = item.map((statistic) => {
                    setLoadingHistory(true);
                    if (statistic.title === t('common:employee')) {
                        return { ...statistic, numberStatistic: userData.length };
                    }
                    if (statistic.title === t('common:bill')) {
                        return { ...statistic, numberStatistic: billData.length };
                    }
                    // Handle other statistics if needed
                    return statistic;
                });
                setItem(updatedItem);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoadingHistory(false);
            }
        };

        fetchData();
    }, [companyName, t, item]);

    return (
        <ImageBackground>
            <Header title={t('common:statisticals')} />
            <View style={styles.container_center}>
                <Loading loading={loadingHistory}>
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
