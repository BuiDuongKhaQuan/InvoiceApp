import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { white } from '../../../constant/color';
import Button from '..';

export default function PrintBtn({ children, html }) {
    const [selectedPrinter, setSelectedPrinter] = useState();
    const print = async () => {
        if (html !== null) {
            await Print.printAsync({
                html,
                printerUrl: selectedPrinter?.url,
            });
        } else {
            Alert.alert('Error!!', 'Please provide complete information');
        }
    };

    const printToFile = async () => {
        if (html !== null) {
            const { uri } = await Print.printToFileAsync({ html });
            console.log('File has been saved to:', uri);
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } else {
            Alert.alert('Error!!', 'Please provide complete information');
        }
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync();
        setSelectedPrinter(printer);
    };
    return (
        <View style={styles.wrapper}>
            <View style={styles.invoice}>
                <ScrollView style={styles.container}>{children}</ScrollView>
            </View>
            <View style={styles.container_bottom}>
                <Button customStylesBtn={styles.btn} text="Print" onPress={print} />
                <Button customStylesBtn={styles.btn} text="Save to PDF" onPress={printToFile} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
    },
    invoice: {
        flex: 10,
    },
    container: {
        flex: 1,
        backgroundColor: white,
        paddingHorizontal: 10,
    },
    container_bottom: {
        flex: 1,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        marginHorizontal: 10,
        height: '60%',
        width: '40%',
        borderRadius: 5,
        backgroundColor: '#32db64',
    },
});
