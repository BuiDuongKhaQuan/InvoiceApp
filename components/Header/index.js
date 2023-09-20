import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Button from '../Button';
import { styles } from './styles';

export default function Header({ showButton, backgroundHide }) {
    const newStyle = backgroundHide
        ? { ...styles.header, backgroundColor: 'transparent', borderBottomWidth: 0 }
        : styles.header;

    return (
        <View style={newStyle}>
            <View style={styles.header_left}>
                <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
                <Text style={styles.title}>Invoice</Text>
            </View>
            {showButton && (
                <Button
                    iconRight={require('../../assets/icons/menu.png')}
                    customStylesText={styles.text}
                    customStylesBtn={styles.btn}
                />
            )}
        </View>
    );
}
