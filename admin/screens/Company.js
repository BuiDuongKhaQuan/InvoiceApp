import { StyleSheet, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { AntDesign, Feather, Ionicons, Foundation, Entypo, FontAwesome } from '@expo/vector-icons';
import { Row, Rows, Table, TableWrapper } from 'react-native-reanimated-table';
import { getAllCompanies, getCompaniesByName, getCompaniesByStatus } from '../Service/api';
import { exportExcel } from '../utilies/export';
import Popup from '../components/Popup/company';
import Loading from '../components/Loading';
import SelectDropdown from 'react-native-select-dropdown';
import { useTranslation } from 'react-i18next';

export default function Company() {
    const { t } = useTranslation();
    const [dataPopup, setDataPopup] = useState();
    const [visible, setVisible] = useState(false);
    const [nameSearch, setNameSearch] = useState('');
    const [companys, setCompanys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [page, setPage] = useState(1);
    const type = [
        {
            title: t('common:all'),
            index: 3,
        },
        {
            title: t('common:active'),
            index: 1,
        },
        {
            title: t('common:delete'),
            index: 2,
        },
    ];
    const getCompany = async (page) => {
        setLoading(true);
        try {
            const data = await getAllCompanies(25, page);
            setCompanys((prev) => [...prev, ...data]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getCompany(page);
    }, [page]);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20; // Đặt một giá trị padding để xác định khi nào là cuối trang

        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            // Nếu đã cuộn đến cuối, tăng số trang lên 1 để fetch dữ liệu trang tiếp theo
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleFilter = async (status) => {
        setLoading(true);
        try {
            if (status === 3) {
                const response = await getAllCompanies(25, page);
                const data = response;
                setCompanys(data);
            } else {
                const response = await getCompaniesByStatus(status);
                const data = response;
                setCompanys(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handleExportExcel = async () => await exportExcel(companys, 'Company');
    const handleSearch = async () => {
        try {
            const response = await getCompaniesByName(nameSearch);
            const data = response;
            setCompanys(data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleCreate = () => {
        setVisibleCreate(true);
    };
    const ActionButton = ({ data }) => (
        <TouchableOpacity
            onPress={() => {
                setDataPopup(data);
                setVisible(true);
            }}
            style={styles.action}
        >
            <Foundation name="indent-more" size={24} color="green" />
        </TouchableOpacity>
    );
    const StatusView = ({ data }) => {
        let icon;

        if (data.status === 1) {
            icon = <FontAwesome name="check" size={17} color="green" />;
        }
        if (data.status === 2) {
            icon = <FontAwesome name="remove" size={17} color="red" />;
        }

        return <View style={styles.action}>{icon}</View>;
    };
    const headers = [t('common:no'), t('common:company'), t('common:phone'), '', ''];
    const data = () =>
        companys.map((company) => [
            company.id,
            company.name,
            company.phone,
            <StatusView data={company} />,
            <ActionButton data={company} />,
        ]);

    const handleClose = () => {
        setVisible(false);
        setDataPopup(null);
    };

    return (
        <View style={styles.container}>
            {dataPopup && <Popup visible={visible} onClose={handleClose} data={dataPopup} />}
            <Popup visible={visibleCreate} onClose={() => setVisibleCreate(false)} create />
            <Input
                holder={t('common:searchCompany')}
                iconLeft={<Feather name="search" size={21} color="black" />}
                customStylesContainer={{
                    borderRadius: 0,
                    height: 50,
                    width: '100%',
                    marginHorizontal: 0,
                }}
                customStylesInput={{
                    fontSize: 12,
                    marginLeft: 10,
                }}
                value={nameSearch}
                onChangeText={(name) => setNameSearch(name)}
                onSubmitEditing={handleSearch}
            />
            <View style={styles.container_top}>
                <View style={styles.btns}>
                    <Button
                        text={t('common:createCompany')}
                        onPress={handleCreate}
                        iconLeft={<AntDesign name="plus" size={17} color="black" />}
                        customStylesBtn={{
                            width: '35%',
                            height: '100%',
                            marginVertical: 5,
                            backgroundColor: '#59f759',
                            borderRadius: 4,
                        }}
                        customStylesText={styles.btnText}
                        customStylesIcon={styles.icon_btn}
                    />
                    <Button
                        text={t('common:exportExcel')}
                        onPress={handleExportExcel}
                        iconLeft={<AntDesign name="export" size={17} color="black" />}
                        customStylesBtn={{
                            width: '35%',
                            height: '100%',
                            marginLeft: 5,
                            marginVertical: 5,
                            backgroundColor: '#00ffed',
                            borderRadius: 4,
                        }}
                        customStylesText={styles.btnText}
                        customStylesIcon={styles.icon_btn}
                    />
                    <View
                        style={{
                            width: '30%',
                        }}
                    >
                        <SelectDropdown
                            data={type}
                            onSelect={(selectedItem, index) => {
                                handleFilter(selectedItem.index);
                            }}
                            buttonStyle={styles.dropdown_btn}
                            defaultButtonText={t('common:select')}
                            renderDropdownIcon={() => <Entypo name="chevron-small-down" size={24} color="black" />}
                            dropdownIconPosition="right"
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.title;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.title;
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.container_center}>
                <ScrollView style={{ marginHorizontal: 10 }} onScroll={handleScroll} scrollEventThrottle={16}>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row
                            data={headers}
                            style={{
                                backgroundColor: 'lightgray',
                            }}
                            height={25}
                            flexArr={[0.5, 2, 2, 0.4, 0.4]}
                            textStyle={styles.tableheader}
                        />
                        <TableWrapper>
                            <Rows
                                data={data()}
                                flexArr={[0.5, 2, 2, 0.4, 0.4]}
                                heightArr={25}
                                textStyle={styles.tableheader}
                            />
                        </TableWrapper>
                    </Table>
                    <Loading loading={loading} isFooter></Loading>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    action: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    container_top: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 7,
    },
    btn: {
        marginRight: 5,
        height: '100%',
        flex: 1,
        borderRadius: 4,
        marginVertical: 4,
    },
    btnText: {
        fontSize: 14,
        color: 'black',
        marginRight: 5,
    },
    icon_btn: {
        marginHorizontal: 5,
    },
    container_center: {
        flex: 20,
    },
    center_top: {
        flex: 1,
        flexDirection: 'row',
    },
    center_drop: {
        flex: 1.4,
        marginLeft: 10,
    },
    center_input: {
        flex: 3,
        marginHorizontal: 10,
    },
    input: {
        marginVertical: 0,
        height: '50%',
        width: '97%',
        justifyContent: 'center',
    },
    input_text: {
        height: '100%',
        marginVertical: 0,
        marginHorizontal: 15,
    },
    center_bottom: {
        flex: 6,
    },
    drop: {
        flex: 1,
        width: '100%',
    },

    tableheader: {
        textAlign: 'center',
    },
    table: {
        flex: 6,
    },
    dropdown_btn: {
        height: 30,
        width: '80%',
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: 'yellow',
    },
    action: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
