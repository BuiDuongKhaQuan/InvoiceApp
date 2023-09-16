import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../Button';
import { white } from '../../constant/color';
import { fontSizeMenuTitle } from '../../constant/fontSize';

export default function SettingItem({ data, iconRight = require('../../assets/icons/right-arrow.png') }) {
    return (
        <>
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
        </>
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
        width: '100%',
        justifyContent: 'space-between',
    },
    text: {
        color: '#000000',
        fontWeight: 400,
        fontSize: 20,
    },
});
