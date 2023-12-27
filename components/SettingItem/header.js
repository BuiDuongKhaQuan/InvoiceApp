import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import Button from '../Button';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({
    title,
    iconRight,
    iconLeft = <Ionicons name="arrow-back" size={24} color="black" />,
    onPress,
}) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Button onPress={() => navigation.goBack()} customStylesText={{ color: 'red' }} iconLeft={iconLeft} />
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: 'white',
        elevation: 5,
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
