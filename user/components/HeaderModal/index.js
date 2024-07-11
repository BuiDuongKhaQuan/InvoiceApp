import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontSizeDefault } from '../../constant/fontSize';
import { white } from '../../constant/color';
import Button from '../Button';
import { Ionicons } from '@expo/vector-icons';

export default function HeaderModal({ title, onPress }) {
    return (
        <View style={styles.model_header}>
            <Button
                onPress={onPress}
                customStylesBtn={{ flex: 1 }}
                iconLeft={<Ionicons name="arrow-back" size={24} color="black" />}
            />
            <Text style={styles.titleTable}>{title}</Text>
            <View style={{ flex: 1 }}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    model_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: white,
    },
    titleTable: {
        fontSize: fontSizeDefault + 10,
        textAlign: 'center',
        padding: 10,
        flex: 7,
    },
});
