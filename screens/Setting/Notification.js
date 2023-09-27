import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SwitchCustom from '../../components/Switch';
import Header from '../../components/SettingItem/header';
import { white } from '../../constant/color';
import { fontSizeMenuTitle } from '../../constant/fontSize';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';

export default function Notification() {
    return (
        <BackgroundImage>
            <Header title="Notification" />
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
                    <Text style={{ paddingVertical: 15, paddingLeft: 10, fontSize: fontSizeMenuTitle }}>
                        Notifications on and off
                    </Text>
                    <View style={{ paddingVertical: 10, backgroundColor: white, flexDirection: 'column' }}>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>Notifications</Text>
                            <SwitchCustom />
                        </View>
                        <Text style={{ color: 'gray', paddingHorizontal: 10 }}>
                            Turn on to get the earliest information!
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
