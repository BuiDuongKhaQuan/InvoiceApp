import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { white } from '../constant/color';
import React, { useState } from 'react';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { statusBarHeight } from '../constant/dimistion';

export default function Blog({ navigation }) {
    const { t } = useTranslation();

    const [invoices, setInvoices] = useState([
        {
            id: '1',
            title: 'Bản Cập Nhật v2.0 - Ứng Dụng INVOICE C',
            image: require('../assets/images/Blog/blog1.jpg'),
            content:
                'Chúng tôi vô cùng hạnh phúc thông báo về bản cập nhật mới nhất của ứng dụng INVOICE C Phiên bản v2.0 này mang đến nhiều cải tiến và tính năng mới để giúp bạn quản lý cửa hàng và tăng cường trải nghiệm của khách hàng.Cải Tiến Chính:Giao Diện Người Dùng Mới:Thiết kế giao diện hiện đại và trực quan hơn, tạo trải nghiệm sử dụng mượt mà hơn.Quản Lý Sản Phẩm:Thêm, sửa đổi và xóa sản phẩm dễ dàng hơn qua giao diện người dùng mới, giúp bạn nhanh chóng cập nhật danh mục hàng hóa.Tính Năng Thanh Toán Nhanh:Tích hợp tính năng thanh toán nhanh giúp tăng cường quy trình thanh toán và giảm thời gian chờ đợi của khách hàng. Thống Kê Doanh Thu:Bảng thống kê doanh thu và báo cáo chi tiết về doanh số bán hàng, giúp bạn theo dõi hiệu suất kinh doanh một cách chính xác.Tích Hợp Mạng Xã Hội:Chia sẻ thông tin sản phẩm và khuyến mãi trực tiếp từ ứng dụng đến các trang mạng xã hội, tăng tương tác với khách hàng.Tính Năng Mới:Chương Trình Khách Hàng Thân Thiết:Tích điểm mỗi khi mua sắm để nhận ưu đãi và quà tặng đặc biệt.Hỗ Trợ Trực Tuyến:Chat trực tuyến với đội ngũ hỗ trợ khách hàng để giải đáp mọi thắc mắc và hỗ trợ người dùng.Cập Nhật An Toàn.Chúng tôi luôn lắng nghe ý kiến của bạn và đã thực hiện những cải tiến bảo mật để bảo vệ thông tin của bạn một cách hiệu quả nhất.Hãy nâng cấp ứng dụng ngay hôm nay để trải nghiệm những tính năng mới và tốt nhất từ Ứng Dụng INVOICE C.Cảm ơn bạn đã sử dụng ứng dụng của chúng tôi.',
        },
    ]);

    return (
        <BackgroundImage>
            <Header navigation={navigation} />
            <View style={styles.container_center}>
                <ScrollView>
                    {invoices.map((item) => (
                        <View style={styles.content} key={item.id}>
                            <Text style={[styles.bottom_text, styles.boldText]}>{item.title}</Text>
                            <Image style={styles.bottom_image} source={item.image} />
                            <Text style={styles.bottom_text}>{item.content}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container_center: {
        marginTop: 100,
    },
    content: {
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: white,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        paddingTop: statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
});
