import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Register() {
    const handlePress = () => {
        alert('you');
    };

    return (
        <View style={styles.container}>
            <View style={styles.container_top}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                <Text style={styles.title}>Invoice C</Text>
            </View>
            <View style={styles.container_center}>
                <Input horder="G-mail" icon={require('../assets/icons/email.png')} />
                <Input horder="Tài khoản" icon={require('../assets/icons/user.png')} />
                <Input pass horder="Mật khẩu" icon={require('../assets/icons/lock.png')} />
                <Button onPress={handlePress} customStyles={{ width: 340, height: 50 }} text="Đăng ký" />
                <View style={styles.register}>
                    <Text style={styles.register_text}>Bạn đã có tài khoản? </Text>
                    <Text style={styles.register_btn}>Đăng nhập</Text>
                </View>
            </View>
            <View style={styles.container_botom}>
                <Text style={styles.forgot}>Quên mật khẩu?</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4E8E5',
    },
    container_top: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 70,
        color: '#B3B70A',
        textShadowColor: '#2AA50B',
        textShadowRadius: 5,
        textShadowOffset: { width: 2, height: 2 },
    },
    container_center: {
        flex: 4,
        alignItems: 'center',
    },
    register: {
        flexDirection: 'row',
    },
    register_text: {
        fontSize: 20,
    },
    register_btn: {
        fontSize: 20,
        fontWeight: '700',
        color: '#26B819',
    },
    container_botom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    forgot: {
        marginBottom: 20,
        fontSize: 20,
        color: '#26B819',
    },
});
