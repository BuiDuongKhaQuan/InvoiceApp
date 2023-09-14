import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Button from '../Button';
import { styles } from './styles';

export default function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.header_left}>
                <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
                <Text>Invoice</Text>
            </View>
            <Button customStylesText={styles.text} customStylesBtn={styles.btn} text="Nâng cấp" />
        </View>
    );
}