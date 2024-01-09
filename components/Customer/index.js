import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { createCustomerByCompany } from '../../Service/api';
import { useUserContext } from '../../screens/UserContext';
import Loading from '../Loading';

export default function Customer({ dataList, onDataChanged }) {
    const { t } = useTranslation();
    const { state } = useUserContext();
    const [newDataList, setNewDataList] = useState(dataList);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddCustomer = async () => {
        if (!name || !phone || !email) {
            Alert.alert(t('common:error'), t('common:check'));
            return;
        }
        try {
            setLoading(true);
            const newCustomer = await createCustomerByCompany(name, email, phone, state.company.name, '1');
            setNewDataList((prev) => [...prev, newCustomer]);
            setName('');
            setPhone('');
            setEmail('');
        } catch (error) {
            Alert.alert('Error', error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        if (!name || !phone || !email) {
            // Display an error message or alert
            Alert.alert(t('common:error'), t('common:check'));
            return; // Do not proceed further if any field is empty
        }
        // Hiển thị cảnh báo cho người dùng xác nhận
        Alert.alert(
            t('common:alert_hd'),
            t('common:alert_hd_2'),
            [
                {
                    text: t('common:alert_no'),
                    cancelable: true,
                    style: 'cancel',
                },
                {
                    text: t('common:alert_yes'),
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
                <Loading isFullScreen loading={loading} />
                <View style={styles.waper_add}>
                    <View>
                        <TextInput
                            style={styles.text_change}
                            placeholder={t('common:in_customer')}
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />

                        <TextInput
                            style={styles.text_change}
                            placeholder={t('common:num_customer')}
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            keyboardType="phone-pad"
                        />

                        <TextInput
                            style={styles.text_change}
                            placeholder={t('common:email_customer')}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            keyboardType="email-address"
                        />
                    </View>
                    <Button
                        text={t('common:more')}
                        onPress={handleSubmit}
                        customStylesBtn={{ marginVertical: 0, flex: 0.3 }}
                        customStylesText={{ fontSize: fontSizeDefault }}
                    />
                </View>

                {dataList && (
                    <>
                        <Text style={styles.title}>{t('common:customers')}</Text>
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
