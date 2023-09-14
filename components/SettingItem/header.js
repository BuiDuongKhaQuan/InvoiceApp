import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import Button from '../Button';
import { white } from '../../constant/color';

export default function Header({ onPress, title }) {
    return (
        <View style={styles.back}>
            <Button
                onPress={onPress}
                customStylesText={{ color: 'red' }}
                iconLeft={require('../../assets/icons/back.png')}
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    back: {
        marginTop: StatusBar.currentHeight || 0,
        height: 55,
        backgroundColor: white,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        fontSize: 25,
        fontWeight: '400',
        textAlign: 'center',
        width: '80%',
    },
});
