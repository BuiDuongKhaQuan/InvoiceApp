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
    onPressSend,
    onChangeText,
    onPressIconRight,
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
            <View style={btnSend ? { ...styles.container } : { ...styles.container, justifyContent: 'center' }}>
                {iconLeft && <View style={styles.input_icon}>{iconLeft}</View>}
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
                        onPress={onPressSend}
                        customStylesText={{ fontSize: 20 }}
                        customStylesBtn={{
                            width: 70,
                            height: 35,
                            marginRight: 10,
                            marginVertical: 12,
                        }}
                    />
                )}
                {iconRight && (
                    <TouchableOpacity style={styles.input_icon} onPress={onPressIconRight}>
                        {iconRight}
                    </TouchableOpacity>
                )}
            </View>
            {validate && <Text style={combinedSltyesTextValidate}>{validateText}</Text>}
        </View>
    );
}
