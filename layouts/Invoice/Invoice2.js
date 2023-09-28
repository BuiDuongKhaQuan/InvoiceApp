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
    Image,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
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
          <p style="flex: 1">Ngày: 18/09/2023</p>
          <p style="flex: 1">09:00</p>
        </div>
        <div class="cashier" style="display: flex; flex-direction: row">
          <p style="margin-right: 20">Thu ngân:</p>
          <p>Nguyễn Thị Thanh Tâm</p>
        </div>
        <div class="customer" style="display: flex; flex-direction: row">
          <p style="margin-right: 20">Khách hàng:</p>
          <p>Siêm</p>
        </div>
        <div style="display: flex; flex-direction: row">
          <div style="display: flex; flex-direction: row; flex: 2">
            <p style="margin-right: 20">Điện thoại:</p>
            <p>0983681</p>
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
        
          <tr>
            <td style="font-weight: 700" > 1</td>
            <td style="font-weight: 700; padding-left: 30px;"> COFFEE NHA LÀM</td>
            <tr >
              <td></td>
              <td style="padding-left: 30px;">2</td>
              <td>50.000</td>
              <td style="padding-left: 6px">0%</td><td></td>
              <td>100.000</td>
            </tr> 
          </tr>
          <tr>
            <td style="font-weight: 700" > 2</td>
            <td style="font-weight: 700; padding-left: 30px;"> COFFEE NHA LÀM</td>
            <tr >
              <td></td>
              <td style="padding-left: 30px;">2</td>
              <td>50.000</td>
              <td style="padding-left: 6px">0%</td><td></td>
              <td>100.000</td>
            </tr> 
          </tr>
        </table>
        <p style="border-bottom: 1px dashed  black;"></p>
      </div>
      <div class="container_bottom" style="justify-content: right; ;">
        <div style="display: flex; flex-direction: row; justify-content: right;">
          <p style="justify-content: right; margin-right: 35%; font-weight: bold;">Tổng tiền theo giá bán:</p>
          <p>50.000</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right;">
          <p style="justify-content: right; margin-right: 42%; font-weight: bold;">Tổng chiếc khấu:</p>
          <p>0.0</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right;">
          <p style="justify-content: right; margin-right: 35%; font-weight: bold; font-size: 18px;">Tổng thanh toán:</p>
          <p>50.000</p>
        </div>
        <p style="text-align: center;">Hai mươi bốn ngìn đồng</p>
        <p style="border-bottom: 1px dashed  black;"></p>
        <div style="display: flex; flex-direction: row; justify-content: right;">
          <p style="justify-content: right; margin-right: 40%; font-weight: bold; ">Kiểu T.Toán:</p>
          <p>TM</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right;">
          <p style="justify-content: right; margin-right: 35%; font-weight: bold; ">Nhận tiền của khách:</p>
          <p>50.000</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: right;">
          <p style="justify-content: right; margin-right: 47%; font-weight: bold; ">Trả lại:</p>
          <p></p>
        </div>
        <p style="border-bottom: 1px dashed  black;"></p>
<p style="text-align: center;">Design by....</p>
      </div>
    </div>
  </body>
</html>

`;
export default function Invoice2() {
    const [selectedPrinter, setSelectedPrinter] = useState();
    const [products, setProducts] = useState([]);
    const [idProduct, setIdProduct] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [ck, setCk] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalBillPrice, setTotalBillPrice] = useState(0);

    const handleAddProduct = () => {
        if (nameProduct && price && quantity) {
            setProducts([
                ...products,
                { id: idProduct, name: nameProduct, price: price, quantity: quantity, ck: ck, totalPrice: totalPrice },
            ]);
            setIdProduct();
            setNameProduct('');
            setPrice();
            setCk();
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
        <ScrollView style={styles.container}>
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
                        <Text style={{ marginHorizontal: 40 }}>18/09/2023</Text>
                        <Text>09:00</Text>
                    </View>
                    <View style={styles.casher}>
                        <Text>Thu ngân:</Text>
                        <Text>Nguyễn Thị Thanh Tâm</Text>
                    </View>
                    <View style={styles.customer}>
                        <Text style={styles.customer_title}>Khách hàng:</Text>
                        <TextInput style={styles.input} placeholder=" Tên khách hàng"></TextInput>
                    </View>
                    <View style={styles.information}>
                        <Text style={{ marginTop: 10 }}>Điện thoại:</Text>
                        <TextInput style={styles.input} placeholder=" Số điện thoại"></TextInput>
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
                            <Text style={{ ...styles.text_bold, ...styles.colum_p }}>ĐK</Text>
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
                            <TextInput
                                onChangeText={(text) => setIdProduct(text)}
                                value={idProduct}
                                placeholder="STT"
                                keyboardType="numeric"
                                style={{ ...styles.text_line, ...styles.colum_id }}
                            />
                            <TextInput
                                onChangeText={(text) => setNameProduct(text)}
                                value={nameProduct}
                                placeholder="Tên"
                                style={{ ...styles.text_line, ...styles.colum_name }}
                            />
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
                                onChangeText={(text) => setCk(text)}
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
                                <Text style={styles.text_bold}>Tổng chiêc khấu:</Text>
                                <Text style={styles.text_bold}>{ck}</Text>
                            </View>
                            <View style={styles.bottom_row}>
                                <Text style={styles.text_bold}>Tổng thanh toán:</Text>
                                <Text style={styles.text_bold}>{totalBillPrice}</Text>
                            </View>
                            <Text style={styles.line}>-----------------------------------</Text>
                            <View style={styles.bottom_row}>
                                <Text style={styles.text_bold}>Kiểu T Toán:</Text>
                                <Text style={styles.text_bold}>TM</Text>
                            </View>
                            <View style={styles.bottom_row_pay}>
                                <Text style={styles.text_bold}>Nhận tiền của khách: </Text>
                                <TextInput
                                    style={{ marginVertical: -10 }}
                                    placeholder="Tiền nhận "
                                    keyboardType="numeric"
                                ></TextInput>
                            </View>
                            <View style={styles.bottom_row}>
                                <Text style={styles.text_bold}>Trả lại:</Text>
                                <Text style={styles.text_bold}></Text>
                            </View>
                        </View>
                        <View style={styles.bottom_end}>
                            <Text>Design bởi</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 160 }}>
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
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 30,
    },
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
