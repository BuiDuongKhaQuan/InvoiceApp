import { StyleSheet, View, ScrollView } from 'react-native';
import InvoiceItem from './InvoiceItem';
import React from 'react';

export default function InvoiceList({ data, isLike, navigation, scrollEnabled, isOnPress }) {
    const leftData = data.filter((item) => item.id % 2 !== 0);
    const rightData = data.filter((item) => item.id % 2 === 0);

    return (
        <ScrollView scrollEnabled={scrollEnabled} style={styles.container}>
            <View style={styles.list}>
                <View>
                    {leftData.map((item) => (
                        <InvoiceItem
                            isLike={isLike}
                            data={item}
                            key={item.id}
                            navigation={navigation}
                            onPress={() =>
                                isOnPress ? navigation.navigate('CreateInvoice', { data: item.id }) : () => {}
                            }
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
                            onPress={() =>
                                isOnPress ? navigation.navigate('CreateInvoice', { data: item.id }) : () => {}
                            }
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
    },
    list: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        marginTop: 15,
    },
});
