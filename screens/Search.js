import { StatusBar, StyleSheet, Text, View, Alert } from 'react-native';
import { white } from '../constant/color';
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { fontSizeDefault } from '../constant/fontSize';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import axios from 'axios';
export default function Search({ navigation }) {
    const [id, setId] = useState('');
    const [invoice, setInvoice] = useState(null);
    const [error, setError] = useState(null);
    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `http://bill-rest.ap-southeast-2.elasticbeanstalk.com/api/v1/invoices/id/${id}`,
            );
            const data = response.data;

            if (data) {
                // Cập nhật thông tin hóa đơn
                setInvoice(data);
                setError(null); // Xóa thông báo lỗi nếu có

                // Hiển thị thông báo thông tin hóa đơn
                Alert.alert('Thông tin hóa đơn', `ID: ${data.id}\nStatus: ${data.status}`);
            } else {
                // Hiển thị thông báo nếu không có dữ liệu
                Alert.alert('Lỗi', 'Không tìm thấy hóa đơn với ID này');
                // setError('Không tìm thấy hóa đơn với ID này');
                // setInvoice(null); // Đặt hóa đơn thành null khi có lỗi
            }
        } catch (error) {
            setError('Hóa đơn này không tồn tại');
            setInvoice(null);
            if (error.response) {
            }
            Alert.alert('Lỗi', 'Hóa đơn này không tồn tại');
        }
    };
    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={{ flexDirection: 'row' }}>
                    <Input
                        customStylesContainer={styles.input}
                        holder="Tìm theo mã hóa đơn, tên khách hàng"
                        iconLeft={<Feather name="search" size={24} color="black" />}
                        iconRight={<Ionicons name="ios-qr-code-outline" size={24} color="black" />}
                        onPressIconRight={() => navigation.navigate('Scanner')}
                        value={id}
                        onChangeText={(text) => setId(text)}
                        onSubmitEditing={handleSearch}
                    />
                </View>
                <View style={styles.container_top}>
                    <View style={styles.result}>
                        <Button
                            customStylesBtn={styles.result_item}
                            customStylesText={styles.result_itemText}
                            text="Hóa đơn bán hàng"
                            iconRight={<AntDesign name="close" size={20} color="black" />}
                        />
                        <Button
                            customStylesBtn={styles.result_item}
                            customStylesText={styles.result_itemText}
                            customStylesIcon={styles.result_itemIcon}
                            text="Hóa đơn bán hàng"
                            iconRight={<AntDesign name="close" size={20} color="black" />}
                        />
                        <Button
                            customStylesBtn={styles.result_item}
                            customStylesText={styles.result_itemText}
                            customStylesIcon={styles.result_itemIcon}
                            text="Hóa đơn bán hàng"
                            iconRight={<AntDesign name="close" size={20} color="black" />}
                        />
                    </View>
                </View>
                <View style={styles.container_bottom}>
                    <Text style={styles.title}>Có thể bạn quan tâm</Text>
                    <View style={styles.care}>
                        <Button
                            customStylesText={styles.result_itemText}
                            customStylesBtn={styles.result_item}
                            text="Mẫu mới sắp ra mắt"
                        />
                        <Button
                            customStylesText={styles.result_itemText}
                            customStylesBtn={styles.result_item}
                            text="Thương hiệu nổi tiếng"
                        />
                    </View>
                </View>
            </BackgroundImage>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    container_top: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
    },
    input: {
        flex: 6,
        width: '100%',
        marginTop: StatusBar.currentHeight || 20,
        borderRadius: 0,
        marginHorizontal: 0,
        marginVertical: 0,
        elevation: 0,
    },
    result: {
        flex: 1,
        flexDirection: 'column',
    },
    result_item: {
        width: '100%',
        borderRadius: 0,
        marginVertical: 0,
        elevation: 0,
        borderWidth: 0,
        backgroundColor: white,
        justifyContent: 'space-between',
    },
    result_itemText: {
        fontWeight: '100',
        fontSize: fontSizeDefault,
        color: 'black',
        textAlign: 'left',
        marginHorizontal: 10,
    },
    container_bottom: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    care: {
        flexDirection: 'column',
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
    },
});
