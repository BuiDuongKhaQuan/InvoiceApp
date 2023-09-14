import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import Button from '../Button';
import { white } from '../../constant/color';

export default function Header({ onPress, data }) {
    return (
        <View style={styles.back}>
            <Button
                onPress={onPress}
                customStylesText={{ color: 'red' }}
                iconLeft={require('../../assets/icons/left-arrow.png')}
            />
            <Text style={styles.title}>Thiết lập</Text>
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
        fontWeight: 'bold',
        textAlign: 'center',
        width: '80%',
    },
});
