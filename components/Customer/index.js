import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { createCustomerByCompany } from '../../Service/api';
import { useUserContext } from '../../screens/UserContext';

export default function Customer({ dataList, onDataChanged }) {
    const { t } = useTranslation();
    const { state } = useUserContext();
    const [newDataList, setNewDataList] = useState(dataList);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleAddCustomer = async () => {
        try {
            const newCustomer = await createCustomerByCompany(name, email, phone, state.company.name, '1');
            setNewDataList((prev) => [...prev, newCustomer]);
        } catch (error) {
            Alert.alert('Error', error.response.data.message);
        }
    };

    const handleSubmit = () => {
        // Hiển thị cảnh báo cho người dùng xác nhận
        Alert.alert(
            'Bạn có chắc chắn muốn tạo khách hàng mới?',
            'Nếu bạn chắc chắn muốn tạo khách hàng mới, hãy chọn "Đồng ý".',
            [
                {
                    text: 'Không',
                    cancelable: true,
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        await handleAddCustomer();
                    },
                    cancelable: true,
                },
            ],
            { cancelable: false },
        );
    };
    const handleSelectedCustomer = (item) => {
        // Gọi hàm callback để truyền dữ liệu mới ra ngoài
        if (onDataChanged) {
            onDataChanged(item);
        }
    };

    return (
        <>
            <ScrollView style={styles.content}>
                <View style={styles.waper_add}>
                    <View>
                        <TextInput
                            style={styles.text_change}
                            placeholder="Nhập tên khách hàng"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />

                        <TextInput
                            style={styles.text_change}
                            placeholder="Nhập số điện thoại khách hàng"
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                        />

                        <TextInput
                            style={styles.text_change}
                            placeholder="Nhập email khách hàng"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <Button
                        text="Thêm"
                        onPress={handleSubmit}
                        customStylesBtn={{ marginVertical: 0, flex: 0.3 }}
                        customStylesText={{ fontSize: fontSizeDefault }}
                    />
                </View>

                {dataList && (
                    <>
                        <Text style={styles.title}>Danh sách khách hàng</Text>
                        {newDataList.map((item) => (
                            <TouchableOpacity
                                style={styles.contact_content}
                                key={item.id}
                                onPress={() => handleSelectedCustomer(item)}
                            >
                                <View style={styles.contact_row}>
                                    <Text style={styles.text_default}>{t('common:name')}:</Text>
                                    <Text style={styles.text_change}>{item.name}</Text>
                                </View>
                                <View style={styles.contact_row}>
                                    <Text style={styles.text_default}>{t('common:email')}:</Text>
                                    <Text style={styles.text_change}>{item.email}</Text>
                                </View>
                                <View style={styles.contact_row}>
                                    <Text style={styles.text_default}>{t('common:phone')}:</Text>
                                    <Text style={styles.text_change}>{item.phone}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    contact_content: {
        flex: 1,
        width: '100%',
        padding: 5,
        borderRadius: 10,
        backgroundColor: white,
        flexDirection: 'column',
        marginVertical: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    contact_row: {
        flex: 1,
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text_default: {
        fontSize: fontSizeDefault - 3,
        fontWeight: '700',
        marginRight: 10,
    },
    text_change: {
        flex: 10,
        fontSize: fontSizeDefault - 3,
        marginHorizontal: 10,
    },
    waper_add: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: white,
        borderRadius: 10,
    },
    title: {
        fontSize: fontSizeDefault,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
