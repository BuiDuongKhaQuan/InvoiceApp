import { StyleSheet, Text, View, StatusBar, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { isValidatePass } from '../utilies/validate';
import Input from '../components/Input';
import Header from '../components/SettingItem/header';
import { backgroundColor } from '../constant/color';

export default function ChangePassword() {
    const [passOld, setPassOld] = useState('');
    const [passNew, setPassNew] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorPassOld, setErrorPassOld] = useState(false);
    const [errorPassNew, setErrorPassNew] = useState(false);
    const [errorConfirmPass, setErrorConfirmPass] = useState(false);

    const isValidateContrinute = () =>
        passOld.length > 0 &&
        errorPassOld == false &&
        passNew.length > 0 &&
        errorPassNew == false &&
        confirmPass > 0 &&
        errorConfirmPass == false &&
        confirmPass == passNew;
    const handlePress = () => {
        // alert(passOld);
        if (!isValidateContrinute()) {
            return;
        } else {
            alert(isValidateContrinute());
        }
    };
    const handleChangePassOld = (text) => {
        setErrorPassOld(!isValidatePass(text));
        setPassOld(text);
    };
    const handleChangePassNew = (text) => {
        setErrorPassNew(!isValidatePass(text));
        setPassNew(text);
    };
    const handleChangeConfirm = (text) => {
        setErrorConfirmPass(passNew != text ? true : false);
        setConfirmPass(text);
    };
    return (
        <View style={styles.container}>
            <Header title="Mật khẩu" />
            <View style={styles.content_center}>
                <Text style={styles.content_title}>Đổi mật khẩu</Text>
                <Input
                    text
                    validate={errorPassOld}
                    validateText="Mật khẩu không đúng"
                    handleChangeText={handleChangePassOld}
                    horder="Mật khẩu cũ"
                    value={passOld}
                />
                <Input
                    text
                    validate={errorPassNew}
                    validateText="Mật khẩu không phải trên 4 kí tự"
                    handleChangeText={handleChangePassNew}
                    horder="Mật khẩu mới"
                    value={passNew}
                />

                <Input
                    text
                    validate={errorConfirmPass}
                    validateText="Mật khẩu không khớp"
                    handleChangeText={handleChangeConfirm}
                    horder="Xac nhận"
                    value={confirmPass}
                />

                <Button
                    onPress={handlePress}
                    customStylesBtn={{ width: 340, height: 50, marginLeft: 24 }}
                    text="Lưu "
                />

                <Text style={styles.forgot}>Quên mật khẩu?</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    content_center: {
        backgroundColor: backgroundColor,
        height: 1000,
    },
    content_title: {
        fontSize: 20,
        marginTop: 30,
        marginLeft: 10,
        marginBottom: 10,
    },

    forgot: {
        marginBottom: 20,
        fontSize: 20,
        color: '#26B819',
        alignItems: 'center',
        textAlign: 'center',
    },
});