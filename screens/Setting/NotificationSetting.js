import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../components/SettingItem/header';
import SwitchCustom from '../../components/Switch';
import { backgroundColor, white } from '../../constant/color';
import { fontSizeMenuTitle } from '../../constant/fontSize';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';

export default function NotificationSetting() {
    return (
        <BackgroundImage>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Header title="Thiết lập" />
                <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
                    <Text style={{ paddingVertical: 15, paddingLeft: 10, fontSize: fontSizeMenuTitle }}>
                        Cài đặt thông báo
                    </Text>
                    <View style={{ paddingVertical: 10, backgroundColor: white, flexDirection: 'column' }}>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>Thông báo</Text>
                            <SwitchCustom />
                        </View>
                        <Text style={{ color: 'gray', paddingHorizontal: 10 }}>Bật để có thông tin sớm nhất</Text>
                    </View>
                </View>
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({});
