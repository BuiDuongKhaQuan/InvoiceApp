import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { Entypo } from '@expo/vector-icons';
import { fontSizeDefault } from '../../constant/fontSize';
import { dateNow, houseNow } from '../../utilies/date';
import PrintBtn from './PrintBtn';

export default function Invoice({ data }) {
    const [products, setProducts] = useState([]);
    const [customer, setCustomer] = useState('');
    const [productId, setProductId] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalBillPrice, setTotalBillPrice] = useState(0);
    const [productName, setProductName] = useState('');
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
        if (productId && price && quantity) {
            setProducts([
                ...products,
                { productId: productId, name: productName, price: price, quantity: quantity, totalPrice: totalPrice },
            ]);
            setProductId();
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

    return (
        <PrintBtn html={html}>
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
                        <View style={{ ...styles.text_line, ...styles.colum_name }}>
                            <SelectDropdown
                                data={productsApi}
                                onSelect={(selectedItem) => {
                                    setProductId(selectedItem.id);
                                    setProductName(selectedItem.name);
                                    setPrice(selectedItem.price.toString());
                                }}
                                buttonStyle={{ width: '100%', height: 35 }}
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
                            />
                        </View>
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
        </PrintBtn>
    );
}

const styles = StyleSheet.create({
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

    dropdown: {},
    dropdown_btn: {
        borderRadius: 5,
    },
});
