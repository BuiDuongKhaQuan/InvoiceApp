import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Button,
    Platform,
    Text,
    StatusBar,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Popup from '../../components/Popup';
import { dateNow } from '../../utilies/date';
import { Row, Rows, Table, TableWrapper } from 'react-native-reanimated-table';
import SelectDropdown from 'react-native-select-dropdown';
import { fontSizeDefault } from '../../constant/fontSize';
export default function Invoice2() {
    const [productId, setProductId] = useState('');
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedPrinter, setSelectedPrinter] = useState();
    const [contactName, setContactName] = useState();
    const [products, setProducts] = useState([]);
    const [customer, setCustomer] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [tax, setTax] = useState();
    const [totalBillPrice, setTotalBillPrice] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [productsApi, setProductsApi] = useState([
        {
            id: 1,
            name: 'Cam',
            price: 10000,
        },
        {
            id: 2,
            name: 'Quýt',
            price: 20000,
        },
        {
            id: 3,
            name: 'Bưởi',
            price: 30000,
        },
        {
            id: 4,
            name: 'Dừa',
            price: 40000,
        },
        {
            id: 5,
            name: 'Ổi',
            price: 50000,
        },
    ]);
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };
    const listProductHtml = () =>
        products
            .map(
                (product, index) =>
                    `<tr >
                <td  style=" width: 10%; color: blue;  text-align: center; height: 30px; border-top: 2px solid blue; border-right: 2px solid blue; border-bottom: 2px solid blue; ">${index}</td>
                <td  style="width: 30%; color: blue;text-align: center; border-bottom: 2px solid blue; border-top: 2px solid blue; border-right: 2px solid blue; " >${product.name}</td>
                <td  style="width: 10%; color: blue; text-align: center;border-top: 2px solid blue; border-right: 2px solid blue; border-bottom: 2px solid blue; " >${product.quantity}</td>
                <td  style=" width: 10%; color: blue; text-align: center;height: 30px; border-top: 2px solid blue; border-right: 2px solid blue; border-bottom: 2px solid blue; ">${product.price}</td>
                <td style="color: blue;text-align: center; border-bottom: 2px solid blue; border-top: 2px solid blue;    ">${product.totalPrice}</td>
            </tr>`,
            )
            .join('');
    console.log(products);
    const html = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width; initial-scale=1.0" />
            <title>Document</title>
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    background-color: white;
                    margin-left: 100px;
                    width: 491px;
                    height: 800px;
                    font-family: Arial, Helvetica, sans-serif;
                }
                .container_top {
                    align-items: 'center';
                    text-align: center;
                    justify-content: 'center';
                }
                table,
                th,
                td {
                    padding: 0 !important;
    
                    border-collapse: collapse;
                }
    
                th,
                td {
                    padding: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="container_top">
                    <div
                        style="
                            text-align: center;
                            margin-top: 90px;
                            font-weight: bold;
                            font-size: 30px;
                            color: blue;
                        "
                    >
                        <Text>YOUR COMPANY NAME</Text>
                    </div>
                    <div style="text-align: center; font-size: 20px; font-weight: bold; color: blue">
                        <Text>Address .....................................................</Text>
                    </div>
                    <div style="text-align: center; font-size: 20px; font-weight: bold; color: blue">
                        <Text>Ph :00000000000000</Text>
                    </div>
                    <hr size="2px" ; color="blue" />
                </div>
    
                <div style="display: flex; justify-content: space-between; color: blue">
                    <div style="margin-left: 10px">
                        <Text>Sl.No.</Text>
                    </div>
                    <div>
                        <Text><b>CASH BILL</b></Text>
                    </div>
                    <div style="margin-right: 10px">
                        <Text>Date: ${dateNow} </Text>
                    </div>
                </div>
                <div style="color: rgb(0 0 215); margin-top: 10px; margin-left: 10px; margin-right: 10px">
                    <Text>To.M/s ${contactName}</Text>
                    <hr size="2px" ; color="blue" />
                </div>
                <div style="color: rgb(0 0 215); margin-top: 8px; margin-left: 14px; margin-right: 10px">
                    <hr size="2px" ; color="blue" />
                </div>
                <table style="width: 100%; height: 300px">
                    <tr>
                        <td
                            style="
                                color: rgb(0 0 215);
                                text-align: center;
                                width: 3%;
                                height: 5px;
                                border-top: 2px solid rgb(0 0 215);
                                border-right: 2px solid rgb(0 0 215);
                            "
                        >
                            <b>S.No.</b>
                        </td>
                        <td
                            style="
                                color: rgb(0 0 215);
                                text-align: center;
                                width: 58%;
                                height: 5px;
    
                                border-top: 2px solid rgb(0 0 215);
                                border-right: 2px solid blue;
                            "
                        >
                            <b>Particulars</b>
                        </td>
                        <td
                            style="
                                color: blue;
                                text-align: center;
                                width: 10%;
                                height: 5px;
    
                                border-top: 2px solid blue;
                                border-right: 2px solid blue;
                            "
                        >
                            <b>Qty</b>
                        </td>
                        <td
                            style="
                                height: 5px;
                                color: blue;
                                text-align: center;
                                width: 18%;
                                border-top: 2px solid blue;
                            "
                        >
                            <b>Amount </b>
    
                            <b>Rs. </b>
                        </td>
                        <td
                            style="height: 5px; color: blue; text-align: center; border-top: 2px solid blue"
                        >
                            <b>Ps.</b>
                        </td>
                    </tr>
                    ${listProductHtml()}

                    
                </table>
                <div style="text-align: end; color: blue">
                    <text><b>For You Company Name</b></text>
                </div>
            </div>
        </body>
    </html>
    
    `;

    const data = () =>
        products.map((product, index) => [
            index,
            product.name,
            product.quantity,
            product.price,
            product.totalPrice,
            '',
        ]);
    const tableHead = ['S.No.', 'Particulars', 'Qty', , 'Amount', ''];

    const newData = () => [
        ...data(),
        [
            data().length,
            <SelectDropdown
                data={productsApi}
                onSelect={(selectedItem) => {
                    setProductId(selectedItem.id);
                    setProductName(selectedItem.name);
                    setPrice(selectedItem.price.toString());
                }}
                buttonStyle={{ width: '100%', height: 30, backgroundColor: 'transparent' }}
                rowTextStyle={{ fontSize: fontSizeDefault }}
                defaultButtonText={'Selected product'}
                renderDropdownIcon={() => <Entypo name="chevron-small-down" size={24} color="blue" />}
                dropdownIconPosition="right"
                buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem.name;
                }}
                rowTextForSelection={(item) => {
                    return item.name;
                }}
            />,
            <TextInput
                onChangeText={handleChangeQuantity}
                value={quantity}
                placeholder="Sl"
                keyboardType="numeric"
                style={styles.text_line1}
            />,
            <TextInput
                onChangeText={handleChangePrice}
                value={price}
                placeholder="Price"
                keyboardType="numeric"
                style={styles.text_line1}
            />,
            totalPrice.toString(),
            <View style={styles.action_btn}>
                <TouchableOpacity onPress={handleAddProduct}>
                    <AntDesign name="plussquare" size={23} color="blue" />
                </TouchableOpacity>
            </View>,
        ],
    ];

    const handleChangePrice = (text) => {
        setPrice(text);
        setTotalPrice(quantity * text);
    };
    const handleChangeQuantity = (text) => {
        setQuantity(text);
        setTotalPrice(price * text);
    };
    const handleChangeTax = (text) => {
        setTax(text);
        setTotalBillPrice(subTotal + (subTotal * text) / 100);
    };
    const removeProduct = (key) => {
        products.splice(key, 1);
        setProducts([...products]);
    };
    const handleAddProduct = () => {
        if (productId && price && quantity) {
            setProducts([
                ...products,
                { productId: productId, name: productName, price: price, quantity: quantity, totalPrice: totalPrice },
            ]);
            setProductId();
            setPrice();
            setQuantity();
            setProductName();
            setTotalPrice(0);
        } else {
            Alert.alert('Error!!', 'Please provide complete information');
        }
    };

    useEffect(() => {
        const newSubTotal = products.reduce((total, product) => {
            return total + product.totalPrice;
        }, 0);
        setSubTotal(newSubTotal);
    }, [products]);

    const print = async () => {
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url,
        });
    };

    const printToFile = async () => {
        const { uri } = await Print.printToFileAsync({ html });
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync();
        setSelectedPrinter(printer);
    };

    return (
        <>
            <Popup visible={isPopupVisible} onClose={togglePopup} />
            <ScrollView style={styles.container}>
                <View style={styles.container_top}>
                    <Text style={styles.text_bold1}>YOUR COMPANY NAME</Text>

                    <View style={styles.center_row}>
                        <Text style={styles.text_bold_address}>Address</Text>
                        <TextInput
                            style={styles.text_line}
                            onChangeText={(text) => setCustomer(text)}
                            value={customer}
                            placeholder="Nhập địa chỉ"
                        />
                    </View>

                    <Text style={styles.text_bold_address}>Ph :00000000000000</Text>
                    <Text style={styles.line} />
                    <View style={styles.cashbill}>
                        <Text style={styles.text_bold3}>Sl.No.</Text>
                        <Text style={styles.text_bold}>CASH BILL</Text>
                        <Text style={styles.text_bold3}>Date: {dateNow}</Text>
                    </View>
                </View>
                <View style={styles.container_center}>
                    <View style={styles.center_row1}>
                        <Text style={styles.text_bold2}>To.M/s</Text>
                        <TextInput
                            style={styles.text_line}
                            onChangeText={(text) => setContactName(text)}
                            value={contactName}
                            placeholder="Enter the customer's name"
                        />
                    </View>
                    <Text style={styles.line} />
                    <View>
                        <Text style={styles.line1} />
                    </View>
                    <Table
                        borderStyle={{
                            borderWidth: 2,
                            borderColor: 'blue',
                        }}
                    >
                        <Row
                            heightArr={25}
                            flexArr={[0.53, 1.5, 0.42, 0.4, 1.22, 0.25]}
                            data={tableHead}
                            style={styles.tableheader}
                            textStyle={styles.text}
                        />
                        <TableWrapper>
                            <Rows
                                heightArr={25}
                                data={newData()}
                                flexArr={[0.64, 1.8, 0.5, 0.6, 0.85, 0.3]}
                                textStyle={styles.tableheader}
                            />
                        </TableWrapper>
                    </Table>
                    <View style={styles.bottom_end}>
                        <Text style={styles.text_bold_end}>For Your Company Name</Text>
                    </View>
                </View>

                <View>
                    <Button title="Print" onPress={print} />
                    <View style={styles.spacer} />
                    <Button title="Print to PDF file" onPress={printToFile} />
                    {Platform.OS === 'ios' && (
                        <>
                            <View style={styles.spacer} />
                            <Button title="Select printer" onPress={selectPrinter} />
                            <View style={styles.spacer} />
                            {selectedPrinter ? (
                                <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
                            ) : undefined}
                        </>
                    )}
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    container_top: {
        marginTop: StatusBar.currentHeight + 5 || 20,
        alignItems: 'center',
        flex: 2.3,
    },
    head: {
        marginTop: 10,
        height: 40,
        width: '100%',
        textAlign: 'center',
    },
    text: { margin: 8, color: 'blue', textAlign: 'center' },
    text_bold_address: {
        fontWeight: 'bold',
        color: '#0000FF',
    },

    text_bold: {
        fontWeight: 'bold',
        color: '#0000FF',
        flex: 1,
        width: 70,
    },
    text_bold3: {
        color: '#0000FF',
        flex: 1,
    },
    text_bold_end: {
        fontWeight: 'bold',
        color: '#0000FF',
    },

    text_bold1: {
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 25,
        color: '#0000FF',
    },
    text_line1: { color: 'blue', textAlign: 'center' },
    text_bold2: {
        alignItems: 'end',
        color: '#0000FF',
    },
    tableheader: {
        textAlign: 'center',
        color: 'blue',
    },
    text_line: {
        marginLeft: 5,
        color: 'blue',
    },
    cashbill: { flexDirection: 'row', flex: 3 },
    line: {
        width: '100%',
        height: 1,
        borderWidth: 1,
        borderColor: 'blue',
        marginLeft: 5,
        marginRight: 5,
    },
    line1: {
        width: '100%',
        height: 1,
        borderWidth: 1,
        borderColor: 'blue',
        marginTop: 25,
        marginLeft: 7,
        marginRight: 7,
        marginBottom: 5,
    },
    container_center: {
        flex: 13,
        width: '100%',
        justifyContent: 'flex-start',
    },
    center_row: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    center_row1: {
        marginTop: 10,
        flexDirection: 'row',
    },

    table_colum: {
        textAlign: 'center',
    },
    tableHead: {
        textAlign: 'center',
    },
    colum_name: {
        flex: 2,
        marginLeft: 0,
    },
    action_btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    colum_p: {
        flex: 6,
        textAlign: 'center',
    },
    bottom_content: {
        marginVertical: 10,
    },
    bottom_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottom_end: {
        alignItems: 'flex-end',
    },
    spacer: {},
    printer: {},
});
