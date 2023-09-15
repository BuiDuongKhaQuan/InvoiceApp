import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import InvoiceItem from '../components/InvoiceItem';

export default function Home() {
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
        <View style={styles.container}>
            <Header title="Hỗ trợ" />
            <FlatList
                style={styles.container}
                data={invoices}
                numColumns={2}
                renderItem={({ item }) => <InvoiceItem data={item} key={item.id} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({});
