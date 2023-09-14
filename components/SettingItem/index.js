import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../Button';

export default function SettingItem({ data }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tài khoản</Text>
            <Button
                customStylesBtn={{ justifyContent: 'space-between' }}
                iconLeft={require('../../assets/icons/account.png')}
                iconRight={require('../../assets/icons/right-arrow.png')}
                text="Thông tin và liên hệ"
            />
            <Button
                customStylesBtn={{ justifyContent: 'space-between' }}
                iconLeft={require('../../assets/icons/account.png')}
                iconRight={require('../../assets/icons/right-arrow.png')}
                text="Thông tin và liên hệ"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#E4E8E5' },
});
