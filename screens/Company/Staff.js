import { StatusBar, StyleSheet, Text, View, Image, Modal, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Input from '../../components/Input';
import Header from '../../components/SettingItem/header';
import { fontSizeDefault } from '../../constant/fontSize';
import Button from '../../components/Button';
import { useUserContext } from '../UserContext';
import { useEffect } from 'react';

import { AntDesign, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { getUserByCompanyName, getUserByName, updateStatus } from '../../Service/api';
import Loading from '../../components/Loading';

export default function Staff({ navigation }) {
    const { state } = useUserContext();

    const [staffs, setStaffs] = useState([]);
    const [error, setError] = useState(null);
    const [nameStaff, setNameStaff] = useState('');
    const [infStaff, setInfStaff] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataModel, setDataModel] = useState();
    const [user, setUser] = useState(dataModel);
    const [buttonText, setButtonText] = useState('');
    const handleSearch = async () => {
        try {
            const response = await getUserByName(nameStaff);
            setInfStaff(response);
        } catch (error) {
            setError('Staff does not exist');
            setInfStaff(null);
        }
    };
    const getInformationStaff = async () => {
        try {
            const response = await getUserByCompanyName(state.company.name);
            setStaffs(response);
        } catch (error) {
            setError('This company has no data');
            setStaffs(null);
            if (error.response) {
            }
        }
    };

    const [modalVisible, setModalVisible] = useState(false);

    const showModal = (data) => {
        setDataModel(data);
        setModalVisible(true);
        if (data.status === 1) {
            setButtonText('Lock');
        } else if (data.status === 2) {
            setButtonText('Unlock');
        }
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            setModalVisible(false);
            getInformationStaff();
        });

        return () => {
            focusListener();
        };
    }, [navigation]);
    const [newStatus, setNewStatus] = useState();
    const handleLockup = async () => {
        setLoading(true);
        try {
            const s = dataModel.status;
            let updatedStatus;

            if (s === 1) {
                const response = await updateStatus(dataModel.id, 2);
                setUser(response);
                updatedStatus = 2;
                console.log(user);
            } else if (s === 2) {
                const response = await updateStatus(dataModel.id, 1);
                setUser(response);
                updatedStatus = 1;
                console.log(user);
            }

            hideModal();
            setNewStatus(updatedStatus);
            console.log(user);
            if (updatedStatus === 1) {
                setButtonText('Lock');
            } else if (updatedStatus === 2) {
                setButtonText('Unlock');
            }
            hideModal();
            getInformationStaff();
        } catch (error) {
            console.log(error.message);
            Alert.alert('Error', 'Transmission error, please try again later!');
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <Loading loading={loading} />
            <Header title="Staff" />
            <Input
                iconLeft={<Feather name="search" size={24} color="black" />}
                customStylesContainer={styles.input}
                value={nameStaff}
                onChangeText={(text) => setNameStaff(text)}
                onSubmitEditing={handleSearch}
            />
            <ScrollView>
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
                                      onPress={() => showModal(staff1)}
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
                                      onPress={() => showModal(staff1)}
                                  />
                              </View>
                          ))}
                </View>
                <Modal animationType="slide" transparent={true} visible={modalVisible} onBackdropPress={showModal}>
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
                                    <Text style={styles.title}>Options</Text>
                                </View>
                                <Button
                                    customStylesBtn={styles.modalOption}
                                    customStylesText={styles.textBtn}
                                    text="Information"
                                    onPress={() => {
                                        navigation.navigate('Information', { dataModel: dataModel });
                                    }}
                                />
                                <Button
                                    customStylesBtn={styles.modalOption}
                                    customStylesText={styles.textBtn}
                                    text="Chat"
                                />
                                <Button
                                    customStylesBtn={styles.modalOption}
                                    customStylesText={styles.textBtn}
                                    text={buttonText}
                                    onPress={handleLockup}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
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
