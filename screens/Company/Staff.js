import { StatusBar, StyleSheet, Text, View, Image, Modal, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Input from '../../components/Input';
import Header from '../../components/SettingItem/header';
import { fontSizeDefault } from '../../constant/fontSize';
import Button from '../../components/Button';
import { useUserContext } from '../UserContext';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AntDesign, Feather, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { getUserByCompanyName, getUserByName, updateStatus } from '../../Service/api';
import Loading from '../../components/Loading';
import { white } from '../../constant/color';
import ImageBackground from '../../layouts/DefaultLayout/BackgroundImage';

export default function Staff({ navigation }) {
    const { state } = useUserContext();
    const { t } = useTranslation();
    const [staffs, setStaffs] = useState([]);
    const [error, setError] = useState(null);
    const [nameStaff, setNameStaff] = useState('');
    const [infStaff, setInfStaff] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataModel, setDataModel] = useState();
    const [user, setUser] = useState(dataModel);
    const [buttonText, setButtonText] = useState('');
    const [page, setPage] = useState(1);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await getUserByName(nameStaff);
            setInfStaff(response);
        } catch (error) {
            setError(t('common:errorStaff'));
            setInfStaff(null);
        } finally {
            setLoading(false);
        }
    };
    const getInformationStaff = async (page) => {
        try {
            setLoading(true);
            const response = await getUserByCompanyName(state.company.name, 20, page);
            setStaffs(response);
        } catch (error) {
            setError(t('common:datanotCompany'));
            setStaffs(null);
            if (error.response) {
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getInformationStaff(page);
    }, [page]);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20; // Đặt một giá trị padding để xác định khi nào là cuối trang

        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            // Nếu đã cuộn đến cuối, tăng số trang lên 1 để fetch dữ liệu trang tiếp theo
            setPage((prevPage) => prevPage + 1);
        }
    };
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = (data) => {
        if (data.status === 1) {
            setButtonText(t('common:lock'));
        }
        if (data.status === 2) {
            setButtonText(t('common:unLock'));
        }
        setDataModel(data);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const handleLockup = async () => {
        setLoading(true);
        try {
            const s = dataModel.status;

            if (s === 1) {
                setButtonText(t('common:unLock'));
                console.log(buttonText);
                const response = await updateStatus(dataModel.id, 2);
                setUser(response);
            }
            if (s === 2) {
                setButtonText(t('common:lock'));
                console.log(buttonText);
                const response = await updateStatus(dataModel.id, 1);
                setUser(response);
            }
            hideModal();
            getInformationStaff();
        } catch (error) {
            console.log(error.message);
            Alert.alert(t('common:error'), t('common:transmissionError'));
        } finally {
            setLoading(false);
        }
    };
    return (
        <ImageBackground>
            <Header title={t('common:staff')} />
            <View style={styles.container_input}>
                <Input
                    iconLeft={<Feather name="search" size={24} color="black" />}
                    customStylesContainer={styles.input}
                    holder={'Tìm kím theo tên, email, phone'}
                    value={nameStaff}
                    onChangeText={(text) => setNameStaff(text)}
                    onSubmitEditing={handleSearch}
                    iconRight={<Ionicons name="ios-qr-code-outline" size={24} color="black" />}
                />
            </View>
            <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                <View style={styles.currentScreen}>
                    {nameStaff === ''
                        ? staffs.map((staff1, index) => (
                              <View style={styles.icontilte} key={index}>
                                  <Image
                                      style={styles.icon}
                                      source={
                                          staff1.image == null
                                              ? require('../../assets/images/default-avatar.png')
                                              : { uri: staff1.image }
                                      }
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
                                      source={
                                          staff1.image == null
                                              ? require('../../assets/images/default-avatar.png')
                                              : { uri: staff1.image }
                                      }
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
                    <Loading loading={loading} isFooter></Loading>
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
                                    <Text style={styles.title}>{t('common:option')}</Text>
                                </View>
                                <Button
                                    customStylesBtn={styles.modalOption}
                                    customStylesText={styles.textBtn}
                                    text={t('common:information')}
                                    onPress={() => {
                                        navigation.navigate('Information', { dataModel: dataModel });
                                    }}
                                />
                                <Button
                                    customStylesBtn={styles.modalOption}
                                    customStylesText={styles.textBtn}
                                    text={t('common:chat')}
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
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container_input: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
    },
    input: {
        height: 50,
        borderWidth: 2,
        borderColor: white,
        backgroundColor: '#C9C9C9',
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
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
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
