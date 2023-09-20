import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/SettingItem/header';
import Button from '../components/Button';
import Popup from '../components/Popup';

export default function CreateInvoice({ navigation }) {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <>
            <Popup visible={isPopupVisible} onClose={togglePopup} bottom />
            <View style={styles.container}>
                <Header
                    onPress={togglePopup}
                    onGoBack={() => navigation.goBack()}
                    title="Tạo hóa đơn"
                    iconRight={require('../assets/icons/menu.png')}
                />
                <View style={styles.top}>
                    <View></View>
                </View>
                <View style={styles.bottom}>
                    <Button customStylesBtn={styles.btn} text="Print" />
                    <Button customStylesBtn={styles.btn} text="Save to PDF" />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    top: {
        flex: 10,
        height: 500,
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
    },
});
