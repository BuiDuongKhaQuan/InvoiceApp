import { StyleSheet, Text, View, Image, Dimensions, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Button from '../../components/Button';
import { backgroundColor, white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';
import SettingItem from '../../components/SettingItem';

const { width } = Dimensions.get('screen');

export default function ProfileCompany() {
    const [itemSetting, setItemSetting] = useState([
        {
            id: '1',
            title: 'Nhân viên',
        },
        {
            id: '2',
            title: 'Hóa đơn',
        },
        {
            id: '3',
            title: 'Thống kê',
        },
        {
            id: '4',
            title: 'Mẫu hóa đơn',
        },
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.container_top}>
                <View style={styles.image}>
                    <Image
                        style={styles.img_default}
                        source={{ uri: 'https://www.chudu24.com/wp-content/uploads/2017/03/canh-dep-nhat-ban-5.jpg' }}
                    />
                    <Button style={styles.setting_icon} iconLeft={require('../../assets/icons/setting.png')} />
                </View>
                <View style={styles.top_avatar}>
                    <View style={styles.top_}>
                        <Image style={styles.avatar} source={require('../../assets/icons/account.png')} />
                        <Text style={styles.name}>Khả Quân</Text>
                    </View>
                    <Button
                        customStylesBtn={styles.edit_btn}
                        customStylesText={styles.btn_text}
                        iconLeft={require('../../assets/icons/edit.png')}
                        text="Chỉnh sửa"
                    />
                </View>
            </View>
            <View style={styles.container_center}>
                <View style={styles.btn}>
                    <View style={styles.text_centent}>
                        <Text style={styles.text_bold}>Doanh nghiệp: 1 thành viên</Text>
                        <Text style={styles.text_bold}>Địa chỉ: 1 thành viên</Text>
                        <Text style={styles.text_bold}>SĐT: 1 thành viên</Text>
                        <Text style={styles.text_bold}>Email: 1 thành viên</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container_bottom}>
                <Button
                    iconRight={require('../../assets/icons/arrow-icon-1182.png')}
                    customStylesBtn={styles.btn_manage}
                    customStylesText={styles.btn_text_line}
                    text="Quản lý"
                />
                <FlatList
                    data={itemSetting}
                    renderItem={({ item }) => (
                        <Button
                            customStylesBtn={styles.btn_manage}
                            customStylesText={{ ...styles.btn_text_line, width: '100%' }}
                            text={item.title}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
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
        width: '100%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_centent: {
        width: '90%',
    },
    text_bold: {
        fontWeight: 'bold',
        marginVertical: 2,
        fontSize: fontSizeDefault,
    },
    tab_text: {
        fontSize: fontSizeDefault,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    container_bottom: {
        flex: 2.2,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn_manage: {
        marginVertical: 1,
        backgroundColor: white,
        width: '100%',
        justifyContent: 'space-between',
        borderRadius: 0,
        borderWidth: 0,
        elevation: 0,
    },
    btn_text_line: {
        color: 'black',
        fontWeight: '100',
        fontSize: fontSizeDefault,
    },
});
