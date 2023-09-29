import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Button,
    Platform,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import numberToWords from 'number-to-words';
import SelectDropdown from 'react-native-select-dropdown';
import { Entypo } from '@expo/vector-icons';
import { fontSizeDefault } from '../../constant/fontSize';
import PrintBtn from './PrintBtn';

export default function Invoice2({ data }) {
    const currentDate = moment().format('DD/MM/YYYY');
    const currentHour = moment().format('HH:mm:ss');
    const [customer, setCustomer] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedPrinter, setSelectedPrinter] = useState();
    const [products, setProducts] = useState([]);
    const [nameProduct, setNameProduct] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [ck, setCk] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalBillPrice, setTotalBillPrice] = useState(0);
    const amountInWords = numberToWords.toWords(totalBillPrice);
    const [id, setId] = useState(1);
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
    const [productId, setProductId] = useState('');
    const listProductHtml = () =>
        products
            .map(
                (product) =>
                    ` <tr>
                    <td style="font-weight: 700">${product.id}</td>
                    <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                    <tr>
                        <td></td>
                        <td style="padding-left: 30px;">${product.quantity}</td>
                        <td>${product.price}</td>
                        <td style="padding-left: 6px">${product.ck}</td>
                        <td></td>
                        <td>${product.totalPrice}</td>
                    </tr>
                </tr>`,
            )
            .join('');
    const html = `
<!DOCTYPE html>
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
      }
      .container_top {
        align-items: "center";
        flex: 1;
        text-align: center;
        justify-content: "center";
      }
      
      table, th, td {
        
  
  border-collapse: collapse;
}
      p {
        margin: 3px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="container_top" style="margin-top: 40px;">
        <div style="text-align: center">
          <p>TMART KTX DHQG</p>
        </div>
        <div style="text-align: center">
          <p>HCM</p>
        </div>
        <div style="text-align: center">
          <p>0970238648</p>
        </div>
        <div style="text-align: center">
          <p>hong@gmail.com</p>
        </div>
        <div style="text-align: center; font-weight: 600">
          <p>HÓA ĐƠN THANH TOÁN</p>
        </div>
        <div style="text-align: center; ">
          <img src="https://vienthonglaw.vn/wp-content/uploads/2021/12/Ma-Vach-1.jpg" alt="" style="height: 30; width: 50%;"/>
        </div>
        
      </div>
      <div class="container_center">
        <div style="display: flex; flex-direction: row">
          <p style="flex: 1">Ngày: ${currentDate}</p>
          <p style="flex: 1">${currentHour}</p>
        </div>
        <div class="cashier" style="display: flex; flex-direction: row">
          <p style="margin-right: 20">Thu ngân:</p>
          <p>${data.name}</p>
        </div>
        <div class="customer" style="display: flex; flex-direction: row">
          <p style="margin-right: 20">Khách hàng:</p>
          <p>${customer}</p>
        </div>
        <div style="display: flex; flex-direction: row">
          <div style="display: flex; flex-direction: row; flex: 2">
            <p style="margin-right: 20">Điện thoại:</p>
            <p>${phone}</p>
          </div>
          <div style="display: flex; flex-direction: row; flex: 1">
            <p style="margin-right: 20">Điểm:</p>
            <p>0.0</p>
          </div>
        </div>
        <table style="width:100%">
          <tr style="border-bottom: 1px dashed  black;">
            <th>#</th>
            <th>Tên hàng</th> 
            <th>SL</th>
            <th>D.G</th>
            <th>CK</th>
            <th>T.Tiền</th>
          </tr>
        
          ${listProductHtml()}
          
        </table>
        <p style="border-bottom: 1px dashed  black;"></p>
      </div>
      <div class="container_bottom" style="justify-content: right; ;">
        <div style="display: flex; flex-direction: row; justify-content: right;">
          <p style="justify-content: right; margin-right: 35%; font-weight: bold;">Tổng tiền theo giá bán:</p>
          <p>${totalBillPrice}</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right;">
          <p style="justify-content: right; margin-right: 42%; font-weight: bold;">Tổng chiếc khấu:</p>
          <p>${ck}</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right;">
          <p style="justify-content: right; margin-right: 35%; font-weight: bold; font-size: 18px;">Tổng thanh toán:</p>
          <p>${totalBillPrice}</p>
        </div>
        <p style="text-align: center;">${numberToVietnameseWords(totalBillPrice)}</p>
        <p style="border-bottom: 1px dashed  black;"></p>
        <div style="display: flex; flex-direction: row; justify-content: right;">
          <p style="justify-content: right; margin-right: 40%; font-weight: bold; ">Kiểu T.Toán:</p>
          <p>TM</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right;">
          <p style="justify-content: right; margin-right: 35%; font-weight: bold; ">Nhận tiền của khách:</p>
          <p>${totalBillPrice}</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right;">
          <p style="justify-content: right; margin-right: 47%; font-weight: bold; ">Trả lại: </p>
       
          <p>0</p>
        </div>
        <p style="border-bottom: 1px dashed  black;"></p>
<p style="text-align: center;">Design by....</p>
      </div>
    </div>
  </body>
</html>

`;
    function numberToVietnameseWords(number) {
        const units = ['', ' nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ', 'tỷ tỷ'];
        const digits = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

        const groupToWords = (group) => {
            const hundred = Math.floor(group / 100);
            const ten = Math.floor((group % 100) / 10);
            const one = group % 10;

            let result = '';

            if (hundred > 0) {
                result += digits[hundred] + ' trăm ';
            }

            if (ten > 1) {
                result += digits[ten] + ' mươi ';
                if (one > 0) {
                    result += digits[one];
                }
            } else if (ten === 1) {
                result += 'mười ';
                if (one > 0) {
                    result += digits[one];
                }
            } else {
                if (one > 0) {
                    result += digits[one];
                }
            }

            return result;
        };

        const numberString = String(number);

        let result = '';
        let groupIndex = 0;
        let group = '';

        for (let i = numberString.length - 1; i >= 0; i--) {
            group = numberString[i] + group;

            if (group.length === 3 || i === 0) {
                const groupNumber = parseInt(group);
                if (groupNumber > 0) {
                    result = groupToWords(groupNumber) + units[groupIndex] + ' ' + result;
                }

                group = '';
                groupIndex++;
            }
        }

        return result.trim();
    }
    const handleAddProduct = () => {
        if (nameProduct && price && quantity) {
            setProducts([
                ...products,
                {
                    id: id,
                    productId: productId,
                    name: nameProduct,
                    price: price,
                    quantity: quantity,
                    ck: ck,
                    totalPrice: totalPrice,
                },
            ]);
            setId(id + 1);
            setNameProduct('');
            setPrice();
            setCk();
            setQuantity();
            setTotalPrice();
            setProductId();
        }
    };

    const handleChangePrice = (text) => {
        setPrice(text.toString());
        setTotalPrice(quantity * text + quantity * text * (ck / 100));
    };
    const handleChangeQuantity = (text) => {
        setQuantity(text.toString());
        setTotalPrice(text * price + text * price * (ck / 100));
    };
    const handleChangeCk = (text) => {
        setCk(text.toString());
        setTotalPrice(quantity * price + quantity * price * (text / 100));
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
    useEffect(() => {
        const newTotalCk = products.reduce((ck, product) => {
            return parseInt(product.ck, 10) + parseInt(ck, 10);
        }, 0);
        setCk(newTotalCk.toString());
    }, [products]);

    const print = async () => {
        if (products.length !== 0) {
            // On iOS/android prints the given html. On web prints the HTML from the current page.
            await Print.printAsync({
                html,
                printerUrl: selectedPrinter?.url, // iOS only
            });
        } else {
            Alert.alert('Error!!', 'Please provide complete information');
        }
    };

    const printToFile = async () => {
        if (customer && nameProduct && price && quantity) {
            const { uri } = await Print.printToFileAsync({ html });
            console.log('File has been saved to:', uri);
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } else {
            Alert.alert('Error!!', 'Please provide complete information');
        }
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
    };

    return (
        <PrintBtn html={html}>
            <View style={styles.container_top}>
                <View style={styles.container_top1}>
                    <Text style={{ fontSize: 16 }}>TMART KTX DHQG</Text>
                    <Text style={styles.address}>HCM</Text>
                    <Text style={styles.phone}>0970238648</Text>
                    <Text style={styles.gmail}>hong@gmail.com</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>HÓA ĐƠN BÁN HÀNG</Text>
                    <Image style={{ height: 30 }}></Image>
                </View>
                <View style={styles.container_top2}>
                    <View style={styles.date}>
                        <Text>Ngày:</Text>
                        <Text style={{ marginHorizontal: 40 }}>{currentDate}</Text>
                        <Text>{currentHour}</Text>
                    </View>
                    <View style={styles.casher}>
                        <Text>Thu ngân:</Text>
                        <Text>{data.name}</Text>
                    </View>
                    <View style={styles.customer}>
                        <Text style={styles.customer_title}>Khách hàng:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" Tên khách hàng"
                            onChangeText={(text) => setCustomer(text)}
                            value={customer}
                        />
                    </View>
                    <View style={styles.information}>
                        <Text style={{ marginTop: 10 }}>Điện thoại:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" Số điện thoại"
                            onChangeText={(text) => setPhone(text)}
                            value={phone}
                        />
                        <Text style={{ marginTop: 10 }}>Điểm</Text>
                        <Text style={{ marginTop: 10, marginHorizontal: 10 }}>0.0</Text>
                    </View>
                </View>
            </View>
            <KeyboardAvoidingView style={styles.container_center} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <View style={styles.container_center}>
                    <View style={styles.table}>
                        <View style={styles.table_colum}>
                            <Text style={{ ...styles.text_bold, ...styles.colum_id }}>#</Text>
                            <Text style={{ ...styles.text_bold, ...styles.colum_name }}>Tên hàng</Text>
                            <Text style={{ ...styles.text_bold, ...styles.colum_p }}>SL</Text>
                            <Text style={{ ...styles.text_bold, ...styles.colum_p }}>Đ.G</Text>
                            <Text style={{ ...styles.text_bold, ...styles.colum_p }}>CK</Text>
                            <Text style={{ ...styles.text_bold, ...styles.colum_p }}>TT</Text>
                            <Text style={{ ...styles.text_bold, ...styles.colum_p }}></Text>
                        </View>
                        <Text style={styles.text_bold}>
                            -------------------------------------------------------------------
                        </Text>

                        {products.map((product, index) => (
                            <View style={styles.table_colum_1} key={index}>
                                <View style={styles.table_colum1}>
                                    <Text style={{ ...styles.text_line, ...styles.colum_id }}>{product.id}</Text>
                                    <Text style={{ ...styles.text_line, ...styles.colum_name }}>{product.name}</Text>
                                </View>
                                <View style={styles.table_colum2}>
                                    <Text style={{ ...styles.text_line, ...styles.colum_p }}>{product.quantity}</Text>
                                    <Text style={{ ...styles.text_line, ...styles.colum_p }}>{product.price}</Text>
                                    <Text style={{ ...styles.text_line, ...styles.colum_p }}>{product.ck}</Text>
                                    <Text style={{ ...styles.text_line, ...styles.colum_p }}>{product.totalPrice}</Text>
                                    <View style={{ ...styles.action_btn, ...styles.colum_p }}>
                                        <TouchableOpacity
                                            style={{ marginTop: -120 }}
                                            onPress={() => removeProduct(index)}
                                        >
                                            <AntDesign name="closesquare" size={24} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <MaterialIcons name="mode-edit" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                        <View style={styles.table_colum}>
                            <Text style={{ ...styles.text_line, ...styles.colum_id }}>{id}</Text>
                            <View style={{ ...styles.text_line, ...styles.colum_name }}>
                                <SelectDropdown
                                    data={productsApi}
                                    onSelect={(selectedItem) => {
                                        setProductId(selectedItem.id);
                                        setNameProduct(selectedItem.name);
                                        setPrice(selectedItem.price.toString());
                                    }}
                                    buttonStyle={{ width: '100%', height: 35 }}
                                    rowTextStyle={{ fontSize: fontSizeDefault }}
                                    defaultButtonText={'Selected product'}
                                    renderDropdownIcon={() => (
                                        <Entypo name="chevron-small-down" size={24} color="black" />
                                    )}
                                    dropdownIconPosition="right"
                                    buttonTextAfterSelection={(selectedItem) => {
                                        return selectedItem.name;
                                    }}
                                    rowTextForSelection={(item) => {
                                        return item.name;
                                    }}
                                />
                            </View>
                            <TextInput
                                onChangeText={handleChangeQuantity}
                                value={quantity}
                                placeholder="SL"
                                keyboardType="numeric"
                                style={{ ...styles.text_line, ...styles.colum_p }}
                            />
                            <TextInput
                                onChangeText={handleChangePrice}
                                value={price}
                                placeholder="Đ.G"
                                keyboardType="numeric"
                                style={{ ...styles.text_line, ...styles.colum_p }}
                            />
                            <TextInput
                                onChangeText={handleChangeCk}
                                value={ck}
                                placeholder="0%"
                                keyboardType="numeric"
                                style={{ ...styles.text_line, ...styles.colum_p }}
                            />

                            <Text style={{ ...styles.text_line, ...styles.colum_p, marginTop: 3, color: '#ccc' }}>
                                {totalPrice}
                            </Text>
                            <View style={{ ...styles.action_btn, ...styles.colum_p }}>
                                <TouchableOpacity onPress={handleAddProduct}>
                                    <AntDesign name="plussquare" size={23} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.text_bold}>
                            -------------------------------------------------------------------
                        </Text>
                        <View style={styles.bottom_content}>
                            <View style={styles.bottom_row}>
                                <Text style={styles.text_bold}>Tổng tiền theo giá:</Text>
                                <Text style={styles.text_bold}>{totalBillPrice}</Text>
                            </View>

                            <View style={styles.bottom_row}>
                                <Text style={styles.text_bold}>Tổng chiêc khấu(%):</Text>
                                <Text style={styles.text_bold}>{ck}</Text>
                            </View>
                            <View style={styles.bottom_row}>
                                <Text style={styles.text_bold}>Tổng thanh toán:</Text>
                                <Text style={styles.text_bold}>{totalBillPrice}</Text>
                            </View>
                            <Text style={styles.line}>-----------------------------------</Text>
                            <View style={styles.bottom_end}>
                                <Text>{numberToVietnameseWords(totalBillPrice)}</Text>
                            </View>
                            <View style={styles.bottom_row}>
                                <Text style={styles.text_bold}>Kiểu T Toán:</Text>
                                <Text style={styles.text_bold}>TM</Text>
                            </View>
                            <View style={styles.bottom_row}>
                                <Text style={styles.text_bold}>Nhận tiền của khách: </Text>
                                <Text style={styles.text_bold}>{totalBillPrice}</Text>
                            </View>
                            <View style={styles.bottom_row}>
                                <Text style={styles.text_bold}>Trả lại:</Text>
                                <Text style={styles.text_bold}>0</Text>
                            </View>
                        </View>
                        <View style={styles.bottom_end}>
                            <Text>Design bởi....</Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </PrintBtn>
    );
}

const styles = StyleSheet.create({
    container_top: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    container_center: {
        flex: 2,
    },
    date: {
        flexDirection: 'row',
    },
    casher: {
        flexDirection: 'row',
    },
    customer: {
        flexDirection: 'row',
        textAlign: 'center',
        marginTop: -10,
    },
    customer_name: {
        width: 100,
        height: 40,
    },
    input: {
        borderBottomColor: '#ccc',
        width: 150,
        height: 40,
    },
    customer_title: {
        marginTop: 10,
    },
    information: {
        flexDirection: 'row',
        marginTop: -20,
    },
    container_top1: {
        alignItems: 'center',
    },
    container_top2: {
        justifyContent: 'left',
        alignItems: 'flex-start',
    },
    text_bold: {
        fontWeight: 'bold',
    },
    text_line: {
        marginLeft: 5,
    },
    table: {
        flexDirection: 'column',
    },
    table_colum: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    table_colum_1: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 5,
        height: '20%',
    },
    colum_id: {
        flex: 1,
        textAlign: 'left',
        marginLeft: 0,
        marginRight: 5,
    },
    colum_name: {
        flex: 5,
        fontWeight: 'bold',
        textAlign: 'left',
        // marginLeft: -10,
    },
    action_btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    colum_p: {
        flex: 1,
        textAlign: 'left',
        marginLeft: 0,
        marginLeft: 5,
        marginHorizontal: 10,
    },

    bottom_content: {
        marginVertical: 10,
    },
    bottom_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
    },
    bottom_end: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    table_colum1: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'red',
    },
    table_colum2: {
        flex: 1,
        height: 100,
        marginLeft: 60,
        flexDirection: 'row',

        // backgroundColor: 'red',
    },

    line: {
        textAlign: 'center',
    },
    bottom_row_pay: {
        flexDirection: 'row',
    },
});
