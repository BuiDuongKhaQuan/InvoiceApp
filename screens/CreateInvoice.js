import { StyleSheet, Text, View, TextInput, Modal, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Header from '../components/SettingItem/header';
import Button from '../components/Button';
import { fontSizeDefault } from '../constant/fontSize';
import { useUserContext } from './UserContext';
import { createInvoice, getCustomerByCompany, getProductsByCompany } from '../Service/api';
import Product from '../components/Product';
import { subTotal, totalBillPrice } from '../utilies/calculator';
import { Asset } from 'expo-asset';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { buttonColor, defaultColor, lightColorDefault, white } from '../constant/color';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { getDateNow, getHouseNow } from '../utilies/date';
import Customer from '../components/Customer';
import Loading from '../components/Loading';
import HeaderModal from '../components/HeaderModal';

export default function CreateInvoice({ route }) {
    const currentDate = new Date();
    const dateNow = getDateNow(currentDate);
    const houseNow = getHouseNow(currentDate);
    const { state } = useUserContext();
    const companyName = state.company.name;
    const companyPhone = state.company.phone;
    const companyAddress = state.company.address;
    const companyEmail = state.company.email;
    const staffName = state.user.name;
    const staffEmail = state.user.email;
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactAddress, setContactAddress] = useState('');
    const [note, setNote] = useState('');
    const [tax, setTax] = useState('');
    const idTemplate = route.params?.data;
    const [loading, setLoading] = useState(false);
    const [listProductsSelect, setListProductsSelect] = useState([]);
    const [IDBill, setIDBill] = useState('');
    const [showProductList, setShowProductList] = useState(false);
    const [showCustomer, setShowCustomer] = useState(false);
    const [showListProductSelected, setShowListProductSelected] = useState(false);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [isProductModalVisible, setProductModalVisible] = useState(false);
    const [isCustomersModalVisible, setCustomersModalVisible] = useState(false);
    const { t } = useTranslation();
    const viewShotRef = useRef(null);
    const total = subTotal(listProductsSelect);
    const totalBill = totalBillPrice(tax, total);
    const qrImageUri = useRef(null);
    const customer = useRef(null);
    const [qrResponse, setQrResponse] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const handleDataChanged = (newData) => {
        customer.current = newData;
        setContactName(customer.current.name);
        setContactPhone(customer.current.phone);
        setContactEmail(customer.current.email);
        setContactAddress(customer.current.address);
        setCustomersModalVisible(false);
    };
    const captureAndSaveImage = async () => {
        try {
            const uri = await captureRef(viewShotRef, { format: 'jpg', quality: 0.8 });
            qrImageUri.current = uri;
            console.log(qrImageUri.current);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const getFileQR = async () => {
            try {
                await captureAndSaveImage();
            } catch (error) {
                console.error(error);
            }
        };
        getFileQR();
    }, [IDBill]);

    const formattedProducts = listProductsSelect.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
    }));

    const addInvoices = async () => {
        if (customer.current != null && listProductsSelect.length > 0) {
            try {
                setLoading(true);
                const response = await createInvoice(
                    staffEmail,
                    customer.current.phone,
                    note,
                    'true',
                    JSON.stringify(formattedProducts),
                    'cash',
                    companyName,
                    IDBill,
                    String(totalBill),
                    tax,
                    contactAddress,
                    {
                        uri: qrImageUri.current,
                        name: 'qr_image.jpg',
                        type: 'image/jpg',
                    },
                );
                setDisabled(false);
                setQrResponse(response.data.image);
                Alert.alert(t('common:alert_success'), t('common:alert_success_2'));
            } catch (error) {
                console.log(error.response.data);
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert(t('common:error'), t('common:check'));
        }
    };
    const handleSubmit = () => {
        // Hiển thị cảnh báo cho người dùng xác nhận
        Alert.alert(
            t('common:alert_hd'),
            t('common:alert_hd_2'),
            [
                {
                    text: t('common:alert_no'),
                    cancelable: true,
                    style: 'cancel',
                },
                {
                    text: t('common:alert_yes'),
                    onPress: async () => {
                        await addInvoices();
                    },
                    cancelable: true,
                },
            ],
            { cancelable: false },
        );
    };
    const handleSubmitFile = () => {
        // Hiển thị cảnh báo cho người dùng xác nhận
        Alert.alert(
            t('common:alert_pdf'),
            t('common:alert_pdf_2'),

            [
                {
                    text: t('common:alert_pdf_no'),
                    cancelable: true,
                    style: 'cancel',
                },
                {
                    text: t('common:alert_pdf_yes'),
                    onPress: async () => {
                        await printToFile(htmlTemplates[idTemplate]);
                    },
                    cancelable: true,
                },
            ],
            { cancelable: false },
        );
    };
    const handleSubmitPrint = () => {
        // Hiển thị cảnh báo cho người dùng xác nhận
        Alert.alert(
            t('common:alert_pdf'),
            t('common:alert_pdf_2'),

            [
                {
                    text: t('common:alert_pdf_no'),
                    cancelable: true,
                    style: 'cancel',
                },
                {
                    text: t('common:alert_pdf_yes'),
                    onPress: async () => {
                        await print(htmlTemplates[idTemplate]);
                    },
                    cancelable: true,
                },
            ],
            { cancelable: false },
        );
    };
    const [selectedPrinter, setSelectedPrinter] = useState();
    const print = async (html) => {
        if (html !== null) {
            await Print.printAsync({
                html,
                printerUrl: selectedPrinter?.url,
            });
        } else {
            Alert.alert(t('common:error'), t('common:comppleInvoiceNote'));
        }
    };
    const printToFile = async (html) => {
        if (html !== null) {
            const { uri } = await Print.printToFileAsync({ html });
            console.log('File has been saved to:', uri);
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } else {
            Alert.alert(t('common:error'), t('common:comppleInvoiceNote'));
        }
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync();
        setSelectedPrinter(printer);
    };

    useEffect(() => {
        setIDBill(`${dateNow}${houseNow}-${idTemplate}`.replace(/[\/:]/g, ''));
    }, []);

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
        Alert.alert(t('common:information'), t('common:alert_success'));
        console.log(listProductsSelect);
    };

    const toggleProductList = () => {
        setShowProductList(!showProductList);
        setShowListProductSelected(listProductsSelect.length > 0);
    };
    const toggleCustomerList = () => {
        setShowCustomer(!showCustomer);
    };

    useEffect(() => {
        const getProductAndCustomerByCompany = async () => {
            try {
                const products = await getProductsByCompany(companyName);
                const customers = await getCustomerByCompany(companyName);
                setProducts(products);
                setCustomers(customers);
            } catch (error) {
                console.log(error);
            }
        };
        getProductAndCustomerByCompany();
    }, [isProductModalVisible, isCustomersModalVisible, IDBill]);

    const removeProduct = (key) => {
        listProductsSelect.splice(key, 1);
        setListProductsSelect([...listProductsSelect]);
    };

    // Template invoice format html
    // Using print
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
                <Text >${t('common:idInvoice')}: ${IDBill}</Text>
                <div class="container_top_left">
                <div style=" display: flex; justify-content: space-between; margin-right: 10px; ">
                <Text >${t('common:date')}: ${dateNow}</Text>
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
                    <Text >${t('common:addressInvoice')} - ${companyAddress}</Text>
                    </div>
                    <div style="text-align: center;font-size: 20px">
                        <Text >${t('common:phoneInvoice')}: ${companyPhone}</Text>
                    </div>
                </div>
                <div  style="margin-top: 50px;">
                    <div class="center_row" style="margin-left: 10px;">
                    <Text >${t('common:nameInvoice')}: ${contactName}</Text>
                    </div>
                    <div class="center_row" style="margin-left: 10px;">
                    <Text></Text>
                    </div>
                    <div class="center_row" style="display: flex; justify-content: space-between;margin-left: 10px">
                    <Text  >${t('common:invoiceNo')}: ${IDBill}</Text>

                        <div style="margin-right: 50px;"><Text  >${t('common:date')}: ${dateNow}</Text></div>
                    </div>
                    <div class="center_row" style="display: flex; justify-content: space-between;margin-left: 10px">
                        <Text >${t('common:mobile')}: ${contactPhone}</Text>

                    <div style="margin-right: 60px;"> <Text  >Email: ${contactEmail}</Text></div>

                    </div>
                        <table style="width: 100%;margin-top: 10px;">
                        <tr>
                            <td style="text-align: center; width: 13%; height: 40px; border-top: 2px solid black; border-right: 2px solid black;border-bottom: 2px solid black; "><b>${t(
                                'common:slNo',
                            )}</b></td>
                            <td style="text-align: center; width: 30% ;border-top: 2px solid black; border-right: 2px solid black;border-bottom: 2px solid black; "><b>${t(
                                'common:particular',
                            )}</b></td>
                            <td style="text-align: center;width: 10%; border-top: 2px solid black; border-right: 2px solid black;border-bottom: 2px solid black; "><b>${t(
                                'common:qty',
                            )}</b></td>
                            <td style="text-align: center;width: 12%; border-top: 2px solid black; border-right: 2px solid black; "><b>${t(
                                'common:rate',
                            )}</b></td>
                            <td style="text-align: center;border-top: 2px solid black;   "><b>${t(
                                'common:amount',
                            )}</b></td>
                        </tr>
                        ${listProductHtml1(listProductsSelect)}
                        <tr>
                            <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black; " rowspan="3"></td>
                            <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black; " rowspan="3"></td>
                            <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black;  " rowspan="3"></td>
                            <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;  border-right: 2px solid black;"><b>${t(
                                'common:subTotal',
                            )}</b></td>
                            <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;  ">0</td>

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
                        <br ><b>${t('common:inWords')}:</b> ${note}</Text>
                        </div>
                        <hr color="black"  />
                    <div  style="display: flex; font-size: 20px; margin-left: 10px;">
                        <br ><b>${t('common:thankyou1')}</b></Text>
                    </div>
                    <div style="text-align: end; font-size: 20px; margin-bottom: 15px;margin-right: 10px; ">
                    <br ><b>${t('common:signature')}: _____________</b></Text>
                    </div>
                    </div>
                    <div style="text-align: center; font-size: 20px; margin-bottom: 15px;margin-right: 10px; ">
                    <img src="${qrResponse}" style="width: 90px ; height: 90px" />
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
                            <Text>${t('common:addressInvoice')} ${companyAddress}</Text>
                        </div>
                        <div style="text-align: center; font-size: 20px; font-weight: bold; color: blue">
                            <Text>${t('common:phoneInvoice2')} :${companyPhone}</Text>
                        </div>
                        <hr size="2px" ; color="blue" />
                    </div>

                    <div style="display: flex; justify-content: space-between; color: blue">
                        <div style="margin-left: 10px">
                            <Text>${t('common:slNo2')}: ${IDBill}</Text>
                        </div>
                        <div>
                            <Text><b>${t('common:nameInvoice')}</b></Text>
                        </div>
                        <div style="margin-right: 10px">
                            <Text>${t('common:date')}: ${dateNow} </Text>
                        </div>
                    </div>
                    <div style="color: rgb(0 0 215); margin-top: 10px; margin-left: 10px; margin-right: 10px">
                        <Text>${t('common:receive')}: ${contactName}</Text>
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
                                <b>${t('common:slN2')}</b>
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
                                <b>${t('common:particular')}</b>
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
                                <b>${t('common:qty')}</b>
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
                                <b>${t('common:amount')} </b>

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
                    <text><b>${t('common:for')} ${companyName}</b></text>
                    </div>
                    <div style="text-align: center; color: blue">
                    <img src="${qrResponse}" style="width: 90px ; height: 90px" />
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
                <img src="${qrResponse}" style="width: 90px ; height: 90px" />
                </div>
                
            </div>
            <div class="container_center">
                <div style="display: flex; flex-direction: row">
                <p style="flex: 1">${t('common:date')}: ${dateNow}</p>
                <p style="flex: 1">${houseNow}</p>
                </div>
                <div class="cashier" style="display: flex; flex-direction: row">
                <p style="margin-right: 20">${t('common:cashier')}: </p>
                </p>${staffName}<p>
                </div>
                <div class="customer" style="display: flex; flex-direction: row">
                <p style="margin-right: 20">${t('common:custommer')}:</p>
                <p>${contactName}</p>
                </div>
                <div style="display: flex; flex-direction: row">
                <div style="display: flex; flex-direction: row; flex: 2">
                    <p style="margin-right: 20">${t('common:mobile')}:</p>
                    <p>${contactPhone}</p>
                </div>
                <div style="display: flex; flex-direction: row; flex: 1">
                    <p style="margin-right: 20">${t('common:scores')}:</p>
                    <p>0.0</p>
                </div>
                </div>
                <table style="width:100%">
                <tr style="border-bottom: 1px dashed  black;">
                    <th>#</th>
                    <th>${t('common:product')}</th> 
                    <th>${t('common:qty3')}</th>
                    <th>${t('common:price')}</th>
                    <th>${t('common:discount')}</th>
                    <th>${t('common:amount3')}</th>
                </tr>
                
                ${listProductHtml3(listProductsSelect)}
                
                </table>
                <p style="border-bottom: 1px dashed  black;"></p>
            </div>
            <div class="container_bottom" style="justify-content: right; ;">
                <div style="display: flex; flex-direction: row; justify-content: right;">
                <p style="justify-content: right; margin-right: 35%; font-weight: bold;">${t(
                    'common:totalPriceSell',
                )}:</p>
                <p>${total}</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: right;">
                <p style="justify-content: right; margin-right: 42%; font-weight: bold;">${t(
                    'common:totalDiscount',
                )}:</p>
                <p>${tax}</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: right;">
                <p style="justify-content: right; margin-right: 35%; font-weight: bold; font-size: 18px;">${t(
                    'common:totalAmount3',
                )}:</p>
                <p>${totalBill}</p>
                </div>
                <p style="text-align: center;"></p>
                <p style="border-bottom: 1px dashed  black;"></p>
                <div style="display: flex; flex-direction: row; justify-content: right;">
                <p style="justify-content: right; margin-right: 40%; font-weight: bold; ">${t('common:typePay')}:</p>
                <p>${t('common:cash')}</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: right;">
                <p style="justify-content: right; margin-right: 35%; font-weight: bold; ">${t(
                    'common:receiveMoney',
                )}:</p>
                <p>${totalBill}</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: right;">
                <p style="justify-content: right; margin-right: 47%; font-weight: bold; ">${t('common:giveBack')}: </p>
                <p>0</p>
                </div>
                <p style="border-bottom: 1px dashed  black;"></p>
                <p style="text-align: center;">${t('common:designed')} ${companyName}</p>
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
                        <Text style="margin-top: 2px; margin-bottom: 2px">${t(
                            'common:streetAddress',
                        )}: ${companyAddress}</Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px";text-transform: uppercase><b>${t(
                            'common:date',
                        )}:</b></Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px">${dateNow}</Text>
                    </div>
                    <div style="display: flex; justify-content: space-between">
                        <Text style="margin-top: 2px; margin-bottom: 2px">${t('common:cityzip')} ${contactPhone}</Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px"><b>${t('common:id4')}</b></Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px">${IDBill}</Text>
                    </div>
                    <div style="display: flex; justify-content: space-between">
                        <Text style="margin-top: 2px; margin-bottom: 2px">${t('common:phonefax')} ${contactPhone}</Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px"><b>${t('common:for')}:</b></Text>
                        <Text style="margin-top: 2px; margin-bottom: 2px; font-style: italic">${companyName}</Text>
                    </div>
                   
                </div>
    
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text><b>${t('common:billTo')}:</b></Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>${t('common:name')}: ${contactName}</Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>${t('common:companyName')}:</Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>${t('common:streetAddress')}: ${contactAddress}</Text>
                </div>
                <div style="margin-top: 5px; margin-bottom: 5px">
                    <Text>${t('common:cityzip')}</Text>
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
                            <b style="text-transform: uppercase">${t('common:description')}</b>
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
                            <b style="text-transform: uppercase">${t('common:amount')}</b>
                        </td>
                    </tr>
                    ${listProductHtml4(listProductsSelect)}
    
                    <tr>
                        <td colspan="4" style="width: 100px; height: 30px; text-align: center; border-right: 1px solid";>
                            <b style="text-transform: uppercase"> ${t('common:totalAmount3')}</b>
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
                <div style="text-align: center; color: blue">
                    <img src="${qrResponse}" style="width: 90px ; height: 90px" />
                    </div>
                <div style="margin-top: 10px; font-size: 13px">
                    <text>${t('common:makePayable')} ${companyName} </text>
                </div>
                <div style="margin-top: 20px; font-size: 13px; margin-bottom: 20px">
                    <text> ${t('common:question')} ${contactName}, ${contactPhone}, ${contactEmail} </text>
                </div>
                <div style="text-align: center; font-size: 13px">
                    <text><b>${t('common:thankyou4')} </b></text>
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
                                <p>${t('common:invoice')}</p>
                            </div>
                        </div>
                        <div class="container_center">
                            <div style="display: flex; flex-direction: row">
                                <div style="display: flex; flex-direction: row; flex: 2">
                                    <p style="margin-right: 20;font-weight: 600">${t('common:invoiceNo')}:</p>
                                    <p>${IDBill}</p>
                                </div>
                                
                                <div style="display: flex; flex-direction: row; flex: 1">
                                    <p style="margin-right: 20;font-weight: 600">${t('common:date')}:</p>
                                    <p>${dateNow}</p>
                                </div>
                            </div>
                            <div class="cashier" style="display: flex; flex-direction: row">
                                <p style="margin-right: 20;font-weight: 600">${t('common:billTo')}:</p>
                                <div style="flexDirection: 'column'">
                                <p>${contactName}</p>
                                <p>${contactAddress}</p>
                                </div>
                            </div>
                            
                            <table style="width: 100%">
                                <tr style="border-bottom: 1px dashed black">
                                    <th style="text-align: center">${t('common:item')}</th>
                                    <th style="text-align: left">${t('common:description')}</th>
                                    <th style="text-align: center">${t('common:price5')}</th>
                                    <th style="text-align: center">${t('common:qty5')}</th>
                                    <th style="text-align: center">${t('common:amount3')}</th>
                                </tr>
                                <tr>
                                ${listProductHtml5(listProductsSelect)}

                                </tr>
                            </table>
                            <p style="border-bottom: 1px dashed black"></p>
                        </div>
                        <div class="container_bottom" style="justify-content: right">
                            <div style="display: flex; flex-direction: row; justify-content: right">
                                <p style="justify-content: left; font-weight: bold">${t('common:totalAmount3')}:</p>
                                <p>${total}</p>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: left">
                            <p style="justify-content: left; font-weight: bold">${t('common:thankyou5')}</p>
                        </div>
                            <div style="display: flex; flex-direction: row; justify-content: left">
                                <p style="justify-content: left; font-weight: bold">${t('common:bankName')}:</p>
                                <p>${staffName}</p>
                                </div>
                            <div style="display: flex; flex-direction: row; justify-content: left">
                                <p style="justify-content: left; font-weight: bold">${t('common:bankAccount')}:</p>
                                <p>${contactPhone}</p>
                                </div>
                            <p style="border-bottom: 1px dashed black"></p>
                            <div style="display: flex; flex-direction: row; justify-content: right"></div>
                                                       
                            <div style="display: flex; flex-direction: row; justify-content: center">
                            <img src="${qrResponse}" style="width: 90px ; height: 90px" />
                            </div>
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
                                            <p style="margin-right: 20; font-weight: bold">${t('common:invoiceTo')}:</p>
                                            <p>${contactName}</p>
        
                                        </div>
                                        <div>
                                            <div style="display: flex; flex-direction: row; flex: 1">
                                                <p style="margin-right: 20; font-weight: bold;text-transform:capitalize">${t(
                                                    'common:id6',
                                                )}#:</p>
                                                <p>${IDBill}</p>
                                            </div>
                                            <div style="display: flex; flex-direction: row; flex: 1">
                                                <p style="margin-right: 20; font-weight: bold">${t('common:date')}:</p>
                                                <p>${dateNow}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cashier" style="display: flex; flex-direction: row">
                                        <p style="margin-right: 20; font-weight: bold">${t(
                                            'common:addressInvoice',
                                        )}:</p>
                                        <p>${contactAddress}s</p>
                                    </div>
                                    <table class="table" style="width: 100%">
                                        <tr style="background-color: #595959; color: aliceblue">
                                            <div class="header_table">
                                                <div class="header_table_1">
                                                    <th style="text-align: center">${t('common:item')}</th>
                                                    <th style="text-align: left">${t('common:description')}</th>
                                                </div>
                                                <th style="text-align: center">${t('common:price5')}</th>
                                                <th style="text-align: center">${t('common:qty3')}</th>
                                                <th style="text-align: center">${t('common:totalAmount3')}</th>
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
                                            <p style="justify-content: right; font-weight: bold">${t(
                                                'common:thankyou5',
                                            )}!</p>
                                        </div>
                                        <div style="display: flex; flex-direction: row; justify-content: left">
                                            <p style="justify-content: left; font-weight: bold">${t('common:term')}</p>
                                            <p>trandz</p>
                                        </div>
                                        <div style="display: flex; flex-direction: row; justify-content: left">
                                            <p style="justify-content: left; font-weight: bold; font-size:17>${t(
                                                'common:pay6',
                                            )}:</p>
                                            <p>${contactName}</p>
                                        </div>
                                        <div style="display: flex; flex-direction: row; justify-content: right"></div>
                                    </div>
                                    <div class="container_bottom" style="justify-content: right">
                                        <div style="display: flex; flex-direction: row; justify-content: left">
                                            <p style="justify-content: left; font-weight: bold">${t(
                                                'common:subTotal',
                                            )}:</p>
                                            <p>${total}</p>
                                        </div>
                                        <div style="display: flex; 
                                        flex-direction: row;                                 justify-content: space-between; 
                                        justify-content: space-between; 
                                        ">
                                            <p style="justify-content: left; font-weight: bold; font-size: 18px">${t(
                                                'common:tax',
                                            )}:</p>
                                            <p>${tax}%</p>
                                        </div>
                                        <div style="display: flex; 
                                        flex-direction: row; 
                                        justify-content: space-between; 
                                        background-color: rgb(255, 191, 0);">
                                          <p >${t('common:totalAmount3')}:</p>
                                            <p >${totalBill}</p>
                                        </div>
                                        <div style="display: flex; flex-direction: row; justify-content: right"></div>
                                    </div>
                                   

                                    
                                </div>
                                <div class="container_bottom_2" >
                                    <div class="container_bottom_name">
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: center">
                                <img src="${qrResponse}" style="width: 90px ; height: 90px" />
                                </div>
                            </div>
                            <div class="container_bottom_name_2">
                            ${t('common:authorised')}</div>
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
                                        <p style="margin-right: 20; font-weight: bold; font-size: 20px">${t(
                                            'common:invoiceTo',
                                        )}:</p>
                                        <p>${contactName}</p>
    
                                    </div>
                                    <div>
                                        <div style="display: flex; flex-direction: row; flex: 1">
                                            <p style="margin-right: 20; font-weight: bold">${t('common:id6')}#:</p>
                                            <p>${IDBill}</p>
                                        </div>
                                        <div style="display: flex; flex-direction: row; flex: 1">
                                            <p style="margin-right: 20; font-weight: bold">${t('common:date')}:</p>
                                            <p>${dateNow}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="cashier" style="display: flex; flex-direction: row">
                                    <p style="margin-right: 20; font-weight: bold">${t('common:addressInvoice')}:</p>
                                    <p>${contactAddress}</p>
                                </div>
                                <table class="table" style="width: 100%">
                                    <tr style="background-color: #595959; color: aliceblue">
                                        <div class="header_table">
                                            <div class="header_table_1">
                                                <th style="text-align: center; background-color: #ffcc00; color: #595959">${t(
                                                    'common:item',
                                                )}</th>
                                                <th style="text-align: left; background-color: #ffcc00; color: #595959">${t(
                                                    'common:description',
                                                )}</th>
                                            </div>
                                            <th style="text-align: center">${t('common:price')}</th>
                                            <th style="text-align: center">${t('common:qty3')}</th>
                                            <th style="text-align: center">${t('common:totalAmount3')}</th>
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
                                        <p style="justify-content: right; font-weight: bold">${t(
                                            'common:thankyou4',
                                        )}</p>
                                    </div>
                                    <div style="display: flex; flex-direction: column; justify-content: left">
                                        <p style="justify-content: left; font-weight: bold">${t('common:term')}</p>
                                        <p>${staffName}</p>
                                    </div>
                                    <div style="display: flex; flex-direction: column; justify-content: left">
                                        <p style="justify-content: left; font-weight: bold; font-size: 18px">${t(
                                            'common:pay6',
                                        )}:</p>
                                        <p>${contactPhone}</p>
                                    </div>
                                    <div style="display: flex; flex-direction: row; justify-content: right"></div>
                                </div>
                                <div class="container_bottom" style="justify-content: right">
                                <div style="display: flex; flex-direction: row; justify-content: space-between  ">
                                    <p style="justify-content: left; font-weight: bold; ">${t('common:subTotal')}:</p>
                                    <p>${total}</p>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: space-between">
                                    <p style="justify-content: left; font-weight: bold; ">${t('common:tax')}:</p>
                                    <p>${tax}%</p>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: space-between;background-color: #b6b6b6;">
                                    <p
                                        style="
                                        
                                            justify-content: right;
                                            font-weight: bold;
                                            
                                        "
                                    >
                                    ${t('common:totalAmount3')}:
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
                        <div style="display: flex; flex-direction: row; justify-content: center">
                            <img src="${qrResponse}" style="width: 90px ; height: 90px" />
                            </div>
                    </div>
                    <div class="container_bottom_name_2">
                    ${t('common:authorised')}</div>
                    <div style="display: flex; flex-direction: row; justify-content: center">
                            <img src="${qrResponse}" style="width: 90px ; height: 90px" />
                            </div>
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
                                    <p style="margin-right: 20; font-weight: bold">${t('common:id6')}#: ${IDBill}</p>
                                </div>
                                <div>
                                    <div style="display: flex; flex-direction: row; flex: 1">
                                        <p style="margin-right: 20; font-weight: bold">${t('common:invoiceTo')}:</p>
                                        <p>${contactName}</p>
                                    </div>
                                    <div class="cashier" style="display: flex; flex-direction: row">
                                    <p style="margin-right: 20; font-weight: bold">${t('common:addressInvoice')}:</p>
                                    <p>${contactAddress}</p>
                                </div>
                                </div>
                            </div>
                            
                            <div style="display: flex; flex-direction: row; flex: 1">
                            <p style="margin-right: 20; font-weight: bold">${t('common:date')}:</p>
                            <p> ${dateNow}</p>
                        </div>
                            <table class="table" style="width: 100%">
                                <tr style="background-color: rgb(255 87 87); color: aliceblue">
                                    <div class="header_table">
                                        <div class="header_table_1">
                                            <th style="text-align: center">${t('common:item')}</th>
                                            <th style="text-align: left">${t('common:description')}</th>
                                        </div>
                                        <th style="text-align: center">${t('common:price')}</th>
                                        <th style="text-align: center">${t('common:qty5')}</th>
                                        <th style="text-align: center">${t('common:totalAmount3')}</th>
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
                                    <p style="justify-content: right; font-weight: bold">${t('common:thankyou4')}</p>
                                </div>
                                <div style="display: flex; flex-direction: column; justify-content: left">
                                    <p style="justify-content: left; font-weight: bold">${t('common:term')}</p>
                                    <p>${staffName}</p>
                                </div>
                                <div style="display: flex; flex-direction: column; justify-content: left">
                                    <p style="justify-content: left; font-weight: bold; font-size: 18px">${t(
                                        'common:pay6',
                                    )}:</p>
                                    <p>${contactPhone}</p>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: right"></div>
                            </div>
                            <div class="container_bottom" style="justify-content: right">
                                <div style="display: flex; flex-direction: row; justify-content: space-between  ">
                                    <p style="justify-content: left; font-weight: bold; color: rgb(255 87 87)">${t(
                                        'common:subTotal',
                                    )}:</p>
                                    <p>${total}</p>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: space-between">
                                    <p style="justify-content: left; font-weight: bold; color: rgb(255 87 87)">${t(
                                        'common:tax',
                                    )}:</p>
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
                                    ${t('common:totalAmount3')}:
                                    </p>
                                    <p>${totalBill}</p>
                                </div>
            
                                <div style="display: flex; flex-direction: row; justify-content: right"></div>
                            </div>
                           
                        </div>
                        <div class="container_bottom_2">
                            <div class="container_bottom_name"></div>
                        </div>
                        <div style="display: flex; flex-direction: row; justify-content: center">
                        <img src="${qrResponse}" style="width: 90px ; height: 90px" />
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
                            <Text style="margin-left: 160px">${t('common:totalAmount9')}</Text>
                            <Text style="margin-right: 160px; text-align: right; flex: 1">${total}</Text>
                        </div>
                        <hr />
                    </div>
                    <div style="width: 100%; text-align: center">
                        <img
                            id="barcode"
                            style="height: 90px"
                            src="${qrResponse}"
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
                    width: 100%;
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
                            <p class="text">${t('common:date')}: ${dateNow}-${houseNow}</p>
                            <p class="text">${t('common:id6')} #: ${IDBill}</p>
                        </div>
                    </div>
                    <div class="from_to">
                        <div class="from">
                            <b>${t('common:from')}: </b>
                            <p class="text">${companyName}</p>
                        </div>
                        <div class="from">
                            <b>${t('common:to')}: </b>
                            <p class="text">${contactName}</p>
                        </div>
                    </div>
                </div>
                <div class="center">
                    <table class="table">
                        <tr>
                            <th class="row1">${t('common:description')}</th>
                            <th class="row2">${t('common:hours')}</th>
                            <th class="row2">${t('common:rateHouse')}</th>
                            <th class="row3">${t('common:totalAmount3')}</th>
                        </tr>
                       ${listProductHtml10(listProductsSelect)}
                    </table>
                </div>
                <div class="bottom">
                    <div class="payment">
                        <div class="payment_left"></div>
                        <div class="payment_right">
                            <p>${t('common:subTotal')}: ${total}</p>
                            <p>${t('common:tax')}: ${tax}</p>
                            <b>${t('common:due')}: ${totalBill}</b>
                        </div>
                    </div>
                    <div style="text-align: center; justify-content: center">
                    <img src="${qrResponse}" style="width: 90px ; height: 90px" />
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
                        max-width: 100%;
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
                            width: 100%;
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
                            <h1 class="title">${t('common:invoice')}</h1>
                            <div class="date">
                                <p class="text">${t('common:date')}: ${dateNow}</p>
                                <p class="text">${t('common:id6')} #: ${IDBill}</p>
                            </div>
                        </div>
                        <div class="center">
                            <table class="table">
                                <tr>
                                    <th class="row1">${t('common:description')}</th>
                                    <th class="row2">${t('common:qty5')}</th>
                                    <th class="row2">${t('common:unitPrice')}</th>
                                    <th class="row3">${t('common:totalAmount3')}</th>
                                </tr>
                                ${listProductHtml11(listProductsSelect)}
                            </table>
                        </div>
                        <div class="bottom">
                            <div class="flex_row">
                                <p class="text">${t('common:payTerm')}: </p>
                                <p class="text">Pay</p>
                            </div>
                            <div class="flex_row">
                                <p class="text">${t('common:due')}:  ${total}</p>
                            </div>
                        </div>
                        <div style="text-align: center; justify-content: center">
                        <img src="${qrResponse}" style="width: 90px ; height: 90px" />
                        </div>
                    </div>
                </body>
            </html>
            `;

    return (
        <View style={styles.wrapper}>
            <Loading loading={loading} isFullScreen />
            <View style={styles.container}>
                <Header title={t('common:bill')} />
                <ScrollView>
                    <View style={styles.invoicedate}>
                        <Text style={styles.code}>
                            {t('common:no')}: {IDBill}
                        </Text>
                        <Text style={styles.code}>
                            {t('common:date')}: {dateNow}
                        </Text>
                    </View>
                    <Button
                        customStylesBtn={styles.btn}
                        customStylesText={{ ...styles.text, color: 'black' }}
                        text={t('common:customer')}
                        iconRight={<AntDesign name={showCustomer ? 'up' : 'down'} size={24} color={buttonColor} />}
                        onPress={toggleCustomerList}
                    />
                    {showCustomer && (
                        <>
                            {customer.current && (
                                <View style={styles.contact_content}>
                                    <View style={styles.contact_row}>
                                        <Text style={styles.text_default}>{t('common:name')}:</Text>
                                        <Text style={styles.text_change}>{customer.current.name}</Text>
                                    </View>
                                    <View style={styles.contact_row}>
                                        <Text style={styles.text_default}>{t('common:email')}:</Text>
                                        <Text style={styles.text_change}>{customer.current.email}</Text>
                                    </View>
                                    <View style={styles.contact_row}>
                                        <Text style={styles.text_default}>{t('common:phone')}:</Text>
                                        <Text style={styles.text_change}>{customer.current.phone}</Text>
                                    </View>
                                </View>
                            )}

                            <Button
                                customStylesBtn={styles.btn}
                                customStylesText={{ ...styles.text, color: 'gray' }}
                                text={customer.current ? t('common:change_customer') : t('common:more_customer')}
                                iconRight={<AntDesign name="pluscircleo" size={24} color={buttonColor} />}
                                onPress={() => {
                                    setCustomersModalVisible(true);
                                }}
                            />
                        </>
                    )}
                    <Button
                        customStylesBtn={styles.btn}
                        customStylesText={{ ...styles.text, color: 'black' }}
                        text={t('common:productServie')}
                        iconRight={<AntDesign name={showProductList ? 'up' : 'down'} size={24} color={buttonColor} />}
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
                                text={t('common:addProduct')}
                                iconRight={<AntDesign name="pluscircleo" size={24} color={buttonColor} />}
                                onPress={() => {
                                    setProductModalVisible(true);
                                }}
                            />
                        </>
                    )}
                    {idTemplate != 1 && idTemplate != 2 && idTemplate != 3 && idTemplate != 10 && idTemplate != 11 && (
                        <View style={styles.center_row1}>
                            <TextInput
                                style={styles.text_line}
                                onChangeText={(text) => setContactAddress(text)}
                                value={contactAddress}
                                placeholder={t('common:addressInvoice')}
                            />
                        </View>
                    )}
                    {idTemplate != 2 && idTemplate != 4 && idTemplate != 5 && idTemplate != 9 && idTemplate != 11 && (
                        <>
                            <View style={styles.center_row1}>
                                <TextInput
                                    style={styles.text_line}
                                    onChangeText={(text) => setTax(text)}
                                    value={tax}
                                    placeholder={t('common:tax')}
                                    keyboardType="number-pad"
                                />
                            </View>
                            {idTemplate != 3 && idTemplate != 7 && idTemplate != 8 && idTemplate != 10 && (
                                <View style={styles.center_row1}>
                                    <TextInput
                                        style={styles.text_line}
                                        onChangeText={(text) => setNote(text)}
                                        value={note}
                                        placeholder={t('common:inWords')}
                                    />
                                </View>
                            )}
                        </>
                    )}
                    <View style={styles.qrcode}>
                        <ViewShot
                            style={{
                                width: 90,
                                height: 90,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: white,
                            }}
                            ref={viewShotRef}
                            options={{ format: 'jpg', quality: 1 }}
                        >
                            {IDBill && (
                                <QRCode value={IDBill} size={80} logo={require('../assets/icon.png')} logoSize={25} />
                            )}
                        </ViewShot>
                    </View>
                    <View style={styles.container_bottom}>
                        <Button customStylesBtn={styles.btn1} text={t('common:save')} onPress={() => handleSubmit()} />
                        <Button
                            disabled={disabled}
                            customStylesBtn={
                                disabled == false ? styles.btn1 : { ...styles.btn1, backgroundColor: lightColorDefault }
                            }
                            text={t('common:print')}
                            onPress={() => handleSubmitPrint()}
                        />
                        <Button
                            disabled={disabled}
                            customStylesBtn={
                                disabled == false ? styles.btn1 : { ...styles.btn1, backgroundColor: lightColorDefault }
                            }
                            text={t('common:pdf')}
                            onPress={() => handleSubmitFile()}
                        />
                        <Text style={styles.text_waring}>{t('common:warning')}</Text>
                    </View>
                </ScrollView>

                <Modal animationType="slide" transparent={false} visible={isProductModalVisible}>
                    <View style={styles.container}>
                        <HeaderModal title={t('common:listProduct')} onPress={() => setProductModalVisible(false)} />
                        <Product data={products} isList onAdd={(item) => handleAddProduct(item)} />
                    </View>
                </Modal>
                <Modal animationType="slide" transparent={false} visible={isCustomersModalVisible}>
                    <View style={styles.container}>
                        <HeaderModal
                            title={customer.current ? t('common:replace') : t('common:addCustomer')}
                            onPress={() => setCustomersModalVisible(false)}
                        />
                        <Customer dataList={customers} onDataChanged={handleDataChanged} />
                    </View>
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        flex: 10,
        backgroundColor: '#f4f4f4',
    },
    text_waring: {
        color: 'red',
        fontSize: fontSizeDefault,
        fontWeight: 'bold',
    },
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
        backgroundColor: defaultColor,
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
    textBtnClose: {
        color: 'gray',
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: fontSizeDefault,
        marginHorizontal: 10,
    },
    qrcode: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: white,
    },
    container_bottom: {
        flex: 2.3,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn1: {
        width: '100%',
        marginVertical: 2,
        borderRadius: 0,
        backgroundColor: buttonColor,
    },
    contact_content: {
        flex: 1,
        width: '100%',
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#f4f4f4',
        flexDirection: 'column',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    contact_row: {
        flex: 1,
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text_default: {
        fontSize: fontSizeDefault - 3,
        fontWeight: '700',
        marginRight: 10,
    },
    text_change: {
        flex: 10,
        fontSize: fontSizeDefault - 3,
        marginHorizontal: 10,
    },
});
