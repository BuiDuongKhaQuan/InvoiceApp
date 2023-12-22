import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SwitchCustom from '../../components/Switch';
import Header from '../../components/SettingItem/header';
import { white } from '../../constant/color';
import { fontSizeMenuTitle } from '../../constant/fontSize';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { useTranslation } from 'react-i18next';

export default function Notification() {
    const { t } = useTranslation();

    return (
        <BackgroundImage>
            <Header title={t('common:notification')} />
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
                    <Text style={{ paddingVertical: 15, paddingLeft: 10, fontSize: fontSizeMenuTitle }}>
                        {t('common:notify')}
                    </Text>
                    <View style={{ paddingVertical: 10, backgroundColor: white, flexDirection: 'column' }}>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>{t('common:notification')}</Text>
                            <SwitchCustom />
                        </View>
                        <Text style={{ color: 'gray', paddingHorizontal: 10 }}>{t('common:note')}</Text>
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
