import { Image, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react';
import { styles } from './styles';

export default function Button({ onPress, customStylesBtn, customStylesText, text, iconLeft, iconRight, ...props }) {
    const combinedStylesBtn = StyleSheet.flatten([styles.btn, customStylesBtn]);
    const combinedStylesText = StyleSheet.flatten([styles.text, customStylesText]);

    const buttonStyles = !!text ? combinedStylesBtn : { marginTop: StatusBar.currentHeight || 0 };

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyles} {...props}>
            {iconLeft && <Image style={styles.icon} source={iconLeft} />}
            <Text style={combinedStylesText}>{text}</Text>
            {iconRight && <Image style={styles.icon} source={iconRight} />}
        </TouchableOpacity>
    );
}
