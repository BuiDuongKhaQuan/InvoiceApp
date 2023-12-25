import { StyleSheet, View, Dimensions, Image, ScrollView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import InvoiceList from '../components/InvoiceList';
import Swiper from 'react-native-swiper';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import Input from '../components/Input';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { listInvoices } from '../constant/listInvoice';

const { width } = Dimensions.get('screen');
export default function Home({ navigation }) {
    const { t } = useTranslation();
    const [imageSliders, setImageSliders] = useState([
        require('../assets/images/Slider/1.jpg'),
        require('../assets/images/Slider/2.jpg'),
        require('../assets/images/Slider/3.jpg'),
        require('../assets/images/Slider/4.jpg'),
        require('../assets/images/Slider/5.jpg'),
        require('../assets/images/Slider/6.jpg'),
        require('../assets/images/Slider/7.jpg'),
    ]);
    const [inputColor, setInputColor] = useState('transparent');
    const handleScroll = (event) => {
        if (event.nativeEvent.contentOffset.y > 0) {
            setInputColor('white');
        } else {
            setInputColor('transparent');
        }
    };
    const [invoices, setInvoices] = useState(listInvoices);

    // const [newIDBill, setNewIDBill] = useState(''); // Sử dụng useState để lưu mã hóa đơn mới
    // useEffect(() => {
    //     const handerId = async () => {
    //         try {
    //             const response = await getAllInvoice();
    //             const currentDate = moment().format('DDMMYYYY');
    //             let newIDBill;
    //             if (response.length > 0) {
    //                 // Tìm mã hóa đơn lớn nhất trong danh sách
    //                 const maxBill = response[response.length - 1];
    //                 if (!isNaN(maxBill.maHoaDon)) {
    //                     // Nếu là số hợp lệ, tạo mã hóa đơn mới bằng cách tăng nó lên 1
    //                     newIDBill = (parseInt(maxBill.id) + 1).toString();
    //                 }
    //                 // Tạo mã hóa đơn mới bằng cách tăng mã hóa đơn lớn nhất thêm 1
    //                 newIDBill = (parseInt(maxBill.id) + 1).toString();
    //             }

    //             setNewIDBill(`${currentDate}_${newIDBill}`);
    //         } catch (error) {
    //             console.error('Lỗi khi lấy danh sách hóa đơn:', error);
    //         }
    //     };

    //     // Gọi hàm để tính toán và lưu mã hóa đơn mới vào state
    //     handerId();
    // }, []);

    return (
        <>
            <View style={{ ...styles.input, backgroundColor: inputColor }}>
                <Input
                    customStylesContainer={styles.input_item}
                    customStylesInput={styles.input_text}
                    holder={t('common:searchForInvoice')}
                    iconLeft={<Feather name="search" size={24} color="black" />}
                    iconRight={<Ionicons name="ios-qr-code-outline" size={24} color="black" />}
                    onPressIconRight={() => navigation.navigate('Scanner')}
                />
            </View>
            <ScrollView style={styles.container} onScroll={handleScroll}>
                <BackgroundImage>
                    <View style={styles.slider}>
                        <Swiper style={styles.wrapper} autoplay={true} autoplayTimeout={4}>
                            {imageSliders.map((image, index) => (
                                <Image style={styles.imageSlider} source={image} key={index} />
                            ))}
                        </Swiper>
                    </View>
                    {/* <Text>{newIDBill}</Text>
                    <View>{newIDBill && <QRCode value={newIDBill} size={200} />}</View> */}
                    <View style={styles.list}>
                        <InvoiceList navigation={navigation} data={invoices} scrollEnabled={false} isOnPress />
                    </View>
                </BackgroundImage>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 3.5,
    },
    input: {
        width: '100%',
        position: 'absolute',
        paddingTop: StatusBar.currentHeight - 8 || 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    input_item: {
        marginVertical: 0,
        borderRadius: 4,
        width: '95%',
        height: '60%',
        justifyContent: 'center',
        elevation: 0,
        borderColor: 'black',
        borderWidth: 1,
    },
    input_text: {
        paddingVertical: 0,
        height: '60%',
    },
    slider: {
        flex: 1.1,
        zIndex: 10,
        height: 200,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    imageSlider: {
        width: width,
        height: '100%',
        resizeMode: 'stretch',
    },
});
