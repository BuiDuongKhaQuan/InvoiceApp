import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function InvoiceItem({ data, onPress }) {
    const handlePress = () => {
        alert(data.id);
    };
    const newStyleInvoice = { ...styles.invoice, ...(data.id == 2 ? { marginTop: 40 } : {}) };

    return (
        <TouchableOpacity style={newStyleInvoice} onPress={handlePress}>
            <Image style={styles.img} source={{ uri: data.image }} />
            <View style={styles.mode}>
                <Text style={styles.text}>...</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    invoice: {
        alignItems: 'flex-end',
        marginHorizontal: 6,
    },
    img: {
        width: 180,
        height: 260,
        resizeMode: 'stretch',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    mode: {
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 30,
    },
});
