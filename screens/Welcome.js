import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { useTranslation } from 'react-i18next';

export default function Welcome({ navigation }) {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={styles.container_top}>
                    <Image style={styles.welcome} source={require('../assets/images/welcome.png')} />
                    <Text style={styles.title}></Text>
                    <Button
                        text={t('common:start')}
                        customStylesBtn={{ width: 200 }}
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
                <View style={styles.container_botom}>
                    <View style={styles.flower}>
                        <Image style={styles.flower_img} source={require('../assets/images/flower.png')} />
                    </View>
                </View>
            </BackgroundImage>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
        color: '#B3B70A',
        fontSize: 45,
        fontWeight: 'bold',
        marginVertical: 20,
        textShadowColor: '#2AA50B',
        textShadowRadius: 1,
        textShadowOffset: { width: 2, height: 2 },
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
