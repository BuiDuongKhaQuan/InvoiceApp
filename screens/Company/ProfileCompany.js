import { StyleSheet, Text, View, Image, Dimensions, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { backgroundColor, white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';
import { AntDesign, MaterialCommunityIcons, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../UserContext';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('screen');

export default function ProfileCompany() {
    const { t } = useTranslation();
    const { state } = useUserContext();
    const { user, company } = state;
    const navigation = useNavigation();
    const [itemSetting, setItemSetting] = useState([
        {
            id: '1',
            title: t('common:staff'),
            icon: <AntDesign name="team" size={30} color="black" />,
            router: 'Staff',
        },
        {
            id: '2',
            title: t('common:bills'),
            icon: <AntDesign name="filetext1" size={30} color="black" />,
            router: 'Bills',
        },
        {
            id: '3',
            title: t('common:statisticals'),
            icon: <Ionicons name="bar-chart-outline" size={30} color="black" />,
            router: 'Statistical',
        },
        {
            id: '4',
            title: t('common:billSample'),
            icon: <Ionicons name="newspaper-outline" size={30} color="black" />,
            router: 'BillSample',
        },
        {
            id: '5',
            title: t('common:product'),
            icon: <AntDesign name="profile" size={30} color="black" />,
            router: 'Products',
        },
    ]);

    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={styles.container_top}>
                    <View style={styles.image}>
                        <Image
                            style={styles.img_default}
                            source={
                                user.wallpaper == null
                                    ? require('../../assets/images/default-wallpaper.png')
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
                                        ? require('../../assets/images/default-avatar.png')
                                        : { uri: user.image }
                                }
                            />
                            <Text style={styles.name}>{user.name}</Text>
                        </View>
                        <Button
                            customStylesBtn={styles.edit_btn}
                            customStylesText={styles.btn_text}
                            onPress={() => navigation.navigate('Setting')}
                            iconLeft={<AntDesign name="setting" size={24} color="black" />}
                            text={t('common:setting')}
                        />
                    </View>
                </View>
                <View style={styles.container_center}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CompanyInfo')}>
                        <View style={styles.text_centent}>
                            <Text style={styles.text_bold}>
                                {t('common:corporation')}: {company.name}
                            </Text>
                            <Text style={styles.text_bold}>
                                {t('common:addressInvoice')}: {company.address}
                            </Text>
                            <Text style={styles.text_bold}>
                                {t('common:phone')}: {company.phone}
                            </Text>
                            <Text style={styles.text_bold}>Email: {company.email}</Text>
                        </View>
                        <View style={styles.logo}>
                            <Image
                                style={styles.avatar}
                                source={
                                    company.logo == null
                                        ? require('../../assets/images/default-avatar.png')
                                        : { uri: company.logo }
                                }
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.container_bottom}>
                    <Button
                        iconLeft={<MaterialCommunityIcons name="office-building-cog-outline" size={30} color="black" />}
                        iconRight={<Feather name="arrow-down-circle" size={30} color="black" />}
                        customStylesIcon={{ width: '10%' }}
                        customStylesBtn={styles.btn_manage}
                        customStylesText={{
                            ...styles.btn_text_line,
                            fontWeight: 'bold',
                            fontSize: fontSizeDefault + 5,
                        }}
                        text={t('common:manager')}
                    />
                    <FlatList
                        data={itemSetting}
                        renderItem={({ item }) => (
                            <Button
                                customStylesBtn={{ ...styles.btn_manage, paddingHorizontal: 10 }}
                                customStylesIcon={styles.icon_btn}
                                customStylesText={{ ...styles.btn_text_line, width: '100%' }}
                                onPress={() => navigation.navigate(item.router)}
                                text={item.title}
                                iconLeft={item.icon}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
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
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 50,
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
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
    },
    container_center: {
        flex: 0.8,
        marginTop: 10,
        alignItems: 'center',
    },
    btn: {
        flex: 2,
        width: '90%',
        marginTop: 10,
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text_centent: {
        flex: 2,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'space-between',
        borderRadius: 0,
        borderWidth: 0,
        elevation: 0,
    },
    btn_text_line: {
        color: 'black',
        fontWeight: '100',
        textAlign: 'left',
        fontSize: fontSizeDefault,
    },
    icon_btn: {
        width: '5%',
        justifyContent: 'center',
        alignItems: 'right',
    },
});
