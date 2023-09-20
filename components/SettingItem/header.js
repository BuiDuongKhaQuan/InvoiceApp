import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import Button from '../Button';
import { white } from '../../constant/color';

export default function Header({ onPress, title, iconRight }) {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Button
                    onPress={onPress}
                    customStylesText={{ color: 'red' }}
                    iconLeft={require('../../assets/icons/back.png')}
                />
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.icon}>
                {iconRight && (
                    <Button
                        onPress={onPress}
                        customStylesText={{ color: 'red' }}
                        iconLeft={require('../../assets/icons/menu.png')}
                    />
                )}
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
        borderColor: 'black',
        borderBottomWidth: 1,
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
