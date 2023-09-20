import { TextInput, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Button from '../Button';

export default function Input({
    iconLeft,
    iconRight,
    pass,
    holder,
    btnSend,
    text,
    onChangeText,
    onPressIconRight,
    validate,
    validateText,
    customStylesInput,
    customStylesContainer,
    customStylesTextValidate,
    customStylesIcon,
    ...props
}) {
    const isPass = pass ? true : false;

    const inputStyle = !!text ? { backgroundColor: 'white', marginVertical: 10 } : styles.input;

    const combinedSltyesContainer = StyleSheet.flatten([inputStyle, customStylesContainer]);

    const combinedSltyesInput = StyleSheet.flatten([styles.input_text, customStylesInput]);

    const combinedSltyesTextValidate = StyleSheet.flatten([styles.text_validate, customStylesTextValidate]);
    const combinedSltyesIcon = StyleSheet.flatten([styles.input_icon, customStylesIcon]);

    return (
        <View style={combinedSltyesContainer}>
            <View style={styles.container}>
                {iconLeft && <Image style={combinedSltyesIcon} source={iconLeft} />}
                <TextInput
                    {...props}
                    onChangeText={onChangeText}
                    secureTextEntry={isPass}
                    style={combinedSltyesInput}
                    placeholder={holder}
                />
                {btnSend && (
                    <Button
                        text="Gửi"
                        customStylesText={{ fontSize: 20 }}
                        customStylesBtn={{ width: 75, height: 35, marginHorizontal: -80, marginVertical: 11 }}
                    />
                )}
                {iconRight && (
                    <TouchableOpacity onPress={onPressIconRight}>
                        <Image style={combinedSltyesIcon} source={iconRight} />
                    </TouchableOpacity>
                )}
            </View>
            {validate && <Text style={combinedSltyesTextValidate}>{validateText}</Text>}
        </View>
    );
}
