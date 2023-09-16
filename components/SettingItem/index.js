import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../Button';
import { white } from '../../constant/color';
import { fontSizeDefault, fontSizeMenuTitle } from '../../constant/fontSize';

export default function SettingItem({ data, iconRight = require('../../assets/icons/right-arrow.png') }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.title}</Text>
            {data.data.map((item) => (
                <Button
                    key={item.id}
                    customStylesBtn={styles.btn}
                    customStylesText={styles.text}
                    iconLeft={item.icon}
                    iconRight={iconRight}
                    text={item.title}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: fontSizeMenuTitle,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    btn: {
        marginVertical: 1,
        backgroundColor: white,
        borderRadius: 0,
        borderWidth: 0,
        width: '100%',
        elevation: 0,
        justifyContent: 'space-between',
    },
    text: {
        color: '#000000',
        fontWeight: 400,
        fontSize: fontSizeDefault,
    },
});
