import { Image, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import { white } from '../constant/color';
import React, { useState } from 'react';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

export default function Blog({ navigation }) {
    const { t } = useTranslation();

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
    ]);

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.container_center}>
                <ScrollView>
                    <View style={styles.contents}>
                        {invoices.map((item) => (
                            <View style={styles.content} key={item.id}>
                                <Text style={[styles.bottom_text, styles.boldText]}>11/12/2023</Text>
                                <Image
                                    style={styles.bottom_image}
                                    source={{
                                        uri: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
                                    }}
                                />
                                <Text style={styles.bottom_text}>
                                    {t(
                                        'common:VnExpress tin tức mới nhất - Thông tin nhanh & chính xác được cập nhật hàng giờ. Đọc báo tin tức online Việt Nam & Thế giới nóng nhất trong ngày về thể thao ...',
                                    )}
                                </Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    container_center: {
        marginTop: 100,
    },
    contents: {
        marginHorizontal: 20,
    },
    content: {
        marginVertical: 20,
        backgroundColor: white,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
    },
    bottom_text: {},
    boldText: {
        fontWeight: 'bold', // In đậm với fontWeight là 'bold'
        fontSize: 20,
    },

    bottom_image: {
        width: 200, // chỉ định chiều rộng
        height: 200, // chỉ định chiều cao
        resizeMode: 'cover', // hoặc 'contain' tùy thuộc vào yêu cầu thiết kế của bạn
        marginVertical: 10,
    },
    input: {
        width: '100%',
        position: 'absolute',
        paddingTop: StatusBar.currentHeight - 0.1 || 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
});
