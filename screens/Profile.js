import { StyleSheet, Text, View, Image, Dimensions, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import Button from '../components/Button';
import { white } from '../constant/color';
import { fontSizeDefault } from '../constant/fontSize';
import InvoiceList from '../components/InvoiceList';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
import { useUserContext } from './UserContext';
import { useTranslation } from 'react-i18next';
const { width } = Dimensions.get('screen');

export default function Profile() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const { state } = useUserContext();
    const { user, company } = state;
    const [contact, setContact] = useState();
    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: 'Quan',
            phone: '12345789',
            email: 'qua1n@example.com',
        },
        {
            id: 2,
            name: 'Quan1',
            phone: '12345789',
            email: 'qua2n@example.com',
        },
        {
            id: 3,
            name: 'Quan2',
            phone: '12345789',
            email: 'qua4n@example.com',
        },
        {
            id: 4,
            name: 'Quan3',
            phone: '12345789',
            email: 'qua3n@example.com',
        },
    ]);
    const [invoices, setInvoices] = useState([
        {
            id: '1',
            image: require('../assets/images/Invoices/Bill_1.png'),
        },
        {
            id: '2',
            image: require('../assets/images/Invoices/Bill_2.png'),
        },
        {
            id: '3',
            image: require('../assets/images/Invoices/Bill_3.png'),
        },
        {
            id: '4',
            image: require('../assets/images/Invoices/Bill_4.png'),
        },
        {
            id: '5',
            image: require('../assets/images/Invoices/Bill_5.png'),
        },
        {
            id: '6',
            image: require('../assets/images/Invoices/Bill_6.png'),
        },
        {
            id: '7',
            image: require('../assets/images/Invoices/Bill_7.png'),
        },
        {
            id: '8',
            image: require('../assets/images/Invoices/Bill_8.png'),
        },
        {
            id: '9',
            image: require('../assets/images/Invoices/Bill_9.png'),
        },
        {
            id: '10',
            image: require('../assets/images/Invoices/Bill_10.png'),
        },
        {
            id: '11',
            image: require('../assets/images/Invoices/Bill_11.png'),
        },
    ]);

    const [selectedTab, setSelectedTab] = useState('history');

    const tabActive = (key) =>
        selectedTab === key
            ? { ...styles.tab_text, borderBottomColor: 'black', borderBottomWidth: 1 }
            : styles.tab_text;
    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={styles.container_top}>
                    <View style={styles.image}>
                        <Image
                            style={styles.img_default}
                            source={
                                user.wallpaper == null
                                    ? require('../assets/images/default-wallpaper.png')
                                    : { uri: user.wallpaper }
                            }
                        />
                    </View>
                    <View style={styles.top_avatar}>
                        <View style={styles.top_}>
                            <Image
                                style={styles.avatar}
                                source={
                                    user.image == null
                                        ? require('../assets/images/default-avatar.png')
                                        : { uri: user.image }
                                }
                            />
                            <Text style={styles.name}>{user.name}</Text>
                        </View>
                        <Button
                            customStylesBtn={styles.edit_btn}
                            customStylesText={styles.btn_text}
                            z
                            onPress={() => navigation.navigate('Setting')}
                            iconLeft={<AntDesign name="setting" size={24} color="black" />}
                            text={t('common:setting')}
                        />
                    </View>
                </View>
                <View style={styles.container_center}>
                    <View style={styles.company}>
                        <Text style={styles.company_name}>
                            {t('common:company')}: {company.name}
                        </Text>
                    </View>
                    <View style={styles.center_tab}>
                        <Text onPress={() => setSelectedTab('history')} style={tabActive('history')}>
                            {t('common:history')}
                        </Text>
                        <Text onPress={() => setSelectedTab('contact')} style={tabActive('contact')}>
                            {t('common:contact')}
                        </Text>
                        <Text onPress={() => setSelectedTab('like')} style={tabActive('like')}>
                            {t('common:like')}
                        </Text>
                    </View>
                </View>
                <View style={styles.container_bottom}>
                    <ScrollView sr style={styles.bottom_content}>
                        {selectedTab === 'history' && (
                            <View style={styles.content}>
                                <Text style={styles.bottom_text}>11/12/2023</Text>
                                <Text style={styles.bottom_text}>{t('common:invoiceComplete')}</Text>
                                <Image
                                    style={styles.bottom_image}
                                    source={{
                                        uri: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
                                    }}
                                />
                            </View>
                        )}
                        {selectedTab === 'contact' && (
                            <View style={styles.content}>
                                {contacts.map((item) => (
                                    <View style={styles.contact_content} key={item.id}>
                                        <View style={styles.contact_row}>
                                            <Text style={styles.text_default}>{t('common:name')}:</Text>
                                            <Text style={styles.text_change}>{item.name}</Text>
                                        </View>
                                        <View style={styles.contact_row}>
                                            <Text style={styles.text_default}>{t('common:phone')}:</Text>
                                            <Text style={styles.text_change}>{item.phone}</Text>
                                        </View>
                                        <View style={styles.contact_row}>
                                            <Text style={styles.text_default}>{t('common:email')}:</Text>
                                            <Text style={styles.text_change}>{item.email}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                        {selectedTab === 'like' && (
                            <InvoiceList data={invoices} isLike={true} navigation={navigation} scrollEnabled />
                        )}
                    </ScrollView>
                </View>
            </BackgroundImage>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_top: {
        flex: 1.5,
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        flex: 3,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    img_default: {
        flex: 2,
        width: width,
        resizeMode: 'stretch',
    },
    setting_icon: {
        fontSize: fontSizeDefault,
        position: 'absolute',
        top: StatusBar.currentHeight || 20,
        right: 10,
    },
    top_avatar: {
        flex: 1,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'gray',
        resizeMode: 'stretch',
    },
    top_: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    name: {
        fontSize: fontSizeDefault,
        fontWeight: 'bold',
    },
    edit_btn: {
        width: '33%',
        height: '65%',
        marginBottom: 7,
        backgroundColor: white,
    },
    btn_text: {
        fontSize: fontSizeDefault,
        fontWeight: '700',
        color: 'black',
        marginRight: 10,
    },
    container_center: {
        flex: 0.6,
        alignItems: 'center',
    },
    company: {
        flex: 1,
        justifyContent: 'center',
        width: '90%',
    },
    company_name: {
        borderColor: 'rgba(0, 0, 0,0.2)',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    center_tab: {
        flex: 0.6,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tab_text: {
        fontSize: fontSizeDefault,
        fontWeight: 'bold',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    container_bottom: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        marginHorizontal: 20,
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
        padding: 5,
        flexDirection: 'row',
    },
    text_default: {
        fontSize: fontSizeDefault - 5,
        fontWeight: '700',
        marginRight: 10,
    },
    text_change: {
        fontSize: fontSizeDefault - 5,
    },
    contact_img: {
        flex: 1,
    },
    img: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
    bottom_content: {
        width: '100%',
        marginTop: 10,
        flex: 1,
    },
    bottom_text: {
        fontSize: fontSizeDefault,
        color: 'black',
        fontWeight: '600',
        marginRight: 10,
    },
    bottom_image: {
        width: 200,
        height: 270,
        marginTop: 8,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'gray',
        resizeMode: 'stretch',
    },
});
