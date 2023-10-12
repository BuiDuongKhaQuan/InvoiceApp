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
import { Row, Rows, Table, TableWrapper } from 'react-native-reanimated-table';
import SelectDropdown from 'react-native-select-dropdown';
import { fontSizeDefault } from '../../constant/fontSize';
import { dateNow } from '../../utilies/date';
export default function Invoice4() {
    const [productId, setProductId] = useState('');
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedPrinter, setSelectedPrinter] = useState();
    const [contactName, setContactName] = useState();
    const [contactPhone, setContactPhone] = useState();
    const [contactCityCode, setContactCityCode] = useState();
    const [products, setProducts] = useState([]);
    const [customer, setCustomer] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
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
                    ` <tr>
                    <td
                        style="
                            width: 15%;
                            border-top: 1px solid black;
                            border-right: 1px solid black;
                            text-align: center;
                            border-left: 1px solid black;
                        "
                    >
                    ${index}
                    </td>
                    <td
                        style="
                            width: 15%;
                            border-bottom: 0px;
                            border-top: 1px solid black;
                            border-right: 1px solid black;
                            text-align: center;
                        "
                    >
                    ${product.name}
                    </td>

                    <td style="width: 10%; border: 1px solid black; text-align: center">${product.quantity}</td>
                    <td
                        style="
                            width: 10%;
                            height: 30px;
                            border: 1px solid black;

                            text-align: center;
                        "
                    >
                    ${product.price}
                    </td>
                    <td
                        style="
                            border-bottom: 1px solid black;
                            border-right: 1px solid black;
                            border-top: 1px solid black;
                            text-align: center;
                        "
                    >
                    ${product.totalPrice}
                    </td>
                </tr>
                    `,
            )
            .join('');

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
                    font-family: Arial, Helvetica, sans-serif;
                    width: 580px;
                    height: 754px;
                }
                .container_top {
                    align-items: 'center';
                    text-align: center;
                    justify-content: 'center';
                }
    
                table,
                th,
                td {
                    border-top: 1px solid;
                }
                table {
                    border-collapse: collapse;
                }
                table tr:nth-child(odd) {
                }
                table tr:nth-child(even) {
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="container_top">
                    <div style="display: flex; justify-content: space-between">
                        <div style="font-size: 20px">
                            <Text><b>Your Company Name</b></Text>
                        </div>
                        <div style="color: hsl(0deg 0% 75.69%); font-size: 30px">
                            <Text>INVOICE</Text>
                        </div>
                    </div>
                    <div style="text-align: left; font-style: italic; margin-bottom: 30px">
                        <Text>Your Company Slogan</Text>
                    </div>
    
                    <div style="display: flex; justify-content: space-between">
                        <Text style="margin-top: 2px; margin-bottom: 2px">Street Address</Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px"><b>DATE:</b></Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px">${dateNow}</Text>
                    </div>
                    <div style="display: flex; justify-content: space-between">
                        <Text style="margin-top: 2px; margin-bottom: 2px">City, ST ZIP Code ${contactPhone}</Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px"><b>INVOICE#</b></Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px">100</Text>
                    </div>
                    <div style="display: flex; justify-content: space-between">
                        <Text style="margin-top: 2px; margin-bottom: 2px">Phone [number] Fax [number] ${contactPhone}</Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px"><b>FOR:</b></Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px; font-style: italic"> Project or service</Text>
                    </div>
                    <div style="display: flex; justify-content: end">
                        <Text style="font-style: italic"> description </Text>
                    </div>
                </div>
    
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text><b>Bill To:</b></Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>Name ${contactName}</Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>Company Name</Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>Street Address</Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>City, ST ZIP Code ${contactCityCode}</Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>Phone ${contactPhone}</Text>
                </div>
                <table>
                    <tr>
                        <td
                            colspan="3"
                            style="
                                text-align: center;
                                width: 50%;
                                height: 30px;
                                background-color: hsl(0deg 0% 94.9%);
                                border-left: 1px solid;
                                border-right: 1px solid;
                            "
                        >
                            <b>DESCRIPTION</b>
                        </td>
                        <td
                            colspan="2"
                            style="
                                border-right: 1px solid;
                                text-align: center;
                                width: 40%;
                                height: 30px;
                                background-color: hsl(0deg 0% 94.9%);
                            "
                        >
                            <b>AMOUNT</b>
                        </td>
                    </tr>
                    ${listProductHtml()}
    
                    <tr>
                        <td colspan="4" style="width: 100px; height: 30px; text-align: center; border-right: 1px solid">
                            <b> TOTAL</b>
                        </td>
                        <td
                            style="
                                width: 100px;
                                height: 30px;
                                background-color: hsl(0deg 0% 94.9%);
                                border-right: 1px solid;
                                border-bottom: 1px solid;
                                text-align: center;
                            "
                        >
                            ${subTotal}
                        </td>
                    </tr>
                </table>
                <div style="margin-top: 10px; font-size: 13px">
                    <text>Make all checks payable to Your Company Name </text>
                </div>
                <div style="margin-top: 20px; font-size: 13px; margin-bottom: 20px">
                    <text> If you have any questions concerning this invoice, Contact Name, Phone Numer, E-mail </text>
                </div>
                <div style="text-align: center; font-size: 13px">
                    <text><b>THANK YOU FOR YOUR BUSINESS! </b></text>
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
    const tableHead = ['DESCRIPTION', 'AMOUNT', ''];

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
                renderDropdownIcon={() => <Entypo name="chevron-small-down" size={24} color="black" />}
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

        ['Total', totalPrice.toString()],
    ];

    const handleChangePrice = (text) => {
        setPrice(text);
        setTotalPrice(quantity * text);
    };
    const handleChangeQuantity = (text) => {
        setQuantity(text);
        setTotalPrice(price * text);
    };
    const handleChangeTotal = (text) => {
        setTotalPrice(text);
        setTotal(price + text);
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
                <View style={styles.container_top_left}>
                    <Text style={styles.text_bold2}>Your Company Name</Text>
                    <Text style={styles.text_bold_Invoice}>INVOICE</Text>
                </View>
                <View style={styles.container_top_right}>
                    <Text style={styles.text_bold_slogan}>Your Company Slogan</Text>
                </View>

                <View style={styles.container_center}>
                    <View style={styles.center_row}>
                        <Text style={styles.text_bold3}>Street Address</Text>

                        <Text style={styles.text_bold_left1}>DATE: {dateNow}</Text>
                    </View>
                    <View style={styles.center_row}>
                        <Text style={styles.text_bold3}>City, ST ZIP Code</Text>
                        <TextInput
                            onChangeText={handleChangePrice}
                            placeholder="Code "
                            keyboardType="numeric"
                            style={{ ...styles.text_line }}
                        />
                        <Text style={styles.text_bold_left2}>INVOICE#</Text>
                        <Text style={styles.text_bold_left}>100</Text>
                    </View>
                    <View style={styles.center_row}>
                        <Text style={styles.text_bold3}>Phone [number] Fax [number]</Text>
                        <TextInput
                            style={styles.text_line}
                            onChangeText={(text) => setContactPhone(text)}
                            value={contactPhone}
                            placeholder="Enter your phone number "
                        />
                        <Text style={styles.text_bold2}>FOR:</Text>
                        <Text style={styles.text_bold_italia}> Project or service</Text>
                    </View>
                    <View style={styles.descrip}>
                        <Text style={styles.text_bold_italia}>description </Text>
                    </View>
                    <View style={styles.center_row}>
                        <Text style={styles.text_bold2}>Bill To:</Text>
                        <TextInput
                            style={styles.text_line}
                            onChangeText={(text) => setCustomer(text)}
                            value={customer}
                            placeholder="Enter  address"
                        />
                    </View>
                    <View style={styles.center_row}>
                        <Text style={styles.text_bold3}>Name</Text>
                        <TextInput
                            style={styles.text_line}
                            onChangeText={(text) => setContactName(text)}
                            value={contactName}
                            placeholder="Enter  Name "
                        />
                    </View>
                    <View style={styles.center_row}>
                        <Text style={styles.text_bold3}>Company Name</Text>
                        <TextInput
                            style={styles.text_line}
                            onChangeText={(text) => setCustomer(text)}
                            value={customer}
                            placeholder="Enter  Name "
                        />
                    </View>
                    <View style={styles.center_row}>
                        <Text style={styles.text_bold3}>Street Address</Text>
                        <TextInput
                            style={styles.text_line}
                            onChangeText={(text) => setCustomer(text)}
                            value={customer}
                            placeholder="Enter Address "
                        />
                    </View>
                    <View style={styles.center_row}>
                        <Text style={styles.text_bold3}>City, ST ZIP Code</Text>
                        <TextInput
                            style={styles.text_line}
                            onChangeText={(text) => setContactCityCode(text)}
                            value={contactCityCode}
                            placeholder="Enter your code city and ZIP code"
                        />
                    </View>
                    <View style={styles.center_row}>
                        <Text style={styles.text_bold3}>Phone</Text>
                        <TextInput
                            style={styles.text_line}
                            onChangeText={(text) => setContactPhone(text)}
                            value={contactPhone}
                            placeholder="Enter your phone number "
                        />
                    </View>
                    <View style={styles.table}>
                        <Table
                            borderStyle={{
                                borderWidth: 1.5,
                                borderColor: 'black',
                            }}
                        >
                            <Row
                                heightArr={25}
                                flexArr={[2, 0.975, 0.178]}
                                data={tableHead}
                                style={styles.tableheader}
                                textStyle={styles.text}
                            />
                            <TableWrapper>
                                <Rows
                                    heightArr={30}
                                    data={newData()}
                                    flexArr={[0.5, 3, 1, 1, 1.2, 0.4]}
                                    textStyle={styles.tableheader}
                                />
                            </TableWrapper>
                        </Table>
                    </View>

                    <Text style={styles.text_bold_end}>Make all checks payable to Your Company Name</Text>

                    <Text style={styles.text_bold_end}>
                        If you have any questions concerning this invoice, Contact Name, Phone Numer, E-mail
                    </Text>
                    <View style={styles.bottom_content}>
                        <View style={styles.bottom_row}>
                            <Text style={styles.text_bold}>THANK YOU FOR YOUR BUSINESS! </Text>
                        </View>
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
        backgroundColor: 'rgb(255 255 255)',
        marginHorizontal: 10,
    },
    container_top: {
        marginTop: StatusBar.currentHeight + 5 || 20,
        alignItems: 'center',
        flex: 2.3,
    },
    talbleedit: {
        marginTop: 20,
    },
    descrip: { marginLeft: 317, marginBottom: 30 },
    text_bold: {
        fontWeight: 'bold',
        fontSize: 13,
    },

    colum_head1: { marginLeft: 70 },
    text_bold2: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    text_line1: {
        textAlign: 'center',
    },
    text_bold3: {
        fontSize: 14,
        marginVertical: 2,
    },
    text_bold_end: { fontSize: 15, marginVertical: 10 },
    text_bold4: { fontWeight: 'bold', fontSize: 15 },
    text_bold_Invoice: {
        fontSize: 30,
        color: 'rgb(127 124 125)',
    },
    text_bold_slogan: {
        fontSize: 15,
        fontStyle: 'italic',
        marginBottom: 30,
    },
    text_bold_italia: { fontSize: 15, fontStyle: 'italic' },
    text_bold_left: {
        fontSize: 14,
        marginLeft: 30,
    },
    text_bold_left1: {
        marginLeft: 150,
        fontWeight: 'bold',
        fontSize: 14,
    },
    text_bold_left2: {
        marginLeft: 90,
        fontWeight: 'bold',
        fontSize: 14,
    },

    text_line: {
        marginLeft: 5,
    },
    line: {
        width: '60%',
        height: 1,
        borderWidth: 0.5,
        borderColor: 'black',
        marginVertical: 8,
    },
    container_center: {
        flex: 8,
        width: '100%',
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    center_row: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },

    table: {
        flexDirection: 'column',
    },

    colum_name: {
        flex: 2,
    },
    action_btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    colum_p: {
        flex: 1.5,
        textAlign: 'center',
        marginLeft: 0,
        marginRight: 5,
    },
    colum_p1: {},
    bottom_content: {
        marginVertical: 10,
    },
    bottom_row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bottom_row_end: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    tableheader: {
        textAlign: 'center',
    },

    spacer: {},
    printer: {},
    head: {
        height: 30,
        width: 80,
        backgroundColor: 'rgb(242 242 242)',
    },

    text: { margin: 8, textAlign: 'center', fontWeight: 'bold' },
    row: { backgroundColor: 'rgb(255 255 255)' },
    container_top_left: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});
