import { Image, StyleSheet, Text, TouchableOpacity, StatusBar, View } from 'react-native';
import React from 'react';
import { styles } from './styles';

export default function Button({ onPress, customStylesBtn, customStylesText, text, iconLeft, iconRight, ...props }) {
    const combinedStylesBtn = StyleSheet.flatten([styles.btn, customStylesBtn]);
    const combinedStylesText = StyleSheet.flatten([styles.text, customStylesText]);

    const buttonStyles = !!text ? combinedStylesBtn : {};

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyles} {...props}>
            <View style={styles.btnLeft}>
                {iconLeft && <Image style={styles.icon} source={iconLeft} />}
                <Text style={combinedStylesText}>{text}</Text>
            </View>
            {iconRight && <Image style={styles.icon} source={iconRight} />}
        </TouchableOpacity>
    );
}
