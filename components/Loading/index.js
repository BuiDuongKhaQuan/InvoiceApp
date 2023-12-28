import Spinner from 'react-native-loading-spinner-overlay';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { textColor } from '../../constant/color';

export default function Loading({ loading, children, isFullScreen }) {
    const { t } = useTranslation();
    return (
        <>
            {isFullScreen ? (
                <Spinner visible={loading} textContent={t('common:pleaseWait')} textStyle={styles.spinnerTextStyle} />
            ) : (
                <>
                    {loading ? (
                        <View style={styles.container}>
                            <ActivityIndicator size="large" color={textColor} />
                        </View>
                    ) : (
                        children
                    )}
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 150,
    },

    spinnerTextStyle: {
        color: '#FFF',
    },
});
