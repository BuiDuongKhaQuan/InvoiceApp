import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('screen');

export default function MenuBar() {
    return (
        <View style={styles.menu_bar}>
            <Text>Menubar</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    menu_bar: {
        bottom: -height + 67 * 3,
        height: 67,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopColor: '#707070',
        borderTopWidth: 1,
    },
});
