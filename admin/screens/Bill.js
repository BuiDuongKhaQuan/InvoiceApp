import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { AntDesign, Feather, Ionicons, Entypo } from '@expo/vector-icons';
import { Row, Rows, Table, TableWrapper } from 'react-native-reanimated-table';
import { deleteInvoiceById, getAllCompanies, getAllInvoice1, getInvoiceByCompanyName } from '../Service/api';
import { exportExcel } from '../utilies/export';
import Loading from '../components/Loading';
import SelectDropdown from 'react-native-select-dropdown';
import { useTranslation } from 'react-i18next';

export default function Company() {
    const { t } = useTranslation();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [companys, setCompanys] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [page, setPage] = useState(1);

    const getInvoices = async (page) => {
        setLoading(true);
        try {
            const data = await getAllInvoice1(25, page);
            const data1 = await getAllCompanies(25, page);
            setCompanys((prevData1) => [...prevData1, ...data1]);
            setInvoices((prevData) => [...prevData, ...data]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getInvoices(page);
    }, [page]);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20; // Đặt một giá trị padding để xác định khi nào là cuối trang

        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            // Nếu đã cuộn đến cuối, tăng số trang lên 1 để fetch dữ liệu trang tiếp theo
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleExportExcel = async () => await exportExcel(invoices, 'Invoices');
    const handleDelete = async (data) => {
        try {
            setLoading(true);
            await deleteInvoiceById(data.id);
            const updatedInvoices = invoices.filter((invoice) => invoice.id !== data.id);
            setInvoices(updatedInvoices);
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };
    const handleFilter = async (name) => {
        try {
            setLoading(true);
            const response = await getInvoiceByCompanyName(name);
            const data = response;
            setInvoices(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await getInvoiceByCompanyName(nameSearch);
            const data = response;
            setInvoices(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const ActionButton = ({ data }) => (
        <View style={styles.action}>
            <TouchableOpacity onPress={() => handleDelete(data)}>
                <AntDesign name="delete" size={17} color="orange" />
            </TouchableOpacity>
        </View>
    );
    const headers = [t('common:no'), t('common:company'), t('common:custommer'), ''];

    const data = () =>
        invoices.map((invoice) => [
            invoice.id,
            invoice.companyName,
            invoice.emailUser,
            <ActionButton data={invoice} />,
        ]);

    return (
        <View style={styles.container}>
            <Input
                holder={t('common:searchBill')}
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
                        text={t('common:exportExcel')}
                        onPress={handleExportExcel}
                        iconLeft={<AntDesign name="export" size={17} color="black" />}
                        customStylesBtn={{
                            width: '35%',
                            height: '100%',
                            marginVertical: 5,
                            backgroundColor: '#00ffed',
                            borderRadius: 4,
                        }}
                        customStylesText={styles.btnText}
                        customStylesIcon={styles.icon_btn}
                    />
                    <View
                        style={{
                            width: '40%',
                        }}
                    >
                        <SelectDropdown
                            data={companys}
                            onSelect={(selectedItem, index) => {
                                handleFilter(selectedItem.name);
                            }}
                            buttonStyle={styles.dropdown_btn}
                            defaultButtonText={t('common:company')}
                            renderDropdownIcon={() => <Entypo name="chevron-small-down" size={24} color="black" />}
                            dropdownIconPosition="right"
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.name;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.name;
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
                            flexArr={[0.5, 1.5, 2, 0.45]}
                            textStyle={styles.tableheader}
                        />
                        <TableWrapper>
                            <Rows
                                data={data()}
                                flexArr={[0.5, 1.5, 2, 0.45]}
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
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 7,
        marginHorizontal: 10,
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
        width: '100%',
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: 'aqua',
    },
});
