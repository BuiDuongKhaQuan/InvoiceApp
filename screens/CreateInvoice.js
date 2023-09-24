import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/SettingItem/header';
import Popup from '../components/Popup';
import { AntDesign } from '@expo/vector-icons';
import Invoice from '../layouts/Invoice/Invoice';
import { useUserContext } from './UserContext';
import { white } from '../constant/color';

export default function CreateInvoice({ navigation }) {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const { state } = useUserContext();
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <>
            <Popup visible={isPopupVisible} onClose={togglePopup} bottom />
            <View style={styles.container}>
                <Header
                    onPress={togglePopup}
                    title="Tạo hóa đơn"
                    iconRight={<AntDesign name="appstore-o" size={24} color="black" />}
                />
                <View style={styles.top}>
                    <Invoice data={state.user} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: white,
    },
    top: {
        flex: 1,
        width: '100%',
    },
    bottom: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        marginHorizontal: 10,
        height: '60%',
        width: '40%',
        borderRadius: 5,
    },
});
