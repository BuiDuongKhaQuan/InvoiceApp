import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import InvoiceItem from '../components/InvoiceItem';

export default function InvoiceList() {
    const [invoices, setInvoices] = useState([
        {
            id: '1',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
        {
            id: '2',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
        {
            id: '3',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
        {
            id: '4',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
        {
            id: '5',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
    ]);

    return (
        <FlatList
            style={styles.container}
            data={invoices}
            numColumns={2}
            renderItem={({ item }) => <InvoiceItem data={item} key={item.id} />}
            keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E4E8E5',
        flex: 1,
        paddingLeft: 5,
    },
});
