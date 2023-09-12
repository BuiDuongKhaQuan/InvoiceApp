import { StyleSheet, TextInput, View, Image } from 'react-native';
import React, { useState } from 'react';

export default function Input({ icon, pass, horder, props }) {
    const [text, setText] = useState('');

    const isPass = pass ? true : false;

    const handleChangeText = (text) => {
        setText(text);
    };

    return (
        <View style={styles.input}>
            {icon && <Image style={styles.input_icon} source={icon} />}
            <TextInput
                {...props}
                onChangeText={handleChangeText}
                value={text}
                secureTextEntry={isPass}
                style={styles.input_text}
                placeholder={horder}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        width: 340,
        height: 60,
        alignContent: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, // Điều chỉnh vị trí bóng (đối với iOS)
        shadowOpacity: 0.5, // Điều chỉnh độ trong suốt của bóng (đối với iOS)
        shadowRadius: 5, // Điều chỉnh bán kính của bóng (đối với iOS)
        elevation: 5,
    },
    input_icon: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    input_text: {
        width: 270,
    },
});
