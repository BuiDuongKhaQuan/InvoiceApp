import { ScrollView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { dateNow, houseNow } from '../../utilies/date';
import PrintBtn from './PrintBtn';
import { getProductById } from '../../Service/api';
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';

import { useUserContext } from '../../screens/UserContext';
import SelectDropdown from 'react-native-select-dropdown';

export default function Invoice11({ route, data }) {
    const { state } = useUserContext();
    const { user, company } = state;
    const [products, setProducts] = useState([]);
    const [customer, setCustomer] = useState('');
    const [productId, setProductId] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [productName, setProductName] = useState('');
    const [data2, setData2] = useState(route ? route.params.invoice : null);
    const [product, setProduct] = useState([]);
    const listProductHtml = () =>
        products
            .map(
                (product) =>
                    ` <tr>
        <td class="row1">${product.name}</td>
        <td class="row2">${product.quantity}</td>
        <td class="row2">${product.price}</td>
        <td class="row3">${product.totalPrice}</td>
    </tr>`,
            )
            .join('');

    const html = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <style>
            body {
                
                max-width: 400px;
              }
        
                .container {
                    display: flex;
                    flex-direction: column;
                   
                }
                p {
                    margin: 0;
                }
                table,
                th,
                td {
                    border: 1px solid black;
                }
                table {
                    border-collapse: collapse;
                }
                .top {
                    margin-bottom: 10px;
                }
                .title {
                    text-align: right;
                    padding-right: 10px;
                }
                .flex_row {
                    display: flex;
                    flex-direction: row;
                    margin-right: 20px;
                }
                .row1 {
                    width: 50%;
                    text-align: left;
                }
                .row2 {
                    text-align: center;
                    width: 15%;
                }
                .row3 {
                    text-align: right;
                    width: 20%;
                }
                .bottom {
                    display: flex;
                    margin-top: 5px;
                    flex-direction: row;
                }
            </style>
        </head>
        <body >
            <div class="container">
                <div class="top">
                    <h1 class="title">Invoice</h1>
                    <div class="date">
                        <p class="text">Date: ${dateNow}</p>
                        <p class="text">Invoice #: ${data.key}</p>
                    </div>
                </div>
                <div class="center">
                    <table class="table">
                        <tr>
                            <th class="row1">Description</th>
                            <th class="row2">Quantity</th>
                            <th class="row2">Unit Price</th>
                            <th class="row3">Total</th>
                        </tr>
                        ${listProductHtml()}
                    </table>
                </div>
                <div class="bottom">
                    <div class="flex_row">
                        <p class="text">Payment Terms:</p>
                        <p class="text">Pay</p>
                    </div>
                    <div class="flex_row">
                        <p class="text">Total Amout Due:  ${subtotal}</p>
                    </div>
                </div>
            </div>
        </body>
    </html>
    `;
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
    const handleAddProduct = () => {
        if (productId && price && quantity) {
            setProducts([
                ...products,
                {
                    productId: productId,
                    name: productName,
                    price: price,
                    quantity: quantity,
                    totalPrice: totalPrice,
                },
            ]);
            setProductId();
            setPrice();
            setQuantity();
            setTotalPrice();
            console.log(products);
        } else {
            Alert.alert('Error!!', 'Please provide complete information');
        }
    };

    useEffect(() => {
        const newSubtotal = products.reduce((total, product) => {
            return total + product.totalPrice;
        }, 0);
        setSubtotal(newSubtotal);
    }, [products]);

    useEffect(() => {
        const newTotal = subtotal + subtotal;
    }, [subtotal]);

    const getProductId = async (id) => {
        try {
            const response = await getProductById(id);
            // console.log(response.name);
            setProduct(response);
        } catch (error) {
            console.log(error);
        }
    };

    return route != null ? (
        <View style={styles.wrapper}>
            <View style={styles.invoice}>
                <ScrollView style={styles.container1}>
                    <View style={styles.top}>
                        <Text style={styles.title}>Invoice</Text>
                        <View style={styles.date}>
                            <Text style={styles.text}>Date: {data2.createdAt}</Text>
                            <Text style={styles.text}>Invoice #: {data2.key}</Text>
                        </View>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.row_table}>
                            <Text style={{ ...styles.row_item1, ...styles.border }}>Description</Text>
                            <Text style={{ ...styles.row_item2, ...styles.border }}>Quantity</Text>
                            <Text style={{ ...styles.row_item2, ...styles.border }}>Unit Price</Text>
                            <Text style={{ ...styles.row_item3, ...styles.border }}>Total</Text>
                            <Text style={{ ...styles.row_item4, ...styles.border, borderRightWidth: 1 }}></Text>
                        </View>
                        {data2.orders.map((order1, i) => (
                            <View style={styles.row_table}>
                                <Text style={{ ...styles.row_item1, ...styles.border }}>
                                    {getProductId(order1.productId).name}
                                    {product.name}
                                </Text>
                                <Text style={{ ...styles.row_item2, ...styles.border }}> {order1.quantity}</Text>
                                <Text style={{ ...styles.row_item2, ...styles.border }}> {product.price}</Text>
                                <Text style={{ ...styles.row_item3, ...styles.border }}>
                                    {product.price * order1.quantity}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.flex_row}>
                            <Text style={styles.text}>Payment Terms:</Text>
                            <TextInput style={styles.input} />
                        </View>
                        <View style={styles.flex_row}>
                            <Text style={styles.text}>Total Amount Due: {data2.totalPrice}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    ) : (
        <PrintBtn html={html}>
            <View style={styles.top}>
                <Text style={styles.title}>Invoice</Text>
                <View style={styles.date}>
                    <Text style={styles.text}>
                        Date: {dateNow} : {houseNow}
                    </Text>
                    <Text style={styles.text}>Invoice #:</Text>
                </View>
            </View>
            <View style={styles.center}>
                <View style={styles.row_table}>
                    <Text style={{ ...styles.row_item1, ...styles.border }}>Description</Text>
                    <Text style={{ ...styles.row_item2, ...styles.border }}>Quantity</Text>
                    <Text style={{ ...styles.row_item2, ...styles.border }}>Unit Price</Text>
                    <Text style={{ ...styles.row_item3, ...styles.border }}>Total</Text>
                    <Text style={{ ...styles.row_item4, ...styles.border, borderRightWidth: 1 }}></Text>
                </View>
                {products.map((product, index) => (
                    <View style={styles.row_table} key={index}>
                        <Text style={{ ...styles.row_item1, ...styles.border }}>{product.name}</Text>
                        <Text style={{ ...styles.row_item2, ...styles.border }}> {product.quantity}</Text>
                        <Text style={{ ...styles.row_item2, ...styles.border }}> {product.price}</Text>
                        <Text style={{ ...styles.row_item3, ...styles.border }}> {product.totalPrice}</Text>
                        <View
                            style={{
                                ...styles.action_btn,
                                ...styles.row_item4,
                                ...styles.border,
                                borderBottomWidth: 1,
                                borderRightWidth: 1,
                            }}
                        >
                            <TouchableOpacity onPress={() => removeProduct(index)}>
                                <AntDesign name="closesquare" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialIcons name="mode-edit" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                <View style={styles.row_table}>
                    <View
                        style={{
                            ...styles.row_item1,
                            ...styles.border,
                            borderBottomWidth: 1,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                        }}
                    >
                        <SelectDropdown
                            data={productsApi}
                            onSelect={(selectedItem) => {
                                setProductId(selectedItem.id);
                                setProductName(selectedItem.name);
                                setPrice(selectedItem.price.toString());
                            }}
                            buttonStyle={{ width: '100%', height: 35 }}
                            rowTextStyle={{ fontSize: 16 }}
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
                        style={{
                            ...styles.row_item2,
                            ...styles.border,
                            borderBottomWidth: 1,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                        }}
                        value={quantity}
                        onChangeText={handleChangeQuantity}
                    />
                    <TextInput
                        style={{
                            ...styles.row_item2,
                            ...styles.border,
                            borderBottomWidth: 1,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                        }}
                        value={price}
                        onChangeText={handleChangePrice}
                    />
                    <Text
                        style={{
                            ...styles.row_item3,
                            ...styles.border,
                            borderBottomWidth: 1,
                        }}
                    >
                        {totalPrice}
                    </Text>
                    <View
                        style={{
                            ...styles.action_btn,
                            ...styles.row_item4,
                            ...styles.border,
                            borderBottomWidth: 1,
                            borderRightWidth: 1,
                        }}
                    >
                        <TouchableOpacity onPress={handleAddProduct}>
                            <AntDesign name="plussquare" size={23} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.flex_row}>
                    <Text style={styles.text}>Payment Terms:</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.flex_row}>
                    <Text style={styles.text}>Total Amout Due:{subtotal}</Text>
                </View>
            </View>
        </PrintBtn>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: StatusBar.currentHeight || 20,
    },
    flex_row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },
    top: {
        flex: 1,
        marginBottom: 20,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'right',
        marginHorizontal: 20,
    },
    border: {
        borderWidth: 1,
        borderColor: 'gray',
    },
    row_table: {
        flex: 1,
        flexDirection: 'row',
    },
    row_item1: {
        flex: 2,
        paddingLeft: 5,
    },
    row_item2: {
        flex: 0.8,
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    row_item3: {
        flex: 0.9,
        textAlign: 'right',
        paddingRight: 5,
    },
    row_item4: {
        flex: 0.7,
    },
    date: {},
    center: {
        flex: 10,
        marginBottom: 10,
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
    },
    text: {},
    input: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        flex: 1,
        marginRight: 5,
    },
});
