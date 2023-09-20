import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/SettingItem/header';
import Button from '../components/Button';

export default function CreateInvoice() {
    return (
        <View style={styles.container}>
            <Header title="Name" iconRight={require('../assets/icons/menu.png')} />
            <View style={styles.top}>
                <View></View>
            </View>
            <View style={styles.bottom}>
                <Button customStylesBtn={styles.btn} text="Print" />
                <Button customStylesBtn={styles.btn} text="Save to PDF" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    top: {
        flex: 10,
        height: 500,
    },
    bottom: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        marginHorizontal: 10,
        height: '60%',
    },
});
