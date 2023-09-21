import { StyleSheet, ImageBackground } from 'react-native';
import React from 'react';

export default function BackgroundImage({ children }) {
    return (
        <ImageBackground
            resizeMode="cover"
            source={require('../../../assets/images/backgroundImage.jpg')}
            style={styles.container}
        >
            {children}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
