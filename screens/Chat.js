import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native';
import { Fontisto, SimpleLineIcons, Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import Input from '../components/Input';
import { white } from '../constant/color';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import BackgroundImage from '../layouts/DefaultLayout/BackgroundImage';
export default function Chat({ navigation }) {
    const [showkeyboard, setShowkeyboard] = useState(false);
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // Loại tệp tin bạn muốn chọn (ví dụ: PDF)
                copyToCacheDirectory: false, // Set true nếu bạn muốn sao chép tệp tới cache directory của ứng dụng
            });

            if (result.type === 'success') {
                console.log(`Selected document: ${result.name} - size: ${result.size} bytes`);
                // Bạn có thể làm gì đó với tệp tin đã chọn ở đây
            } else if (result.type === 'cancel') {
                console.log('Document picking cancelled');
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    };

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setShowkeyboard(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setShowkeyboard(false);
        });
    });

    const bottomStyle = showkeyboard ? { ...styles.container_bottom, flex: 2 } : { ...styles.container_bottom };

    return (
        <View style={styles.container}>
            <BackgroundImage>
                <Header navigation={navigation} />
                <View style={styles.container_center}></View>
                <View style={bottomStyle}>
                    <View style={styles.bottom_left}>
                        <TouchableOpacity onPress={pickDocument}>
                            <SimpleLineIcons name="folder" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickImage}>
                            <Fontisto name="picture" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom_center}>
                        <Input customStylesContainer={styles.input} customStylesInput={styles.inputLetter} />
                    </View>
                    <View style={styles.bottom_right}>
                        <TouchableOpacity>
                            <Ionicons name="ios-send" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </BackgroundImage>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_center: {
        flex: 10,
    },
    container_bottom: {
        flex: 1.4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0,0.3)',
    },
    bottom_left: {
        flex: 1.3,
        marginLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottom_center: {
        flex: 5,
        justifyContent: 'center',
    },
    input: {
        width: '95%',
        height: 45,
        justifyContent: 'center',
        borderWidth: 1,
        elevation: 0,
    },
    inputLetter: {
        width: '88%',
        height: 20,
        fontSize: 18,
        marginHorizontal: 15,
    },
    bottom_right: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
