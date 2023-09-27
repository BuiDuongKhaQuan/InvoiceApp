import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Entypo } from '@expo/vector-icons';
import { fontSizeDefault } from '../../constant/fontSize';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import Header from '../../components/SettingItem/header';
import * as ImagePicker from 'expo-image-picker';
import { updateAvatar } from '../../Service/api';
import { useUserContext } from '../UserContext';

export default function Information() {
    const genders = ['Male', 'Female'];
    const [image, setImage] = useState(null);
    const { state } = useUserContext();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        setImage(result.assets[0].uri);
    };

    const upAvatar = async () => {
        try {
            await updateAvatar(state.user.id, image);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <BackgroundImage>
            <Header title="Information" />
            <ScrollView style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.image}>
                        <Image
                            style={styles.avatar_img}
                            source={{
                                uri: image
                                    ? image
                                    : 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/348464898_612727004250189_6267958016901660133_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=KQnRkH45wocAX9J0eEN&_nc_ht=scontent.fsgn2-9.fna&_nc_e2o=s&oh=00_AfC-TL8j4ktTEogegxuA3VS9MriZpb6eN7VdB4Fo9QfUyg&oe=6516C49C',
                            }}
                        />
                        <Button
                            text="Change avatar"
                            onPress={pickImage}
                            customStylesText={styles.text}
                            customStylesBtn={{ ...styles.change_btn, height: '37%' }}
                        />
                    </View>
                    <View style={styles.image}>
                        <Image
                            style={styles.wallpaper_img}
                            source={{
                                uri: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/348464898_612727004250189_6267958016901660133_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=KQnRkH45wocAX9J0eEN&_nc_ht=scontent.fsgn2-9.fna&_nc_e2o=s&oh=00_AfC-TL8j4ktTEogegxuA3VS9MriZpb6eN7VdB4Fo9QfUyg&oe=6516C49C',
                            }}
                        />
                        <Button
                            text="Change wallpaper"
                            customStylesText={styles.text}
                            customStylesBtn={styles.change_btn}
                        />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Name:</Text>
                        <Input customStylesContainer={styles.container_input} holder="Bui Duong Kha Quan" />
                    </View>
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Email:</Text>
                        <Input customStylesContainer={styles.container_input} holder="khaquan9a2.2016@gmail.com" />
                    </View>
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Phone:</Text>
                        <Input customStylesContainer={styles.container_input} holder="0132456789" />
                    </View>
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Birthday:</Text>
                        <Input customStylesContainer={styles.container_input} holder="29/08/2002" />
                    </View>
                    <View style={styles.bottom_item}>
                        <Text style={styles.text}>Gender:</Text>
                        <View style={styles.dropdown}>
                            <SelectDropdown
                                data={genders}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                }}
                                buttonStyle={styles.dropdown_btn}
                                defaultButtonText="Gender"
                                renderDropdownIcon={() => <Entypo name="chevron-small-down" size={24} color="black" />}
                                dropdownIconPosition="right"
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item;
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.btn}>
                    <Button text="Save" onPress={upAvatar} />
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    top: {
        flex: 2,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    image: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex--start',
        alignItems: 'center',
    },
    avatar_img: {
        width: 100,
        height: 100,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'gray',
        resizeMode: 'stretch',
        marginHorizontal: 10,
    },
    wallpaper_img: {
        width: 100,
        height: 70,
        borderWidth: 1,
        borderColor: 'gray',
        resizeMode: 'stretch',
        marginHorizontal: 10,
    },
    change_btn: {
        flex: 0.6,
        width: '70%',
        height: '54%',
        borderRadius: 5,
    },
    bottom: {
        flex: 3,
        marginTop: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom_item: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text: {
        fontWeight: 'bold',
        fontSize: fontSizeDefault,
    },
    container_input: {
        height: '50%',
        paddingHorizontal: 10,
        marginBottom: 0,
        elevation: 0,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
    },
    dropdown: {
        marginHorizontal: 10,
    },
    dropdown_btn: {
        height: '70%',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    btn: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
