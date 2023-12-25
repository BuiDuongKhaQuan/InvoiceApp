import { StyleSheet, Text, View, Modal } from 'react-native';
import React, { useState } from 'react';
import Button from '../Button';
import { backgroundColor, white } from '../../constant/color';
import { fontSizeMenuTitle } from '../../constant/fontSize';
import InvoiceList from '../InvoiceList';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { listInvoices } from '../../constant/listInvoice';
import { useNavigation } from '@react-navigation/native';

export default function Popup({ visible, onClose, bottom }) {
    const { t } = useTranslation();
    const [invoices, setInvoices] = useState(listInvoices);
    const navigation = useNavigation();

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={bottom ? styles.container : styles.center}>
                <View style={styles.top}>
                    <View style={styles.top_between}>
                        <Button
                            onPress={onClose}
                            customStylesIcon={styles.icon_close}
                            iconLeft={<AntDesign name="close" size={20} color="black" />}
                        />
                    </View>
                    {bottom && <Text style={styles.title}>{t('common:createInvoices')} </Text>}
                    <View style={styles.top_between}>
                        <Button
                            customStylesIcon={{ ...styles.icon_close, width: 25, height: 25 }}
                            iconLeft={<Feather name="search" size={24} color="black" />}
                        />
                    </View>
                </View>
                {bottom && (
                    <View style={styles.bottom}>
                        <InvoiceList navigation={navigation} data={invoices} isOnPress />
                    </View>
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        height: '93%',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: 'black',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    top_between: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    top: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    icon_close: {
        width: 20,
        height: 20,
    },
    title: {
        flex: 2.2,
        textAlign: 'center',
        fontSize: fontSizeMenuTitle,
        fontWeight: 'bold',
    },
    bottom: {
        flex: 10,
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
