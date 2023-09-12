import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('screen');

export default function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.header_left}>
                <Image source={require('../../assets/images/logo.png')} />
                <Text>Invoice</Text>
            </View>
            <TouchableOpacity>
                <Image style={styles.avatar} source={require('../../assets/images/avatar.png')} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 33,
        height: 67,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#707070',
        borderBottomWidth: 1,
    },
    header_left: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 5,
    },
    avatar: {
        borderRadius: 50,
        width: 50,
        height: 50,
        marginEnd: 10,
    },
});
