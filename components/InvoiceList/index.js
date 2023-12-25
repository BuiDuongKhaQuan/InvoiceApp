import { StyleSheet, FlatList, View, ScrollView } from 'react-native';
import InvoiceItem from './InvoiceItem';
import React, { useState } from 'react';

import { backgroundColor } from '../../constant/color';
import { useLike } from './LikeContext';

export default function InvoiceList({ data, isLike, navigation, scrollEnabled }) {
    const leftData = data.filter((item) => item.id % 2 !== 0);
    const rightData = data.filter((item) => item.id % 2 === 0);
    const { likeStates, handleLikeToggle } = useLike();
    return (
        <ScrollView scrollEnabled={scrollEnabled} style={styles.container}>
            <View style={styles.list}>
                <View>
                    {leftData.map((item) => (
                        <InvoiceItem
                            key={item.id}
                            data={item}
                            isLike={isLike}
                            navigation={navigation}
                            onPress={() => navigation.navigate('CreateInvoice', { data: item.id })}
                            showLike={likeStates[item.id]}
                            setShowLike={() => handleLikeToggle(item.id)}
                        />
                    ))}
                </View>
                <View>
                    {rightData.map((item) => (
                        <InvoiceItem
                            key={item.id}
                            data={item}
                            isLike={isLike}
                            navigation={navigation}
                            onPress={() => navigation.navigate('CreateInvoice', { data: item.id })}
                            showLike={likeStates[item.id]}
                            setShowLike={() => handleLikeToggle(item.id)}
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