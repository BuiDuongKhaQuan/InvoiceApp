import { StyleSheet, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import Header from '../components/SettingItem/header';
import Popup from '../components/Popup';
import { AntDesign } from '@expo/vector-icons';
import { useUserContext } from './UserContext';
import { white } from '../constant/color';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { fontSizeDefault } from '../constant/fontSize';
import Input from '../components/Input';
import SelectDropdown from 'react-native-select-dropdown';
import { getProductsByCompany } from '../Service/api';

export default function CreateInvoice() {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const { state } = useUserContext();
    const { user, company } = state;
    const [haveTax, setHaveTax] = useState(false);
    const [haveNote, setHaveNote] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();
    const [productsByCompany, setProductsByCompany] = useState([]);
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };
    const idLayoutInvoice = route.params?.data;
    useEffect(() => {
        // if (idLayoutInvoice == 1) setHaveTax(true);
        // if (idLayoutInvoice == 2) setHaveTax(true);
        // if (idLayoutInvoice == 3) setHaveTax(true);
        // if (idLayoutInvoice == 4) setHaveTax(true);
        // if (idLayoutInvoice == 5) setHaveTax(true);
        // if (idLayoutInvoice == 6) setHaveTax(true);
    }, [idLayoutInvoice]);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await getProductsByCompany(company.name);
                console.log(response);
                setProductsByCompany(response);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);

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
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Name:</Text>
                        <Input customStylesContainer={styles.container_input} />
                    </View>
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Email:</Text>
                        <Input customStylesContainer={styles.container_input} />
                    </View>
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Phone:</Text>
                        <Input customStylesContainer={styles.container_input} />
                    </View>
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Gender:</Text>
                        <View style={styles.dropdown}>
                            <SelectDropdown
                                data={productsByCompany}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem.name);
                                }}
                                buttonStyle={styles.dropdown_btn}
                                defaultButtonText={'Selected Product'}
                                renderDropdownIcon={() => <Entypo name="chevron-small-down" size={24} color="black" />}
                                dropdownIconPosition="right"
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem.name;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item.name;
                                }}
                            />
                        </View>
                    </View>
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
