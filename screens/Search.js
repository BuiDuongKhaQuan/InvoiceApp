import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { backgroundColor, white } from '../constant/color';

export default function Search({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Input
                    customStylesContainer={styles.input}
                    holder="Tìm theo mã hóa đơn, tên khách hàng"
                    iconLeft={require('../assets/icons/search.png')}
                />
                <Button
                    style={styles.icon}
                    iconRight={require('../assets/icons/qr-code.png')}
                    onPress={() => navigation.navigate('Scanner')}
                />
            </View>

            <View style={styles.container_top}>
                <View style={styles.result}>
                    <Button
                        customStylesBtn={styles.result_item}
                        customStylesText={styles.result_itemText}
                        customStylesIcon={styles.result_itemIcon}
                        text="Hóa đơn bán hàng"
                        iconRight={require('../assets/icons/close.png')}
                    />
                    <Button
                        customStylesBtn={styles.result_item}
                        customStylesText={styles.result_itemText}
                        customStylesIcon={styles.result_itemIcon}
                        text="Hóa đơn bán hàng"
                        iconRight={require('../assets/icons/close.png')}
                    />
                    <Button
                        customStylesBtn={styles.result_item}
                        customStylesText={styles.result_itemText}
                        customStylesIcon={styles.result_itemIcon}
                        text="Hóa đơn bán hàng"
                        iconRight={require('../assets/icons/close.png')}
                    />
                </View>
            </View>
            <View style={styles.container_bottom}>
                <Text style={styles.title}>Có thể bạn quan tâm</Text>
                <View style={styles.care}>
                    <Button
                        customStylesText={styles.result_itemText}
                        customStylesBtn={styles.result_item}
                        text="Mẫu mới sắp ra mắt"
                    />
                    <Button
                        customStylesText={styles.result_itemText}
                        customStylesBtn={styles.result_item}
                        text="Thương hiệu nổi tiếng"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_top: {
        width: '100%',
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
    },
    input: {
        flex: 6,
        width: '100%',
        marginTop: StatusBar.currentHeight || 20,
        borderRadius: 0,
        marginHorizontal: 0,
        marginVertical: 0,
        elevation: 0,
        // backgroundColor: 'red',
    },
    result: {
        flex: 1,
        flexDirection: 'column',
    },
    result_item: {
        width: '100%',
        borderRadius: 0,
        marginVertical: 0,
        elevation: 0,
        borderWidth: 0,
        backgroundColor: white,
        justifyContent: 'space-between',
    },
    result_itemText: {
        fontWeight: '100',
        fontSize: 20,
        color: 'black',
        marginHorizontal: 10,
    },
    result_itemIcon: {
        width: 15,
        height: 15,
    },
    container_bottom: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    care: {
        flexDirection: 'column',
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
    },
});
