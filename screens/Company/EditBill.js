import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../components/SettingItem/header';
import { MaterialCommunityIcons, Feather, AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function EditBill() {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Header title={t('common:edit')} />
            <View style={styles.container_1}>
                <Entypo name="check" size={26} color="black" />
            </View>
            <View style={styles.container_center}>
                <View style={styles.container_center_1}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    container_1: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 15,
        alignItems: 'center',
    },
    container_center: {
        flex: 10,
        backgroundColor: '#ddd',
    },
    container_center_1: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20,
        backgroundColor: 'white',
    },
});
