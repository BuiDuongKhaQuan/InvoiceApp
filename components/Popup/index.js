import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, PanResponder, Animated } from 'react-native';
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
    const pan = new Animated.ValueXY();

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            const sensitivityThreshold = 0; // Điều chỉnh ngưỡng nhạy cảm tại đây
            return Math.abs(gestureState.dy) > sensitivityThreshold;
        },
        onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy > 0) {
                // Close the popup if the user swipes down by more than 50 pixels
                onClose();
            } else {
                // Animate the popup back to its original position
                Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
            }
        },
    });

    const animatedStyle = {
        transform: [{ translateY: pan.y }],
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <Animated.View
                {...(bottom ? panResponder.panHandlers : {})}
                style={[bottom ? styles.container : styles.center, animatedStyle]}
            >
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
            </Animated.View>
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
