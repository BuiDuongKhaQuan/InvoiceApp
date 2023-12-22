import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Loading({ loading }) {
    const { t } = useTranslation();

    return <Spinner visible={loading} textContent={t('common:pleaseWait')} textStyle={styles.spinnerTextStyle} />;
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
    },
});
