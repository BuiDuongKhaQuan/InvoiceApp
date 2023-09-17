import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Platform, Text, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { white } from '../constant/color';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

export default function Invoice() {
    const [selectedPrinter, setSelectedPrinter] = useState();
    const [products, setProducts] = useState([]);
    const [nameProduct, setNameProduct] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalBillPrice, setTotalBillPrice] = useState(0);

    const handleAddProduct = () => {
        if (nameProduct && price && quantity) {
            setProducts([...products, { name: nameProduct, price: price, quantity: quantity, totalPrice: totalPrice }]);
            setNameProduct('');
            setPrice();
            setQuantity();
            setTotalPrice();
        }
    };

    const handleChangePrice = (text) => {
        setPrice(text);
        setTotalPrice(quantity * text);
    };
    const handleChangeQuantity = (text) => {
        setQuantity(text);
        setTotalPrice(price * text);
    };
    const removeProduct = (key) => {
        products.splice(key, 1);
        setProducts([...products]);
    };

    useEffect(() => {
        const newTotalBillPrice = products.reduce((total, product) => {
            return total + product.totalPrice;
        }, 0);
        setTotalBillPrice(newTotalBillPrice);
    }, [products]);

    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url, // iOS only
        });
    };

    const printToFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
    };

    return (
        <View style={styles.container}>
            <View style={styles.container_top}>
                <Text style={styles.text_bold}>WOORI COFFEE</Text>
                <Text style={styles.text_bold}>ĐC: Ký túc xá khu B</Text>
                <Text style={styles.text_bold}>SĐT: 01232143</Text>
                <Text style={styles.line} />
                <Text style={styles.text_bold}>HÓA ĐƠN THANH TOÁN</Text>
                <Text style={styles.text_bold}>Số: 209130123910</Text>
                <Text style={styles.text_bold}>Ngày: 17/09/2023</Text>
            </View>
            <View style={styles.container_center}>
                <View style={styles.center_row}>
                    <Text style={styles.text_bold}>Giờ vào:</Text>
                    <Text style={styles.text_line}>17/09/3023 12:01</Text>
                </View>
                <View style={styles.center_row}>
                    <Text style={styles.text_bold}>Khách hàng:</Text>
                    <Text style={styles.text_line}>Trân và Thái</Text>
                </View>
                <View style={styles.center_row}>
                    <Text style={styles.text_bold}>Thu ngân:</Text>
                    <Text style={styles.text_line}>Khả Quân</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.table_colum}>
                        <Text style={{ ...styles.text_bold, ...styles.colum_name }}>Tên hàng</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_p }}>Đ.giá</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_p }}>SL</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_p }}>TT</Text>
                        <Text style={{ ...styles.text_bold, ...styles.colum_p }}></Text>
                    </View>

                    {products.map((product, index) => (
                        <View style={styles.table_colum} key={index}>
                            <Text style={{ ...styles.text_line, ...styles.colum_name }}>{product.name}</Text>
                            <Text style={{ ...styles.text_line, ...styles.colum_p }}>{product.price}</Text>
                            <Text style={{ ...styles.text_line, ...styles.colum_p }}>{product.quantity}</Text>
                            <Text style={{ ...styles.text_line, ...styles.colum_p }}>{product.totalPrice}</Text>
                            <View style={{ ...styles.action_btn, ...styles.colum_p }}>
                                <TouchableOpacity onPress={() => removeProduct(index)}>
                                    <AntDesign name="closesquare" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <MaterialIcons name="mode-edit" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <View style={styles.table_colum}>
                        <TextInput
                            onChangeText={(text) => setNameProduct(text)}
                            value={nameProduct}
                            placeholder="Tên"
                            style={{ ...styles.text_line, ...styles.colum_name }}
                        />
                        <TextInput
                            onChangeText={handleChangePrice}
                            value={price}
                            placeholder="Giá"
                            keyboardType="numeric"
                            style={{ ...styles.text_line, ...styles.colum_p }}
                        />
                        <TextInput
                            onChangeText={handleChangeQuantity}
                            value={quantity}
                            placeholder="SL"
                            keyboardType="numeric"
                            style={{ ...styles.text_line, ...styles.colum_p }}
                        />
                        <Text style={{ ...styles.text_line, ...styles.colum_p }}>{totalPrice}</Text>
                        <View style={{ ...styles.action_btn, ...styles.colum_p }}>
                            <TouchableOpacity onPress={handleAddProduct}>
                                <AntDesign name="plussquare" size={23} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.bottom_content}>
                    <View style={styles.bottom_row}>
                        <Text style={styles.text_bold}>Tổng thành tiền</Text>
                        <Text style={styles.text_bold}>{totalBillPrice}</Text>
                    </View>
                    <View style={styles.bottom_row}>
                        <Text style={styles.text_bold}>Tổng hóa đơn</Text>
                        <Text style={styles.text_bold}>{totalBillPrice}</Text>
                    </View>
                </View>
                <View style={styles.bottom_end}>
                    <Text style={styles.text_bold}>-------------------------------</Text>
                    <Text style={styles.text_bold}>Xin cảm ơn hẹn gặp lại quý khách</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        marginHorizontal: 10,
    },
    container_top: {
        marginTop: StatusBar.currentHeight + 5 || 20,
        alignItems: 'center',
        flex: 2.3,
    },
    text_bold: {
        fontWeight: 'bold',
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
    },
    table: {
        flexDirection: 'column',
    },
    table_colum: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingVertical: 5,
    },
    colum_name: {
        flex: 3,
        marginLeft: 0,
    },
    action_btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    colum_p: {
        flex: 1.2,
        textAlign: 'right',
        marginLeft: 0,
        marginRight: 5,
    },
    bottom_content: {
        marginVertical: 10,
    },
    bottom_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottom_end: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    spacer: {},
    printer: {},
});
