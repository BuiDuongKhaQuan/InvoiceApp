import { TextInput, View, Image, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';

export default function Input({ icon, pass, horder, handleChangeText, validate = false, validateText, props }) {
    const isPass = pass ? true : false;

    return (
        <View style={styles.input}>
            <View style={styles.container}>
                {icon && <Image style={styles.input_icon} source={icon} />}
                <TextInput
                    {...props}
                    onChangeText={handleChangeText}
                    secureTextEntry={isPass}
                    style={styles.input_text}
                    placeholder={horder}
                />
            </View>
            {validate && <Text style={styles.text_validate}>{validateText}</Text>}
        </View>
    );
}
