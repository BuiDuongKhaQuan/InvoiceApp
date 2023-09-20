import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/SettingItem/header';
import { MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';

export default function Statistical() {
    const [item, setItem] = useState([
        {
            id: 1,
            title: 'Nhân viên',
            numberStatistic: 50,
            icon: <MaterialCommunityIcons name="account-group" size={24} color="black" />,
        },
        {
            id: 2,
            title: 'Hóa đơn',
            numberStatistic: 50,
            icon: <FontAwesome5 name="file-invoice" size={24} color="black" />,
        },
        {
            id: 3,
            title: 'Hóa đơn tuần',
            numberStatistic: 50,
            icon: <MaterialCommunityIcons name="calendar-month" size={24} color="black" />,
        },
        {
            id: 4,
            title: 'Hóa đơn tháng',
            numberStatistic: 50,
            icon: <MaterialCommunityIcons name="calendar-month" size={24} color="black" />,
        },
    ]);

    return (
        <View style={styles.container}>
            <Header title={'Thông kê'} />
            <View style={styles.container_center}>
                <FlatList
                    data={item}
                    numColumns={2} // Use a number instead of a string
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <View style={styles.items}>
                                {item.icon}
                                <Text>{item.numberStatistic}</Text>
                                <Text>{item.title}</Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_center: {
        flex: 1,
        width: '100%',
        backgroundColor: '#CCC',
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
