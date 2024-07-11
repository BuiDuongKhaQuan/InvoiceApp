import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Button from '../Button';
import { styles } from './styles';
import { fontSizeDefault } from '../../constant/fontSize';

export default function Header({ showButton, data, backgroundHide, navigation }) {
    const newStyle = backgroundHide
        ? { ...styles.header, backgroundColor: 'transparent', borderBottomWidth: 0 }
        : styles.header;

    const image = data ? { uri: data.logo } : require('../../assets/images/logo_no_text.png');

    return (
        <View style={newStyle}>
            <TouchableOpacity style={styles.header_left} onPress={() => navigation.navigate('TabNavigator')}>
                <Image style={[styles.logo, data ? styles.radius_90 : {}]} source={image} />
                {data ? (
                    <Text style={{ fontWeight: 'bold', fontSize: fontSizeDefault }}>Công ty: {data.name}</Text>
                ) : (
                    <Image style={styles.logo_text} source={require('../../assets/images/logo_text.png')} />
                )}
                {/* <Text style={styles.title}>Invoice</Text> */}
            </TouchableOpacity>
            {showButton && (
                <Button
                    iconRight={require('../../assets/icons/menu.png')}
                    customStylesText={styles.text}
                    customStylesBtn={styles.btn}
                />
            )}
        </View>
    );
}
