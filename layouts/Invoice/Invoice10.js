import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { dateNow, houseNow } from '../../utilies/date';
import PrintBtn from './PrintBtn';
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { fontSizeDefault } from '../../constant/fontSize';
import { useUserContext } from '../../screens/UserContext';

export default function Invoice10({ data }) {
    const { state } = useUserContext();
    const { user, company } = state;
    const [products, setProducts] = useState([]);
    const [customer, setCustomer] = useState('');
    const [productId, setProductId] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [totalBillPrice, setTotalBillPrice] = useState(0);
    const [productName, setProductName] = useState('');
    const [tax, setTax] = useState(0.0);
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

    const handleChangeTax = (text) => {
        setTax(text);
        setTotalBillPrice(subtotal + subtotal * (text / 100));
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
        const newTotal = subtotal + subtotal * (tax / 100);
        setTotalBillPrice(newTotal);
    }, [subtotal]);

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
                .container {
                    display: flex;
                    flex-direction: column;
                    width: 400px;
                }
                p {
                    margin: 0;
                    line-height: 1.5;
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
                .title_date {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }
                .title {
                    padding-right: 10px;
                }
                .from_to {
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 15px;
                }
                .from {
                    flex: 1;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                .flex_row {
                    display: flex;
                    flex-direction: row;
                    margin-right: 20px;
                }
                .row1 {
                    width: 65%;
                    text-align: left;
                }
                .row2 {
                    text-align: left;
                    width: 15%;
                }
                .row3 {
                    text-align: left;
                    width: 20%;
                }
                .bottom {
                    display: flex;
                    margin-top: 5px;
                    flex-direction: column;
                }
                .payment {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin: 20px 0 20px 60px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="top">
                    <div class="title_date">
                        <h1 class="title">Invoice</h1>
                        <div class="date">
                            <p class="text">Date: ${dateNow}-${houseNow}</p>
                            <p class="text">Invoice #: 128931728748</p>
                        </div>
                    </div>
                    <div class="from_to">
                        <div class="from">
                            <b>From: </b>
                            <p class="text">${company.name}</p>
                        </div>
                        <div class="from">
                            <b>To: </b>
                            <p class="text">${customer}</p>
                        </div>
                    </div>
                </div>
                <div class="center">
                    <table class="table">
                        <tr>
                            <th class="row1">Description</th>
                            <th class="row2">Hours</th>
                            <th class="row2">Rate/hours</th>
                            <th class="row3">Total</th>
                        </tr>
                       ${listProductHtml()}
                    </table>
                </div>
                <div class="bottom">
                    <div class="payment">
                        <div class="payment_left"></div>
                        <div class="payment_right">
                            <p>Subtotal: ${subtotal}</p>
                            <p>Tax: ${tax}</p>
                            <b>Total Amount Due: ${totalBillPrice}</b>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </html>
    `;
    return (
        <PrintBtn html={html}>
            <View style={styles.top}>
                <View style={styles.title_date}>
                    <Text style={styles.title}>Invoice</Text>
                    <View style={styles.date}>
                        <Text style={styles.text}>
                            Invoice Date: {dateNow}-{houseNow}
                        </Text>
                        <Text style={styles.text}>Invoice #:</Text>
                    </View>
                </View>
                <View style={styles.from_to}>
                    <View style={styles.from}>
                        <Text style={styles.text}>From: </Text>
                        <Text style={{ ...styles.text, fontWeight: '100' }}>{company.name}</Text>
                    </View>
                    <View style={styles.from}>
                        <Text style={styles.text}>To: </Text>
                        <TextInput
                            value={customer}
                            onChangeText={(text) => setCustomer(text)}
                            style={styles.input}
                            multiline={true}
                            placeholder="Enter to?"
                        />
                    </View>
                </View>
            </View>
            <View style={styles.center}>
                <View style={styles.row_table}>
                    <Text style={{ ...styles.row_item1, ...styles.border }}>Description</Text>
                    <Text style={{ ...styles.row_item2, ...styles.border }}>Hours</Text>
                    <Text style={{ ...styles.row_item2, ...styles.border }}>Rate/hour</Text>
                    <Text style={{ ...styles.row_item3, ...styles.border }}>Total</Text>
                    <Text style={{ ...styles.row_item4, ...styles.border, borderRightWidth: 1 }}></Text>
                </View>
                {products.map((product, index) => (
                    <View style={styles.row_table} key={index}>
                        <Text style={{ ...styles.row_item1, ...styles.border, borderBottomWidth: 1 }}>
                            {product.name}
                        </Text>
                        <Text style={{ ...styles.row_item2, ...styles.border, borderBottomWidth: 1 }}>
                            {product.quantity}
                        </Text>
                        <Text style={{ ...styles.row_item2, ...styles.border, borderBottomWidth: 1 }}>
                            {product.price}
                        </Text>
                        <Text
                            style={{ ...styles.row_item3, ...styles.border, borderBottomWidth: 1, borderRightWidth: 1 }}
                        >
                            {product.totalPrice}
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
                <View style={styles.payment}>
                    <View style={styles.payment_left}></View>
                    <View style={styles.payment_right}>
                        <View style={styles.tax_rate_value}>
                            <Text style={{ ...styles.text, fontWeight: '100' }}>Subtotal: </Text>
                            <View style={styles.tax_rate}>
                                <Text style={{ ...styles.text, fontWeight: '100' }}>Tax: </Text>
                            </View>
                            <Text style={styles.text}>Total Amout Due: </Text>
                        </View>
                        <View style={styles.tax_rate_value1}>
                            <Text style={{ ...styles.text, fontWeight: '100' }}>{subtotal}</Text>
                            <TextInput
                                value={tax}
                                onChangeText={handleChangeTax}
                                style={styles.input}
                                placeholder="?%"
                            />
                            <Text style={styles.text}>{totalBillPrice}</Text>
                        </View>
                    </View>
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
    title_date: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    date: {
        marginVertical: 10,
    },
    from_to: {
        flex: 1,
        flexDirection: 'row',
    },
    from: {
        flex: 1,
        flexDirection: 'row',
    },
    to: {
        flex: 1,
    },
    border: {
        borderLeftWidth: 1,
        borderTopWidth: 1,
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
    center: {
        flex: 10,
        marginBottom: 10,
    },
    bottom: {
        flex: 1,
    },
    text: {
        fontWeight: 'bold',
        marginVertical: 5,
    },
    input: {
        paddingRight: 5,
    },
    payment: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 20,
        marginLeft: 10,
    },
    payment_left: {
        flex: 0.7,
    },
    payment_right: {
        flex: 1,
        flexDirection: 'row',
    },
    tax_rate: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    tax_rate_value: {
        flex: 2,
        alignItems: 'flex-end',
    },
    tax_rate_value1: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 5,
    },
});
