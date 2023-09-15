import { TextInput, View, StyleSheet, Image, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Button from '../Button';

export default function Input({
    icon,
    pass,
    holder,
    btnSend,
    text,
    onChangeText,
    validate,
    validateText,
    customStylesInput,
    customStylesContainer,
    customStylesTextValidate,
    ...props
}) {
    const isPass = pass ? true : false;

    const inputStyle = !!text ? { backgroundColor: 'white', marginVertical: 10 } : styles.input;

    const combinedSltyesContainer = StyleSheet.flatten([inputStyle, customStylesContainer]);

    const combinedSltyesInput = StyleSheet.flatten([styles.input_text, customStylesInput]);

    const combinedSltyesTextValidate = StyleSheet.flatten([styles.text_validate, customStylesTextValidate]);

    return (
        <View style={combinedSltyesContainer}>
            <View style={styles.container}>
                {icon && <Image style={styles.input_icon} source={icon} />}
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
            </View>
            {validate && <Text style={combinedSltyesTextValidate}>{validateText}</Text>}
        </View>
    );
}
