import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Button from '../components/Button';

export default function Welcome() {
    return (
        <View style={styles.container}>
            <View style={styles.container_top}>
                <Image style={styles.welcome} source={require('../assets/images/welcome.png')} />
                <Text style={styles.title}>Invoice C</Text>
                <Button text="Đăng nhập" customStylesBtn={{ width: 200 }} />
            </View>
            <View style={styles.container_botom}>
                <View style={styles.flower}>
                    <Image style={styles.flower_img} source={require('../assets/images/flower.png')} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E4E8E5',
    },
    container_top: {
        flex: 5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        marginTop: 90,
        marginRight: 10,
        width: 350,
        height: 200,
        resizeMode: 'stretch',
    },
    title: {
        color: '#55DF49',
        fontSize: 35,
        fontWeight: 'bold',
        marginVertical: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.3)', // Màu của bóng
        textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
        textShadowRadius: 5, // Bán kính của bóng
    },
    login_btn: {
        width: 150,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        backgroundColor: '#55DF49',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, // Điều chỉnh vị trí bóng (đối với iOS)
        shadowOpacity: 0.5, // Điều chỉnh độ trong suốt của bóng (đối với iOS)
        shadowRadius: 5, // Điều chỉnh bán kính của bóng (đối với iOS)
        elevation: 5,
    },
    login_text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    container_botom: {
        flex: 4,
    },
    flower: {
        position: 'absolute',
        bottom: 0,
    },
    flower_img: {
        width: 347,
        height: 300,
        marginLeft: 50,
        resizeMode: 'stretch',
    },
});
