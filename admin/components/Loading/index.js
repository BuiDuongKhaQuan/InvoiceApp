import Spinner from 'react-native-loading-spinner-overlay';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { textColor } from '../../constant/color';

export default function Loading({ loading, children, isFullScreen, isFooter, size = 'large' }) {
    const { t } = useTranslation();
    return (
        <>
            {isFullScreen ? (
                <Spinner visible={loading} textContent={t('common:pleaseWait')} textStyle={styles.spinnerTextStyle} />
            ) : (
                <>
                    {loading ? (
                        <View style={isFooter ? styles.footer : styles.container}>
                            <ActivityIndicator size={size} color={textColor} />
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
    footer: {
        marginVertical: 15,
        alignItems: 'center',
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});
