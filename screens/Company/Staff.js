import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import TabNavigator from './TabNavigator';
import Input from '../components/Input';
import Header from '../components/SettingItem/header';

export default function Staff() {
    return (
        <View style={styles.container}>
            <Header title="Nhân viên" />
            <Input iconLeft={require('../assets/icons/search.png')} customStylesContainer={styles.input} />

            <View style={styles.icontilte}>
                <Image style={styles.icon} source={require('../assets/icons/user-cicle.png')} />
                <Text style={styles.text}>Tiêu đề</Text>
            </View>
            <View style={styles.icontilte}>
                <Image style={styles.icon} source={require('../assets/icons/user-cicle.png')} />
                <Text style={styles.text}>Tiêu đề</Text>
            </View>
            <View style={styles.icontilte}>
                <Image style={styles.icon} source={require('../assets/icons/user-cicle.png')} />
                <Text style={styles.text}>Tiêu đề</Text>
            </View>
            <View style={styles.icontilte}>
                <Image style={styles.icon} source={require('../assets/icons/user-cicle.png')} />
                <Text style={styles.text}>Tiêu đề</Text>
            </View>
            <View style={styles.icontilte}>
                <Image style={styles.icon} source={require('../assets/icons/user-cicle.png')} />
                <Text style={styles.text}>Tiêu đề</Text>
            </View>
            <View style={styles.icontilte}>
                <Image style={styles.icon} source={require('../assets/icons/user-cicle.png')} />
                <Text style={styles.text}>Tiêu đề</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    input: {
        width: '90%',
        height: 50,
        borderColor: 'white',
        backgroundColor: '#C9C9C9',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
    },
    icontilte: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10,
    },
    text: {
        marginTop: 10,
        fontSize: 30,
        marginLeft: 20,
    },
});
