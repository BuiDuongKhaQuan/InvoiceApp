import { TextInput, View, StyleSheet, Image, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Button from '../Button';

export default function Input({
    icon,
    pass,
    horder,
    btnSend,
    text,
    handleChangeText,
    validate = false,
    validateText,
    customStylesInput,
    ...props
}) {
    const combinedSltyesInput = StyleSheet.flatten([styles.input_text, customStylesInput]);
    const isPass = pass ? true : false;
    const inputStyle = !!text
        ? {
              height: 50,
              backgroundColor: 'white',

              marginVertical: 10,
          }
        : styles.input;
    return (
        <View style={inputStyle}>
            <View style={styles.container}>
                {icon && <Image style={styles.input_icon} source={icon} />}
                <TextInput
                    {...props}
                    onChangeText={handleChangeText}
                    secureTextEntry={isPass}
                    style={combinedSltyesInput}
                    placeholder={horder}
                />
                {btnSend && (
                    <Button
                        text="Gửi"
                        customStylesText={{ fontSize: 20 }}
                        customStylesBtn={{ width: 75, height: 35, marginHorizontal: -80, marginVertical: 11 }}
                    />
                )}
            </View>
            {validate && <Text style={styles.text_validate}>{validateText}</Text>}
        </View>
    );
}
