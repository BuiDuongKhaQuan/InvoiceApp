import { StyleSheet, View, Dimensions, Image, Text, ScrollView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import InvoiceList from '../components/InvoiceList';
import Swiper from 'react-native-swiper';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { useUserContext } from './UserContext'; // Đảm bảo thay đổi đường dẫn đúng
import Input from '../components/Input';
import { Feather, Ionicons } from '@expo/vector-icons';
import { white } from '../constant/color';
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
    const { state, dispatch } = useUserContext();
    const [inputColor, setInputColor] = useState('transparent');
    const handleScroll = (event) => {
        if (event.nativeEvent.contentOffset.y > 0) {
            setInputColor('white');
        } else {
            setInputColor('transparent');
        }
    };

    const [invoices, setInvoices] = useState([
        {
            id: '1',
            image: require('../assets/images/Invoices/Bill_1.png'),
        },
        {
            id: '2',
            image: require('../assets/images/Invoices/Bill_2.png'),
        },
        {
            id: '3',
            image: require('../assets/images/Invoices/Bill_3.png'),
        },
        {
            id: '4',
            image: require('../assets/images/Invoices/Bill_4.png'),
        },
        {
            id: '5',
            image: require('../assets/images/Invoices/Bill_5.png'),
        },
        {
            id: '6',
            image: require('../assets/images/Invoices/Bill_6.png'),
        },
        {
            id: '7',
            image: require('../assets/images/Invoices/Bill_7.png'),
        },
        {
            id: '8',
            image: require('../assets/images/Invoices/Bill_8.png'),
        },
        {
            id: '9',
            image: require('../assets/images/Invoices/Bill_9.png'),
        },
        {
            id: '10',
            image: require('../assets/images/Invoices/Bill_10.png'),
        },
        {
            id: '11',
            image: require('../assets/images/Invoices/Bill_11.png'),
        },
    ]);

    return (
        <>
            <View style={{ ...styles.input, backgroundColor: inputColor }}>
                <Input
                    customStylesContainer={styles.input_item}
                    customStylesInput={styles.input_text}
                    holder="Search for invoice templates"
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
                    <View style={styles.list}>
                        <InvoiceList navigation={navigation} data={invoices} scrollEnabled={false} />
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
