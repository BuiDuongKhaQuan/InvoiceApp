import { StyleSheet, Text, Switch, View } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SwitchCustom({ status, isEnabled, toggleSwitch }) {
    const { t } = useTranslation();

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Switch
                trackColor={{ false: '#767577', true: '#7fff00' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            {status && (
                <Text style={{ marginLeft: 10 }}>
                    {t('common:status')}: {isEnabled ? t('common:turnon') : t('common:turnoff')}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({});
