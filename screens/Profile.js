import { StyleSheet, Text, View, Image, Dimensions, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { backgroundColor, white } from '../constant/color';
import { fontSizeDefault } from '../constant/fontSize';

const { width } = Dimensions.get('screen');

export default function Profile() {
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
                    <Text style={styles.tab_text}>Lịch sử</Text>
                    <Text style={styles.tab_text}>Đối tác</Text>
                    <Text style={styles.tab_text}>Yêu thích</Text>
                </View>
            </View>
            <View style={styles.container_bottom}>
                <ScrollView style={styles.bottom_content}>
                    <Text style={styles.bottom_text}>23 dec</Text>
                    <Text style={styles.bottom_text}>Hoàn thành hóa đơn</Text>
                    <Image
                        style={styles.bottom_image}
                        source={{ uri: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg' }}
                    />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
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
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    container_bottom: {
        flex: 3,
        alignItems: 'center',
    },
    bottom_content: {
        width: '90%',
        marginTop: 20,
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
