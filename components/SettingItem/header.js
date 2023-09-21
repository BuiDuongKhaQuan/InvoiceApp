import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import Button from '../Button';
import { white } from '../../constant/color';
import { Ionicons } from '@expo/vector-icons';

export default function Header({
    onGoBack,
    title,
    iconRight,
    iconLeft = <Ionicons name="arrow-back" size={24} color="black" />,
    onPress,
}) {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Button onPress={onGoBack} customStylesText={{ color: 'red' }} iconLeft={iconLeft} />
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.icon}>
                {iconRight && <Button onPress={onPress} customStylesText={{ color: 'red' }} iconLeft={iconRight} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0,
        height: 55,
        width: '100%',
        backgroundColor: white,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        flex: 5,
        fontSize: 25,
        fontWeight: '400',
        textAlign: 'center',
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
