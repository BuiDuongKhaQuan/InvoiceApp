import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useTranslation } from 'react-i18next';

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`${t('common:idcode')} ${type} ${t('common:andData')} ${data} ${t('common:beenScanned')}?`);
        console.log(data);
    };

    if (hasPermission === null) {
        return <Text>{t('common:requestCamara')}</Text>;
    }
    if (hasPermission === false) {
        return <Text>{t('common:noAccess')}</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                // style={StyleSheet.absoluteFillObject}
                style={styles.camera}
            />
            {scanned && <Button title={t('common:againScan')} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0,0.1)',
    },
});
