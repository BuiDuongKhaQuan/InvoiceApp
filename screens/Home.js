import { StyleSheet, View, Dimensions, Image } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import InvoiceList from '../components/InvoiceList';
import { white } from '../constant/color';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('screen');

export default function Home({ navigation }) {
    const [imageSliders, setImageSliders] = useState([
        require('../assets/images/Slider/1.jpg'),
        require('../assets/images/Slider/2.jpg'),
        require('../assets/images/Slider/3.jpg'),
        require('../assets/images/Slider/4.jpg'),
        require('../assets/images/Slider/5.jpg'),
        require('../assets/images/Slider/6.jpg'),
        require('../assets/images/Slider/7.jpg'),
    ]);
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
            <Header backgroundHide />
            <View style={styles.slider}>
                <Swiper style={styles.wrapper} showsButtons={true} autoplay={true} autoplayTimeout={3}>
                    {imageSliders.map((image, index) => (
                        <Image style={styles.imageSlider} source={image} key={index} />
                    ))}
                </Swiper>
            </View>
            <View style={styles.list}>
                <InvoiceList navigation={navigation} data={invoices} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    list: {
        flex: 3.5,
    },
    slider: {
        flex: 1.5,
        zIndex: 10,
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
