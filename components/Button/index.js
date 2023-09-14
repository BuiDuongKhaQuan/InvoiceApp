import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles';

export default function Button({ onPress, customStylesBtn, customStylesText, text, icon, props }) {
    const combinedStylesBtn = StyleSheet.flatten([styles.btn, customStylesBtn]);
    const combinedStylesText = StyleSheet.flatten([styles.text, customStylesText]);

    return (
        <TouchableOpacity onPress={onPress} style={combinedStylesBtn} {...props}>
            {icon ? <Image source={icon} /> : <Text style={combinedStylesText}>{text}</Text>}
        </TouchableOpacity>
    );
}
