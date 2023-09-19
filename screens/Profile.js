import { StyleSheet, Text, View, Image, Dimensions, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Button from '../components/Button';
import { backgroundColor, white } from '../constant/color';
import { fontSizeDefault } from '../constant/fontSize';
import InvoiceList from '../components/InvoiceList';

const { width } = Dimensions.get('screen');

export default function Profile() {
    const [invoices, setInvoices] = useState([
        {
            id: '1',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
        {
            id: '2',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
        {
            id: '3',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
        {
            id: '4',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
    ]);

    const [selectedTab, setSelectedTab] = useState('history');

    const tabActive = (key) =>
        selectedTab === key
            ? { ...styles.tab_text, borderBottomColor: 'black', borderBottomWidth: 1 }
            : styles.tab_text;
    return (
        <View style={styles.container}>
            <View style={styles.container_top}>
                <View style={styles.image}>
                    <Image
                        style={styles.img_default}
                        source={{ uri: 'https://www.chudu24.com/wp-content/uploads/2017/03/canh-dep-nhat-ban-5.jpg' }}
                    />
                    <Button style={styles.setting_icon} iconLeft={require('../assets/icons/setting.png')} />
                </View>
                <View style={styles.top_avatar}>
                    <View style={styles.top_}>
                        <Image style={styles.avatar} source={require('../assets/icons/account.png')} />
                        <Text style={styles.name}>Khả Quân</Text>
                    </View>
                    <Button
                        customStylesBtn={styles.edit_btn}
                        customStylesText={styles.btn_text}
                        iconLeft={require('../assets/icons/edit.png')}
                        text="Chỉnh sửa"
                    />
                </View>
            </View>
            <View style={styles.container_center}>
                <View style={styles.btn}>
                    <Button
                        customStylesBtn={styles.creat_btn}
                        customStylesText={styles.btn_text}
                        text="Tạo hóa đơn__________________"
                        iconRight={require('../assets/icons/paper-clip.png')}
                    />
                </View>
                <View style={styles.center_tab}>
                    <Text onPress={() => setSelectedTab('history')} style={tabActive('history')}>
                        Lịch sử
                    </Text>
                    <Text onPress={() => setSelectedTab('contact')} style={tabActive('contact')}>
                        Đối tác
                    </Text>
                    <Text onPress={() => setSelectedTab('like')} style={tabActive('like')}>
                        Yêu thích
                    </Text>
                </View>
            </View>
            <View style={styles.container_bottom}>
                <ScrollView style={styles.bottom_content}>
                    {selectedTab === 'history' && (
                        <View style={styles.content}>
                            <Text style={styles.bottom_text}>23 dec</Text>
                            <Text style={styles.bottom_text}>Hoàn thành hóa đơn</Text>
                            <Image
                                style={styles.bottom_image}
                                source={{ uri: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg' }}
                            />
                        </View>
                    )}
                    {selectedTab === 'contact' && (
                        <View style={styles.content}>
                            <View style={styles.contact_content}>
                                <View style={styles.contact_row}>
                                    <Text style={styles.text_default}>Name:</Text>
                                    <Text style={styles.text_change}>Quan</Text>
                                </View>
                                <View style={styles.contact_row}>
                                    <Text style={styles.text_default}>Phone:</Text>
                                    <Text style={styles.text_change}>0328216787</Text>
                                </View>
                                <View style={styles.contact_row}>
                                    <Text style={styles.text_default}>Email:</Text>
                                    <Text style={styles.text_change}>khaquan9a2.2016@gmail.com</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    {selectedTab === 'like' && <InvoiceList data={invoices} isLike />}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    container_top: {
        flex: 1.8,
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        flex: 2.3,
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
        width: 150,
        height: 45,
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
        flex: 1.2,
        alignItems: 'center',
    },
    btn: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    creat_btn: {
        width: '93%',
        height: '50%',
        marginBottom: 10,
        backgroundColor: white,
    },
    center_tab: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tab_text: {
        fontSize: fontSizeDefault,
        fontWeight: 'bold',
        paddingVertical: 10,
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
        shadowOffset: { width: 0, height: 2 }, // Điều chỉnh vị trí bóng (đối với iOS)
        shadowOpacity: 0.5, // Điều chỉnh độ trong suốt của bóng (đối với iOS)
        shadowRadius: 5, // Điều chỉnh bán kính của bóng (đối với iOS)
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
        marginTop: 20,
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