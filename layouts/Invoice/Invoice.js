import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Alert, Dimensions } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { white } from '../../constant/color';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Button from '../../components/Button';

export default function Invoice({ data }) {
    const currentDate = new Date();
    const dateNow = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const houseNow = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    const [selectedPrinter, setSelectedPrinter] = useState();
    // const [products, setProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [customer, setCustomer] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalBillPrice, setTotalBillPrice] = useState(0);

    const listProductHtml = () =>
        products
            .map(
                (product) =>
                    `<tr>
                <td style="word-break: break-word;">${product.name}</td>
                <td style="text-align: right;">${product.price}</td>
                <td style="text-align: right;">${product.quantity}</td>
                <td style="text-align: right;">${product.totalPrice}</td>
            </tr>`,
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
            padding: 0!important;
            border-bottom: 1px solid black;   
            border-collapse: collapse; 
            text-align: justify;
       }  
    th, td {  
        padding: 10px;  
    }  
        </style>
      </head>
      <body>
        <div class="container">
          <div class="container_top">
            <div style="text-align: center">
              <Text >WOORI COFFEE</Text>
            </div>
            <div style="text-align: center">
              <Text >ĐC: Ký túc xá khu B</Text>
            </div>
            <div style="text-align: center">
              <Text >SĐT: 01232143</Text>
            </div>
    
            <Text >-------------------------------</Text>
            <div style="text-align: center">
              <Text >HÓA ĐƠN THANH TOÁN</Text>
            </div>
            <div style="text-align: center">
              <Text >Số: 209130123910</Text>
            </div>
            <div style="text-align: center">
              <Text >Ngày: ${dateNow}</Text>
            </div>
          </div>
    
          <div  style="margin-top: 50px;">
            <div class="center_row">
              <Text ><b>Giờ vào:</b></Text>
              <Text >17/09/3023 12:01</Text>
            </div>
            <div class="center_row">
              <Text ><b>Khách hàng:</b></Text>
              <Text >${customer}</Text>
            </div>
            <div class="center_row">
              <Text ><b>Thu ngân:</b></Text>
              <Text >${data.name}</Text>
            </div>
            <table style="width: 100%;margin-top: 10px;">  
                
                <tr>
                    <th>Tên hàng</th>
                    <th style="text-align: right;">Đơn giá</th>
                    <th style="text-align: right;">Số lượng</th>
                    <th style="text-align: right;">TT</th>
                </tr>  
                ${listProductHtml()}
                </table>
            <div >
              <div  style="display: flex;">
                <br ><b>Tổng thành tiền</b></Text>
                <Text  style ="
                    text-align: right;
                    flex: 1;"><b>${totalBillPrice}</b></Text>
                </div>
              <div  style="display: flex;">
                <br ><b>Tổng cộng</b></Text>
                <Text  style ="
                    text-align: right;
                    flex: 1;"><b>${totalBillPrice}</b></Text>
              </div>
            
            </div>
            <div style="text-align: center;">
                <Text>-------------------------------</Text>         
                 <div >
                <Text >Xin cảm ơn hẹn gặp lại quý khách!</Text>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>`;

    const handleAddProduct = () => {
        if (nameProduct && price && quantity) {
            setProducts([...products, { name: nameProduct, price: price, quantity: quantity, totalPrice: totalPrice }]);
            setNameProduct('');
            setPrice();
            setQuantity();
            setTotalPrice();
        } else {
            Alert.alert('Error!!', 'Please provide complete information');
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
        if (customer && nameProduct && price && quantity) {
            await Print.printAsync({
                html,
                printerUrl: selectedPrinter?.url,
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
        const printer = await Print.selectPrinterAsync();
        setSelectedPrinter(printer);
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.invoice}>
                <ScrollView style={styles.container}>
                    <View style={styles.container_top}>
                        <Text style={styles.text_bold}>WOORI COFFEE</Text>
                        <Text style={styles.text_bold}>ĐC: Ký túc xá khu B</Text>
                        <Text style={styles.text_bold}>SĐT: 01232143</Text>
                        <Text style={styles.line} />
                        <Text style={styles.text_bold}>HÓA ĐƠN THANH TOÁN</Text>
                        <Text style={styles.text_bold}>Số: 209130123910</Text>
                        <Text style={styles.text_bold}>Ngày: {dateNow}</Text>
                    </View>
                    <View style={styles.container_center}>
                        <View style={styles.center_row}>
                            <Text style={styles.text_bold}>Giờ vào:</Text>
                            <Text style={styles.text_line}>
                                {dateNow} {houseNow}
                            </Text>
                        </View>
                        <View style={styles.center_row}>
                            <Text style={styles.text_bold}>Khách hàng:</Text>
                            <TextInput
                                style={styles.text_line}
                                onChangeText={(text) => setCustomer(text)}
                                value={customer}
                                placeholder="Nhập tên khách hàng"
                            />
                        </View>
                        <View style={styles.center_row}>
                            <Text style={styles.text_bold}>Thu ngân:</Text>
                            <Text style={styles.text_line}>{data.name}</Text>
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
                </ScrollView>
            </View>
            <View style={styles.container_bottom}>
                <Button customStylesBtn={styles.btn} text="Print" onPress={print} />
                <Button customStylesBtn={styles.btn} text="Save to PDF" onPress={printToFile} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
    },
    invoice: {
        flex: 10,
    },
    container: {
        flex: 1,
        backgroundColor: white,
        paddingHorizontal: 10,
    },
    container_top: {
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
        marginTop: 20,
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
    table_colum: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    container_bottom: {
        flex: 1,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        marginHorizontal: 10,
        height: '60%',
        width: '40%',
        borderRadius: 5,
    },
});
