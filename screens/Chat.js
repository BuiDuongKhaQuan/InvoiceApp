import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native';
import { Fontisto, SimpleLineIcons, Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import Input from '../components/Input';
import { white } from '../constant/color';

export default function Chat() {
    const [showkeyboard, setShowkeyboard] = useState(false);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setShowkeyboard(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setShowkeyboard(false);
        });
    });

    const bottomStyle = showkeyboard ? { ...styles.container_bottom, flex: 1.7 } : { ...styles.container_bottom };

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container_center}></View>
            <View style={bottomStyle}>
                <View style={styles.bottom_left}>
                    <TouchableOpacity>
                        <SimpleLineIcons name="folder" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Fontisto name="picture" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom_center}>
                    <Input customStylesContainer={styles.input} customStylesInput={styles.inputLetter} />
                </View>
                <View style={styles.bottom_right}>
                    <TouchableOpacity>
                        <Ionicons name="ios-send" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    container_center: {
        flex: 10,
        backgroundColor: '#ccc',
    },
    container_bottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottom_left: {
        flex: 1.3,
        marginLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottom_center: {
        flex: 5,
        justifyContent: 'center',
    },
    input: {
        width: '95%',
        height: 45,
        justifyContent: 'center',
        borderWidth: 1,
        elevation: 0,
    },
    inputLetter: {
        width: '88%',
        height: 20,
        fontSize: 18,
        marginHorizontal: 15,
    },
    bottom_right: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
