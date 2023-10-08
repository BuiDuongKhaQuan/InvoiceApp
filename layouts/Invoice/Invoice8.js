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
    Image,
} from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Popup from '../../components/Popup';
import { format } from 'date-fns';
import { Row, Rows, Table, TableWrapper } from 'react-native-reanimated-table';
import SelectDropdown from 'react-native-select-dropdown';
import { fontSizeDefault } from '../../constant/fontSize';

export default function Invoice() {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy');
    const [productId, setProductId] = useState('');
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedPrinter, setSelectedPrinter] = useState();
    const [contactName, setContactName] = useState();
    const [contactAddress, setContactAddress] = useState();
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
                <td  style=" width: 10%; height: 30px; text-align: center; ">${index}</td>
                <td  style="width: 30%;  text-align: center; " >${product.name}</td>
                <td  style="width: 10%;text-align: center;   " >${product.quantity}</td>
                <td  style=" width: 10%; height: 30px; text-align: center;  ">${product.price}</td>
                <td style=" text-align: center;  ">${product.totalPrice}</td>
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
                    margin-left: 10;
                    margin-right: 10;
                    height: 500px;
                    width: 1000px;
                }
                .container_top {
                    align-items: 'center';
                    flex: 1;
                    text-align: center;
                    justify-content: 'center';
                }
    
                table,
                th,
                td {
                    padding: 0 !important;
                    border-top: 0px dashed;
                    border-bottom: 0px dashed;
                    border-collapse: collapse;
                    text-align: justify;
                }
                th,
                td {
                    padding: 10px;
                }
                hr {
                    border-style: dashed;
                    border-width: 0.5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="container_top">
                    <hr />
                    <div style="text-align: center">
                        <Text><b>CỬA HÀNG LỘC PHÁT </b></Text>
                    </div>
                    <hr />
                </div>
                <div style="margin-top: 50px; margin-left: 50px">
                    <div class="center_row">
                        <Text>${contactName}</Text>
                    </div>
                    <div class="center_row">
                        <Text>${contactAddress}</Text>
                    </div>
                    <hr />
    
                    <table style="width: 100%; margin-top: 10px">
                        <tr>
                            ${listProductHtml()}
                        </tr>
                    </table>
                    <hr />
    
                    <div>
                        <div style="display: flex">
                            <Text style="margin-left: 160px">TOTAL AMOUNT</Text>
                            <Text style="margin-right: 160px; text-align: right; flex: 1">${subTotal}</Text>
                        </div>
                        <hr />
                    </div>
                    <div style="width: 100%; text-align: center">
                        <img
                            id="barcode"
                            style="height: 50px"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAABkAQMAAABQPCXcAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAEJJREFUSIlj+FPA8KDA/vEHC/kP9vKN/5n7D/xvPM7Af5z5A/ufwh8Mo9Kj0qPSo9Kj0qPSo9Kj0qPSo9Kj0iNDGgD7rye/sbJ7jgAAAABJRU5ErkJggg=="
                            alt="Mã vạch"
                        />
                    </div>
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
    const tableHead = ['', '', '', , '', ''];

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
                    <AntDesign name="plussquare" size={23} color="black" />
                </TouchableOpacity>
            </View>,
        ],
        ['', 'TOTAL AMOUNT', '', '', subTotal.toString(), ''],
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
                    <Text style={styles.line} />
                    <Text style={styles.text_bold1}>CỬA HÀNG LỘC PHÁT</Text>
                    <Text style={styles.line} />
                </View>
                <View style={styles.container_center}>
                    <View style={styles.center_row1}>
                        <TextInput
                            style={styles.text_line}
                            onChangeText={(text) => setContactName(text)}
                            value={contactName}
                            placeholder="Enter the customer's name"
                        />
                    </View>
                    <View style={styles.center_row1}>
                        <TextInput
                            style={styles.text_line}
                            onChangeText={(text) => setContactAddress(text)}
                            value={contactAddress}
                            placeholder="Enter the address"
                        />
                    </View>
                    <View>
                        <Text style={styles.line1} />
                    </View>
                    <Table
                        borderStyle={{
                            borderWidth: 7,
                            borderColor: 'white',
                        }}
                    >
                        <TableWrapper>
                            <Rows
                                heightArr={25}
                                data={newData()}
                                flexArr={[0.64, 1.8, 0.5, 0.6, 0.85, 0.3]}
                                textStyle={styles.tableheader}
                            />
                        </TableWrapper>
                    </Table>
                </View>
                <View style={styles.Barcode}>
                    <Image
                        source={{
                            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAABkAQMAAABQPCXcAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAEJJREFUSIlj+FPA8KDA/vEHC/kP9vKN/5n7D/xvPM7Af5z5A/ufwh8Mo9Kj0qPSo9Kj0qPSo9Kj0qPSo9Kj0iNDGgD7rye/sbJ7jgAAAABJRU5ErkJggg==',
                        }}
                        style={{ height: 50, width: 100 }}
                    />
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
    text: { margin: 8, color: 'black', textAlign: 'center' },
    text_bold_address: {
        fontWeight: 'bold',
        color: 'black',
    },

    text_bold: {
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
        width: 70,
    },
    text_bold3: {
        color: 'black',
        flex: 1,
    },
    Barcode: {
        width: '100%',
        alignItems: 'center',
    },
    text_bold_end: {
        fontWeight: 'bold',
        color: 'black',
    },

    text_bold1: {
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black',
    },
    text_line1: { color: 'black', textAlign: 'center' },
    text_bold2: {
        alignItems: 'end',
        color: 'black',
    },
    tableheader: {
        textAlign: 'center',
        color: 'black',
    },
    text_line: {
        marginLeft: 24,
        color: 'black',
        marginBottom: 5,
    },
    cashbill: { flexDirection: 'row', flex: 3 },
    line: {
        width: '100%',
        height: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'dashed',
    },
    line1: {
        width: '100%',
        height: 1,
        borderWidth: 1,
        borderColor: 'black',

        marginBottom: 5,
        borderStyle: 'dashed',
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
