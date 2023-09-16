import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import Button from '../Button';
import { backgroundColor, white } from '../../constant/color';
import { useTheme } from '@react-navigation/native';
import { fontSizeMenuTitle } from '../../constant/fontSize';

export default function Popup({ visible, onClose }) {
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.top_between}>
                        <Button
                            onPress={onClose}
                            customStylesIcon={styles.icon_close}
                            iconLeft={require('../../assets/icons/close.png')}
                        />
                    </View>
                    <Text style={styles.title}>Tạo hóa đơn ngay</Text>
                    <View style={styles.top_between}></View>
                </View>
                <View style={styles.bottom}>
                    <Button customStylesIcon={styles.icon_tab} iconLeft={require('../../assets/icons/writing.png')} />
                    <Button customStylesIcon={styles.icon_tab} iconLeft={require('../../assets/icons/save.png')} />
                    <Button customStylesIcon={styles.icon_tab} iconLeft={require('../../assets/icons/menu.png')} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        height: '17%',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    top_between: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    top: {
        flex: 2,
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon_close: {
        width: 20,
        height: 20,
    },
    title: {
        flex: 2,
        textAlign: 'center',
        fontSize: fontSizeMenuTitle,
        fontWeight: 'bold',
    },
    bottom: {
        flex: 3,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    icon_tab: {
        backgroundColor: backgroundColor,
        width: 50,
        height: 50,
        paddingHorizontal: 10,
    },
});
