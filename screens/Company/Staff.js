import { StatusBar, StyleSheet, Text, View, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import Input from '../../components/Input';
import Header from '../../components/SettingItem/header';
import { fontSizeDefault } from '../../constant/fontSize';
import Button from '../../components/Button';
import { useUserContext } from '../UserContext';
import { useEffect } from 'react';

import { AntDesign, Feather, SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function Staff({ navigation }) {
    const { state } = useUserContext();
    const [staffs, setStaffs] = useState([]);
    const [error, setError] = useState(null);
    const [nameStaff, setNameStaff] = useState('');
    const [infStaff, setInfStaff] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `http://bill-rest.ap-southeast-2.elasticbeanstalk.com/api/v1/auth/users?name=${nameStaff}`,
            );
            setInfStaff(response.data);

            const d = response.data;
            console.log(response.data);
        } catch (error) {
            setError('Nhân viên không tồn tại');
            setInfStaff(null);
        }
    };
    useEffect(() => {
        const getInformationStaff = async () => {
            try {
                const response = await axios.get(
                    `http://bill-rest.ap-southeast-2.elasticbeanstalk.com/api/v1/auth/users?companyName=${state.company.name}`,
                );
                setStaffs(response.data);
            } catch (error) {
                setError('Công ty này khồng có dữu liệu');
                setStaffs(null);
                if (error.response) {
                }
            }
        };
        getInformationStaff();
    });
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };
    const inf = () => {
        navigation.navigate('Information');
    };

    return (
        <View style={styles.container}>
            <Header title="Nhân viên" />
            <Input
                iconLeft={<Feather name="search" size={24} color="black" />}
                customStylesContainer={styles.input}
                value={nameStaff}
                onChangeText={(text) => setNameStaff(text)}
                onSubmitEditing={handleSearch}
            />
            <View style={styles.currentScreen}>
                {nameStaff === ''
                    ? staffs.map((staff1, index) => (
                          <View style={styles.icontilte} key={index}>
                              <Image
                                  style={styles.icon}
                                  source={{
                                      uri: staff1.image,
                                  }}
                              />
                              <Text style={styles.text}>{staff1.name}</Text>
                              <SimpleLineIcons
                                  name="options"
                                  size={24}
                                  color="black"
                                  style={styles.iconOption}
                                  onPress={showModal}
                              />
                          </View>
                      ))
                    : infStaff.map((staff1, index) => (
                          <View style={styles.icontilte} key={index}>
                              <Image
                                  style={styles.icon}
                                  source={{
                                      uri: staff1.image,
                                  }}
                              />
                              <Text style={styles.text}>{staff1.name}</Text>
                              <SimpleLineIcons
                                  name="options"
                                  size={24}
                                  color="black"
                                  style={styles.iconOption}
                                  onPress={showModal}
                              />
                          </View>
                      ))}
            </View>
            <Modal animationType="slide" transparent={true} visible={modalVisible} onBackdropPress={hideModal}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContainer1}>
                            <View style={styles.modalContent}>
                                <View>
                                    <Button
                                        onPress={hideModal}
                                        customStylesIcon={styles.icon_close}
                                        iconLeft={<AntDesign name="close" size={20} color="black" />}
                                    />
                                </View>
                                <Text style={styles.title}>Tùy chọn</Text>
                            </View>
                            <Button
                                customStylesBtn={styles.modalOption}
                                customStylesText={styles.textBtn}
                                text="Thông tin"
                                onPress={inf}
                            />
                            <Button
                                customStylesBtn={styles.modalOption}
                                customStylesText={styles.textBtn}
                                text="Chat"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    input: {
        width: '90%',
        height: 50,
        borderColor: 'white',
        backgroundColor: '#C9C9C9',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        flex: 1,
        width: 50,
        height: 50,
        borderRadius: 24,
        marginBottom: '2%',
    },

    icontilte: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    currentScreen: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    text: {
        flex: 4,
        marginTop: 10,
        fontSize: fontSizeDefault,
        marginLeft: 20,
    },

    iconOption: { flex: 1, marginLeft: 'auto', width: 50, height: 50, justifyContent: 'flex-end' },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer1: {
        backgroundColor: 'white',
    },
    modalContent: {
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        textAlign: 'center',
    },
    icon_close: {
        width: 20,
        height: 20,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalOption: {
        fontSize: 16,
        backgroundColor: 'white',
        width: '100%',
        marginVertical: 10,
        borderRadius: 24,
    },
    modalBackground: {
        backgroundColor: 'red',
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
    },
    textBtn: {
        color: 'black',
        fontSize: 16,
    },
    iconOption: {
        width: 50,
        height: 50,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -5,
    },
});
