import { StyleSheet, Text, View, TextInput, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/SettingItem/header';
import Button from '../components/Button';
import { fontSizeDefault } from '../constant/fontSize';
import { dateNow, houseNow } from '../utilies/date';
import { useUserContext } from './UserContext';
import { getProductsByCompany } from '../Service/api';
import Product from '../components/Product';
import { subTotal, totalBillPrice } from '../utilies/calculator';
import { Asset } from 'expo-asset';
import PrintBtn from '../components/Button/Print';

export default function CreateInvoice({ route }) {
    const { state } = useUserContext();
    const companyName = state.company.name;
    const companyPhone = state.company.phone;
    const companyAddress = state.company.address;
    const companyEmail = state.company.email;
    const customer = state.user.name;
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactAddress, setContactAddress] = useState('');
    const [note, setNote] = useState('');
    const [tax, setTax] = useState('');
    const idTemplate = route.params?.data;
    const [listProductsSelect, setListProductsSelect] = useState([]);
    const [IDBill, setIDBill] = useState('');
    const [showProductList, setShowProductList] = useState(false);
    const [showListProductSelected, setShowListProductSelected] = useState(false);
    const [products, setProducts] = useState([]);
    const [isProductModalVisible, setProductModalVisible] = useState(false);

    useEffect(() => {
        let noBill = `${dateNow}${houseNow}-${idTemplate}`;
        setIDBill(noBill.replace(/[\/:]/g, ''));
        getProductByCompany();
    }, []);

    useEffect(() => {
        getProductByCompany();
    }, [IDBill]);

    const handleAddProduct = (product) => {
        const existingProductIndex = listProductsSelect.findIndex((item) => item.id === product.id);

        if (existingProductIndex !== -1) {
            const updatedProducts = [...listProductsSelect];
            updatedProducts[existingProductIndex].quantity += 1;
            updatedProducts[existingProductIndex].totalPrice =
                updatedProducts[existingProductIndex].quantity * product.price;

            setListProductsSelect(updatedProducts);
        } else {
            setListProductsSelect((prevProducts) => [
                ...prevProducts,
                {
                    stt: prevProducts.length + 1,
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    totalPrice: product.price,
                },
            ]);
        }
        setShowListProductSelected(listProductsSelect.length > 0);
        console.log(listProductsSelect);
    };

    const toggleProductList = () => {
        setShowProductList(!showProductList);
        setShowListProductSelected(listProductsSelect.length > 0);
    };

    const getProductByCompany = async () => {
        try {
            const response = await getProductsByCompany(companyName);
            setProducts(response);
        } catch (error) {
            console.log(error);
        }
    };
    const removeProduct = (key) => {
        listProductsSelect.splice(key, 1);
        setListProductsSelect([...listProductsSelect]);
    };

    const closeProductModal = () => {
        setProductModalVisible(false);
    };

    // Template invoice format html
    // Using print
    const total = subTotal(listProductsSelect);
    const totalBill = totalBillPrice(tax, total);
    const htmlTemplates = {};
    const listProductHtml1 = (data) =>
        data
            .map(
                (product) =>
                    `<tr >
                <td  style=" width: 10%; height: 30px; border-top: 2px solid black; border-right: 2px solid black; text-align: center;">${product.stt}</td>
                <td  style="width: 30%; border-bottom: 0px; border-top: 2px solid black; border-right: 2px solid black;text-align: center; " >${product.name}</td>
                <td  style="width: 10%; border-top: 2px solid black; border-right: 2px solid black; text-align: center; " >${product.quantity}</td>
                <td  style=" width: 10%; height: 30px; border-top: 2px solid black; border-right: 2px solid black; text-align: center; ">${product.price}</td>
                <td style=" border-bottom: 2px solid black; border-top: 2px solid black;  text-align: center;  ">${product.totalPrice}</td>
            </tr>`,
            )
            .join('');

    htmlTemplates[1] = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width; initial-scale=1.0" />
                <title>Document</title>
                <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    background-color: rgb(236 ,208 ,106);
                    margin-left: 10;
                    margin-right: 10;
                    border: 2px solid black;
                    width: 617px;
                    height: 754px;
                    font-family: Verdana,  Tahoma, sans-serif;
                }
                .container_top {
                    align-items: "center";
                    flex: 1;
                    text-align: center;
                    justify-content: "center";
                }
                table, th, td {
                    padding: 0!important;
                    border-collapse: collapse;
                }

                th, td {
                    padding: 10px;
                }

                </style>
            </head>
            <body>
            <div class="container">
                <div class="container_top_left">
                <div style="display: flex; justify-content: space-between;margin-left: 10px ; margin-top: 10px; ">
                <Text >GST No: ${IDBill}</Text>
                <div class="container_top_left">
                <div style=" display: flex; justify-content: space-between; margin-right: 10px; ">
                <Text >Date: ${dateNow}</Text>
                </div>
                </div>
                </div>
                </div>
                <div class="container_top">
                    <div style="text-align: center ; font-weight:bold;
                    font-size: 30px ; ">
                    <Text >Tax Invoice Bill</Text>
                    </div>
                    <div style="text-align: center ;font-weight:bold;
                    font-size: 40px; ;">
                    <Text >${companyName}</Text>
                    </div>
                    <div style="text-align: center;font-size: 20px">
                    <Text >Address - ${companyAddress}</Text>
                    </div>
                    <div style="text-align: center;font-size: 20px">
                        <Text >Ph No: ${companyPhone}</Text>
                    </div>
                </div>
                <div  style="margin-top: 50px;">
                    <div class="center_row" style="margin-left: 10px;">
                    <Text >Name: ${contactName}</Text>
                    </div>
                    <div class="center_row" style="margin-left: 10px;">
                    <Text></Text>
                    </div>
                    <div class="center_row" style="display: flex; justify-content: space-between;margin-left: 10px">
                    <Text  >Invoice No: ${IDBill}</Text>

                        <div style="margin-right: 50px;"><Text  >Date: ${dateNow}</Text></div>
                    </div>
                    <div class="center_row" style="display: flex; justify-content: space-between;margin-left: 10px">
                        <Text >Mobile: ${contactPhone}</Text>

                    <div style="margin-right: 60px;"> <Text  >Email: ${contactEmail}</Text></div>

                    </div>
                        <table style="width: 100%;margin-top: 10px;">
                        <tr>
                            <td style="text-align: center; width: 13%; height: 40px; border-top: 2px solid black; border-right: 2px solid black;border-bottom: 2px solid black; "><b>Sl.No.</b></td>
                            <td style="text-align: center; width: 30% ;border-top: 2px solid black; border-right: 2px solid black;border-bottom: 2px solid black; "><b>Particulars</b></td>
                            <td style="text-align: center;width: 10%; border-top: 2px solid black; border-right: 2px solid black;border-bottom: 2px solid black; "><b>Qty</b></td>
                            <td style="text-align: center;width: 12%; border-top: 2px solid black; border-right: 2px solid black; "><b>Rate</b></td>
                            <td style="text-align: center;border-top: 2px solid black;   "><b>Amount</b></td>
                        </tr>
                        ${listProductHtml1(listProductsSelect)}
                        <tr>
                            <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black; " rowspan="3"></td>
                            <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black; " rowspan="3"></td>
                            <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black;  " rowspan="3"></td>
                            <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;  border-right: 2px solid black;"><b>Sub Total</b></td>
                            <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;  ">${total}</td>

                        </tr>
                        <tr>
                        <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black;"><b>Tax</b></td>
                        <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;">${tax}</td>
                    </tr>
                    <tr>
                        <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black;  border-right: 2px solid black; "><b>Total</b></td>
                        <td style="text-align: center; width: 13%; height: 40px;  border-bottom: 2px solid black;  ">${totalBill}</td>
                    </tr>

                    </table>
                    <div >
                    <div  style="display: flex; margin-bottom: 20px; margin-left: 10px;">
                        <br ><b>In Words:</b> ${note}</Text>
                        </div>
                        <hr color="black"  />
                    <div  style="display: flex; font-size: 20px; margin-left: 10px;">
                        <br ><b>Thank You and Visit Again.</b></Text>
                    </div>
                    <div style="text-align: end; font-size: 20px; margin-bottom: 15px;margin-right: 10px; ">
                    <br ><b>Signature: _____________</b></Text>
                    </div>
                    </div>
                </div>
                </div>
            </body>
            </html>`;

    const listProductHtml2 = (data) =>
        data
            .map(
                (product) =>
                    `<tr >
            <td  style=" width: 10%; color: blue;  text-align: center; height: 30px; border-top: 2px solid blue; border-right: 2px solid blue; border-bottom: 2px solid blue; ">${product.stt}</td>
            <td  style="width: 30%; color: blue;text-align: center; border-bottom: 2px solid blue; border-top: 2px solid blue; border-right: 2px solid blue; " >${product.name}</td>
            <td  style="width: 10%; color: blue; text-align: center;border-top: 2px solid blue; border-right: 2px solid blue; border-bottom: 2px solid blue; " >${product.quantity}</td>
            <td  style=" width: 10%; color: blue; text-align: center;height: 30px; border-top: 2px solid blue; border-right: 2px solid blue; border-bottom: 2px solid blue; ">${product.price}</td>
            <td style="color: blue;text-align: center; border-bottom: 2px solid blue; border-top: 2px solid blue;    ">${product.totalPrice}</td>
        </tr>`,
            )
            .join('');
    htmlTemplates[2] = `<!DOCTYPE html>
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
                            <Text>${companyName}</Text>
                        </div>
                        <div style="text-align: center; font-size: 20px; font-weight: bold; color: blue">
                            <Text>Address ${companyAddress}</Text>
                        </div>
                        <div style="text-align: center; font-size: 20px; font-weight: bold; color: blue">
                            <Text>Ph :${companyPhone}</Text>
                        </div>
                        <hr size="2px" ; color="blue" />
                    </div>

                    <div style="display: flex; justify-content: space-between; color: blue">
                        <div style="margin-left: 10px">
                            <Text>Sl.No: ${IDBill}</Text>
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
                        ${listProductHtml2(listProductsSelect)}
                    </table>
                    <div style="text-align: end; color: blue">
                        <text><b>For ${companyName}</b></text>
                    </div>
                </div>
            </body>
        </html>
        `;

    const listProductHtml3 = (data) =>
        data
            .map(
                (product) =>
                    ` <tr>
                    <td style="font-weight: 700">${product.stt}</td>
                    <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                    <tr>
                        <td></td>
                        <td style="padding-left: 30px;">${product.quantity}</td>
                        <td>${product.price}</td>
                        <td style="padding-left: 6px">0.0</td>
                        <td></td>
                        <td>${product.totalPrice}</td>
                    </tr>
                </tr>`,
            )
            .join('');
    htmlTemplates[3] = `
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
                <p>${companyName}</p>
                </div>
                <div style="text-align: center">
                <p>${companyAddress}</p>
                </div>
                <div style="text-align: center">
                <p>${companyPhone}</p>
                </div>
                <div style="text-align: center">
                <p>hong@gmail.com</p>
                </div>
                <div style="text-align: center; font-weight: 600">
                <p>${companyEmail}</p>
                </div>
                <div style="text-align: center; ">
                <img src="https://vienthonglaw.vn/wp-content/uploads/2021/12/Ma-Vach-1.jpg" alt="" style="height: 30; width: 50%;"/>
                </div>
                
            </div>
            <div class="container_center">
                <div style="display: flex; flex-direction: row">
                <p style="flex: 1">Ngày: ${dateNow}</p>
                <p style="flex: 1">${houseNow}</p>
                </div>
                <div class="cashier" style="display: flex; flex-direction: row">
                <p style="margin-right: 20">Thu ngân: </p>
                </p>${customer}<p>
                </div>
                <div class="customer" style="display: flex; flex-direction: row">
                <p style="margin-right: 20">Khách hàng:</p>
                <p>${contactName}</p>
                </div>
                <div style="display: flex; flex-direction: row">
                <div style="display: flex; flex-direction: row; flex: 2">
                    <p style="margin-right: 20">Điện thoại:</p>
                    <p>${contactPhone}</p>
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
                
                ${listProductHtml3(listProductsSelect)}
                
                </table>
                <p style="border-bottom: 1px dashed  black;"></p>
            </div>
            <div class="container_bottom" style="justify-content: right; ;">
                <div style="display: flex; flex-direction: row; justify-content: right;">
                <p style="justify-content: right; margin-right: 35%; font-weight: bold;">Tổng tiền theo giá bán:</p>
                <p>${total}</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: right;">
                <p style="justify-content: right; margin-right: 42%; font-weight: bold;">Tổng chiếc khấu:</p>
                <p>${tax}</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: right;">
                <p style="justify-content: right; margin-right: 35%; font-weight: bold; font-size: 18px;">Tổng thanh toán:</p>
                <p>${totalBill}</p>
                </div>
                <p style="text-align: center;"></p>
                <p style="border-bottom: 1px dashed  black;"></p>
                <div style="display: flex; flex-direction: row; justify-content: right;">
                <p style="justify-content: right; margin-right: 40%; font-weight: bold; ">Kiểu T.Toán:</p>
                <p>Tiền mặt</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: right;">
                <p style="justify-content: right; margin-right: 35%; font-weight: bold; ">Nhận tiền của khách:</p>
                <p>${totalBill}</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: right;">
                <p style="justify-content: right; margin-right: 47%; font-weight: bold; ">Trả lại: </p>
                <p>0</p>
                </div>
                <p style="border-bottom: 1px dashed  black;"></p>
                <p style="text-align: center;">Design by ${companyName}</p>
            </div>
            </div>
        </body>
        </html>

        `;

    const listProductHtml4 = (data) =>
        data
            .map(
                (product) =>
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
                    ${product.stt}
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

    htmlTemplates[4] = `<!DOCTYPE html>
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
                            <Text><b>${companyName}</b></Text>
                        </div>
                        <div style="color: hsl(0deg 0% 75.69%); font-size: 30px">
                            <Text>INVOICE</Text>
                        </div>
                    </div>
                
                    <div style="display: flex; justify-content: space-between">
                        <Text style="margin-top: 2px; margin-bottom: 2px">Street Address: ${companyAddress}</Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px"><b>DATE:</b></Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px">${dateNow}</Text>
                    </div>
                    <div style="display: flex; justify-content: space-between">
                        <Text style="margin-top: 2px; margin-bottom: 2px">City, ST ZIP Code ${contactPhone}</Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px"><b>INVOICE#</b></Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px">${IDBill}</Text>
                    </div>
                    <div style="display: flex; justify-content: space-between">
                        <Text style="margin-top: 2px; margin-bottom: 2px">Phone [number] Fax [number] ${contactPhone}</Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px"><b>FOR:</b></Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px; font-style: italic">${companyName}</Text>
                    </div>
                   
                </div>
    
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text><b>Bill To:</b></Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>Name: ${contactName}</Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>Company Name:</Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>Street Address: ${contactAddress}</Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>City, ST ZIP Code: 1000</Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>Phone: ${contactPhone}</Text>
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
                    ${listProductHtml4(listProductsSelect)}
    
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
                            ${total}
                        </td>
                    </tr>
                </table>
                <div style="margin-top: 10px; font-size: 13px">
                    <text>Make all checks payable to ${companyName} </text>
                </div>
                <div style="margin-top: 20px; font-size: 13px; margin-bottom: 20px">
                    <text> If you have any questions concerning this invoice, ${contactName}, ${contactPhone}, ${contactEmail} </text>
                </div>
                <div style="text-align: center; font-size: 13px">
                    <text><b>THANK YOU FOR YOUR BUSINESS! </b></text>
                </div>
            </div>
        </body>
    </html>
    `;

    const listProductHtml5 = (data) =>
        data
            .map(
                (product) =>
                    ` <tr>
                        <td style="font-weight: 700">${product.stt}</td>
                        <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                        <td style="text-align: center" ">${product.price}</td>
                        <td style="padding-left: 30px;">${product.quantity}</td>
                        <td style="text-align: center">${product.totalPrice}</td>
                    
                </tr>`,
            )
            .join('');
    htmlTemplates[5] = `
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
                            align-items: 'center';
                            flex: 1;
                            text-align: center;
                            justify-content: 'center';
                        }
            
                        table,
                        th,
                        td {
                            border-collapse: collapse;
                        }
                        p {
                            margin: 3px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="container_top" style="margin-top: 40px">
                            <div style="text-align: right;">
                                <p style="font-weight: 600;">${companyName}</p>
                            </div>
                            <div style="text-align: right">
                                <p>${companyAddress}</p>
                            </div>
                            <div style="text-align: right">
                                <p>${companyPhone}</p>
                            </div>
                            <div style="text-align: right">
                                <p>${companyEmail}</p>
                            </div>
                            <div style="text-align: left; font-weight: 600">
                                <p>HÓA ĐƠN THANH TOÁN</p>
                            </div>
                        </div>
                        <div class="container_center">
                            <div style="display: flex; flex-direction: row">
                                <div style="display: flex; flex-direction: row; flex: 2">
                                    <p style="margin-right: 20;font-weight: 600">Invoice No:</p>
                                    <p>${IDBill}</p>
                                </div>
                                
                                <div style="display: flex; flex-direction: row; flex: 1">
                                    <p style="margin-right: 20;font-weight: 600">Date:</p>
                                    <p>${dateNow}</p>
                                </div>
                            </div>
                            <div class="cashier" style="display: flex; flex-direction: row">
                                <p style="margin-right: 20;font-weight: 600">Bill to:</p>
                                <div style="flexDirection: 'column'">
                                <p>${contactName}</p>
                                <p>${contactAddress}</p>
                                </div>
                            </div>
                            
                            <table style="width: 100%">
                                <tr style="border-bottom: 1px dashed black">
                                    <th style="text-align: center">Item</th>
                                    <th style="text-align: left">Description</th>
                                    <th style="text-align: center">Price</th>
                                    <th style="text-align: center">Quantity</th>
                                    <th style="text-align: center">Total</th>
                                </tr>
                                <tr>
                                ${listProductHtml5(listProductsSelect)}

                                </tr>
                            </table>
                            <p style="border-bottom: 1px dashed black"></p>
                        </div>
                        <div class="container_bottom" style="justify-content: right">
                            <div style="display: flex; flex-direction: row; justify-content: right">
                                <p style="justify-content: left; font-weight: bold">Total:</p>
                                <p>${total}</p>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: left">
                            <p style="justify-content: left; font-weight: bold">Thank you</p>
                        </div>
                            <div style="display: flex; flex-direction: row; justify-content: left">
                                <p style="justify-content: left; font-weight: bold">Bank name:</p>
                                <p>${customer}</p>
                                </div>
                            <div style="display: flex; flex-direction: row; justify-content: left">
                                <p style="justify-content: left; font-weight: bold; font-size: 18px">Bank acount:</p>
                                <p>${contactPhone}</p>
                                </div>
                            <p style="border-bottom: 1px dashed black"></p>
                            <div style="display: flex; flex-direction: row; justify-content: right"></div>
                        </div>
                    </div>
                </body>
            </html>  
            `;

    const listProductHtml6 = (data) =>
        data
            .map(
                (product) =>
                    ` <tr>
                            <td style="font-weight: 700">${product.stt}</td>
                            <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                                <td style="text-align: center" ">${product.price}</td>
                                <td style="padding-left: 30px;">${product.quantity}</td>
                                <td style="text-align: center">${product.totalPrice}</td>
                            
                        </tr>`,
            )
            .join('');
    htmlTemplates[6] = `
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
                                    align-items: 'center';
                                    flex: 1;
                                    text-align: center;
                                    justify-content: 'center';
                                }
                                .header_table_1 {
                                    background-color: '##ffcc00';
                                }
                                .container_header_contents {
                                    background-color: rgb(251, 251, 251);
                                    width: 20%;
                                    margin-left: 60%;
                                    margin-right: 15%;
                                    font-size: 40px;
                                }
                                .container_ table,
                                th,
                                td {
                                    border-collapse: collapse;
                                }
                                p {
                                    margin: 3px;
                                }
                                .container_contents {
                                    display: flex;
                                    justify-content: space-between;
        
                                }
                                .container_header {
                                    background-color: rgb(255, 191, 0);
                                    height: 100%;
                                }
                                .container_header_name {
                                    margin-left: 65%;
                                    margin-right: 15%;
                                    background-color: white;
                                    font-weight: bold;
                                    font-size: 25px;
                                }
                                
                                .container_bottom_2 {
                                    background-color: rgb(255, 191, 0);
                                }
                                .container_bottom_name {
                                    margin-top:5%;
                                    margin-left: 65%;
                                    margin-right: 15%;
                                    background-color: white;
                                    color: white;
                                    height:2px;
                                }
                                .container_bottom_name_2 {
                                    margin-left: 66%;
                                    font-weight: bold;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="container_top" style="margin-top: 40px">
                                    <div style="text-align: left">
                                        <p>${companyName}</p>
                                    </div>
                                    
                                    </div>
                                    <div class="container_header">
                                        <div class="container_header_name">Invoice</div>
                                    </div>
                                    
                                </div>
                    
                                <div class="container_center">
                                    <div style="display: flex; flex-direction: row">
                                        <div style="display: flex; flex-direction: column; flex: 2">
                                            <p style="margin-right: 20; font-weight: bold">Invoice To:</p>
                                            <p>${contactName}</p>
        
                                        </div>
                                        <div>
                                            <div style="display: flex; flex-direction: row; flex: 1">
                                                <p style="margin-right: 20; font-weight: bold">Invoice#:</p>
                                                <p>${IDBill}</p>
                                            </div>
                                            <div style="display: flex; flex-direction: row; flex: 1">
                                                <p style="margin-right: 20; font-weight: bold">Date:</p>
                                                <p>${dateNow}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cashier" style="display: flex; flex-direction: row">
                                        <p style="margin-right: 20; font-weight: bold">Address:</p>
                                        <p>${companyAddress}s</p>
                                    </div>
                                    <table class="table" style="width: 100%">
                                        <tr style="background-color: #595959; color: aliceblue">
                                            <div class="header_table">
                                                <div class="header_table_1">
                                                    <th style="text-align: center">Item</th>
                                                    <th style="text-align: left">Description</th>
                                                </div>
                                                <th style="text-align: center">Price</th>
                                                <th style="text-align: center">Sl</th>
                                                <th style="text-align: center">Total</th>
                                            </div>
                                        </tr>
                                        <tr>
                                        ${listProductHtml6(listProductsSelect)}
                                        </tr>
                                    </table>
                                </div>
                                <div class="container_contents">
                                    <div class="container_bottom" style="justify-content: right">
                                        <div style="display: flex; flex-direction: row; justify-content: left">
                                            <p style="justify-content: right; font-weight: bold">Thank you</p>
                                        </div>
                                        <div style="display: flex; flex-direction: row; justify-content: left">
                                            <p style="justify-content: left; font-weight: bold">Terms and conditions</p>
                                            <p>trandz</p>
                                        </div>
                                        <div style="display: flex; flex-direction: row; justify-content: left">
                                            <p style="justify-content: left; font-weight: bold; font-size: 18px">Payment Infor:</p>
                                            <p>${contactName}</p>
                                        </div>
                                        <div style="display: flex; flex-direction: row; justify-content: right"></div>
                                    </div>
                                    <div class="container_bottom" style="justify-content: right">
                                        <div style="display: flex; flex-direction: row; justify-content: left">
                                            <p style="justify-content: left; font-weight: bold">Sub total:</p>
                                            <p>${total}</p>
                                        </div>
                                        <div style="display: flex; 
                                        flex-direction: row;                                 justify-content: space-between; 
                                        justify-content: space-between; 
                                        ">
                                            <p style="justify-content: left; font-weight: bold; font-size: 18px">Tax:</p>
                                            <p>${tax}%</p>
                                        </div>
                                        <div style="display: flex; 
                                        flex-direction: row; 
                                        justify-content: space-between; 
                                        background-color: rgb(255, 191, 0);">
                                          <p >Total:</p>
                                            <p >${totalBill}</p>
                                        </div>
                                        <div style="display: flex; flex-direction: row; justify-content: right"></div>
                                    </div>
                                    
                                </div>
                                <div class="container_bottom_2" >
                                    <div class="container_bottom_name">
                                    </div>
                                </div>
                            </div>
                            <div class="container_bottom_name_2">
                            Authorised Sign</div>
                        </div>
                        <div style = "font-weight: bold;">
                        ${companyPhone}  |  ${companyAddress}  |  Website</div>
                    </div>
                        </body>
                    </html>
                    `;
    const imageUri1 = require('../assets/images/header.png');
    const imageUri2 = require('../assets/images/botter.png');

    const imageAsset1 = Asset.fromModule(imageUri1);
    const imageAsset2 = Asset.fromModule(imageUri2);

    // Chuyển đổi tài nguyên hình ảnh thành URI
    const uri1 = imageAsset1.localUri || imageAsset1.uri;
    const uri2 = imageAsset2.localUri || imageAsset2.uri;
    const listProductHtml7 = (data) =>
        data
            .map(
                (product) =>
                    `<tr>
                                <td style="font-weight: 700">${product.stt}</td>
                                <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                                <td style="text-align: center" ">${product.price}</td>
                                <td style="padding-left: 30px;">${product.quantity}</td>
                                <td style="text-align: center">${product.totalPrice}</td>
                                
                            </tr>`,
            )
            .join('');
    htmlTemplates[7] = `
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
                                align-items: 'center';
                                flex: 1;
                                text-align: center;
                                justify-content: 'center';
                                flex-direction: row;
    
                            }
                            .header_table_1 {
                                background-color: '##ffcc00';
                            }
                            .container_header_contents {
                                background-color: rgb(251, 251, 251);
                                width: 20%;
                                margin-left: 60%;
                                margin-right: 15%;
                                font-size: 40px;
                            }
                            .container_ table,
                            th,
                            td {
                                border-collapse: collapse;
                            }
                            p {
                                margin: 3px;
                            }
                            .container_contents {
                                display: flex;
                                justify-content: space-between;
                            }
                            .container_bottom_name_2 {
                                margin-left: 66%;
                                font-weight: bold;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="container_top" >
                                <div class="container_header">
                                <div style=" font-size:40px;font-width:bold; position: absolute;margin-top: 45px;">
                                <p>${companyName}</p>
                                </div>
                                    <div style="text-align: right">
                                    <img src="${uri1}" width="70%" ; />
                
                                    </div>
                                </div>
                            </div>
                
                            <div class="container_center">
                                <div style="display: flex; flex-direction: row">
                                    <div style="display: flex; flex-direction: column; flex: 2">
                                        <p style="margin-right: 20; font-weight: bold; font-size: 20px">Invoice To:</p>
                                        <p>${contactName}</p>
    
                                    </div>
                                    <div>
                                        <div style="display: flex; flex-direction: row; flex: 1">
                                            <p style="margin-right: 20; font-weight: bold">Invoice#:</p>
                                            <p>${IDBill}</p>
                                        </div>
                                        <div style="display: flex; flex-direction: row; flex: 1">
                                            <p style="margin-right: 20; font-weight: bold">Date:</p>
                                            <p>${dateNow}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="cashier" style="display: flex; flex-direction: row">
                                    <p style="margin-right: 20; font-weight: bold">Address:</p>
                                    <p>${contactAddress}</p>
                                </div>
                                <table class="table" style="width: 100%">
                                    <tr style="background-color: #595959; color: aliceblue">
                                        <div class="header_table">
                                            <div class="header_table_1">
                                                <th style="text-align: center; background-color: #ffcc00; color: #595959">Item</th>
                                                <th style="text-align: left; background-color: #ffcc00; color: #595959">Description</th>
                                            </div>
                                            <th style="text-align: center">Price</th>
                                            <th style="text-align: center">Sl</th>
                                            <th style="text-align: center">total</th>
                                        </div>
                                    </tr>
                                    <tr>
                                    ${listProductHtml7(listProductsSelect)}
    
                                    </tr>
                                </table>
                            </div>
                            <div class="container_contents">
                                <div class="container_bottom" style="justify-content: right">
                                    <div style="display: flex; flex-direction: row; justify-content: left">
                                        <p style="justify-content: right; font-weight: bold">Thank you for your business</p>
                                    </div>
                                    <div style="display: flex; flex-direction: column; justify-content: left">
                                        <p style="justify-content: left; font-weight: bold">Terms and conditions</p>
                                        <p>${customer}</p>
                                    </div>
                                    <div style="display: flex; flex-direction: column; justify-content: left">
                                        <p style="justify-content: left; font-weight: bold; font-size: 18px">Payment Infor:</p>
                                        <p>${contactPhone}</p>
                                    </div>
                                    <div style="display: flex; flex-direction: row; justify-content: right"></div>
                                </div>
                                <div class="container_bottom" style="justify-content: right">
                                <div style="display: flex; flex-direction: row; justify-content: space-between  ">
                                    <p style="justify-content: left; font-weight: bold; ">Sub total:</p>
                                    <p>${total}</p>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: space-between">
                                    <p style="justify-content: left; font-weight: bold; ">Tax:</p>
                                    <p>${tax}%</p>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: space-between;background-color: #b6b6b6;">
                                    <p
                                        style="
                                        
                                            justify-content: right;
                                            font-weight: bold;
                                            
                                        "
                                    >
                                        Total:
                                    </p>
                                    <p>${totalBill}</p>
                                </div>
            
                                <div style="display: flex; flex-direction: row; justify-content: right"></div>
                            </div>
                        </div>
                            <div class="container_bottom_2" >
                            <div class="container_bottom_name">
                            </div>
                        </div>
                    </div>
                    <div class="container_bottom_name_2">
                    Authorised Sign</div>
                        </div>
                        <div style="display: flex; flex-direction: row; justify-content: right"></div>
                        <img style="position: fixed; bottom: 0; width: 100%" src="${uri2}" />
                        </div>
                    </body>
                </html>
                `;

    const imageUri3 = require('../assets/images/header_seven.png');
    const imageUri4 = require('../assets/images/bottom.png');

    const imageAsset3 = Asset.fromModule(imageUri3);
    const imageAsset4 = Asset.fromModule(imageUri4);

    // Chuyển đổi tài nguyên hình ảnh thành URI
    const uri3 = imageAsset3.localUri || imageAsset3.uri;
    const uri4 = imageAsset4.localUri || imageAsset4.uri;
    const listProductHtml8 = (data) =>
        data
            .map(
                (product) =>
                    ` <tr>
                            <td style="font-weight: 700">${product.stt}</td>
                            <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                                <td style="text-align: center" ">${product.price}</td>
                                <td style="padding-left: 30px;">${product.quantity}</td>
                                <td style="text-align: center">${product.totalPrice}</td>
                            
                        </tr>`,
            )
            .join('');
    htmlTemplates[8] = `
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
                            align-items: 'center';
                            flex: 1;
                            text-align: center;
                            justify-content: 'center';
                        }
                        .header_table_1 {
                            background-color: '#ffcc00';
                        }
                        .container_header_contents {
                            background-color: rgb(251, 251, 251);
                            width: 20%;
                            margin-left: 60%;
                            margin-right: 15%;
                            font-size: 40px;
                        }
                        .container_ table,
                        th,
                        td {
                            border-collapse: collapse;
                        }
                        p {
                            margin: 3px;
                        }
                        .container_contents {
                            display: flex;
                            justify-content: space-between;
                        }
                        .container_header {
                            background-color: rgb(255, 255, 255);
                            height: 100%;
                        }
                        .container_header_company_name {
                            font-size: 20px;
                            text-align: left;
                            position: absolute;
                            margin-top: 90px;
                            margin-left: 10px;
                            color: white;
                        }
                        .container_bottom_2 {
                            background-color: rgb(255, 255, 255);
                            height: 2%;
            
                        }
                        .container_bottom_name {
                            margin-left: 65%;
                            margin-right: 15%;
                            background-color: rgb(0, 0, 0);
                            color: white;
                            height:2px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="container_top" style="margin-top: 40px">
                            <div class="container_header">
                                <div class="container_header_company_name">
                                    <p>${companyName}</p>
                                </div >
                                <div style="text-align: center; ">
                                    <img src="${uri3}" width="100%" ; />
                                </div>
                          </div>
                        </div>
            
                        <div class="container_center">
                            <div style="display: flex; flex-direction: row">
                                <div style="display: flex; flex-direction: row; flex: 2">
                                    <p style="margin-right: 20; font-weight: bold">Invoice#: ${IDBill}</p>
                                </div>
                                <div>
                                    <div style="display: flex; flex-direction: row; flex: 1">
                                        <p style="margin-right: 20; font-weight: bold">Invoice To:</p>
                                        <p>${contactName}</p>
                                    </div>
                                    <div class="cashier" style="display: flex; flex-direction: row">
                                    <p style="margin-right: 20; font-weight: bold">Address:</p>
                                    <p>${contactAddress}</p>
                                </div>
                                </div>
                            </div>
                            
                            <div style="display: flex; flex-direction: row; flex: 1">
                            <p style="margin-right: 20; font-weight: bold">Date:</p>
                            <p> ${dateNow}</p>
                        </div>
                            <table class="table" style="width: 100%">
                                <tr style="background-color: rgb(255 87 87); color: aliceblue">
                                    <div class="header_table">
                                        <div class="header_table_1">
                                            <th style="text-align: center">Item</th>
                                            <th style="text-align: left">Description</th>
                                        </div>
                                        <th style="text-align: center">Price</th>
                                        <th style="text-align: center">Quantity</th>
                                        <th style="text-align: center">total</th>
                                    </div>
                                </tr>
                                <tr style="text-align: center">
                                ${listProductHtml8(listProductsSelect)}
                                </tr>
                            </table>
                        </div>
                        <div class="container_contents">
                            <div class="container_bottom" style="justify-content: right">
                                <div style="display: flex; flex-direction: row; justify-content: left">
                                    <p style="justify-content: right; font-weight: bold">Thank you for your business</p>
                                </div>
                                <div style="display: flex; flex-direction: column; justify-content: left">
                                    <p style="justify-content: left; font-weight: bold">Terms and conditions</p>
                                    <p>${customer}</p>
                                </div>
                                <div style="display: flex; flex-direction: column; justify-content: left">
                                    <p style="justify-content: left; font-weight: bold; font-size: 18px">Payment Infor:</p>
                                    <p>${contactPhone}</p>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: right"></div>
                            </div>
                            <div class="container_bottom" style="justify-content: right">
                                <div style="display: flex; flex-direction: row; justify-content: space-between  ">
                                    <p style="justify-content: left; font-weight: bold; color: rgb(255 87 87)">Sub total:</p>
                                    <p>${total}</p>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: space-between">
                                    <p style="justify-content: left; font-weight: bold; color: rgb(255 87 87)">Tax:</p>
                                    <p>${tax}%</p>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: space-between;background-color: #b6b6b6;">
                                    <p
                                        style="
                                        color: rgb(255 87 87);
                                            justify-content: right;
                                            font-weight: bold;
                                            
                                        "
                                    >
                                        Total:
                                    </p>
                                    <p>${totalBill}</p>
                                </div>
            
                                <div style="display: flex; flex-direction: row; justify-content: right"></div>
                            </div>
                        </div>
                        <div class="container_bottom_2">
                            <div class="container_bottom_name"></div>
                        </div>
                        <div ">
                        <img style="position: fixed; bottom: 0; width: 100%" src="${uri4}" />
                        </div>
                    </div>
                </body>
            </html>
        
        `;

    const listProductHtml9 = (data) =>
        data
            .map(
                (product) =>
                    `<tr >
                <td  style=" width: 10%; height: 30px; text-align: center; ">${product.stt}</td>
                <td  style="width: 30%;  text-align: center; " >${product.name}</td>
                <td  style="width: 10%;text-align: center;   " >${product.quantity}</td>
                <td  style=" width: 10%; height: 30px; text-align: center;  ">${product.price}</td>
                <td style=" text-align: center;  ">${product.totalPrice}</td>
            </tr>`,
            )
            .join('');
    htmlTemplates[9] = `<!DOCTYPE html>
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
                        <Text><b>${companyName}</b></Text>
                    </div>
                    <hr />
                    <div style="text-align: center">
                        <Text><b>${IDBill}</b></Text>
                    </div>s
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
                            ${listProductHtml9(listProductsSelect)}
                        </tr>
                    </table>
                    <hr />
    
                    <div>
                        <div style="display: flex">
                            <Text style="margin-left: 160px">TOTAL AMOUNT</Text>
                            <Text style="margin-right: 160px; text-align: right; flex: 1">${total}</Text>
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

    const listProductHtml10 = (data) =>
        data
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

    htmlTemplates[10] = `<!DOCTYPE html>
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
                            <p class="text">Invoice #: ${IDBill}</p>
                        </div>
                    </div>
                    <div class="from_to">
                        <div class="from">
                            <b>From: </b>
                            <p class="text">${companyName}</p>
                        </div>
                        <div class="from">
                            <b>To: </b>
                            <p class="text">${contactName}</p>
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
                       ${listProductHtml10(listProductsSelect)}
                    </table>
                </div>
                <div class="bottom">
                    <div class="payment">
                        <div class="payment_left"></div>
                        <div class="payment_right">
                            <p>Subtotal: ${total}</p>
                            <p>Tax: ${tax}</p>
                            <b>Total Amount Due: ${totalBill}</b>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </html>
    `;

    const listProductHtml11 = (data) =>
        data
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

    htmlTemplates[11] = `<!DOCTYPE html>
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
                                <p class="text">Invoice #: ${IDBill}</p>
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
                                ${listProductHtml11(listProductsSelect)}
                            </table>
                        </div>
                        <div class="bottom">
                            <div class="flex_row">
                                <p class="text">Payment Terms:</p>
                                <p class="text">Pay</p>
                            </div>
                            <div class="flex_row">
                                <p class="text">Total Amout Due:  ${total}</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            `;

    return (
        <PrintBtn html={htmlTemplates[idTemplate]}>
            <View style={styles.container}>
                <Header title={'Hóa đơn'} />
                <View>
                    <View style={styles.invoicedate}>
                        <Text style={styles.code}>NO: {IDBill}</Text>
                        <Text style={styles.code}>Date: {dateNow}</Text>
                    </View>
                    {idTemplate != 11 && (
                        <>
                            <View style={styles.center_row1}>
                                <TextInput
                                    style={styles.text_line}
                                    onChangeText={(text) => setContactName(text)}
                                    value={contactName}
                                    placeholder="Name"
                                />
                            </View>
                            {idTemplate != 2 && idTemplate != 10 && (
                                <>
                                    {idTemplate != 9 && (
                                        <View style={styles.center_row1}>
                                            <TextInput
                                                style={styles.text_line}
                                                onChangeText={(text) => setContactPhone(text)}
                                                value={contactPhone}
                                                placeholder="Phone"
                                            />
                                        </View>
                                    )}
                                    {idTemplate != 3 && (
                                        <>
                                            <View style={styles.center_row1}>
                                                <TextInput
                                                    style={styles.text_line}
                                                    onChangeText={(text) => setContactAddress(text)}
                                                    value={contactAddress}
                                                    placeholder="Address"
                                                />
                                            </View>
                                            {idTemplate != 5 &&
                                                idTemplate != 7 &&
                                                idTemplate != 8 &&
                                                idTemplate != 9 && (
                                                    <View style={styles.center_row1}>
                                                        <TextInput
                                                            style={styles.text_line}
                                                            onChangeText={(text) => setContactEmail(text)}
                                                            value={contactEmail}
                                                            placeholder="Email"
                                                        />
                                                    </View>
                                                )}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    <Button
                        customStylesBtn={styles.btn}
                        customStylesText={{ ...styles.text, color: 'black' }}
                        text="Mặt hàng/Dịch vụ"
                        iconRight={<AntDesign name={showProductList ? 'up' : 'down'} size={24} color="#32db64" />}
                        onPress={toggleProductList}
                    />
                    {showProductList && (
                        <>
                            {showListProductSelected && (
                                <>
                                    {listProductsSelect.map((product, index) => (
                                        <Product
                                            data={product}
                                            key={product.stt}
                                            onRemove={() => removeProduct(index)}
                                        />
                                    ))}
                                </>
                            )}
                            <Button
                                customStylesBtn={styles.btn}
                                customStylesText={{ ...styles.text, color: 'gray' }}
                                text="Thêm sản phẩm"
                                iconRight={<AntDesign name="pluscircleo" size={24} color="#32db64" />}
                                onPress={() => {
                                    setProductModalVisible(true);
                                }}
                            />
                        </>
                    )}
                    {idTemplate != 2 && idTemplate != 4 && idTemplate != 5 && idTemplate != 9 && idTemplate != 11 && (
                        <>
                            <View style={styles.center_row1}>
                                <TextInput
                                    style={styles.text_line}
                                    onChangeText={(text) => setTax(text)}
                                    value={tax}
                                    placeholder="Tax"
                                />
                            </View>
                            {idTemplate != 3 && idTemplate != 7 && idTemplate != 8 && idTemplate != 10 && (
                                <View style={styles.center_row1}>
                                    <TextInput
                                        style={styles.text_line}
                                        onChangeText={(text) => setNote(text)}
                                        value={note}
                                        placeholder="In Word"
                                    />
                                </View>
                            )}
                        </>
                    )}
                    {/* <Button
                    customStylesBtn={styles.btn}
                    customStylesText={{ ...styles.text, color: 'black' }}
                    text="Thêm các trường"
                    iconRight={<AntDesign name="pluscircleo" size={24} color="#32db64" />}
                /> */}
                </View>

                <Modal animationType="slide" transparent={false} visible={isProductModalVisible}>
                    <View style={styles.container}>
                        <Text style={styles.titleTable}>Danh sách sản phẩm</Text>
                        <Product data={products} isList onAdd={(item) => handleAddProduct(item)} />
                        <Button
                            customStylesBtn={styles.btn}
                            customStylesText={{ ...styles.text, ...styles.textBtnClose }}
                            text="Đóng"
                            onPress={closeProductModal}
                        />
                    </View>
                </Modal>
            </View>
        </PrintBtn>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    headerleft: {},

    center_row1: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        marginVertical: 1,
        paddingHorizontal: 10,
        textAlign: 'center',
        justifyContent: 'center',
        color: 'black',
    },
    text_line: { fontWeight: 'bold', color: 'black' },
    btn: {
        paddingHorizontal: 10,
        backgroundColor: 'white',
        width: '100%',
        borderWidth: 0,
        borderRadius: 0,
        marginVertical: 1,
    },
    invoicedate: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#32db64',
        height: 50,
    },
    text: {
        textAlign: 'left',
        fontSize: 15,
    },
    code: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    bottom_item: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text1: {
        fontWeight: 'bold',
        fontSize: fontSizeDefault,
    },
    name: {
        height: 50,
        width: '100%',
        paddingHorizontal: 10,

        lineHeight: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        backgroundColor: 'white',
    },
    container_input: {
        height: '50%',
        paddingHorizontal: 10,
        marginBottom: 0,
        elevation: 0,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
    },
    dropdown: {
        marginHorizontal: 10,
    },
    dropdown_btn: {
        height: '70%',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    productItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    productInfoContainer: {
        flex: 1,
    },
    titleTable: {
        fontSize: 28,
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    textBtnClose: {
        color: 'gray',
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: fontSizeDefault,
        marginHorizontal: 10,
    },
});
