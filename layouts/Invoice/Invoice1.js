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
} from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Popup from '../../components/Popup';
import { dateNow } from '../../utilies/date';
import { Row, Rows, Table, TableWrapper } from 'react-native-reanimated-table';
import SelectDropdown from 'react-native-select-dropdown';
import { fontSizeDefault } from '../../constant/fontSize';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function Invoice1() {
    const route = useRoute();
    const navigation = useNavigation();
    const invoice = route.params?.data;

    const [productId, setProductId] = useState('');
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedPrinter, setSelectedPrinter] = useState();
    const [contactName, setContactName] = useState();
    const [contactPhone, setContactPhone] = useState();
    const [contactEmail, setContactEmail] = useState();
    const [note, setNote] = useState();
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
                    `<tr>
                    <td
                        style="
                            width: 15%;
                            border-top: 1px solid black;
                            border-right: 1px solid black;
                            text-align: center;
                            border-left: 1px solid black;
                        "
                    >
                        0
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
                        cam
                    </td>

                    <td style="width: 10%; border: 1px solid black; text-align: center">50</td>
                    <td
                        style="
                            width: 10%;
                            height: 30px;
                            border: 1px solid black;

                            text-align: center;
                        "
                    >
                        100
                    </td>
                    <td
                        style="
                            border-bottom: 1px solid black;
                            border-right: 1px solid black;
                            border-top: 1px solid black;
                            text-align: center;
                        "
                    >
                        200000
                    </td>
                </tr>
                    <tr >
                <td  style=" width: 10%; height: 30px; border-top: 2px solid black; border-right: 2px solid black; text-align: center;">${index}</td>
                <td  style="width: 30%; border-bottom: 0px; border-top: 2px solid black; border-right: 2px solid black;text-align: center; " >${product.name}</td>
                <td  style="width: 10%; border-top: 2px solid black; border-right: 2px solid black; text-align: center; " >${product.quantity}</td>
                <td  style=" width: 10%; height: 30px; border-top: 2px solid black; border-right: 2px solid black; text-align: center; ">${product.price}</td>
                <td style=" border-bottom: 2px solid black; border-top: 2px solid black;  text-align: center;  ">${product.totalPrice}</td>
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
        <Text >GST No:</Text>
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
              <Text >Company Name Pvt.Ltd</Text>
            </div>
            <div style="text-align: center;font-size: 20px">
              <Text >Address - Street Name, City Name</Text>
            </div>
            <div style="text-align: center;font-size: 20px">
                <Text >Ph No: 99999 99999</Text>
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
              <Text  >Invoice No:</Text>

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
                  ${listProductHtml()}
                  <tr>
                    <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black; " rowspan="3"></td>
                    <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black; " rowspan="3"></td>
                    <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black;  " rowspan="3"></td>
                    <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;  border-right: 2px solid black;"><b>Sub Total</b></td>
                    <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;  ">${subTotal}</td>

                </tr>
                <tr>
                  <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-right: 2px solid black;  "><b>Tax</b></td>
                  <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black; border-top: 2px solid black;   ">${tax}</td>
              </tr>
              <tr>
                <td style="text-align: center; width: 13%; height: 40px; border-bottom: 2px solid black;  border-right: 2px solid black; "><b>Total</b></td>
                <td style="text-align: center; width: 13%; height: 40px;  border-bottom: 2px solid black;  ">${totalBillPrice}</td>
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

    const data = () =>
        products.map((product, index) => [
            index,
            product.name,
            product.quantity,
            product.price,
            product.totalPrice,
            '',
        ]);
    const tableHead = ['Sl.No.', 'Particulars', 'Qty', 'Rate', 'Amount', ''];

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
        ['', '', '', 'Sub Total', subTotal.toString(), ''],
        [
            '',
            '',
            '',
            'Tax',
            <TextInput
                onChangeText={handleChangeTax}
                value={tax}
                placeholder="Tax?"
                keyboardType="numeric"
                style={{ ...styles.text_line1, ...styles.colum_p }}
            />,
            '',
        ],
        ['', '', '', 'Total', totalBillPrice.toString(), ''],
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
                <View style={styles.container_top_left}>
                    <Text style={styles.text_bold3}>GTS no:</Text>
                    <Text style={styles.text_bold3}>Date: {dateNow}</Text>
                </View>
                <View style={styles.container_top}>
                    <Text style={styles.text_bold}>Tax Invoice Bill</Text>
                    <Text style={styles.text_bold2}>Company Name Pvt.Ltd</Text>
                    <Text style={styles.text_bold3}>Address - Street Name, City Name</Text>
                    <Text style={styles.text_bold3}>Ph No: 99999 99999</Text>
                </View>
                <View style={styles.container_center}>
                    <View style={styles.textall}>
                        <View style={styles.center_row}>
                            <Text style={styles.text_bold3}>Name:</Text>
                            <TextInput
                                style={styles.text_line}
                                onChangeText={(text) => setContactName(text)}
                                value={contactName}
                                placeholder="Enter the customer's name"
                            />
                        </View>
                        <View style={styles.center_row}>
                            <Text style={styles.text_bold3}></Text>
                        </View>
                        <View style={styles.center_row}>
                            <Text style={styles.text_bold3}>Invoice No:</Text>
                            <TextInput style={styles.text_line} value={customer} placeholder="hgvshgjdfashgfdhjas" />
                            <Text style={styles.text_bold3}>Date: {dateNow}</Text>
                        </View>
                        <View style={styles.center_row}>
                            <Text style={styles.text_bold3}>Mobile:</Text>
                            <TextInput
                                style={styles.text_line}
                                onChangeText={(text) => setContactPhone(text)}
                                value={contactPhone}
                                placeholder="Enter your phone number "
                            />
                            <Text style={styles.text_bold_email}>Email:</Text>
                            <TextInput
                                style={styles.text_line}
                                onChangeText={(text) => setContactEmail(text)}
                                value={contactEmail}
                                placeholder="Enter your email"
                            />
                        </View>
                    </View>
                    <Table
                        borderStyle={{
                            borderWidth: 2,
                            borderColor: 'black',
                        }}
                    >
                        <Row
                            heightArr={25}
                            flexArr={[0.7, 1.5, 0.5, 0.6, 0.85, 0.3]}
                            data={tableHead}
                            style={styles.tableheader}
                            textStyle={styles.text}
                        />
                        <TableWrapper>
                            <Rows
                                heightArr={25}
                                data={newData()}
                                flexArr={[0.7, 1.5, 0.5, 0.6, 0.85, 0.3]}
                                textStyle={styles.tableheader}
                            />
                        </TableWrapper>
                    </Table>
                    <View style={styles.table}>
                        <View style={styles.flex_row}>
                            <Text style={{ ...styles.text_bold4, marginLeft: 10 }}>In Words: </Text>
                            <TextInput
                                onChangeText={(text) => setNote(text)}
                                value={note}
                                placeholder="Enter your note here..."
                            />
                        </View>
                    </View>
                    <View style={styles.bottom_content}>
                        <View style={styles.bottom_row}>
                            <Text style={styles.text_bold}>Thank You and Visit Again.</Text>
                        </View>
                        <View style={styles.bottom_row_end}>
                            <Text style={styles.text_bold}>Signature:_____________</Text>
                        </View>
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
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(236 ,208 ,106)',
        marginHorizontal: 10,
        borderColor: 'black',
        borderWidth: 2,
    },
    container_top: {
        marginTop: StatusBar.currentHeight + 5 || 20,
        alignItems: 'center',
        flex: 2.3,
    },
    textall: {
        marginBottom: 10,
    },
    text_bold: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10,
    },
    text_bold2: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_bold_email: {
        fontSize: 15,
    },
    text_bold3: {
        fontSize: 15,
        marginLeft: 10,
    },
    text_bold4: { fontWeight: 'bold', fontSize: 15 },
    text_line: { marginTop: 3 },
    text_line1: {
        textAlign: 'center',
    },

    line: {
        width: '100%',
        borderColor: 'black',
    },
    container_center: {
        flex: 12,
        width: '100%',
        marginBottom: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    center_row: {
        flexDirection: 'row',
        alignItems: 'center',
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
        marginLeft: 10,
        textAlign: 'left',
        marginBottom: 20,
    },
    colum_name1: {
        flex: 3,
        marginLeft: 10,
    },
    action_btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottom_content: {
        marginVertical: 10,
    },
    bottom_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottom_row_end: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        marginRight: 10,
    },

    spacer: {},
    printer: {},
    tableheader: {
        textAlign: 'center',
    },
    flex_row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    text: { margin: 8, fontWeight: 'bold' },
    row: { backgroundColor: 'rgb(236 ,208 ,106)' },
    container_top_left: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});
