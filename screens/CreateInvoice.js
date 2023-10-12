import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/SettingItem/header';
import Button from '../components/Button';
export default function CreateInvoice() {
    return (
        <View style={styles.container}>
            <Header title={'Hóa đơn'} />
            <View>
                <View style={styles.invoicedate}>
                    <Text style={styles.code}>Mã hóa đơn</Text>
                    <Text style={styles.code}>Date</Text>
                </View>
                <Button
                    customStylesBtn={styles.btn}
                    customStylesText={{ ...styles.text, color: 'black' }}
                    text="Tên"
                    iconRight={<AntDesign name="pluscircleo" size={24} color="#32db64" />}
                />
                <Button
                    customStylesBtn={styles.btn}
                    customStylesText={{ ...styles.text, color: 'black' }}
                    text="Thêm khách hàng/ nhà cung cấp"
                    iconRight={<AntDesign name="pluscircleo" size={24} color="#32db64" />}
                />
                <Button
                    customStylesBtn={styles.btn}
                    customStylesText={{ ...styles.text, color: 'black' }}
                    text="Mặt hàng/Dịch vụ"
                    iconRight={<AntDesign name="down" size={24} color="#32db64" />}
                />
                <Button
                    customStylesBtn={styles.btn}
                    customStylesText={{ ...styles.text, color: 'black' }}
                    text="Thêm giảm giá"
                    iconRight={<AntDesign name="pluscircleo" size={24} color="#32db64" />}
                />
                <Button
                    customStylesBtn={styles.btn}
                    customStylesText={{ ...styles.text, color: 'black' }}
                    text="Thêm thuế"
                    iconRight={<AntDesign name="pluscircleo" size={24} color="#32db64" />}
                />
                <Button
                    customStylesBtn={styles.btn}
                    customStylesText={{ ...styles.text, color: 'black' }}
                    text="Thêm vận chuyển"
                    iconRight={<AntDesign name="pluscircleo" size={24} color="#32db64" />}
                />
                <Button
                    customStylesBtn={styles.btn}
                    customStylesText={{ ...styles.text, color: 'black' }}
                    text="Chi tiết thanh toán/Ghi chú"
                    iconRight={<AntDesign name="pluscircleo" size={24} color="#32db64" />}
                />
                <Button
                    customStylesBtn={styles.btn}
                    customStylesText={{ ...styles.text, color: 'black' }}
                    text="Thêm các trường"
                    iconRight={<AntDesign name="pluscircleo" size={24} color="#32db64" />}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    headerleft: {},

    btn: {
        paddingHorizontal: 10,
        width: '100%',
        borderWidth: 0,
        backgroundColor: 'white',
        borderRadius: 0,
        marginVertical: 1,
    },
    invoicedate: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#32db64',
        height: 50,
    },
    text: {
        textAlign: 'left',
        fontSize: 15,
    },
    code: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    bottom_item: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text: {
        fontWeight: 'bold',
        fontSize: fontSizeDefault,
    },
    name: {
        height: 50,
        width: '100%',
        paddingHorizontal: 10,

        lineHeight: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        backgroundColor: 'white',
    },
    container_input: {
        height: '50%',
        paddingHorizontal: 10,
        marginBottom: 0,
        elevation: 0,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
    },
    dropdown: {
        marginHorizontal: 10,
    },
    dropdown_btn: {
        height: '70%',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
});
