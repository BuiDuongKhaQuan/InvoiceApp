import { StatusBar, StyleSheet, Text, View, Alert } from 'react-native';
import { white } from '../constant/color';
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { fontSizeDefault } from '../constant/fontSize';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { getInvoiceById } from '../Service/api';
export default function Search({ navigation }) {
    const [id, setId] = useState('');
    const [invoice, setInvoice] = useState(null);
    const [error, setError] = useState(null);
    const handleSearch = async () => {
        try {
            const response = await getInvoiceById(id);
            const data = response;
            if (data) {
                setInvoice(data);
                setError(null);
                Alert.alert('Invoice information', `ID: ${data.id}\nStatus: ${data.status}`);
            } else {
                Alert.alert('Error', 'No invoices were found with this ID');
            }
        } catch (error) {
            setError('This invoice does not exist');
            setInvoice(null);
            if (error.response) {
            }
            Alert.alert('Error', 'This invoice does not exist');
        }
    };
    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={{ flexDirection: 'row' }}>
                    <Input
                        customStylesContainer={styles.input}
                        holder="Search by invoice code, customer name"
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
                    <Text style={styles.title}>Maybe you are interested</Text>
                    <View style={styles.care}>
                        <Button
                            customStylesText={styles.result_itemText}
                            customStylesBtn={styles.result_item}
                            text="New model coming soon"
                        />
                        <Button
                            customStylesText={styles.result_itemText}
                            customStylesBtn={styles.result_item}
                            text="Famous brand"
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
