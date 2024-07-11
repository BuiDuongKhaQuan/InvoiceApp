import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function Product({ data, isList, onRemove, onAdd, isReview }) {
    const { t } = useTranslation();
    return (
        <ScrollView>
            {isList && (
                <View style={{ ...styles.container, borderBottomWidth: 1 }}>
                    <View style={styles.id}>
                        <Text>{t('common:no')}</Text>
                    </View>
                    <View style={styles.name}>
                        <Text>{t('common:name')}</Text>
                    </View>
                    <View style={styles.quantity}>
                        <Text>{t('common:remaining')}</Text>
                    </View>
                    <View style={styles.price}>
                        <Text>{t('common:price')}</Text>
                    </View>
                    {isReview || <View style={styles.delete}></View>}
                </View>
            )}

            {isList ? (
                data.map((item, index) => (
                    <View style={{ ...styles.container, borderBottomWidth: 1 }} key={index}>
                        <View style={styles.id}>
                            <Text>{item.id}</Text>
                        </View>
                        <View style={styles.name}>
                            <Text>{item.name}</Text>
                        </View>
                        <View style={styles.quantity}>
                            <Text>{item.stock}</Text>
                        </View>
                        <View style={styles.price}>
                            <Text>{item.price}</Text>
                        </View>
                        {isReview || (
                            <View style={styles.delete}>
                                <TouchableOpacity onPress={() => onAdd(item)}>
                                    <Entypo name="check" size={24} color="green" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))
            ) : (
                <View style={styles.container}>
                    <View style={styles.id}>
                        <Text>{data.stt}</Text>
                    </View>
                    <View style={{ ...styles.name, flex: 2.2 }}>
                        <Text>{data.name}</Text>
                    </View>
                    <View style={{ ...styles.quantity, flex: 0.5 }}>
                        <Text>{data.quantity}</Text>
                    </View>
                    <View style={{ ...styles.price, flex: 0.6 }}>
                        <Text>{data.totalPrice}</Text>
                    </View>
                    <View style={styles.delete}>
                        <TouchableOpacity onPress={onRemove}>
                            <AntDesign name="delete" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    id: {
        flex: 0.5,
    },
    name: {
        flex: 2,
    },
    quantity: {
        flex: 1,
    },
    price: {
        flex: 1.5,
        alignItems: 'flex-end',
    },
    delete: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
    },
});
