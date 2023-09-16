import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import biểu tượng từ react-native-vector-icons
import Header from '../components/Header';
import { Fontisto } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Input from '../components/Input';
export default function Chat() {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container_center}></View>
            <View style={styles.container_bottom}>
                <View style={styles.container_bottom_left1}>
                    <TouchableOpacity>
                        <SimpleLineIcons name="folder" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.container_bottom_left2}>
                    <TouchableOpacity>
                        <Fontisto name="picture" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.container_bottom_center}>
                    <Input customStylesContainer={styles.input} customStylesInput={styles.inputLetter} />
                </View>
                <View style={styles.container_bottom_right}>
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
    },
    container_center: {
        flex: 10,
        backgroundColor: '#ccc',
    },
    container_bottom: {
        flex: 1,
        backgroundColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container_bottom_left1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_bottom_left2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_bottom_center: {
        flex: 5,

        justifyContent: 'center',
        alignItems: 'center',
    },
    input: { width: 250, height: 45, marginLeft: 12 },
    container_bottom_right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputLetter: {
        marginLeft: 15,
    },
});
