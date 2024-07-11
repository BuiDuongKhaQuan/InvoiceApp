import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { white } from '../constant/color';
import { fontSizeDefault } from '../constant/fontSize';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function Setting() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const iconRight = <AntDesign name="arrowright" size={24} color="black" />;

    return (
        <View style={styles.container}>
            <Button
                customStylesBtn={styles.btn}
                customStylesText={styles.text}
                iconLeft={<MaterialIcons name="language" size={24} color="black" />}
                iconRight={iconRight}
                onPress={() => navigation.navigate('Language')}
                text={t('common:language')}
            />
            <Button
                customStylesBtn={styles.btn}
                customStylesText={styles.text}
                iconLeft={<Ionicons name="notifications-outline" size={24} color="black" />}
                iconRight={iconRight}
                onPress={() => navigation.navigate('Notification')}
                text={t('common:notification')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoutContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    logout_btn: {
        marginHorizontal: 10,
        width: '95%',
        borderRadius: 5,
        borderWidth: 0,
        backgroundColor: '#B7B7B7',
        elevation: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        marginVertical: 1,
        backgroundColor: white,
        borderRadius: 0,
        borderWidth: 0,
        width: '100%',
        elevation: 0,
        justifyContent: 'space-between',
    },
    text: {
        color: '#000000',
        fontWeight: 400,
        fontSize: fontSizeDefault,
        textAlign: 'left',
    },
});
