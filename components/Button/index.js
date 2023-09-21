import { Image, StyleSheet, Text, TouchableOpacity, StatusBar, View } from 'react-native';
import React from 'react';
import { styles } from './styles';

export default function Button({
    onPress,
    customStylesBtn,
    customStylesText,
    customStylesIcon,
    text,
    iconLeft,
    iconRight,
    ...props
}) {
    const combinedStylesBtn = StyleSheet.flatten([styles.btn, customStylesBtn]);
    const combinedStylesText = StyleSheet.flatten([styles.text, customStylesText]);
    const combinedStylesIcon = StyleSheet.flatten([styles.icon, customStylesIcon]);

    const buttonStyles = !!text ? combinedStylesBtn : {};

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyles} {...props}>
            <View style={styles.btnLeft}>
                {iconLeft && <View style={combinedStylesIcon}>{iconLeft}</View>}
                {text && <Text style={combinedStylesText}>{text}</Text>}
            </View>
            {iconRight && <View style={combinedStylesIcon}>{iconRight}</View>}
        </TouchableOpacity>
    );
}
