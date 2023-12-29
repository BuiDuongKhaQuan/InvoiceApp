import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { getInvoiceByKey } from '../Service/api';
import Loading from '../components/Loading';

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const navigation = useNavigation();
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setLoading(true);
        // alert(`${t('common:idcode')} ${type} ${t('common:andData')} ${data} ${t('common:beenScanned')}?`);
        try {
            const response = await getInvoiceByKey(data);
            navigation.navigate('WatchBill', { data: response });
            console.log(response);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                Alert.alert(t('common:error'), error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    if (hasPermission === null) {
        return <Text>{t('common:requestCamara')}</Text>;
    }
    if (hasPermission === false) {
        return <Text>{t('common:noAccess')}</Text>;
    }

    return (
        <View style={styles.container}>
            <Loading loading={loading} isFullScreen />
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
