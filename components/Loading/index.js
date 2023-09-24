import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet } from 'react-native';
import React from 'react';

export default function Loading({ loading }) {
    return <Spinner visible={loading} textContent={'Please wait...'} textStyle={styles.spinnerTextStyle} />;
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
    },
});
