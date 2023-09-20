import { StyleSheet, FlatList, View, ScrollView } from 'react-native';
import InvoiceItem from './InvoiceItem';
import React from 'react';

import { backgroundColor } from '../../constant/color';

export default function InvoiceList({ data, isLike, navigation }) {
    const leftData = data.filter((item) => item.id % 2 !== 0);
    const rightData = data.filter((item) => item.id % 2 === 0);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.list}>
                <View>
                    {leftData.map((item) => (
                        <InvoiceItem
                            isLike={isLike}
                            data={item}
                            key={item.id}
                            navigation={navigation}
                            onPress={() => navigation.navigate('CreateInvoice')}
                        />
                    ))}
                </View>
                <View>
                    {rightData.map((item) => (
                        <InvoiceItem
                            navigation={navigation}
                            isLike={isLike}
                            data={item}
                            key={item.id}
                            onPress={() => navigation.navigate('CreateInvoice')}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: backgroundColor,
        flex: 1,
        paddingLeft: 5,
    },
    list: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        marginTop: 20,
    },
});
