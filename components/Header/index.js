import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Button from '../Button';
import { styles } from './styles';

export default function Header({ showButton, backgroundHide, navigation }) {
    const newStyle = backgroundHide
        ? { ...styles.header, backgroundColor: 'transparent', borderBottomWidth: 0 }
        : styles.header;

    return (
        <View style={newStyle}>
            <TouchableOpacity style={styles.header_left} onPress={() => navigation.navigate('Home')}>
                <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
                <Text style={styles.title}>Invoice</Text>
            </TouchableOpacity>
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
